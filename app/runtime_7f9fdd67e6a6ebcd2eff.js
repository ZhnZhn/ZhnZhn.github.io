(()=>{"use strict";var e,r,t,a,o,n={},d={};function i(e){var r=d[e];if(void 0!==r)return r.exports;var t=d[e]={exports:{}};return n[e].call(t.exports,t,t.exports,i),t.exports}i.m=n,e=[],i.O=(r,t,a,o)=>{if(!t){var n=1/0;for(c=0;c<e.length;c++){for(var[t,a,o]=e[c],d=!0,l=0;l<t.length;l++)(!1&o||n>=o)&&Object.keys(i.O).every((e=>i.O[e](t[l])))?t.splice(l--,1):(d=!1,o<n&&(n=o));if(d){e.splice(c--,1);var f=a();void 0!==f&&(r=f)}}return r}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[t,a,o]},i.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return i.d(r,{a:r}),r},t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,i.t=function(e,a){if(1&a&&(e=this(e)),8&a)return e;if("object"==typeof e&&e){if(4&a&&e.__esModule)return e;if(16&a&&"function"==typeof e.then)return e}var o=Object.create(null);i.r(o);var n={};r=r||[null,t({}),t([]),t(t)];for(var d=2&a&&e;"object"==typeof d&&!~r.indexOf(d);d=t(d))Object.getOwnPropertyNames(d).forEach((r=>n[r]=()=>e[r]));return n.default=()=>e,i.d(o,n),o},i.d=(e,r)=>{for(var t in r)i.o(r,t)&&!i.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},i.f={},i.e=e=>Promise.all(Object.keys(i.f).reduce(((r,t)=>(i.f[t](e,r),r)),[])),i.u=e=>({27:"sparklines",78:"av-dialogs",103:"watch-browser",288:"watch-dialogs",301:"stat-dialogs",334:"leaflet",378:"us-economics-dialogs",430:"modal-dialogs",538:"un-dialogs",577:"browser-slider",890:"dialogs",967:"ndl-dialogs"}[e]+"_"+{27:"bd631b617b880f4ebf95",78:"c82f489c8c4408531253",103:"59a6b8da2ddf6249584b",288:"d820db407afda0a6d35e",301:"7b66b879ec47c8e739c1",334:"2f54d33fe87098258123",378:"8ac1a9fc4b07e98127f2",430:"6c337996b5265beb94e3",538:"4a55cc676b8b693ee3c9",577:"872c6001c90074f9317f",890:"fc1460dad402988fc2b7",967:"605f0722fb52ae2f3afd"}[e]+".js"),i.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),a={},o="web-app-erc:",i.l=(e,r,t,n)=>{if(a[e])a[e].push(r);else{var d,l;if(void 0!==t)for(var f=document.getElementsByTagName("script"),c=0;c<f.length;c++){var s=f[c];if(s.getAttribute("src")==e||s.getAttribute("data-webpack")==o+t){d=s;break}}d||(l=!0,(d=document.createElement("script")).charset="utf-8",d.timeout=120,i.nc&&d.setAttribute("nonce",i.nc),d.setAttribute("data-webpack",o+t),d.src=e),a[e]=[r];var u=(r,t)=>{d.onerror=d.onload=null,clearTimeout(p);var o=a[e];if(delete a[e],d.parentNode&&d.parentNode.removeChild(d),o&&o.forEach((e=>e(t))),r)return r(t)},p=setTimeout(u.bind(null,void 0,{type:"timeout",target:d}),12e4);d.onerror=u.bind(null,d.onerror),d.onload=u.bind(null,d.onload),l&&document.head.appendChild(d)}},i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.p="app/",(()=>{var e={121:0};i.f.j=(r,t)=>{var a=i.o(e,r)?e[r]:void 0;if(0!==a)if(a)t.push(a[2]);else if(121!=r){var o=new Promise(((t,o)=>a=e[r]=[t,o]));t.push(a[2]=o);var n=i.p+i.u(r),d=new Error;i.l(n,(t=>{if(i.o(e,r)&&(0!==(a=e[r])&&(e[r]=void 0),a)){var o=t&&("load"===t.type?"missing":t.type),n=t&&t.target&&t.target.src;d.message="Loading chunk "+r+" failed.\n("+o+": "+n+")",d.name="ChunkLoadError",d.type=o,d.request=n,a[1](d)}}),"chunk-"+r,r)}else e[r]=0},i.O.j=r=>0===e[r];var r=(r,t)=>{var a,o,[n,d,l]=t,f=0;if(n.some((r=>0!==e[r]))){for(a in d)i.o(d,a)&&(i.m[a]=d[a]);if(l)var c=l(i)}for(r&&r(t);f<n.length;f++)o=n[f],i.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return i.O(c)},t=self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})()})();