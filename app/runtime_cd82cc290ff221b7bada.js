(()=>{"use strict";var e,r,t,a,o,n={},f={};function i(e){var r=f[e];if(void 0!==r)return r.exports;var t=f[e]={exports:{}};return n[e].call(t.exports,t,t.exports,i),t.exports}i.m=n,e=[],i.O=(r,t,a,o)=>{if(!t){var n=1/0;for(c=0;c<e.length;c++){for(var[t,a,o]=e[c],f=!0,l=0;l<t.length;l++)(!1&o||n>=o)&&Object.keys(i.O).every((e=>i.O[e](t[l])))?t.splice(l--,1):(f=!1,o<n&&(n=o));if(f){e.splice(c--,1);var d=a();void 0!==d&&(r=d)}}return r}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[t,a,o]},i.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return i.d(r,{a:r}),r},t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,i.t=function(e,a){if(1&a&&(e=this(e)),8&a)return e;if("object"==typeof e&&e){if(4&a&&e.__esModule)return e;if(16&a&&"function"==typeof e.then)return e}var o=Object.create(null);i.r(o);var n={};r=r||[null,t({}),t([]),t(t)];for(var f=2&a&&e;"object"==typeof f&&!~r.indexOf(f);f=t(f))Object.getOwnPropertyNames(f).forEach((r=>n[r]=()=>e[r]));return n.default=()=>e,i.d(o,n),o},i.d=(e,r)=>{for(var t in r)i.o(r,t)&&!i.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},i.f={},i.e=e=>Promise.all(Object.keys(i.f).reduce(((r,t)=>(i.f[t](e,r),r)),[])),i.u=e=>({1:"av-dialogs",10:"config-dialog",30:"browser-slider",138:"stat-dialogs",146:"general-dialogs",341:"watch-browser",399:"us-economics-dialogs",437:"watch-dialogs",567:"leaflet",673:"un-dialogs",736:"sparklines",875:"ndl-dialogs",940:"general-modal-dialogs"}[e]+"_"+{1:"7de67c26b6e5da766977",10:"71ac10d41c94d9a11efc",30:"32cf1577df418ca78a8f",138:"43be5438a9735cecaf33",146:"de7eca68104443d5b56f",341:"aa83ccd00d34931af328",399:"108f974468d590422630",437:"d4593645d9b86de7b976",567:"90838d6bdd43c29a53d7",673:"61356d1ef369bf7bef3a",736:"8cd4479c63ae5e4efcc7",875:"9018272e2cd99351b7ae",940:"9e4b966d02de4bd107ea"}[e]+".js"),i.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),a={},o="web-app-erc:",i.l=(e,r,t,n)=>{if(a[e])a[e].push(r);else{var f,l;if(void 0!==t)for(var d=document.getElementsByTagName("script"),c=0;c<d.length;c++){var s=d[c];if(s.getAttribute("src")==e||s.getAttribute("data-webpack")==o+t){f=s;break}}f||(l=!0,(f=document.createElement("script")).charset="utf-8",f.timeout=120,i.nc&&f.setAttribute("nonce",i.nc),f.setAttribute("data-webpack",o+t),f.src=e),a[e]=[r];var u=(r,t)=>{f.onerror=f.onload=null,clearTimeout(b);var o=a[e];if(delete a[e],f.parentNode&&f.parentNode.removeChild(f),o&&o.forEach((e=>e(t))),r)return r(t)},b=setTimeout(u.bind(null,void 0,{type:"timeout",target:f}),12e4);f.onerror=u.bind(null,f.onerror),f.onload=u.bind(null,f.onload),l&&document.head.appendChild(f)}},i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.p="app/",(()=>{var e={666:0};i.f.j=(r,t)=>{var a=i.o(e,r)?e[r]:void 0;if(0!==a)if(a)t.push(a[2]);else if(666!=r){var o=new Promise(((t,o)=>a=e[r]=[t,o]));t.push(a[2]=o);var n=i.p+i.u(r),f=new Error;i.l(n,(t=>{if(i.o(e,r)&&(0!==(a=e[r])&&(e[r]=void 0),a)){var o=t&&("load"===t.type?"missing":t.type),n=t&&t.target&&t.target.src;f.message="Loading chunk "+r+" failed.\n("+o+": "+n+")",f.name="ChunkLoadError",f.type=o,f.request=n,a[1](f)}}),"chunk-"+r,r)}else e[r]=0},i.O.j=r=>0===e[r];var r=(r,t)=>{var a,o,[n,f,l]=t,d=0;if(n.some((r=>0!==e[r]))){for(a in f)i.o(f,a)&&(i.m[a]=f[a]);if(l)var c=l(i)}for(r&&r(t);d<n.length;d++)o=n[d],i.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return i.O(c)},t=self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})()})();