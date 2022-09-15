"use strict";(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[437],{600:(e,t,o)=>{o.r(t),o.d(t,{default:()=>ue});var s=o(9999),n=o(6016),i=o(1926),a=o(1398),r=o(7020),l=o(9468),c=o(7805),u=o(3115),p=o(4485),d=o(5138),m=o(319),x=o(2276),C=o(5893);const h={width:365},g={width:265},j={display:"inline-block",maxWidth:250,height:32,verticalAlign:"middle"},f=e=>"number"==typeof e&&e-e==0,y=l.Z.wideWidth(),w={},S=(0,a.QS)(2),T=(0,a.TP)(),R=(0,n.Z)((e=>{let{isShow:t,data:o=w,onClose:n}=e;const l=(0,s.sO)(),{caption:R,fromDate:Z,initToDate:G,onTestDate:L,itemConf:b}=o,{dataSource:v,x:k,y:N}=b||{},[I,O]=(0,i.Z)(y),[A,B]=(0,i.Z)(f(k)),[D,V]=(0,i.Z)(),W=(0,s.eA)((0,s.sO)([{caption:"L",title:"Click to toggle input labels",onClick:O},{caption:"V",title:"Click to toggle row value",onClick:B},{caption:"D",title:"Click to toggle date input",onClick:V}])),[E,M]=(0,s.eJ)([]),F=[(0,C.jsx)(m.Z.Button.Load,{onClick:()=>{const e=(0,s.eA)(l),{isValid:t,datesMsg:i}=e.getValidation(),a=t?[]:i;if(0===a.length){const{id:t,title:s,subtitle:i,caption:a,columnName:r,dataColumn:l,seriaColumnNames:d,itemConf:m={}}=o,{fromDate:x,toDate:C}=e.getValues(),h={id:t,title:s,subtitle:i,value:a,item:a,fromDate:x,toDate:C,columnName:r,dataColumn:l,seriaColumnNames:d,loadId:m.loadId||u.O8,...m};c.LX[c.SX]({chartType:u.e9,browserType:p.lx},h),n(),M((e=>e.length>0?[]:e))}else M(a)}},"load")];(0,s.d4)((()=>{B(f(k))}),[k,B]);const P=Z||S,$=G||T,H=L||a.RB,_=I?h:g,U=function(e,t){return void 0===e&&(e=""),void 0===t&&(t=""),((0,r.Z)(t)+" "+(0,a.P9)(e)).trim()}(k,N);return(0,C.jsxs)(d.Z,{style:_,isShow:t,caption:"Load Item",commandButtons:F,onClose:()=>{n(),M([])},children:[(0,C.jsx)(m.Z.Toolbar,{isShow:!0,buttons:W}),(0,C.jsx)(m.Z.Row.Text,{isShowLabels:I,styleText:j,caption:"Item:",text:R}),(0,C.jsx)(m.Z.ShowHide,{isShow:A,children:(0,C.jsx)(m.Z.Row.Text,{isShowLabels:I,styleText:j,caption:"Value:",text:U})}),(0,C.jsx)(m.Z.ShowHide,{isShow:D,children:(0,C.jsx)(m.Z.DatesFragment,{ref:l,isShowLabels:I,initFromDate:P,initToDate:$,onTestDate:H})}),(0,C.jsx)(m.Z.Row.Text,{isShowLabels:I,styleText:j,caption:"Source:",text:v}),(0,C.jsx)(x.Z,{validationMessages:E})]})}));var Z=o(3218),G=o(2125),L=o(5854),b=o(3297),v=o(9679),k=o(795),N=o(5313),I=o(7376);const O={...I.UR,lineHeight:2},A={...I.m9,width:120},B={width:250,height:30,paddingLeft:10,marginLeft:0,marginRight:0},D=(0,v.forwardRef)(((e,t)=>{let{caption:o}=e;return(0,C.jsxs)("div",{style:O,children:[(0,C.jsx)("span",{style:A,children:o}),(0,C.jsx)(N.Z,{ref:t,style:B})]})}));var V=o(6614);const W={...I.m9,width:120},E=e=>{let{caption:t,options:o,onSelect:s}=e;return(0,C.jsxs)("div",{style:I.UR,children:[(0,C.jsx)("span",{style:W,children:t}),(0,C.jsx)(V.Z,{width:"250",options:o,onSelect:s})]})};var M=o(5868);const F=()=>{const e=(0,v.useRef)(),t=(0,v.useCallback)((t=>{const{caption:o}=t||{};e.current=o}),[]);return[e,t]},P=(0,v.forwardRef)(((e,t)=>{const[o,s]=(0,M.Z)(e),{store:n,groupCaption:i,groupOptions:a,listCaption:r}=e,l=(0,v.useRef)(),[c,u]=F(),[p,d]=(0,v.useState)([]),m=(0,v.useCallback)((e=>{const{caption:t}=e||{};e&&t?(l.current=t,c.current=null,d(e.lists||[])):l.current=null}),[]);return(0,v.useEffect)((()=>{const t=s();if(t!==e){if(t.groupOptions!==a)l.current=null,c.current=null,d([]);else if(l.current){const e=n.getWatchListsByGroup(l.current);e!==p&&(c.current=null,d(e))}o(e)}}),[e]),(0,v.useImperativeHandle)(t,(()=>({getValue:()=>({captionGroup:l.current,captionList:c.current})}))),(0,C.jsxs)("div",{children:[(0,C.jsx)(E,{caption:i,options:a,onSelect:m}),(0,C.jsx)(E,{caption:r,options:p,onSelect:u})]})}));var $=o(481);const H={...o(390).x,margin:"8px 4px 10px 0"},_=e=>{let{Primary:t,withoutClear:o,onClear:s,onClose:n}=e;return(0,C.jsxs)("div",{style:H,children:[t,!o&&(0,C.jsx)($.Z.Clear,{onClick:s}),(0,C.jsx)($.Z.Close,{onClick:n})]})},U={RowInputText:D,RowInputSelect:E,SelectGroupList:P,Button:$.Z,RowButtons:_,ValidationMessages:x.Z},X=e=>{let{actionCompleted:t,actionFailed:o,forActionType:s,onCreate:n,msgOnIsEmptyName:i,onClose:a}=e;const r=(0,v.useRef)(),[l,c]=(0,v.useState)([]),u=((e,t,o,s)=>(0,C.jsx)(U.Button.Primary,{caption:"Create",title:"Create New Group",onClick:()=>{const n=e.current.getValue();n?o({caption:n}):(e.current.setValue(""),t([s("Group")]))}}))(r,c,n,i),p=()=>{r.current.setValue(""),c([])};return(0,k.Z)(((e,n)=>{e===t&&n.forActionType===s?p():e===o&&n.forActionType===s&&c(n.messages)})),(0,C.jsxs)("div",{children:[(0,C.jsx)(U.RowInputText,{ref:r,caption:"Group:"}),(0,C.jsx)(U.ValidationMessages,{validationMessages:l}),(0,C.jsx)(U.RowButtons,{Primary:u,onClear:p,onClose:a})]})},J=e=>{const t=(0,v.useRef)(),o=(0,v.useCallback)((()=>{const{current:o}=t;o&&(o.setValue(""),e([]))}),[]);return[t,o]},Q=e=>{let{store:t,actionCompleted:o,actionFailed:s,forActionType:n,onRename:i,msgOnNotSelect:a,msgOnIsEmptyName:r,onClose:l}=e;const[c,u]=(0,v.useState)((()=>t.getWatchGroups())),[p,d]=(0,v.useState)([]),[m,x]=J(d),[h,g]=F(),j=(0,v.useCallback)((()=>{const e=m.current.getValue(),t=h.current;if(e&&t)i({captionFrom:t,captionTo:e});else{const o=[];t||o.push(a("Group From")),e||o.push(r("Group To")),d(o)}}),[]),f=(0,v.useMemo)((()=>(0,C.jsx)(U.Button.Primary,{caption:"Edit",title:"Edit Group Name",onClick:j})),[j]);return(0,k.Z)(((e,i)=>{e===o?(i.forActionType===n&&x(),u(t.getWatchGroups())):e===s&&i.forActionType===n&&d(i.messages)})),(0,C.jsxs)("div",{children:[(0,C.jsx)(U.RowInputSelect,{caption:"Group From:",options:c,onSelect:g}),(0,C.jsx)(U.RowInputText,{ref:m,caption:"Group To:"}),(0,C.jsx)(U.ValidationMessages,{validationMessages:p}),(0,C.jsx)(U.RowButtons,{Primary:f,onClear:x,onClose:l})]})},q=e=>({groups:e.getWatchGroups,errs:[]}),z=(e,t)=>({type:e,payload:t}),K=(e,t)=>{let{type:o,payload:s}=t;switch(o){case"a":return{groups:s,errs:[]};case"b":return{...e,errs:s};default:return e}},Y=e=>{let{store:t,actionCompleted:o,forActionType:s,onDelete:n,msgOnNotSelect:i,onClose:a}=e;const r=(0,v.useRef)(null),[l,c,u,p]=((e,t)=>{const[{groups:o,errs:s},n]=(0,v.useReducer)(K,e,q);return[o,s,e=>n(z("a",e)),()=>n(z("b",[t("Group")]))]})(t,i),d=((e,t,o)=>(0,C.jsx)(U.Button.Primary,{caption:"Delete",title:"Delete Group",onClick:()=>{const{current:s}=e;s?(t({caption:s}),e.current=null):o()}}))(r,n,p);return(0,k.Z)(((e,s)=>{e===o&&u(t.getWatchGroups())})),(0,C.jsxs)("div",{children:[(0,C.jsx)(U.RowInputSelect,{caption:"Group:",options:l,onSelect:e=>{r.current=e&&e.caption||null}}),(0,C.jsx)(U.ValidationMessages,{validationMessages:c}),(0,C.jsx)(U.RowButtons,{Primary:d,withoutClear:!0,onClose:a})]})},ee=Z.e4[Z.R2],te=Z.e4[Z.Bv],oe=Z.e4[Z.E2],se=(0,n.Z)((e=>{let{isShow:t,store:o,onClose:s}=e;return(0,C.jsx)(d.Z,{caption:"Watch Groups Edit",isShow:t,isWithButton:!1,onClose:s,children:(0,C.jsxs)(L.Z,{width:380,children:[(0,C.jsx)(b.Z,{title:"Create",children:(0,C.jsx)(X,{store:o,actionCompleted:Z.$0,actionFailed:Z.db,forActionType:Z.R2,msgOnIsEmptyName:G.eT,onCreate:ee,onClose:s})}),(0,C.jsx)(b.Z,{title:"Rename",children:(0,C.jsx)(Q,{store:o,actionCompleted:Z.$0,actionFailed:Z.db,forActionType:Z.Bv,msgOnNotSelect:G.xW,msgOnIsEmptyName:G.eT,onRename:te,onClose:s})}),(0,C.jsx)(b.Z,{title:"Delete",children:(0,C.jsx)(Y,{store:o,actionCompleted:Z.$0,forActionType:Z.E2,msgOnNotSelect:G.xW,onDelete:oe,onClose:s})})]})})})),ne=e=>{let{store:t,onCreate:o,msgOnNotSelect:s,msgOnIsEmptyName:n,actionCompleted:i,actionFailed:a,forActionType:r,onClose:l}=e;const[c,u]=(0,v.useState)((()=>t.getWatchGroups())),[p,d]=(0,v.useState)([]),[m,x]=J(d),[h,g]=F(),j=(0,v.useCallback)((()=>{const e=m.current.getValue(),t=h.current;if(t&&e)o({captionGroup:t,captionList:e});else{const o=[];t||o.push(s("In Group")),e||o.push(n("List")),d(o)}}),[]),f=(0,v.useMemo)((()=>(0,C.jsx)(U.Button.Primary,{caption:"Create",title:"Create New List",onClick:j})),[j]);return(0,k.Z)(((e,o)=>{e===i?(o.forActionType===r&&x(),u(t.getWatchGroups())):e===a&&o.forActionType===r&&d(o.messages)})),(0,C.jsxs)("div",{children:[(0,C.jsx)(U.RowInputSelect,{caption:"In Group:",options:c,onSelect:g}),(0,C.jsx)(U.RowInputText,{ref:m,caption:"List:"}),(0,C.jsx)(U.ValidationMessages,{validationMessages:p}),(0,C.jsx)(U.RowButtons,{Primary:f,onClear:x,onClose:l})]})},ie=e=>{let{store:t,onRename:o,msgOnIsEmptyName:s,msgOnNotSelect:n,actionCompleted:i,actionFailed:a,forActionType:r,onClose:l}=e;const[c,u]=(0,v.useState)((()=>t.getWatchGroups())),[p,d]=(0,v.useState)([]),m=(0,v.useRef)(),[x,h]=J(d),g=(0,v.useCallback)((()=>{const{captionGroup:e,captionList:t}=m.current.getValue(),i=x.current.getValue();if(e&&t&&i)o({captionGroup:e,captionListFrom:t,captionListTo:i});else{const o=[];e||o.push(n("Group")),t||o.push(n("List From")),i||o.push(s("List To")),d(o)}}),[]),j=(0,v.useMemo)((()=>(0,C.jsx)(U.Button.Primary,{caption:"Edit",title:"Edit List Name",onClick:g})),[g]);return(0,k.Z)(((e,o)=>{e===i?(o.forActionType===r&&h(),u(t.getWatchGroups())):e===a&&o.forActionType===r&&d(o.messages)})),(0,C.jsxs)("div",{children:[(0,C.jsx)(U.SelectGroupList,{ref:m,store:t,groupCaption:"In Group:",groupOptions:c,listCaption:"List From:"}),(0,C.jsx)(U.RowInputText,{ref:x,caption:"List To:"}),(0,C.jsx)(U.ValidationMessages,{validationMessages:p}),(0,C.jsx)(U.RowButtons,{Primary:j,onClear:h,onClose:l})]})},ae=e=>{let{store:t,actionCompleted:o,forActionType:s,onDelete:n,msgOnNotSelect:i,onClose:a}=e;const[r,l]=(0,v.useState)((()=>t.getWatchGroups())),[c,u]=(0,v.useState)([]),p=(0,v.useRef)(),d=(0,v.useCallback)((()=>u([])),[]),m=(0,v.useCallback)((()=>{const{captionGroup:e,captionList:t}=p.current.getValue();if(e&&t)n({captionGroup:e,captionList:t});else{const o=[];e||o.push(i("Group")),t||o.push(i("List")),u(o)}}),[]),x=(0,v.useMemo)((()=>(0,C.jsx)(U.Button.Primary,{caption:"Delete",title:"Delete List",onClick:m})),[m]);return(0,k.Z)(((e,n)=>{e===o&&(n.forActionType===s&&d(),l(t.getWatchGroups()))})),(0,C.jsxs)("div",{children:[(0,C.jsx)(U.SelectGroupList,{ref:p,store:t,groupCaption:"In Group:",groupOptions:r,listCaption:"List:"}),(0,C.jsx)(U.ValidationMessages,{validationMessages:c}),(0,C.jsx)(U.RowButtons,{Primary:x,onClear:d,onClose:a})]})},re=Z.e4[Z.Nf],le=Z.e4[Z.gm],ce=Z.e4[Z.of],ue={LoadItem:R,EditGroup:se,EditList:(0,n.Z)((e=>{let{isShow:t,store:o,onClose:s}=e;return(0,C.jsx)(d.Z,{caption:"Watch Lists Edit",isShow:t,isWithButton:!1,onClose:s,children:(0,C.jsxs)(L.Z,{width:380,children:[(0,C.jsx)(b.Z,{title:"Create",children:(0,C.jsx)(ne,{store:o,actionCompleted:Z.$0,actionFailed:Z.db,forActionType:Z.Nf,msgOnNotSelect:G.xW,msgOnIsEmptyName:G.eT,onCreate:re,onClose:s})}),(0,C.jsx)(b.Z,{title:"Rename",children:(0,C.jsx)(ie,{store:o,actionCompleted:Z.$0,actionFailed:Z.db,forActionType:Z.gm,msgOnNotSelect:G.xW,msgOnIsEmptyName:G.eT,onRename:le,onClose:s})}),(0,C.jsx)(b.Z,{title:"Delete",children:(0,C.jsx)(ae,{store:o,actionCompleted:Z.$0,actionFailed:Z.db,forActionType:Z.of,msgOnNotSelect:G.xW,onDelete:ce,onClose:s})})]})})}))}}}]);