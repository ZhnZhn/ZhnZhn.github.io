"use strict";(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[30],{8121:(e,t,r)=>{r.r(t),r.d(t,{default:()=>pe});var n=r(9999),o=r(2564),s=r(1926),i=r(795);let l;const a=e=>{const t=parseInt((""+e.updated).trim().slice(0,4),10);return"number"!=typeof(r=t)||r-r!=0||(l||(l=(new Date).getUTCFullYear()))-t<3;var r},c=e=>e.active,d=(e,t)=>e?"SDN"===t?c:a:void 0;var p=r(7894),u=r(752),g=r(9902);const m=(0,n.kr)();var f=r(8190),x=r(5255),h=r(5893);const y={width:240,paddingBottom:8},v=e=>{let{is:t,toggleMenu:r,toggleFilter:n}=e;return(0,h.jsx)(f.Z,{isShow:t,className:"popup-menu charts__menu-more",style:y,onClose:r,children:(0,h.jsx)(x.Z,{caption:"Filter Not Active Topic",onToggle:n})})};var C=r(7815),j=r(2038);const b={dialogConf:!0,dialogType:"DialogStatN",dialogProps:{chartsType:"t2ae",dfProps:{}}},k=Object.assign,w=e=>{const t=e.text||"";return{menuTitle:t.slice(0,27),contFullCaption:e.sP+": "+(r=t,r.length>35?r.slice(0,35)+"...":r)};var r},I=e=>()=>{const{rootUrl:t,id:r,proxy:n,bT:o,lT:s,dU:i,noTime:l,dS:a}=e,c=(e=>{let{rootDimUrl:t,rootUrl:r,id:n,proxy:o="",dfDimQuery:s=""}=e;return""+o+(t||r)+"/"+n+s})(e),d=k({},b,{type:o+"_"+r,...w(e)});k(d.dialogProps,{loadId:s,descrUrl:i,dataSource:a,dfProps:{dimUrl:c,baseMeta:t,dfId:r,proxy:n,noTime:l}}),j.Ck.showDialog(o+"_"+r,o,d)},T=Array.isArray,P=(e,t)=>{const r=[];return e.forEach((e=>{e.id!==t&&(e.text=e.description,(e.hasSubjects||(e=>{let{tables:t}=e;return T(t)&&0===t.length})(e))&&(e.type="l"),r.push(e))})),r},S=(e,t)=>{const r=e[0];return 0!==(r.tables||[]).length?r.tables.map((e=>(e.text=e.id+": "+e.text+", "+(e.firstPeriod||"")+"-"+(e.latestPeriod||""),e))):0!==(r.subjects||[]).length?P(r.subjects,t):P(e,t)},Z=e=>(e.forEach((e=>{"t"===e.type&&(e.text=e.id+": "+e.text)})),e),M=Array.isArray,N=(e,t)=>e.text<t.text?-1:e.text>t.text?1:0,A={SDN:S,SIR:Z},F=function(e,t,r){void 0===e&&(e="");const{rootUrl:n,dfTi:o="",lT:s}=t;return fetch(""+e+n+"/"+r+o,{cache:"default"}).then((e=>e.json())).then((e=>{if(M(e)){const t=A[s];t&&(e=t(e,r)),e.sort(N)}return e}))};var O=r(554);const D={fontWeight:"bold",fontSize:"16px"},U={color:"#f44336",paddingLeft:12},_={position:"relative",color:"silver",padding:"8px 0 4px 32px",cursor:"pointer"},R={position:"absolute",top:8,left:16},L={color:"#1b2836",padding:8,paddingLeft:12,cursor:"pointer"},X={color:"black",padding:8,cursor:"pointer"},E=e=>{let{innerRef:t,title:r,onClick:n}=e;const o=(0,O.Z)(n);return(0,h.jsxs)("div",{ref:t,className:"menu-item",style:_,role:"menuitem",tabIndex:"0",onClick:n,onKeyDown:o,children:[r,(0,h.jsx)("span",{style:R,children:"<"})]})};var Y=r(2554);const B=e=>{let{innerRef:t,item:r,onClick:n}=e;const{text:o,type:s}=r,i="l"===s?L:X,l=(0,O.Z)(n,[n]);return(0,h.jsx)("div",{ref:t,className:"menu-item",style:i,tabIndex:"0",role:"menuitem",onClick:n,onKeyDown:l,children:o})},J=[],K=(0,n.X$)((e=>{let{refFirstItem:t,model:r=J,fOnClickItem:o}=e;const s=(e=>{const t=(0,n.qp)(m);return(0,n.Ye)((()=>t?e.filter(t):e),[t,e])})(r);return(0,h.jsx)("div",{children:s.map(((e,r)=>(0,h.jsx)(B,{innerRef:0===r?t:void 0,item:e,onClick:o(e)},e.id)))})})),$=e=>{let{errMsg:t}=e;return t?(0,h.jsx)("div",{style:U,children:t}):null},q=e=>{let{refFirstItem:t,model:r,fOnClickItem:n,errMsg:o}=e;return(0,h.jsxs)(h.Fragment,{children:[!(r||o)&&(0,h.jsx)(Y.Z,{}),(0,h.jsx)(K,{refFirstItem:t,model:r,fOnClickItem:n}),(0,h.jsx)($,{errMsg:o})]})},z=Array.isArray,Q=(e,t,r,n,o,s,i)=>{const{text:l,id:a,type:c}=i,d=((e,t,r)=>"SDN"===e.lT?r||t:t?t+"/"+r:r)(r,t,a);return"l"===c?o.bind(null,d,l,n):s({id:d,...r,text:l,proxy:e})},W=e=>{let{style:t,store:r,title:o,id:s="",dfProps:i={},pageNumber:l,pageCurrent:a,onClickPrev:c,onClickNext:d,fOnClickItem:p,loadItems:u}=e;const g=(0,n.sO)(),m=(0,n.sO)(),[f,x]=(0,n.eJ)({}),{model:y,errMsg:v}=f,C=((e,t)=>e.getProxy(t.lT))(r,i),j=(0,n.I4)(Q.bind(null,C,s,i,l,d,p),[C]),b=0!==l&&o&&c,k=l===a&&(b||!b&&y);return(0,n.d4)((()=>(o&&u(C,i,s).then((e=>{const t=z(e)?{model:e}:{errMsg:"Response is not array"};x(t)})).catch((e=>x({errMsg:e.message}))),()=>{clearTimeout((0,n.eA)(m)),(0,n.oe)(g,null)})),[]),(0,n.d4)((()=>{k&&(clearTimeout((0,n.eA)(m)),(0,n.oe)(m,setTimeout((()=>{(0,n.Bd)(g)}),1e3)))}),[k]),(0,h.jsxs)("div",{style:{...D,...t},children:[b&&(0,h.jsx)(E,{innerRef:g,title:o,onClick:c.bind(null,l)}),(0,h.jsx)(q,{refFirstItem:b?void 0:g,model:y,fOnClickItem:j,errMsg:v})]})};var G=r(9679);const H=e=>{let{pages:t,onClickPrev:r,...n}=e;return t.map(((e,t)=>(0,G.createElement)(W,{...n,...e,key:e.id,pageNumber:t,onClickPrev:0===t?void 0:r})))},V=300,ee={width:V,overflow:"hidden"},te={width:1500,overflowX:"hidden",display:"flex",flexFlow:"row nowrap",alignItems:"flex-start",transition:"all 750ms ease-out"},re={width:V},ne=e=>{const t=e.style.transform.trim().slice(11).replace("px","").replace(")","");return parseInt(t,10)},oe={pageCurrent:0,pages:[{id:"",title:"Menu"}]},se=e=>{let{dfProps:t,store:r}=e;const o=(0,n.sO)(),s=(0,n.sO)(0),[{pageCurrent:i,pages:l},a]=(0,n.eJ)(oe),c=(0,C.Z)((e=>{a((t=>{const{pageCurrent:r}=t;return 0===r||r!==e||(0,n.oe)(s,-1),{...t,pageCurrent:e-1}}))})),d=(0,C.Z)(((e,t,r)=>{a((o=>{const{pageCurrent:i,pages:l}=o;if(r!==i)return o;const a=r+1,{id:c}=l[a]||{};return e&&c!==e&&(l.splice(a),l.push({id:e,title:t})),(0,n.oe)(s,1),{pages:l,pageCurrent:r+1}}))}),[c]),p=((e,t)=>{const r=(0,n.eA)(e),o=(0,n.eA)(t),s=0!==o&&r?((0,n.oe)(t,0),ne(r)-1*o*V):0===o&&r?ne(r):0;return{...te,transform:"translateX("+s+"px)"}})(o,s);return(0,h.jsx)("div",{style:ee,children:(0,h.jsx)("div",{ref:o,style:p,children:(0,h.jsx)(H,{pages:l,pageCurrent:i,style:re,store:r,dfProps:t,onClickPrev:c,onClickNext:d,loadItems:F,fOnClickItem:I})})})},ie={paddingRight:0},le={paddingLeft:6},ae={position:"relative",top:-4},ce={position:"relative",top:-6,paddingLeft:4},de={height:"92%"},pe=(0,n.X$)((e=>{const{isInitShow:t,caption:r,browserType:l,showAction:a}=e,[c,f,x]=(0,o.Z)(t),[y,C]=(0,s.Z)(),[j,b]=(0,s.Z)(),k=(0,n.Ye)((()=>d(j,e.dfProps.lT)),[j]);return(0,i.Z)(((e,t)=>{e===a&&t===l&&f()})),(0,h.jsx)(m.Provider,{value:k,children:(0,h.jsxs)(p.Z,{isShow:c,style:ie,children:[(0,h.jsx)(v,{is:y,toggleMenu:C,toggleFilter:b}),(0,h.jsx)(u.Z,{style:le,caption:r,captionStyle:ce,svgMoreStyle:ae,onMore:C,onClose:x}),(0,h.jsx)(g.Z,{className:"scroll-container-y",style:de,children:(0,h.jsx)(se,{...e})})]})})}))}}]);