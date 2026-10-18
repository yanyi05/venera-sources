/** @type {import('./_venera_.js')} */

class BaozimhWww extends ComicSource {
  name = "包子漫画 (www)";

  // 与旧的 baozi 源使用不同的 key,两者可以同时安装
  key = "baozimh_www";

  version = "1.1.1";

  minAppVersion = "1.6.0";

  url = "";

  // ---------------------------------------------------------------------------
  // 设置
  // ---------------------------------------------------------------------------
  settings = {
    host: {
      title: "站点域名",
      type: "select",
      options: [
        { value: "www.baozimh.com" },
        { value: "cn.baozimh.com" },
        { value: "tw.baozimh.com" },
      ],
      default: "www.baozimh.com",
    },
    language: {
      title: "简繁切换 (接口参数)",
      type: "select",
      options: [
        { value: "cn", text: "简体" },
        { value: "tw", text: "繁體" },
      ],
      default: "cn",
    },
    cdn_domains: {
      title: "图片资源站域名",
      type: "select",
      options: [
        { value: "as-rsa1-usla.baozicdn.com" },
        { value: "ascn-a3.bzcdn.net" },
        { value: "asgb-a3.bzcdn.net" },
        { value: "as.baozimh.com" },
        { value: "s1.baozicdn.com" },
        { value: "", text: "默认" },
      ],
      default: "",
    },
    cookie: {
      title: "验证 Cookie (从浏览器复制)",
      type: "input",
      validator: null,
      default: "",
    },
    user_agent: {
      title: "验证时浏览器的 User-Agent",
      type: "input",
      validator: null,
      default: "",
    },
    image_quality: {
      title: "图片质量",
      type: "select",
      options: [
        { value: "/w640", text: "640p" },
        { value: "", text: "原图" },
      ],
      default: "/w640",
    },
  };

  get host() {
    return this.loadSetting("host") || this.settings.host.default;
  }

  get lang() {
    return this.loadSetting("language") || this.settings.language.default;
  }

  get baseUrl() {
    return `https://${this.host}`;
  }

  // ---------------------------------------------------------------------------
  // 验证 (Cloudflare / 人机验证) 处理
  //
  // 思路:
  //   1. 所有请求都走 this.request,一旦识别到验证页就抛出明确的提示。
  //   2. 用户在 "账号 -> 网页登录" 里打开站点,在内置网页中完成验证,
  //      应用会自动保存 Cookie (含 cf_clearance 等),之后的 Network 请求会带上。
  //   3. 验证过期后重复第 2 步即可。
  // ---------------------------------------------------------------------------
  get challengeMessage() {
    return "需要通过网站验证:请在浏览器中打开 www.baozimh.com 完成验证,然后把 Cookie 和 User-Agent 填入本源设置 (见使用说明)";
  }

  /**
   * 判断响应是否为验证页。
   * 本站的验证形式 (来自实际日志):
   *   HTTP 403, content-type: application/json
   *   {"challenge_url":"/__gatekeeper_challenge/start?return=...","error":"challenge_required"}
   *
   * 注意:HTTP 200 的正常页面里可能也带有 gatekeeper 相关字样,
   * 所以 200 响应绝不能仅凭关键字判定为验证页。
   */
  isChallenge(res) {
    const body = typeof res.body === "string" ? res.body : "";
    if (res.status === 403 || res.status === 503 || res.status === 429) {
      return true;
    }
    if (res.status === 200) {
      // 仅当响应本身就是那个很短的 JSON 验证提示时才算
      if (body.length < 2000 && body.includes('"challenge_required"')) {
        return true;
      }
      // Cloudflare 的验证页标题
      const head = body.slice(0, 3000);
      return /<title>\s*(Just a moment|Attention Required|请稍候|Checking your browser)/i.test(
        head
      );
    }
    return false;
  }

