"use strict";(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[673],{5780:(e,o,t)=>{t.r(o),t.d(o,{default:()=>V});var a=t(9999),l=t(6016),r=t(1926),s=t(5868),n=t(7286);const i=()=>{const[e,o]=(0,r.Z)(!1),t=(0,a.I4)((()=>{o(!1)}),[o]);return[e,o,t]};var c=t(6623),p=t(8190),h=t(8811),u=t(1312),d=t(5893);const g={...u.oc,lineHeight:1.6,padding:"6px 14px"},S=e=>{let{isShow:o,configs:t,onClose:a}=e;return(0,d.jsx)(p.Z,{isShow:o,className:u.xx,style:g,onClose:a,children:(t||[]).map((e=>(0,d.jsx)(h.Z,{style:u.yE,checkedColor:u.MR,caption:e[0],value:e[1],onToggle:e[2]},e[0])))})},w=[{c:"Export Value",v:{rg:2,measure:"TradeValue"}},{c:"Export Weight",v:{rg:2,measure:"NetWeight"}},{c:"Export Quantity",v:{rg:2,measure:"TradeQuantity"}},{c:"Export Average Value Per Weight",v:{rg:2,measure:"avgPerWeight"}},{c:"Export Average Value Per Quantity",v:{rg:2,measure:"avgPerQuantity"}},{c:"Import Value",v:{rg:1,measure:"TradeValue"}},{c:"Import Weight",v:{rg:1,measure:"NetWeight"}},{c:"Import Quantity",v:{rg:1,measure:"TradeQuantity"}},{c:"Import Average Value Per Weight",v:{rg:1,measure:"avgPerWeight"}},{c:"Import Average Value Per Quantity",v:{rg:1,measure:"avgPerQuantity"}}],Z=w[0],x={c:"All",v:"all"},v=[{c:"Annual",v:"A"},{c:"Monthly",v:"M"}],m=v[0],j=(0,l.Z)((e=>{const{isShow:o,caption:t,oneURI:l,twoURI:p,tpURI:h,msgOnNotSelected:u,toTopLayer:g,onAbout:j,loadFn:b,onLoad:A,onShow:y,onClose:I}=e,[L,C,T]=i(),[f,V,P,W,D,R,H,M]=(0,n.Z)({onAbout:j,onClose:I,toggleInputs:C}),[Q,F]=(0,r.Z)(!0),[E,U]=(0,r.Z)(!1),[N,k]=(0,r.Z)(!0),[O,q]=(0,r.Z)(!1),_=(0,a.sO)(),[G,z]=(0,s.Z)(),[B,J]=(0,s.Z)(),[K,X]=(0,s.Z)(),[Y,$]=(0,s.Z)(),ee=(0,a.I4)((()=>{const o=(0,a.eA)(_),{msg:t=[]}=o.getValidation(),l=z()||x,r=l.v,s=X(),n=s&&s.v,i=$()||m;if("all"===r&&"all"===n&&t.push("Query All to All is too complex"),"all"===r&&"M"===i.v&&t.push("Query All Monthly is too complex"),0===t.length){const{one:t,two:a}=o.getValues();A(b(e,{one:l,two:t,three:a,tradeFlow:J()||Z,tradePartner:s,freq:i})),H()}else R(t)}),[]);return(0,d.jsxs)(c.Z.DraggableDialog,{isShow:o,caption:t,menuModel:P,toTopLayer:g,onLoad:ee,onShow:y,onClose:M,children:[(0,d.jsx)(c.Z.Toolbar,{isShow:f,buttons:W}),(0,d.jsx)(S,{isShow:L,configs:[["Partner",E,U],["Heading",Q,F],["Trade Flow",N,k],["Frequency",O,q]],onClose:T}),(0,d.jsx)(c.Z.SelectWithLoad,{isShow:o,isShowLabels:V,uri:l,caption:"Reporter",placeholder:"Default: All",onSelect:G}),(0,d.jsx)(c.Z.ShowHide,{isShow:E,children:(0,d.jsx)(c.Z.SelectWithLoad,{isShowLabels:V,uri:h,caption:"Partner",placeholder:"Default: World",onSelect:K})}),(0,d.jsx)(c.Z.ShowHide,{isShow:Q,children:(0,d.jsx)(c.Z.SelectOneTwo,{ref:_,isShow:o,isShowLabels:V,uri:p,oneCaption:"Heading",twoCaption:"Subheading",msgOnNotSelected:u})}),(0,d.jsx)(c.Z.ShowHide,{isShow:N,children:(0,d.jsx)(c.Z.RowInputSelect,{isShowLabels:V,caption:"Trade Flow",placeholder:"Default: Export Value",propCaption:"c",options:w,onSelect:B})}),(0,d.jsx)(c.Z.ShowHide,{isShow:O,children:(0,d.jsx)(c.Z.RowInputSelect,{isShowLabels:V,caption:"Frequency",placeholder:"Default: Annual",propCaption:"c",options:v,onSelect:Y})}),(0,d.jsx)(c.Z.ValidationMessages,{validationMessages:D})]})})),b=[{c:"Total",v:"total"},{c:"All 2-digit HS commodities",v:"AG2"}],A=b[0],y=(()=>{const e=[];for(let o=0;o<22;o++){const t=""+(2021-o);e.push({c:t,v:t})}return e})(),I=y[0],L=[{c:"Export Value",v:{rg:2,measure:"TradeValue"}},{c:"Import Value",v:{rg:1,measure:"TradeValue"}}],C=L[0],T={c:"World",v:"0"},f={c:"Annual",v:"A"},V={UnDialog5:j,UnDialogAgg:(0,l.Z)((e=>{const{isShow:o,caption:t,oneURI:l,tpURI:p,msgOnNotSelected:h,toTopLayer:u,onAbout:g,loadFn:w,onLoad:Z,onShow:x,onClose:v}=e,[m,j,V]=i(),[P,W,D,R,H,M,Q,F]=(0,n.Z)({onAbout:g,onClose:v,toggleInputs:j}),[E,U]=(0,r.Z)(!1),[N,k]=(0,r.Z)(!0),[O,q]=(0,r.Z)(!1),[_,G]=(0,r.Z)(!0),[z,B]=(0,s.Z)(),[J,K]=(0,s.Z)(),[X,Y]=(0,s.Z)(),[$,ee]=(0,s.Z)(),[oe,te]=(0,s.Z)(),ae=(0,a.I4)((e=>{X(e);const o=e&&e.v!==A.v;q(o)}),[]),le=(0,a.I4)((()=>{const o=B(),t=K()||T,a=[];o||a.push(h("Reporter")),(o&&"all"===o.v||"all"===t.v)&&a.push("Query All is too complex"),0===a.length?(Z(w(e,{one:o,three:Y()||A,tradeFlow:te()||C,tradePartner:t,period:ee()||I,freq:f})),Q()):M(a)}),[]);return(0,d.jsxs)(c.Z.DraggableDialog,{isShow:o,caption:t,menuModel:D,toTopLayer:u,onLoad:le,onShow:x,onClose:F,children:[(0,d.jsx)(c.Z.Toolbar,{isShow:P,buttons:R}),(0,d.jsx)(S,{isShow:m,configs:[["Partner",E,U],["Aggregation",N,k],["Trade Flow",_,G]],onClose:V}),(0,d.jsx)(c.Z.SelectWithLoad,{isShow:o,isShowLabels:W,uri:l,caption:"Reporter",onSelect:z}),(0,d.jsx)(c.Z.ShowHide,{isShow:E,children:(0,d.jsx)(c.Z.SelectWithLoad,{isShowLabels:W,uri:p,caption:"Partner",placeholder:"Default: World",onSelect:J})}),(0,d.jsxs)(c.Z.ShowHide,{isShow:N,children:[(0,d.jsx)(c.Z.RowInputSelect,{isShowLabels:W,caption:"Aggregation",placeholder:"Default: Total",propCaption:"c",options:b,onSelect:ae}),(0,d.jsx)(c.Z.ShowHide,{isShow:O,children:(0,d.jsx)(c.Z.RowInputSelect,{isShowLabels:W,caption:"Period",placeholder:"Default: 2021",propCaption:"c",options:y,onSelect:$})})]}),(0,d.jsx)(c.Z.ShowHide,{isShow:_,children:(0,d.jsx)(c.Z.RowInputSelect,{isShowLabels:W,caption:"Trade Flow",placeholder:"Default: Export Value",propCaption:"c",options:L,onSelect:oe})}),(0,d.jsx)(c.Z.ValidationMessages,{validationMessages:H})]})}))}}}]);