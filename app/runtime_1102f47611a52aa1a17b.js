(()=>{"use strict";var e,r,t,a,o,n={},d={};function l(e){var r=d[e];if(void 0!==r)return r.exports;var t=d[e]={exports:{}};return n[e].call(t.exports,t,t.exports,l),t.exports}l.m=n,e=[],l.O=(r,t,a,o)=>{if(!t){var n=1/0;for(c=0;c<e.length;c++){for(var[t,a,o]=e[c],d=!0,i=0;i<t.length;i++)(!1&o||n>=o)&&Object.keys(l.O).every((e=>l.O[e](t[i])))?t.splice(i--,1):(d=!1,o<n&&(n=o));if(d){e.splice(c--,1);var f=a();void 0!==f&&(r=f)}}return r}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[t,a,o]},l.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return l.d(r,{a:r}),r},t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,l.t=function(e,a){if(1&a&&(e=this(e)),8&a)return e;if("object"==typeof e&&e){if(4&a&&e.__esModule)return e;if(16&a&&"function"==typeof e.then)return e}var o=Object.create(null);l.r(o);var n={};r=r||[null,t({}),t([]),t(t)];for(var d=2&a&&e;"object"==typeof d&&!~r.indexOf(d);d=t(d))Object.getOwnPropertyNames(d).forEach((r=>n[r]=()=>e[r]));return n.default=()=>e,l.d(o,n),o},l.d=(e,r)=>{for(var t in r)l.o(r,t)&&!l.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},l.f={},l.e=e=>Promise.all(Object.keys(l.f).reduce(((r,t)=>(l.f[t](e,r),r)),[])),l.u=e=>({10:"config-dialog",30:"browser-slider",57:"alpha-dialogs",138:"stat-dialogs",146:"general-dialogs",256:"usa-economy-dialogs",341:"watch-browser",437:"watch-dialogs",567:"leaflet",673:"un-dialogs",861:"quandl-dialogs"}[e]+"_"+{10:"ff98d19d3fe63ce94548",30:"96a56c867cade06efef9",57:"f7b998a755bbf020a6ff",138:"f2ef025203da3fc9743c",146:"63841f69faa1a99d41b5",256:"4556b5014460b0464d5f",341:"3665c7a8a270c310969e",437:"0616fbac12495f226588",567:"7e6e49fdc1c3f03aa5f4",673:"b7eaa39f7b8b3bdd5865",861:"5c0141051e2f86f799ba"}[e]+".js"),l.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),a={},o="web-app-erc:",l.l=(e,r,t,n)=>{if(a[e])a[e].push(r);else{var d,i;if(void 0!==t)for(var f=document.getElementsByTagName("script"),c=0;c<f.length;c++){var u=f[c];if(u.getAttribute("src")==e||u.getAttribute("data-webpack")==o+t){d=u;break}}d||(i=!0,(d=document.createElement("script")).charset="utf-8",d.timeout=120,l.nc&&d.setAttribute("nonce",l.nc),d.setAttribute("data-webpack",o+t),d.src=e),a[e]=[r];var s=(r,t)=>{d.onerror=d.onload=null,clearTimeout(p);var o=a[e];if(delete a[e],d.parentNode&&d.parentNode.removeChild(d),o&&o.forEach((e=>e(t))),r)return r(t)},p=setTimeout(s.bind(null,void 0,{type:"timeout",target:d}),12e4);d.onerror=s.bind(null,d.onerror),d.onload=s.bind(null,d.onload),i&&document.head.appendChild(d)}},l.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.p="app/",(()=>{var e={666:0};l.f.j=(r,t)=>{var a=l.o(e,r)?e[r]:void 0;if(0!==a)if(a)t.push(a[2]);else if(666!=r){var o=new Promise(((t,o)=>a=e[r]=[t,o]));t.push(a[2]=o);var n=l.p+l.u(r),d=new Error;l.l(n,(t=>{if(l.o(e,r)&&(0!==(a=e[r])&&(e[r]=void 0),a)){var o=t&&("load"===t.type?"missing":t.type),n=t&&t.target&&t.target.src;d.message="Loading chunk "+r+" failed.\n("+o+": "+n+")",d.name="ChunkLoadError",d.type=o,d.request=n,a[1](d)}}),"chunk-"+r,r)}else e[r]=0},l.O.j=r=>0===e[r];var r=(r,t)=>{var a,o,[n,d,i]=t,f=0;for(a in d)l.o(d,a)&&(l.m[a]=d[a]);if(i)var c=i(l);for(r&&r(t);f<n.length;f++)o=n[f],l.o(e,o)&&e[o]&&e[o][0](),e[n[f]]=0;return l.O(c)},t=self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})()})();