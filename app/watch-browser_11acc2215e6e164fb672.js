(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[341],{238:(t,e,r)=>{"use strict";r.r(e),r.d(e,{default:()=>it});var i=r(9679),n=r(3014),o=r(2038),s=r(3218),a=r(4488),d=r(4832),h=r(5893);const p="bt__watch__bar",l={ROOT:{marginBottom:10},BT_LIST:{marginLeft:20}},c=({isShow:t,onClickGroup:e,onClickList:r})=>t?(0,h.jsxs)("div",{style:l.ROOT,children:[(0,h.jsx)(d.Z,{caption:"GROUP",className:p,onClick:e}),(0,h.jsx)(d.Z,{caption:"LIST",className:p,style:l.BT_LIST,onClick:r})]}):null;var D=r(2306),g=r(8636);const u={ITEM_DIV:{position:"relative",paddingRight:40,paddingTop:5,paddingBottom:5},ITEM_SPAN:{display:"inline-block",width:"100%",maxWidth:250,height:28,verticalAlign:"middle",textOverflow:"ellipsis",overflow:"hidden"},SVG_CLOSE:{position:"absolute",top:10,right:0}},_="Not Found",S=({item:t,className:e,isModeEdit:r,option:n,onClick:o,onClose:s,onDragStart:a,onDragEnter:d,onDragOver:p,onDragLeave:l,onDrop:c})=>{const{caption:S=_}=t||{},I=r?(0,h.jsx)(g.Z,{style:u.SVG_CLOSE,onClose:s.bind(null,n)}):null,T=(0,i.useCallback)((()=>o(t)),[t]),L=(0,i.useCallback)((t=>{(0,D.Z)(t)&&T()}),[T]),E=r?{draggable:!0,onDragStart:a.bind(null,n),onDrop:c.bind(null,n),onDragOver:p,onDragEnter:d,onDragLeave:l}:void 0;return(0,h.jsxs)("div",{role:"menuitem",tabIndex:"0",className:e,style:u.ITEM_DIV,onClick:T,...E,onKeyUp:L,children:[(0,h.jsx)("span",{style:u.ITEM_SPAN,children:S}),I]})},I="border-bottom",T="border-left";let L,E,f,v;const y=function(t,e){t.persist(),E=t.currentTarget;const r=t.currentTarget.style;f=r.getPropertyValue(I),L=e},b=function(t){const e=E.style;t.currentTarget.style.removeProperty(T),e.removeProperty("border"),e.setProperty(I,f)},m=function(t,e,r){const i=t.currentTarget.style;v=i.getPropertyValue(T),-1!==L.indexOf(e)?i.setProperty(T,((t="green")=>"4px solid "+t)(r)):i.setProperty(T,"4px solid red")},C=function(t){const e=t.currentTarget.style;e.removeProperty(T),e.setProperty(T,v)},O=t=>{Object.assign(t.prototype,{dragStartWithDnDStyle:y,dropWithDnDStyle:b,dragEnterWithDnDStyle:m,dragLeaveWithDnDStyle:C})},x={setTransferTo:({event:t,dragId:e,xType:r})=>{Object.assign(t.dataTransfer,{effectAllowed:"move",dropEffect:"move"}).setData("text",JSON.stringify({dragId:e,xType:r}))}},G=t=>function({caption:e},r){this.dragStartWithDnDStyle(r,[t.GROUP]),x.setTransferTo({event:r,dragId:e+";",xType:t.GROUP})},R=(t,e)=>function({caption:r},i){this.dropWithDnDStyle(i);const n=JSON.parse(i.dataTransfer.getData("text")),{xType:o,dragId:s}=n,a=r+";";if(o===t.GROUP){if(s===a)return;i.preventDefault(),e.dragDropGroup({dragId:s,dropId:a})}else o===t.LIST&&(i.preventDefault(),e.dragDropList({dragId:s,dropId:a}))},w=t=>function(e){e.preventDefault(),this.dragEnterWithDnDStyle(e,t.GROUP,t.C_GROUP_ENTER)},M=function(t){t.preventDefault()},W=function(t){t.preventDefault(),this.dragLeaveWithDnDStyle(t)},P=function(t,e){Object.assign(this,{_hDragStartGroup:G(t).bind(this),_hDropGroup:R(t,e).bind(this),_hDragEnterGroup:w(t).bind(this),_hDragOverGroup:M,_hDragLeaveGroup:W.bind(this)})},j=t=>{Object.assign(t.prototype,{_bindDnDGroup:P})},k=t=>function({groupCaption:e,caption:r},i){this.dragStartWithDnDStyle(i,[t.GROUP,t.LIST]),x.setTransferTo({event:i,dragId:e+";"+r,xType:t.LIST})},N=(t,e)=>function({groupCaption:r,caption:i},n){this.dropWithDnDStyle(n);const o=JSON.parse(n.dataTransfer.getData("text")),{xType:s,dragId:a}=o,d=r+";"+i+";";if(s===t.LIST){if(a===d)return;n.preventDefault(),e.dragDropList({dragId:a,dropId:d})}else s===t.ITEM&&(n.preventDefault(),e.dragDropItem({dragId:a,dropId:d}))},Z=t=>function(e){e.preventDefault(),this.dragEnterWithDnDStyle(e,t.LIST,t.C_LIST_ENTER)},U=function(t){t.preventDefault()},B=function(t){t.preventDefault(),this.dragLeaveWithDnDStyle(t)},V=function(t,e){Object.assign(this,{_hDragStartList:k(t).bind(this),_hDropList:N(t,e).bind(this),_hDragEnterList:Z(t).bind(this),_hDragOverList:U,_hDragLeaveList:B.bind(this)})},A=t=>{Object.assign(t.prototype,{_bindDnDList:V})},H=t=>function({groupCaption:e,listCaption:r,caption:i},n){this.dragStartWithDnDStyle(n,[t.LIST,t.ITEM]),x.setTransferTo({event:n,dragId:e+";"+r+";"+i,xType:t.ITEM})},J=(t,e)=>function({groupCaption:r,listCaption:i,caption:n},o){this.dropWithDnDStyle(o);const s=JSON.parse(o.dataTransfer.getData("text")),{xType:a,dragId:d}=s,h=r+";"+i+";"+n;if(a===t.ITEM){if(d===h)return;o.preventDefault(),e.dragDropItem({dragId:d,dropId:h})}},F=t=>function(e){e.preventDefault(),this.dragEnterWithDnDStyle(e,t.ITEM,t.C_LIST_ENTER)},K=function(t){t.preventDefault()},q=function(t){t.preventDefault(),this.dragLeaveWithDnDStyle(t)},z=function(t,e){Object.assign(this,{_hDragStartItem:H(t).bind(this),_hDropItem:J(t,e).bind(this),_hDragEnterItem:F(t).bind(this),_hDragOverItem:K,_hDragLeaveItem:q.bind(this)})},Q=t=>{Object.assign(t.prototype,{_bindDnDItem:z})};var X;const Y="scroll-container-y scroll-watch",$="row__type2-topic not-selected",tt="#80c040",et={BROWSER:{paddingRight:0},BT_CIRCLE:{position:"relative",top:3,marginLeft:20},GROUP_DIV:{lineHeight:2},LIST_DIV:{marginLeft:8,paddingLeft:2,borderLeftStyle:"solid",borderLeftWidth:2,borderLeftColor:"inherit",lineHeight:2},ITEM_NOT_SELECTED:{marginRight:10}},rt={GROUP:"GROUP",C_GROUP_ENTER:"#1b75bb",LIST:"LIST",C_LIST_ENTER:tt,ITEM:"ITEM"};const it=(t=>{O(t),j(t),A(t),Q(t)})(X=class extends i.Component{constructor(t){super(t),this._onStore=(t,e)=>{const{browserType:r,showAction:i,updateAction:n}=this.props;t===i&&e===r?this._handlerShow():t===n&&this.setState({watchList:e})},this._handlerHide=()=>{this.setState({isShow:!1})},this._handlerShow=()=>{this.setState({isShow:!0})},this._handlerToggleEditMode=()=>{this.setState({isModeEdit:!this.state.isModeEdit})},this._renderWatchList=t=>{const{isModeEdit:e}=this.state;return t.groups.map(((t,r)=>{const{caption:i,lists:n}=t;return(0,h.jsx)(a.Z.OpenClose2,{style:et.GROUP_DIV,caption:i,isDraggable:e,option:{caption:i},onDragStart:this._hDragStartGroup,onDragEnter:this._hDragEnterGroup,onDragOver:this._hDragOverGroup,onDragLeave:this._hDragLeaveGroup,onDrop:this._hDropGroup,children:n&&this._renderLists(n,i)},r)}))},this._renderLists=(t,e)=>{const{isModeEdit:r}=this.state;return t.map(((t,i)=>{const{caption:n,items:o}=t;return(0,h.jsx)(a.Z.OpenClose2,{style:et.LIST_DIV,notSelectedStyle:et.ITEM_NOT_SELECTED,openColor:tt,caption:n,isDraggable:r,option:{groupCaption:e,caption:n},onDragStart:this._hDragStartList,onDragEnter:this._hDragEnterList,onDragOver:this._hDragOverList,onDragLeave:this._hDragLeaveList,onDrop:this._hDropList,children:o&&this._renderItems(o,e,n)},i)}))},this._renderItems=(t,e,r)=>{const{isModeEdit:i}=this.state;return t.map(((t,n)=>{const{id:o,caption:s}=t;return(0,h.jsx)(S,{className:$,isModeEdit:i,item:t,option:{groupCaption:e,listCaption:r,caption:s},onClick:this._handlerClickItem,onClose:this._handlerRemoveItem,onDragStart:this._hDragStartItem,onDragOver:this._hDragOverItem,onDragEnter:this._hDragEnterItem,onDragLeave:this._hDragLeaveItem,onDrop:this._hDropItem},o)}))},this._bindDnDGroup(rt,s.Z),this._bindDnDList(rt,s.Z),this._bindDnDItem(rt,s.Z),this.state={isShow:!!t.isInitShow,isModeEdit:!1,watchList:t.store.getWatchList()}}componentDidMount(){this.unsubscribe=this.props.store.listen(this._onStore)}componentWillUnmount(){this.unsubscribe()}_handlerSaveWatch(){s.Z.saveWatch()}_handlerEditGroup(){o.Z.showModalDialog(n.pL.EDIT_WATCH_GROUP)}_handlerEditList(){o.Z.showModalDialog(n.pL.EDIT_WATCH_LIST)}_handlerClickItem(t){o.Z.showModalDialog(n.pL.LOAD_ITEM,t)}_handlerRemoveItem(t,e){e.stopPropagation(),s.Z.removeItem(t)}render(){const{caption:t}=this.props,{isShow:e,isModeEdit:r,watchList:i}=this.state,n=r?"V":"E";return(0,h.jsxs)(a.Z.Browser,{isShow:e,style:et.BROWSER,children:[(0,h.jsxs)(a.Z.BrowserCaption,{caption:t,onClose:this._handlerHide,children:[(0,h.jsx)(a.Z.ButtonCircle,{caption:"S",title:"Save to LocalStorage",style:et.BT_CIRCLE,onClick:this._handlerSaveWatch}),(0,h.jsx)(a.Z.ButtonCircle,{caption:n,title:"Toggle Edit Mode: E/V",style:et.BT_CIRCLE,onClick:this._handlerToggleEditMode})]}),(0,h.jsx)(c,{isShow:r,onClickGroup:this._handlerEditGroup,onClickList:this._handlerEditList}),(0,h.jsx)(a.Z.ScrollPane,{className:Y,children:i&&this._renderWatchList(i)})]})}})||X}}]);