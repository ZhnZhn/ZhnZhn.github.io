(()=>{"use strict";var e,r,t,o,a,n={},d={};function i(e){var r=d[e];if(void 0!==r)return r.exports;var t=d[e]={exports:{}};return n[e].call(t.exports,t,t.exports,i),t.exports}i.m=n,e=[],i.O=(r,t,o,a)=>{if(!t){var n=1/0;for(f=0;f<e.length;f++){for(var[t,o,a]=e[f],d=!0,l=0;l<t.length;l++)(!1&a||n>=a)&&Object.keys(i.O).every((e=>i.O[e](t[l])))?t.splice(l--,1):(d=!1,a<n&&(n=a));if(d){e.splice(f--,1);var c=o();void 0!==c&&(r=c)}}return r}a=a||0;for(var f=e.length;f>0&&e[f-1][2]>a;f--)e[f]=e[f-1];e[f]=[t,o,a]},i.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return i.d(r,{a:r}),r},t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,i.t=function(e,o){if(1&o&&(e=this(e)),8&o)return e;if("object"==typeof e&&e){if(4&o&&e.__esModule)return e;if(16&o&&"function"==typeof e.then)return e}var a=Object.create(null);i.r(a);var n={};r=r||[null,t({}),t([]),t(t)];for(var d=2&o&&e;"object"==typeof d&&!~r.indexOf(d);d=t(d))Object.getOwnPropertyNames(d).forEach((r=>n[r]=()=>e[r]));return n.default=()=>e,i.d(a,n),a},i.d=(e,r)=>{for(var t in r)i.o(r,t)&&!i.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},i.f={},i.e=e=>Promise.all(Object.keys(i.f).reduce(((r,t)=>(i.f[t](e,r),r)),[])),i.u=e=>({27:"sparklines",78:"av-dialogs",103:"watch-browser",195:"treemap",288:"watch-dialogs",301:"stat-dialogs",334:"leaflet",378:"us-economics-dialogs",430:"modal-dialogs",538:"un-dialogs",577:"browser-slider",890:"dialogs"}[e]+"_"+{27:"8a1bd9176cc32c94752c",78:"14e59e0be34349d18ad7",103:"b7e6e21d13e2040fe5cd",195:"ba17688f0ae3766f705d",288:"04baf19d1a193f9073ac",301:"4109799e9e216036c0c2",334:"2f54d33fe87098258123",378:"6ffc324c92fefd6be7ee",430:"caa4d7444ba6369c658d",538:"b888f2dc1ee3a6d6f324",577:"d152627fe0cf599e4e69",890:"9e47a0e44a30780fa71f"}[e]+".js"),i.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),o={},a="web-app-erc:",i.l=(e,r,t,n)=>{if(o[e])o[e].push(r);else{var d,l;if(void 0!==t)for(var c=document.getElementsByTagName("script"),f=0;f<c.length;f++){var s=c[f];if(s.getAttribute("src")==e||s.getAttribute("data-webpack")==a+t){d=s;break}}d||(l=!0,(d=document.createElement("script")).charset="utf-8",d.timeout=120,i.nc&&d.setAttribute("nonce",i.nc),d.setAttribute("data-webpack",a+t),d.src=e),o[e]=[r];var u=(r,t)=>{d.onerror=d.onload=null,clearTimeout(p);var a=o[e];if(delete o[e],d.parentNode&&d.parentNode.removeChild(d),a&&a.forEach((e=>e(t))),r)return r(t)},p=setTimeout(u.bind(null,void 0,{type:"timeout",target:d}),12e4);d.onerror=u.bind(null,d.onerror),d.onload=u.bind(null,d.onload),l&&document.head.appendChild(d)}},i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.p="app/",(()=>{var e={121:0};i.f.j=(r,t)=>{var o=i.o(e,r)?e[r]:void 0;if(0!==o)if(o)t.push(o[2]);else if(121!=r){var a=new Promise(((t,a)=>o=e[r]=[t,a]));t.push(o[2]=a);var n=i.p+i.u(r),d=new Error;i.l(n,(t=>{if(i.o(e,r)&&(0!==(o=e[r])&&(e[r]=void 0),o)){var a=t&&("load"===t.type?"missing":t.type),n=t&&t.target&&t.target.src;d.message="Loading chunk "+r+" failed.\n("+a+": "+n+")",d.name="ChunkLoadError",d.type=a,d.request=n,o[1](d)}}),"chunk-"+r,r)}else e[r]=0},i.O.j=r=>0===e[r];var r=(r,t)=>{var o,a,[n,d,l]=t,c=0;if(n.some((r=>0!==e[r]))){for(o in d)i.o(d,o)&&(i.m[o]=d[o]);if(l)var f=l(i)}for(r&&r(t);c<n.length;c++)a=n[c],i.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return i.O(f)},t=self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})()})();