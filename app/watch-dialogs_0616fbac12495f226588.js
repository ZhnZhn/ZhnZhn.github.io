(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[437],{7147:(t,e,o)=>{"use strict";o.r(e),o.d(e,{default:()=>ft});var s,n,i,a=o(9679),r=o(1398),l=o(7020),c=o(896),u=o(3014),p=o(6485),d=o(5138),m=o(2812),h=o(2276),C=o(837),T=o(5893);const{getFromDate:g,getToDate:x,isYmd:j,mlsToDmy:S}=r.Z,f={DIALOG:{width:365},DIALOG_SHORT:{width:265},ITEM_TEXT:{display:"inline-block",maxWidth:250,height:32,verticalAlign:"middle",textOverflow:"ellipsis",overflow:"hidden"}};const w=(0,C.Z.dialog)((i=n=class extends a.Component{constructor(t){super(t),this._handleLoad=()=>{const t=this._createValidationMessages();if(t.isValid){const{data:t,onClose:e}=this.props,{id:o,title:s,subtitle:n,caption:i,columnName:a,dataColumn:r,seriaColumnNames:l,itemConf:d={}}=t,{fromDate:m,toDate:h}=this.datesFragment.getValues(),C={id:o,title:s,subtitle:n,value:i,item:i,fromDate:m,toDate:h,columnName:a,dataColumn:r,seriaColumnNames:l,loadId:d.loadId||u.L2.WL,...d};c.Z.loadStock({chartType:p.Z.WATCH_LIST,browserType:u.Aq.WATCH_LIST},C),e()}this._updateValidationMessages(t)},this._createValidationMessages=()=>{let t=[];const{isValid:e,datesMsg:o}=this.datesFragment.getValidation();return e||(t=t.concat(o)),t.isValid=0===t.length,t},this._handleClose=()=>{this._handleWithValidationClose(this._createValidationMessages),this.props.onClose()},this._refDates=t=>this.datesFragment=t;const{fromDate:e,initToDate:o,onTestDate:s,itemConf:n={}}=t.data,i=!!n.x;this.toolbarButtons=this._createType2WithToolbar(t,{isValue:i}),this._commandButtons=[(0,T.jsx)(m.Z.Button.Load,{onClick:this._handleLoad},"load")],this.state={...this._isWithInitialState(),isShowDate:!1,isValue:i,initFromDate:e||g(2),initToDate:o||x(),onTestDate:s||j}}shouldComponentUpdate(t,e){return t===this.props||t.isShow!==this.props.isShow}render(){const{isShow:t,data:e}=this.props,{caption:o,itemConf:s={}}=e,{dataSource:n,x:i,y:a}=s,{isShowLabels:r,isShowDate:c,isValue:u,initFromDate:p,initToDate:C,onTestDate:g,validationMessages:x}=this.state,j=r?f.DIALOG:f.DIALOG_SHORT,w=((t="",e="")=>((0,l.Z)(e)+" "+S(t)).trim())(i,a);return(0,T.jsxs)(d.Z,{style:j,isShow:t,caption:"Load Item",commandButtons:this._commandButtons,onClose:this._handleClose,children:[(0,T.jsx)(m.Z.Toolbar,{isShow:!0,buttons:this.toolbarButtons}),(0,T.jsx)(m.Z.Row.Text,{isShowLabels:r,styleText:f.ITEM_TEXT,caption:"Item:",text:o}),(0,T.jsx)(m.Z.ShowHide,{isShow:u,children:(0,T.jsx)(m.Z.Row.Text,{isShowLabels:r,styleText:f.ITEM_TEXT,caption:"Value:",text:w})}),(0,T.jsx)(m.Z.ShowHide,{isShow:c,children:(0,T.jsx)(m.Z.DatesFragment,{ref:this._refDates,isShowLabels:r,initFromDate:p,initToDate:C,onTestDate:g})}),(0,T.jsx)(m.Z.Row.Text,{isShowLabels:r,styleText:f.ITEM_TEXT,caption:"Source:",text:n}),(0,T.jsx)(h.Z,{validationMessages:x})]})}},n.defaultProps={data:{}},s=i))||s;var y=o(3218),I=o(2125),L=o(8580),D=o(2302),E=o(795),G=o(5313),R=o(7376);const A={ROW:{...R.Z.ROW,lineHeight:2},CAPTION:{...R.Z.CAPTION,width:120},INPUT_TEXT:{width:250,height:30,paddingLeft:10,marginLeft:0,marginRight:0}},O=(0,a.forwardRef)((({caption:t},e)=>(0,T.jsxs)("div",{style:A.ROW,children:[(0,T.jsx)("span",{style:A.CAPTION,children:t}),(0,T.jsx)(G.Z,{ref:e,style:A.INPUT_TEXT})]})));var Z=o(6614);const _={CAPTION:{...R.Z.CAPTION,width:120}},N=({caption:t,options:e,onSelect:o})=>(0,T.jsxs)("div",{style:R.Z.ROW,children:[(0,T.jsx)("span",{style:_.CAPTION,children:t}),(0,T.jsx)(Z.Z,{width:"250",options:e,onSelect:o})]});var M=o(5868);const V=()=>{const t=(0,a.useRef)(),e=(0,a.useCallback)((e=>{const{caption:o}=e||{};t.current=o}),[]);return[t,e]},W=(0,a.forwardRef)(((t,e)=>{const[o,s]=(0,M.Z)(t),{store:n,groupCaption:i,groupOptions:r,listCaption:l}=t,c=(0,a.useRef)(),[u,p]=V(),[d,m]=(0,a.useState)([]),h=(0,a.useCallback)((t=>{const{caption:e}=t||{};t&&e?(c.current=e,u.current=null,m(t.lists||[])):c.current=null}),[]);return(0,a.useEffect)((()=>{const e=s();if(e!==t){if(e.groupOptions!==r)c.current=null,u.current=null,m([]);else if(c.current){const t=n.getWatchListsByGroup(c.current);t!==d&&(u.current=null,m(t))}o(t)}}),[t]),(0,a.useImperativeHandle)(e,(()=>({getValue:()=>({captionGroup:c.current,captionList:u.current})}))),(0,T.jsxs)("div",{children:[(0,T.jsx)(N,{caption:i,options:r,onSelect:h}),(0,T.jsx)(N,{caption:l,options:d,onSelect:p})]})}));var b=o(481);const v={COMMAND_DIV:{cursor:"default",float:"right",marginTop:"8px",marginBottom:"10px",marginRight:"4px"}},P=({Primary:t,withoutClear:e,onClear:o,onClose:s})=>(0,T.jsxs)("div",{style:v.COMMAND_DIV,children:[t,!e&&(0,T.jsx)(b.Z.Clear,{onClick:o}),(0,T.jsx)(b.Z.Close,{onClick:s})]}),F={RowInputText:O,RowInputSelect:N,SelectGroupList:W,Button:b.Z,RowButtons:P,ValidationMessages:h.Z},B=({store:t,actionCompleted:e,actionFailed:o,forActionType:s,onCreate:n,msgOnIsEmptyName:i,onClose:r})=>{const l=(0,a.useRef)(),[c,u]=(0,a.useState)([]),p=((t,e,o,s)=>(0,T.jsx)(F.Button.Primary,{caption:"Create",title:"Create New Group",onClick:()=>{const n=t.current.getValue();n?o({caption:n}):(t.current.setValue(""),e([s("Group")]))}}))(l,u,n,i),d=()=>{l.current.setValue(""),u([])};return(0,E.Z)(t,((t,n)=>{t===e&&n.forActionType===s?d():t===o&&n.forActionType===s&&u(n.messages)})),(0,T.jsxs)("div",{children:[(0,T.jsx)(F.RowInputText,{ref:l,caption:"Group:"}),(0,T.jsx)(F.ValidationMessages,{validationMessages:c}),(0,T.jsx)(F.RowButtons,{Primary:p,onClear:d,onClose:r})]})},k=t=>{const e=(0,a.useRef)(),o=(0,a.useCallback)((()=>{const{current:o}=e;o&&(o.setValue(""),t([]))}),[]);return[e,o]},H=({store:t,actionCompleted:e,actionFailed:o,forActionType:s,onRename:n,msgOnNotSelect:i,msgOnIsEmptyName:r,onClose:l})=>{const[c,u]=(0,a.useState)((()=>t.getWatchGroups())),[p,d]=(0,a.useState)([]),[m,h]=k(d),[C,g]=V(),x=(0,a.useCallback)((()=>{const t=m.current.getValue(),e=C.current;if(t&&e)n({captionFrom:e,captionTo:t});else{const o=[];e||o.push(i("Group From")),t||o.push(r("Group To")),d(o)}}),[]),j=(0,a.useMemo)((()=>(0,T.jsx)(F.Button.Primary,{caption:"Edit",title:"Edit Group Name",onClick:x})),[x]);return(0,E.Z)(t,((n,i)=>{n===e?(i.forActionType===s&&h(),u(t.getWatchGroups())):n===o&&i.forActionType===s&&d(i.messages)})),(0,T.jsxs)("div",{children:[(0,T.jsx)(F.RowInputSelect,{caption:"Group From:",options:c,onSelect:g}),(0,T.jsx)(F.RowInputText,{ref:m,caption:"Group To:"}),(0,T.jsx)(F.ValidationMessages,{validationMessages:p}),(0,T.jsx)(F.RowButtons,{Primary:j,onClear:h,onClose:l})]})},U=t=>({groups:t.getWatchGroups,errs:[]}),X=(t,e)=>({type:t,payload:e}),J=(t,{type:e,payload:o})=>{switch(e){case"a":return{groups:o,errs:[]};case"b":return{...t,errs:o};default:return t}},q=({store:t,actionCompleted:e,forActionType:o,onDelete:s,msgOnNotSelect:n,onClose:i})=>{const r=(0,a.useRef)(null),[l,c,u,p]=((t,e)=>{const[{groups:o,errs:s},n]=(0,a.useReducer)(J,t,U);return[o,s,t=>n(X("a",t)),()=>n(X("b",[e("Group")]))]})(t,n),d=((t,e,o)=>(0,T.jsx)(F.Button.Primary,{caption:"Delete",title:"Delete Group",onClick:()=>{const{current:s}=t;s?(e({caption:s}),t.current=null):o()}}))(r,s,p);return(0,E.Z)(t,((o,s)=>{o===e&&u(t.getWatchGroups())})),(0,T.jsxs)("div",{children:[(0,T.jsx)(F.RowInputSelect,{caption:"Group:",options:l,onSelect:t=>{r.current=t&&t.caption||null}}),(0,T.jsx)(F.ValidationMessages,{validationMessages:c}),(0,T.jsx)(F.RowButtons,{Primary:d,withoutClear:!0,onClose:i})]})},{addGroup:Y,renameGroup:z,deleteGroup:K}=y.Z,{EDIT_WATCH_COMPLETED:Q,EDIT_WATCH_FAILED:$,ADD_GROUP:tt,RENAME_GROUP:et,DELETE_GROUP:ot}=y.J,{notSelected:st,emptyName:nt}=I.Z,it=(t,e)=>t.isShow===e.isShow,at=(0,a.memo)((({isShow:t,store:e,onClose:o})=>(0,T.jsx)(d.Z,{caption:"Watch Groups Edit",isShow:t,isWithButton:!1,onClose:o,children:(0,T.jsxs)(L.Z,{width:380,children:[(0,T.jsx)(D.Z,{title:"Create",children:(0,T.jsx)(B,{store:e,actionCompleted:Q,actionFailed:$,forActionType:tt,msgOnIsEmptyName:nt,onCreate:Y,onClose:o})}),(0,T.jsx)(D.Z,{title:"Rename",children:(0,T.jsx)(H,{store:e,actionCompleted:Q,actionFailed:$,forActionType:et,msgOnNotSelect:st,msgOnIsEmptyName:nt,onRename:z,onClose:o})}),(0,T.jsx)(D.Z,{title:"Delete",children:(0,T.jsx)(q,{store:e,actionCompleted:Q,forActionType:ot,msgOnNotSelect:st,onDelete:K,onClose:o})})]})})),it),rt=({store:t,onCreate:e,msgOnNotSelect:o,msgOnIsEmptyName:s,actionCompleted:n,actionFailed:i,forActionType:r,onClose:l})=>{const[c,u]=(0,a.useState)((()=>t.getWatchGroups())),[p,d]=(0,a.useState)([]),[m,h]=k(d),[C,g]=V(),x=(0,a.useCallback)((()=>{const t=m.current.getValue(),n=C.current;if(n&&t)e({captionGroup:n,captionList:t});else{const e=[];n||e.push(o("In Group")),t||e.push(s("List")),d(e)}}),[]),j=(0,a.useMemo)((()=>(0,T.jsx)(F.Button.Primary,{caption:"Create",title:"Create New List",onClick:x})),[x]);return(0,E.Z)(t,((e,o)=>{e===n?(o.forActionType===r&&h(),u(t.getWatchGroups())):e===i&&o.forActionType===r&&d(o.messages)})),(0,T.jsxs)("div",{children:[(0,T.jsx)(F.RowInputSelect,{caption:"In Group:",options:c,onSelect:g}),(0,T.jsx)(F.RowInputText,{ref:m,caption:"List:"}),(0,T.jsx)(F.ValidationMessages,{validationMessages:p}),(0,T.jsx)(F.RowButtons,{Primary:j,onClear:h,onClose:l})]})},lt=({store:t,onRename:e,msgOnIsEmptyName:o,msgOnNotSelect:s,actionCompleted:n,actionFailed:i,forActionType:r,onClose:l})=>{const[c,u]=(0,a.useState)((()=>t.getWatchGroups())),[p,d]=(0,a.useState)([]),m=(0,a.useRef)(),[h,C]=k(d),g=(0,a.useCallback)((()=>{const{captionGroup:t,captionList:n}=m.current.getValue(),i=h.current.getValue();if(t&&n&&i)e({captionGroup:t,captionListFrom:n,captionListTo:i});else{const e=[];t||e.push(s("Group")),n||e.push(s("List From")),i||e.push(o("List To")),d(e)}}),[]),x=(0,a.useMemo)((()=>(0,T.jsx)(F.Button.Primary,{caption:"Edit",title:"Edit List Name",onClick:g})),[g]);return(0,E.Z)(t,((e,o)=>{e===n?(o.forActionType===r&&C(),u(t.getWatchGroups())):e===i&&o.forActionType===r&&d(o.messages)})),(0,T.jsxs)("div",{children:[(0,T.jsx)(F.SelectGroupList,{ref:m,store:t,groupCaption:"In Group:",groupOptions:c,listCaption:"List From:"}),(0,T.jsx)(F.RowInputText,{ref:h,caption:"List To:"}),(0,T.jsx)(F.ValidationMessages,{validationMessages:p}),(0,T.jsx)(F.RowButtons,{Primary:x,onClear:C,onClose:l})]})},ct=({store:t,actionCompleted:e,forActionType:o,onDelete:s,msgOnNotSelect:n,onClose:i})=>{const[r,l]=(0,a.useState)((()=>t.getWatchGroups())),[c,u]=(0,a.useState)([]),p=(0,a.useRef)(),d=(0,a.useCallback)((()=>u([])),[]),m=(0,a.useCallback)((()=>{const{captionGroup:t,captionList:e}=p.current.getValue();if(t&&e)s({captionGroup:t,captionList:e});else{const o=[];t||o.push(n("Group")),e||o.push(n("List")),u(o)}}),[]),h=(0,a.useMemo)((()=>(0,T.jsx)(F.Button.Primary,{caption:"Delete",title:"Delete List",onClick:m})),[m]);return(0,E.Z)(t,((s,n)=>{s===e&&(n.forActionType===o&&d(),l(t.getWatchGroups()))})),(0,T.jsxs)("div",{children:[(0,T.jsx)(F.SelectGroupList,{ref:p,store:t,groupCaption:"In Group:",groupOptions:r,listCaption:"List:"}),(0,T.jsx)(F.ValidationMessages,{validationMessages:c}),(0,T.jsx)(F.RowButtons,{Primary:h,onClear:d,onClose:i})]})},{createList:ut,renameList:pt,deleteList:dt}=y.Z,{EDIT_WATCH_COMPLETED:mt,EDIT_WATCH_FAILED:ht,CREATE_LIST:Ct,RENAME_LIST:Tt,DELETE_LIST:gt}=y.J,{notSelected:xt,emptyName:jt}=I.Z,St=(t,e)=>t.isShow===e.isShow,ft={LoadItem:w,EditGroup:at,EditList:(0,a.memo)((({isShow:t,store:e,onClose:o})=>(0,T.jsx)(d.Z,{caption:"Watch Lists Edit",isShow:t,isWithButton:!1,onClose:o,children:(0,T.jsxs)(L.Z,{width:380,children:[(0,T.jsx)(D.Z,{title:"Create",children:(0,T.jsx)(rt,{store:e,actionCompleted:mt,actionFailed:ht,forActionType:Ct,msgOnNotSelect:xt,msgOnIsEmptyName:jt,onCreate:ut,onClose:o})}),(0,T.jsx)(D.Z,{title:"Rename",children:(0,T.jsx)(lt,{store:e,actionCompleted:mt,actionFailed:ht,forActionType:Tt,msgOnNotSelect:xt,msgOnIsEmptyName:jt,onRename:pt,onClose:o})}),(0,T.jsx)(D.Z,{title:"Delete",children:(0,T.jsx)(ct,{store:e,actionCompleted:mt,actionFailed:ht,forActionType:gt,msgOnNotSelect:xt,onDelete:dt,onClose:o})})]})})),St)}}}]);