  /**
   * 站点请求头:仅对本站域名附带用户填写的 Cookie / User-Agent
   */
  siteHeaders(url) {
    const h = {};
    if (!url || !url.startsWith(this.baseUrl)) {
      return h;
    }
    const cookie = (this.loadSetting("cookie") || "").replace(/[\r\n]+/g, "").trim();
    const ua = (this.loadSetting("user_agent") || "").replace(/[\r\n]+/g, "").trim();
    if (cookie) {
      h["Cookie"] = cookie.replace(/^cookie:\s*/i, "");
    }
    if (ua) {
      h["User-Agent"] = ua;
    }
    return h;
  }

  /**
   * 统一的 GET 请求:处理验证页与状态码
   */
  async request(url, headers = {}) {
    let res;
    try {
      res = await Network.get(url, { ...this.siteHeaders(url), ...headers });
    } catch (e) {
      throw "网络错误: " + e;
    }
    try {
      log(
        "info",
        "baozimh_www v" + this.version,
        `GET ${url} -> ${res.status} (len ${(res.body || "").length}) manualCookie=${!!this.siteHeaders(url)["Cookie"]} manualUA=${!!this.siteHeaders(url)["User-Agent"]}`
      );
    } catch (e) {}
    if (this.isChallenge(res)) {
      // 诊断信息:服务器返回了什么、我们当前带着哪些 Cookie
      try {
        let cookieNames = "";
        try {
          cookieNames = (Network.getCookies(url) || [])
            .map((c) => c.name)
            .join(",");
        } catch (e) {
          cookieNames = "getCookies失败:" + e;
        }
        log(
          "error",
          "baozimh_www v" + this.version,
          `CHALLENGE url=${url} status=${res.status} ` +
            `headers=${JSON.stringify(res.headers || {}).slice(0, 600)} ` +
            `cookies=[${cookieNames}] ` +
            `body=${(res.body || "").replace(/\s+/g, " ").slice(0, 300)}`
        );
      } catch (e) {}
      throw this.challengeMessage;
    }
    if (res.status !== 200) {
      throw "Invalid status code: " + res.status;
    }
    return res;
  }

  /**
   * 解析 HTML 并保证释放文档
   */
  withDoc(html, fn) {
    const doc = new HtmlDocument(html);
    try {
      return fn(doc);
    } finally {
      doc.dispose();
    }
  }

  // ---------------------------------------------------------------------------
  // 账号:网页登录 (同时用于通过验证 / 登录站点账号以使用书架)
  // ---------------------------------------------------------------------------
  account = {
    loginWithWebview: {
      // 注意:此处在安装/解析阶段就会被读取,不能调用 loadSetting,必须是固定值
      // 直接打开验证入口,验证通过后站点会跳回 return 指定的页面
      url: "https://www.baozimh.com/__gatekeeper_challenge/start?return=%2F",
      /**
       * 判断验证是否完成。应用只有在这里返回 true 之后才会保存网页里的 Cookie,
       * 所以这个函数一直返回 false 的话,验证再通过也不会生效。
       * 日志会记录每次调用收到的 url 和 title,便于排查。
       */
      checkStatus: (url, title) => {
        try {
          log("info", "baozimh_www v1.0.5 webview", `url=${url} title=${title}`);
        } catch (e) {}
        if (!url || !/baozimh\.com/.test(url)) {
          return false;
        }
        const t = (title || "").toLowerCase();
        // 页面标题已显示验证通过
        if (t.includes("验证通过") || t.includes("verified")) {
          return true;
        }
        // 仍停留在验证入口页 / 验证中
        if (/__gatekeeper_challenge\/start/.test(url)) {
          return false;
        }
        if (
          t.includes("just a moment") ||
          t.includes("attention required") ||
          t.includes("checking your browser") ||
          t.includes("请稍候") ||
          t.includes("正在验证")
        ) {
          return false;
        }
        // 已离开验证入口,回到站点正常页面
        return true;
      },
      onLoginSuccess: () => {},
    },

    logout: () => {
      Network.deleteCookies(this.baseUrl);
    },

    registerWebsite: "https://www.baozimh.com/user/signup",
  };

