(()=>{"use strict";var e,r,t,a,o,n={},c={};function i(e){var r=c[e];if(void 0!==r)return r.exports;var t=c[e]={exports:{}};return n[e].call(t.exports,t,t.exports,i),t.exports}i.m=n,e=[],i.O=(r,t,a,o)=>{if(!t){var n=1/0;for(f=0;f<e.length;f++){for(var[t,a,o]=e[f],c=!0,d=0;d<t.length;d++)(!1&o||n>=o)&&Object.keys(i.O).every((e=>i.O[e](t[d])))?t.splice(d--,1):(c=!1,o<n&&(n=o));if(c){e.splice(f--,1);var l=a();void 0!==l&&(r=l)}}return r}o=o||0;for(var f=e.length;f>0&&e[f-1][2]>o;f--)e[f]=e[f-1];e[f]=[t,a,o]},i.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return i.d(r,{a:r}),r},t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,i.t=function(e,a){if(1&a&&(e=this(e)),8&a)return e;if("object"==typeof e&&e){if(4&a&&e.__esModule)return e;if(16&a&&"function"==typeof e.then)return e}var o=Object.create(null);i.r(o);var n={};r=r||[null,t({}),t([]),t(t)];for(var c=2&a&&e;"object"==typeof c&&!~r.indexOf(c);c=t(c))Object.getOwnPropertyNames(c).forEach((r=>n[r]=()=>e[r]));return n.default=()=>e,i.d(o,n),o},i.d=(e,r)=>{for(var t in r)i.o(r,t)&&!i.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},i.f={},i.e=e=>Promise.all(Object.keys(i.f).reduce(((r,t)=>(i.f[t](e,r),r)),[])),i.u=e=>({27:"sparklines",78:"av-dialogs",103:"watch-browser",195:"treemap",288:"watch-dialogs",301:"stat-dialogs",334:"leaflet",378:"us-economics-dialogs",430:"modal-dialogs",538:"un-dialogs",577:"browser-slider",890:"dialogs"}[e]+"_"+{27:"c181bd0119d27092dc25",78:"18380b0e3fa5a0a562b4",103:"83157a759bab423cd389",195:"ba17688f0ae3766f705d",288:"402aafd777aaa87c8af0",301:"1f900cca25843959e95d",334:"2f54d33fe87098258123",378:"c84f3457b554bdcd8284",430:"eca4ff64baba074fce5f",538:"63faf85441ac911c8aa7",577:"4b90e21969e64d2a7beb",890:"865c6db3ff11bbfa1732"}[e]+".js"),i.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),a={},o="web-app-erc:",i.l=(e,r,t,n)=>{if(a[e])a[e].push(r);else{var c,d;if(void 0!==t)for(var l=document.getElementsByTagName("script"),f=0;f<l.length;f++){var s=l[f];if(s.getAttribute("src")==e||s.getAttribute("data-webpack")==o+t){c=s;break}}c||(d=!0,(c=document.createElement("script")).charset="utf-8",c.timeout=120,i.nc&&c.setAttribute("nonce",i.nc),c.setAttribute("data-webpack",o+t),c.src=e),a[e]=[r];var u=(r,t)=>{c.onerror=c.onload=null,clearTimeout(p);var o=a[e];if(delete a[e],c.parentNode&&c.parentNode.removeChild(c),o&&o.forEach((e=>e(t))),r)return r(t)},p=setTimeout(u.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=u.bind(null,c.onerror),c.onload=u.bind(null,c.onload),d&&document.head.appendChild(c)}},i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.p="app/",(()=>{var e={121:0};i.f.j=(r,t)=>{var a=i.o(e,r)?e[r]:void 0;if(0!==a)if(a)t.push(a[2]);else if(121!=r){var o=new Promise(((t,o)=>a=e[r]=[t,o]));t.push(a[2]=o);var n=i.p+i.u(r),c=new Error;i.l(n,(t=>{if(i.o(e,r)&&(0!==(a=e[r])&&(e[r]=void 0),a)){var o=t&&("load"===t.type?"missing":t.type),n=t&&t.target&&t.target.src;c.message="Loading chunk "+r+" failed.\n("+o+": "+n+")",c.name="ChunkLoadError",c.type=o,c.request=n,a[1](c)}}),"chunk-"+r,r)}else e[r]=0},i.O.j=r=>0===e[r];var r=(r,t)=>{var a,o,[n,c,d]=t,l=0;if(n.some((r=>0!==e[r]))){for(a in c)i.o(c,a)&&(i.m[a]=c[a]);if(d)var f=d(i)}for(r&&r(t);l<n.length;l++)o=n[l],i.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return i.O(f)},t=self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})()})();