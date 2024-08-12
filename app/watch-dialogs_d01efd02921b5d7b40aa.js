"use strict";(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[288],{8632:(t,e,o)=>{o.d(e,{N:()=>l,q:()=>a});var s=o(6539),n=o(4848);const i=(t,e,o)=>i=>{let{onClick:l}=i;return(0,n.jsx)(s.A,{style:t,caption:e,title:o,onClick:l})},l=i({color:"#607d8b"},"Load","Load Item to Container"),a=i({color:"#232f3b"},"Show","Show Item Container")},5013:(t,e,o)=>{o.r(e),o.d(e,{default:()=>ct});var s=o(2009),n=o(4575),i=o(4867),l=o(8678),a=o(5856),r=o(391),c=o(5202),p=o(2190),u=o(2040),d=o(2400),h=o(3406),C=o(8632),m=o(9759),x=o(4848);const g={width:365},j={width:265},f={display:"inline-block",maxWidth:250,height:32,verticalAlign:"middle"},w=t=>"number"==typeof t&&t-t==0,y=(0,r.WB)(),L={},A=(0,l.vC)(2),S=(0,l.Gd)(),G=(0,n.A)((t=>{let{isShow:e,data:o=L,onClose:n}=t;const r=(0,s.li)(),{caption:G,fromDate:T,initToDate:R,onTestDate:v,itemConf:E}=o,{dataSource:b,x:B,y:I}=E||{},[N,D]=(0,i.A)(y),[M,W]=(0,i.A)(w(B)),[k,O]=(0,i.A)(),F=(0,s.ZC)((0,s.li)([{caption:"L",title:"Click to toggle input labels",onClick:D},{caption:"V",title:"Click to toggle row value",onClick:W},{caption:"D",title:"Click to toggle date input",onClick:O}])),[V,P]=(0,s.J0)([]),Z=[(0,x.jsx)(C.N,{onClick:()=>{const t=(0,s.ZC)(r),{isValid:e,datesMsg:i}=t.getValidation(),l=e?[]:i;if(0===l.length){const{id:e,title:s,subtitle:i,caption:l,columnName:a,dataColumn:r,seriaColumnNames:d,itemConf:h={}}=o,{fromDate:C,toDate:m}=t.getValues(),x={id:e,title:s,subtitle:i,value:l,item:l,fromDate:C,toDate:m,columnName:a,dataColumn:r,seriaColumnNames:d,loadId:h.loadId||p.Bs,...h};(0,c.YM)({chartType:p.kw,browserType:u.mU},x),n(),P((t=>t.length>0?[]:t))}else P(l)}},"load")];(0,s.vJ)((()=>{W(w(B))}),[B,W]);const J=T||A,H=R||S,$=v||l.bX,_=N?g:j,Y=function(t,e){return void 0===t&&(t=""),void 0===e&&(e=""),`${(0,a.A)(e)} ${(0,l.Ch)(t)}`.trim()}(B,I);return(0,x.jsxs)(d.A,{style:_,isShow:e,caption:"Load Item",commandButtons:Z,onClose:()=>{n(),P([])},children:[(0,x.jsx)(h.A.Toolbar,{isShow:!0,buttons:F}),(0,x.jsx)(h.A.RowText,{isShowLabels:N,textStyle:f,caption:"Item:",text:G}),(0,x.jsx)(h.A.ShowHide,{isShow:M,children:(0,x.jsx)(h.A.RowText,{isShowLabels:N,textStyle:f,caption:"Value:",text:Y})}),(0,x.jsx)(h.A.ShowHide,{isShow:k,children:(0,x.jsx)(h.A.InputPeriod,{refEl:r,isShowLabels:N,initFromDate:J,initToDate:H,onTestDate:$})}),(0,x.jsx)(h.A.RowText,{isShowLabels:N,textStyle:f,caption:"Source:",text:b}),(0,x.jsx)(m.A,{validationMessages:V})]})}));var T=o(4407),R=o(2440),v=o(8801),E=o(1990),b=o(701),B=o(2027);const I=()=>{const t=(0,s.li)(),[e,o]=(0,s.J0)([]),n=(0,s.hb)((()=>{(0,s.$)(t),o([])}),[]);return[e,o,n,t]};var N=o(1327),D=o(1205),M=o(6912);const W={lineHeight:2},k={width:120},O={width:250,height:30,paddingLeft:10,marginLeft:0,marginRight:0},F=t=>{let{refEl:e,caption:o}=t;return(0,x.jsxs)(M.st,{style:W,children:[(0,x.jsx)(N.D4,{style:k,children:o}),(0,x.jsx)(D.A,{refEl:e,style:O})]})};var V=o(6476);const P={width:120},Z=t=>{let{caption:e,options:o,onSelect:s}=t;return(0,x.jsxs)(M.st,{children:[(0,x.jsx)(N.D4,{style:P,children:e}),(0,x.jsx)(V.A,{width:"250",options:o,onSelect:s})]})};var J=o(4250);const H=()=>{const t=(0,s.li)(),e=(0,s.hb)((e=>{(0,s.nl)(t,(e||{}).caption)}),[]);return[t,e]},$=t=>{const[e,o]=(0,J.A)(t),{refEl:n,getWatchListsByGroup:i,groupCaption:l,groupOptions:a,listCaption:r}=t,c=(0,s.li)(),[p,u]=H(),[d,h]=(0,s.J0)([]),C=(0,s.hb)((t=>{const{caption:e}=t||{};t&&e?((0,s.nl)(c,e),(0,s.nl)(p,null),h(t.lists||[])):(0,s.nl)(c,null)}),[]);return(0,s.vJ)((()=>{const n=o();if(n!==t){if(n.groupOptions!==a)(0,s.nl)(c,null),(0,s.nl)(p,null),h([]);else if((0,s.ZC)(c)){const t=i(c.current);t!==d&&((0,s.nl)(p,null),h(t))}e(t)}}),[t]),(0,s.Yn)(n,(()=>({getValue:()=>({captionGroup:(0,s.ZC)(c),captionList:(0,s.ZC)(p)})}))),(0,x.jsxs)("div",{children:[(0,x.jsx)(Z,{caption:l,options:a,onSelect:C}),(0,x.jsx)(Z,{caption:r,options:d,onSelect:u})]})};var _=o(4296);const Y=t=>{let{refBtClose:e,withoutClear:o,caption:s,title:n,onPrimary:i,onClear:l,onClose:a}=t;return(0,x.jsxs)(M.t4,{children:[(0,x.jsx)(_.A.Primary,{caption:s,title:n,onClick:i}),!o&&(0,x.jsx)(_.A.Clear,{onClick:l}),(0,x.jsx)(_.A.Close,{refBt:e,onClick:a})]})},q={RowInputText:F,RowInputSelect:Z,SelectGroupList:$,Button:_.A,RowButtons:Y,ValidationMessages:m.A},Q=t=>t.isVisible?t.setRefFocusLast:void 0,K=t=>{const{forActionType:e,useMsEdit:o,msgOnIsEmptyName:n,onCreate:i,onClose:l}=t,[a,r,c,p]=I();return o((t=>{t&&t.forActionType===e&&(t.messages?r(t.messages):c())})),(0,x.jsxs)("div",{children:[(0,x.jsx)(q.RowInputText,{refEl:p,caption:"Group:"}),(0,x.jsx)(q.ValidationMessages,{validationMessages:a}),(0,x.jsx)(q.RowButtons,{refBtClose:Q(t),caption:"Create",title:"Create New Group",onPrimary:()=>{const t=(0,s.y5)(p);t?i({caption:t}):((0,s.$)(p),r([n("Group")]))},onClear:c,onClose:l})]})},U=(t,e,o)=>{const{useMsEdit:n,forActionType:i,getWatchGroups:l}=t,[a,r]=(0,s.J0)((()=>l()));return n((t=>{t&&(t.forActionType===i?t.messages?e(t.messages):(o(),r(l())):r(l()))})),a},X=t=>{const{msgOnNotSelect:e,msgOnIsEmptyName:o,onRename:n,onClose:i}=t,[l,a,r,c]=I(),p=U(t,a,r),[u,d]=H();return(0,x.jsxs)("div",{children:[(0,x.jsx)(q.RowInputSelect,{caption:"Group From:",options:p,onSelect:d}),(0,x.jsx)(q.RowInputText,{refEl:c,caption:"Group To:"}),(0,x.jsx)(q.ValidationMessages,{validationMessages:l}),(0,x.jsx)(q.RowButtons,{refBtClose:Q(t),caption:"Edit",title:"Edit Group Name",onPrimary:()=>{const t=(0,s.y5)(c),i=(0,s.ZC)(u);if(t&&i)n({captionFrom:i,captionTo:t});else{const s=[];i||s.push(e("Group From")),t||s.push(o("Group To")),a(s)}},onClear:r,onClose:i})]})},z=t=>({groups:t(),errs:[]}),tt=(t,e)=>({type:t,payload:e}),et=(t,e)=>{let{type:o,payload:s}=e;switch(o){case"a":return{groups:s,errs:[]};case"b":return{...t,errs:s};default:return t}},ot=t=>{const{onDelete:e,msgOnNotSelect:o,useMsEdit:n,getWatchGroups:i,onClose:l}=t,a=(0,s.li)(null),[r,c,p,u]=((t,e)=>{const[{groups:o,errs:n},i]=(0,s.WO)(et,t,z);return[o,n,t=>i(tt("a",t)),()=>i(tt("b",[e("Group")]))]})(i,o);return n((t=>{t&&!t.messages&&p(i())})),(0,x.jsxs)("div",{children:[(0,x.jsx)(q.RowInputSelect,{caption:"Group:",options:r,onSelect:t=>{(0,s.nl)(a,t&&t.caption||null)}}),(0,x.jsx)(q.ValidationMessages,{validationMessages:c}),(0,x.jsx)(q.RowButtons,{refBtClose:Q(t),caption:"Delete",title:"Delete Group",onPrimary:()=>{const t=(0,s.ZC)(a);t?(e({caption:t}),(0,s.nl)(a,null)):u()},withoutClear:!0,onClose:l})]})},st="Watch Groups Edit",nt=(0,n.A)((t=>{let{isShow:e,onClose:o}=t;const[s,n]=(0,T.Ri)();return(0,x.jsx)(d.A,{refFocusLast:s,caption:st,isShow:e,isWithButton:!1,onClose:o,children:(0,x.jsxs)(b.A,{ariaLabel:st,id:"egd",width:380,useMsEdit:v.w9,getWatchGroups:v.QC,msgOnNotSelect:E.L2,msgOnIsEmptyName:E.N,onClose:o,setRefFocusLast:n,children:[(0,x.jsx)(B.A,{title:"Create",children:(0,x.jsx)(K,{forActionType:R.fM,onCreate:v.HS})}),(0,x.jsx)(B.A,{title:"Rename",children:(0,x.jsx)(X,{forActionType:R.Wb,onRename:v.pK})}),(0,x.jsx)(B.A,{title:"Delete",children:(0,x.jsx)(ot,{forActionType:R.dr,onDelete:v.xG})})]})})})),it=t=>{const{msgOnNotSelect:e,msgOnIsEmptyName:o,onCreate:n,onClose:i}=t,[l,a,r,c]=I(),p=U(t,a,r),[u,d]=H();return(0,x.jsxs)("div",{children:[(0,x.jsx)(q.RowInputSelect,{caption:"In Group:",options:p,onSelect:d}),(0,x.jsx)(q.RowInputText,{refEl:c,caption:"List:"}),(0,x.jsx)(q.ValidationMessages,{validationMessages:l}),(0,x.jsx)(q.RowButtons,{refBtClose:Q(t),caption:"Create",title:"Create New List",onPrimary:()=>{const t=(0,s.y5)(c),i=(0,s.ZC)(u);if(i&&t)n({captionGroup:i,captionList:t});else{const s=[];i||s.push(e("In Group")),t||s.push(o("List")),a(s)}},onClear:r,onClose:i})]})},lt=t=>{const{onRename:e,msgOnIsEmptyName:o,msgOnNotSelect:n,getWatchListsByGroup:i,onClose:l}=t,a=(0,s.li)(),[r,c,p,u]=I(),d=U(t,c,p);return(0,x.jsxs)("div",{children:[(0,x.jsx)(q.SelectGroupList,{refEl:a,getWatchListsByGroup:i,groupCaption:"In Group:",groupOptions:d,listCaption:"List From:"}),(0,x.jsx)(q.RowInputText,{refEl:u,caption:"List To:"}),(0,x.jsx)(q.ValidationMessages,{validationMessages:r}),(0,x.jsx)(q.RowButtons,{refBtClose:Q(t),caption:"Edit",title:"Edit List Name",onPrimary:()=>{const{captionGroup:t,captionList:i}=(0,s.y5)(a)||{},l=(0,s.y5)(u);if(t&&i&&l)e({captionGroup:t,captionListFrom:i,captionListTo:l});else{const e=[];t||e.push(n("Group")),i||e.push(n("List From")),l||e.push(o("List To")),c(e)}},onClear:p,onClose:l})]})},at=t=>{const{getWatchListsByGroup:e,useMsEdit:o,getWatchGroups:n,forActionType:i,onDelete:l,msgOnNotSelect:a,onClose:r}=t,c=(0,s.li)(),[p,u,d]=I(),[h,C]=(0,s.J0)((()=>n()));return o((t=>{t&&(t.messages||(t.forActionType===i&&d(),C(n())))})),(0,x.jsxs)("div",{children:[(0,x.jsx)(q.SelectGroupList,{refEl:c,getWatchListsByGroup:e,groupCaption:"In Group:",groupOptions:h,listCaption:"List:"}),(0,x.jsx)(q.ValidationMessages,{validationMessages:p}),(0,x.jsx)(q.RowButtons,{refBtClose:Q(t),caption:"Delete",title:"Delete List",onPrimary:()=>{const{captionGroup:t,captionList:e}=(0,s.y5)(c)||{};if(t&&e)l({captionGroup:t,captionList:e});else{const o=[];t||o.push(a("Group")),e||o.push(a("List")),u(o)}},onClear:d,onClose:r})]})},rt="Watch Lists Edit",ct={LoadItem:G,EditGroup:nt,EditList:(0,n.A)((t=>{let{isShow:e,onClose:o}=t;const[s,n]=(0,T.Ri)();return(0,x.jsx)(d.A,{refFocusLast:s,caption:rt,isShow:e,isWithButton:!1,onClose:o,children:(0,x.jsxs)(b.A,{ariaLabel:rt,id:"eld",width:380,useMsEdit:v.w9,getWatchGroups:v.QC,msgOnNotSelect:E.L2,msgOnIsEmptyName:E.N,onClose:o,setRefFocusLast:n,children:[(0,x.jsx)(B.A,{title:"Create",children:(0,x.jsx)(it,{forActionType:R.$H,onCreate:v.CY})}),(0,x.jsx)(B.A,{title:"Rename",children:(0,x.jsx)(lt,{getWatchListsByGroup:v.rF,forActionType:R.Nt,onRename:v.sW})}),(0,x.jsx)(B.A,{title:"Delete",children:(0,x.jsx)(at,{getWatchListsByGroup:v.rF,forActionType:R.yq,onDelete:v.C5})})]})})}))}}}]);