  // ---------------------------------------------------------------------------
  // 解析工具
  // ---------------------------------------------------------------------------
  /**
   * 规范化图片地址:处理 srcset、协议相对地址、站内相对地址,过滤占位图
   */
  normalizeImg(u) {
    if (!u) return "";
    u = String(u).trim().split(",")[0].trim().split(/\s+/)[0];
    if (!u || u.startsWith("data:")) return "";
    if (/placeholder|loading|lazy|blank|default/i.test(u) && !/\/cover\//.test(u)) {
      return "";
    }
    if (u.startsWith("//")) return "https:" + u;
    if (u.startsWith("/")) return this.baseUrl + u;
    return u;
  }

  /**
   * 从卡片里取封面:依次尝试 amp-img / img 的 src、data-src、data-original、srcset;
   * 都取不到时,按站点封面地址规律由漫画 id 推导 (id 去掉末尾 _xxxxxx 后加 .jpg)
   */
  coverOf(e, id) {
    const img = e.querySelector("amp-img") || e.querySelector("img");
    if (img) {
      const attrs = img.attributes || {};
      for (const k of ["data-src", "data-original", "data-lazy-src", "src", "srcset", "data-srcset"]) {
        const u = this.normalizeImg(attrs[k]);
        if (u) return u;
      }
    }
    return this.coverFromId(id);
  }

  coverFromId(id) {
    if (!id) return "";
    const base = String(id).replace(/_[a-z0-9]{6}$/i, "");
    return `https://static-tw.baozimh.com/cover/${base}.jpg?w=285&h=375&q=100`;
  }

  parseComic(e) {
    let url = e.querySelector("a")?.attributes?.["href"] || "";
    let id = url.split("/").pop();
    let title = e.querySelector("h3")?.text.trim() || "";
    let cover = this.coverOf(e, id);
    let tags = e.querySelectorAll("div.tabs > span").map((x) => x.text.trim());
    let description = e.querySelector("small")?.text.trim() || "";
    return new Comic({
      id: id,
      title: title,
      cover: cover,
      tags: tags,
      description: description,
    });
  }

  parseJsonComic(e) {
    return new Comic({
      id: e.comic_id,
      title: e.name,
      subtitle: e.author,
      cover: `https://static-tw.baozimh.com/cover/${e.topic_img}?w=285&h=375&q=100`,
      tags: e.type_names || [],
    });
  }

  // ---------------------------------------------------------------------------
  // 探索页
  // ---------------------------------------------------------------------------
  explore = [
    {
      title: "包子漫画",
      type: "multiPartPage",
      load: async () => {
        const res = await this.request(this.baseUrl);
        return this.withDoc(res.body, (document) => {
          const result = [];
          try {
            const first = document.querySelector("div.comics-card");
            log(
              "info",
              "baozimh_www v" + this.version,
              "first card html=" + (first ? first.innerHTML : "none").replace(/\s+/g, " ").slice(0, 500)
            );
          } catch (e) {}
          for (const part of document.querySelectorAll(
            "div.index-recommend-items"
          )) {
            const title = part.querySelector("div.catalog-title")?.text.trim();
            const comics = part
              .querySelectorAll("div.comics-card")
              .map((e) => this.parseComic(e));
            if (title && comics.length > 0) {
              result.push({ title: title, comics: comics });
            }
          }
          return result;
        });
      },
    },
  ];

  // ---------------------------------------------------------------------------
  // 分类
  // ---------------------------------------------------------------------------
  category = {
    title: "包子漫画",
    parts: [
      {
        name: "类型",
        type: "fixed",
        categories: [
          ["全部", "all"],
          ["恋爱", "lianai"],
          ["纯爱", "chunai"],
          ["古风", "gufeng"],
          ["异能", "yineng"],
          ["悬疑", "xuanyi"],
          ["剧情", "juqing"],
          ["科幻", "kehuan"],
          ["奇幻", "qihuan"],
          ["玄幻", "xuanhuan"],
          ["穿越", "chuanyue"],
          ["冒险", "mouxian"],
          ["推理", "tuili"],
          ["武侠", "wuxia"],
          ["格斗", "gedou"],
          ["战争", "zhanzheng"],
          ["热血", "rexie"],
          ["搞笑", "gaoxiao"],
          ["大女主", "danuzhu"],
          ["都市", "dushi"],
          ["总裁", "zongcai"],
          ["后宫", "hougong"],
          ["日常", "richang"],
          ["韩漫", "hanman"],
          ["少年", "shaonian"],
          ["其它", "qita"],
        ].map(([label, param]) => ({
          label: label,
          target: {
            page: "category",
            attributes: { category: label, param: param },
          },
        })),
      },
    ],
    enableRankingPage: false,
  };

