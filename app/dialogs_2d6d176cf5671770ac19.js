"use strict";(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[254],{4900:(o,e,t)=>{t.r(e),t.d(e,{default:()=>V});var s=t(8504),n=t(4332),a=t(312),i=t(208),c=t(6906),l=t(6379),r=t(5916),h=t(6509),p=t(7624);const d={width:85},w={width:270},S=o=>"string"==typeof o&&o.trim(),g=o=>S(o)&&S(o.split("/")[2]),u=(0,r.Cg)({chartsType:"t2"}),m=(0,n.c)((o=>{const{isShow:e,noDate:t,caption:n,oneCaption:r,onePlaceholder:S,initFromDate:m,initToDate:D,msgOnNotValidFormat:T,onTestDate:b,toTopLayer:C,onAbout:x,loadFn:j,onLoad:L,onShow:y,onClose:F}=o,[V,O]=(0,s.oT)("SPLINE"),[f,N]=(0,a.c)(!0),[v,A,I,P,k]=(0,l.c)(),[M,B,R,W]=(0,c.c)({onAbout:x,onClose:F,toggleOptions:I,toggleDate:t?void 0:N}),U=(0,s.yK)(),J=(0,s.yK)(),K=(0,s.yK)(),H=(0,i.c)((()=>{const e=(0,s.sB)(U);if(e&&e.isValid()){const t=e.getValue();L(j(o,{...(0,s.aq)(K),items:[{c:t,v:t}],dialogOptions:(0,s.sB)(v),chartType:V}))}else e.showErrMsg()}));return(0,p.jsxs)(h.c.DraggableDialog,{isShow:e,menuModel:R,caption:n,toTopLayer:C,onLoad:H,onShow:y,onClose:F,children:[(0,p.jsx)(h.c.Toolbar,{isShow:M,buttons:W}),(0,p.jsx)(h.c.ModalOptions,{isShow:A,toggleOption:k,onClose:P}),(0,p.jsx)(h.c.RowPattern,{ref:U,isShow:e,isShowLabels:B,style:w,captionStyle:d,placeholder:S,caption:r,onTest:g,errorMsg:"Empty or Id format is not valid"}),(0,p.jsx)(h.c.RowChartDate,{refSeriaColor:K,chartType:V,isShowLabels:B,isShowChart:!0,labelStyle:d,selectWidth:w.width,chartOptions:u,onSelectChart:O,noDate:t}),!t&&(0,p.jsx)(h.c.ShowHide,{isShow:f,children:(0,p.jsx)(h.c.DatesFragment,{ref:J,isShowLabels:B,initFromDate:m,initToDate:D,msgOnNotValidFormat:T,onTestDate:b})})]})}));var D=t(2660),T=t(9568);const b=o=>{const e=(0,s.sB)(o);return e?e.getValues():{}},C=(0,n.c)((o=>{const{isShow:e,noDate:t,caption:n,oneCaption:i,oneNames:l,oneURI:r,oneJsonProp:d,isWithOneInput:w,twoCaption:S,twoNames:g,twoURI:u,twoJsonProp:m,isWithInputTwo:C,threeCaption:x,threeNames:j,threeURI:L,threeJsonProp:y,isWithInputThree:F,initFromDate:V,initToDate:O,msgOnNotSelected:f,msgOnNotValidFormat:N,onTestDate:v,toTopLayer:A,onAbout:I,loadFn:P,onLoad:k,onShow:M,onClose:B}=o,[R,W]=(0,a.c)(!0),[U,J,K,H,Y,_,E]=(0,c.c)({onAbout:I,onClose:B,toggleDate:t?void 0:W}),[Z,q]=(0,D.c)(),[Q,z]=(0,D.c)(),[G,X]=(0,D.c)(),$=(0,s.yK)(),oo=(0,s.kZ)((()=>{const e=q(),t=z(),s=X(),n=[[e,i],[t,S],L?[s,x]:void 0].filter(Boolean),a=(0,T.c)(n,f,$);0===a.length&&k(P(o,{one:e,two:t,three:s,...b($)})),_(a)}),[]);return(0,p.jsxs)(h.c.DraggableDialog,{isShow:e,caption:n,menuModel:K,toTopLayer:A,onLoad:oo,onShow:M,onClose:E,children:[(0,p.jsx)(h.c.Toolbar,{isShow:U,buttons:H}),(0,p.jsx)(h.c.SelectWithLoad,{isShow:e,isShowLabels:J,isWithInput:w,uri:r,jsonProp:d,caption:i,optionNames:l,onSelect:Z}),(0,p.jsx)(h.c.SelectWithLoad,{isShow:e,isShowLabels:J,isWithInput:C,uri:u,jsonProp:m,caption:S,optionNames:g,onSelect:Q}),L&&(0,p.jsx)(h.c.SelectWithLoad,{isShow:e,isShowLabels:J,isWithInput:F,uri:L,jsonProp:y,caption:x,optionNames:j,onSelect:G}),!0!==t&&(0,p.jsx)(h.c.ShowHide,{isShow:R,children:(0,p.jsx)(h.c.DatesFragment,{ref:$,isShowLabels:J,initFromDate:V,initToDate:O,msgOnNotValidFormat:N,onTestDate:v})}),(0,p.jsx)(h.c.ValidationMessages,{validationMessages:Y})]})}));var x=t(61),j=t(6672);const L=(0,n.c)((o=>{const{isShow:e,caption:t,oneCaption:n,oneURI:i,oneJsonProp:l,twoCaption:r,msgOnNotSelected:d,initFromDate:w,initToDate:S,msgOnNotValidFormat:g,onTestDate:u,toTopLayer:m,onAbout:D,loadFn:T,onLoad:b,onShow:C,onClose:L}=o,[y,F]=(0,a.c)(!0),[V,O]=(0,a.c)(!1),[f,N,v,A,I,P,k]=(0,c.c)({onAbout:D,onClose:L,toggleDate:F,toggleOptions:O}),[M,B,R]=(0,x.c)(false),W=(0,s.yK)(),U=(0,s.yK)(),J=(0,s.kZ)((()=>{const e=(0,s.sB)(U),{msg:t=[]}=e.getValidation();(0,j.c)(W,t),0===t.length&&b(T(o,{...e.getValues(),...(0,s.sB)(W).getValues(),hasSecondYAxis:(0,s.sB)(M)})),P(t)}),[]);return(0,p.jsxs)(h.c.DraggableDialog,{isShow:e,caption:t,menuModel:v,toTopLayer:m,onLoad:J,onShow:C,onClose:k,children:[(0,p.jsx)(h.c.Toolbar,{isShow:f,buttons:A}),(0,p.jsx)(h.c.SelectOneTwo,{ref:U,isShow:e,isShowLabels:N,uri:i,oneCaption:n,oneJsonProp:l,twoCaption:r,msgOnNotSelected:d}),(0,p.jsx)(h.c.ShowHide,{isShow:y,children:(0,p.jsx)(h.c.DatesFragment,{ref:W,isShowLabels:N,initFromDate:w,initToDate:S,msgOnNotValidFormat:g,onTestDate:u})}),(0,p.jsx)(h.c.ShowHide,{isShow:V,children:(0,p.jsx)(h.c.RowCheckBox1,{caption:"Add Seria with Second YAxis",initialValue:false,onCheck:B,onUnCheck:R})}),(0,p.jsx)(h.c.ValidationMessages,{validationMessages:I})]})}));var y=t(6744);const F=[{caption:"Default: Area",value:y.kT},{caption:"Scatter: Label Up",value:y.Yb},{caption:"Scatter: Label Down",value:y.gt}],V={Query:m,Type4:C,Type4A:L,Type5:(0,n.c)((o=>{const{isShow:e,isChartType:t,caption:n,oneCaption:i,oneURI:l,oneJsonProp:r,twoCaption:d,twoURI:w,twoJsonProp:S,threeCaption:g,msgOnNotSelected:u,initFromDate:m,initToDate:T,msgOnNotValidFormat:b,onTestDate:C,toTopLayer:L,onAbout:y,loadFn:V,onLoad:O,onShow:f,onClose:N}=o,[v,A]=(0,a.c)(!1),[I,P]=(0,a.c)(!1),[k,M,B,R,W,U,J]=(0,c.c)({onAbout:y,onClose:N,toggleDate:A,toggleOptions:P}),[K,H,Y]=(0,x.c)(false),[_,E]=(0,D.c)(),[Z,q]=(0,D.c)(),Q=(0,s.yK)(),z=(0,s.yK)(),G=(0,s.kZ)((()=>{const e=[],t=E(),n=(0,s.sB)(z),{msg:a=[]}=n.getValidation();if(t||e.push(u(i)),e.push(...a),(0,j.c)(Q,e),0===e.length){const{one:e,two:a}=n.getValues(),{value:i}=q()||{};O(V(o,{...(0,s.sB)(Q).getValues(),one:t,two:e,three:a,seriaType:i,hasSecondYAxis:(0,s.sB)(K)}))}U(e)}),[]);return(0,p.jsxs)(h.c.DraggableDialog,{isShow:e,caption:n,menuModel:B,toTopLayer:L,onLoad:G,onShow:f,onClose:J,children:[(0,p.jsx)(h.c.Toolbar,{isShow:k,buttons:R}),(0,p.jsx)(h.c.SelectWithLoad,{isShow:e,isShowLabels:M,uri:l,jsonProp:r,caption:i,optionNames:"Items",onSelect:_}),(0,p.jsx)(h.c.SelectOneTwo,{ref:z,isShow:e,isShowLabels:M,uri:w,oneCaption:d,oneJsonProp:S,twoCaption:g,msgOnNotSelected:u}),(0,p.jsx)(h.c.ShowHide,{isShow:v,children:(0,p.jsx)(h.c.DatesFragment,{ref:Q,isShowLabels:M,initFromDate:m,initToDate:T,msgOnNotValidFormat:b,onTestDate:C})}),(0,p.jsxs)(h.c.ShowHide,{isShow:I,children:[t&&(0,p.jsx)(h.c.RowInputSelect,{isShowLabels:M,caption:"Chart Type:",options:F,onSelect:Z}),(0,p.jsx)(h.c.RowCheckBox1,{caption:"Add Seria with Second YAxis",initialValue:false,onCheck:H,onUnCheck:Y})]}),(0,p.jsx)(h.c.ValidationMessages,{validationMessages:W})]})}))}},6672:(o,e,t)=>{t.d(e,{c:()=>n});var s=t(8504);const n=(o,e)=>{const t=(0,s.sB)(o);if(t){const{isValid:o,datesMsg:s}=t.getValidation();o||e.push(s)}}},9568:(o,e,t)=>{t.d(e,{c:()=>n});var s=t(6672);const n=(o,e,t)=>{const n=o.reduce(((o,t)=>(t[0]||o.push(e(t[1])),o)),[]);return(0,s.c)(t,n),n}}}]);