/** @type {import('./_venera_.js')} */

class BaozimhWww extends ComicSource {
  name = "包子漫画 (www)";

  // 与旧的 baozi 源使用不同的 key,两者可以同时安装
  key = "baozi";

  version = "1.2.1";

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
      title: "备用 Cookie (手动粘贴)",
      type: "input",
      validator: null,
      default: "",
    },
    user_agent: {
      title: "User-Agent (默认固定，可修改)",
      type: "input",
      validator: null,
      default: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/155.0.0.0 Safari/537.36",
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
    open_verification_page: {
      title: "打开站点 / 验证信息",
      type: "callback",
      buttonText: "打开当前站点",
      callback: async () => {
        const url = `${this.baseUrl}/`;
        try {
          await UI.launchUrl(url);
          UI.showMessage("已打开当前选定的包子漫画站点。若需在应用网页登录并保存 Cookie，请使用页面底部的“重新登录”；F12 Network 请求头无法由源脚本自动读取，User-Agent 请手动复制填写。");
        } catch (e) {
          UI.showMessage(`无法打开验证网页：${String(e)}`);
        }
      },
    },
    connection_check: {
      title: "连接检查",
      type: "callback",
      buttonText: "检查当前域名",
      callback: async () => {
        const url = this.baseUrl;
        try {
          // 检查所选域名本身，不触发自动切换，结果才可用于判断当前设置。
          const res = await Network.get(url, this.siteHeaders(url));
          try {
            log("info", "baozimh_www connection check",
              `GET ${url} -> ${res.status} manualCookie=${!!this.siteHeaders(url).Cookie} manualUA=${!!this.siteHeaders(url)["User-Agent"]}`);
          } catch (ignored) {}
          if (this.isChallenge(res)) {
            UI.showMessage("当前域名返回了网站验证页；请检查 Cookie 和 User-Agent 设置。");
            return;
          }
          if (res.status === 200) {
            const cookie = !!this.siteHeaders(url).Cookie;
            const ua = !!this.siteHeaders(url)["User-Agent"];
            const appCookies = (Network.getCookies(url) || []).map((item) => item.name).filter(Boolean);
            const appCookieState = appCookies.length ? `应用 Cookie：已检测到 (${appCookies.join(", ")})` : "应用 Cookie：未检测到";
            UI.showMessage(`连接成功：${this.host} (HTTP 200)；${appCookieState}；手动 Cookie：${cookie ? "已填写" : "未填写"}；User-Agent：${ua ? "已启用" : "未启用"}`);
            return;
          }
          UI.showMessage(`${this.host}：${this.statusMessage(res.status, false)}`);
        } catch (e) {
          try { log("error", "baozimh_www connection check", String(e)); } catch (ignored) {}
          UI.showMessage(`连接失败：${String(e)}`);
        }
      },
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
    return `需要通过网站验证:请使用“打开当前站点”打开 ${this.host};应用网页登录捕获 Cookie 请使用页面底部的“重新登录”;User-Agent 需从浏览器 F12 Network 手动复制到设置中`;
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
    const status = Number(res.status);
    // 只有响应包含站点明确的挑战信号时才提示验证；普通 403/429/503 保留为状态码错误。
    if (body.length < 20000 && /"error"\s*:\s*"challenge_required"/i.test(body)) {
      return true;
    }
    const head = body.slice(0, 10000);
    const challengeTitle = /<title[^>]*>\s*(Just a moment|Attention Required|请稍候|Checking your browser)/i.test(head);
    const cloudflareMarker = /(?:cf-chl-|challenge-platform|__cf_chl|cf-browser-verification)/i.test(head);
    return challengeTitle || (cloudflareMarker && [200, 403, 429, 503].includes(status));
  }

  /**
   * 站点请求头:仅对本站域名附带用户填写的 Cookie / User-Agent
   */
  requestHost(url) {
    const match = String(url || "").match(/^https?:\/\/([^/:?#]+)/i);
    return match ? match[1].toLowerCase().replace(/\.$/, "") : "";
  }

  isBaoziPageHost(host) {
    return /^(?:[a-z0-9-]+\.)*baozimh\.com$/i.test(host);
  }

  isBaoziImageHost(host) {
    return /^(?:[a-z0-9-]+\.)*(?:baozimh\.com|baozicdn\.com|bzcdn\.net)$/i.test(host);
  }

  mainRequestUrls(url) {
    const match = String(url || "").match(/^(https?:\/\/)([^/?#]+)([^?#]*)([?#].*)?$/i);
    if (!match) return [url];
    const host = match[2].toLowerCase();
    const allowedHosts = this.settings.host.options.map((option) => option.value);
    if (!allowedHosts.includes(host)) return [url];
    const pathAndQuery = (match[3] || "/") + (match[4] || "");
    return [host, ...allowedHosts.filter((candidate) => candidate !== host)]
      .map((candidate) => `${match[1]}${candidate}${pathAndQuery}`);
  }

  statusMessage(status, fallbackTried = true) {
    status = Number(status);
    if (status === 401 || status === 403) return `请求被拒绝 (HTTP ${status})；请检查 Cookie、User-Agent 或站点登录状态。`;
    if (status === 404) return "页面或作品不存在 (HTTP 404)；未切换域名。";
    if (status === 429) return "请求过于频繁 (HTTP 429)；请稍后再试，未切换域名。";
    if ([500, 502, 503, 504].includes(status)) return `站点暂时不可用 (HTTP ${status})；${fallbackTried ? "已尝试备用域名" : "检查按钮未切换域名"}。`;
    return `站点返回 HTTP ${status}`;
  }

  /** 手动 Cookie 只发往包子站点；图片 CDN 请求仅按需带 UA 与 Referer。 */
  siteHeaders(url, options = {}) {
    const h = {};
    const host = this.requestHost(url);
    const pageHost = this.isBaoziPageHost(host);
    const imageHost = options.forImage === true && this.isBaoziImageHost(host);
    if (!pageHost && !imageHost) return h;

    const clean = (value) => String(value || "").replace(/[\r\n]+/g, "").trim();
    const cookie = clean(this.loadSetting("cookie")).replace(/^cookie:\s*/i, "");
    const ua = clean(this.loadSetting("user_agent") || this.settings.user_agent.default).replace(/^user-agent:\s*/i, "");
    if (pageHost && !options.forImage && cookie) h.Cookie = cookie;
    if (ua) h["User-Agent"] = ua;
    return h;
  }

  /**
   * 缩略图配置必须保持同步且不携带 onLoadFailed 回调。
   * Venera Next 当前不支持缩略图失败回调;携带闭包可能在下载封面时触发已关闭的 JS scope。
   */
  thumbnailLoadConfig(url) {
    const targetUrl = String(url || "");
    const headers = this.siteHeaders(targetUrl, { forImage: true });
    if (this.isBaoziImageHost(this.requestHost(targetUrl))) {
      headers.Referer = this.baseUrl + "/";
    }
    const config = { url: targetUrl };
    if (Object.keys(headers).length > 0) config.headers = headers;
    return config;
  }

  imageLoadConfig(url, candidateIndex = 0) {
    const match = String(url || "").match(/^(https?:\/\/)([^/?#]+)([^?#]*)([?#].*)?$/i);
    const originalHost = match ? match[2].toLowerCase() : "";
    const pathAndQuery = match ? (match[3] || "/") + (match[4] || "") : "";
    const candidates = [];
    const addHost = (host) => {
      host = String(host || "").trim().toLowerCase();
      if (!host || candidates.some((item) => item.host === host)) return;
      candidates.push({ host: host, url: match ? `${match[1]}${host}${pathAndQuery}` : url });
    };

    // 优先使用当前图片地址（已遵从用户选择的 CDN），失败后依次尝试其他已知 CDN。
    addHost(originalHost);
    addHost(this.loadSetting("cdn_domains") || "");
    for (const host of [
      "as-rsa1-usla.baozicdn.com",
      "ascn-a3.bzcdn.net",
      "asgb-a3.bzcdn.net",
      "as.baozimh.com",
      "s1.baozicdn.com",
    ]) addHost(host);

    const index = Math.max(0, Math.min(candidates.length - 1, candidateIndex || 0));
    const target = candidates[index] || { host: originalHost, url: url };
    const headers = this.siteHeaders(target.url, { forImage: true });
    if (this.isBaoziImageHost(target.host)) headers.Referer = this.baseUrl + "/";

    const config = { url: target.url };
    if (Object.keys(headers).length > 0) config.headers = headers;
    if (index + 1 < candidates.length) {
      config.onLoadFailed = () => {
        const nextIndex = index + 1;
        try {
          log("warning", "baozimh_www image", `图片请求失败，切换 CDN ${target.host} -> ${candidates[nextIndex].host}`);
        } catch (e) {}
        return this.imageLoadConfig(url, nextIndex);
      };
    } else {
      config.onLoadFailed = () => {
        try { log("error", "baozimh_www image", `所有备用 CDN 均失败，最后地址=${target.url}`); } catch (e) {}
        return null;
      };
    }
    return config;
  }

  /**
   * 统一的 GET 请求:处理验证页与状态码
   */
  async request(url, headers = {}) {
    const urls = this.mainRequestUrls(url);
    let lastError = null;
    for (let i = 0; i < urls.length; i++) {
      const targetUrl = urls[i];
      let res;
      try {
        res = await Network.get(targetUrl, { ...this.siteHeaders(targetUrl), ...headers });
      } catch (e) {
        lastError = e;
        try { log("warning", "baozimh_www", `网络请求失败，尝试备用域名 (${i + 1}/${urls.length}): ${targetUrl}`); } catch (ignored) {}
        if (i + 1 < urls.length) continue;
        throw `网络连接失败 (已尝试 ${i + 1} 个域名): ${String(lastError)}`;
      }

      try {
        log("info", "baozimh_www v" + this.version,
          `GET ${targetUrl} -> ${res.status} (len ${(res.body || "").length}) manualCookie=${!!this.siteHeaders(targetUrl).Cookie} manualUA=${!!this.siteHeaders(targetUrl)["User-Agent"]}`);
      } catch (e) {}

      if (this.isChallenge(res)) {
        try {
          const cookieNames = (Network.getCookies(targetUrl) || []).map((c) => c.name).join(",");
          log("error", "baozimh_www v" + this.version,
            `CHALLENGE url=${targetUrl} status=${res.status} cookies=[${cookieNames}] body=${(res.body || "").replace(/\s+/g, " ").slice(0, 300)}`);
        } catch (e) {}
        throw this.challengeMessage;
      }
      if (res.status === 200) return res;

      // 仅网络异常及常见临时服务错误会切换域名；404、限流、验证和其他 4xx 不重试。
      const retryableStatus = [500, 502, 503, 504].includes(Number(res.status));
      if (retryableStatus && i + 1 < urls.length) {
        try { log("warning", "baozimh_www", `HTTP ${res.status}，尝试备用域名 (${i + 2}/${urls.length})`); } catch (e) {}
        continue;
      }
      throw this.statusMessage(res.status);
    }
    throw `网络连接失败: ${String(lastError || "未知错误")}`;
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
    // 包子漫画站点账号登录：取得 TSID 账号 Cookie；此登录与 Cloudflare/Gatekeeper 验证分开。
    login: async (account, password) => {
      const url = `${this.baseUrl}/api/bui/signin`;
      const boundary = "----WebKitFormBoundaryFUNUxpOwyUaDop8s";
      const body =
        `--${boundary}\r\nContent-Disposition: form-data; name="username"\r\n\r\n${account}\r\n` +
        `--${boundary}\r\nContent-Disposition: form-data; name="password"\r\n\r\n${password}\r\n` +
        `--${boundary}--\r\n`;
      const res = await Network.post(
        url,
        {
          ...this.siteHeaders(url),
          "content-type": `multipart/form-data; boundary=${boundary}`,
        },
        body
      );
      if (this.isChallenge(res)) {
        throw this.challengeMessage;
      }
      if (Number(res.status) !== 200) {
        throw `账号登录失败 (HTTP ${res.status})`;
      }
      let json;
      try {
        json = JSON.parse(res.body || "{}");
      } catch (e) {
        throw "账号登录失败：站点返回内容无法解析";
      }
      const token = json && json.data != null ? String(json.data).trim() : "";
      if (!token || token === "null" || token === "undefined") {
        throw (json && (json.message || json.msg)) || "账号或密码不正确，或站点未返回登录凭据";
      }
      Network.setCookies(this.baseUrl, [
        new Cookie({ name: "TSID", value: token, domain: "baozimh.com" }),
      ]);
      return "ok";
    },

    loginWithWebview: {
      // 注意:此处在安装/解析阶段就会被读取,不能调用 loadSetting,必须是固定值
      // 应用内重新登录时直接打开 www 首页;若触发验证,站点完成后会回到正常页面
      url: "https://www.baozimh.com/",
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
    u = String(u).trim().replace(/&amp;/g, "&");
    // srcset 可能包含多个候选项;取第一个 URL,并去掉描述符。
    u = u.split(",")[0].trim().split(/\s+/)[0];
    if (!u || /^(?:data:|about:|javascript:)/i.test(u)) return "";
    if (/placeholder|loading|lazy|blank|default/i.test(u) && !/\/cover\//i.test(u)) return "";
    if (u.startsWith("//")) return "https:" + u;
    if (u.startsWith("/")) return this.baseUrl + u;
    return u;
  }

  /**
   * 读取一个图片节点所有常见的懒加载字段,避免 amp-img 占位节点遮住后面的真实 img。
   */
  coverFromNode(node) {
    if (!node) return "";
    const attrs = node.attributes || {};
    for (const key of [
      "data-src", "data-original", "data-original-src", "data-lazy-src",
      "data-image", "data-cover", "src", "srcset", "data-srcset"
    ]) {
      const value = this.normalizeImg(attrs[key]);
      if (value) return value;
    }
    const style = String(attrs.style || "");
    const bg = style.match(/url\(["']?(.*?)["']?\)/i);
    return bg ? this.normalizeImg(bg[1]) : "";
  }

  /**
   * 封面缩略图使用站点裁切参数降低传输量;已有完整图片 URL 则原样保留。
   */
  coverUrl(value, id) {
    const raw = String(value || "").trim();
    if (raw) {
      // API 的 topic_img 有时是文件名,有时已是路径/完整 URL。
      if (/^https?:\/\//i.test(raw) || raw.startsWith("//")) return this.normalizeImg(raw);
      const path = raw.replace(/^\/+/, "");
      const coverPath = /^(?:[a-z0-9-]+\/)*cover\//i.test(path) ? path : `cover/${path}`;
      return `https://static-tw.baozimh.com/${coverPath}${/[?&](?:w|h|q)=/i.test(coverPath) ? "" : "?w=285&h=375&q=80"}`;
    }
    return this.coverFromId(id);
  }

  /**
   * 从卡片的全部图片节点寻找有效封面;最后才由 comic id 推导地址。
   */
  coverOf(e, id) {
    for (const img of e.querySelectorAll("amp-img, img")) {
      const cover = this.coverFromNode(img);
      if (cover) return cover;
    }
    // 有些列表将封面设为卡片背景图。
    for (const node of e.querySelectorAll("[style]")) {
      const cover = this.coverFromNode(node);
      if (cover) return cover;
    }
    return this.coverFromId(id);
  }

  coverFromId(id) {
    if (!id) return "";
    const base = String(id).replace(/_[a-z0-9]{6}$/i, "");
    return `https://static-tw.baozimh.com/cover/${base}.jpg?w=285&h=375&q=80`;
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
      cover: this.coverUrl(e.topic_img, e.comic_id),
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
        throw this.statusMessage(res.status);
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
    // 正文图片与封面缩略图由应用单独下载，不会继承页面请求头；在此按目标主机配置。
    onImageLoad: (url) => this.imageLoadConfig(url),
    onThumbnailLoad: (url) => this.thumbnailLoadConfig(url),

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

        const detailCoverNode = document.querySelector("div.l-content > div > div > amp-img") ||
          document.querySelector("div.l-content amp-img, div.l-content img");
        const cover =
          this.coverFromNode(detailCoverNode) ||
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