  categoryComics = {
    load: async (category, param, options, page) => {
      const region = options[0] || "all";
      const state = options[1] || "all";
      const url =
        `${this.baseUrl}/api/bzmhq/amp_comic_list?type=${param}` +
        `&region=${region}&state=${state}&filter=%2a&page=${page}&limit=36` +
        `&language=${this.lang}&__amp_source_origin=${encodeURIComponent(this.baseUrl)}`;
      const res = await this.request(url);
      let json;
      try {
        json = JSON.parse(res.body);
      } catch (e) {
        throw "返回内容不是有效的 JSON,可能需要重新验证";
      }
      return {
        comics: (json.items || []).map((e) => this.parseJsonComic(e)),
        maxPage: json.next ? null : page,
      };
    },
    optionList: [
      {
        options: ["all-全部", "cn-国漫", "jp-日本", "kr-韩国", "en-欧美"],
      },
      {
        options: ["all-全部", "serial-连载中", "pub-已完结"],
      },
    ],
  };

  // ---------------------------------------------------------------------------
  // 搜索
  // ---------------------------------------------------------------------------
  search = {
    load: async (keyword, options, page) => {
      const res = await this.request(
        `${this.baseUrl}/search?q=${encodeURIComponent(keyword)}`
      );
      const comics = this.withDoc(res.body, (document) =>
        document
          .querySelectorAll("div.comics-card")
          .map((e) => this.parseComic(e))
      );
      return { comics: comics, maxPage: 1 };
    },
    optionList: [],
  };

  // ---------------------------------------------------------------------------
  // 收藏 (站点书架,需要先在网页登录里登录站点账号)
  // ---------------------------------------------------------------------------
  favorites = {
    multiFolder: false,
    addOrDelFavorite: async (comicId, folderId, isAdding) => {
      const url = isAdding
        ? `${this.baseUrl}/user/operation_v2?op=set_bookmark&comic_id=${comicId}&chapter_slot=0`
        : `${this.baseUrl}/user/operation_v2?op=del_bookmark&comic_id=${comicId}`;
      const res = await Network.post(url, this.siteHeaders(url));
      if (res.status === 401) {
        throw "Login expired";
      }
      if (this.isChallenge(res)) {
        throw this.challengeMessage;
      }
      if (!res.status || res.status >= 400) {
        throw "Invalid status code: " + res.status;
      }
      return "ok";
    },
    loadComics: async (page, folder) => {
      const res = await this.request(`${this.baseUrl}/user/my_bookshelf`);
      const comics = this.withDoc(res.body, (document) =>
        document.querySelectorAll("div.bookshelf-items").map((e) => {
          const a = e.querySelector("h4 > a");
          const id = (a?.attributes?.["href"] || "").split("/").pop();
          const ul = e.querySelector("div.info > ul");
          const author =
            ul?.children?.[1]?.text.split("：")[1]?.trim() || "";
          const description =
            ul?.children?.[4]?.children?.[0]?.text.trim() || "";
          return new Comic({
            id: id,
            title: a?.text.trim() || "",
            subtitle: author,
            description: description,
            cover: this.coverOf(e, id),
          });
        })
      );
      if (comics.length === 0 && /user\/signin|name="password"/i.test(res.body)) {
        throw "Login expired";
      }
      return { comics: comics, maxPage: 1 };
    },
  };

