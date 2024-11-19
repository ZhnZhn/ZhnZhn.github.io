(()=>{"use strict";var e,r,t,o,a,n={},c={};function i(e){var r=c[e];if(void 0!==r)return r.exports;var t=c[e]={exports:{}};return n[e].call(t.exports,t,t.exports,i),t.exports}i.m=n,e=[],i.O=(r,t,o,a)=>{if(!t){var n=1/0;for(f=0;f<e.length;f++){for(var[t,o,a]=e[f],c=!0,d=0;d<t.length;d++)(!1&a||n>=a)&&Object.keys(i.O).every((e=>i.O[e](t[d])))?t.splice(d--,1):(c=!1,a<n&&(n=a));if(c){e.splice(f--,1);var l=o();void 0!==l&&(r=l)}}return r}a=a||0;for(var f=e.length;f>0&&e[f-1][2]>a;f--)e[f]=e[f-1];e[f]=[t,o,a]},i.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return i.d(r,{a:r}),r},t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,i.t=function(e,o){if(1&o&&(e=this(e)),8&o)return e;if("object"==typeof e&&e){if(4&o&&e.__esModule)return e;if(16&o&&"function"==typeof e.then)return e}var a=Object.create(null);i.r(a);var n={};r=r||[null,t({}),t([]),t(t)];for(var c=2&o&&e;"object"==typeof c&&!~r.indexOf(c);c=t(c))Object.getOwnPropertyNames(c).forEach((r=>n[r]=()=>e[r]));return n.default=()=>e,i.d(a,n),a},i.d=(e,r)=>{for(var t in r)i.o(r,t)&&!i.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},i.f={},i.e=e=>Promise.all(Object.keys(i.f).reduce(((r,t)=>(i.f[t](e,r),r)),[])),i.u=e=>({27:"sparklines",78:"av-dialogs",103:"watch-browser",195:"treemap",288:"watch-dialogs",301:"stat-dialogs",334:"leaflet",378:"us-economics-dialogs",430:"modal-dialogs",538:"un-dialogs",577:"browser-slider",890:"dialogs"}[e]+"_"+{27:"9ad0c6c7dd5f5b8d939d",78:"4333815464c249155549",103:"cce9e5c9f28df59f9975",195:"ba17688f0ae3766f705d",288:"2bda70866dfb31fe7f15",301:"5d3a3f72581af04631d9",334:"2f54d33fe87098258123",378:"0964b0d7e2b31778f19f",430:"54b116a3fd58446889a5",538:"26290418c71eef2b8059",577:"050ca84abdc23f0a800d",890:"3418a2438475a5fea010"}[e]+".js"),i.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),o={},a="web-app-erc:",i.l=(e,r,t,n)=>{if(o[e])o[e].push(r);else{var c,d;if(void 0!==t)for(var l=document.getElementsByTagName("script"),f=0;f<l.length;f++){var s=l[f];if(s.getAttribute("src")==e||s.getAttribute("data-webpack")==a+t){c=s;break}}c||(d=!0,(c=document.createElement("script")).charset="utf-8",c.timeout=120,i.nc&&c.setAttribute("nonce",i.nc),c.setAttribute("data-webpack",a+t),c.src=e),o[e]=[r];var u=(r,t)=>{c.onerror=c.onload=null,clearTimeout(b);var a=o[e];if(delete o[e],c.parentNode&&c.parentNode.removeChild(c),a&&a.forEach((e=>e(t))),r)return r(t)},b=setTimeout(u.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=u.bind(null,c.onerror),c.onload=u.bind(null,c.onload),d&&document.head.appendChild(c)}},i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.p="app/",(()=>{var e={121:0};i.f.j=(r,t)=>{var o=i.o(e,r)?e[r]:void 0;if(0!==o)if(o)t.push(o[2]);else if(121!=r){var a=new Promise(((t,a)=>o=e[r]=[t,a]));t.push(o[2]=a);var n=i.p+i.u(r),c=new Error;i.l(n,(t=>{if(i.o(e,r)&&(0!==(o=e[r])&&(e[r]=void 0),o)){var a=t&&("load"===t.type?"missing":t.type),n=t&&t.target&&t.target.src;c.message="Loading chunk "+r+" failed.\n("+a+": "+n+")",c.name="ChunkLoadError",c.type=a,c.request=n,o[1](c)}}),"chunk-"+r,r)}else e[r]=0},i.O.j=r=>0===e[r];var r=(r,t)=>{var o,a,[n,c,d]=t,l=0;if(n.some((r=>0!==e[r]))){for(o in c)i.o(c,o)&&(i.m[o]=c[o]);if(d)var f=d(i)}for(r&&r(t);l<n.length;l++)a=n[l],i.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return i.O(f)},t=self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})()})();