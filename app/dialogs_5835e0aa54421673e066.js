"use strict";(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[890],{9060:(o,t,e)=>{e.r(t),e.d(t,{default:()=>b});var i=e(2009),s=e(4575),a=e(4867),n=e(6072),l=e(3057),r=e(2783),h=e(9288),p=e(5668),d=e(4848);const c={width:85},w={width:270},S=o=>"string"==typeof o&&o.trim(),g=o=>S(o)&&S(o.split("/")[2]),A=(0,h.Ox)(void 0,"t2"),b={Query:(0,s.A)((o=>{const{isShow:t,noDate:e,caption:s,oneCaption:h,onePlaceholder:S,initFromDate:b,initToDate:u,msgOnNotValidFormat:C,onTestDate:D,toTopLayer:m,onAbout:y,loadFn:T,onLoad:f,onShow:x,onClose:L}=o,[O,j]=(0,i.J0)("SPLINE"),[v,E]=(0,a.A)(!0),[F,k,M,P,V]=(0,r.A)(),[_,I,N,R]=(0,l.A)({onAbout:y,onClose:L,toggleOptions:M,toggleDate:e?void 0:E}),Z=(0,i.li)(),H=(0,i.li)(),J=(0,i.li)(),Q=(0,n.A)((()=>{const t=(0,i.ZC)(Z);if(t&&t.isValid()){const e=t.getValue();f(T(o,{...(0,i.y5)(J),items:[{c:e,v:e}],dialogOptions:(0,i.ZC)(F),chartType:O}))}else t.showErrMsg()}));return(0,d.jsxs)(p.A.DraggableDialog,{isShow:t,menuModel:N,caption:s,toTopLayer:m,onLoad:Q,onShow:x,onClose:L,children:[(0,d.jsx)(p.A.Toolbar,{isShow:_,buttons:R}),(0,d.jsx)(p.A.ModalOptions,{isShow:k,toggleOption:V,onClose:P}),(0,d.jsx)(p.A.RowPattern,{refEl:Z,isShow:t,isShowLabels:I,style:w,captionStyle:c,placeholder:S,caption:h,onTest:g,errorMsg:"Empty or Id format is not valid"}),(0,d.jsx)(p.A.RowChartDate,{refSeriaColor:J,chartType:O,isShowLabels:I,isShowChart:!0,labelStyle:c,selectWidth:w.width,chartOptions:A,onSelectChart:j,noDate:e}),!e&&(0,d.jsx)(p.A.ShowHide,{isShow:v,children:(0,d.jsx)(p.A.InputPeriod,{refEl:H,isShowLabels:I,initFromDate:b,initToDate:u,msgOnNotValidFormat:C,onTestDate:D})})]})}))}}}]);