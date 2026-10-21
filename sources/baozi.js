// Embedded jpeg-js decoder/encoder license:`r`n// Copyright (c) 2014, Eugene Ware
// All rights reserved.
//   
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:  
// 
// 1. Redistributions of source code must retain the above copyright
//    notice, this list of conditions and the following disclaimer.  
// 2. Redistributions in binary form must reproduce the above copyright
//    notice, this list of conditions and the following disclaimer in the
//    documentation and/or other materials provided with the distribution.  
// 3. Neither the name of Eugene Ware nor the names of its contributors
//    may be used to endorse or promote products derived from this software
//    without specific prior written permission.  
//   
// THIS SOFTWARE IS PROVIDED BY EUGENE WARE ''AS IS'' AND ANY
// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL EUGENE WARE BE LIABLE FOR ANY
// DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
// 
// Banner reference signatures are adapted from Keiyoushi Baozimanhua BannerConstants.
// Embedded JPEG codec (jpeg-js, MIT); used only for comic-image pixel matching.
var BaoziCodec=(()=>{var xn=Object.create;var zr=Object.defineProperty;var hn=Object.getOwnPropertyDescriptor;var ln=Object.getOwnPropertyNames;var pn=Object.getPrototypeOf,dn=Object.prototype.hasOwnProperty;var Sr=(n,r)=>()=>{try{return r||n((r={exports:{}}).exports,r),r.exports}catch(e){throw r=0,e}},wn=(n,r)=>{for(var e in r)zr(n,e,{get:r[e],enumerable:!0})},_e=(n,r,e,t)=>{if(r&&typeof r=="object"||typeof r=="function")for(let i of ln(r))!dn.call(n,i)&&i!==e&&zr(n,i,{get:()=>r[i],enumerable:!(t=hn(r,i))||t.enumerable});return n};var Re=(n,r,e)=>(e=n!=null?xn(pn(n)):{},_e(r||!n||!n.__esModule?zr(e,"default",{value:n,enumerable:!0}):e,n)),yn=n=>_e(zr({},"__esModule",{value:!0}),n);var Pe=Sr(re=>{"use strict";re.byteLength=Fn;re.toByteArray=mn;re.fromByteArray=In;var Ur=[],Br=[],vn=typeof Uint8Array<"u"?Uint8Array:Array,ae="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(Rr=0,Me=ae.length;Rr<Me;++Rr)Ur[Rr]=ae[Rr],Br[ae.charCodeAt(Rr)]=Rr;var Rr,Me;Br[45]=62;Br[95]=63;function Le(n){var r=n.length;if(r%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var e=n.indexOf("=");e===-1&&(e=r);var t=e===r?0:4-e%4;return[e,t]}function Fn(n){var r=Le(n),e=r[0],t=r[1];return(e+t)*3/4-t}function En(n,r,e){return(r+e)*3/4-e}function mn(n){var r,e=Le(n),t=e[0],i=e[1],o=new vn(En(n,t,i)),a=0,p=i>0?t-4:t,v;for(v=0;v<p;v+=4)r=Br[n.charCodeAt(v)]<<18|Br[n.charCodeAt(v+1)]<<12|Br[n.charCodeAt(v+2)]<<6|Br[n.charCodeAt(v+3)],o[a++]=r>>16&255,o[a++]=r>>8&255,o[a++]=r&255;return i===2&&(r=Br[n.charCodeAt(v)]<<2|Br[n.charCodeAt(v+1)]>>4,o[a++]=r&255),i===1&&(r=Br[n.charCodeAt(v)]<<10|Br[n.charCodeAt(v+1)]<<4|Br[n.charCodeAt(v+2)]>>2,o[a++]=r>>8&255,o[a++]=r&255),o}function gn(n){return Ur[n>>18&63]+Ur[n>>12&63]+Ur[n>>6&63]+Ur[n&63]}function Bn(n,r,e){for(var t,i=[],o=r;o<e;o+=3)t=(n[o]<<16&16711680)+(n[o+1]<<8&65280)+(n[o+2]&255),i.push(gn(t));return i.join("")}function In(n){for(var r,e=n.length,t=e%3,i=[],o=16383,a=0,p=e-t;a<p;a+=o)i.push(Bn(n,a,a+o>p?p:a+o));return t===1?(r=n[e-1],i.push(Ur[r>>2]+Ur[r<<4&63]+"==")):t===2&&(r=(n[e-2]<<8)+n[e-1],i.push(Ur[r>>10]+Ur[r>>4&63]+Ur[r<<2&63]+"=")),i.join("")}});var Se=Sr(fe=>{fe.read=function(n,r,e,t,i){var o,a,p=i*8-t-1,v=(1<<p)-1,C=v>>1,g=-7,B=e?i-1:0,pr=e?-1:1,dr=n[r+B];for(B+=pr,o=dr&(1<<-g)-1,dr>>=-g,g+=p;g>0;o=o*256+n[r+B],B+=pr,g-=8);for(a=o&(1<<-g)-1,o>>=-g,g+=t;g>0;a=a*256+n[r+B],B+=pr,g-=8);if(o===0)o=1-C;else{if(o===v)return a?NaN:(dr?-1:1)*(1/0);a=a+Math.pow(2,t),o=o-C}return(dr?-1:1)*a*Math.pow(2,o-t)};fe.write=function(n,r,e,t,i,o){var a,p,v,C=o*8-i-1,g=(1<<C)-1,B=g>>1,pr=i===23?Math.pow(2,-24)-Math.pow(2,-77):0,dr=t?0:o-1,yr=t?1:-1,Fr=r<0||r===0&&1/r<0?1:0;for(r=Math.abs(r),isNaN(r)||r===1/0?(p=isNaN(r)?1:0,a=g):(a=Math.floor(Math.log(r)/Math.LN2),r*(v=Math.pow(2,-a))<1&&(a--,v*=2),a+B>=1?r+=pr/v:r+=pr*Math.pow(2,1-B),r*v>=2&&(a++,v/=2),a+B>=g?(p=0,a=g):a+B>=1?(p=(r*v-1)*Math.pow(2,i),a=a+B):(p=r*Math.pow(2,B-1)*Math.pow(2,i),a=0));i>=8;n[e+dr]=p&255,dr+=yr,p/=256,i-=8);for(a=a<<i|p,C+=i;C>0;n[e+dr]=a&255,dr+=yr,a/=256,C-=8);n[e+dr-yr]|=Fr*128}});var ze=Sr(Yr=>{"use strict";var ue=Pe(),Nr=Se(),De=typeof Symbol=="function"&&typeof Symbol.for=="function"?Symbol.for("nodejs.util.inspect.custom"):null;Yr.Buffer=u;Yr.SlowBuffer=kn;Yr.INSPECT_MAX_BYTES=50;var ee=2147483647;Yr.kMaxLength=ee;u.TYPED_ARRAY_SUPPORT=An();!u.TYPED_ARRAY_SUPPORT&&typeof console<"u"&&typeof console.error=="function"&&console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");function An(){try{let n=new Uint8Array(1),r={foo:function(){return 42}};return Object.setPrototypeOf(r,Uint8Array.prototype),Object.setPrototypeOf(n,r),n.foo()===42}catch{return!1}}Object.defineProperty(u.prototype,"parent",{enumerable:!0,get:function(){if(u.isBuffer(this))return this.buffer}});Object.defineProperty(u.prototype,"offset",{enumerable:!0,get:function(){if(u.isBuffer(this))return this.byteOffset}});function Tr(n){if(n>ee)throw new RangeError('The value "'+n+'" is invalid for option "size"');let r=new Uint8Array(n);return Object.setPrototypeOf(r,u.prototype),r}function u(n,r,e){if(typeof n=="number"){if(typeof r=="string")throw new TypeError('The "string" argument must be of type string. Received type number');return he(n)}return Oe(n,r,e)}u.poolSize=8192;function Oe(n,r,e){if(typeof n=="string")return Un(n,r);if(ArrayBuffer.isView(n))return Cn(n);if(n==null)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof n);if(Cr(n,ArrayBuffer)||n&&Cr(n.buffer,ArrayBuffer)||typeof SharedArrayBuffer<"u"&&(Cr(n,SharedArrayBuffer)||n&&Cr(n.buffer,SharedArrayBuffer)))return ce(n,r,e);if(typeof n=="number")throw new TypeError('The "value" argument must not be of type number. Received type number');let t=n.valueOf&&n.valueOf();if(t!=null&&t!==n)return u.from(t,r,e);let i=Tn(n);if(i)return i;if(typeof Symbol<"u"&&Symbol.toPrimitive!=null&&typeof n[Symbol.toPrimitive]=="function")return u.from(n[Symbol.toPrimitive]("string"),r,e);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof n)}u.from=function(n,r,e){return Oe(n,r,e)};Object.setPrototypeOf(u.prototype,Uint8Array.prototype);Object.setPrototypeOf(u,Uint8Array);function Xe(n){if(typeof n!="number")throw new TypeError('"size" argument must be of type number');if(n<0)throw new RangeError('The value "'+n+'" is invalid for option "size"')}function bn(n,r,e){return Xe(n),n<=0?Tr(n):r!==void 0?typeof e=="string"?Tr(n).fill(r,e):Tr(n).fill(r):Tr(n)}u.alloc=function(n,r,e){return bn(n,r,e)};function he(n){return Xe(n),Tr(n<0?0:le(n)|0)}u.allocUnsafe=function(n){return he(n)};u.allocUnsafeSlow=function(n){return he(n)};function Un(n,r){if((typeof r!="string"||r==="")&&(r="utf8"),!u.isEncoding(r))throw new TypeError("Unknown encoding: "+r);let e=Ge(n,r)|0,t=Tr(e),i=t.write(n,r);return i!==e&&(t=t.slice(0,i)),t}function se(n){let r=n.length<0?0:le(n.length)|0,e=Tr(r);for(let t=0;t<r;t+=1)e[t]=n[t]&255;return e}function Cn(n){if(Cr(n,Uint8Array)){let r=new Uint8Array(n);return ce(r.buffer,r.byteOffset,r.byteLength)}return se(n)}function ce(n,r,e){if(r<0||n.byteLength<r)throw new RangeError('"offset" is outside of buffer bounds');if(n.byteLength<r+(e||0))throw new RangeError('"length" is outside of buffer bounds');let t;return r===void 0&&e===void 0?t=new Uint8Array(n):e===void 0?t=new Uint8Array(n,r):t=new Uint8Array(n,r,e),Object.setPrototypeOf(t,u.prototype),t}function Tn(n){if(u.isBuffer(n)){let r=le(n.length)|0,e=Tr(r);return e.length===0||n.copy(e,0,0,r),e}if(n.length!==void 0)return typeof n.length!="number"||de(n.length)?Tr(0):se(n);if(n.type==="Buffer"&&Array.isArray(n.data))return se(n.data)}function le(n){if(n>=ee)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+ee.toString(16)+" bytes");return n|0}function kn(n){return+n!=n&&(n=0),u.alloc(+n)}u.isBuffer=function(r){return r!=null&&r._isBuffer===!0&&r!==u.prototype};u.compare=function(r,e){if(Cr(r,Uint8Array)&&(r=u.from(r,r.offset,r.byteLength)),Cr(e,Uint8Array)&&(e=u.from(e,e.offset,e.byteLength)),!u.isBuffer(r)||!u.isBuffer(e))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(r===e)return 0;let t=r.length,i=e.length;for(let o=0,a=Math.min(t,i);o<a;++o)if(r[o]!==e[o]){t=r[o],i=e[o];break}return t<i?-1:i<t?1:0};u.isEncoding=function(r){switch(String(r).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}};u.concat=function(r,e){if(!Array.isArray(r))throw new TypeError('"list" argument must be an Array of Buffers');if(r.length===0)return u.alloc(0);let t;if(e===void 0)for(e=0,t=0;t<r.length;++t)e+=r[t].length;let i=u.allocUnsafe(e),o=0;for(t=0;t<r.length;++t){let a=r[t];if(Cr(a,Uint8Array))o+a.length>i.length?(u.isBuffer(a)||(a=u.from(a)),a.copy(i,o)):Uint8Array.prototype.set.call(i,a,o);else if(u.isBuffer(a))a.copy(i,o);else throw new TypeError('"list" argument must be an Array of Buffers');o+=a.length}return i};function Ge(n,r){if(u.isBuffer(n))return n.length;if(ArrayBuffer.isView(n)||Cr(n,ArrayBuffer))return n.byteLength;if(typeof n!="string")throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof n);let e=n.length,t=arguments.length>2&&arguments[2]===!0;if(!t&&e===0)return 0;let i=!1;for(;;)switch(r){case"ascii":case"latin1":case"binary":return e;case"utf8":case"utf-8":return xe(n).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return e*2;case"hex":return e>>>1;case"base64":return Ke(n).length;default:if(i)return t?-1:xe(n).length;r=(""+r).toLowerCase(),i=!0}}u.byteLength=Ge;function _n(n,r,e){let t=!1;if((r===void 0||r<0)&&(r=0),r>this.length||((e===void 0||e>this.length)&&(e=this.length),e<=0)||(e>>>=0,r>>>=0,e<=r))return"";for(n||(n="utf8");;)switch(n){case"hex":return On(this,r,e);case"utf8":case"utf-8":return Ve(this,r,e);case"ascii":return $n(this,r,e);case"latin1":case"binary":return Yn(this,r,e);case"base64":return Dn(this,r,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Xn(this,r,e);default:if(t)throw new TypeError("Unknown encoding: "+n);n=(n+"").toLowerCase(),t=!0}}u.prototype._isBuffer=!0;function Mr(n,r,e){let t=n[r];n[r]=n[e],n[e]=t}u.prototype.swap16=function(){let r=this.length;if(r%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let e=0;e<r;e+=2)Mr(this,e,e+1);return this};u.prototype.swap32=function(){let r=this.length;if(r%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let e=0;e<r;e+=4)Mr(this,e,e+3),Mr(this,e+1,e+2);return this};u.prototype.swap64=function(){let r=this.length;if(r%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let e=0;e<r;e+=8)Mr(this,e,e+7),Mr(this,e+1,e+6),Mr(this,e+2,e+5),Mr(this,e+3,e+4);return this};u.prototype.toString=function(){let r=this.length;return r===0?"":arguments.length===0?Ve(this,0,r):_n.apply(this,arguments)};u.prototype.toLocaleString=u.prototype.toString;u.prototype.equals=function(r){if(!u.isBuffer(r))throw new TypeError("Argument must be a Buffer");return this===r?!0:u.compare(this,r)===0};u.prototype.inspect=function(){let r="",e=Yr.INSPECT_MAX_BYTES;return r=this.toString("hex",0,e).replace(/(.{2})/g,"$1 ").trim(),this.length>e&&(r+=" ... "),"<Buffer "+r+">"};De&&(u.prototype[De]=u.prototype.inspect);u.prototype.compare=function(r,e,t,i,o){if(Cr(r,Uint8Array)&&(r=u.from(r,r.offset,r.byteLength)),!u.isBuffer(r))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof r);if(e===void 0&&(e=0),t===void 0&&(t=r?r.length:0),i===void 0&&(i=0),o===void 0&&(o=this.length),e<0||t>r.length||i<0||o>this.length)throw new RangeError("out of range index");if(i>=o&&e>=t)return 0;if(i>=o)return-1;if(e>=t)return 1;if(e>>>=0,t>>>=0,i>>>=0,o>>>=0,this===r)return 0;let a=o-i,p=t-e,v=Math.min(a,p),C=this.slice(i,o),g=r.slice(e,t);for(let B=0;B<v;++B)if(C[B]!==g[B]){a=C[B],p=g[B];break}return a<p?-1:p<a?1:0};function He(n,r,e,t,i){if(n.length===0)return-1;if(typeof e=="string"?(t=e,e=0):e>2147483647?e=2147483647:e<-2147483648&&(e=-2147483648),e=+e,de(e)&&(e=i?0:n.length-1),e<0&&(e=n.length+e),e>=n.length){if(i)return-1;e=n.length-1}else if(e<0)if(i)e=0;else return-1;if(typeof r=="string"&&(r=u.from(r,t)),u.isBuffer(r))return r.length===0?-1:Ne(n,r,e,t,i);if(typeof r=="number")return r=r&255,typeof Uint8Array.prototype.indexOf=="function"?i?Uint8Array.prototype.indexOf.call(n,r,e):Uint8Array.prototype.lastIndexOf.call(n,r,e):Ne(n,[r],e,t,i);throw new TypeError("val must be string, number or Buffer")}function Ne(n,r,e,t,i){let o=1,a=n.length,p=r.length;if(t!==void 0&&(t=String(t).toLowerCase(),t==="ucs2"||t==="ucs-2"||t==="utf16le"||t==="utf-16le")){if(n.length<2||r.length<2)return-1;o=2,a/=2,p/=2,e/=2}function v(g,B){return o===1?g[B]:g.readUInt16BE(B*o)}let C;if(i){let g=-1;for(C=e;C<a;C++)if(v(n,C)===v(r,g===-1?0:C-g)){if(g===-1&&(g=C),C-g+1===p)return g*o}else g!==-1&&(C-=C-g),g=-1}else for(e+p>a&&(e=a-p),C=e;C>=0;C--){let g=!0;for(let B=0;B<p;B++)if(v(n,C+B)!==v(r,B)){g=!1;break}if(g)return C}return-1}u.prototype.includes=function(r,e,t){return this.indexOf(r,e,t)!==-1};u.prototype.indexOf=function(r,e,t){return He(this,r,e,t,!0)};u.prototype.lastIndexOf=function(r,e,t){return He(this,r,e,t,!1)};function Rn(n,r,e,t){e=Number(e)||0;let i=n.length-e;t?(t=Number(t),t>i&&(t=i)):t=i;let o=r.length;t>o/2&&(t=o/2);let a;for(a=0;a<t;++a){let p=parseInt(r.substr(a*2,2),16);if(de(p))return a;n[e+a]=p}return a}function Mn(n,r,e,t){return ne(xe(r,n.length-e),n,e,t)}function Ln(n,r,e,t){return ne(qn(r),n,e,t)}function Pn(n,r,e,t){return ne(Ke(r),n,e,t)}function Sn(n,r,e,t){return ne(Wn(r,n.length-e),n,e,t)}u.prototype.write=function(r,e,t,i){if(e===void 0)i="utf8",t=this.length,e=0;else if(t===void 0&&typeof e=="string")i=e,t=this.length,e=0;else if(isFinite(e))e=e>>>0,isFinite(t)?(t=t>>>0,i===void 0&&(i="utf8")):(i=t,t=void 0);else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");let o=this.length-e;if((t===void 0||t>o)&&(t=o),r.length>0&&(t<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");i||(i="utf8");let a=!1;for(;;)switch(i){case"hex":return Rn(this,r,e,t);case"utf8":case"utf-8":return Mn(this,r,e,t);case"ascii":case"latin1":case"binary":return Ln(this,r,e,t);case"base64":return Pn(this,r,e,t);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Sn(this,r,e,t);default:if(a)throw new TypeError("Unknown encoding: "+i);i=(""+i).toLowerCase(),a=!0}};u.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function Dn(n,r,e){return r===0&&e===n.length?ue.fromByteArray(n):ue.fromByteArray(n.slice(r,e))}function Ve(n,r,e){e=Math.min(n.length,e);let t=[],i=r;for(;i<e;){let o=n[i],a=null,p=o>239?4:o>223?3:o>191?2:1;if(i+p<=e){let v,C,g,B;switch(p){case 1:o<128&&(a=o);break;case 2:v=n[i+1],(v&192)===128&&(B=(o&31)<<6|v&63,B>127&&(a=B));break;case 3:v=n[i+1],C=n[i+2],(v&192)===128&&(C&192)===128&&(B=(o&15)<<12|(v&63)<<6|C&63,B>2047&&(B<55296||B>57343)&&(a=B));break;case 4:v=n[i+1],C=n[i+2],g=n[i+3],(v&192)===128&&(C&192)===128&&(g&192)===128&&(B=(o&15)<<18|(v&63)<<12|(C&63)<<6|g&63,B>65535&&B<1114112&&(a=B))}}a===null?(a=65533,p=1):a>65535&&(a-=65536,t.push(a>>>10&1023|55296),a=56320|a&1023),t.push(a),i+=p}return Nn(t)}var $e=4096;function Nn(n){let r=n.length;if(r<=$e)return String.fromCharCode.apply(String,n);let e="",t=0;for(;t<r;)e+=String.fromCharCode.apply(String,n.slice(t,t+=$e));return e}function $n(n,r,e){let t="";e=Math.min(n.length,e);for(let i=r;i<e;++i)t+=String.fromCharCode(n[i]&127);return t}function Yn(n,r,e){let t="";e=Math.min(n.length,e);for(let i=r;i<e;++i)t+=String.fromCharCode(n[i]);return t}function On(n,r,e){let t=n.length;(!r||r<0)&&(r=0),(!e||e<0||e>t)&&(e=t);let i="";for(let o=r;o<e;++o)i+=Qn[n[o]];return i}function Xn(n,r,e){let t=n.slice(r,e),i="";for(let o=0;o<t.length-1;o+=2)i+=String.fromCharCode(t[o]+t[o+1]*256);return i}u.prototype.slice=function(r,e){let t=this.length;r=~~r,e=e===void 0?t:~~e,r<0?(r+=t,r<0&&(r=0)):r>t&&(r=t),e<0?(e+=t,e<0&&(e=0)):e>t&&(e=t),e<r&&(e=r);let i=this.subarray(r,e);return Object.setPrototypeOf(i,u.prototype),i};function lr(n,r,e){if(n%1!==0||n<0)throw new RangeError("offset is not uint");if(n+r>e)throw new RangeError("Trying to access beyond buffer length")}u.prototype.readUintLE=u.prototype.readUIntLE=function(r,e,t){r=r>>>0,e=e>>>0,t||lr(r,e,this.length);let i=this[r],o=1,a=0;for(;++a<e&&(o*=256);)i+=this[r+a]*o;return i};u.prototype.readUintBE=u.prototype.readUIntBE=function(r,e,t){r=r>>>0,e=e>>>0,t||lr(r,e,this.length);let i=this[r+--e],o=1;for(;e>0&&(o*=256);)i+=this[r+--e]*o;return i};u.prototype.readUint8=u.prototype.readUInt8=function(r,e){return r=r>>>0,e||lr(r,1,this.length),this[r]};u.prototype.readUint16LE=u.prototype.readUInt16LE=function(r,e){return r=r>>>0,e||lr(r,2,this.length),this[r]|this[r+1]<<8};u.prototype.readUint16BE=u.prototype.readUInt16BE=function(r,e){return r=r>>>0,e||lr(r,2,this.length),this[r]<<8|this[r+1]};u.prototype.readUint32LE=u.prototype.readUInt32LE=function(r,e){return r=r>>>0,e||lr(r,4,this.length),(this[r]|this[r+1]<<8|this[r+2]<<16)+this[r+3]*16777216};u.prototype.readUint32BE=u.prototype.readUInt32BE=function(r,e){return r=r>>>0,e||lr(r,4,this.length),this[r]*16777216+(this[r+1]<<16|this[r+2]<<8|this[r+3])};u.prototype.readBigUInt64LE=kr(function(r){r=r>>>0,$r(r,"offset");let e=this[r],t=this[r+7];(e===void 0||t===void 0)&&Qr(r,this.length-8);let i=e+this[++r]*2**8+this[++r]*2**16+this[++r]*2**24,o=this[++r]+this[++r]*2**8+this[++r]*2**16+t*2**24;return BigInt(i)+(BigInt(o)<<BigInt(32))});u.prototype.readBigUInt64BE=kr(function(r){r=r>>>0,$r(r,"offset");let e=this[r],t=this[r+7];(e===void 0||t===void 0)&&Qr(r,this.length-8);let i=e*2**24+this[++r]*2**16+this[++r]*2**8+this[++r],o=this[++r]*2**24+this[++r]*2**16+this[++r]*2**8+t;return(BigInt(i)<<BigInt(32))+BigInt(o)});u.prototype.readIntLE=function(r,e,t){r=r>>>0,e=e>>>0,t||lr(r,e,this.length);let i=this[r],o=1,a=0;for(;++a<e&&(o*=256);)i+=this[r+a]*o;return o*=128,i>=o&&(i-=Math.pow(2,8*e)),i};u.prototype.readIntBE=function(r,e,t){r=r>>>0,e=e>>>0,t||lr(r,e,this.length);let i=e,o=1,a=this[r+--i];for(;i>0&&(o*=256);)a+=this[r+--i]*o;return o*=128,a>=o&&(a-=Math.pow(2,8*e)),a};u.prototype.readInt8=function(r,e){return r=r>>>0,e||lr(r,1,this.length),this[r]&128?(255-this[r]+1)*-1:this[r]};u.prototype.readInt16LE=function(r,e){r=r>>>0,e||lr(r,2,this.length);let t=this[r]|this[r+1]<<8;return t&32768?t|4294901760:t};u.prototype.readInt16BE=function(r,e){r=r>>>0,e||lr(r,2,this.length);let t=this[r+1]|this[r]<<8;return t&32768?t|4294901760:t};u.prototype.readInt32LE=function(r,e){return r=r>>>0,e||lr(r,4,this.length),this[r]|this[r+1]<<8|this[r+2]<<16|this[r+3]<<24};u.prototype.readInt32BE=function(r,e){return r=r>>>0,e||lr(r,4,this.length),this[r]<<24|this[r+1]<<16|this[r+2]<<8|this[r+3]};u.prototype.readBigInt64LE=kr(function(r){r=r>>>0,$r(r,"offset");let e=this[r],t=this[r+7];(e===void 0||t===void 0)&&Qr(r,this.length-8);let i=this[r+4]+this[r+5]*2**8+this[r+6]*2**16+(t<<24);return(BigInt(i)<<BigInt(32))+BigInt(e+this[++r]*2**8+this[++r]*2**16+this[++r]*2**24)});u.prototype.readBigInt64BE=kr(function(r){r=r>>>0,$r(r,"offset");let e=this[r],t=this[r+7];(e===void 0||t===void 0)&&Qr(r,this.length-8);let i=(e<<24)+this[++r]*2**16+this[++r]*2**8+this[++r];return(BigInt(i)<<BigInt(32))+BigInt(this[++r]*2**24+this[++r]*2**16+this[++r]*2**8+t)});u.prototype.readFloatLE=function(r,e){return r=r>>>0,e||lr(r,4,this.length),Nr.read(this,r,!0,23,4)};u.prototype.readFloatBE=function(r,e){return r=r>>>0,e||lr(r,4,this.length),Nr.read(this,r,!1,23,4)};u.prototype.readDoubleLE=function(r,e){return r=r>>>0,e||lr(r,8,this.length),Nr.read(this,r,!0,52,8)};u.prototype.readDoubleBE=function(r,e){return r=r>>>0,e||lr(r,8,this.length),Nr.read(this,r,!1,52,8)};function vr(n,r,e,t,i,o){if(!u.isBuffer(n))throw new TypeError('"buffer" argument must be a Buffer instance');if(r>i||r<o)throw new RangeError('"value" argument is out of bounds');if(e+t>n.length)throw new RangeError("Index out of range")}u.prototype.writeUintLE=u.prototype.writeUIntLE=function(r,e,t,i){if(r=+r,e=e>>>0,t=t>>>0,!i){let p=Math.pow(2,8*t)-1;vr(this,r,e,t,p,0)}let o=1,a=0;for(this[e]=r&255;++a<t&&(o*=256);)this[e+a]=r/o&255;return e+t};u.prototype.writeUintBE=u.prototype.writeUIntBE=function(r,e,t,i){if(r=+r,e=e>>>0,t=t>>>0,!i){let p=Math.pow(2,8*t)-1;vr(this,r,e,t,p,0)}let o=t-1,a=1;for(this[e+o]=r&255;--o>=0&&(a*=256);)this[e+o]=r/a&255;return e+t};u.prototype.writeUint8=u.prototype.writeUInt8=function(r,e,t){return r=+r,e=e>>>0,t||vr(this,r,e,1,255,0),this[e]=r&255,e+1};u.prototype.writeUint16LE=u.prototype.writeUInt16LE=function(r,e,t){return r=+r,e=e>>>0,t||vr(this,r,e,2,65535,0),this[e]=r&255,this[e+1]=r>>>8,e+2};u.prototype.writeUint16BE=u.prototype.writeUInt16BE=function(r,e,t){return r=+r,e=e>>>0,t||vr(this,r,e,2,65535,0),this[e]=r>>>8,this[e+1]=r&255,e+2};u.prototype.writeUint32LE=u.prototype.writeUInt32LE=function(r,e,t){return r=+r,e=e>>>0,t||vr(this,r,e,4,4294967295,0),this[e+3]=r>>>24,this[e+2]=r>>>16,this[e+1]=r>>>8,this[e]=r&255,e+4};u.prototype.writeUint32BE=u.prototype.writeUInt32BE=function(r,e,t){return r=+r,e=e>>>0,t||vr(this,r,e,4,4294967295,0),this[e]=r>>>24,this[e+1]=r>>>16,this[e+2]=r>>>8,this[e+3]=r&255,e+4};function qe(n,r,e,t,i){je(r,t,i,n,e,7);let o=Number(r&BigInt(4294967295));n[e++]=o,o=o>>8,n[e++]=o,o=o>>8,n[e++]=o,o=o>>8,n[e++]=o;let a=Number(r>>BigInt(32)&BigInt(4294967295));return n[e++]=a,a=a>>8,n[e++]=a,a=a>>8,n[e++]=a,a=a>>8,n[e++]=a,e}function We(n,r,e,t,i){je(r,t,i,n,e,7);let o=Number(r&BigInt(4294967295));n[e+7]=o,o=o>>8,n[e+6]=o,o=o>>8,n[e+5]=o,o=o>>8,n[e+4]=o;let a=Number(r>>BigInt(32)&BigInt(4294967295));return n[e+3]=a,a=a>>8,n[e+2]=a,a=a>>8,n[e+1]=a,a=a>>8,n[e]=a,e+8}u.prototype.writeBigUInt64LE=kr(function(r,e=0){return qe(this,r,e,BigInt(0),BigInt("0xffffffffffffffff"))});u.prototype.writeBigUInt64BE=kr(function(r,e=0){return We(this,r,e,BigInt(0),BigInt("0xffffffffffffffff"))});u.prototype.writeIntLE=function(r,e,t,i){if(r=+r,e=e>>>0,!i){let v=Math.pow(2,8*t-1);vr(this,r,e,t,v-1,-v)}let o=0,a=1,p=0;for(this[e]=r&255;++o<t&&(a*=256);)r<0&&p===0&&this[e+o-1]!==0&&(p=1),this[e+o]=(r/a>>0)-p&255;return e+t};u.prototype.writeIntBE=function(r,e,t,i){if(r=+r,e=e>>>0,!i){let v=Math.pow(2,8*t-1);vr(this,r,e,t,v-1,-v)}let o=t-1,a=1,p=0;for(this[e+o]=r&255;--o>=0&&(a*=256);)r<0&&p===0&&this[e+o+1]!==0&&(p=1),this[e+o]=(r/a>>0)-p&255;return e+t};u.prototype.writeInt8=function(r,e,t){return r=+r,e=e>>>0,t||vr(this,r,e,1,127,-128),r<0&&(r=255+r+1),this[e]=r&255,e+1};u.prototype.writeInt16LE=function(r,e,t){return r=+r,e=e>>>0,t||vr(this,r,e,2,32767,-32768),this[e]=r&255,this[e+1]=r>>>8,e+2};u.prototype.writeInt16BE=function(r,e,t){return r=+r,e=e>>>0,t||vr(this,r,e,2,32767,-32768),this[e]=r>>>8,this[e+1]=r&255,e+2};u.prototype.writeInt32LE=function(r,e,t){return r=+r,e=e>>>0,t||vr(this,r,e,4,2147483647,-2147483648),this[e]=r&255,this[e+1]=r>>>8,this[e+2]=r>>>16,this[e+3]=r>>>24,e+4};u.prototype.writeInt32BE=function(r,e,t){return r=+r,e=e>>>0,t||vr(this,r,e,4,2147483647,-2147483648),r<0&&(r=4294967295+r+1),this[e]=r>>>24,this[e+1]=r>>>16,this[e+2]=r>>>8,this[e+3]=r&255,e+4};u.prototype.writeBigInt64LE=kr(function(r,e=0){return qe(this,r,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))});u.prototype.writeBigInt64BE=kr(function(r,e=0){return We(this,r,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))});function Qe(n,r,e,t,i,o){if(e+t>n.length)throw new RangeError("Index out of range");if(e<0)throw new RangeError("Index out of range")}function Je(n,r,e,t,i){return r=+r,e=e>>>0,i||Qe(n,r,e,4,34028234663852886e22,-34028234663852886e22),Nr.write(n,r,e,t,23,4),e+4}u.prototype.writeFloatLE=function(r,e,t){return Je(this,r,e,!0,t)};u.prototype.writeFloatBE=function(r,e,t){return Je(this,r,e,!1,t)};function Ze(n,r,e,t,i){return r=+r,e=e>>>0,i||Qe(n,r,e,8,17976931348623157e292,-17976931348623157e292),Nr.write(n,r,e,t,52,8),e+8}u.prototype.writeDoubleLE=function(r,e,t){return Ze(this,r,e,!0,t)};u.prototype.writeDoubleBE=function(r,e,t){return Ze(this,r,e,!1,t)};u.prototype.copy=function(r,e,t,i){if(!u.isBuffer(r))throw new TypeError("argument should be a Buffer");if(t||(t=0),!i&&i!==0&&(i=this.length),e>=r.length&&(e=r.length),e||(e=0),i>0&&i<t&&(i=t),i===t||r.length===0||this.length===0)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(t<0||t>=this.length)throw new RangeError("Index out of range");if(i<0)throw new RangeError("sourceEnd out of bounds");i>this.length&&(i=this.length),r.length-e<i-t&&(i=r.length-e+t);let o=i-t;return this===r&&typeof Uint8Array.prototype.copyWithin=="function"?this.copyWithin(e,t,i):Uint8Array.prototype.set.call(r,this.subarray(t,i),e),o};u.prototype.fill=function(r,e,t,i){if(typeof r=="string"){if(typeof e=="string"?(i=e,e=0,t=this.length):typeof t=="string"&&(i=t,t=this.length),i!==void 0&&typeof i!="string")throw new TypeError("encoding must be a string");if(typeof i=="string"&&!u.isEncoding(i))throw new TypeError("Unknown encoding: "+i);if(r.length===1){let a=r.charCodeAt(0);(i==="utf8"&&a<128||i==="latin1")&&(r=a)}}else typeof r=="number"?r=r&255:typeof r=="boolean"&&(r=Number(r));if(e<0||this.length<e||this.length<t)throw new RangeError("Out of range index");if(t<=e)return this;e=e>>>0,t=t===void 0?this.length:t>>>0,r||(r=0);let o;if(typeof r=="number")for(o=e;o<t;++o)this[o]=r;else{let a=u.isBuffer(r)?r:u.from(r,i),p=a.length;if(p===0)throw new TypeError('The value "'+r+'" is invalid for argument "value"');for(o=0;o<t-e;++o)this[o+e]=a[o%p]}return this};var Dr={};function pe(n,r,e){Dr[n]=class extends e{constructor(){super(),Object.defineProperty(this,"message",{value:r.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${n}]`,this.stack,delete this.name}get code(){return n}set code(i){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:i,writable:!0})}toString(){return`${this.name} [${n}]: ${this.message}`}}}pe("ERR_BUFFER_OUT_OF_BOUNDS",function(n){return n?`${n} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"},RangeError);pe("ERR_INVALID_ARG_TYPE",function(n,r){return`The "${n}" argument must be of type number. Received type ${typeof r}`},TypeError);pe("ERR_OUT_OF_RANGE",function(n,r,e){let t=`The value of "${n}" is out of range.`,i=e;return Number.isInteger(e)&&Math.abs(e)>2**32?i=Ye(String(e)):typeof e=="bigint"&&(i=String(e),(e>BigInt(2)**BigInt(32)||e<-(BigInt(2)**BigInt(32)))&&(i=Ye(i)),i+="n"),t+=` It must be ${r}. Received ${i}`,t},RangeError);function Ye(n){let r="",e=n.length,t=n[0]==="-"?1:0;for(;e>=t+4;e-=3)r=`_${n.slice(e-3,e)}${r}`;return`${n.slice(0,e)}${r}`}function Gn(n,r,e){$r(r,"offset"),(n[r]===void 0||n[r+e]===void 0)&&Qr(r,n.length-(e+1))}function je(n,r,e,t,i,o){if(n>e||n<r){let a=typeof r=="bigint"?"n":"",p;throw o>3?r===0||r===BigInt(0)?p=`>= 0${a} and < 2${a} ** ${(o+1)*8}${a}`:p=`>= -(2${a} ** ${(o+1)*8-1}${a}) and < 2 ** ${(o+1)*8-1}${a}`:p=`>= ${r}${a} and <= ${e}${a}`,new Dr.ERR_OUT_OF_RANGE("value",p,n)}Gn(t,i,o)}function $r(n,r){if(typeof n!="number")throw new Dr.ERR_INVALID_ARG_TYPE(r,"number",n)}function Qr(n,r,e){throw Math.floor(n)!==n?($r(n,e),new Dr.ERR_OUT_OF_RANGE(e||"offset","an integer",n)):r<0?new Dr.ERR_BUFFER_OUT_OF_BOUNDS:new Dr.ERR_OUT_OF_RANGE(e||"offset",`>= ${e?1:0} and <= ${r}`,n)}var Hn=/[^+/0-9A-Za-z-_]/g;function Vn(n){if(n=n.split("=")[0],n=n.trim().replace(Hn,""),n.length<2)return"";for(;n.length%4!==0;)n=n+"=";return n}function xe(n,r){r=r||1/0;let e,t=n.length,i=null,o=[];for(let a=0;a<t;++a){if(e=n.charCodeAt(a),e>55295&&e<57344){if(!i){if(e>56319){(r-=3)>-1&&o.push(239,191,189);continue}else if(a+1===t){(r-=3)>-1&&o.push(239,191,189);continue}i=e;continue}if(e<56320){(r-=3)>-1&&o.push(239,191,189),i=e;continue}e=(i-55296<<10|e-56320)+65536}else i&&(r-=3)>-1&&o.push(239,191,189);if(i=null,e<128){if((r-=1)<0)break;o.push(e)}else if(e<2048){if((r-=2)<0)break;o.push(e>>6|192,e&63|128)}else if(e<65536){if((r-=3)<0)break;o.push(e>>12|224,e>>6&63|128,e&63|128)}else if(e<1114112){if((r-=4)<0)break;o.push(e>>18|240,e>>12&63|128,e>>6&63|128,e&63|128)}else throw new Error("Invalid code point")}return o}function qn(n){let r=[];for(let e=0;e<n.length;++e)r.push(n.charCodeAt(e)&255);return r}function Wn(n,r){let e,t,i,o=[];for(let a=0;a<n.length&&!((r-=2)<0);++a)e=n.charCodeAt(a),t=e>>8,i=e%256,o.push(i),o.push(t);return o}function Ke(n){return ue.toByteArray(Vn(n))}function ne(n,r,e,t){let i;for(i=0;i<t&&!(i+e>=r.length||i>=n.length);++i)r[i+e]=n[i];return i}function Cr(n,r){return n instanceof r||n!=null&&n.constructor!=null&&n.constructor.name!=null&&n.constructor.name===r.name}function de(n){return n!==n}var Qn=(function(){let n="0123456789abcdef",r=new Array(256);for(let e=0;e<16;++e){let t=e*16;for(let i=0;i<16;++i)r[t+i]=n[e]+n[i]}return r})();function kr(n){return typeof BigInt>"u"?Jn:n}function Jn(){throw new Error("BigInt not supported")}});var nn=Sr((ot,te)=>{var en=en||function(n){return Buffer.from(n).toString("base64")};function Zn(n){var r=this,e=Math.round,t=Math.floor,i=new Array(64),o=new Array(64),a=new Array(64),p=new Array(64),v,C,g,B,pr=new Array(65535),dr=new Array(65535),yr=new Array(64),Fr=new Array(64),Ar=[],Er=0,Q=7,d=new Array(64),R=new Array(64),c=new Array(64),J=new Array(256),h=new Array(2048),D,I=[0,1,5,6,14,15,27,28,2,4,7,13,16,26,29,42,3,8,12,17,25,30,41,43,9,11,18,24,31,40,44,53,10,19,23,32,39,45,52,54,20,22,33,38,46,51,55,60,21,34,37,47,50,56,59,61,35,36,48,49,57,58,62,63],M=[0,0,1,5,1,1,1,1,1,1,0,0,0,0,0,0,0],O=[0,1,2,3,4,5,6,7,8,9,10,11],rr=[0,0,2,1,3,3,2,4,3,5,5,4,4,0,0,1,125],A=[1,2,3,0,4,17,5,18,33,49,65,6,19,81,97,7,34,113,20,50,129,145,161,8,35,66,177,193,21,82,209,240,36,51,98,114,130,9,10,22,23,24,25,26,37,38,39,40,41,42,52,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,225,226,227,228,229,230,231,232,233,234,241,242,243,244,245,246,247,248,249,250],xr=[0,0,3,1,1,1,1,1,1,1,1,1,0,0,0,0,0],b=[0,1,2,3,4,5,6,7,8,9,10,11],X=[0,0,2,1,2,4,4,3,4,7,5,4,4,0,1,2,119],ur=[0,1,2,3,17,4,5,33,49,6,18,65,81,7,97,113,19,34,50,129,8,20,66,145,161,177,193,9,35,51,82,240,21,98,114,209,10,22,36,52,225,37,241,23,24,25,26,38,39,40,41,42,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,130,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,226,227,228,229,230,231,232,233,234,242,243,244,245,246,247,248,249,250];function ir(f){for(var F=[16,11,10,16,24,40,51,61,12,12,14,19,26,58,60,55,14,13,16,24,40,57,69,56,14,17,22,29,51,87,80,62,18,22,37,56,68,109,103,77,24,35,55,64,81,104,113,92,49,64,78,87,103,121,120,101,72,92,95,98,112,100,103,99],U=0;U<64;U++){var m=t((F[U]*f+50)/100);m<1?m=1:m>255&&(m=255),i[I[U]]=m}for(var L=[17,18,24,47,99,99,99,99,18,21,26,66,99,99,99,99,24,26,56,99,99,99,99,99,47,66,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],P=0;P<64;P++){var Z=t((L[P]*f+50)/100);Z<1?Z=1:Z>255&&(Z=255),o[I[P]]=Z}for(var j=[1,1.387039845,1.306562965,1.175875602,1,.785694958,.5411961,.275899379],cr=0,ar=0;ar<8;ar++)for(var x=0;x<8;x++)a[cr]=1/(i[I[cr]]*j[ar]*j[x]*8),p[cr]=1/(o[I[cr]]*j[ar]*j[x]*8),cr++}function G(f,F){for(var U=0,m=0,L=new Array,P=1;P<=16;P++){for(var Z=1;Z<=f[P];Z++)L[F[m]]=[],L[F[m]][0]=U,L[F[m]][1]=P,m++,U++;U*=2}return L}function hr(){v=G(M,O),C=G(xr,b),g=G(rr,A),B=G(X,ur)}function K(){for(var f=1,F=2,U=1;U<=15;U++){for(var m=f;m<F;m++)dr[32767+m]=U,pr[32767+m]=[],pr[32767+m][1]=U,pr[32767+m][0]=m;for(var L=-(F-1);L<=-f;L++)dr[32767+L]=U,pr[32767+L]=[],pr[32767+L][1]=U,pr[32767+L][0]=F-1+L;f<<=1,F<<=1}}function V(){for(var f=0;f<256;f++)h[f]=19595*f,h[f+256>>0]=38470*f,h[f+512>>0]=7471*f+32768,h[f+768>>0]=-11059*f,h[f+1024>>0]=-21709*f,h[f+1280>>0]=32768*f+8421375,h[f+1536>>0]=-27439*f,h[f+1792>>0]=-5329*f}function N(f){for(var F=f[0],U=f[1]-1;U>=0;)F&1<<U&&(Er|=1<<Q),U--,Q--,Q<0&&(Er==255?(s(255),s(0)):s(Er),Q=7,Er=0)}function s(f){Ar.push(f)}function E(f){s(f>>8&255),s(f&255)}function er(f,F){var U,m,L,P,Z,j,cr,ar,x=0,y,_=8,sr=64;for(y=0;y<_;++y){U=f[x],m=f[x+1],L=f[x+2],P=f[x+3],Z=f[x+4],j=f[x+5],cr=f[x+6],ar=f[x+7];var S=U+ar,H=U-ar,tr=m+cr,T=m-cr,z=L+j,wr=L-j,fr=P+Z,gr=P-Z,br=S+fr,_r=S-fr,Lr=tr+z,Pr=tr-z;f[x]=br+Lr,f[x+4]=br-Lr;var Or=(Pr+_r)*.707106781;f[x+2]=_r+Or,f[x+6]=_r-Or,br=gr+wr,Lr=wr+T,Pr=T+H;var Xr=(br-Pr)*.382683433,Jr=.5411961*br+Xr,Gr=1.306562965*Pr+Xr,Hr=Lr*.707106781,Vr=H+Hr,qr=H-Hr;f[x+5]=qr+Jr,f[x+3]=qr-Jr,f[x+1]=Vr+Gr,f[x+7]=Vr-Gr,x+=8}for(x=0,y=0;y<_;++y){U=f[x],m=f[x+8],L=f[x+16],P=f[x+24],Z=f[x+32],j=f[x+40],cr=f[x+48],ar=f[x+56];var ve=U+ar,ie=U-ar,Fe=m+cr,Ee=m-cr,me=L+j,ge=L-j,Be=P+Z,cn=P-Z,Wr=ve+Be,oe=ve-Be,Zr=Fe+me,jr=Fe-me;f[x]=Wr+Zr,f[x+32]=Wr-Zr;var Ie=(jr+oe)*.707106781;f[x+16]=oe+Ie,f[x+48]=oe-Ie,Wr=cn+ge,Zr=ge+Ee,jr=Ee+ie;var Ae=(Wr-jr)*.382683433,be=.5411961*Wr+Ae,Ue=1.306562965*jr+Ae,Ce=Zr*.707106781,Te=ie+Ce,ke=ie-Ce;f[x+40]=ke+be,f[x+24]=ke-be,f[x+8]=Te+Ue,f[x+56]=Te-Ue,x++}var Kr;for(y=0;y<sr;++y)Kr=f[y]*F[y],yr[y]=Kr>0?Kr+.5|0:Kr-.5|0;return yr}function nr(){E(65504),E(16),s(74),s(70),s(73),s(70),s(0),s(1),s(1),s(0),E(1),E(1),s(0),s(0)}function q(f){if(f){E(65505),f[0]===69&&f[1]===120&&f[2]===105&&f[3]===102?E(f.length+2):(E(f.length+5+2),s(69),s(120),s(105),s(102),s(0));for(var F=0;F<f.length;F++)s(f[F])}}function W(f,F){E(65472),E(17),s(8),E(F),E(f),s(3),s(1),s(17),s(0),s(2),s(17),s(1),s(3),s(17),s(1)}function $(){E(65499),E(132),s(0);for(var f=0;f<64;f++)s(i[f]);s(1);for(var F=0;F<64;F++)s(o[F])}function w(){E(65476),E(418),s(0);for(var f=0;f<16;f++)s(M[f+1]);for(var F=0;F<=11;F++)s(O[F]);s(16);for(var U=0;U<16;U++)s(rr[U+1]);for(var m=0;m<=161;m++)s(A[m]);s(1);for(var L=0;L<16;L++)s(xr[L+1]);for(var P=0;P<=11;P++)s(b[P]);s(17);for(var Z=0;Z<16;Z++)s(X[Z+1]);for(var j=0;j<=161;j++)s(ur[j])}function l(f){typeof f>"u"||f.constructor!==Array||f.forEach(F=>{if(typeof F=="string"){E(65534);var U=F.length;E(U+2);var m;for(m=0;m<U;m++)s(F.charCodeAt(m))}})}function or(){E(65498),E(12),s(3),s(1),s(0),s(2),s(17),s(3),s(17),s(0),s(63),s(0)}function k(f,F,U,m,L){for(var P=L[0],Z=L[240],j,cr=16,ar=63,x=64,y=er(f,F),_=0;_<x;++_)Fr[I[_]]=y[_];var sr=Fr[0]-U;U=Fr[0],sr==0?N(m[0]):(j=32767+sr,N(m[dr[j]]),N(pr[j]));for(var S=63;S>0&&Fr[S]==0;S--);if(S==0)return N(P),U;for(var H=1,tr;H<=S;){for(var T=H;Fr[H]==0&&H<=S;++H);var z=H-T;if(z>=cr){tr=z>>4;for(var wr=1;wr<=tr;++wr)N(Z);z=z&15}j=32767+Fr[H],N(L[(z<<4)+dr[j]]),N(pr[j]),H++}return S!=ar&&N(P),U}function Y(){for(var f=String.fromCharCode,F=0;F<256;F++)J[F]=f(F)}this.encode=function(f,F){var U=new Date().getTime();F&&mr(F),Ar=new Array,Er=0,Q=7,E(65496),nr(),l(f.comments),q(f.exifBuffer),$(),W(f.width,f.height),w(),or();var m=0,L=0,P=0;Er=0,Q=7,this.encode.displayName="_encode_";for(var Z=f.data,j=f.width,cr=f.height,ar=j*4,x=j*3,y,_=0,sr,S,H,tr,T,z,wr,fr;_<cr;){for(y=0;y<ar;){for(tr=ar*_+y,T=tr,z=-1,wr=0,fr=0;fr<64;fr++)wr=fr>>3,z=(fr&7)*4,T=tr+wr*ar+z,_+wr>=cr&&(T-=ar*(_+1+wr-cr)),y+z>=ar&&(T-=y+z-ar+4),sr=Z[T++],S=Z[T++],H=Z[T++],d[fr]=(h[sr]+h[S+256>>0]+h[H+512>>0]>>16)-128,R[fr]=(h[sr+768>>0]+h[S+1024>>0]+h[H+1280>>0]>>16)-128,c[fr]=(h[sr+1280>>0]+h[S+1536>>0]+h[H+1792>>0]>>16)-128;m=k(d,a,m,v,g),L=k(R,p,L,C,B),P=k(c,p,P,C,B),y+=32}_+=8}if(Q>=0){var gr=[];gr[1]=Q+1,gr[0]=(1<<Q+1)-1,N(gr)}if(E(65497),typeof te>"u")return new Uint8Array(Ar);return Buffer.from(Ar);var br,_r};function mr(f){if(f<=0&&(f=1),f>100&&(f=100),D!=f){var F=0;f<50?F=Math.floor(5e3/f):F=Math.floor(200-f*2),ir(F),D=f}}function Ir(){var f=new Date().getTime();n||(n=50),Y(),hr(),K(),V(),mr(n);var F=new Date().getTime()-f}Ir()}typeof te<"u"?te.exports=rn:typeof window<"u"&&(window["jpeg-js"]=window["jpeg-js"]||{},window["jpeg-js"].encode=rn);function rn(n,r){typeof r>"u"&&(r=50);var e=new Zn(r),t=e.encode(n,r);return{data:t,width:n.width,height:n.height}}});var on=Sr((at,ye)=>{var we=(function(){"use strict";var r=new Int32Array([0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63]),e=4017,t=799,i=3406,o=2276,a=1567,p=3784,v=5793,C=2896;function g(){}function B(Q,d){for(var R=0,c=[],J,h,D=16;D>0&&!Q[D-1];)D--;c.push({children:[],index:0});var I=c[0],M;for(J=0;J<D;J++){for(h=0;h<Q[J];h++){for(I=c.pop(),I.children[I.index]=d[R];I.index>0;){if(c.length===0)throw new Error("Could not recreate Huffman Table");I=c.pop()}for(I.index++,c.push(I);c.length<=J;)c.push(M={children:[],index:0}),I.children[I.index]=M.children,I=M;R++}J+1<D&&(c.push(M={children:[],index:0}),I.children[I.index]=M.children,I=M)}return c[0].children}function pr(Q,d,R,c,J,h,D,I,M,O){var rr=R.precision,A=R.samplesPerLine,xr=R.scanLines,b=R.mcusPerLine,X=R.progressive,ur=R.maxH,ir=R.maxV,G=d,hr=0,K=0;function V(){if(K>0)return K--,hr>>K&1;if(hr=Q[d++],hr==255){var x=Q[d++];if(x)throw new Error("unexpected marker: "+(hr<<8|x).toString(16))}return K=7,hr>>>7}function N(x){for(var y=x,_;(_=V())!==null;){if(y=y[_],typeof y=="number")return y;if(typeof y!="object")throw new Error("invalid huffman sequence")}return null}function s(x){for(var y=0;x>0;){var _=V();if(_===null)return;y=y<<1|_,x--}return y}function E(x){var y=s(x);return y>=1<<x-1?y:y+(-1<<x)+1}function er(x,y){var _=N(x.huffmanTableDC),sr=_===0?0:E(_);y[0]=x.pred+=sr;for(var S=1;S<64;){var H=N(x.huffmanTableAC),tr=H&15,T=H>>4;if(tr===0){if(T<15)break;S+=16;continue}S+=T;var z=r[S];y[z]=E(tr),S++}}function nr(x,y){var _=N(x.huffmanTableDC),sr=_===0?0:E(_)<<M;y[0]=x.pred+=sr}function q(x,y){y[0]|=V()<<M}var W=0;function $(x,y){if(W>0){W--;return}for(var _=h,sr=D;_<=sr;){var S=N(x.huffmanTableAC),H=S&15,tr=S>>4;if(H===0){if(tr<15){W=s(tr)+(1<<tr)-1;break}_+=16;continue}_+=tr;var T=r[_];y[T]=E(H)*(1<<M),_++}}var w=0,l;function or(x,y){for(var _=h,sr=D,S=0;_<=sr;){var H=r[_],tr=y[H]<0?-1:1;switch(w){case 0:var T=N(x.huffmanTableAC),z=T&15,S=T>>4;if(z===0)S<15?(W=s(S)+(1<<S),w=4):(S=16,w=1);else{if(z!==1)throw new Error("invalid ACn encoding");l=E(z),w=S?2:3}continue;case 1:case 2:y[H]?y[H]+=(V()<<M)*tr:(S--,S===0&&(w=w==2?3:0));break;case 3:y[H]?y[H]+=(V()<<M)*tr:(y[H]=l<<M,w=0);break;case 4:y[H]&&(y[H]+=(V()<<M)*tr);break}_++}w===4&&(W--,W===0&&(w=0))}function k(x,y,_,sr,S){var H=_/b|0,tr=_%b,T=H*x.v+sr,z=tr*x.h+S;x.blocks[T]===void 0&&O.tolerantDecoding||y(x,x.blocks[T][z])}function Y(x,y,_){var sr=_/x.blocksPerLine|0,S=_%x.blocksPerLine;x.blocks[sr]===void 0&&O.tolerantDecoding||y(x,x.blocks[sr][S])}var mr=c.length,Ir,f,F,U,m,L;X?h===0?L=I===0?nr:q:L=I===0?$:or:L=er;var P=0,Z,j;mr==1?j=c[0].blocksPerLine*c[0].blocksPerColumn:j=b*R.mcusPerColumn,J||(J=j);for(var cr,ar;P<j;){for(f=0;f<mr;f++)c[f].pred=0;if(W=0,mr==1)for(Ir=c[0],m=0;m<J;m++)Y(Ir,L,P),P++;else for(m=0;m<J;m++){for(f=0;f<mr;f++)for(Ir=c[f],cr=Ir.h,ar=Ir.v,F=0;F<ar;F++)for(U=0;U<cr;U++)k(Ir,L,P,F,U);if(P++,P===j)break}if(P===j)do{if(Q[d]===255&&Q[d+1]!==0)break;d+=1}while(d<Q.length-2);if(K=0,Z=Q[d]<<8|Q[d+1],Z<65280)throw new Error("marker was not found");if(Z>=65488&&Z<=65495)d+=2;else break}return d-G}function dr(Q,d){var R=[],c=d.blocksPerLine,J=d.blocksPerColumn,h=c<<3,D=new Int32Array(64),I=new Uint8Array(64);function M(G,hr,K){var V=d.quantizationTable,N,s,E,er,nr,q,W,$,w,l=K,or;for(or=0;or<64;or++)l[or]=G[or]*V[or];for(or=0;or<8;++or){var k=8*or;if(l[1+k]==0&&l[2+k]==0&&l[3+k]==0&&l[4+k]==0&&l[5+k]==0&&l[6+k]==0&&l[7+k]==0){w=v*l[0+k]+512>>10,l[0+k]=w,l[1+k]=w,l[2+k]=w,l[3+k]=w,l[4+k]=w,l[5+k]=w,l[6+k]=w,l[7+k]=w;continue}N=v*l[0+k]+128>>8,s=v*l[4+k]+128>>8,E=l[2+k],er=l[6+k],nr=C*(l[1+k]-l[7+k])+128>>8,$=C*(l[1+k]+l[7+k])+128>>8,q=l[3+k]<<4,W=l[5+k]<<4,w=N-s+1>>1,N=N+s+1>>1,s=w,w=E*p+er*a+128>>8,E=E*a-er*p+128>>8,er=w,w=nr-W+1>>1,nr=nr+W+1>>1,W=w,w=$+q+1>>1,q=$-q+1>>1,$=w,w=N-er+1>>1,N=N+er+1>>1,er=w,w=s-E+1>>1,s=s+E+1>>1,E=w,w=nr*o+$*i+2048>>12,nr=nr*i-$*o+2048>>12,$=w,w=q*t+W*e+2048>>12,q=q*e-W*t+2048>>12,W=w,l[0+k]=N+$,l[7+k]=N-$,l[1+k]=s+W,l[6+k]=s-W,l[2+k]=E+q,l[5+k]=E-q,l[3+k]=er+nr,l[4+k]=er-nr}for(or=0;or<8;++or){var Y=or;if(l[8+Y]==0&&l[16+Y]==0&&l[24+Y]==0&&l[32+Y]==0&&l[40+Y]==0&&l[48+Y]==0&&l[56+Y]==0){w=v*K[or+0]+8192>>14,l[0+Y]=w,l[8+Y]=w,l[16+Y]=w,l[24+Y]=w,l[32+Y]=w,l[40+Y]=w,l[48+Y]=w,l[56+Y]=w;continue}N=v*l[0+Y]+2048>>12,s=v*l[32+Y]+2048>>12,E=l[16+Y],er=l[48+Y],nr=C*(l[8+Y]-l[56+Y])+2048>>12,$=C*(l[8+Y]+l[56+Y])+2048>>12,q=l[24+Y],W=l[40+Y],w=N-s+1>>1,N=N+s+1>>1,s=w,w=E*p+er*a+2048>>12,E=E*a-er*p+2048>>12,er=w,w=nr-W+1>>1,nr=nr+W+1>>1,W=w,w=$+q+1>>1,q=$-q+1>>1,$=w,w=N-er+1>>1,N=N+er+1>>1,er=w,w=s-E+1>>1,s=s+E+1>>1,E=w,w=nr*o+$*i+2048>>12,nr=nr*i-$*o+2048>>12,$=w,w=q*t+W*e+2048>>12,q=q*e-W*t+2048>>12,W=w,l[0+Y]=N+$,l[56+Y]=N-$,l[8+Y]=s+W,l[48+Y]=s-W,l[16+Y]=E+q,l[40+Y]=E-q,l[24+Y]=er+nr,l[32+Y]=er-nr}for(or=0;or<64;++or){var mr=128+(l[or]+8>>4);hr[or]=mr<0?0:mr>255?255:mr}}Er(h*J*8);for(var O,rr,A=0;A<J;A++){var xr=A<<3;for(O=0;O<8;O++)R.push(new Uint8Array(h));for(var b=0;b<c;b++){M(d.blocks[A][b],I,D);var X=0,ur=b<<3;for(rr=0;rr<8;rr++){var ir=R[xr+rr];for(O=0;O<8;O++)ir[ur+O]=I[X++]}}}return R}function yr(Q){return Q<0?0:Q>255?255:Q}g.prototype={load:function(d){var R=new XMLHttpRequest;R.open("GET",d,!0),R.responseType="arraybuffer",R.onload=(function(){var c=new Uint8Array(R.response||R.mozResponseArrayBuffer);this.parse(c),this.onload&&this.onload()}).bind(this),R.send(null)},parse:function(d){var R=this.opts.maxResolutionInMP*1e3*1e3,c=0,J=d.length;function h(){var T=d[c]<<8|d[c+1];return c+=2,T}function D(){var T=h(),z=d.subarray(c,c+T-2);return c+=z.length,z}function I(T){var z=1,wr=1,fr,gr;for(gr in T.components)T.components.hasOwnProperty(gr)&&(fr=T.components[gr],z<fr.h&&(z=fr.h),wr<fr.v&&(wr=fr.v));var br=Math.ceil(T.samplesPerLine/8/z),_r=Math.ceil(T.scanLines/8/wr);for(gr in T.components)if(T.components.hasOwnProperty(gr)){fr=T.components[gr];var Lr=Math.ceil(Math.ceil(T.samplesPerLine/8)*fr.h/z),Pr=Math.ceil(Math.ceil(T.scanLines/8)*fr.v/wr),Or=br*fr.h,Xr=_r*fr.v,Jr=Xr*Or,Gr=[];Er(Jr*256);for(var Hr=0;Hr<Xr;Hr++){for(var Vr=[],qr=0;qr<Or;qr++)Vr.push(new Int32Array(64));Gr.push(Vr)}fr.blocksPerLine=Lr,fr.blocksPerColumn=Pr,fr.blocks=Gr}T.maxH=z,T.maxV=wr,T.mcusPerLine=br,T.mcusPerColumn=_r}var M=null,O=null,rr=null,A,xr,b=[],X=[],ur=[],ir=[],G=h(),hr=-1;if(this.comments=[],G!=65496)throw new Error("SOI not found");for(G=h();G!=65497;){var K,V,N;switch(G){case 65280:break;case 65504:case 65505:case 65506:case 65507:case 65508:case 65509:case 65510:case 65511:case 65512:case 65513:case 65514:case 65515:case 65516:case 65517:case 65518:case 65519:case 65534:var s=D();if(G===65534){var E=String.fromCharCode.apply(null,s);this.comments.push(E)}G===65504&&s[0]===74&&s[1]===70&&s[2]===73&&s[3]===70&&s[4]===0&&(M={version:{major:s[5],minor:s[6]},densityUnits:s[7],xDensity:s[8]<<8|s[9],yDensity:s[10]<<8|s[11],thumbWidth:s[12],thumbHeight:s[13],thumbData:s.subarray(14,14+3*s[12]*s[13])}),G===65505&&s[0]===69&&s[1]===120&&s[2]===105&&s[3]===102&&s[4]===0&&(this.exifBuffer=s.subarray(5,s.length)),G===65518&&s[0]===65&&s[1]===100&&s[2]===111&&s[3]===98&&s[4]===101&&s[5]===0&&(O={version:s[6],flags0:s[7]<<8|s[8],flags1:s[9]<<8|s[10],transformCode:s[11]});break;case 65499:for(var er=h(),nr=er+c-2;c<nr;){var q=d[c++];Er(256);var W=new Int32Array(64);if(q>>4===0)for(V=0;V<64;V++){var $=r[V];W[$]=d[c++]}else if(q>>4===1)for(V=0;V<64;V++){var $=r[V];W[$]=h()}else throw new Error("DQT: invalid table spec");b[q&15]=W}break;case 65472:case 65473:case 65474:h(),A={},A.extended=G===65473,A.progressive=G===65474,A.precision=d[c++],A.scanLines=h(),A.samplesPerLine=h(),A.components={},A.componentsOrder=[];var w=A.scanLines*A.samplesPerLine;if(w>R){var l=Math.ceil((w-R)/1e6);throw new Error(`maxResolutionInMP limit exceeded by ${l}MP`)}var or=d[c++],k,Y=0,mr=0;for(K=0;K<or;K++){k=d[c];var Ir=d[c+1]>>4,f=d[c+1]&15,F=d[c+2];if(Ir<=0||f<=0)throw new Error("Invalid sampling factor, expected values above 0");A.componentsOrder.push(k),A.components[k]={h:Ir,v:f,quantizationIdx:F},c+=3}I(A),X.push(A);break;case 65476:var U=h();for(K=2;K<U;){var m=d[c++],L=new Uint8Array(16),P=0;for(V=0;V<16;V++,c++)P+=L[V]=d[c];Er(16+P);var Z=new Uint8Array(P);for(V=0;V<P;V++,c++)Z[V]=d[c];K+=17+P,(m>>4===0?ir:ur)[m&15]=B(L,Z)}break;case 65501:h(),xr=h();break;case 65500:h(),h();break;case 65498:var j=h(),cr=d[c++],ar=[],x;for(K=0;K<cr;K++){x=A.components[d[c++]];var y=d[c++];x.huffmanTableDC=ir[y>>4],x.huffmanTableAC=ur[y&15],ar.push(x)}var _=d[c++],sr=d[c++],S=d[c++],H=pr(d,c,A,ar,xr,_,sr,S>>4,S&15,this.opts);c+=H;break;case 65535:d[c]!==255&&c--;break;default:if(d[c-3]==255&&d[c-2]>=192&&d[c-2]<=254){c-=3;break}else if(G===224||G==225){if(hr!==-1)throw new Error(`first unknown JPEG marker at offset ${hr.toString(16)}, second unknown JPEG marker ${G.toString(16)} at offset ${(c-1).toString(16)}`);hr=c-1;let T=h();if(d[c+T-2]===255){c+=T-2;break}}throw new Error("unknown JPEG marker "+G.toString(16))}G=h()}if(X.length!=1)throw new Error("only single frame JPEGs supported");for(var K=0;K<X.length;K++){var tr=X[K].components;for(var V in tr)tr[V].quantizationTable=b[tr[V].quantizationIdx],delete tr[V].quantizationIdx}this.width=A.samplesPerLine,this.height=A.scanLines,this.jfif=M,this.adobe=O,this.components=[];for(var K=0;K<A.componentsOrder.length;K++){var x=A.components[A.componentsOrder[K]];this.components.push({lines:dr(A,x),scaleX:x.h/A.maxH,scaleY:x.v/A.maxV})}},getData:function(d,R){var c=this.width/d,J=this.height/R,h,D,I,M,O,rr,A,xr,b,X,ur=0,ir,G,hr,K,V,N,s,E,er,nr,q,W=d*R*this.components.length;Er(W);var $=new Uint8Array(W);switch(this.components.length){case 1:for(h=this.components[0],X=0;X<R;X++)for(O=h.lines[0|X*h.scaleY*J],b=0;b<d;b++)ir=O[0|b*h.scaleX*c],$[ur++]=ir;break;case 2:for(h=this.components[0],D=this.components[1],X=0;X<R;X++)for(O=h.lines[0|X*h.scaleY*J],rr=D.lines[0|X*D.scaleY*J],b=0;b<d;b++)ir=O[0|b*h.scaleX*c],$[ur++]=ir,ir=rr[0|b*D.scaleX*c],$[ur++]=ir;break;case 3:for(q=!0,this.adobe&&this.adobe.transformCode?q=!0:typeof this.opts.colorTransform<"u"&&(q=!!this.opts.colorTransform),h=this.components[0],D=this.components[1],I=this.components[2],X=0;X<R;X++)for(O=h.lines[0|X*h.scaleY*J],rr=D.lines[0|X*D.scaleY*J],A=I.lines[0|X*I.scaleY*J],b=0;b<d;b++)q?(ir=O[0|b*h.scaleX*c],G=rr[0|b*D.scaleX*c],hr=A[0|b*I.scaleX*c],E=yr(ir+1.402*(hr-128)),er=yr(ir-.3441363*(G-128)-.71413636*(hr-128)),nr=yr(ir+1.772*(G-128))):(E=O[0|b*h.scaleX*c],er=rr[0|b*D.scaleX*c],nr=A[0|b*I.scaleX*c]),$[ur++]=E,$[ur++]=er,$[ur++]=nr;break;case 4:if(!this.adobe)throw new Error("Unsupported color mode (4 components)");for(q=!1,this.adobe&&this.adobe.transformCode?q=!0:typeof this.opts.colorTransform<"u"&&(q=!!this.opts.colorTransform),h=this.components[0],D=this.components[1],I=this.components[2],M=this.components[3],X=0;X<R;X++)for(O=h.lines[0|X*h.scaleY*J],rr=D.lines[0|X*D.scaleY*J],A=I.lines[0|X*I.scaleY*J],xr=M.lines[0|X*M.scaleY*J],b=0;b<d;b++)q?(ir=O[0|b*h.scaleX*c],G=rr[0|b*D.scaleX*c],hr=A[0|b*I.scaleX*c],K=xr[0|b*M.scaleX*c],V=255-yr(ir+1.402*(hr-128)),N=255-yr(ir-.3441363*(G-128)-.71413636*(hr-128)),s=255-yr(ir+1.772*(G-128))):(V=O[0|b*h.scaleX*c],N=rr[0|b*D.scaleX*c],s=A[0|b*I.scaleX*c],K=xr[0|b*M.scaleX*c]),$[ur++]=255-V,$[ur++]=255-N,$[ur++]=255-s,$[ur++]=255-K;break;default:throw new Error("Unsupported color mode")}return $},copyToImageData:function(d,R){var c=d.width,J=d.height,h=d.data,D=this.getData(c,J),I=0,M=0,O,rr,A,xr,b,X,ur,ir,G;switch(this.components.length){case 1:for(rr=0;rr<J;rr++)for(O=0;O<c;O++)A=D[I++],h[M++]=A,h[M++]=A,h[M++]=A,R&&(h[M++]=255);break;case 3:for(rr=0;rr<J;rr++)for(O=0;O<c;O++)ur=D[I++],ir=D[I++],G=D[I++],h[M++]=ur,h[M++]=ir,h[M++]=G,R&&(h[M++]=255);break;case 4:for(rr=0;rr<J;rr++)for(O=0;O<c;O++)b=D[I++],X=D[I++],A=D[I++],xr=D[I++],ur=255-yr(b*(1-xr/255)+xr),ir=255-yr(X*(1-xr/255)+xr),G=255-yr(A*(1-xr/255)+xr),h[M++]=ur,h[M++]=ir,h[M++]=G,R&&(h[M++]=255);break;default:throw new Error("Unsupported color mode")}}};var Fr=0,Ar=0;function Er(Q=0){var d=Fr+Q;if(d>Ar){var R=Math.ceil((d-Ar)/1024/1024);throw new Error(`maxMemoryUsageInMB limit exceeded by at least ${R}MB`)}Fr=d}return g.resetMaxMemoryUsage=function(Q){Fr=0,Ar=Q},g.getBytesAllocated=function(){return Fr},g.requestMemoryAllocation=Er,g})();typeof ye<"u"?ye.exports=tn:typeof window<"u"&&(window["jpeg-js"]=window["jpeg-js"]||{},window["jpeg-js"].decode=tn);function tn(n,r={}){var e={colorTransform:void 0,useTArray:!1,formatAsRGBA:!0,tolerantDecoding:!0,maxResolutionInMP:100,maxMemoryUsageInMB:512},t={...e,...r},i=new Uint8Array(n),o=new we;o.opts=t,we.resetMaxMemoryUsage(t.maxMemoryUsageInMB*1024*1024),o.parse(i);var a=t.formatAsRGBA?4:3,p=o.width*o.height*a;try{we.requestMemoryAllocation(p);var v={width:o.width,height:o.height,exifBuffer:o.exifBuffer,data:t.useTArray?new Uint8Array(p):Buffer.alloc(p)};o.comments.length>0&&(v.comments=o.comments)}catch(C){throw C instanceof RangeError?new Error("Could not allocate enough memory for the image. Required: "+p):C instanceof ReferenceError&&C.message==="Buffer is not defined"?new Error("Buffer is not globally defined in this environment. Consider setting useTArray to true"):C}return o.copyToImageData(v,t.formatAsRGBA),v}});var fn=Sr((ft,an)=>{var jn=nn(),Kn=on();an.exports={encode:jn,decode:Kn}});var zn={};wn(zn,{jpeg:()=>sn.default});var un=Re(ze()),sn=Re(fn());globalThis.Buffer=un.Buffer;return yn(zn);})();
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)
*/

const BaoziBannerCropper = (() => {
  const samples = {"NARROWBANNER":"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t5lrOnnM3lboyN/+v+769R09a6z4FW09r8NIYriGSGT7VKdkilT1HY16VRQB5P8AD63uLf4qePZ5beVYnmBjcoQH5PQ961/C/ia/+ImleJNM1PQ5tJSPdaq7EncGDAjkD5hgZx6ivQaKAPB/AvjA/DDTrnwp4q0u/ikt5nkgnghMiSqx7e3ofeup8J6h4l8ezeILrUklsfDd3A1vp9rNAqudwxvzjJAHvjJ9q9NaNX+8qnHqM07FAHhPgrxbN8K7W58KeK9LvVSCZ5LW6toTIkqscn/HPvg4rS8Hw6n45+KUnji40+ax0i0g8ixWdcNLxjcPzJ9Ogr2NkV/vAEehGaXGBgUAeQfBy0ubfxd4+ee3kiWS+QoXQqGG+bpnr2qe0tbkftI6hdGCUQNpigSFDtztTjPSvWCKKAPJ/iJbXE3xY8BzRW8rxRTN5jqhKp8w6ntXrGKTFKKADFY/iK0Nxp29RzCd5HqO9bNNdQ6lWGQRgg1hiaKr0pU31LpzcJKS6HBRfdqYkBckgD610/8AYWnf8+yj6E1JFpNjC+5LaPd2JGSPzr5aPDtZvWSselLHwfQzvDqODcyFSEfaFJGM4z0reFIBgYpRX0+FoLD0lTTvY86rP2k3IWiiiukzCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiuE/tC9/wCfu4/7+H/Gj+0L3/n7uP8Av4f8aAO7orhP7Qvf+fu4/wC/h/xo/tC9/wCfu4/7+H/GgDu6K4T+0L3/AJ+7j/v4f8aP7Qvf+fu4/wC/h/xoA7uiuE/tC9/5+7j/AL+H/Gj+0L3/AJ+7j/v4f8aAO7orhP7Qvf8An7uP+/h/xo/tC9/5+7j/AL+H/GgDu6K4T+0L3/n7uP8Av4f8aP7Qvf8An7uP+/h/xoA7uiuE/tC9/wCfu4/7+H/Gj+0L3/n7uP8Av4f8aAO7orhP7Qvf+fu4/wC/h/xo/tC9/wCfu4/7+H/GgDu6K4T+0L3/AJ+7j/v4f8aP7Qvf+fu4/wC/h/xoA7uiuE/tC9/5+7j/AL+H/Gj+0L3/AJ+7j/v4f8aAO7orhP7Qvf8An7uP+/h/xo/tC9/5+7j/AL+H/GgDu6K4T+0L3/n7uP8Av4f8aP7Qvf8An7uP+/h/xoA7uiuE/tC9/wCfu4/7+H/Gj+0L3/n7uP8Av4f8aAO7orhP7Qvf+fu4/wC/h/xo/tC9/wCfu4/7+H/GgDu6K4T+0L3/AJ+7j/v4f8aP7Qvf+fu4/wC/h/xoA7uiuE/tC9/5+7j/AL+H/Gj+0L3/AJ+7j/v4f8aAO7orhP7Qvf8An7uP+/h/xo/tC9/5+7j/AL+H/GgDu6K4T+0L3/n7uP8Av4f8aP7Qvf8An7uP+/h/xoA7uiuE/tC9/wCfu4/7+H/Gj+0L3/n7uP8Av4f8aAO7orhP7Qvf+fu4/wC/h/xo/tC9/wCfu4/7+H/GgDu6K4T+0L3/AJ+7j/v4f8aP7Qvf+fu4/wC/h/xoA7uiuE/tC9/5+7j/AL+H/Gj+0L3/AJ+7j/v4f8aAO7orhP7Qvf8An7uP+/h/xo/tC9/5+7j/AL+H/GgDu6K4T+0L3/n7uP8Av4f8aP7Qvf8An7uP+/h/xoA7uiuE/tC9/wCfu4/7+H/Gj+0L3/n7uP8Av4f8aAO7orhP7Qvf+fu4/wC/h/xo/tC9/wCfu4/7+H/GgDu6K4T+0L3/AJ+7j/v4f8aP7Qvf+fu4/wC/h/xoA7uiuE/tC9/5+7j/AL+H/Gj+0L3/AJ+7j/v4f8aAO7orhP7Qvf8An7uP+/h/xo/tC9/5+7j/AL+H/GgDu6K4T+0L3/n7uP8Av4f8aP7Qvf8An7uP+/h/xoA7uiuE/tC9/wCfu4/7+H/Gj+0L3/n7uP8Av4f8aAO7orhP7Qvf+fu4/wC/h/xo/tC9/wCfu4/7+H/GgDu6K4T+0L3/AJ+7j/v4f8aP7Qvf+fu4/wC/h/xoA7uiuE/tC9/5+7j/AL+H/Gj+0L3/AJ+7j/v4f8aAO7orhP7Qvf8An7uP+/h/xo/tC9/5+7j/AL+H/GgDu6K4T+0L3/n7uP8Av4f8aP7Qvf8An7uP+/h/xoA7uiuE/tC9/wCfu4/7+H/Gj+0L3/n7uP8Av4f8aAO7orhP7Qvf+fu4/wC/h/xo/tC9/wCfu4/7+H/GgDu6K4T+0L3/AJ+7j/v4f8aP7Qvf+fu4/wC/h/xoA7uiuE/tC9/5+7j/AL+H/Gj+0L3/AJ+7j/v4f8aAP//Z","BANNER":"/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCADIAyADASIAAhEBAxEB/8QAHAABAAMAAwEBAAAAAAAAAAAAAAUGBwMECAIB/8QAWxAAAQQBAgQDAwUHCxEGBwEAAQACAwQFBhEHEiExE0FRFCJhFTJxgZEXI0JScqGxCBY1N1NWgpKUwdElMzQ4VFVic3WTsrO00tPh8CRDV3SEohg2Y3aDlfGj/8QAGwEBAAIDAQEAAAAAAAAAAAAAAAQFAQMGAgf/xAAzEQEAAQMCAwUFCAMBAAAAAAAAAQIDEgQRBSExQVFhcYETFDKh0QYWIjNSkbHhU2LB8P/aAAwDAQACEQMRAD8A39ERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQfiL4e9rGlzjsB3Krd3IzWnkNJZGOw3VZxLilrQURNfOqekN1mzVdnksfjxD/ALxv2r88eL90Z9qqCLnPvbX/AIo/f+kz3CP1Lf48X7oz7U8eL90Z9qp52a0kkAeZKNLXtDmua4eoO6z966+vsvn/AEx7jH6lx8eL91Z9qeNF+6N+1U9Fj721/wCKP3/o9wj9XyXMHfsv1VSremqv91xcz8XdWaGVs0TZG/NcN10HDOLWtfExTG1UdY+iLesVWuvRzIiK2aBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQR+XcW46Tbz2H51WlZMx+xz/AKR+lVtfP/tT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i8O3cdvMgK1/cM4f/wB55f5ZN/vJ9wzh/wD3nl/lk3+8g0MEOaCCCD2PqvpccMTK8DIYxsyNoa0b9gBsuRAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREHUvQe0U5Ix1cR0+lUnJYnH5esauSpQ2ogejZW77H4HuFoCjbmLisnna7kk9R5rneN8Lu6mqm/p52rp9P2nvStPepoiaa+jHb3BzStrd0DbdMn9zl5h9hUHPwJqEk187KPQPg3/QVtxwdryfGR9P8AyT5Dt/jR/b/yVNRVx+3G0Zeu0/ykT7rLC/uK5KPpDqcNHp4bx+goeC+WefvmpwW/Fjz/ADrdPkO3+PF9v/JPkO3+NH9v/JbfeOPfo+UMY6bv/lh8PAmEnexn3n18Ov8A0lTNHgvpisQ6zLdtn0c8MH5lq/yHb/Gj+3/kv35DtfjR/b/yWuuvj9fKcvSIhmI0sK1iNPYfARGPF4+GqHDZzmjdx+lx6q7YquYKbeYe873iuKph44HCSV3O4dht0UqrTgvCr9q5Op1U71T057z6y0ai/TVGFHR+oiLpkQREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBEUNjdTYzK5zKYepI91zGFgstcwgN5gSNj59igmURQWI1fgs7Zv1sdfZLYoSOjsxFpa9hHc7OAJHxHRBOoqHDxg0bYjEkNy7LGezmY+dwP1hintN6ww2rWWnYexJKKrwyYSQvjLXEbgbOAPkgnkUHmNYad0/cbUy+YqUrD4xI2OaTlJaSQD9G4P2KEr8WtE2L1ur8u14/Zi377K4Njl5hv7h/C28/RBd0Udh87itQVH28Regu12PMbpIXcwDgASPp2I+1SKAihsbqbGZXOZTD1JHuuYwsFlrmEBvMCRsfPsVMoCKC1LqzF6Tr1Jsm+Qe12G1oWRM53Oefh6fH6PVTHtVf93i/jhByovhkscm/hyNdt35TuoDN660zpy+KWYy8FOy6MSCOQO3LSSAeg+BQWJFTPus6E/fLU+x39Cn8HqHE6lpPuYa9Hcrsk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c5rgSSSd+XdnUDvv6Kp8FtX0dGHK6S1NI3FWW2zM11khrQ/la1zXO7D5rSD2PX4b75Tp1sfUiqU68VevE3ljiiaGtaPQAdlAak4f6X1bK2bM4mKew0ACdrnRybDsC5pBI+BQZbxq15i8/iKulNO2Y8pbt2WOkdVIkYACeVocOhcXbdt+gPqF88XcO/T/AAN0ziZS0y1bcEcnL25/Bl5tvr3Wo6c4c6U0pZNrEYiKKye08jnSvb+SXE8v1bKWzmnsTqWkynmaMdyuyQStjk32DwCAeh9HH7UHT0J+15pr/JVX/VNWT8Hf239c/wCNm/2grcKdSDH0oKdWIRV68bYoo29msaNgPqACjsZpXB4bJ28ljsdFXuXCTYlYTvIS7mO+59eqDLf1Sf8A8qYf/wA8f9ArYMV+w9H/AMvH/ohdPO6aw2pq8UGaoRXIon87GSE7Ndttv0PopOKNsMTIo28rGNDWj0A7IORERBXNUVS+KCy1p2jJa9w7gHbb6t/0qCi25Rsdx67q8Wq7bVWWB+4bI3lJHkoD9bdlvRtqIj1LCP51yvGOFXr2o9rYp33jn06rTSaqim3hXO2yNHZfknSN30FSzdPWifetRNH+DGSf0rvV8BTiPNNzWHf/AFD0H1dlBtcD1dc7VRjHjP03batZap6Tu7lAf1Orf4pv6F2l+L9XbUxjTEKeZ3ncREXpgREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERecnvARETIwEREyMBERMjARETIwEREyMBERMjARETIwEREyMBERMjARETIwEREyMBERMjARETIwEREyMBERMjARETIwEREyMBERMjARETIwEREyMBERMjARETIwEREyMBERMjARETIwEREyMBERMjARETIwEREyMBERMjARETIwEREyMBERMjARETIwEREyMBERMjARETIwEREyMBERMjARETIwEREyMBERMjARETIwEREyMBERMjARETIwEREyMBERMjARETIwf/2Q==","OLDBANNER":"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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/2Q=="};
  const defs = [
    { key: "OLDBANNER", width: 800, height: 282 },
    { key: "BANNER", width: 800, height: 200 },
    { key: "NARROWBANNER", width: 640, height: 186 },
  ];
  const signatureCols = 16;
  const maxAverageError = 6;
  let signatures = null;

  const xSamples = (width) => {
    const start = Math.trunc(width * 0.2);
    const end = Math.trunc(width * 0.8);
    const step = Math.max((end - start) / signatureCols, 1);
    return Array.from({ length: signatureCols }, (_, i) =>
      Math.max(0, Math.min(width - 1, Math.trunc(start + Math.trunc(i * step))))
    );
  };

  const rowAverages = (pixels, imageWidth, xOffset, yOffset, width, height) => {
    const xs = xSamples(width);
    const values = new Int16Array(height * 3);
    for (let y = 0; y < height; y++) {
      let r = 0, g = 0, b = 0;
      for (const x of xs) {
        const i = ((y + yOffset) * imageWidth + x + xOffset) * 4;
        r += pixels[i]; g += pixels[i + 1]; b += pixels[i + 2];
      }
      const j = y * 3;
      values[j] = Math.trunc(r / signatureCols);
      values[j + 1] = Math.trunc(g / signatureCols);
      values[j + 2] = Math.trunc(b / signatureCols);
    }
    return { width, height, values, xs };
  };

  const buildSignatures = () => {
    if (signatures) return signatures;
    signatures = defs.map((def) => {
      const decoded = BaoziCodec.jpeg.decode(Buffer.from(samples[def.key], "base64"), { useTArray: true });
      if (decoded.width < def.width || decoded.height < def.height) throw new Error("Bad banner sample dimensions");
      return { ...def, ...rowAverages(decoded.data, decoded.width, 0, 0, def.width, def.height) };
    });
    return signatures;
  };

  const scaleNarrowSignature = (sig, width) => {
    const height = Math.max(1, Math.round(sig.height * width / sig.width));
    const values = new Int16Array(height * 3);
    for (let y = 0; y < height; y++) {
      const sourceY = Math.max(0, Math.min(sig.height - 1, (y + 0.5) * sig.height / height - 0.5));
      const before = Math.trunc(sourceY), after = Math.min(before + 1, sig.height - 1), frac = sourceY - before;
      for (let c = 0; c < 3; c++) {
        values[y * 3 + c] = Math.round(sig.values[before * 3 + c] + (sig.values[after * 3 + c] - sig.values[before * 3 + c]) * frac);
      }
    }
    return { ...sig, width, height, values, xs: xSamples(width) };
  };

  const matchesAt = (image, y, sig, xOffset) => {
    const { width, height, values, xs } = sig;
    const pixels = image.data, imageWidth = image.width;
    const totalLimit = height * 3 * maxAverageError;
    const quickLimit = Math.trunc(totalLimit / 2);
    let diff = 0;
    const compareRow = (row) => {
      let r = 0, g = 0, b = 0;
      const base = (y + row) * imageWidth + xOffset;
      for (const x of xs) {
        const i = (base + x) * 4;
        r += pixels[i]; g += pixels[i + 1]; b += pixels[i + 2];
      }
      const j = row * 3;
      return Math.abs(Math.trunc(r / signatureCols) - values[j]) +
        Math.abs(Math.trunc(g / signatureCols) - values[j + 1]) +
        Math.abs(Math.trunc(b / signatureCols) - values[j + 2]);
    };
    for (let row = 0; row < height; row += 4) {
      diff += compareRow(row);
      if (diff > quickLimit) return false;
    }
    for (let row = 0; row < height; row++) {
      if (row % 4 === 0) continue;
      diff += compareRow(row);
      if (diff > totalLimit) return false;
    }
    return true;
  };

  const process = (bytes) => {
    try {
      const input = bytes instanceof ArrayBuffer ? new Uint8Array(bytes) : new Uint8Array(bytes.buffer, bytes.byteOffset || 0, bytes.byteLength);
      // Baozi reader pages are JPEG. Leave other formats untouched.
      if (input.length < 4 || input[0] !== 0xff || input[1] !== 0xd8) return bytes;
      const image = BaoziCodec.jpeg.decode(Buffer.from(input), { useTArray: true });
      const base = buildSignatures();
      const candidates = base.map((sig) => {
        if (sig.key === "NARROWBANNER" && image.width > sig.width && image.width < 800) {
          return scaleNarrowSignature(sig, image.width);
        }
        return sig;
      }).filter((sig) => image.width >= sig.width && image.height >= sig.height)
        .sort((a, b) => b.height - a.height);
      if (!candidates.length) return bytes;

      const bands = [];
      let y = 0;
      while (y < image.height) {
        let found = null;
        for (const sig of candidates) {
          if (y + sig.height > image.height) continue;
          const xOffset = Math.trunc((image.width - sig.width) / 2);
          if (matchesAt(image, y, sig, xOffset)) { found = sig; break; }
        }
        if (found) { bands.push({ y, height: found.height }); y += found.height; }
        else y++;
      }
      if (!bands.length) return bytes;

      const outputHeight = image.height - bands.reduce((sum, band) => sum + band.height, 0);
      if (outputHeight < 1) return bytes;
      const output = new Uint8Array(image.width * outputHeight * 4);
      let sourceY = 0, targetY = 0;
      const stride = image.width * 4;
      for (const band of bands) {
        const count = band.y - sourceY;
        if (count > 0) {
          output.set(image.data.subarray(sourceY * stride, band.y * stride), targetY * stride);
          targetY += count;
        }
        sourceY = band.y + band.height;
      }
      const tail = image.height - sourceY;
      if (tail > 0) output.set(image.data.subarray(sourceY * stride), targetY * stride);
      const encoded = BaoziCodec.jpeg.encode({ data: output, width: image.width, height: outputHeight }, 100).data;
      return encoded.buffer.slice(encoded.byteOffset, encoded.byteOffset + encoded.byteLength);
    } catch (e) {
      try { log("warning", "baozimh_www banner", `图片横幅检测失败，保留原图: ${String(e)}`); } catch (ignored) {}
      return bytes;
    }
  };
  return { process };
})();
/** @type {import('./_venera_.js')} */

class BaozimhWww extends ComicSource {
  name = "包子漫画 (yyya)";

  // 与旧的 baozi 源使用不同的 key,两者可以同时安装
  key = "baozi";

  version = "1.7.0";

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
    remove_embedded_banner: {
      title: "移除图片内横幅 (实验)",
      type: "switch",
      default: true,
    },    image_quality: {
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
          const res = await Network.get(url, { ...this.siteHeaders(url), "cache-time": "no", "prevent-parallel": "true" });
          try {
            log("info", "baozimh_www connection check",
              `GET ${url} -> ${res.status} cookieSource=${this.loadData("login_cookie") ? "loginWithCookies" : (this.loadSetting("cookie") ? "fallback-setting" : "none")} manualUA=${!!this.siteHeaders(url)["User-Agent"]}`);
          } catch (ignored) {}
          if (this.isChallenge(res)) {
            UI.showMessage("当前域名返回了网站验证页；请检查 Cookie 和 User-Agent 设置。");
            return;
          }
          if (res.status === 200) {
            const appCookies = (Network.getCookies(url) || []).map((item) => item.name).filter(Boolean);
            const cookie = appCookies.length ? "WebView Cookie（主）" : (this.loadData("login_cookie") ? "Cookie 表单备用" : (this.loadSetting("cookie") ? "手动 Cookie 备用" : "未设置 Cookie"));
            const ua = !!this.siteHeaders(url)["User-Agent"];
            const appCookieState = appCookies.length ? `应用 Cookie：已检测到 (${appCookies.join(", ")})` : "应用 Cookie：未检测到";
            UI.showMessage(`连接成功：${this.host} (HTTP 200)；${appCookieState}；当前 Cookie 来源：${cookie}；User-Agent：${ua ? "已启用" : "未启用"}`);
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
    return `需要通过网站验证:请优先使用“重新登录”在应用内完成网页验证；如 WebView Cookie 不可用，再使用 Cookie 登录入口或“备用 Cookie”设置。User-Agent 需在设置中填写。`;
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
    // WebView 原生 Cookie jar 是首选；仅在 jar 里没有 Cookie 时供直连请求使用备用值。
    const appCookies = pageHost && !options.forImage && options.cookieMode !== "none"
      ? (Network.getCookies(url) || [])
      : [];
    const hasWebviewCookies = appCookies.some((item) => item && item.name && item.value != null);
    const primaryFallback = clean(this.loadData("login_cookie"));
    const manualFallback = clean(this.loadSetting("cookie")).replace(/^cookie:\s*/i, "");
    const fallbackCookie = primaryFallback || manualFallback;
    const ua = clean(this.loadSetting("user_agent") || this.settings.user_agent.default).replace(/^user-agent:\s*/i, "");
    if (pageHost && !options.forImage && options.cookieMode !== "none" && !hasWebviewCookies && fallbackCookie) {
      h.Cookie = fallbackCookie;
    }
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
    if (this.loadSetting("remove_embedded_banner") !== false) {
      config.onResponse = (bytes) => BaoziBannerCropper.process(bytes);
    }
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
   * 统一 GET：先使用 Cookie 登录保存的 Cookie；遇到验证/拒绝时再尝试备用手动 Cookie。
   */
  async request(url, headers = {}) {
    const urls = this.mainRequestUrls(url);
    const cookieCandidates = [{ value: "", source: "webview-cookie-jar" }];
    const loginCookie = String(this.loadData("login_cookie") || "").trim();
    const manualCookie = String(this.loadSetting("cookie") || "").replace(/^cookie:\s*/i, "").trim();
    if (loginCookie) cookieCandidates.push({ value: loginCookie, source: "loginWithCookies-fallback" });
    if (manualCookie && manualCookie !== loginCookie) cookieCandidates.push({ value: manualCookie, source: "manual-fallback" });

    let lastError = null;
    for (let i = 0; i < urls.length; i++) {
      const targetUrl = urls[i];
      let res = null;
      let usedCookieSource = "app-cookie-jar";
      for (let c = 0; c < cookieCandidates.length; c++) {
        const candidate = cookieCandidates[c];
        const requestHeaders = { ...this.siteHeaders(targetUrl, { cookieMode: "none" }), ...headers };
        if (candidate.value && this.isBaoziPageHost(this.requestHost(targetUrl))) {
          requestHeaders.Cookie = candidate.value;
        }
        try {
          res = await Network.get(targetUrl, requestHeaders);
          usedCookieSource = candidate.source;
        } catch (e) {
          lastError = e;
          // Cookie 不会修复传输层故障；直接交给域名备用逻辑处理。
          break;
        }
        const denied = this.isChallenge(res) || [401, 403].includes(Number(res.status));
        if (denied && c + 1 < cookieCandidates.length) {
          try { log("warning", "baozimh_www", `Cookie ${candidate.source} 被拒绝，改试备用 Cookie: ${targetUrl}`); } catch (ignored) {}
          continue;
        }
        break;
      }

      if (!res) {
        try { log("warning", "baozimh_www", `网络请求失败，尝试备用域名 (${i + 1}/${urls.length}): ${targetUrl}`); } catch (ignored) {}
        if (i + 1 < urls.length) continue;
        throw `网络连接失败 (已尝试 ${i + 1} 个域名): ${String(lastError || "未知错误")}`;
      }

      try {
        log("info", "baozimh_www v" + this.version,
          `GET ${targetUrl} -> ${res.status} (len ${(res.body || "").length}) cookieSource=${usedCookieSource} manualUA=${!!this.siteHeaders(targetUrl)["User-Agent"]}`);
      } catch (e) {}

      if (this.isChallenge(res)) {
        try {
          const cookieNames = (Network.getCookies(targetUrl) || []).map((c) => c.name).filter(Boolean).join(",");
          const contentType = res.headers && (res.headers["content-type"] || res.headers["Content-Type"] || "unknown");
          log("error", "baozimh_www v" + this.version,
            `CHALLENGE url=${targetUrl} status=${res.status} contentType=${contentType} cookieNames=[${cookieNames}]`);
        } catch (e) {}
        throw this.challengeMessage;
      }
      if (res.status === 200) return res;

      // 仅网络异常及常见临时服务错误会切换域名；404、限流和其他 4xx 不切换。
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

  /** WebView 回调中只记录 Cookie 名称，不重组 Cookie 请求头。 */
  logWebviewCookieState() {
    try {
      const names = (Network.getCookies(this.baseUrl) || []).map((item) => item && item.name).filter(Boolean);
      const nonAnalytics = names.filter((name) => !/^_(?:ga|gid|gat)(?:_|$)/i.test(name));
      if (!names.length) {
        log("warning", "baozimh_www webview", "WebView 回调后 Cookie jar 暂无可见 Cookie");
      } else if (!nonAnalytics.length) {
        log("warning", "baozimh_www webview",
          `WebView Cookie jar 仅看到统计 Cookie，不能证明验证已通过；名称=[${names.join(", ")}]`);
      } else {
        log("info", "baozimh_www webview", `WebView Cookie jar 可见 Cookie 名称=[${names.join(", ")}]`);
      }
    } catch (e) {
      try { log("warning", "baozimh_www webview", `读取 WebView Cookie 状态失败: ${String(e)}`); } catch (ignored) {}
    }
  }
  // ---------------------------------------------------------------------------
  // 账号:网页登录 (同时用于通过验证 / 登录站点账号以使用书架)
  // ---------------------------------------------------------------------------
  account = {
    // Cookie 表单为 WebView 会话的备用方式；校验通过后保存，仅在 WebView Cookie 被拒绝时尝试。
    // 不声明 account.login，确保不会让账号密码登录优先于 WebView/Cookie 验证流程。
    loginWithCookies: {
      fields: ["Cookie"],
      validate: async (values) => {
        const raw = Array.isArray(values) ? values[0] : (values && (values.Cookie || values.cookie));
        const cookie = String(raw || "").replace(/[\r\n]+/g, "").trim().replace(/^cookie:\s*/i, "");
        if (!cookie || !/^[^=;\s]+\s*=/.test(cookie)) return false;
        const url = `${this.baseUrl}/`;
        try {
          // 新版宿主会在调用 validate 前应用表单 Cookie;这里显式传入，确保当前验证请求使用刚填写的值。
          const res = await Network.get(url, {
            ...this.siteHeaders(url),
            Cookie: cookie,
            "cache-time": "no",
            "prevent-parallel": "true",
          });
          if (this.isChallenge(res) || Number(res.status) !== 200) return false;
          this.saveData("login_cookie", cookie);
          try { log("info", "baozimh_www cookie login", `Cookie 校验通过: host=${this.host}`); } catch (e) {}
          return true;
        } catch (e) {
          try { log("error", "baozimh_www cookie login", `Cookie 校验请求失败: ${String(e)}`); } catch (ignored) {}
          return false;
        }
      },
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
            log("info", "baozimh_www v" + this.version + " webview", `url=${url} title=${title}`);
        } catch (e) {}
        if (!url || !/^https?:\/\/(?:[a-z0-9-]+\.)?baozimh\.com(?:[:/]|$)/i.test(url)) {
          return false;
        }
        const t = (title || "").trim().toLowerCase();
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
        // 回调可能在首页仍为空白/加载中的阶段触发。不能仅凭离开验证 URL
        // 就宣告成功，否则应用会提前保存尚未完成验证的 Cookie。
        // 等到站点页面有非空、非挑战标题后再让应用保存 WebView Cookie。
        if (!t) {
          return false;
        }
        return true;
      },
      onLoginSuccess: () => this.logWebviewCookieState(),
    },

    logout: () => {
      this.deleteData("login_cookie");
      for (const host of [this.baseUrl, "https://www.baozimh.com/", "https://cn.baozimh.com/", "https://tw.baozimh.com/"]) {
        try { Network.deleteCookies(host); } catch (e) {}
      }
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
    if (!u || /^(?:data:|about:|javascript:)/i.test(u)) return "";
    if (/placeholder|loading|lazy|blank|default/i.test(u) && !/\/cover\//i.test(u)) return "";
    if (u.startsWith("//")) return "https:" + u;
    if (u.startsWith("/")) return this.baseUrl + u;
    return u;
  }

  /** 汇总节点的封面候选：优先真实懒加载字段，再按目标尺寸选择 srcset。 */
  coverCandidatesFromNode(node) {
    if (!node) return [];
    const attrs = node.attributes || {};
    const candidates = [];
    const add = (value, score, width = 0) => {
      const url = this.normalizeImg(value);
      if (url) candidates.push({ url: url, score: score, width: width });
    };
    const fields = [
      ["data-original", 110], ["data-original-src", 105], ["data-src", 100],
      ["data-lazy-src", 95], ["data-image", 90], ["data-cover", 85], ["src", 55]
    ];
    for (const [key, score] of fields) add(attrs[key], score);

    for (const key of ["data-srcset", "srcset"]) {
      const srcset = String(attrs[key] || "").replace(/&amp;/g, "&");
      for (const item of srcset.split(",")) {
        const match = item.trim().match(/^(\S+)(?:\s+(\d+(?:\.\d+)?)(w|x))?$/i);
        if (!match) continue;
        const descriptor = Number(match[2] || 0);
        const width = match[3] && match[3].toLowerCase() === "x" ? descriptor * 285 : descriptor;
        const score = 75 - Math.min(40, Math.abs((width || 285) - 285) / 30);
        add(match[1], score, width);
      }
    }

    const style = String(attrs.style || "");
    const bg = style.match(/url\(["']?(.*?)["']?\)/i);
    if (bg) add(bg[1], 35);
    return candidates;
  }

  coverFromNode(node) {
    const candidates = this.coverCandidatesFromNode(node);
    candidates.sort((a, b) => b.score - a.score || a.url.length - b.url.length);
    return candidates.length ? candidates[0].url : "";
  }

  coverUrl(value, id) {
    const raw = String(value || "").trim();
    if (raw) {
      if (/^https?:\/\//i.test(raw) || raw.startsWith("//")) return this.normalizeImg(raw);
      const path = raw.replace(/^\/+/, "");
      const coverPath = /^(?:[a-z0-9-]+\/)*cover\//i.test(path) ? path : "cover/" + path;
      const separator = coverPath.includes("?") ? "&" : "?";
      const resize = /[?&](?:w|h|q)=/i.test(coverPath) ? "" : separator + "w=285&h=375&q=80";
      return "https://static-tw.baozimh.com/" + coverPath + resize;
    }
    return this.coverFromId(id);
  }

  /** 汇总卡片中的所有候选并排序；没有有效图片时才按漫画 ID 推导。 */
  coverOf(e, id) {
    const candidates = [];
    for (const node of e.querySelectorAll("amp-img, img, [style]")) {
      candidates.push(...this.coverCandidatesFromNode(node));
    }
    const bestByUrl = {};
    for (const item of candidates) {
      if (!bestByUrl[item.url] || item.score > bestByUrl[item.url].score) bestByUrl[item.url] = item;
    }
    const ranked = Object.keys(bestByUrl).map((url) => bestByUrl[url]);
    ranked.sort((a, b) =>
      b.score - a.score ||
      Math.abs((a.width || 285) - 285) - Math.abs((b.width || 285) - 285)
    );
    if (ranked.length) return ranked[0].url;
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
              const normalizedTitle = title.replace(/\s+/g, "");
              let viewMore = null;
              if (normalizedTitle.includes("热门漫画") || normalizedTitle.includes("熱門漫畫")) {
                viewMore = {
                  page: "category",
                  attributes: { category: "热门漫画", param: "__home_hot" },
                };
              } else if (normalizedTitle.includes("推荐国漫") || normalizedTitle.includes("推薦國漫")) {
                viewMore = {
                  page: "category",
                  attributes: { category: "推荐国漫", param: "__home_cn" },
                };
              }
              result.push({ title: title, comics: comics, ...(viewMore ? { viewMore } : {}) });
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
      const isHomeHot = param === "__home_hot";
      const isHomeCn = param === "__home_cn";
      const apiType = isHomeHot || isHomeCn ? "all" : param;
      const region = isHomeCn ? "cn" : (options[0] || "all");
      const state = options[1] || "all";
      const url =
        `${this.baseUrl}/api/bzmhq/amp_comic_list?type=${apiType}` +
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

      // 仅根据图片 URL 中明确的广告/占位资源标记过滤，避免误删正常漫画页和封面。
      const isExcludedChapterImage = (url) => {
        try {
          const pathname = new URL(url).pathname.toLowerCase();
          const parts = pathname.split('/').filter(Boolean);
          const filename = parts[parts.length - 1] || '';
          return parts.some((part) => /^(?:banner|banners|ad|ads|advert|advertisement|recommend|recommendation)$/.test(part)) ||
            /(?:^|[-_])(banner|advertisement|recommend)(?:[-_.]|$)/.test(filename) ||
            /(?:^|[-_.])(logo|favicon|loading|404)(?:[-_.]|$)/.test(filename) ||
            /(?:^|\/)loading\.gif$/.test(pathname) ||
            /(?:^|\/)404\.png$/.test(pathname) ||
            /(?:^|\/)favicon(?:\.[^/]*)?$/.test(pathname);
        } catch (e) {
          return false;
        }
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
            if (src && !isExcludedChapterImage(src)) list.push(rewrite(src));
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
            if (src && !isExcludedChapterImage(src)) list.push(rewrite(src));
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
