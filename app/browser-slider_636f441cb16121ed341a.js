(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{124:function(e,t,n){"use strict";n.r(t);var r=n(3),o=n.n(r),i=n(0),a=n.n(i),s=n(79),c=n(57),u=n(47),l=n(1),d=n.n(l),p=n(9),f=n.n(p),h=n(97),m=n(12),g={dialogConf:!0,dialogType:"DialogStatN",dialogProps:{chartsType:"t2a",dfProps:{},isProxy:!0}},v=function(e){return function(){var t=e.rootUrl,n=e.id,r=e.proxy,o=e.bT,i=e.lT,a=e.sP,s=e.dU,c=e.noTime,u=e.dS,l=t+"/"+n;fetch(r?""+r+l:l).then((function(e){var t=e.status,n=e.statusText;if(t>=200&&t<400)return e.json();throw Error(n)})).then((function(e){var l=function(e){var t,n=[],r=e.variables,o="Y";return(void 0===r?[]:r).forEach((function(e){var r,i=e.code,a=e.text;e.time&&(t=i),"Tid"!==i?n.push({c:(r=a,void 0===r&&(r=""),r.charAt(0).toUpperCase()+r.substr(1)),v:i}):"month"===a?o="M":"quarter"===a&&(o="K")})),{mapFrequency:o,dims:n,timeId:t}}(e),d=l.mapFrequency,p=l.dims,f=l.timeId,h=e.title,v=void 0===h?"":h,_=v.length>35?v.substr(0,35)+"...":v,y=Object.assign({},g,{type:o+"_"+n,menuTitle:v.substr(0,27),contFullCaption:a+": "+_});Object.assign(y.dialogProps,{baseMeta:t,loadId:i,mapFrequency:d,dims:p,timeId:f,descrUrl:s,dataSource:u,dfProps:{dfId:n},noTime:c,proxy:r}),m.b.showDialog(o+"_"+n,o,y)})).catch((function(e){console.log(e.message)}))}},_=function(e,t){return e.text<t.text?-1:e.text>t.text?1:0},y=function(e,t){return fetch(t?t+e:e,{cache:"default"}).then((function(e){return e.json()})).then((function(e){return Array.isArray(e)&&e.sort(_),e}))},x={MSG_ERR:{paddingLeft:"12px",color:"#f44336",fontFamily:'Roboto, "Arial Unicode MS", Arial, sans-serif',fontWeight:"bold",fontSize:"16px"},TITLE:{position:"relative",color:"silver",paddingLeft:"32px",paddingTop:"8px",paddingBottom:"4px",fontFamily:'Roboto, "Arial Unicode MS", Arial, sans-serif',fontWeight:"bold",fontSize:"16px",cursor:"pointer"},TITLE_ARROW:{position:"absolute",top:"8px",left:"16px"},ITEM_L:{color:"#1b2836",fontFamily:'Roboto, "Arial Unicode MS", Arial, sans-serif',fontWeight:"bold",fontSize:"16px",padding:"8px",paddingLeft:"12px",cursor:"pointer"},ITEM_T:{color:"black",fontFamily:'Roboto, "Arial Unicode MS", Arial, sans-serif',fontWeight:"bold",fontSize:"16px",padding:"8px",cursor:"pointer"}},P="menu-item",b=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(t=e.call.apply(e,[this].concat(r))||this)._refNode=function(e){return t._node=e},t.focus=function(){t._node&&t._node.focus()},t}return o()(t,e),t.prototype.render=function(){var e=this.props,t=e.title,n=void 0===t?"":t,r=e.onClick;return a.a.createElement("div",{ref:this._refNode,className:P,style:x.TITLE,role:"menuitem",tabIndex:"0",onClick:r,onKeyPress:function(e){e.preventDefault();var t=e.which;13!==t&&32!==t||r()}},n,a.a.createElement("span",{style:x.TITLE_ARROW},"<"))},t}(i.Component),S="menu-item",E=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(t=e.call.apply(e,[this].concat(r))||this)._hKeyPress=function(e){e.preventDefault();var n=e.which;13!==n&&32!==n||t.props.onClick()},t._ref=function(e){return t._node=e},t.focus=function(){t._node&&t._node.focus()},t}return o()(t,e),t.prototype.render=function(){var e=this.props,t=e.item,n=e.onClick,r=t.text,o="l"===t.type?x.ITEM_L:x.ITEM_T;return a.a.createElement("div",{ref:this._ref,className:S,style:o,tabIndex:"0",role:"menuitem",onClick:n,onKeyPress:this._hKeyPress},r)},t}(i.Component),T=function(e){var t=e.errMsg;return t?a.a.createElement("div",{style:x.MSG_ERR},t):null},C=function(e){function t(t){var n;return(n=e.call(this)||this).loadMenu=function(e){var t=n.props,r=t.dfProps,o=void 0===r?{}:r,i=t.loadItems,a=t.store,s=o.lT,c=a.getProxy(s);i(o.rootUrl+"/"+e,c).then((function(e){Array.isArray(e)&&n.setState({model:e,errMsg:void 0})})).catch((function(e){n.setState({errMsg:e.message})}))},n._renderMenu=function(){var e=n.props,t=e.dfProps,r=void 0===t?{}:t,o=e.pageNumber,i=e.store,s=r.lT,c=i.getProxy(s),u=n.state.model,l=n.props,p=l.onClickNext,f=l.fOnClickItem,h=l.id,m=u.map((function(e){var t=e.text,n=e.id,i="l"===e.type?p.bind(null,h+"/"+n,t,o):f(d()({id:h+"/"+n},r,{proxy:c}));return a.a.createElement(E,{key:n,item:e,onClick:i})}));return a.a.createElement("div",null,m)},n._refFirst=function(e){return n._firstNode=e},n.focusFirst=function(){n._firstNode&&n._firstNode.focus()},n.state={model:[]},n}o()(t,e);var n=t.prototype;return n.componentDidMount=function(){var e=this.props,t=e.title,n=e.id;t&&this.loadMenu(n)},n.render=function(){var e=this.props,t=e.title,n=e.rootStyle,r=e.pageNumber,o=e.onClickPrev,i=this.state.errMsg;return a.a.createElement("div",{style:n},a.a.createElement(b,{ref:this._refFirst,title:t,onClick:o.bind(null,r)}),this._renderMenu(),a.a.createElement(T,{errMsg:i}))},n.componentDidUpdate=function(e){var t=this.props;t.pageNumber===t.pageCurrent&&setTimeout(this.focusFirst,1e3)},t}(i.Component),w={ROOT:{width:"300px",overflow:"hidden"},PAGES:{width:"1500px",overflowX:"hidden",display:"flex",flexFlow:"row nowrap",alignItems:"flex-start",transition:"all 750ms ease-out"},PAGE:{width:"300px"}},M=function(e){var t=e.style.transform.substr(11).replace("px","").replace(")","");return parseInt(t,10)},N=function(e){function t(t){var n;return(n=e.call(this)||this)._loadItems=function(){var e=n.props,t=e.dfProps,r=void 0===t?{}:t,o=e.store,i=r.lT,a=o.getProxy(i);y(r.rootUrl,a).then((function(e){Array.isArray(e)&&n.setState({model:e,errMsg:void 0})})).catch((function(e){n.setState({errMsg:e.message})}))},n.hPrevPage=function(e){n.setState((function(t){return t.pageCurrent=e-1,n._direction=-1,t}))},n._addPage=function(e,t,r){var o=n.props,i=o.dfProps,s=o.store;e.push(a.a.createElement(C,{key:t,id:t,rootStyle:w.PAGE,store:s,title:r,dfProps:i,onClickPrev:n.hPrevPage,onClickNext:n.hNextPage,loadItems:y,fOnClickItem:v}))},n.hNextPage=function(e,t,r){n.setState((function(o){var i=o.pages;return i.length-1+1>r?i[r]&&i[r].key!==e&&(r>0?o.pages.splice(r):o.pages=[],n._addPage(o.pages,e,t)):n._addPage(i,e,t),o.pageCurrent=r+1,n._direction=1,o}))},n._refFirst=function(e){return n._firstNode=e},n._renderMenu=function(){var e=n.state,t=e.model,r=e.errMsg,o=t.map((function(e,t){var r=e.text,o=e.id,i=0===t?n._refFirst:void 0;return a.a.createElement(E,{ref:i,key:o,item:e,onClick:n.hNextPage.bind(null,o,r,0)})}));return a.a.createElement("div",{style:w.PAGE},o,a.a.createElement(T,{errMsg:r}))},n._renderPages=function(){var e=n.state,t=e.pages,r=e.pageCurrent;return t.map((function(e,t){return a.a.cloneElement(e,{pageCurrent:r,pageNumber:t+1})}))},n._crTransform=function(){var e="0";if(0!==n._direction&&n._menuNode){var t=M(n._menuNode);e=1===n._direction?t-300:t+300,n._direction=0}else 0===n._direction&&n._menuNode&&(e=M(n._menuNode));return{transform:"translateX("+e+"px)"}},n._refMenu=function(e){return n._menuNode=e},n.focusFirst=function(){n._firstNode&&n._firstNode.focus()},n.hNextPage=Object(h.a)(n.hNextPage.bind(f()(n))),n.hPrevPage=Object(h.a)(n.hPrevPage.bind(f()(n))),n._direction=0,n.state={model:[],pageCurrent:0,pages:[]},n}o()(t,e);var n=t.prototype;return n.componentDidMount=function(){this._loadItems()},n.render=function(){var e=this._crTransform(),t=d()({},w.PAGES,{},e);return a.a.createElement("div",{style:w.ROOT},a.a.createElement("div",{ref:this._refMenu,style:t},this._renderMenu(),this._renderPages()))},n.componentDidUpdate=function(){0===this.state.pageCurrent&&setTimeout(this.focusFirst,1e3)},t}(i.Component),I={BROWSER:{paddingRight:"0"},SCROLL_DIV:{height:"92%"}},A=function(e){function t(t){var n;return(n=e.call(this)||this)._onStore=function(e,t){var r=n.props,o=r.browserType;e===r.showAction&&t===o&&n._handleShow()},n._handleHide=function(){n.setState({isShow:!1})},n._handleShow=function(){n.setState({isShow:!0})},n.state={isShow:!!t.isInitShow},n}o()(t,e);var n=t.prototype;return n.componentDidMount=function(){this.unsubscribe=this.props.store.listen(this._onStore)},n.shouldComponentUpdate=function(e,t){return this.state.isShow!==t.isShow},n.componentWillUnmount=function(){this.unsubscribe()},n.render=function(){var e=this.props.caption,t=this.state.isShow;return a.a.createElement(s.a,{isShow:t,style:I.BROWSER},a.a.createElement(c.a,{caption:e,onClose:this._handleHide}),a.a.createElement(u.a,{className:"scroll-container-y",style:I.SCROLL_DIV},a.a.createElement(N,this.props)))},t}(i.Component);t.default=A}}]);