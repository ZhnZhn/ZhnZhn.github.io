(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{123:function(t,e,r){"use strict";r.r(e);var n,a,o,i,d,l=r(9),s=r.n(l),p=r(3),D=r.n(p),h=r(0),u=r.n(h),c=r(2),g=r(12),_=r(31),f=r(79),v=r(56),S=r(100),I=r(46),L=r(75),E={ROOT:{marginBottom:"10px"},BT_LIST:{marginLeft:"20px"}},m=function(t){var e=t.isShow,r=t.onClickGroup,n=t.onClickList;return e?u.a.createElement("div",{style:E.ROOT},u.a.createElement(S.a,{caption:"GROUP",isWithoutDefault:!0,className:"bt__watch__bar",onClick:r}),u.a.createElement(S.a,{caption:"LIST",isWithoutDefault:!0,className:"bt__watch__bar",style:E.BT_LIST,onClick:n})):null},T=r(47),y={ITEM_DIV:{position:"relative",paddingRight:"40px",lineHeight:1.4,paddingTop:"5px",paddingBottom:"5px"},ITEM_SPAN:{display:"inline-block",verticalAlign:"middle",width:"100%",maxWidth:"250px",textOverflow:"ellipsis",overflow:"hidden"},SVG_CLOSE:{position:"absolute",right:0}},b=function(t){var e=t.item,r=t.className,n=t.isModeEdit,a=t.option,o=t.onClick,i=t.onClose,d=t.onDragStart,l=t.onDragEnter,s=t.onDragOver,p=t.onDragLeave,D=t.onDrop,h=e.caption,c=n?u.a.createElement(T.a,{style:y.SVG_CLOSE,onClose:i.bind(null,a)}):null;return u.a.createElement("div",{className:r,style:y.ITEM_DIV,onClick:o.bind(null,e),draggable:n,onDragStart:n?d.bind(null,a):void 0,onDrop:n?D.bind(null,a):void 0,onDragOver:n?s:void 0,onDragEnter:n?l:void 0,onDragLeave:n?p:void 0},u.a.createElement("span",{style:y.ITEM_SPAN},h),c)},O=function(t,e){t.persist(),a=t.currentTarget;var r=t.currentTarget.style;o=r.getPropertyValue("border-bottom"),n=e},C=function(t){var e=a.style;t.currentTarget.style.removeProperty("border-left"),e.removeProperty("border"),e.setProperty("border-bottom",o)},w=function(t,e){var r=t.currentTarget.style;i=r.getPropertyValue("border-left"),-1!==n.indexOf(e)?r.setProperty("border-left","4px solid green"):r.setProperty("border-left","4px solid red")},G=function(t){var e=t.currentTarget.style;e.removeProperty("border-left"),e.setProperty("border-left",i)},M={setTransferTo:function(t){var e=t.event,r=t.dragId,n=t.xType;Object.assign(e.dataTransfer,{effectAllowed:"move",dropEffect:"move"}).setData("text",JSON.stringify({dragId:r,xType:n}))}},W=function(t){return function(e,r){var n=e.caption;this.dragStartWithDnDStyle(r,[t.GROUP]),M.setTransferTo({event:r,dragId:n+";",xType:t.GROUP})}},x=function(t,e){return function(r,n){var a=r.caption;this.dropWithDnDStyle(n);var o=JSON.parse(n.dataTransfer.getData("text")),i=o.xType,d=o.dragId,l=a+";";if(i===t.GROUP){if(d===l)return;n.preventDefault(),e.dragDropGroup({dragId:d,dropId:l})}else i===t.LIST&&(n.preventDefault(),e.dragDropList({dragId:d,dropId:l}))}},R=function(t){return function(e){e.preventDefault(),this.dragEnterWithDnDStyle(e,t.GROUP)}},P=function(t){t.preventDefault()},k=function(t){t.preventDefault(),this.dragLeaveWithDnDStyle(t)},N=function(t){return function(e,r){var n=e.groupCaption,a=e.caption;this.dragStartWithDnDStyle(r,[t.GROUP,t.LIST]),M.setTransferTo({event:r,dragId:n+";"+a,xType:t.LIST})}},U=function(t,e){return function(r,n){var a=r.groupCaption,o=r.caption;this.dropWithDnDStyle(n);var i=JSON.parse(n.dataTransfer.getData("text")),d=i.xType,l=i.dragId,s=a+";"+o+";";if(d===t.LIST){if(l===s)return;n.preventDefault(),e.dragDropList({dragId:l,dropId:s})}else d===t.ITEM&&(n.preventDefault(),e.dragDropItem({dragId:l,dropId:s}))}},V=function(t){return function(e){e.preventDefault(),this.dragEnterWithDnDStyle(e,t.LIST)}},A=function(t){t.preventDefault()},B=function(t){t.preventDefault(),this.dragLeaveWithDnDStyle(t)},H=function(t){return function(e,r){var n=e.groupCaption,a=e.listCaption,o=e.caption;this.dragStartWithDnDStyle(r,[t.LIST,t.ITEM]),M.setTransferTo({event:r,dragId:n+";"+a+";"+o,xType:t.ITEM})}},J=function(t,e){return function(r,n){var a=r.groupCaption,o=r.listCaption,i=r.caption;this.dropWithDnDStyle(n);var d=JSON.parse(n.dataTransfer.getData("text")),l=d.xType,s=d.dragId,p=a+";"+o+";"+i;if(l===t.ITEM){if(s===p)return;n.preventDefault(),e.dragDropItem({dragId:s,dropId:p})}}},j=function(t){return function(e){e.preventDefault(),this.dragEnterWithDnDStyle(e,t.ITEM)}},q=function(t){t.preventDefault()},z=function(t){t.preventDefault(),this.dragLeaveWithDnDStyle(t)},F={withDnDStyle:function(t){Object.assign(t.prototype,{dragStartWithDnDStyle:O,dropWithDnDStyle:C,dragEnterWithDnDStyle:w,dragLeaveWithDnDStyle:G})},withDnDGroup:function(t,e){return function(r){Object.assign(r.prototype,{_handlerDragStartGroup:W(t),_handlerDropGroup:x(t,e),_handlerDragEnterGroup:R(t),_handlerDragOverGroup:P,_handlerDragLeaveGroup:k})}},withDnDList:function(t,e){return function(r){Object.assign(r.prototype,{_handlerDragStartList:N(t),_handlerDropList:U(t,e),_handlerDragEnterList:V(t),_handlerDragOverList:A,_handlerDragLeaveList:B})}},withDnDItem:function(t,e){return function(r){Object.assign(r.prototype,{_handlerDragStartItem:H(t),_handlerDropItem:J(t,e),_handlerDragEnterItem:j(t),_handlerDragOverItem:q,_handlerDragLeaveItem:z})}}},K={SCROLL:"scroll-container-y scroll-watch",WATCH_ITEM:"row__type2-topic not-selected"},Q="#80c040",X={GROUP:"GROUP",LIST:"LIST",ITEM:"ITEM"},Y={BROWSER:{paddingRight:"0px"},BT_CIRCLE:{marginLeft:"20px",position:"relative",top:"-2px"},GROUP_DIV:{lineHeight:2},LIST_DIV:{marginLeft:"8px",paddingLeft:"12px",borderLeft:"1px solid yellow",lineHeight:2},ITEM_NOT_SELECTED:{borderBottom:"1px solid rgba(128, 192, 64, 0.6)",marginRight:"10px"}},Z=(0,F.withDnDStyle)(d=F.withDnDGroup(X,_.b)(d=F.withDnDList(X,_.b)(d=F.withDnDItem(X,_.b)(d=function(t){function e(e){var r;return(r=t.call(this)||this)._onStore=function(t,e){var n=r.props,a=n.browserType,o=n.showAction,i=n.updateAction;t===o&&e===a?r._handlerShow():t===i&&r.setState({watchList:e})},r._handlerHide=function(){r.setState({isShow:!1})},r._handlerShow=function(){r.setState({isShow:!0})},r._handlerToggleEditMode=function(){r.setState({isModeEdit:!r.state.isModeEdit})},r._renderWatchList=function(t){var e=r.state.isModeEdit;return t.groups.map((function(t,n){var a=t.caption,o=t.lists;return u.a.createElement(L.a,{key:n,style:Y.GROUP_DIV,caption:a,isClose:!0,isDraggable:e,option:{caption:a},onDragStart:r._handlerDragStartGroup,onDragEnter:r._handlerDragEnterGroup,onDragOver:r._handlerDragOverGroup,onDragLeave:r._handlerDragLeaveGroup,onDrop:r._handlerDropGroup},o&&r._renderLists(o,a))}))},r._renderLists=function(t,e){var n=r.state.isModeEdit;return t.map((function(t,a){var o=t.caption,i=t.items;return u.a.createElement(L.a,{key:a,fillOpen:Q,style:Y.LIST_DIV,styleNotSelected:Y.ITEM_NOT_SELECTED,caption:o,isClose:!0,isDraggable:n,option:{groupCaption:e,caption:o},onDragStart:r._handlerDragStartList,onDragEnter:r._handlerDragEnterList,onDragOver:r._handlerDragOverList,onDragLeave:r._handlerDragLeaveList,onDrop:r._handlerDropList},i&&r._renderItems(i,e,o))}))},r._renderItems=function(t,e,n){var a=r.state.isModeEdit;return t.map((function(t,o){var i=t.id,d=t.caption;return u.a.createElement(b,{key:i,className:K.WATCH_ITEM,isModeEdit:a,item:t,option:{groupCaption:e,listCaption:n,caption:d},onClick:r._handlerClickItem,onClose:r._handlerRemoveItem,onDragStart:r._handlerDragStartItem,onDragOver:r._handlerDragOverItem,onDragEnter:r._handlerDragEnterItem,onDragLeave:r._handlerDragLeaveItem,onDrop:r._handlerDropItem})}))},r._handlerDragStartGroup=r._handlerDragStartGroup.bind(s()(r)),r._handlerDropGroup=r._handlerDropGroup.bind(s()(r)),r._handlerDragEnterGroup=r._handlerDragEnterGroup.bind(s()(r)),r._handlerDragLeaveGroup=r._handlerDragLeaveGroup.bind(s()(r)),r._handlerDragStartList=r._handlerDragStartList.bind(s()(r)),r._handlerDropList=r._handlerDropList.bind(s()(r)),r._handlerDragEnterList=r._handlerDragEnterList.bind(s()(r)),r._handlerDragLeaveList=r._handlerDragLeaveList.bind(s()(r)),r._handlerDragStartItem=r._handlerDragStartItem.bind(s()(r)),r._handlerDropItem=r._handlerDropItem.bind(s()(r)),r._handlerDragEnterItem=r._handlerDragEnterItem.bind(s()(r)),r._handlerDragLeaveItem=r._handlerDragLeaveItem.bind(s()(r)),r.state={isShow:!!e.isInitShow,isModeEdit:!1,watchList:e.store.getWatchList()},r}D()(e,t);var r=e.prototype;return r.componentDidMount=function(){this.unsubscribe=this.props.store.listen(this._onStore)},r.componentWillUnmount=function(){this.unsubscribe()},r._handlerSaveWatch=function(){_.b.saveWatch()},r._handlerEditGroup=function(){g.b.showModalDialog(c.f.EDIT_WATCH_GROUP)},r._handlerEditList=function(){g.b.showModalDialog(c.f.EDIT_WATCH_LIST)},r._handlerClickItem=function(t){g.b.showModalDialog(c.f.LOAD_ITEM,t)},r._handlerRemoveItem=function(t,e){e.stopPropagation(),_.b.removeItem(t)},r.render=function(){var t=this.props.caption,e=this.state,r=e.isShow,n=e.isModeEdit,a=e.watchList,o=n?"V":"E";return u.a.createElement(f.a,{isShow:r,style:Y.BROWSER},u.a.createElement(v.a,{caption:t,onClose:this._handlerHide},u.a.createElement(S.a,{caption:"S",title:"Save to LocalStorage",style:Y.BT_CIRCLE,onClick:this._handlerSaveWatch}),u.a.createElement(S.a,{caption:o,title:"Toggle Edit Mode: E/V",style:Y.BT_CIRCLE,onClick:this._handlerToggleEditMode})),u.a.createElement(m,{isShow:n,onClickGroup:this._handlerEditGroup,onClickList:this._handlerEditList}),u.a.createElement(I.a,{className:K.SCROLL},a&&this._renderWatchList(a)))},e}(h.Component))||d)||d)||d)||d;e.default=Z}}]);