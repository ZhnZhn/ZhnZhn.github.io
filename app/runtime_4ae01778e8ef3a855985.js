(()=>{"use strict";var e,r,t,a,o,n={},d={};function i(e){var r=d[e];if(void 0!==r)return r.exports;var t=d[e]={exports:{}};return n[e].call(t.exports,t,t.exports,i),t.exports}i.m=n,e=[],i.O=(r,t,a,o)=>{if(!t){var n=1/0;for(f=0;f<e.length;f++){for(var[t,a,o]=e[f],d=!0,l=0;l<t.length;l++)(!1&o||n>=o)&&Object.keys(i.O).every((e=>i.O[e](t[l])))?t.splice(l--,1):(d=!1,o<n&&(n=o));if(d){e.splice(f--,1);var c=a();void 0!==c&&(r=c)}}return r}o=o||0;for(var f=e.length;f>0&&e[f-1][2]>o;f--)e[f]=e[f-1];e[f]=[t,a,o]},i.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return i.d(r,{a:r}),r},t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,i.t=function(e,a){if(1&a&&(e=this(e)),8&a)return e;if("object"==typeof e&&e){if(4&a&&e.__esModule)return e;if(16&a&&"function"==typeof e.then)return e}var o=Object.create(null);i.r(o);var n={};r=r||[null,t({}),t([]),t(t)];for(var d=2&a&&e;"object"==typeof d&&!~r.indexOf(d);d=t(d))Object.getOwnPropertyNames(d).forEach((r=>n[r]=()=>e[r]));return n.default=()=>e,i.d(o,n),o},i.d=(e,r)=>{for(var t in r)i.o(r,t)&&!i.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},i.f={},i.e=e=>Promise.all(Object.keys(i.f).reduce(((r,t)=>(i.f[t](e,r),r)),[])),i.u=e=>({10:"config-dialog",30:"browser-slider",57:"alpha-dialogs",138:"stat-dialogs",146:"general-dialogs",256:"usa-economy-dialogs",341:"watch-browser",437:"watch-dialogs",567:"leaflet",673:"un-dialogs",736:"sparklines",861:"quandl-dialogs"}[e]+"_"+{10:"5720f96edf3addc31464",30:"3e5d743bc1fd9fa756e7",57:"965a393a2ae7852930cd",138:"045081e1a2bc819cc0a8",146:"8701c12eebd2a39757d1",256:"0be0b2a0e50630ba010a",341:"155b781f6ef21d289deb",437:"a148ecffd3a9788f9ce2",567:"90838d6bdd43c29a53d7",673:"248d18ba80c0c2f36476",736:"b8c18bf5601806d2c0e6",861:"d92c3794c4845e742f4b"}[e]+".js"),i.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),a={},o="web-app-erc:",i.l=(e,r,t,n)=>{if(a[e])a[e].push(r);else{var d,l;if(void 0!==t)for(var c=document.getElementsByTagName("script"),f=0;f<c.length;f++){var u=c[f];if(u.getAttribute("src")==e||u.getAttribute("data-webpack")==o+t){d=u;break}}d||(l=!0,(d=document.createElement("script")).charset="utf-8",d.timeout=120,i.nc&&d.setAttribute("nonce",i.nc),d.setAttribute("data-webpack",o+t),d.src=e),a[e]=[r];var s=(r,t)=>{d.onerror=d.onload=null,clearTimeout(p);var o=a[e];if(delete a[e],d.parentNode&&d.parentNode.removeChild(d),o&&o.forEach((e=>e(t))),r)return r(t)},p=setTimeout(s.bind(null,void 0,{type:"timeout",target:d}),12e4);d.onerror=s.bind(null,d.onerror),d.onload=s.bind(null,d.onload),l&&document.head.appendChild(d)}},i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.p="app/",(()=>{var e={666:0};i.f.j=(r,t)=>{var a=i.o(e,r)?e[r]:void 0;if(0!==a)if(a)t.push(a[2]);else if(666!=r){var o=new Promise(((t,o)=>a=e[r]=[t,o]));t.push(a[2]=o);var n=i.p+i.u(r),d=new Error;i.l(n,(t=>{if(i.o(e,r)&&(0!==(a=e[r])&&(e[r]=void 0),a)){var o=t&&("load"===t.type?"missing":t.type),n=t&&t.target&&t.target.src;d.message="Loading chunk "+r+" failed.\n("+o+": "+n+")",d.name="ChunkLoadError",d.type=o,d.request=n,a[1](d)}}),"chunk-"+r,r)}else e[r]=0},i.O.j=r=>0===e[r];var r=(r,t)=>{var a,o,[n,d,l]=t,c=0;if(n.some((r=>0!==e[r]))){for(a in d)i.o(d,a)&&(i.m[a]=d[a]);if(l)var f=l(i)}for(r&&r(t);c<n.length;c++)o=n[c],i.o(e,o)&&e[o]&&e[o][0](),e[n[c]]=0;return i.O(f)},t=self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})()})();