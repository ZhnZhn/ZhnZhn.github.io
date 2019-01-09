webpackJsonp([2],{507:function(e,t,o){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=o(559),i=a(n),l=o(560),r=a(l),s=o(561),u=a(s),d=o(562),c=a(d),p=o(563),h=a(p),f=o(564),_=a(f),S={Eurostat:i.default,Eurostat2:r.default,Eurostat3:u.default,Eurostat3A:c.default,SelectN:h.default,StatN:_.default};t.default=S},517:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={DF_PLACEHOLDER:"Before Select Metric",YEAR_MAX:12,BI_YEAR_MAX:24,Q_YEAR_MAX:4,M_YEAR_MAX:3},n=function(e,t){return(e[t]||{}).value},i=function(e,t){var o=(new Date).getUTCMonth(),a=void 0,n=void 0,i=void 0;for(i=0;i<12;i++)o-=1,o>-1?(a=o+1>9?o+1:"0"+(o+1),n=t+"M"+a):(o=11,t-=1,n=t+"M12"),e.push({caption:n,value:n})},l=function(e,t,o){var a=(new Date).getUTCMonth(),n=Math.floor((a+1)/3),i=4===n?3:n,l=void 0;for(l=0;l<4;l++)i<1&&(t-=1,i=4),e.push({caption:""+t+o+i,value:""+t+o+i}),i-=1},r=function(e,t){return{dateOptions:e,dateDefault:n(e,t)}},s=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:2,t=[],o=(new Date).getUTCFullYear(),n=0;n<a.M_YEAR_MAX;n++)i(t,o-n);return r(t,e)},u=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Q",o=[],n=(new Date).getUTCFullYear(),i=0;i<a.Q_YEAR_MAX;i++)l(o,n-i,t);return r(o,e)},d=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3,t=[],o=(new Date).getUTCFullYear(),n=0;n<a.BI_YEAR_MAX;n++)t.push({caption:o+"S2",value:o+"S2"},{caption:o+"S1",value:o+"S1"}),o-=1;return r(t,e)},c=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=[],o=(new Date).getUTCFullYear(),n=0;n<a.YEAR_MAX;n++)t.push({caption:""+o,value:""+o}),o-=1;return r(t,e)},p=function(){return{dateDefault:a.DF_PLACEHOLDER,dateOptions:[]}},h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"M",t=arguments[1];switch(e){case"M":return s(t);case"Q":case"K":return u(t,e);case"S":return d();case"Y":return c(t);case"EMPTY":return p();default:return c(t)}};t.default=h},518:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=o(27),n=function(e){return e&&e.__esModule?e:{default:e}}(a),i=o(6),l={T1:"t1",T2:"t2",T3:"t3",T3B:"t3b",T3A:"t3a",T3A2:"t3a2",T4:"t4",DF3:"df3"},r={A:"AREA",A_Y:"AREA_YEARLY",S:"SPLINE",S_C:"COLUMN",M:"MAP",C:"COLUMN_SET",C_C:"COLUMN_CLUSTER",C_2:"COLUMN_BY_2",B:"BAR_SET",B_C:"BAR_CLUSTER",B_2:"BAR_BY_2",TM:"TREE_MAP",TM_C:"TREE_MAP_CLUSTER",TM_2:"TREE_MAP_2",TM_2_C:"TREE_MAP_2_CLUSTER"},s={EMPTY:""},u=function(){return[{caption:"Default: Spline",value:r.S},{caption:"Area",value:r.A},{caption:"Column",value:r.S_C},{caption:"Bar: All Countries",value:r.B},{caption:"Column: All Countries",value:r.C},{caption:"Map: All Countries",value:r.M,compType:i.CompItemType.EUROSTAT_MAP}]},d=function(){return[{caption:"Default: Spline",value:r.S},{caption:"Column",value:r.S_C},{caption:"Bar: All Countries",value:r.B},{caption:"Column: All Countries",value:r.C}]},c=function(){return[{caption:"Default: Spline",value:r.S}]},p=function(){return[{caption:"Default: Spline",value:r.S},{caption:"Column",value:r.S_C},{caption:"Yearly by Months",value:r.A_Y}]},h=function(e){return[{caption:"Column: By "+e,value:r.C,dim:e},{caption:"Column: By "+e+": Cluster",value:r.C_C,dim:e},{caption:"Bar: By "+e,value:r.B,dim:e},{caption:"Bar: By "+e+": Cluster",value:r.B_C,dim:e}]},f=function(e){return[{caption:"Default: Spline",value:r.A}].concat((0,n.default)(h(e)))},_=function(e){return[{caption:"Default: Spline",value:r.A},{caption:"Yearly by Months",value:r.A_Y}].concat((0,n.default)(h(e)))},S=function(e){return[].concat((0,n.default)(f(e)),[{caption:"TreeMap: By "+e,value:r.TM,dim:e},{caption:"TreeMap: By "+e+": Cluster",value:r.TM_C,dim:e}])},m=function(e){return[].concat((0,n.default)(S(e)),[{caption:"TreeMap: By "+e+": Depth 2",value:r.TM_2,dim:e},{caption:"TreeMap: By "+e+": Depth 2: Cluster",value:r.TM_2_C,dim:e}])},C=function(e,t){return[].concat((0,n.default)(f(e)),[{caption:"Column: By "+t,value:r.C_2,dim:t},{caption:"Bar: By "+t,value:r.B_2,dim:t}])},g=[r.M,r.C,r.C_C,r.C_2,r.B,r.B_C,r.B_2,r.TM,r.TM_C,r.TM_2,r.TM_2_C],w=function(e){var t=e.dims,o=e.oneCaption,a=void 0===o?s.EMPTY:o,n=e.twoCaption,i=void 0===n?s.EMPTY:n;return Array.isArray(t)?t.map(function(e){return e.c||s.EMPTY}):[a,i]},v={crOptions:function(e){var t=e.chartsType,o=w(e);switch(t){case l.T1:return c();case l.T2:return p();case l.T3:return f(o[0]);case l.T3B:return _(o[0]);case l.T3A:return S(o[0]);case l.T3A2:return m(o[0]);case l.T4:return C(o[0],o[1]);case l.DF3:return d();default:return u()}},isCategory:function(e){return!!e&&-1!==g.indexOf(e.value)}};t.default=v},519:function(e,t,o){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=o(1),i=a(n),l=o(0),r=a(l),s=o(44),u=a(s),d=o(64),c=a(d),p={ROOT:{left:8,zIndex:100,padding:12},ROW_CB:{paddingLeft:0}},h=function(e){var t=e.isShow,o=e.style,a=e.className,n=void 0===a?"popup-menu":a,l=e.toggleOption,s=e.onClose,d=l.bind(null,"isNotZoomToMinMax"),h=l.bind(null,"isFilterZero");return r.default.createElement(u.default,{isShow:t,style:(0,i.default)({},p.ROOT,o),className:n,onClose:s},r.default.createElement("div",null,r.default.createElement(c.default,{initValue:!1,rootStyle:p.ROW_CB,caption:"Not Zoom to Min-Max",onToggle:d}),r.default.createElement(c.default,{initValue:!1,rootStyle:p.ROW_CB,caption:"Filter Zero Values",onToggle:h})))};t.default=h},520:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){if(this.date&&this.date.value)return this.date.value;var e=this.state,t=e.dateOptions,o=e.dateDefault;return Array.isArray(t)&&0!==t.length?o:""},n=function(e){Object.assign(e.prototype,{_getDateWithForDate:a})};t.default=n},559:function(e,t,o){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n,i,l,r,s,u,d=o(2),c=a(d),p=o(3),h=a(p),f=o(4),_=a(f),S=o(5),m=a(S),C=o(0),g=a(C),w=o(29),v=a(w),T=o(37),M=a(T),b=o(38),O=a(b),y=(n=O.default.withToolbar,i=O.default.withValidationLoad,l=O.default.withLoad,n(r=i(r=l((u=s=function(e){function t(e){(0,c.default)(this,t);var o=(0,_.default)(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return o._handleSelectOne=function(e){o.one=e},o._handleSelectTwo=function(e){o.two=e},o._handleLoad=function(){o._handleWithValidationLoad(o._createValidationMessages(),o._createLoadOption)},o._createValidationMessages=function(){var e=o.props,t=e.oneCaption,a=e.twoCaption,n=[];return o.one||n.push(o.props.msgOnNotSelected(t)),o.two||n.push(o.props.msgOnNotSelected(a)),n.isValid=0===n.length,n},o._createLoadOption=function(){return o.props.loadFn(o.props,{one:o.one,two:o.two})},o._handleClose=function(){o._handleWithValidationClose()},o.one=void 0,o.two=void 0,o._menuMore=(0,M.default)(o,{toggleToolBar:o._toggleWithToolbar,onAbout:o._clickInfoWithToolbar}),o.toolbarButtons=o._createType2WithToolbar(e,{noDate:!0}),o._commandButtons=o._crCommandsWithLoad(o),o.state={isToolbar:!0,isShowLabels:!0,validationMessages:[]},o}return(0,m.default)(t,e),(0,h.default)(t,[{key:"shouldComponentUpdate",value:function(e,t){return this.props===e||this.props.isShow!==e.isShow}},{key:"render",value:function(){var e=this.props,t=e.caption,o=e.isShow,a=e.onShow,n=e.onFront,i=e.oneCaption,l=e.oneURI,r=e.oneJsonProp,s=e.twoCaption,u=e.twoURI,d=e.twoJsonProp,c=this.state,p=c.isToolbar,h=c.isShowLabels,f=c.validationMessages;return g.default.createElement(v.default.DraggableDialog,{caption:t,isShow:o,menuModel:this._menuMore,commandButtons:this._commandButtons,onShowChart:a,onFront:n,onClose:this._handleClose},g.default.createElement(v.default.Toolbar,{isShow:p,buttons:this.toolbarButtons}),g.default.createElement(v.default.SelectWithLoad,{isShow:o,isShowLabels:h,uri:l,jsonProp:r,caption:i,optionNames:"Items",onSelect:this._handleSelectOne}),g.default.createElement(v.default.SelectWithLoad,{isShow:o,isShowLabels:h,uri:u,jsonProp:d,caption:s,optionNames:"Items",onSelect:this._handleSelectTwo}),g.default.createElement(v.default.ValidationMessages,{validationMessages:f}))}}]),t}(C.Component),s.defaultProps={oneCaption:"Item",oneJsonProp:"items",twoCaption:"Metric",twoJsonProp:"metrics"},r=u))||r)||r)||r);t.default=y},560:function(e,t,o){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n,i,l,r,s,u,d=o(1),c=a(d),p=o(2),h=a(p),f=o(3),_=a(f),S=o(4),m=a(S),C=o(5),g=a(C),w=o(0),v=a(w),T=o(517),M=a(T),b=o(29),O=a(b),y=o(37),L=a(y),D=o(38),E=a(D),P=o(520),B=a(P),A=o(518),F=a(A),R=o(519),W=a(R),I="M",N=(n=E.default.withToolbar,i=E.default.withValidationLoad,l=E.default.withLoad,n(r=i(r=l(r=(0,B.default)((u=s=function(e){function t(e){(0,h.default)(this,t);var o=(0,m.default)(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return o._isCategory=function(){return F.default.isCategory(o.chartType)},o._updateForDate=function(){o.date=null;var e=o.two?o.props.mapFrequency?o.props.mapFrequency:o.two.mapFrequency?o.two.mapFrequency:I:null,t=o.props.mapDateDf,a=e?(0,M.default)(e,t):(0,M.default)("EMPTY");o.setState((0,c.default)({isShowDate:!0},a))},o._handleSelectOne=function(e){o.one=e},o._handleSelectTwo=function(e){o.two=e,o._isCategory()&&o._updateForDate()},o._handleSelectChartType=function(e){o.chartType=e,o._isCategory()?o._updateForDate():o.setState({isShowDate:!1})},o._onRegColor=function(e){o.colorComp=e},o._handleSelectDate=function(e){o.date=e},o._handleLoad=function(){o._handleWithValidationLoad(o._createValidationMessages(),o._createLoadOption)},o._createValidationMessages=function(){var e=o.props,t=e.oneCaption,a=e.twoCaption,n=[];return o._isCategory()||o.one||n.push(o.props.msgOnNotSelected(t)),o.two||n.push(o.props.msgOnNotSelected(a)),n.isValid=0===n.length,n},o._createLoadOption=function(){var e=o.one,t=o.two,a=o.dialogOptions,n=o.chartType,i=o.colorComp,l=o.compSelect1,r=o.compSelect2,s=i?i.getColor():void 0,u=o._getDateWithForDate();return o.props.loadFn(o.props,{one:e,two:t,dialogOptions:a,chartType:n,seriaColor:s,date:u,selectOptions:[l.getOptions(),r.getOptions()]})},o._handleClose=function(){o._handleWithValidationClose()},o._refSelect1=function(e){o.compSelect1=e},o._refSelect2=function(e){o.compSelect2=e},o.one=void 0,o.two=void 0,o.date=void 0,o.chartType=void 0,o._menuMore=(0,L.default)(o,{toggleToolBar:o._toggleWithToolbar,onAbout:o._clickInfoWithToolbar}),o.toolbarButtons=o._createType2WithToolbar(e,{isOptions:!0}),o._commandButtons=o._crCommandsWithLoad(o),o._chartOptions=F.default.crOptions(e),o.state=(0,c.default)({isToolbar:!0,isOptions:!1,isShowLabels:!0,isShowDate:!1},(0,M.default)("EMPTY"),{validationMessages:[]}),o}return(0,g.default)(t,e),(0,_.default)(t,[{key:"shouldComponentUpdate",value:function(e,t){return this.props===e||this.props.isShow!==e.isShow}},{key:"render",value:function(){var e=this.props,t=e.noDate,o=e.caption,a=e.isShow,n=e.onShow,i=e.onFront,l=e.oneCaption,r=e.oneURI,s=e.oneJsonProp,u=e.twoCaption,d=e.twoURI,c=e.twoJsonProp,p=this.state,h=p.isToolbar,f=p.isOptions,_=p.isShowLabels,S=p.isShowDate,m=p.dateDefault,C=p.dateOptions,g=p.validationMessages;return v.default.createElement(O.default.DraggableDialog,{isShow:a,caption:o,menuModel:this._menuMore,commandButtons:this._commandButtons,onShowChart:n,onFront:i,onClose:this._handleClose},v.default.createElement(O.default.Toolbar,{isShow:h,buttons:this.toolbarButtons}),v.default.createElement(W.default,{isShow:f,toggleOption:this._toggleOptionWithToolbar,onClose:this._hideOptionsWithToolbar}),v.default.createElement(O.default.SelectWithLoad,{ref:this._refSelect1,isShow:a,isShowLabels:_,uri:r,jsonProp:s,caption:l,optionNames:"Items",onSelect:this._handleSelectOne}),v.default.createElement(O.default.SelectWithLoad,{ref:this._refSelect2,isShow:a,isShowLabels:_,uri:d,jsonProp:c,caption:u,optionNames:"Metrics",onSelect:this._handleSelectTwo}),v.default.createElement(O.default.RowChart,{isShowLabels:_,options:this._chartOptions,onSelectChart:this._handleSelectChartType,onRegColor:this._onRegColor}),!t&&v.default.createElement(O.default.ShowHide,{isShow:S},v.default.createElement(O.default.RowInputSelect,{isShowLabels:_,caption:"For Date",placeholder:m,options:C,onSelect:this._handleSelectDate})),v.default.createElement(O.default.ValidationMessages,{validationMessages:g}))}}]),t}(w.Component),s.defaultProps={oneCaption:"Item",oneJsonProp:"items",twoCaption:"Metric",twoJsonProp:"metrics"},r=u))||r)||r)||r)||r);t.default=N},561:function(e,t,o){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n,i,l,r,s=o(2),u=a(s),d=o(3),c=a(d),p=o(4),h=a(p),f=o(5),_=a(f),S=o(0),m=a(S),C=o(29),g=a(C),w=o(37),v=a(w),T=o(38),M=a(T),b=o(519),O=a(b),y=(n=M.default.withToolbar,i=M.default.withValidationLoad,l=M.default.withLoad,n(r=i(r=l(r=function(e){function t(e){(0,u.default)(this,t);var o=(0,h.default)(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return o._handleSelectOne=function(e){o.one=e},o._handleLoad=function(){o._handleWithValidationLoad(o._createValidationMessages(),o._createLoadOption)},o._createValidationMessages=function(){var e=o.props.oneCaption,t=[];o.one||t.push(o.props.msgOnNotSelected(e));var a=o.parentChild.getValidation(),n=a.isValid,i=a.msg;return n||(t=t.concat(i)),t.isValid=0===t.length,t},o._createLoadOption=function(){var e=o.one,t=o.dialogOptions,a=o.parentChild,n=a.getValues(),i=n.parent,l=n.child;return o.props.loadFn(o.props,{one:e,dialogOptions:t,group:i,metric:l})},o._handleClose=function(){o._handleWithValidationClose()},o.one=void 0,o._menuMore=(0,v.default)(o,{toggleToolBar:o._toggleWithToolbar,onAbout:o._clickInfoWithToolbar}),o.toolbarButtons=o._createType2WithToolbar(e,{noDate:!0,isOptions:!0}),o._commandButtons=o._crCommandsWithLoad(o),o.state={isToolbar:!0,isOptions:!1,isShowLabels:!0,validationMessages:[]},o}return(0,_.default)(t,e),(0,c.default)(t,[{key:"shouldComponentUpdate",value:function(e,t){return this.props===e||this.props.isShow!==e.isShow}},{key:"render",value:function(){var e=this,t=this.props,o=t.caption,a=t.isShow,n=t.onShow,i=t.onFront,l=t.oneCaption,r=t.oneURI,s=t.oneJsonProp,u=t.twoCaption,d=t.twoURI,c=t.twoJsonProp,p=t.threeCaption,h=t.msgOnNotSelected,f=this.state,_=f.isToolbar,S=f.isOptions,C=f.isShowLabels,w=f.validationMessages;return m.default.createElement(g.default.DraggableDialog,{isShow:a,caption:o,menuModel:this._menuMore,commandButtons:this._commandButtons,onShowChart:n,onFront:i,onClose:this._handleClose},m.default.createElement(g.default.Toolbar,{isShow:_,buttons:this.toolbarButtons}),m.default.createElement(O.default,{isShow:S,toggleOption:this._toggleOptionWithToolbar,onClose:this._hideOptionsWithToolbar}),m.default.createElement(g.default.SelectWithLoad,{isShow:a,isShowLabels:C,uri:r,jsonProp:s,caption:l,optionNames:"Items",onSelect:this._handleSelectOne}),m.default.createElement(g.default.SelectParentChild,{ref:function(t){return e.parentChild=t},isShow:a,isShowLabels:C,uri:d,parentCaption:u,parentOptionNames:"Items",parentJsonProp:c,childCaption:p,msgOnNotSelected:h}),m.default.createElement(g.default.ValidationMessages,{validationMessages:w}))}}]),t}(S.Component))||r)||r)||r);t.default=y},562:function(e,t,o){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n,i,l,r,s,u,d=o(1),c=a(d),p=o(2),h=a(p),f=o(3),_=a(f),S=o(4),m=a(S),C=o(5),g=a(C),w=o(0),v=a(w),T=o(517),M=a(T),b=o(29),O=a(b),y=o(37),L=a(y),D=o(38),E=a(D),P=o(520),B=a(P),A=o(518),F=a(A),R=o(519),W=a(R),I="M",N=(n=E.default.withToolbar,i=E.default.withValidationLoad,l=E.default.withLoad,n(r=i(r=l(r=(0,B.default)((u=s=function(e){function t(e){(0,h.default)(this,t);var o=(0,m.default)(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return o._isCategory=function(){return F.default.isCategory(o.chartType)},o._updateForDate=function(){o.date=void 0;var e=o.props.dfProps,t=void 0===e?{}:e,a=t.mapFrequency,n=t.mapDateDf,i=o.two?a:I,l=i?(0,M.default)(i,n):(0,M.default)("EMPTY");o.setState((0,c.default)({isShowDate:!0},l))},o._handleSelectOne=function(e){o.one=e},o._handleSelectTwo=function(e){o.two=e,o._isCategory()&&o._updateForDate()},o._handleSelectThree=function(e){o.three=e},o._handleSelectChartType=function(e){o.chartType=e,o._isCategory()?o._updateForDate():o.setState({isShowDate:!1})},o._onRegColor=function(e){o.colorComp=e},o._handleSelectDate=function(e){o.date=e},o._handleLoad=function(){o._handleWithValidationLoad(o._createValidationMessages(),o._createLoadOption)},o._createValidationMessages=function(){var e=o.props,t=e.oneCaption,a=e.twoCaption,n=e.threeCaption,i=e.msgOnNotSelected,l=[];return o._isCategory()||o.one||l.push(i(t)),o.two||l.push(i(a)),o.three||l.push(i(n)),l.isValid=0===l.length,l},o._createLoadOption=function(){var e=o.one,t=o.two,a=o.three,n=o.dialogOptions,i=o.chartType,l=o.colorComp,r=o.compSelect1,s=o.compSelect2,u=l?l.getColor():void 0,d=o._getDateWithForDate();return o.props.loadFn(o.props,{one:e,group:t,metric:a,dialogOptions:n,chartType:i,seriaColor:u,date:d,selectOptions:[r.getOptions(),s.getOptions()]})},o._handleClose=function(){o._handleWithValidationClose()},o._refSelect1=function(e){o.compSelect1=e},o._refSelect2=function(e){o.compSelect2=e},o.one=void 0,o.two=void 0,o.three=void 0,o.date=void 0,o.chartType=void 0,o._menuMore=(0,L.default)(o,{toggleToolBar:o._toggleWithToolbar,onAbout:o._clickInfoWithToolbar}),o.toolbarButtons=o._createType2WithToolbar(e,{isOptions:!0}),o._commandButtons=o._crCommandsWithLoad(o),o._chartOptions=F.default.crOptions(e),o.state=(0,c.default)({isToolbar:!0,isOptions:!1,isShowLabels:!0,isShowDate:!1},(0,M.default)("EMPTY"),{validationMessages:[]}),o}return(0,g.default)(t,e),(0,_.default)(t,[{key:"shouldComponentUpdate",value:function(e,t){return this.props===e||this.props.isShow!==e.isShow}},{key:"render",value:function(){var e=this.props,t=e.caption,o=e.isShow,a=e.onShow,n=e.onFront,i=e.oneCaption,l=e.oneURI,r=e.oneJsonProp,s=e.twoCaption,u=e.twoURI,d=e.twoJsonProp,c=e.threeCaption,p=e.threeURI,h=e.threeJsonProp,f=e.noDate,_=this.state,S=_.isToolbar,m=_.isOptions,C=_.isShowLabels,g=_.isShowDate,w=_.dateDefault,T=_.dateOptions,M=_.validationMessages;return v.default.createElement(O.default.DraggableDialog,{isShow:o,caption:t,menuModel:this._menuMore,commandButtons:this._commandButtons,onShowChart:a,onFront:n,onClose:this._handleClose},v.default.createElement(O.default.Toolbar,{isShow:S,buttons:this.toolbarButtons}),v.default.createElement(W.default,{isShow:m,toggleOption:this._toggleOptionWithToolbar,onClose:this._hideOptionsWithToolbar}),v.default.createElement(O.default.SelectWithLoad,{ref:this._refSelect1,isShow:o,isShowLabels:C,uri:l,jsonProp:r,caption:i,optionNames:"Countries",onSelect:this._handleSelectOne}),v.default.createElement(O.default.SelectWithLoad,{ref:this._refSelect2,isShow:o,isShowLabels:C,uri:u,jsonProp:d,caption:s,optionNames:"Items",onSelect:this._handleSelectTwo}),v.default.createElement(O.default.SelectWithLoad,{isShow:o,isShowLabels:C,uri:p,jsonProp:h,caption:c,optionNames:"Metrics",onSelect:this._handleSelectThree}),v.default.createElement(O.default.RowChart,{isShowLabels:C,options:this._chartOptions,onSelectChart:this._handleSelectChartType,onRegColor:this._onRegColor}),!f&&v.default.createElement(O.default.ShowHide,{isShow:g},v.default.createElement(O.default.RowInputSelect,{isShowLabels:C,caption:"For Date",placeholder:w,options:T,onSelect:this._handleSelectDate})),v.default.createElement(O.default.ValidationMessages,{validationMessages:M}))}}]),t}(w.Component),s.defaultProps={oneCaption:"Country",oneJsonProp:"countries",twoCaption:"Item",twoJsonProp:"items",threeCaption:"Metric",threeJsonProp:"items"},r=u))||r)||r)||r)||r);t.default=N},563:function(e,t,o){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n,i,l,r,s,u,d=o(1),c=a(d),p=o(2),h=a(p),f=o(3),_=a(f),S=o(4),m=a(S),C=o(5),g=a(C),w=o(0),v=a(w),T=o(517),M=a(T),b=o(29),O=a(b),y=o(37),L=a(y),D=o(38),E=a(D),P=o(520),B=a(P),A=o(518),F=a(A),R=o(519),W=a(R),I="M",N=(n=E.default.withToolbar,i=E.default.withValidationLoad,l=E.default.withLoad,n(r=i(r=l(r=(0,B.default)((u=s=function(e){function t(e){(0,h.default)(this,t);var o=(0,m.default)(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return o._isCategory=function(){return F.default.isCategory(o.chartType)},o._updateForDate=function(){o.date=void 0;var e=o.props.dfProps,t=void 0===e?{}:e,a=t.mapFrequency,n=t.mapDateDf,i=a||I,l=(0,M.default)(i,n);o.setState((0,c.default)({isShowDate:!0},l))},o._hSelectChartType=function(e){o.chartType=e,o._isCategory()?o._updateForDate():o.setState({isShowDate:!1})},o._onRegColor=function(e){o.colorComp=e},o._hSelectDate=function(e){o.date=e},o._handleLoad=function(){o._handleWithValidationLoad(o._createValidationMessages(),o._createLoadOption)},o._createValidationMessages=function(){for(var e=o.props,t=e.msgOnNotSelected,a=e.selectProps,n=a.length,i=[],l=o._isCategory()?1:0;l<n;l++)o._items[l]||i.push(t(a[l].caption));return i.isValid=0===i.length,i},o._createLoadOption=function(){var e=o.chartType,t=o.colorComp,a=o.dialogOptions,n=t?t.getColor():void 0,i=o._getDateWithForDate();return o.props.loadFn(o.props,{items:o._items,dialogOptions:a,chartType:e,seriaColor:n,date:i})},o._hClose=function(){o._handleWithValidationClose()},o._hSelect=function(e,t,a){a&&(a.id=e),o._items[t]=a},o._refSelect=function(e,t){o._compSelect[e]=t},o._renderSelects=function(e,t,a){return e.map(function(e,n){var i=e.id,l=e.uri,r=e.jsonProp,s=e.caption;return v.default.createElement(O.default.SelectWithLoad,{key:i,ref:o._refSelect.bind(null,i),isShow:t,isShowLabels:a,caption:s,uri:l,jsonProp:r,onSelect:o._hSelect.bind(null,i,n)})})},o._items=[],o._compSelect={},o.date=void 0,o.chartType=void 0,o._menuMore=(0,L.default)(o,{toggleToolBar:o._toggleWithToolbar,onAbout:o._clickInfoWithToolbar}),o.toolbarButtons=o._createType2WithToolbar(e,{isOptions:!0}),o._commandButtons=o._crCommandsWithLoad(o),o._chartOptions=F.default.crOptions(e),o.state=(0,c.default)({isToolbar:!0,isOptions:!1,isShowLabels:!0,isShowDate:!1},(0,M.default)("EMPTY"),{validationMessages:[]}),o}return(0,g.default)(t,e),(0,_.default)(t,[{key:"shouldComponentUpdate",value:function(e,t){return this.props===e||this.props.isShow!==e.isShow}},{key:"render",value:function(){var e=this.props,t=e.caption,o=e.isShow,a=e.onShow,n=e.onFront,i=e.selectProps,l=e.noDate,r=this.state,s=r.isToolbar,u=r.isOptions,d=r.isShowLabels,c=r.isShowDate,p=r.dateDefault,h=r.dateOptions,f=r.validationMessages;return v.default.createElement(O.default.DraggableDialog,{isShow:o,caption:t,menuModel:this._menuMore,commandButtons:this._commandButtons,onShowChart:a,onFront:n,onClose:this._hClose},v.default.createElement(O.default.Toolbar,{isShow:s,buttons:this.toolbarButtons}),v.default.createElement(W.default,{isShow:u,toggleOption:this._toggleOptionWithToolbar,onClose:this._hideOptionsWithToolbar}),this._renderSelects(i,o,d),v.default.createElement(O.default.RowChart,{isShowLabels:d,options:this._chartOptions,onSelectChart:this._hSelectChartType,onRegColor:this._onRegColor}),!l&&v.default.createElement(O.default.ShowHide,{isShow:c},v.default.createElement(O.default.RowInputSelect,{isShowLabels:d,caption:"For Date",placeholder:p,options:h,onSelect:this._hSelectDate})),v.default.createElement(O.default.ValidationMessages,{validationMessages:f}))}}]),t}(w.Component),s.defaultProps={selectProps:[]},r=u))||r)||r)||r)||r);t.default=N},564:function(e,t,o){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n,i,l,r,s=o(1),u=a(s),d=o(2),c=a(d),p=o(3),h=a(p),f=o(4),_=a(f),S=o(5),m=a(S),C=o(0),g=a(C),w=o(517),v=a(w),T=o(29),M=a(T),b=o(37),O=a(b),y=o(38),L=a(y),D=o(95),E=a(D),P=o(518),B=a(P),A=o(565),F=a(A),R="M",W="Dims for request haven't been loaded.\nClose, open dialog for trying load again.",I={SPINNER_LOADING:{position:"relative",display:"block",textAlign:"middle",margin:"16px auto 32px",width:"32px",height:"32px"},SPINNER_FAILED:{borderColor:"#f44336",animation:"none"}},N=function(e,t,o){return t!==e&&!e.isShow&&t.isShow&&o.isLoadFailed},V=(n=L.default.withToolbar,i=L.default.withValidationLoad,l=L.default.withLoad,n(r=i(r=l(r=function(e){function t(e){(0,c.default)(this,t);var o=(0,_.default)(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return o._loadDims=function(){var e=o.props,t=e.proxy,a=e.baseMeta,n=e.dims,i=e.dfProps,l=void 0===i?{}:i,r=l.dfId;(0,F.default)({id:r,proxy:t,baseMeta:a,dims:n}).then(function(e){var t=e.configs,a=e.errMsg;t?(o._selectOptions=t.map(function(e){return e.options}),o.setState({isLoading:!1,isLoadFailed:!1,configs:t})):o.setState({isLoading:!1,isLoadFailed:!0,validationMessages:[a]})})},o._isCategory=function(){return B.default.isCategory(o.chartType)},o._updateForDate=function(){o.date=null;var e=o._items[1]?o.props.mapFrequency?o.props.mapFrequency:o.two.mapFrequency?o.two.mapFrequency:R:null,t=o.props.mapDateDf,a=e?(0,v.default)(e,t):(0,v.default)("Y",t);o.setState((0,u.default)({isShowDate:!0},a))},o._handleLoad=function(){var e=o._crValidationMessages();if(0===e.length){var t=o._items,a=o.chartType,n=o.colorComp,i=o.date,l=n?n.getColor():void 0,r=o.state.dateDefault,s=o.props.loadFn(o.props,{chartType:a,seriaColor:l,date:i,dateDefault:r,items:t,selectOptions:o._selectOptions});o.props.onLoad(s)}o.setState({validationMessages:e})},o._crValidationMessages=function(){var e=[],t=o.state,a=t.configs;return t.isLoadFailed?e.push(W):a.forEach(function(t,a){var n=t.caption;o._items[a]||e.push(o.props.msgOnNotSelected(n))}),e},o._handleClose=function(){o._handleWithValidationClose()},o._hSelectChartType=function(e){o.chartType=e,o._isCategory()?o._updateForDate():o.setState({isShowDate:!1})},o._onRegColor=function(e){o.colorComp=e},o._fSelect=function(e){return function(t){this._items[e]=t}},o._hSelectDate=function(e){o.date=e},o._renderSelectInputs=function(){var e=o.state,t=e.isShowLabels;return e.configs.map(function(e,a){var n=e.id,i=e.caption,l=e.options,r={isShowLabels:t,caption:i,options:l};return g.default.createElement(M.default.RowInputSelect,(0,u.default)({key:n},r,{onSelect:o._fSelect(a).bind(o)}))})},o._menuMore=(0,O.default)(o,{toggleToolBar:o._toggleWithToolbar,onAbout:o._clickInfoWithToolbar}),o.toolbarButtons=o._createType2WithToolbar(e),o._commandButtons=o._crCommandsWithLoad(o),o._chartOptions=B.default.crOptions(e),o._items=[],o._selectOptions=[],o.state=(0,u.default)({isToolbar:!0,isShowLabels:!0,isLoading:!0,isLoadFailed:!1,isShowDate:!1},(0,v.default)("EMPTY"),{validationMessages:[]}),o}return(0,m.default)(t,e),(0,h.default)(t,[{key:"shouldComponentUpdate",value:function(e,t){return this.props===e||this.props.isShow!==e.isShow}},{key:"componentDidMount",value:function(){this._loadDims()}},{key:"componentDidUpdate",value:function(e){N(e,this.props,this.state)&&(this.setState({isLoading:!0,isLoadFailed:!1}),this._loadDims())}},{key:"render",value:function(){var e=this.props,t=e.caption,o=e.isShow,a=e.onShow,n=e.onFront,i=this.state,l=i.isToolbar,r=i.isShowLabels,s=i.isLoading,d=i.isLoadFailed,c=i.isShowDate,p=i.dateDefault,h=i.dateOptions,f=i.validationMessages,_=d?(0,u.default)({},I.SPINNER_LOADING,I.SPINNER_FAILED):I.SPINNER_LOADING;return g.default.createElement(M.default.DraggableDialog,{isShow:o,caption:t,menuModel:this._menuMore,commandButtons:this._commandButtons,onShowChart:a,onFront:n,onClose:this._handleClose},g.default.createElement(M.default.Toolbar,{isShow:l,buttons:this.toolbarButtons}),(s||d)&&g.default.createElement(E.default,{style:_}),!s&&!d&&this._renderSelectInputs(),g.default.createElement(M.default.RowChart,{isShowLabels:r,options:this._chartOptions,onSelectChart:this._hSelectChartType,onRegColor:this._onRegColor}),g.default.createElement(M.default.ShowHide,{isShow:c},g.default.createElement(M.default.RowInputSelect,{isShowLabels:r,caption:"For Date",placeholder:p,options:h,onSelect:this._hSelectDate})),g.default.createElement(M.default.ValidationMessages,{validationMessages:f}))}}]),t}(C.Component))||r)||r)||r);t.default=V},565:function(e,t,o){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=o(9),i=a(n),l=o(1),r=a(l),s=o(51),u=a(s),d={SELECTION_ALL:{selection:{filter:"all",values:["*"]}},TID_DIM:{code:"Tid",selection:{filter:"top",values:["1"]}}},c=function(e,t,o){return e?""+e+t+"/"+o:t+"/"+o},p=function(e){return(0,r.default)({code:e},d.SELECTION_ALL)},h=function(e){var t=e.map(function(e){return p(e.v)});return t.push(d.TID_DIM),{method:"POST",body:JSON.stringify({query:t,response:{format:"json-stat"}})}},f=function(e,t){for(var o=[],a=t.v,n=e.Dimension(a),l=n.length,r=0;r<l;r++)o.push({caption:n.Category(r).label,slice:(0,i.default)({},a,n.id[r])});return o},_=!1,S=void 0,m=void 0,C=function(e){return function(){e===S&&(_=!1)}},g=function(e){S=e,m=setTimeout(C(e),5e3),_=!0},w=function(){_=!1,clearTimeout(m)},v=function(e){var t=e.proxy,o=e.baseMeta,a=e.id,n=e.dims;if(_)return Promise.resolve({errMsg:"Another dims are still loading"});var i=c(t,o,a),l=h(n);return g(i),fetch(i,l).then(function(e){var t=e.status;if(t>=200&&t<400)return e.json();if(403===t)throw Error("HTTP Code 403: Forbitten.\nMaybe, require API key.");throw Error("HTTP Code: "+t)}).then(function(e){var t=(0,u.default)(e).Dataset(0),o=n.map(function(e){return{id:e.v,caption:e.c,options:f(t,e)}});return w(),{configs:o}}).catch(function(e){return w(),{errMsg:e.message}})};t.default=v}});