(()=>{"use strict";var e,r,t,a,o,n={},i={};function d(e){var r=i[e];if(void 0!==r)return r.exports;var t=i[e]={exports:{}};return n[e].call(t.exports,t,t.exports,d),t.exports}d.m=n,e=[],d.O=(r,t,a,o)=>{if(!t){var n=1/0;for(c=0;c<e.length;c++){for(var[t,a,o]=e[c],i=!0,l=0;l<t.length;l++)(!1&o||n>=o)&&Object.keys(d.O).every((e=>d.O[e](t[l])))?t.splice(l--,1):(i=!1,o<n&&(n=o));if(i){e.splice(c--,1);var f=a();void 0!==f&&(r=f)}}return r}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[t,a,o]},d.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return d.d(r,{a:r}),r},t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,d.t=function(e,a){if(1&a&&(e=this(e)),8&a)return e;if("object"==typeof e&&e){if(4&a&&e.__esModule)return e;if(16&a&&"function"==typeof e.then)return e}var o=Object.create(null);d.r(o);var n={};r=r||[null,t({}),t([]),t(t)];for(var i=2&a&&e;"object"==typeof i&&!~r.indexOf(i);i=t(i))Object.getOwnPropertyNames(i).forEach((r=>n[r]=()=>e[r]));return n.default=()=>e,d.d(o,n),o},d.d=(e,r)=>{for(var t in r)d.o(r,t)&&!d.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},d.f={},d.e=e=>Promise.all(Object.keys(d.f).reduce(((r,t)=>(d.f[t](e,r),r)),[])),d.u=e=>({27:"sparklines",78:"av-dialogs",103:"watch-browser",195:"treemap",288:"watch-dialogs",301:"stat-dialogs",334:"leaflet",378:"us-economics-dialogs",430:"modal-dialogs",538:"un-dialogs",577:"browser-slider",890:"dialogs"}[e]+"_"+{27:"8a1bd9176cc32c94752c",78:"ceb2d7f0bcdd8355a6e6",103:"83157a759bab423cd389",195:"ba17688f0ae3766f705d",288:"456bad7f0095ff6db8ba",301:"3b1c5042c9c61eecef72",334:"2f54d33fe87098258123",378:"5ee0d09b8f2f97f4af27",430:"b0b0cf79d5efd59806a1",538:"ef4bd3f0aaf579ba9334",577:"da482ec2194f583a08fd",890:"28b4a4e79e346c3b7c6e"}[e]+".js"),d.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),a={},o="web-app-erc:",d.l=(e,r,t,n)=>{if(a[e])a[e].push(r);else{var i,l;if(void 0!==t)for(var f=document.getElementsByTagName("script"),c=0;c<f.length;c++){var s=f[c];if(s.getAttribute("src")==e||s.getAttribute("data-webpack")==o+t){i=s;break}}i||(l=!0,(i=document.createElement("script")).charset="utf-8",i.timeout=120,d.nc&&i.setAttribute("nonce",d.nc),i.setAttribute("data-webpack",o+t),i.src=e),a[e]=[r];var u=(r,t)=>{i.onerror=i.onload=null,clearTimeout(b);var o=a[e];if(delete a[e],i.parentNode&&i.parentNode.removeChild(i),o&&o.forEach((e=>e(t))),r)return r(t)},b=setTimeout(u.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=u.bind(null,i.onerror),i.onload=u.bind(null,i.onload),l&&document.head.appendChild(i)}},d.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},d.p="app/",(()=>{var e={121:0};d.f.j=(r,t)=>{var a=d.o(e,r)?e[r]:void 0;if(0!==a)if(a)t.push(a[2]);else if(121!=r){var o=new Promise(((t,o)=>a=e[r]=[t,o]));t.push(a[2]=o);var n=d.p+d.u(r),i=new Error;d.l(n,(t=>{if(d.o(e,r)&&(0!==(a=e[r])&&(e[r]=void 0),a)){var o=t&&("load"===t.type?"missing":t.type),n=t&&t.target&&t.target.src;i.message="Loading chunk "+r+" failed.\n("+o+": "+n+")",i.name="ChunkLoadError",i.type=o,i.request=n,a[1](i)}}),"chunk-"+r,r)}else e[r]=0},d.O.j=r=>0===e[r];var r=(r,t)=>{var a,o,[n,i,l]=t,f=0;if(n.some((r=>0!==e[r]))){for(a in i)d.o(i,a)&&(d.m[a]=i[a]);if(l)var c=l(d)}for(r&&r(t);f<n.length;f++)o=n[f],d.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return d.O(c)},t=self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})()})();