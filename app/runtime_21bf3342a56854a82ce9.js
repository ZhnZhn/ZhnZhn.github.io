(()=>{"use strict";var e,r,t,a,o,n={},l={};function i(e){var r=l[e];if(void 0!==r)return r.exports;var t=l[e]={exports:{}};return n[e].call(t.exports,t,t.exports,i),t.exports}i.m=n,e=[],i.O=(r,t,a,o)=>{if(!t){var n=1/0;for(f=0;f<e.length;f++){for(var[t,a,o]=e[f],l=!0,c=0;c<t.length;c++)(!1&o||n>=o)&&Object.keys(i.O).every((e=>i.O[e](t[c])))?t.splice(c--,1):(l=!1,o<n&&(n=o));l&&(e.splice(f--,1),r=a())}return r}o=o||0;for(var f=e.length;f>0&&e[f-1][2]>o;f--)e[f]=e[f-1];e[f]=[t,a,o]},i.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return i.d(r,{a:r}),r},t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,i.t=function(e,a){if(1&a&&(e=this(e)),8&a)return e;if("object"==typeof e&&e){if(4&a&&e.__esModule)return e;if(16&a&&"function"==typeof e.then)return e}var o=Object.create(null);i.r(o);var n={};r=r||[null,t({}),t([]),t(t)];for(var l=2&a&&e;"object"==typeof l&&!~r.indexOf(l);l=t(l))Object.getOwnPropertyNames(l).forEach((r=>n[r]=()=>e[r]));return n.default=()=>e,i.d(o,n),o},i.d=(e,r)=>{for(var t in r)i.o(r,t)&&!i.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},i.f={},i.e=e=>Promise.all(Object.keys(i.f).reduce(((r,t)=>(i.f[t](e,r),r)),[])),i.u=e=>({10:"config-dialog",30:"browser-slider",57:"alpha-dialogs",138:"stat-dialogs",146:"general-dialogs",256:"usa-economy-dialogs",341:"watch-browser",437:"watch-dialogs",567:"leaflet",673:"un-dialogs",861:"quandl-dialogs"}[e]+"_"+{10:"24d714a25e458679de5d",30:"bbfd0af9823f51678bfc",57:"09425619bccb05a7bf40",138:"80668961eedf0728480d",146:"28357235927c852fa0f6",256:"a98d8270267529e42e2c",341:"63da9001c64acd221a17",437:"9d9088f16d121e7340e8",567:"7e6e49fdc1c3f03aa5f4",673:"7f7e6b18ef8bc155be2c",861:"88e38e2c57dc9b73ebc2"}[e]+".js"),i.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),a={},o="web-app-erc:",i.l=(e,r,t,n)=>{if(a[e])a[e].push(r);else{var l,c;if(void 0!==t)for(var f=document.getElementsByTagName("script"),d=0;d<f.length;d++){var u=f[d];if(u.getAttribute("src")==e||u.getAttribute("data-webpack")==o+t){l=u;break}}l||(c=!0,(l=document.createElement("script")).charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.setAttribute("data-webpack",o+t),l.src=e),a[e]=[r];var s=(r,t)=>{l.onerror=l.onload=null,clearTimeout(p);var o=a[e];if(delete a[e],l.parentNode&&l.parentNode.removeChild(l),o&&o.forEach((e=>e(t))),r)return r(t)},p=setTimeout(s.bind(null,void 0,{type:"timeout",target:l}),12e4);l.onerror=s.bind(null,l.onerror),l.onload=s.bind(null,l.onload),c&&document.head.appendChild(l)}},i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.p="app/",(()=>{var e={666:0};i.f.j=(r,t)=>{var a=i.o(e,r)?e[r]:void 0;if(0!==a)if(a)t.push(a[2]);else if(666!=r){var o=new Promise(((t,o)=>a=e[r]=[t,o]));t.push(a[2]=o);var n=i.p+i.u(r),l=new Error;i.l(n,(t=>{if(i.o(e,r)&&(0!==(a=e[r])&&(e[r]=void 0),a)){var o=t&&("load"===t.type?"missing":t.type),n=t&&t.target&&t.target.src;l.message="Loading chunk "+r+" failed.\n("+o+": "+n+")",l.name="ChunkLoadError",l.type=o,l.request=n,a[1](l)}}),"chunk-"+r,r)}else e[r]=0},i.O.j=r=>0===e[r];var r=(r,t)=>{var a,o,[n,l,c]=t,f=0;for(a in l)i.o(l,a)&&(i.m[a]=l[a]);for(c&&c(i),r&&r(t);f<n.length;f++)o=n[f],i.o(e,o)&&e[o]&&e[o][0](),e[n[f]]=0;i.O()},t=self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})(),i.O()})();