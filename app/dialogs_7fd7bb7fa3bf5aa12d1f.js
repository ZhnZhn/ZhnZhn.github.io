"use strict";(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[890],{4620:(o,e,t)=>{t.r(e),t.d(e,{default:()=>F});var n=t(2009),s=t(4575),a=t(4867),i=t(6072),l=t(3057),r=t(2783),h=t(9288),p=t(4682),c=t(4848);const d={width:85},w={width:270},S=o=>"string"==typeof o&&o.trim(),A=o=>S(o)&&S(o.split("/")[2]),g=(0,h.qt)({chartsType:"t2"}),u=(0,s.A)((o=>{const{isShow:e,noDate:t,caption:s,oneCaption:h,onePlaceholder:S,initFromDate:u,initToDate:m,msgOnNotValidFormat:C,onTestDate:D,toTopLayer:b,onAbout:T,loadFn:x,onLoad:j,onShow:L,onClose:y}=o,[F,V]=(0,n.J0)("SPLINE"),[f,O]=(0,a.A)(!0),[N,v,I,P,M]=(0,r.A)(),[R,W,k,Z]=(0,l.A)({onAbout:T,onClose:y,toggleOptions:I,toggleDate:t?void 0:O}),J=(0,n.li)(),U=(0,n.li)(),H=(0,n.li)(),Y=(0,i.A)((()=>{const e=(0,n.ZC)(J);if(e&&e.isValid()){const t=e.getValue();j(x(o,{...(0,n.y5)(H),items:[{c:t,v:t}],dialogOptions:(0,n.ZC)(N),chartType:F}))}else e.showErrMsg()}));return(0,c.jsxs)(p.A.DraggableDialog,{isShow:e,menuModel:k,caption:s,toTopLayer:b,onLoad:Y,onShow:L,onClose:y,children:[(0,c.jsx)(p.A.Toolbar,{isShow:R,buttons:Z}),(0,c.jsx)(p.A.ModalOptions,{isShow:v,toggleOption:M,onClose:P}),(0,c.jsx)(p.A.RowPattern,{ref:J,isShow:e,isShowLabels:W,style:w,captionStyle:d,placeholder:S,caption:h,onTest:A,errorMsg:"Empty or Id format is not valid"}),(0,c.jsx)(p.A.RowChartDate,{refSeriaColor:H,chartType:F,isShowLabels:W,isShowChart:!0,labelStyle:d,selectWidth:w.width,chartOptions:g,onSelectChart:V,noDate:t}),!t&&(0,c.jsx)(p.A.ShowHide,{isShow:f,children:(0,c.jsx)(p.A.DatesFragment,{ref:U,isShowLabels:W,initFromDate:u,initToDate:m,msgOnNotValidFormat:C,onTestDate:D})})]})}));var m=t(4250),C=t(2338);const D=o=>{const e=(0,n.ZC)(o);return e?e.getValues():{}},b=(0,s.A)((o=>{const{isShow:e,noDate:t,caption:s,oneCaption:i,oneNames:r,oneURI:h,oneJsonProp:d,isWithOneInput:w,twoCaption:S,twoNames:A,twoURI:g,twoJsonProp:u,isWithInputTwo:b,threeCaption:T,threeNames:x,threeURI:j,threeJsonProp:L,isWithInputThree:y,initFromDate:F,initToDate:V,msgOnNotSelected:f,msgOnNotValidFormat:O,onTestDate:N,toTopLayer:v,onAbout:I,loadFn:P,onLoad:M,onShow:R,onClose:W}=o,[k,Z]=(0,a.A)(!0),[J,U,H,Y,_,B,E]=(0,l.A)({onAbout:I,onClose:W,toggleDate:t?void 0:Z}),[q,Q]=(0,m.A)(),[X,z]=(0,m.A)(),[G,K]=(0,m.A)(),$=(0,n.li)(),oo=(0,n.hb)((()=>{const e=Q(),t=z(),n=K(),s=[[e,i],[t,S],j?[n,T]:void 0].filter(Boolean),a=(0,C.A)(s,f,$);0===a.length&&M(P(o,{one:e,two:t,three:n,...D($)})),B(a)}),[]);return(0,c.jsxs)(p.A.DraggableDialog,{isShow:e,caption:s,menuModel:H,toTopLayer:v,onLoad:oo,onShow:R,onClose:E,children:[(0,c.jsx)(p.A.Toolbar,{isShow:J,buttons:Y}),(0,c.jsx)(p.A.SelectWithLoad,{isShow:e,isShowLabels:U,isWithInput:w,uri:h,jsonProp:d,caption:i,optionNames:r,onSelect:q}),(0,c.jsx)(p.A.SelectWithLoad,{isShow:e,isShowLabels:U,isWithInput:b,uri:g,jsonProp:u,caption:S,optionNames:A,onSelect:X}),j&&(0,c.jsx)(p.A.SelectWithLoad,{isShow:e,isShowLabels:U,isWithInput:y,uri:j,jsonProp:L,caption:T,optionNames:x,onSelect:G}),!0!==t&&(0,c.jsx)(p.A.ShowHide,{isShow:k,children:(0,c.jsx)(p.A.DatesFragment,{ref:$,isShowLabels:U,initFromDate:F,initToDate:V,msgOnNotValidFormat:O,onTestDate:N})}),(0,c.jsx)(p.A.ValidationMessages,{validationMessages:_})]})}));var T=t(6134),x=t(4819);const j=(0,s.A)((o=>{const{isShow:e,caption:t,oneCaption:s,oneURI:i,oneJsonProp:r,twoCaption:h,msgOnNotSelected:d,initFromDate:w,initToDate:S,msgOnNotValidFormat:A,onTestDate:g,toTopLayer:u,onAbout:m,loadFn:C,onLoad:D,onShow:b,onClose:j}=o,[L,y]=(0,a.A)(!0),[F,V]=(0,a.A)(!1),[f,O,N,v,I,P,M]=(0,l.A)({onAbout:m,onClose:j,toggleDate:y,toggleOptions:V}),[R,W,k]=(0,T.A)(false),Z=(0,n.li)(),J=(0,n.li)(),U=(0,n.hb)((()=>{const e=(0,n.ZC)(J),{msg:t=[]}=e.getValidation();(0,x.A)(Z,t),0===t.length&&D(C(o,{...e.getValues(),...(0,n.ZC)(Z).getValues(),hasSecondYAxis:(0,n.ZC)(R)})),P(t)}),[]);return(0,c.jsxs)(p.A.DraggableDialog,{isShow:e,caption:t,menuModel:N,toTopLayer:u,onLoad:U,onShow:b,onClose:M,children:[(0,c.jsx)(p.A.Toolbar,{isShow:f,buttons:v}),(0,c.jsx)(p.A.SelectOneTwo,{ref:J,isShow:e,isShowLabels:O,uri:i,oneCaption:s,oneJsonProp:r,twoCaption:h,msgOnNotSelected:d}),(0,c.jsx)(p.A.ShowHide,{isShow:L,children:(0,c.jsx)(p.A.DatesFragment,{ref:Z,isShowLabels:O,initFromDate:w,initToDate:S,msgOnNotValidFormat:A,onTestDate:g})}),(0,c.jsx)(p.A.ShowHide,{isShow:F,children:(0,c.jsx)(p.A.RowCheckBox1,{caption:"Add Seria with Second YAxis",initialValue:false,onCheck:W,onUnCheck:k})}),(0,c.jsx)(p.A.ValidationMessages,{validationMessages:I})]})}));var L=t(6460);const y=[{caption:"Default: Area",value:L.mf},{caption:"Scatter: Label Up",value:L.Ne},{caption:"Scatter: Label Down",value:L.wX}],F={Query:u,Type4:b,Type4A:j,Type5:(0,s.A)((o=>{const{isShow:e,isChartType:t,caption:s,oneCaption:i,oneURI:r,oneJsonProp:h,twoCaption:d,twoURI:w,twoJsonProp:S,threeCaption:A,msgOnNotSelected:g,initFromDate:u,initToDate:C,msgOnNotValidFormat:D,onTestDate:b,toTopLayer:j,onAbout:L,loadFn:F,onLoad:V,onShow:f,onClose:O}=o,[N,v]=(0,a.A)(!1),[I,P]=(0,a.A)(!1),[M,R,W,k,Z,J,U]=(0,l.A)({onAbout:L,onClose:O,toggleDate:v,toggleOptions:P}),[H,Y,_]=(0,T.A)(false),[B,E]=(0,m.A)(),[q,Q]=(0,m.A)(),X=(0,n.li)(),z=(0,n.li)(),G=(0,n.hb)((()=>{const e=[],t=E(),s=(0,n.ZC)(z),{msg:a=[]}=s.getValidation();if(t||e.push(g(i)),e.push(...a),(0,x.A)(X,e),0===e.length){const{one:e,two:a}=s.getValues(),{value:i}=Q()||{};V(F(o,{...(0,n.ZC)(X).getValues(),one:t,two:e,three:a,seriaType:i,hasSecondYAxis:(0,n.ZC)(H)}))}J(e)}),[]);return(0,c.jsxs)(p.A.DraggableDialog,{isShow:e,caption:s,menuModel:W,toTopLayer:j,onLoad:G,onShow:f,onClose:U,children:[(0,c.jsx)(p.A.Toolbar,{isShow:M,buttons:k}),(0,c.jsx)(p.A.SelectWithLoad,{isShow:e,isShowLabels:R,uri:r,jsonProp:h,caption:i,optionNames:"Items",onSelect:B}),(0,c.jsx)(p.A.SelectOneTwo,{ref:z,isShow:e,isShowLabels:R,uri:w,oneCaption:d,oneJsonProp:S,twoCaption:A,msgOnNotSelected:g}),(0,c.jsx)(p.A.ShowHide,{isShow:N,children:(0,c.jsx)(p.A.DatesFragment,{ref:X,isShowLabels:R,initFromDate:u,initToDate:C,msgOnNotValidFormat:D,onTestDate:b})}),(0,c.jsxs)(p.A.ShowHide,{isShow:I,children:[t&&(0,c.jsx)(p.A.RowInputSelect,{isShowLabels:R,caption:"Chart Type:",options:y,onSelect:q}),(0,c.jsx)(p.A.RowCheckBox1,{caption:"Add Seria with Second YAxis",initialValue:false,onCheck:Y,onUnCheck:_})]}),(0,c.jsx)(p.A.ValidationMessages,{validationMessages:Z})]})}))}},4819:(o,e,t)=>{t.d(e,{A:()=>s});var n=t(2009);const s=(o,e)=>{const t=(0,n.ZC)(o);if(t){const{isValid:o,datesMsg:n}=t.getValidation();o||e.push(n)}}},2338:(o,e,t)=>{t.d(e,{A:()=>s});var n=t(4819);const s=(o,e,t)=>{const s=o.reduce(((o,t)=>(t[0]||o.push(e(t[1])),o)),[]);return(0,n.A)(t,s),s}}}]);