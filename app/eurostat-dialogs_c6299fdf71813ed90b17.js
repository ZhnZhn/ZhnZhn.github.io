webpackJsonp([3],{395:function(e,t,o){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=o(430),i=a(n),l=o(431),s=a(l),r=o(432),u=a(r),d=o(433),c=a(d),p={Eurostat:i.default,Eurostat2:s.default,Eurostat3:u.default,StatN:c.default};t.default=p},404:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=o(45),n=function(e){return e&&e.__esModule?e:{default:e}}(a),i=o(8),l={T1:"t1",T2:"t2",T3:"t3",T3A:"t3a",T3A2:"t3a2",T4:"t4"},s={A:"AREA",A_Y:"AREA_YEARLY",M:"MAP",C:"COLUMN",C_C:"COLUMN_CLUSTER",C_2:"COLUMN_BY_2",B:"BAR",B_C:"BAR_CLUSTER",B_2:"BAR_BY_2",TM:"TREE_MAP",TM_C:"TREE_MAP_CLUSTER",TM_2:"TREE_MAP_2",TM_2_C:"TREE_MAP_2_CLUSTER"},r={EMPTY:""},u=function(){return[{caption:"Default: Area",value:s.A},{caption:"Map: All Countries",value:s.M,compType:i.CompItemType.EUROSTAT_MAP},{caption:"Column: All Countries",value:s.C},{caption:"Bar: All Countries",value:s.B}]},d=function(){return[{caption:"Area",value:s.A}]},c=function(){return[{caption:"Default: Area",value:s.A},{caption:"Yearly by Months",value:s.A_Y}]},p=function(e){return[{caption:"Default: Spline",value:s.A},{caption:"Column: By "+e,value:s.C,dim:e},{caption:"Column: By "+e+": Cluster",value:s.C_C,dim:e},{caption:"Bar: By "+e,value:s.B,dim:e},{caption:"Bar: By "+e+": Cluster",value:s.B_C,dim:e}]},f=function(e){return[].concat((0,n.default)(p(e)),[{caption:"TreeMap: By "+e,value:s.TM,dim:e},{caption:"TreeMap: By "+e+": Cluster",value:s.TM_C,dim:e}])},h=function(e){return[].concat((0,n.default)(f(e)),[{caption:"TreeMap: By "+e+": Depth 2",value:s.TM_2,dim:e},{caption:"TreeMap: By "+e+": Depth 2: Cluster",value:s.TM_2_C,dim:e}])},_=function(e,t){return[].concat((0,n.default)(p(e)),[{caption:"Column: By "+t,value:s.C_2,dim:t},{caption:"Bar: By "+t,value:s.B_2,dim:t}])},m=[s.M,s.C,s.C_C,s.C_2,s.B,s.B_C,s.B_2,s.TM,s.TM_C,s.TM_2,s.TM_2_C],S=function(e){var t=e.dims,o=e.oneCaption,a=void 0===o?r.EMPTY:o,n=e.twoCaption,i=void 0===n?r.EMPTY:n;return Array.isArray(t)?t.map(function(e){return e.c||r.EMPTY}):[a,i]},C={crOptions:function(e){var t=e.chartsType,o=S(e);switch(t){case l.T1:return d();case l.T2:return c();case l.T3:return p(o[0]);case l.T3A:return f(o[0]);case l.T3A2:return h(o[0]);case l.T4:return _(o[0],o[1]);default:return u()}},isCategory:function(e){return!!e&&-1!==m.indexOf(e.value)}};t.default=C},430:function(e,t,o){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n,i,l,s,r,u=o(1),d=a(u),c=o(2),p=a(c),f=o(3),h=a(f),_=o(4),m=a(_),S=o(0),C=a(S),w=o(15),v=a(w),g=o(20),M=a(g),T=(n=M.default.withToolbar,i=M.default.withValidationLoad,n(l=i((r=s=function(e){function t(e){(0,d.default)(this,t);var o=(0,h.default)(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return o._handleSelectOne=function(e){o.one=e},o._handleSelectTwo=function(e){o.two=e},o._handleLoad=function(){o._handleWithValidationLoad(o._createValidationMessages(),o._createLoadOption)},o._createValidationMessages=function(){var e=o.props,t=e.oneCaption,a=e.twoCaption,n=[];return o.one||n.push(o.props.msgOnNotSelected(t)),o.two||n.push(o.props.msgOnNotSelected(a)),n.isValid=0===n.length,n},o._createLoadOption=function(){return o.props.loadFn(o.props,{one:o.one,two:o.two})},o._handleClose=function(){o._handleWithValidationClose()},o.one=void 0,o.two=void 0,o.toolbarButtons=o._createType2WithToolbar(e,{noDate:!0}),o._commandButtons=[C.default.createElement(v.default.Button.Load,{onClick:o._handleLoad})],o.state={isShowLabels:!0,validationMessages:[]},o}return(0,m.default)(t,e),(0,p.default)(t,[{key:"shouldComponentUpdate",value:function(e,t){return this.props===e||this.props.isShow!==e.isShow}},{key:"render",value:function(){var e=this.props,t=e.caption,o=e.isShow,a=e.onShow,n=e.onFront,i=e.oneCaption,l=e.oneURI,s=e.oneJsonProp,r=e.twoCaption,u=e.twoURI,d=e.twoJsonProp,c=this.state,p=c.isShowLabels,f=c.validationMessages;return C.default.createElement(v.default.DraggableDialog,{caption:t,isShow:o,commandButtons:this._commandButtons,onShowChart:a,onFront:n,onClose:this._handleClose},C.default.createElement(v.default.ToolbarButtonCircle,{buttons:this.toolbarButtons}),C.default.createElement(v.default.SelectWithLoad,{isShow:o,isShowLabels:p,uri:l,jsonProp:s,caption:i,optionNames:"Items",onSelect:this._handleSelectOne}),C.default.createElement(v.default.SelectWithLoad,{isShow:o,isShowLabels:p,uri:u,jsonProp:d,caption:r,optionNames:"Items",onSelect:this._handleSelectTwo}),C.default.createElement(v.default.ValidationMessages,{validationMessages:f}))}}]),t}(S.Component),s.defaultProps={oneCaption:"Item",oneJsonProp:"items",twoCaption:"Metric",twoJsonProp:"metrics"},l=r))||l)||l);t.default=T},431:function(e,t,o){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n,i,l,s,r,u=o(1),d=a(u),c=o(2),p=a(c),f=o(3),h=a(f),_=o(4),m=a(_),S=o(0),C=a(S),w=o(19),v=a(w),g=o(15),M=a(g),T=o(20),y=a(T),L=o(404),b=a(L),D="Before Select Metric",E="M",O=(n=y.default.withToolbar,i=y.default.withValidationLoad,n(l=i((r=s=function(e){function t(e){(0,d.default)(this,t);var o=(0,h.default)(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return o._isCategory=function(){return b.default.isCategory(o.chartType)},o._updateForDate=function(){o.date=null;var e=o.two?o.props.mapFrequency?o.props.mapFrequency:o.two.mapFrequency?o.two.mapFrequency:E:null,t=o.props.mapDateDf,a=e?v.default.createEurostatSelect(e,t):{dateDefault:D,options:[]};o.setState({isShowDate:!0,dateDefault:a.dateDefault,dateOptions:a.options})},o._handleSelectOne=function(e){o.one=e},o._handleSelectTwo=function(e){o.two=e,o._isCategory()&&o._updateForDate()},o._handleSelectChartType=function(e){o.chartType=e,o._isCategory()?o._updateForDate():o.setState({isShowDate:!1})},o._handleSelectDate=function(e){o.date=e},o._handleLoad=function(){o._handleWithValidationLoad(o._createValidationMessages(),o._createLoadOption)},o._createValidationMessages=function(){var e=o.props,t=e.oneCaption,a=e.twoCaption,n=[];return o._isCategory()||o.one||n.push(o.props.msgOnNotSelected(t)),o.two||n.push(o.props.msgOnNotSelected(a)),n.isValid=0===n.length,n},o._createLoadOption=function(){var e=o.one,t=o.two,a=o.chartType,n=o.date,i=o.compSelect1,l=o.compSelect2,s=o.state.dateDefault;return o.props.loadFn(o.props,{one:e,two:t,chartType:a,date:n,dateDefault:s,selectOptions:[i.getOptions(),l.getOptions()]})},o._handleClose=function(){o._handleWithValidationClose()},o._refSelect1=function(e){o.compSelect1=e},o._refSelect2=function(e){o.compSelect2=e},o.one=void 0,o.two=void 0,o.date=void 0,o.chartType=void 0,o.toolbarButtons=o._createType2WithToolbar(e),o._commandButtons=[C.default.createElement(M.default.Button.Load,{onClick:o._handleLoad})],o._chartOptions=b.default.crOptions(e),o.state={isShowLabels:!0,isShowDate:!1,dateDefault:D,dateOptions:[],validationMessages:[]},o}return(0,m.default)(t,e),(0,p.default)(t,[{key:"shouldComponentUpdate",value:function(e,t){return this.props===e||this.props.isShow!==e.isShow}},{key:"render",value:function(){var e=this.props,t=e.caption,o=e.isShow,a=e.onShow,n=e.onFront,i=e.oneCaption,l=e.oneURI,s=e.oneJsonProp,r=e.twoCaption,u=e.twoURI,d=e.twoJsonProp,c=this.state,p=c.isShowLabels,f=c.isShowDate,h=c.dateDefault,_=c.dateOptions,m=c.validationMessages;return C.default.createElement(M.default.DraggableDialog,{caption:t,isShow:o,commandButtons:this._commandButtons,onShowChart:a,onFront:n,onClose:this._handleClose},C.default.createElement(M.default.ToolbarButtonCircle,{buttons:this.toolbarButtons}),C.default.createElement(M.default.SelectWithLoad,{ref:this._refSelect1,isShow:o,isShowLabels:p,uri:l,jsonProp:s,caption:i,optionNames:"Items",onSelect:this._handleSelectOne}),C.default.createElement(M.default.SelectWithLoad,{ref:this._refSelect2,isShow:o,isShowLabels:p,uri:u,jsonProp:d,caption:r,optionNames:"Metrics",onSelect:this._handleSelectTwo}),C.default.createElement(M.default.RowInputSelect,{isShowLabels:p,caption:"Chart",placeholder:"Default: Area",options:this._chartOptions,onSelect:this._handleSelectChartType}),C.default.createElement(M.default.ShowHide,{isShow:f},C.default.createElement(M.default.RowInputSelect,{isShowLabels:p,caption:"For Date",placeholder:h,options:_,onSelect:this._handleSelectDate})),C.default.createElement(M.default.ValidationMessages,{validationMessages:m}))}}]),t}(S.Component),s.defaultProps={oneCaption:"Item",oneJsonProp:"items",twoCaption:"Metric",twoJsonProp:"metrics"},l=r))||l)||l);t.default=O},432:function(e,t,o){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n,i,l,s=o(1),r=a(s),u=o(2),d=a(u),c=o(3),p=a(c),f=o(4),h=a(f),_=o(0),m=a(_),S=o(15),C=a(S),w=o(20),v=a(w),g=(n=v.default.withToolbar,i=v.default.withValidationLoad,n(l=i(l=function(e){function t(e){(0,r.default)(this,t);var o=(0,p.default)(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return o._handleSelectOne=function(e){o.one=e},o._handleLoad=function(){o._handleWithValidationLoad(o._createValidationMessages(),o._createLoadOption)},o._createValidationMessages=function(){var e=o.props.oneCaption,t=[];o.one||t.push(o.props.msgOnNotSelected(e));var a=o.parentChild.getValidation(),n=a.isValid,i=a.msg;return n||(t=t.concat(i)),t.isValid=0===t.length,t},o._createLoadOption=function(){var e=o.parentChild.getValues(),t=e.parent,a=e.child;return o.props.loadFn(o.props,{one:o.one,group:t,metric:a})},o._handleClose=function(){o._handleWithValidationClose()},o.one=void 0,o.toolbarButtons=o._createType2WithToolbar(e,{noDate:!0}),o._commandButtons=[m.default.createElement(C.default.Button.Load,{onClick:o._handleLoad})],o.state={isShowLabels:!0,validationMessages:[]},o}return(0,h.default)(t,e),(0,d.default)(t,[{key:"shouldComponentUpdate",value:function(e,t){return this.props===e||this.props.isShow!==e.isShow}},{key:"render",value:function(){var e=this,t=this.props,o=t.caption,a=t.isShow,n=t.onShow,i=t.onFront,l=t.oneCaption,s=t.oneURI,r=t.oneJsonProp,u=t.twoCaption,d=t.twoURI,c=t.twoJsonProp,p=t.threeCaption,f=t.msgOnNotSelected,h=this.state,_=h.isShowLabels,S=h.validationMessages;return m.default.createElement(C.default.DraggableDialog,{caption:o,isShow:a,commandButtons:this._commandButtons,onShowChart:n,onFront:i,onClose:this._handleClose},m.default.createElement(C.default.ToolbarButtonCircle,{buttons:this.toolbarButtons}),m.default.createElement(C.default.SelectWithLoad,{isShow:a,isShowLabels:_,uri:s,jsonProp:r,caption:l,optionNames:"Items",onSelect:this._handleSelectOne}),m.default.createElement(C.default.SelectParentChild,{ref:function(t){return e.parentChild=t},isShow:a,isShowLabels:_,uri:d,parentCaption:u,parentOptionNames:"Items",parentJsonProp:c,childCaption:p,msgOnNotSelected:f}),m.default.createElement(C.default.ValidationMessages,{validationMessages:S}))}}]),t}(_.Component))||l)||l);t.default=g},433:function(e,t,o){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n,i,l,s=o(5),r=a(s),u=o(1),d=a(u),c=o(2),p=a(c),f=o(3),h=a(f),_=o(4),m=a(_),S=o(0),C=a(S),w=o(19),v=a(w),g=o(15),M=a(g),T=o(20),y=a(T),L=o(79),b=a(L),D=o(404),E=a(D),O=o(434),B=a(O),P="Before Select Metric",A="M",I="Dims for request haven't been loaded.\nClose, open dialog for trying load again.",F={SPINNER_LOADING:{position:"relative",display:"block",textAlign:"middle",margin:"16px auto 32px",width:"32px",height:"32px"},SPINNER_FAILED:{borderColor:"#f44336",animation:"none"}},N=(n=y.default.withToolbar,i=y.default.withValidationLoad,n(l=i(l=function(e){function t(e){(0,d.default)(this,t);var o=(0,h.default)(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return o._loadDims=function(){var e=o.props,t=e.proxy,a=e.baseMeta,n=e.dims,i=e.dfProps,l=void 0===i?{}:i,s=l.dfId;(0,B.default)({id:s,proxy:t,baseMeta:a,dims:n}).then(function(e){var t=e.configs,a=e.errMsg;t?(o._selectOptions=t.map(function(e){return e.options}),o.setState({isLoading:!1,isLoadFailed:!1,configs:t})):o.setState({isLoading:!1,isLoadFailed:!0,validationMessages:[a]})})},o._isCategory=function(){return E.default.isCategory(o.chartType)},o._updateForDate=function(){o.date=null;var e=o._items[1]?o.props.mapFrequency?o.props.mapFrequency:o.two.mapFrequency?o.two.mapFrequency:A:null,t=o.props.mapDateDf,a=e?v.default.createEurostatSelect(e,t):v.default.createEurostatSelect("Y",t);o.setState({isShowDate:!0,dateDefault:a.dateDefault,dateOptions:a.options})},o._handleLoad=function(){var e=o._crValidationMessages();if(0===e.length){var t=o._items,a=o.chartType,n=o.date,i=o.state.dateDefault,l=o.props.loadFn(o.props,{chartType:a,date:n,dateDefault:i,items:t,selectOptions:o._selectOptions});o.props.onLoad(l)}o.setState({validationMessages:e})},o._crValidationMessages=function(){var e=[],t=o.state,a=t.configs;return t.isLoadFailed?e.push(I):a.forEach(function(t,a){var n=t.caption;o._items[a]||e.push(o.props.msgOnNotSelected(n))}),e},o._handleClose=function(){o._handleWithValidationClose()},o._hSelectChartType=function(e){o.chartType=e,o._isCategory()?o._updateForDate():o.setState({isShowDate:!1})},o._fSelect=function(e){return function(t){this._items[e]=t}},o._hSelectDate=function(e){o.date=e},o._renderSelectInputs=function(){var e=o.state,t=e.isShowLabels;return e.configs.map(function(e,a){var n=e.id,i=e.caption,l=e.options,s={isShowLabels:t,caption:i,options:l};return C.default.createElement(M.default.RowInputSelect,(0,r.default)({key:n},s,{onSelect:o._fSelect(a).bind(o)}))})},o.toolbarButtons=o._createType2WithToolbar(e),o._commandButtons=[C.default.createElement(M.default.Button.Load,{onClick:o._handleLoad})],o._chartOptions=E.default.crOptions(e),o._items=[],o._selectOptions=[],o.state={isShowLabels:!0,isLoading:!0,isLoadFailed:!1,isShowDate:!1,dateDefault:P,dateOptions:[],validationMessages:[]},o}return(0,m.default)(t,e),(0,p.default)(t,[{key:"componentWillReceiveProps",value:function(e){this.props!==e&&!this.props.isShow&&e.isShow&&this.state.isLoadFailed&&(this.setState({isLoading:!0,isLoadFailed:!1}),this._loadDims())}},{key:"shouldComponentUpdate",value:function(e,t){return this.props===e||this.props.isShow!==e.isShow}},{key:"componentDidMount",value:function(){this._loadDims()}},{key:"render",value:function(){var e=this.props,t=e.caption,o=e.isShow,a=e.onShow,n=e.onFront,i=this.state,l=i.isShowLabels,s=i.isLoading,u=i.isLoadFailed,d=i.isShowDate,c=i.dateDefault,p=i.dateOptions,f=i.validationMessages,h=u?(0,r.default)({},F.SPINNER_LOADING,F.SPINNER_FAILED):F.SPINNER_LOADING;return C.default.createElement(M.default.DraggableDialog,{caption:t,isShow:o,commandButtons:this._commandButtons,onShowChart:a,onFront:n,onClose:this._handleClose},C.default.createElement(M.default.ToolbarButtonCircle,{buttons:this.toolbarButtons}),(s||u)&&C.default.createElement(b.default,{style:h}),!s&&!u&&this._renderSelectInputs(),C.default.createElement(M.default.RowInputSelect,{isShowLabels:l,caption:"Chart",placeholder:"Default: Area",options:this._chartOptions,onSelect:this._hSelectChartType}),C.default.createElement(M.default.ShowHide,{isShow:d},C.default.createElement(M.default.RowInputSelect,{isShowLabels:l,caption:"For Date",placeholder:c,options:p,onSelect:this._hSelectDate})),C.default.createElement(M.default.ValidationMessages,{validationMessages:f}))}}]),t}(S.Component))||l)||l);t.default=N},434:function(e,t,o){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=o(10),i=a(n),l=o(5),s=a(l),r=o(43),u=a(r),d={SELECTION_ALL:{selection:{filter:"all",values:["*"]}},TID_DIM:{code:"Tid",selection:{filter:"top",values:["1"]}}},c=function(e,t,o){return e?""+e+t+"/"+o:t+"/"+o},p=function(e){return(0,s.default)({code:e},d.SELECTION_ALL)},f=function(e){var t=e.map(function(e){return p(e.v)});return t.push(d.TID_DIM),{method:"POST",body:JSON.stringify({query:t,response:{format:"json-stat"}})}},h=function(e,t){for(var o=[],a=t.v,n=e.Dimension(a),l=n.length,s=0;s<l;s++)o.push({caption:n.Category(s).label,slice:(0,i.default)({},a,n.id[s])});return o},_=!1,m=void 0,S=void 0,C=function(e){return function(){e===m&&(_=!1)}},w=function(e){m=e,S=setTimeout(C(e),5e3),_=!0},v=function(){_=!1,clearTimeout(S)},g=function(e){var t=e.proxy,o=e.baseMeta,a=e.id,n=e.dims;if(_)return Promise.resolve({errMsg:"Another dims are still loading."});var i=c(t,o,a),l=f(n);return w(i),fetch(i,l).then(function(e){return e.json()}).then(function(e){var t=(0,u.default)(e).Dataset(0),o=n.map(function(e){return{id:e.v,caption:e.c,options:h(t,e)}});return v(),{configs:o}}).catch(function(e){return v(),{errMsg:e.message}})};t.default=g}});