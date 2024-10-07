"use strict";(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[288],{8632:(t,e,o)=>{o.d(e,{N:()=>l,q:()=>r});var s=o(6539),n=o(4848);const i=(t,e,o)=>i=>{let{onClick:l}=i;return(0,n.jsx)(s.A,{style:t,caption:e,title:o,onClick:l})},l=i({color:"#607d8b"},"Load","Load Item to Container"),r=i({color:"#232f3b"},"Show","Show Item Container")},6814:(t,e,o)=>{o.r(e),o.d(e,{default:()=>ct});var s=o(2009),n=o(4575),i=o(4867),l=o(8678),r=o(5856),a=o(391),c=o(1560),p=o(2190),u=o(2040),d=o(2400),C=o(5668),h=o(8632),m=o(9759),g=o(4848);const x={width:365},f={width:265},y={display:"inline-block",maxWidth:250,height:32,verticalAlign:"middle"},j=t=>"number"==typeof t&&t-t==0,A=(0,a.WB)(),L={},w=(0,l.vC)(2),G=(0,l.Gd)(),S=(0,n.A)((t=>{let{isShow:e,data:o=L,onClose:n}=t;const a=(0,s.li)(),{caption:S,fromDate:E,initToDate:b,onTestDate:T,itemConf:v}=o,{dataSource:N,x:D,y:B}=v||{},[W,I]=(0,i.A)(A),[k,M]=(0,i.A)(j(D)),[O,R]=(0,i.A)(),F=(0,s.ZC)((0,s.li)([{caption:"L",title:"Click to toggle input labels",onClick:I},{caption:"V",title:"Click to toggle row value",onClick:M},{caption:"D",title:"Click to toggle date input",onClick:R}])),[P,Z]=(0,s.J0)([]),J=[(0,g.jsx)(h.N,{onClick:()=>{const t=(0,s.ZC)(a),{isValid:e,datesMsg:i}=t.getValidation(),l=e?[]:i;if(0===l.length){const{id:e,title:s,subtitle:i,caption:l,columnName:r,dataColumn:a,seriaColumnNames:d,itemConf:C={}}=o,{fromDate:h,toDate:m}=t.getValues(),g={id:e,title:s,subtitle:i,value:l,item:l,fromDate:h,toDate:m,columnName:r,dataColumn:a,seriaColumnNames:d,loadId:C.loadId||p.Bs,...C};(0,c.YM)({chartType:p.kw,browserType:u.mU},g),n(),Z((t=>t.length>0?[]:t))}else Z(l)}},"load")];(0,s.vJ)((()=>{M(j(D))}),[D,M]);const V=E||w,H=b||G,$=T||l.bX,_=W?x:f,Y=function(t,e){return void 0===t&&(t=""),void 0===e&&(e=""),`${(0,r.A)(e)} ${(0,l.Ch)(t)}`.trim()}(D,B);return(0,g.jsxs)(d.A,{style:_,isShow:e,caption:"Load Item",commandButtons:J,onClose:()=>{n(),Z([])},children:[(0,g.jsx)(C.A.Toolbar,{isShow:!0,buttons:F}),(0,g.jsx)(C.A.RowText,{isShowLabels:W,textStyle:y,caption:"Item:",text:S}),(0,g.jsx)(C.A.ShowHide,{isShow:k,children:(0,g.jsx)(C.A.RowText,{isShowLabels:W,textStyle:y,caption:"Value:",text:Y})}),(0,g.jsx)(C.A.ShowHide,{isShow:O,children:(0,g.jsx)(C.A.InputPeriod,{refEl:a,isShowLabels:W,initFromDate:V,initToDate:H,onTestDate:$})}),(0,g.jsx)(C.A.RowText,{isShowLabels:W,textStyle:y,caption:"Source:",text:N}),(0,g.jsx)(m.A,{validationMessages:P})]})}));var E=o(4407),b=o(2440),T=o(8801),v=o(1990),N=o(701),D=o(2027);const B=()=>{const t=(0,s.li)(),[e,o]=(0,s.J0)([]),n=(0,s.hb)((()=>{(0,s.$)(t),o([])}),[]);return[e,o,n,t]};var W=o(6912),I=o(6539);const k=t=>{let{refBtClose:e,withoutClear:o,caption:s,title:n,onPrimary:i,onClear:l,onClose:r}=t;return(0,g.jsxs)(W.t4,{children:[(0,g.jsx)(I.A,{isPrimary:!0,caption:s,title:n,onClick:i}),!o&&(0,g.jsx)(I.A,{caption:"Clear",title:"Clear Input",onClick:l}),(0,g.jsx)(I.A,{refBt:e,caption:"Close",title:"Close Dialog",onClick:r})]})},M=t=>{let{validationMessages:e,refBtClose:o,caption:s,title:n,onPrimary:i,withoutClear:l,onClear:r,onClose:a,children:c}=t;return(0,g.jsxs)("div",{children:[c,(0,g.jsx)(m.A,{validationMessages:e}),(0,g.jsx)(k,{refBtClose:o,caption:s,title:n,onPrimary:i,withoutClear:l,onClear:r,onClose:a})]})};var O=o(1327),R=o(1205);const F={lineHeight:2},P={width:120},Z={width:250,height:30,paddingLeft:10,marginLeft:0,marginRight:0},J=t=>{let{refEl:e,caption:o}=t;return(0,g.jsxs)(W.st,{style:F,children:[(0,g.jsx)(O.D4,{style:P,children:o}),(0,g.jsx)(R.A,{refEl:e,style:Z})]})},V=t=>t.isVisible?t.setRefFocusLast:void 0,H=t=>{const{forActionType:e,useMsEdit:o,msgOnIsEmptyName:n,onCreate:i,onClose:l}=t,[r,a,c,p]=B();return o((t=>{t&&t.forActionType===e&&(t.messages?a(t.messages):c())})),(0,g.jsx)(M,{validationMessages:r,refBtClose:V(t),caption:"Create",title:"Create New Group",onPrimary:()=>{const t=(0,s.y5)(p);t?i({caption:t}):((0,s.$)(p),a([n("Group")]))},onClear:c,onClose:l,children:(0,g.jsx)(J,{refEl:p,caption:"Group"})})},$=()=>{const t=(0,s.li)(),e=(0,s.hb)((e=>{(0,s.nl)(t,(e||{}).caption)}),[]);return[t,e]},_=(t,e,o)=>{const{useMsEdit:n,forActionType:i,getWatchGroups:l}=t,[r,a]=(0,s.J0)((()=>l()));return n((t=>{t&&(t.forActionType===i?t.messages?e(t.messages):(o(),a(l())):a(l()))})),r};var Y=o(6476);const q={width:120},Q=t=>{let{caption:e,options:o,onSelect:s}=t;return(0,g.jsxs)(W.st,{children:[(0,g.jsx)(O.D4,{style:q,children:e}),(0,g.jsx)(Y.A,{width:"250",options:o,onSelect:s})]})},K=t=>{const{msgOnNotSelect:e,msgOnIsEmptyName:o,onRename:n,onClose:i}=t,[l,r,a,c]=B(),p=_(t,r,a),[u,d]=$();return(0,g.jsxs)(M,{validationMessages:l,refBtClose:V(t),caption:"Edit",title:"Edit Group Name",onPrimary:()=>{const t=(0,s.y5)(c),i=(0,s.ZC)(u);if(t&&i)n({captionFrom:i,captionTo:t});else{const s=[];i||s.push(e("Group From")),t||s.push(o("Group To")),r(s)}},onClear:a,onClose:i,children:[(0,g.jsx)(Q,{caption:"Group From",options:p,onSelect:d}),(0,g.jsx)(J,{refEl:c,caption:"Group To"})]})},U=t=>({groups:t(),errs:[]}),X=(t,e)=>({type:t,payload:e}),z=(t,e)=>{let{type:o,payload:s}=e;switch(o){case"a":return{groups:s,errs:[]};case"b":return{...t,errs:s};default:return t}},tt=t=>{const{onDelete:e,msgOnNotSelect:o,useMsEdit:n,getWatchGroups:i,onClose:l}=t,r=(0,s.li)(null),[a,c,p,u]=((t,e)=>{const[{groups:o,errs:n},i]=(0,s.WO)(z,t,U);return[o,n,t=>i(X("a",t)),()=>i(X("b",[e("Group")]))]})(i,o);return n((t=>{t&&!t.messages&&p(i())})),(0,g.jsx)(M,{validationMessages:c,refBtClose:V(t),caption:"Delete",title:"Delete Group",onPrimary:()=>{const t=(0,s.ZC)(r);t?(e({caption:t}),(0,s.nl)(r,null)):u()},withoutClear:!0,onClose:l,children:(0,g.jsx)(Q,{caption:"Group",options:a,onSelect:t=>{(0,s.nl)(r,t&&t.caption||null)}})})},et="Watch Groups Edit",ot=(0,n.A)((t=>{let{isShow:e,onClose:o}=t;const[s,n]=(0,E.Ri)();return(0,g.jsx)(d.A,{refFocusLast:s,caption:et,isShow:e,isWithButton:!1,onClose:o,children:(0,g.jsxs)(N.A,{ariaLabel:et,id:"egd",width:380,useMsEdit:T.w9,getWatchGroups:T.QC,msgOnNotSelect:v.L2,msgOnIsEmptyName:v.N,onClose:o,setRefFocusLast:n,children:[(0,g.jsx)(D.A,{title:"Create",children:(0,g.jsx)(H,{forActionType:b.fM,onCreate:T.HS})}),(0,g.jsx)(D.A,{title:"Rename",children:(0,g.jsx)(K,{forActionType:b.Wb,onRename:T.pK})}),(0,g.jsx)(D.A,{title:"Delete",children:(0,g.jsx)(tt,{forActionType:b.dr,onDelete:T.xG})})]})})})),st=t=>{const{msgOnNotSelect:e,msgOnIsEmptyName:o,onCreate:n,onClose:i}=t,[l,r,a,c]=B(),p=_(t,r,a),[u,d]=$();return(0,g.jsxs)(M,{validationMessages:l,refBtClose:V(t),caption:"Create",title:"Create New List",onPrimary:()=>{const t=(0,s.y5)(c),i=(0,s.ZC)(u);if(i&&t)n({captionGroup:i,captionList:t});else{const s=[];i||s.push(e("In Group")),t||s.push(o("List")),r(s)}},onClear:a,onClose:i,children:[(0,g.jsx)(Q,{caption:"In Group",options:p,onSelect:d}),(0,g.jsx)(J,{refEl:c,caption:"List"})]})};var nt=o(4250);const it=t=>{const[e,o]=(0,nt.A)(t),{refEl:n,getWatchListsByGroup:i,groupCaption:l,groupOptions:r,listCaption:a}=t,c=(0,s.li)(),[p,u]=$(),[d,C]=(0,s.J0)([]),h=(0,s.hb)((t=>{const{caption:e}=t||{};t&&e?((0,s.nl)(c,e),(0,s.nl)(p,null),C(t.lists||[])):(0,s.nl)(c,null)}),[]);return(0,s.vJ)((()=>{const n=o();if(n!==t){if(n.groupOptions!==r)(0,s.nl)(c,null),(0,s.nl)(p,null),C([]);else if((0,s.ZC)(c)){const t=i(c.current);t!==d&&((0,s.nl)(p,null),C(t))}e(t)}}),[t]),(0,s.Yn)(n,(()=>({getValue:()=>({captionGroup:(0,s.ZC)(c),captionList:(0,s.ZC)(p)})}))),(0,g.jsxs)("div",{children:[(0,g.jsx)(Q,{caption:l,options:r,onSelect:h}),(0,g.jsx)(Q,{caption:a,options:d,onSelect:u})]})},lt=t=>{const{onRename:e,msgOnIsEmptyName:o,msgOnNotSelect:n,getWatchListsByGroup:i,onClose:l}=t,r=(0,s.li)(),[a,c,p,u]=B(),d=_(t,c,p);return(0,g.jsxs)(M,{validationMessages:a,refBtClose:V(t),caption:"Edit",title:"Edit List Name",onPrimary:()=>{const{captionGroup:t,captionList:i}=(0,s.y5)(r)||{},l=(0,s.y5)(u);if(t&&i&&l)e({captionGroup:t,captionListFrom:i,captionListTo:l});else{const e=[];t||e.push(n("Group")),i||e.push(n("List From")),l||e.push(o("List To")),c(e)}},onClear:p,onClose:l,children:[(0,g.jsx)(it,{refEl:r,getWatchListsByGroup:i,groupCaption:"In Group",groupOptions:d,listCaption:"List From"}),(0,g.jsx)(J,{refEl:u,caption:"List To"})]})},rt=t=>{const{getWatchListsByGroup:e,useMsEdit:o,getWatchGroups:n,forActionType:i,onDelete:l,msgOnNotSelect:r,onClose:a}=t,c=(0,s.li)(),[p,u,d]=B(),[C,h]=(0,s.J0)((()=>n()));return o((t=>{t&&(t.messages||(t.forActionType===i&&d(),h(n())))})),(0,g.jsx)(M,{validationMessages:p,refBtClose:V(t),caption:"Delete",title:"Delete List",onPrimary:()=>{const{captionGroup:t,captionList:e}=(0,s.y5)(c)||{};if(t&&e)l({captionGroup:t,captionList:e});else{const o=[];t||o.push(r("Group")),e||o.push(r("List")),u(o)}},onClear:d,onClose:a,children:(0,g.jsx)(it,{refEl:c,getWatchListsByGroup:e,groupCaption:"In Group",groupOptions:C,listCaption:"List"})})},at="Watch Lists Edit",ct={LoadItem:S,EditGroup:ot,EditList:(0,n.A)((t=>{let{isShow:e,onClose:o}=t;const[s,n]=(0,E.Ri)();return(0,g.jsx)(d.A,{refFocusLast:s,caption:at,isShow:e,isWithButton:!1,onClose:o,children:(0,g.jsxs)(N.A,{ariaLabel:at,id:"eld",width:380,useMsEdit:T.w9,getWatchGroups:T.QC,msgOnNotSelect:v.L2,msgOnIsEmptyName:v.N,onClose:o,setRefFocusLast:n,children:[(0,g.jsx)(D.A,{title:"Create",children:(0,g.jsx)(st,{forActionType:b.$H,onCreate:T.CY})}),(0,g.jsx)(D.A,{title:"Rename",children:(0,g.jsx)(lt,{getWatchListsByGroup:T.rF,forActionType:b.Nt,onRename:T.sW})}),(0,g.jsx)(D.A,{title:"Delete",children:(0,g.jsx)(rt,{getWatchListsByGroup:T.rF,forActionType:b.yq,onDelete:T.C5})})]})})}))}}}]);