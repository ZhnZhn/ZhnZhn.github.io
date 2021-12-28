"use strict";(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[138],{6196:(n,t,e)=>{e.r(t),e.d(t,{default:()=>Tn});var r=e(9679),o=e(9468),i=e(4706),a=e(8804),u=e(4827),s=e(5893),c={position:"absolute",top:80,left:"45%",zIndex:10,display:"block",width:32,height:32,opacity:1,transition:"opacity 800ms ease-out"},f={borderColor:"#f44336",animation:"none"},l={opacity:0};const d=function(n){var t=n.style,e=n.status,o=function(n){var t=(0,r.useState)(!1),e=t[0],o=t[1];return(0,r.useEffect)((function(){n||setTimeout((function(){return o(!0)}),1e3)}),[n]),e}(e),i="L"===e?c:"F"===e?f:l;return o?null:(0,s.jsx)("span",{style:Object.assign({},c,t,i),"data-loader":"circle"})};const p=function(n){return"is"+n+"Select"};const h=function(n,t,e){var r=e.isShowLabels,o=e.isRow,i=e.fSelect,a=n.id,c=n.caption,f=n.options,l=n.placeholder,d=!o[p(a)];return(0,s.jsx)(u.Z.ShowHide,{isShow:d,children:(0,s.jsx)(u.Z.RowInputSelect,{isShowLabels:r,caption:c,placeholder:l,options:f,onSelect:i(t)})},a)};var v=e(1926),m=e(7753);const g=function(){var n=(0,r.useRef)([]),t=(0,r.useCallback)((function(t){return function(e){n.current[t]=e?Object.assign({},e):void 0}}),[]);return[n,t]};var C=function(n,t,e){return{caption:n,title:t,onClick:e}};const b=function(n,t,e,o){var i=(0,v.Z)(!0),a=i[0],c=i[1],f=(0,r.useMemo)((function(){return[C("L","Click to toggle input labels",n),C("T","Toggle Inputs",t),C("O","Chart Options",e),C("A","About Datasource",o)]}),[]);return[(0,r.useMemo)((function(){return(0,s.jsx)(u.Z.Toolbar,{isShow:a,buttons:f})}),[a]),c]};var w="row__pane-topic not-selected",S=function(n,t,e){return void 0===e&&(e=!0),{cn:w,onClick:t,name:n,isClose:e}};const y=function(n,t){return(0,r.useMemo)((function(){return{titleCl:w,pageWidth:175,maxPages:1,p0:[S("Toggle ToolBar",n),S("About Datasource",t)]}}),[])};const O=function(n){var t=(0,r.useState)(n),e=t[0],o=t[1];return[e,(0,r.useCallback)((function(){return o((function(n){return!n}))}),[]),(0,r.useCallback)((function(){return o(!1)}),[])]};const I=function(){var n=(0,r.useRef)({}),t=O(!1),e=t[0],o=t[1],i=t[2],a=(0,r.useCallback)((function(t){n.current[t]=!n.current[t]}),[]);return[(0,r.useMemo)((function(){return(0,s.jsx)(u.Z.ModalOptions,{isShow:e,toggleOption:a,onClose:i})}),[e]),n,o]};const T=function(n){var t=(0,r.useState)({isShowChart:!0,isShowDate:!1}),e=t[0],o=t[1],i=(0,r.useCallback)((function(n){o((function(t){return t[n]=!t[n],Object.assign({},t)}))}),[]);return(0,r.useEffect)((function(){var t={},e=!1;n.forEach((function(n){n.dfItem&&(e=!0,t[p(n.id)]=!0)})),o((function(n){return e?Object.assign({},n,t):n}))}),[n]),[e,o,i]};const j=function(n){void 0===n&&(n=[]);var t=(0,r.useRef)(n),e=(0,r.useCallback)((function(n){t.current.push(n)}),[]),o=(0,r.useCallback)((function(n){t.current=t.current.filter((function(t){return t!==n}))}),[]);return[t,e,o]};const D=function(n){var t=O(!1),e=t[0],o=t[1],i=t[2],a=T(n),c=a[0],f=a[1],l=a[2],d=c.isShowChart,h=c.isShowDate,v=j(),m=v[0],g=v[1],C=v[2];return[(0,r.useMemo)((function(){return(0,s.jsx)(u.Z.ModalToggle,{isShow:e,selectProps:n,isShowChart:d,isShowDate:h,crIsId:p,onToggle:l,onCheckCaption:g,onUnCheckCaption:C,onClose:i})}),[e,n,d,h]),m,c,f,o]};const x=function(){function n(n){void 0===n&&(n=5e3),this.mls=n,this.isLoading=!1}var t=n.prototype;return t.start=function(n){var t=this;return!this.isLoading&&(this.loadingUrl=n,this.isLoading=!0,this.timeoutId=setTimeout((function(){n===t.loadingUrl&&(t.isLoading=!1)}),this.mls),!0)},t.stop=function(){this.isLoading=!1,clearTimeout(this.timeoutId)},n}();var F="time",k="Geo Entity",M=function(n,t,e){var r;return{caption:n,slice:(r={},r[t]=e,r)}},L=function(n){return n?n.charAt(0).toUpperCase()+n.substring(1):""},E=Object.keys,q=function(n){return(n||"").split("_").map(L).join(" ")},Z=function(n,t){var e=(n||{}).label;return E(e||{}).map((function(n){return{caption:e[n],value:n,id:t}}))};const A=function(n){var t=[null],e=[];return E(n).forEach((function(r){if(r!==F){var o=n[r]||{},i=o.label,a=o.category,u={c:q(i),v:r,options:Z(a,r)};"s_adj"===r?(u.c="Seasonal Adjustment",u.options=function(n){return n.options.map((function(n){return n.sc=n.value,n.caption=n.caption+" ("+n.value+")",n}))}(u),e.push(u)):"geo"===r?(u.c=k,t[0]=u):t.push(u)}})),{dims:t.filter(Boolean).concat(e),timeId:F}};var P=function(n){var t=n.values,e=n.id;return(t||[]).map((function(n){return M(n.text,e,n.id)}))};const R=function(n){var t,e=[];return n.forEach((function(n){var r=n.time,o=n.text,i=void 0===o?"":o,a=n.id;r?(t=a,e.dateOptions=n.values.map((function(n){var t=n.id;return{caption:n.text,value:t}})).reverse()):e.push({c:L(i),v:a,options:P(n)})})),{mapFrequency:"Y",dims:e,timeId:t}};var _=Array.isArray,U={month:"M",quarter:"K"},B=["Tid","Year","Month","Vuosi","Vuosineljännes"],Q=function(n,t){return!_(n)||!_(t)||n.length!==t.length},W=function(n){var t=n.values,e=n.valueTexts,r=n.code;if(!Q(t,e))return e.map((function(n,e){return M(n,r,t[e])}))};const Y=function(n){var t,e=[],r="Y";return n.forEach((function(n){var o=n.code,i=n.time,a=n.text||"";!function(n,t){return!n&&-1===B.indexOf(t)&&-1===(t+"").indexOf("TLIST(")}(i,o)?(t=o,r=U[a.toLowerCase()],e.dateOptions=function(n){var t=n.values,e=n.valueTexts;if(!Q(t,e)){var r=[];return e.forEach((function(n,e){r.push({caption:n,value:t[e]})})),r.reverse()}}(n)):e.push({c:L(a),v:o,options:W(n)})})),{mapFrequency:r,dims:e,timeId:t}};const H=function(n,t){return fetch(n,t).then((function(n){var t=n.status,e=n.statusText;if(t>=200&&t<400)return n.json();if(403===t)throw Error("HTTP Code 403: Forbitten.\nMaybe, require API key.");throw Error("HTTP Code: "+t+" "+e)}))};var N=Array.isArray,V=function(n){var t,e=n.variables,r=n.dimension;return function(n,t){return n&&"Eurostat"===t}(r,n.source)?A(r):N(e)?(t=e[0])&&t.id&&t.text&&!N(t.valueTexts)&&N(t.values)?R(e):Y(e):{dims:[],timeId:undefined,mapFrequency:"Y"}};const z=function(n){return H(n).then(V)};var G=function(n){return"M"===n?"2019M01":"S"===n?"2019S1":"Q"===n?"2019Q1":"2019"};const K=function(n,t){var e=n.dfNonTime,r=n.mapFrequency,o=n.dfId,i=[t,e?"":"time="+G(r)].filter(Boolean).join("&");return"https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/"+o+(i?"?"+i:"")};var J={DF:function(n){var t=n.proxy;return""+(void 0===t?"":t)+n.baseMeta+"/"+n.dfId},EU_STAT:K};const X=function(n){return n.dimUrl||function(n){return(J[n.loadId]||J.DF)(n)}(n)};var $=function(n,t,e){return{id:n,caption:t,options:e}};const nn=function(n,t){var e=t?function(n,t){var e=Object.create(null);return n.forEach((function(n){e[n.v]=n})),t.map((function(n){var t=n.v,r=n.c;return $(t,r,e[t].options)}))}(n,t):function(n){return n.map((function(n){var t=n.c,e=n.v,r=n.options;return $(e,t,r)}))}(n);return e.dateOptions=n.dateOptions,function(n){n.forEach((function(n,t){var e=n.options;if(1===e.length){var r=e[0];n.placeholder=r.caption,n.dfItem=r,n.isRow=!1}}))}(e),e};const tn=function(n,t){var e=X(t),r=t.dims;return n.start(e),z(e).then((function(n){var t=n.dims,e=n.mapFrequency,o=n.timeId;if(!function(n){for(var t=n.length,e=0;e<t&&n[e].options;e++);return e===t}(t))throw{errMsg:"Loaded dims without options"};return{timeId:o,mapFrequency:e,configs:nn(t,r)}}))};var en=function(n){return(n.options||[]).length};const rn=function(n,t){var e=t.dfQ,r=K(t,e[0]),o=K(t,e[1]),i=[];return n.start(r),z(r).then((function(n){var t=n.dims;i=i.concat(t)})).then((function(){return n=5e3,new Promise((function(t){setTimeout((function(){return t()}),n)}));var n})).then((function(){return n.stop(),n.start(o),z(o)})).then((function(n){var t=n.dims,e=n.mapFrequency;n.timeId;return i=function(n){var t=Object.create(null);return n.forEach((function(n){var e=n.v,r=t[e];(!r||en(r)<en(n))&&(t[e]=n)})),Object.keys(t).map((function(n){return t[n]}))}(i.concat(t)),{timeId:"time",mapFrequency:e,configs:nn(i)}}))};var on=Array.isArray,an=new x,un=function(n){var t=n.errMsg,e=n.message;return{errMsg:t||e}};const sn=function(n){if(an.isLoading)return Promise.resolve({errMsg:"Another dialog are still loading"});var t=function(n){var t=n.dfQ;return on(t)?2===t.length?rn:void 0:tn}(n);return t?t(an,n).catch(un).finally((function(){return an.stop()})):Promise.resolve({errMsg:"Incorrect dialog configuration"})};const cn=function(n){var t=(0,r.useRef)();return(0,r.useEffect)((function(){t.current=n}),[n]),t.current};var fn=i.Z.crOptions,ln=u.Z.crDateConfig,dn=function(n,t){return{caption:n,value:t}},pn=function(n,t){var e=n.dims,r=n.proxy,o=n.baseMeta,i=n.loadId,a=n.mapFrequency,u=n.dfProps;sn(Object.assign({dims:e,proxy:r,baseMeta:o,loadId:i,mapFrequency:a},u)).then(t).catch((function(n){t({errMsg:n.message})}))},hn=function(){return{isLoading:!0,isLoadFailed:!1}},vn=function(n){return n.map((function(n){return n.options}))},mn=function(n){var t=[];return n.forEach((function(n){(n.options||[]).length>1&&t.push(dn(n.caption,n.id))})),t};const gn=function(n){var t=n.chartsType,e=n.mapFrequency,o=n.mapDateDf,i=n.dfProps,a=void 0===i?{}:i,u=a.mapFrequency||e||"M",s=a.mapDateDf||o,c=(0,r.useState)(hn),f=c[0],l=f.isLoading,d=f.isLoadFailed,p=c[1],h=(0,r.useState)([]),v=h[0],m=h[1],g=(0,r.useState)((function(){return{configs:[],selectOptions:[],mapFrequency:e,chartOptions:fn(n),dateOptions:[]}})),C=g[0],b=g[1],w=(0,r.useCallback)((function(n){var e=n.configs,r=n.timeId,o=n.mapFrequency,i=n.errMsg;if(e){var a=o||u,c=function(n,t,e){var r=n.dateOptions;if(r)return[r,r[0]];var o=ln(t,e),i=o.dateOptions,a=o.dateDefault;return[i,dn(a,a)]}(e,a,s),f=c[0],l=c[1];p({isLoading:!1,isLoadFailed:!1}),b({timeId:r,configs:e,selectOptions:vn(e),mapFrequency:a,dimOptions:mn(e),chartOptions:fn({configs:e,chartsType:t,mapFrequency:a}),dateOptions:f,dateDf:l})}else p({isLoading:!1,isLoadFailed:!0}),m([i])}),[t,u,s]),S=function(n,t){var e=cn(n);return t&&!e.isShow&&n.isShow}(n,d);return(0,r.useEffect)((function(){pn(n,w)}),[]),(0,r.useEffect)((function(){S&&(pn(n,w),p(hn))}),[S,n,w]),[C,l,d,v,m,b]};const Cn=function(n){return(0,r.useMemo)((function(){return[(0,s.jsx)(u.Z.Button.Load,{onClick:n},"load")]}),[n])};const bn=function(n,t,e){n((function(n){return n[t]!==e?(n[t]=e,Object.assign({},n)):n}))};const wn=function(n,t){return n?"L":t?"F":void 0};var Sn={height:50,width:"100%"},yn=i.Z.isCategory,On=o.Z.wideWidth(),In=function(n,t){return n.isShow===t.isShow};const Tn={StatN:(0,r.memo)((function(n){var t=n.isShow,e=n.caption,o=n.onShow,i=n.onFront,c=n.loadFn,f=n.onLoad,l=n.msgOnNotSelected,p=n.onClickInfo,C=n.onClose,w=!n.dims&&!n.notDim,S=g(),O=S[0],T=S[1],j=(0,m.Z)(),x=j[0],F=j[1],M=(0,m.Z)(),L=M[0],E=M[1],q=(0,m.Z)(),Z=q[0],A=q[1],P=gn(n),R=P[0],_=P[1],U=P[2],B=P[3],Q=P[4],W=P[5],Y=R.configs,H=R.selectOptions,N=R.chartType,V=R.chartOptions,z=R.dimOptions,G=R.dateOptions,K=R.dateDf,J=void 0===K?{}:K,X=R.timeId,$=(0,v.Z)(On),nn=$[0],tn=$[1],en=I(),rn=en[0],on=en[1],an=en[2],un=D(Y),sn=un[0],cn=un[1],fn=un[2],ln=un[3],dn=un[4],pn=fn.isShowDate,hn=fn.isShowChart,vn=b(tn,dn,an,p),mn=vn[0],In=vn[1],Tn=(0,r.useCallback)((function(){C(),Q([])}),[]),jn=(0,r.useCallback)((function(){var t=[];if(U)return t.push("Dims for request haven't been loaded.\nClose, open dialog for trying load again."),t;if(_)return t.push("Dims is loading"),t;var e=yn(N),r=(N||{}).dim,o=function(n,t,e,r){return function(o){e.forEach((function(e,i){var a=e.caption;o(a)&&!r[i]&&n.push(t(a))}))}}(t,l,Y,O.current);if(!w||!e){var i=n.notDim?k:r;return o((function(n){return!(e&&n===i)})),t}if(e){var a=Z.current;if(!a)return t.push("Dim isn't selected"),t;o((function(n){return n!==a.caption}))}return t}),[U,_,Y,N,l]),Dn=(0,r.useCallback)((function(n){var t=!!yn(n)&&(L.current=null,!0);bn(ln,"isShowDate",t),bn(W,"chartType",n)}),[]),xn=(0,r.useCallback)((function(){!function(n,t){n.forEach((function(n,e){var r=n.dfItem;r&&t(e)(r)}))}(Y,T);var t=jn();if(0===t.length){var e=x.current?x.current.getConf():{},r=e.seriaColor,o=e.seriaWidth,i=function(n,t){return n.dfC||(t||{}).value}(n,Z.current),a=function(n,t){return n.dfC||!t?"":t.caption||""}(n,Z.current),u=c(Object.assign({},n),{timeId:X,dfC:i,dfTitle:a,time:(L.current||J).value,dialogOptions:on.current,chartType:N,seriaColor:r,seriaWidth:o,items:O.current,titles:cn.current,selectOptions:H});f(u)}Q(t)}),[jn,J,X,N,Y,H]),Fn=Cn(xn),kn=y(In,p),Mn=wn(_,U);return(0,s.jsxs)(u.Z.DraggableDialog,{isShow:t,caption:e,menuModel:kn,commandButtons:Fn,onShowChart:o,onFront:i,onClose:Tn,children:[mn,rn,sn,(0,s.jsx)(d,{status:Mn}),Mn?(0,s.jsx)("div",{style:Sn}):(0,s.jsx)(a.Z,{items:Y,crItem:h,isShowLabels:nn,isRow:fn,fSelect:T}),(0,s.jsx)(u.Z.RowChartDate,{chartType:N,isShowLabels:nn,isShowChart:hn,chartOptions:V,onSelectChart:Dn,onRegColor:F,isShowDate:pn,dateDefault:J.caption,dateOptions:G,onSelecDate:E,isDim:w,dimOptions:z,onSelecDim:A}),(0,s.jsx)(u.Z.ValidationMessages,{validationMessages:B})]})}),In)}}}]);