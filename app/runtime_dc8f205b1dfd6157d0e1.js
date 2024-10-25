(()=>{"use strict";var e,r,t,o,a,n={},d={};function c(e){var r=d[e];if(void 0!==r)return r.exports;var t=d[e]={exports:{}};return n[e].call(t.exports,t,t.exports,c),t.exports}c.m=n,e=[],c.O=(r,t,o,a)=>{if(!t){var n=1/0;for(f=0;f<e.length;f++){for(var[t,o,a]=e[f],d=!0,i=0;i<t.length;i++)(!1&a||n>=a)&&Object.keys(c.O).every((e=>c.O[e](t[i])))?t.splice(i--,1):(d=!1,a<n&&(n=a));if(d){e.splice(f--,1);var l=o();void 0!==l&&(r=l)}}return r}a=a||0;for(var f=e.length;f>0&&e[f-1][2]>a;f--)e[f]=e[f-1];e[f]=[t,o,a]},c.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return c.d(r,{a:r}),r},t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,c.t=function(e,o){if(1&o&&(e=this(e)),8&o)return e;if("object"==typeof e&&e){if(4&o&&e.__esModule)return e;if(16&o&&"function"==typeof e.then)return e}var a=Object.create(null);c.r(a);var n={};r=r||[null,t({}),t([]),t(t)];for(var d=2&o&&e;"object"==typeof d&&!~r.indexOf(d);d=t(d))Object.getOwnPropertyNames(d).forEach((r=>n[r]=()=>e[r]));return n.default=()=>e,c.d(a,n),a},c.d=(e,r)=>{for(var t in r)c.o(r,t)&&!c.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},c.f={},c.e=e=>Promise.all(Object.keys(c.f).reduce(((r,t)=>(c.f[t](e,r),r)),[])),c.u=e=>({27:"sparklines",78:"av-dialogs",103:"watch-browser",195:"treemap",288:"watch-dialogs",301:"stat-dialogs",334:"leaflet",378:"us-economics-dialogs",430:"modal-dialogs",538:"un-dialogs",577:"browser-slider",890:"dialogs"}[e]+"_"+{27:"9ad0c6c7dd5f5b8d939d",78:"980db2cbc1390aa0ccc2",103:"cce9e5c9f28df59f9975",195:"ba17688f0ae3766f705d",288:"5dbc4fbc8c7fbedf04dc",301:"5d3a3f72581af04631d9",334:"2f54d33fe87098258123",378:"0964b0d7e2b31778f19f",430:"ae48afe5a7110017a1dd",538:"61b0bb59652e3c7c625a",577:"050ca84abdc23f0a800d",890:"3418a2438475a5fea010"}[e]+".js"),c.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),o={},a="web-app-erc:",c.l=(e,r,t,n)=>{if(o[e])o[e].push(r);else{var d,i;if(void 0!==t)for(var l=document.getElementsByTagName("script"),f=0;f<l.length;f++){var s=l[f];if(s.getAttribute("src")==e||s.getAttribute("data-webpack")==a+t){d=s;break}}d||(i=!0,(d=document.createElement("script")).charset="utf-8",d.timeout=120,c.nc&&d.setAttribute("nonce",c.nc),d.setAttribute("data-webpack",a+t),d.src=e),o[e]=[r];var u=(r,t)=>{d.onerror=d.onload=null,clearTimeout(b);var a=o[e];if(delete o[e],d.parentNode&&d.parentNode.removeChild(d),a&&a.forEach((e=>e(t))),r)return r(t)},b=setTimeout(u.bind(null,void 0,{type:"timeout",target:d}),12e4);d.onerror=u.bind(null,d.onerror),d.onload=u.bind(null,d.onload),i&&document.head.appendChild(d)}},c.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.p="app/",(()=>{var e={121:0};c.f.j=(r,t)=>{var o=c.o(e,r)?e[r]:void 0;if(0!==o)if(o)t.push(o[2]);else if(121!=r){var a=new Promise(((t,a)=>o=e[r]=[t,a]));t.push(o[2]=a);var n=c.p+c.u(r),d=new Error;c.l(n,(t=>{if(c.o(e,r)&&(0!==(o=e[r])&&(e[r]=void 0),o)){var a=t&&("load"===t.type?"missing":t.type),n=t&&t.target&&t.target.src;d.message="Loading chunk "+r+" failed.\n("+a+": "+n+")",d.name="ChunkLoadError",d.type=a,d.request=n,o[1](d)}}),"chunk-"+r,r)}else e[r]=0},c.O.j=r=>0===e[r];var r=(r,t)=>{var o,a,[n,d,i]=t,l=0;if(n.some((r=>0!==e[r]))){for(o in d)c.o(d,o)&&(c.m[o]=d[o]);if(i)var f=i(c)}for(r&&r(t);l<n.length;l++)a=n[l],c.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return c.O(f)},t=self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})()})();