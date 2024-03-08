"use strict";(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[288],{8632:(t,e,o)=>{o.d(e,{N:()=>a,q:()=>r});var s=o(6539),n=o(4848);const i={color:"#607d8b"},l={color:"#232f3b"},a=t=>{let{onClick:e}=t;return(0,n.jsx)(s.A,{style:i,caption:"Load",title:"Load Item to Container",onClick:e})},r=t=>{let{onClick:e}=t;return(0,n.jsx)(s.A,{style:l,caption:"Show",title:"Show Item Container",onClick:e})}},5013:(t,e,o)=>{o.r(e),o.d(e,{default:()=>rt});var s=o(2009),n=o(4575),i=o(4867),l=o(8678),a=o(5856),r=o(391),c=o(8005),p=o(2190),u=o(2040),d=o(2400),h=o(4682),C=o(8632),x=o(9759),m=o(4848);const g={width:365},j={width:265},y={display:"inline-block",maxWidth:250,height:32,verticalAlign:"middle"},f=t=>"number"==typeof t&&t-t==0,w=(0,r.WB)(),A={},L=(0,l.vC)(2),S=(0,l.Gd)(),G=(0,n.A)((t=>{let{isShow:e,data:o=A,onClose:n}=t;const r=(0,s.li)(),{caption:G,fromDate:v,initToDate:R,onTestDate:T,itemConf:B}=o,{dataSource:I,x:b,y:D}=B||{},[N,M]=(0,i.A)(w),[W,k]=(0,i.A)(f(b)),[E,O]=(0,i.A)(),F=(0,s.ZC)((0,s.li)([{caption:"L",title:"Click to toggle input labels",onClick:M},{caption:"V",title:"Click to toggle row value",onClick:k},{caption:"D",title:"Click to toggle date input",onClick:O}])),[V,P]=(0,s.J0)([]),Z=[(0,m.jsx)(C.N,{onClick:()=>{const t=(0,s.ZC)(r),{isValid:e,datesMsg:i}=t.getValidation(),l=e?[]:i;if(0===l.length){const{id:e,title:s,subtitle:i,caption:l,columnName:a,dataColumn:r,seriaColumnNames:d,itemConf:h={}}=o,{fromDate:C,toDate:x}=t.getValues(),m={id:e,title:s,subtitle:i,value:l,item:l,fromDate:C,toDate:x,columnName:a,dataColumn:r,seriaColumnNames:d,loadId:h.loadId||p.Bs,...h};(0,c.YM)({chartType:p.kw,browserType:u.mU},m),n(),P((t=>t.length>0?[]:t))}else P(l)}},"load")];(0,s.vJ)((()=>{k(f(b))}),[b,k]);const J=v||L,H=R||S,_=T||l.bX,Y=N?g:j,$=function(t,e){return void 0===t&&(t=""),void 0===e&&(e=""),((0,a.A)(e)+" "+(0,l.Ch)(t)).trim()}(b,D);return(0,m.jsxs)(d.A,{style:Y,isShow:e,caption:"Load Item",commandButtons:Z,onClose:()=>{n(),P([])},children:[(0,m.jsx)(h.A.Toolbar,{isShow:!0,buttons:F}),(0,m.jsx)(h.A.RowText,{isShowLabels:N,textStyle:y,caption:"Item:",text:G}),(0,m.jsx)(h.A.ShowHide,{isShow:W,children:(0,m.jsx)(h.A.RowText,{isShowLabels:N,textStyle:y,caption:"Value:",text:$})}),(0,m.jsx)(h.A.ShowHide,{isShow:E,children:(0,m.jsx)(h.A.DatesFragment,{ref:r,isShowLabels:N,initFromDate:J,initToDate:H,onTestDate:_})}),(0,m.jsx)(h.A.RowText,{isShowLabels:N,textStyle:y,caption:"Source:",text:I}),(0,m.jsx)(x.A,{validationMessages:V})]})}));var v=o(4407),R=o(2440),T=o(8801),B=o(1990),I=o(701),b=o(2027);const D=()=>{const t=(0,s.li)(),[e,o]=(0,s.J0)([]),n=(0,s.hb)((()=>{(0,s.$)(t),o([])}),[]);return[e,o,n,t]};var N=o(1327),M=o(1205),W=o(4302);const k={...W.ID,lineHeight:2},E={width:120},O={width:250,height:30,paddingLeft:10,marginLeft:0,marginRight:0},F=(0,s.Rf)(((t,e)=>{let{caption:o}=t;return(0,m.jsxs)("div",{style:k,children:[(0,m.jsx)(N.D4,{style:E,children:o}),(0,m.jsx)(M.A,{ref:e,style:O})]})}));var V=o(9821);const P={width:120},Z=t=>{let{caption:e,options:o,onSelect:s}=t;return(0,m.jsxs)("div",{style:W.ID,children:[(0,m.jsx)(N.D4,{style:P,children:e}),(0,m.jsx)(V.A,{width:"250",options:o,onSelect:s})]})};var J=o(4250);const H=()=>{const t=(0,s.li)(),e=(0,s.hb)((e=>{(0,s.nl)(t,(e||{}).caption)}),[]);return[t,e]},_=(0,s.Rf)(((t,e)=>{const[o,n]=(0,J.A)(t),{getWatchListsByGroup:i,groupCaption:l,groupOptions:a,listCaption:r}=t,c=(0,s.li)(),[p,u]=H(),[d,h]=(0,s.J0)([]),C=(0,s.hb)((t=>{const{caption:e}=t||{};t&&e?((0,s.nl)(c,e),(0,s.nl)(p,null),h(t.lists||[])):(0,s.nl)(c,null)}),[]);return(0,s.vJ)((()=>{const e=n();if(e!==t){if(e.groupOptions!==a)(0,s.nl)(c,null),(0,s.nl)(p,null),h([]);else if((0,s.ZC)(c)){const t=i(c.current);t!==d&&((0,s.nl)(p,null),h(t))}o(t)}}),[t]),(0,s.Yn)(e,(()=>({getValue:()=>({captionGroup:(0,s.ZC)(c),captionList:(0,s.ZC)(p)})}))),(0,m.jsxs)("div",{children:[(0,m.jsx)(Z,{caption:l,options:a,onSelect:C}),(0,m.jsx)(Z,{caption:r,options:d,onSelect:u})]})}));var Y=o(4296);const $={...o(7340).t,margin:"8px 4px 10px 0"},q=t=>{let{refBtClose:e,withoutClear:o,caption:s,title:n,onPrimary:i,onClear:l,onClose:a}=t;return(0,m.jsxs)("div",{style:$,children:[(0,m.jsx)(Y.A.Primary,{caption:s,title:n,onClick:i}),!o&&(0,m.jsx)(Y.A.Clear,{onClick:l}),(0,m.jsx)(Y.A.Close,{refBt:e,onClick:a})]})},Q={RowInputText:F,RowInputSelect:Z,SelectGroupList:_,Button:Y.A,RowButtons:q,ValidationMessages:x.A},K=t=>t.isVisible?t.setRefFocusLast:void 0,U=t=>{const{forActionType:e,useMsEdit:o,msgOnIsEmptyName:n,onCreate:i,onClose:l}=t,[a,r,c,p]=D();return o((t=>{t&&t.forActionType===e&&(t.messages?r(t.messages):c())})),(0,m.jsxs)("div",{children:[(0,m.jsx)(Q.RowInputText,{ref:p,caption:"Group:"}),(0,m.jsx)(Q.ValidationMessages,{validationMessages:a}),(0,m.jsx)(Q.RowButtons,{refBtClose:K(t),caption:"Create",title:"Create New Group",onPrimary:()=>{const t=(0,s.y5)(p);t?i({caption:t}):((0,s.$)(p),r([n("Group")]))},onClear:c,onClose:l})]})},X=(t,e,o)=>{const{useMsEdit:n,forActionType:i,getWatchGroups:l}=t,[a,r]=(0,s.J0)((()=>l()));return n((t=>{t&&(t.forActionType===i?t.messages?e(t.messages):(o(),r(l())):r(l()))})),a},z=t=>{const{msgOnNotSelect:e,msgOnIsEmptyName:o,onRename:n,onClose:i}=t,[l,a,r,c]=D(),p=X(t,a,r),[u,d]=H();return(0,m.jsxs)("div",{children:[(0,m.jsx)(Q.RowInputSelect,{caption:"Group From:",options:p,onSelect:d}),(0,m.jsx)(Q.RowInputText,{ref:c,caption:"Group To:"}),(0,m.jsx)(Q.ValidationMessages,{validationMessages:l}),(0,m.jsx)(Q.RowButtons,{refBtClose:K(t),caption:"Edit",title:"Edit Group Name",onPrimary:()=>{const t=(0,s.y5)(c),i=(0,s.ZC)(u);if(t&&i)n({captionFrom:i,captionTo:t});else{const s=[];i||s.push(e("Group From")),t||s.push(o("Group To")),a(s)}},onClear:r,onClose:i})]})},tt=t=>({groups:t(),errs:[]}),et=(t,e)=>({type:t,payload:e}),ot=(t,e)=>{let{type:o,payload:s}=e;switch(o){case"a":return{groups:s,errs:[]};case"b":return{...t,errs:s};default:return t}},st=t=>{const{onDelete:e,msgOnNotSelect:o,useMsEdit:n,getWatchGroups:i,onClose:l}=t,a=(0,s.li)(null),[r,c,p,u]=((t,e)=>{const[{groups:o,errs:n},i]=(0,s.WO)(ot,t,tt);return[o,n,t=>i(et("a",t)),()=>i(et("b",[e("Group")]))]})(i,o);return n((t=>{t&&!t.messages&&p(i())})),(0,m.jsxs)("div",{children:[(0,m.jsx)(Q.RowInputSelect,{caption:"Group:",options:r,onSelect:t=>{(0,s.nl)(a,t&&t.caption||null)}}),(0,m.jsx)(Q.ValidationMessages,{validationMessages:c}),(0,m.jsx)(Q.RowButtons,{refBtClose:K(t),caption:"Delete",title:"Delete Group",onPrimary:()=>{const t=(0,s.ZC)(a);t?(e({caption:t}),(0,s.nl)(a,null)):u()},withoutClear:!0,onClose:l})]})},nt=(0,n.A)((t=>{let{isShow:e,onClose:o}=t;const[s,n]=(0,v.Ri)();return(0,m.jsx)(d.A,{refFocusLast:s,caption:"Watch Groups Edit",isShow:e,isWithButton:!1,onClose:o,children:(0,m.jsxs)(I.A,{id:"egd",width:380,useMsEdit:T.w9,getWatchGroups:T.QC,msgOnNotSelect:B.L2,msgOnIsEmptyName:B.N,onClose:o,setRefFocusLast:n,children:[(0,m.jsx)(b.A,{title:"Create",children:(0,m.jsx)(U,{forActionType:R.fM,onCreate:T.HS})}),(0,m.jsx)(b.A,{title:"Rename",children:(0,m.jsx)(z,{forActionType:R.Wb,onRename:T.pK})}),(0,m.jsx)(b.A,{title:"Delete",children:(0,m.jsx)(st,{forActionType:R.dr,onDelete:T.xG})})]})})})),it=t=>{const{msgOnNotSelect:e,msgOnIsEmptyName:o,onCreate:n,onClose:i}=t,[l,a,r,c]=D(),p=X(t,a,r),[u,d]=H();return(0,m.jsxs)("div",{children:[(0,m.jsx)(Q.RowInputSelect,{caption:"In Group:",options:p,onSelect:d}),(0,m.jsx)(Q.RowInputText,{ref:c,caption:"List:"}),(0,m.jsx)(Q.ValidationMessages,{validationMessages:l}),(0,m.jsx)(Q.RowButtons,{refBtClose:K(t),caption:"Create",title:"Create New List",onPrimary:()=>{const t=(0,s.y5)(c),i=(0,s.ZC)(u);if(i&&t)n({captionGroup:i,captionList:t});else{const s=[];i||s.push(e("In Group")),t||s.push(o("List")),a(s)}},onClear:r,onClose:i})]})},lt=t=>{const{onRename:e,msgOnIsEmptyName:o,msgOnNotSelect:n,getWatchListsByGroup:i,onClose:l}=t,a=(0,s.li)(),[r,c,p,u]=D(),d=X(t,c,p);return(0,m.jsxs)("div",{children:[(0,m.jsx)(Q.SelectGroupList,{ref:a,getWatchListsByGroup:i,groupCaption:"In Group:",groupOptions:d,listCaption:"List From:"}),(0,m.jsx)(Q.RowInputText,{ref:u,caption:"List To:"}),(0,m.jsx)(Q.ValidationMessages,{validationMessages:r}),(0,m.jsx)(Q.RowButtons,{refBtClose:K(t),caption:"Edit",title:"Edit List Name",onPrimary:()=>{const{captionGroup:t,captionList:i}=(0,s.y5)(a)||{},l=(0,s.y5)(u);if(t&&i&&l)e({captionGroup:t,captionListFrom:i,captionListTo:l});else{const e=[];t||e.push(n("Group")),i||e.push(n("List From")),l||e.push(o("List To")),c(e)}},onClear:p,onClose:l})]})},at=t=>{const{getWatchListsByGroup:e,useMsEdit:o,getWatchGroups:n,forActionType:i,onDelete:l,msgOnNotSelect:a,onClose:r}=t,c=(0,s.li)(),[p,u,d]=D(),[h,C]=(0,s.J0)((()=>n()));return o((t=>{t&&(t.messages||(t.forActionType===i&&d(),C(n())))})),(0,m.jsxs)("div",{children:[(0,m.jsx)(Q.SelectGroupList,{ref:c,getWatchListsByGroup:e,groupCaption:"In Group:",groupOptions:h,listCaption:"List:"}),(0,m.jsx)(Q.ValidationMessages,{validationMessages:p}),(0,m.jsx)(Q.RowButtons,{refBtClose:K(t),caption:"Delete",title:"Delete List",onPrimary:()=>{const{captionGroup:t,captionList:e}=(0,s.y5)(c)||{};if(t&&e)l({captionGroup:t,captionList:e});else{const o=[];t||o.push(a("Group")),e||o.push(a("List")),u(o)}},onClear:d,onClose:r})]})},rt={LoadItem:G,EditGroup:nt,EditList:(0,n.A)((t=>{let{isShow:e,onClose:o}=t;const[s,n]=(0,v.Ri)();return(0,m.jsx)(d.A,{refFocusLast:s,caption:"Watch Lists Edit",isShow:e,isWithButton:!1,onClose:o,children:(0,m.jsxs)(I.A,{id:"eld",width:380,useMsEdit:T.w9,getWatchGroups:T.QC,msgOnNotSelect:B.L2,msgOnIsEmptyName:B.N,onClose:o,setRefFocusLast:n,children:[(0,m.jsx)(b.A,{title:"Create",children:(0,m.jsx)(it,{forActionType:R.$H,onCreate:T.CY})}),(0,m.jsx)(b.A,{title:"Rename",children:(0,m.jsx)(lt,{getWatchListsByGroup:T.rF,forActionType:R.Nt,onRename:T.sW})}),(0,m.jsx)(b.A,{title:"Delete",children:(0,m.jsx)(at,{getWatchListsByGroup:T.rF,forActionType:R.yq,onDelete:T.C5})})]})})}))}}}]);