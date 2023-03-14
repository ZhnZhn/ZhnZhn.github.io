"use strict";(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[138],{4853:(t,e,o)=>{o.r(e),o.d(e,{default:()=>It});var s=o(9999),n=o(9468),i=o(9620),r=o(8804),a=o(1887);var c=o(5893);const l={position:"absolute",top:80,left:"45%",zIndex:10,display:"block",width:32,height:32,opacity:1,transition:"opacity 800ms ease-out"},d={borderColor:"#f44336",animation:"none"},p={opacity:0},u=t=>{let{style:e,status:o}=t;const n=(t=>{const[e,o]=(0,s.eJ)(!1);return(0,s.d4)((()=>{t||setTimeout((()=>o(!0)),1e3)}),[t]),e})(o),i="L"===o?l:"F"===o?d:p;return n?null:(0,c.jsx)("span",{style:{...l,...e,...i},"data-loader":"circle"})},h=t=>"is"+t+"Select",m=(t,e,o)=>{let{isShowLabels:s,isRow:n,fSelect:i}=o;const{id:r,caption:l,options:d,placeholder:p}=t,u=!n[h(r)];return(0,c.jsx)(a.Z.ShowHide,{isShow:u,children:(0,c.jsx)(a.Z.RowInputSelect,{isShowLabels:s,caption:l,placeholder:p,options:d,onSelect:i(e)})},r)};var f=o(6016),g=o(1926),y=o(5868),v=o(6490),w=o(9643),S=o(8463);const I=()=>{const t=(0,s.sO)([]),e=(0,s.I4)((e=>o=>{t.current[e]=o?{...o}:void 0}),[]);return[t,e]};var O=o(1821);const T=t=>{const[e,o]=(0,s.eJ)({isShowChart:!0,isShowDate:!1}),n=(0,s.I4)((t=>{o((e=>(e[t]=!e[t],{...e})))}),[]);return(0,s.d4)((()=>{const e={};let s=!1;t.forEach((t=>{t.dfItem&&(s=!0,e[h(t.id)]=!0)})),o((t=>s?{...t,...e}:t))}),[t]),[e,o,n]},b=t=>{const[e,o]=(0,s.eJ)(t);return[e,...(0,s.Ye)((()=>[()=>o((t=>!t)),()=>o(!1)]),[])]},C=t=>{const[e,o,n]=b(!1),[i,r,l]=T(t),{isShowChart:d,isShowDate:p}=i,[u,m,f]=(0,O.Z)();return[(0,s.Ye)((()=>(0,c.jsx)(a.Z.ModalToggle,{isShow:e,selectProps:t,isShowChart:d,isShowDate:p,crIsId:h,onToggle:l,onCheckCaption:m,onUnCheckCaption:f,onClose:n})),[e,t,d,p]),u,i,r,o]};const D=class{constructor(t){void 0===t&&(t=5e3),this.mls=t,this.isLoading=!1}start(t){return!this.isLoading&&(this.loadingUrl=t,this.isLoading=!0,this.timeoutId=setTimeout((()=>{t===this.loadingUrl&&(this.isLoading=!1)}),this.mls),!0)}stop(){this.isLoading=!1,clearTimeout(this.timeoutId)}},L="time",x="Geo Entity",F=(t,e,o)=>({caption:t,slice:{[e]:o}}),j=t=>t?t.charAt(0).toUpperCase()+t.substring(1):"",M=Object.keys,q=t=>(t||"").split("_").map(j).join(" "),A=(t,e)=>{const{label:o}=t||{};return M(o||{}).map((t=>({caption:o[t],value:t,id:e})))},Z=t=>{const e=[null],o=[];return M(t).forEach((s=>{if(s!==L){const n=t[s],{label:i,category:r}=n||{},a={c:q(i),v:s,options:A(r,s)};"s_adj"===s?(a.c="Seasonal Adjustment",a.options=(t=>t.options.map((t=>(t.sc=t.value,t.caption=t.caption+" ("+t.value+")",t))))(a),o.push(a)):"geo"===s?(a.c=x,e[0]=a):e.push(a)}})),{dims:e.filter(Boolean).concat(o),timeId:L}},E=t=>{let{values:e,id:o}=t;return(e||[]).map((t=>F(t.text,o,t.id)))},k=t=>{const e=[];let o;return t.forEach((t=>{const{time:s,text:n="",id:i}=t;s?(o=i,e.dateOptions=t.values.map((t=>{let{id:e,text:o}=t;return{caption:o,value:e}})).reverse()):e.push({c:j(n),v:i,options:E(t)})})),{mapFrequency:"Y",dims:e,timeId:o}},P=Array.isArray,Y={month:"M",quarter:"K"},_=["Tid","Year","Month","Vuosi","Vuosineljännes"],J=(t,e)=>!P(t)||!P(e)||t.length!==e.length,U=t=>{let{values:e,valueTexts:o,code:s}=t;if(!J(e,o))return o.map(((t,o)=>F(t,s,e[o])))},R=t=>{const e=[];let o,s="Y";return t.forEach((t=>{const{code:n,time:i}=t,r=t.text||"";((t,e)=>!t&&-1===_.indexOf(e)&&-1===(e+"").indexOf("TLIST("))(i,n)?e.push({c:j(r),v:n,options:U(t)}):(o=n,s=Y[r.toLowerCase()],e.dateOptions=(t=>{let{values:e,valueTexts:o}=t;if(J(e,o))return;const s=[];return o.forEach(((t,o)=>{s.push({caption:t,value:e[o]})})),s.reverse()})(t))})),{mapFrequency:s,dims:e,timeId:o}},Q=(t,e)=>fetch(t,e).then((t=>{const{status:e,statusText:o}=t;if(e>=200&&e<400)return t.json();if(403===e)throw Error("HTTP Code 403: Forbitten.\nMaybe, require API key.");throw Error("HTTP Code: "+e+" "+o)})),H=Array.isArray,K=t=>{const e=[],{variables:o,dimension:s,source:n}=t;return((t,e)=>t&&"ESTAT"===e)(s,n)?Z(s):H(o)?(i=o[0])&&i.id&&i.text&&!H(i.valueTexts)&&H(i.values)?k(o):R(o):{dims:e,timeId:undefined,mapFrequency:"Y"};var i},N=t=>Q(t).then(K);var V=o(4824);const B=t=>"M"===t?"2019-01":"S"===t?"2019-S1":"Q"===t?"2019-Q1":"2019",z=(t,e)=>{let{dfNonTime:o,mapFrequency:s,dfId:n}=t;const i=[e,o?"":"time="+B(s)].filter(Boolean).join("&"),r=i?"?"+i:"";return V.eY+"/"+n+r},G={DF:t=>{let{proxy:e="",baseMeta:o,dfId:s}=t;return""+e+o+"/"+s},EU_STAT:z},W=t=>t.dimUrl||(t=>(G[t.loadId]||G.DF)(t))(t),X=(t,e,o)=>({id:t,caption:e,options:o}),$=(t,e)=>{const o=e?((t,e)=>{const o=Object.create(null);return t.forEach((t=>{o[t.v]=t})),e.map((t=>{let{v:e,c:s}=t;return X(e,s,o[e].options)}))})(t,e):(t=>t.map((t=>{let{c:e,v:o,options:s}=t;return X(o,e,s)})))(t);return o.dateOptions=t.dateOptions,(t=>{t.forEach(((t,e)=>{const{options:o}=t;if(1===o.length){const e=o[0];t.placeholder=e.caption,t.dfItem=e,t.isRow=!1}}))})(o),o},tt=(t,e)=>{const o=W(e),s=e.dims;return t.start(o),N(o).then((t=>{let{dims:e,mapFrequency:o,timeId:n}=t;if(!(t=>{const e=t.length;let o=0;for(;o<e&&t[o].options;o++);return o===e})(e))throw{errMsg:"Loaded dims without options"};return{timeId:n,mapFrequency:o,configs:$(e,s)}}))},et=t=>(t.options||[]).length,ot=(t,e)=>{const{dfQ:o}=e,s=z(e,o[0]),n=z(e,o[1]);let i=[];return t.start(s),N(s).then((t=>{let{dims:e}=t;i=i.concat(e)})).then((()=>{return t=5e3,new Promise((e=>{setTimeout((()=>e()),t)}));var t})).then((()=>(t.stop(),t.start(n),N(n)))).then((t=>{let{dims:e,mapFrequency:o,timeId:s}=t;return i=(t=>{const e=Object.create(null);return t.forEach((t=>{const o=t.v,s=e[o];(!s||et(s)<et(t))&&(e[o]=t)})),Object.keys(e).map((t=>e[t]))})(i.concat(e)),{timeId:"time",mapFrequency:o,configs:$(i)}}))},st=Array.isArray,nt=new D,it=t=>{let{errMsg:e,message:o}=t;return{errMsg:e||o}},rt=t=>{if(nt.isLoading)return Promise.resolve({errMsg:"Another dialog are still loading"});{const e=(t=>{const{dfQ:e}=t;return st(e)?2===e.length?ot:void 0:tt})(t);return e?e(nt,t).catch(it).finally((()=>nt.stop())):Promise.resolve({errMsg:"Incorrect dialog configuration"})}},at=t=>{const e=(0,s.sO)();return(0,s.d4)((()=>{e.current=t}),[t]),e.current},{crDateConfig:ct}=a.Z,lt=(t,e)=>({caption:t,value:e}),dt=(t,e)=>{let{dims:o,proxy:s,baseMeta:n,loadId:i,mapFrequency:r,dfProps:a}=t;rt({dims:o,proxy:s,baseMeta:n,loadId:i,mapFrequency:r,...a}).then(e).catch((t=>{e({errMsg:t.message})}))},pt=()=>({isLoading:!0,isLoadFailed:!1}),ut=t=>t.map((t=>t.options)),ht=t=>{const e=[];return t.forEach((t=>{(t.options||[]).length>1&&e.push(lt(t.caption,t.id))})),e},mt=t=>{const{chartsType:e,mapFrequency:o,mapDateDf:n,loadId:r,dfProps:a={}}=t,c=a.mapFrequency||o||"M",l=a.mapDateDf||n,[{isLoading:d,isLoadFailed:p},u]=(0,s.eJ)(pt),[h,m]=(0,s.eJ)([]),[f,g]=(0,s.eJ)((()=>({configs:[],selectOptions:[],mapFrequency:o,chartOptions:(0,i.kK)(t),dateOptions:[]}))),y=(0,s.I4)((t=>{let{configs:o,timeId:s,mapFrequency:n,errMsg:a}=t;if(o){const t=n||c,[a,d]=((t,e,o,s)=>{const{dateOptions:n}=t;if(n)return[n,n[0]];const{dateOptions:i,dateDefault:r}=ct(e,o,s);return[i,lt(r,r)]})(o,t,l,r);u({isLoading:!1,isLoadFailed:!1}),g({timeId:s,configs:o,selectOptions:ut(o),mapFrequency:t,dimOptions:ht(o),chartOptions:(0,i.kK)({configs:o,chartsType:e,mapFrequency:t}),dateOptions:a,dateDf:d})}else u({isLoading:!1,isLoadFailed:!0}),m([a])}),[e,c,l,r]),v=((t,e)=>{const o=at(t);return e&&!o.isShow&&t.isShow})(t,p);return(0,s.d4)((()=>{dt(t,y)}),[]),(0,s.d4)((()=>{v&&(dt(t,y),u(pt))}),[v,t,y]),[f,d,p,h,m,g]},ft=(t,e,o)=>{t((t=>t[e]!==o?(t[e]=o,{...t}):t))},gt=(t,e)=>t?"L":e?"F":void 0,yt={height:50,width:"100%"},vt=(0,n.i2)(),wt=(t,e)=>t.dfC||(e||{}).value,St=(t,e)=>t.dfC||!e?"":e.caption||"",It={StatN:(0,f.Z)((t=>{const{isShow:e,caption:o,msgOnNotSelected:n,toTopLayer:l,onAbout:d,loadFn:p,onLoad:h,onShow:f,onClose:O}=t,T=!t.dims&&!t.notDim,[b,D]=I(),L=(0,s.sO)(),[F,j]=(0,y.Z)(),[M,q]=(0,y.Z)(),[A,Z,E,k,P,Y]=mt(t),{configs:_,selectOptions:J,chartType:U,chartOptions:R,dimOptions:Q,dateOptions:H,dateDf:K={},timeId:N}=A,[V,B]=(0,g.Z)(vt),[z,G,W,X,$]=C(_),{isShowDate:tt,isShowChart:et}=W,[ot,st]=(0,v.Z)(d),[nt,it,rt,at,ct]=(0,S.Z)(),lt=(0,w.Z)({toggleLabels:B,toggleInputs:$,toggleOptions:rt,onAbout:d}),dt=(0,s.I4)((()=>{O(),P([])}),[]),pt=(0,s.I4)((()=>{const e=[];if(E)return e.push("Dims for request haven't been loaded.\nClose, open dialog for trying load again."),e;if(Z)return e.push("Dims is loading"),e;const o=(0,i.vi)(U),{dim:r}=U||{},a=((t,e,o,s)=>n=>{o.forEach(((o,i)=>{const{caption:r}=o;n(r)&&!s[i]&&t.push(e(r))}))})(e,n,_,(0,s.eA)(b));if(!T||!o){const s=t.notDim?x:r;return a((t=>!(o&&t===s))),e}if(o){const t=q();if(!t)return e.push("Dim isn't selected"),e;a((e=>e!==t.caption))}return e}),[E,Z,_,U,n]),ut=(0,s.I4)((t=>{const e=!!(0,i.vi)(t)&&(F(),!0);ft(X,"isShowDate",e),ft(Y,"chartType",t)}),[]),ht=(0,s.I4)((()=>{((t,e)=>{t.forEach(((t,o)=>{const{dfItem:s}=t;s&&e(o)(s)}))})(_,D);const e=pt();if(0===e.length){const e=q();h(p({...t},{...(0,s.d9)(L),chartType:U,timeId:N,selectOptions:J,dfC:wt(t,e),dfTitle:St(t,e),time:(j()||K).value,dialogOptions:(0,s.eA)(nt),items:(0,s.eA)(b),titles:(0,s.eA)(G)}))}P(e)}),[pt,K,N,U,_,J]),It=gt(Z,E);return(0,c.jsxs)(a.Z.DraggableDialog,{isShow:e,caption:o,menuModel:st,toTopLayer:l,onLoad:ht,onShow:f,onClose:dt,children:[(0,c.jsx)(a.Z.Toolbar,{isShow:ot,buttons:lt}),(0,c.jsx)(a.Z.ModalOptions,{isShow:it,toggleOption:ct,onClose:at}),z,(0,c.jsx)(u,{status:It}),It?(0,c.jsx)("div",{style:yt}):(0,c.jsx)(r.Z,{items:_,crItem:m,isShowLabels:V,isRow:W,fSelect:D}),(0,c.jsx)(a.Z.RowChartDate,{refSeriaColor:L,chartType:U,isShowLabels:V,isShowChart:et,chartOptions:R,onSelectChart:ut,isShowDate:tt,dateDefault:K.caption,dateOptions:H,onSelecDate:F,isDim:T,dimOptions:Q,onSelecDim:M}),(0,c.jsx)(a.Z.ValidationMessages,{validationMessages:k})]})}))}}}]);