  // ---------------------------------------------------------------------------
  // 漫画详情与章节
  // ---------------------------------------------------------------------------
  comic = {
    loadInfo: async (id) => {
      const res = await this.request(`${this.baseUrl}/comic/${id}`);
      const html = res.body;

      const decode = (t) =>
        (t || "")
          .replace(/&amp;/g, "&")
          .replace(/&quot;/g, '"')
          .replace(/&#39;|&#x27;/g, "'")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .trim();
      // 读取 <meta property|name="xxx" content="..."> (作为选择器失效时的后备)
      const meta = (name) => {
        const tag = html.match(
          new RegExp(`<meta[^>]*(?:property|name)=["']${name}["'][^>]*>`, "i")
        );
        const c = tag && tag[0].match(/content=["']([^"']*)["']/i);
        return c ? decode(c[1]) : "";
      };
      const pageTitle = decode(
        (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1]
      );
      // 从链接中取章节序号: chapter_slot=12 或 /comic/chapter/xxx/0_12.html
      const slotOf = (href) => {
        const m =
          (href || "").match(/chapter_slot=(\d+)/) ||
          (href || "").match(/\/\d+_(\d+)\.html/);
        return m ? parseInt(m[1], 10) : null;
      };

      return this.withDoc(html, (document) => {
        const title =
          document.querySelector("h1.comics-detail__title")?.text.trim() ||
          document.querySelector("h1")?.text.trim() ||
          meta("og:title") ||
          pageTitle.split(/[-_|–—]/)[0].trim();

        const cover =
          this.normalizeImg(
            document.querySelector("div.l-content > div > div > amp-img")
              ?.attributes?.["src"]
          ) ||
          this.normalizeImg(meta("og:image")) ||
          this.coverFromId(id);

        const author =
          document.querySelector("h2.comics-detail__author")?.text.trim() ||
          meta("og:novel:author") ||
          "";

        const tags = document
          .querySelectorAll("div.tag-list > span")
          .map((e) => e.text.trim())
          .filter((e) => e !== "");

        const description =
          document.querySelector("p.comics-detail__desc")?.text.trim() ||
          meta("og:description") ||
          meta("description") ||
          "";

        // 章节
        let list = document
          .querySelectorAll("div.comics-chapters > a")
          .map((a) => ({
            href: a.attributes?.["href"] || "",
            title: (a.querySelector("div > span")?.text || a.text || "").trim(),
          }));
        if (list.length === 0) {
          // 后备:页面里所有看起来像章节的链接
          list = document
            .querySelectorAll("a")
            .map((a) => ({
              href: a.attributes?.["href"] || "",
              title: (a.text || "").trim(),
            }))
            .filter((x) => /chapter_slot=|\/comic\/chapter\//.test(x.href));
        }
        const withSlot = list.map((x) => ({
          href: x.href,
          title: x.title,
          slot: slotOf(x.href),
        }));

        const chapters = {};
        if (withSlot.length > 0 && withSlot.every((x) => x.slot !== null)) {
          // 链接里有序号:去重后按序号升序(旧 -> 新),不依赖页面显示顺序
          const seen = new Set();
          withSlot
            .filter((x) => (seen.has(x.slot) ? false : (seen.add(x.slot), true)))
            .sort((x, y) => x.slot - y.slot)
            .forEach((x) => {
              chapters[`ep_${x.slot}`] = x.title || `第 ${x.slot} 话`;
            });
        } else {
          // 没有可解析的序号:按页面顺序编号
          withSlot.forEach((x, i) => {
            chapters[`ep_${i}`] = x.title || `第 ${i + 1} 话`;
          });
        }
        const chapterCount = Object.keys(chapters).length;

        // 解析结果完全为空时,明确报错并写日志,而不是显示一个空白详情页
        if (!title && chapterCount === 0) {
          const head = html.replace(/\s+/g, " ").slice(0, 400);
          try {
            log(
              "error",
              "baozimh_www",
              `loadInfo 解析为空 id=${id} len=${html.length} title=${pageTitle} head=${head}`
            );
          } catch (e) {}
          throw `无法解析漫画页面 (页面标题: ${pageTitle || "无"},长度 ${html.length})。可能需要重新验证,或站点页面结构已变化`;
        }
        if (chapterCount === 0) {
          try {
            log("warning", "baozimh_www", `loadInfo 未找到章节 id=${id}`);
          } catch (e) {}
        }

        // 更新时间
        let updateTime = document
          .querySelector("div.supporting-text > div > span > em")
          ?.text.trim()
          .replace("(", "")
          .replace(")", "");
        let updateDate = undefined;
        if (updateTime && /\d/.test(updateTime)) {
          updateDate = updateTime
            .replace(/年/g, "-")
            .replace(/月/g, "-")
            .replace(/日/g, "");
        }

        // 推荐
        const recommend = [];
        for (const c of document.querySelectorAll("div.recommend--item")) {
          if (c.querySelectorAll("div.tag-comic").length > 0) {
            const url = c.querySelector("a")?.attributes?.["href"] || "";
            recommend.push(
              new Comic({
                id: url.split("/").pop(),
                title: c.querySelector("span")?.text.trim() || "",
                cover: this.coverOf(c, url.split("/").pop()),
              })
            );
          }
        }

        return new ComicDetails({
          title: title,
          cover: cover,
          description: description,
          tags: {
            作者: author ? [author] : [],
            标签: tags,
          },
          chapters: chapterCount > 0 ? chapters : null,
          recommend: recommend,
          updateTime: updateDate,
        });
      });
    },

    loadEp: async (comicId, epId) => {
      // epId 形如 ep_3,站点章节序号为 3
      const slot = String(epId ?? "ep_0").replace(/^ep_/, "");
      const cdn = this.loadSetting("cdn_domains") ?? "";
      const quality = this.loadSetting("image_quality") ?? "/w640";

      // 图片地址改写:替换 CDN 域名并附加画质路径
      const rewrite = (imgUrl) => {
        const match = imgUrl.match(
          /^(https?:\/\/)?([^/\s:]+)(:\d+)?(\/[a-z]comic\/.*)/
        );
        if (!match) return imgUrl;
        const domain = cdn === "" ? match[2] : cdn;
        return `${match[1] || "https://"}${domain}${quality}${match[4]}`;
      };

      // 1) App 版页面 (一般无需验证,优先使用)
      let images = [];
      try {
        const res = await this.request(
          `https://appcn.baozimh.com/baozimhapp/comic/chapter/${comicId}/0_${slot}.html`
        );
        images = this.withDoc(res.body, (doc) => {
          const list = [];
          for (const node of doc.querySelectorAll(
            ".comic-contain > .chapter-img"
          )) {
            const src =
              node.querySelector(".comic-contain__item")?.attributes?.[
                "data-src"
              ];
            if (src) list.push(rewrite(src));
          }
          return list;
        });
      } catch (e) {
        // App 页失败时,回退到 Web 页;若是验证问题,Web 页同样会给出提示
        console.log("app chapter page failed: " + e);
      }

      // 2) 回退:Web 版阅读页
      if (images.length === 0) {
        const res = await this.request(
          `${this.baseUrl}/comic/chapter/${comicId}/0_${slot}.html`
        );
        images = this.withDoc(res.body, (doc) => {
          const list = [];
          for (const node of doc.querySelectorAll(
            ".comic-contain amp-img, .comic-contain img"
          )) {
            const src =
              node.attributes?.["src"] || node.attributes?.["data-src"];
            if (src) list.push(rewrite(src));
          }
          return list;
        });
      }

      if (images.length === 0) {
        throw "未获取到图片,章节可能不存在或需要重新验证";
      }
      return { images: images };
    },

    // 点击标签 -> 搜索
    onClickTag: (namespace, tag) => {
      return { page: "search", attributes: { text: tag, options: [] } };
    },

    // 链接识别
    link: {
      domains: [
        "baozimh.com",
        "www.baozimh.com",
        "cn.baozimh.com",
        "tw.baozimh.com",
      ],
      linkToId: (url) => {
        const m = url.match(/\/comic\/([^/?#]+)/);
        return m ? m[1] : null;
      },
    },
  };
}
