(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[146],{7317:(o,t,e)=>{"use strict";e.r(t),e.d(t,{default:()=>B});var n,a=e(1506),i=e.n(a),s=e(5354),r=e.n(s),h=e(5893),l=e(9679),d=e(7728),c=e(377),p=d.Z.crOptions,u=c.Z.Decor,S=c.Z.crMenuMore,w={ID_CAPTION:{width:85},ID_ROOT:{width:270}},m=function(o){return"string"==typeof o&&o.trim()},_=function(o){return!(!m(o)||!m(o.split("/")[2]))};const g=(0,u.withToolbar)(n=(0,u.withLoad)(n=function(o){function t(t){var e;(e=o.call(this,t)||this)._hSelectChartType=function(o){e.setState({chartType:o})},e._onRegColor=function(o){e.colorComp=o},e._handleLoad=function(){if(e._idInput)if(e._idInput.isValid()){var o=e._idInput.getValue(),t=i()(e),n=t.props,a=t.state,s=t.colorComp,r=n.onLoad,h=n.loadFn,l=a.chartType,d=s?s.getConf():{},c=d.seriaColor,p=d.seriaWidth;r(h(e.props,{one:{value:o,caption:o},chartType:l,seriaColor:c,seriaWidth:p}))}else e._idInput.showErrMsg()},e._refIdInput=function(o){return e._idInput=o},e._refDates=function(o){return e.datesFragment=o},e._menuMore=S(i()(e),{toggleToolBar:e._toggleWithToolbar,onAbout:e._clickInfoWithToolbar});var n=t.noDate;return e.toolbarButtons=e._createType2WithToolbar(t,{noDate:n}),e._chartOptions=p({chartsType:"t2"}),e._commandButtons=e._crCommandsWithLoad(i()(e)),e.state={isToolbar:!0,isShowLabels:!0,isShowDate:!0,chartType:"SPLINE"},e}r()(t,o);var e=t.prototype;return e.shouldComponentUpdate=function(o,t){return this.props===o||this.props.isShow!==o.isShow},e.render=function(){var o=this.props,t=o.caption,e=o.isShow,n=o.onShow,a=o.onFront,i=o.onClose,s=o.oneCaption,r=o.onePlaceholder,l=o.noDate,d=o.initFromDate,p=o.initToDate,u=o.msgOnNotValidFormat,S=o.onTestDate,m=this.state,g=m.isToolbar,T=m.isShowLabels,f=m.isShowDate,D=m.chartType;return(0,h.jsxs)(c.Z.DraggableDialog,{isShow:e,menuModel:this._menuMore,caption:t,commandButtons:this._commandButtons,onShowChart:n,onFront:a,onClose:i,children:[(0,h.jsx)(c.Z.Toolbar,{isShow:g,buttons:this.toolbarButtons}),(0,h.jsx)(c.Z.RowPattern,{ref:this._refIdInput,isShow:e,isShowLabels:T,captionStyle:w.ID_CAPTION,rootStyle:w.ID_ROOT,placeholder:r,caption:s,onTest:_,errorMsg:"Empty or Id format is not valid"}),(0,h.jsx)(c.Z.RowChartDate,{chartType:D,isShowLabels:T,isShowChart:!0,labelStyle:w.ID_CAPTION,selectWidth:w.ID_ROOT.width,chartOptions:this._chartOptions,onSelectChart:this._hSelectChartType,onRegColor:this._onRegColor,noDate:l}),!l&&(0,h.jsx)(c.Z.ShowHide,{isShow:f,children:(0,h.jsx)(c.Z.DatesFragment,{ref:this._refDates,isShowLabels:T,initFromDate:d,initToDate:p,msgOnNotValidFormat:u,onTestDate:S})})]})},t}(l.Component))||n)||n;var T,f=e(7154),D=e.n(f),C=c.Z.Decor,b=c.Z.crMenuMore,O="hasSecondYAxis";const x=(0,C.dialog)(T=function(o){function t(t){var e;(e=o.call(this,t)||this)._handleSelectOne=function(o){e.one=o},e._handleSelectTwo=function(o){e.two=o},e._handleSelectThree=function(o){e.three=o},e._handleLoad=function(){e._handleWithValidationLoad(e._createValidationMessages(),e._createLoadOption)},e._createValidationMessages=function(){var o=e.props,t=o.oneCaption,n=o.twoCaption,a=o.threeURI,i=o.threeCaption,s=o.msgOnNotSelected,r=[];if(e.one||r.push(s(t)),e.two||r.push(s(n)),a&&!e.three&&r.push(s(i)),e.datesFragment){var h=e.datesFragment.getValidation(),l=h.isValid,d=h.datesMsg;l||(r=r.concat(d))}return r.isValid=0===r.length,r},e._createLoadOption=function(){var o=e.datesFragment?e.datesFragment.getValues():{},t=o.fromDate,n=o.toDate;return e.props.loadFn(e.props,{one:e.one,two:e.two,three:e.three,fromDate:t,toDate:n,hasSecondYAxis:e.hasSecondYAxis})},e._handleClose=function(){e._handleWithValidationClose()},e._handleMode=function(o,t){e[o]=t},e._refDates=function(o){return e.datesFragment=o},e._menuMore=b(i()(e),{toggleToolBar:e._toggleWithToolbar,onAbout:e._clickInfoWithToolbar});var n=t.noDate,a=t.noOptions;return e.toolbarButtons=e._createType2WithToolbar(t,{noDate:n,isShowOptions:!a}),e._commandButtons=e._crCommandsWithLoad(i()(e)),e.state=D()({},e._isWithInitialState(),{isShowOptions:!1}),e}r()(t,o);var e=t.prototype;return e.shouldComponentUpdate=function(o,t){return this.props===o||this.props.isShow!==o.isShow},e.render=function(){var o=this.props,t=o.caption,e=o.isShow,n=o.onShow,a=o.onFront,i=o.oneCaption,s=o.oneNames,r=o.oneURI,l=o.oneJsonProp,d=o.isWithOneInput,p=o.twoCaption,u=o.twoNames,S=o.twoURI,w=o.twoJsonProp,m=o.isWithInputTwo,_=o.threeCaption,g=o.threeNames,T=o.threeURI,f=o.threeJsonProp,D=o.isWithInputThree,C=o.initFromDate,b=o.initToDate,x=o.msgOnNotValidFormat,M=o.onTestDate,V=o.noDate,F=o.noOptions,L=this.state,Z=L.isToolbar,v=L.isShowLabels,I=L.isShowDate,W=L.isShowOptions,j=L.validationMessages;return(0,h.jsxs)(c.Z.DraggableDialog,{isShow:e,caption:t,menuModel:this._menuMore,commandButtons:this._commandButtons,onShowChart:n,onFront:a,onClose:this._handleClose,children:[(0,h.jsx)(c.Z.Toolbar,{isShow:Z,buttons:this.toolbarButtons}),(0,h.jsx)(c.Z.SelectWithLoad,{isShow:e,isShowLabels:v,uri:r,jsonProp:l,caption:i,optionNames:s,isWithInput:d,onSelect:this._handleSelectOne}),(0,h.jsx)(c.Z.SelectWithLoad,{isShow:e,isShowLabels:v,uri:S,jsonProp:w,caption:p,optionNames:u,isWithInput:m,onSelect:this._handleSelectTwo}),T&&(0,h.jsx)(c.Z.SelectWithLoad,{isShow:e,isShowLabels:v,uri:T,jsonProp:f,caption:_,optionNames:g,isWithInput:D,onSelect:this._handleSelectThree}),!0!==V&&(0,h.jsx)(c.Z.ShowHide,{isShow:I,children:(0,h.jsx)(c.Z.DatesFragment,{ref:this._refDates,isShowLabels:v,initFromDate:C,initToDate:b,msgOnNotValidFormat:x,onTestDate:M})}),!0!==F&&(0,h.jsx)(c.Z.ShowHide,{isShow:W,children:(0,h.jsx)(c.Z.RowCheckBox,{initValue:!1,caption:"Add Seria with Second YAxis",onCheck:this._handleMode.bind(null,O,!0),onUnCheck:this._handleMode.bind(null,O,!1)})}),(0,h.jsx)(c.Z.ValidationMessages,{validationMessages:j})]})},t}(l.Component))||T;var M,V=c.Z.Decor,F=c.Z.crMenuMore,L="hasSecondYAxis";const Z=(0,V.dialog)(M=function(o){function t(t){var e;return(e=o.call(this,t)||this)._handleLoad=function(){e._handleWithValidationLoad(e._createValidationMessages(),e._createLoadOption)},e._createValidationMessages=function(){var o=[],t=e.oneTwo.getValidation(),n=t.isValid,a=t.msg;n||(o=o.concat(a));var i=e.datesFragment.getValidation(),s=i.isValid,r=i.datesMsg;return s||(o=o.concat(r)),o.isValid=0===o.length,o},e._createLoadOption=function(){var o=e.oneTwo.getValues(),t=o.one,n=o.two,a=e.datesFragment.getValues(),i=a.fromDate,s=a.toDate;return e.props.loadFn(e.props,{one:t,two:n,fromDate:i,toDate:s,hasSecondYAxis:e.hasSecondYAxis})},e._handleClose=function(){e._handleWithValidationClose()},e._handleMode=function(o,t){e[o]=t},e._refOneTwo=function(o){return e.oneTwo=o},e._refDates=function(o){return e.datesFragment=o},e._menuMore=F(i()(e),{toggleToolBar:e._toggleWithToolbar,onAbout:e._clickInfoWithToolbar}),e.toolbarButtons=e._createType2WithToolbar(t,{isShowOptions:!0}),e.hasSecondYAxis=!1,e._commandButtons=e._crCommandsWithLoad(i()(e)),e.state=D()({},e._isWithInitialState(),{isShowOptions:!1}),e}r()(t,o);var e=t.prototype;return e.shouldComponentUpdate=function(o,t){return this.props===o||this.props.isShow!==o.isShow},e.render=function(){var o=this.props,t=o.caption,e=o.oneCaption,n=o.oneURI,a=o.oneJsonProp,i=o.twoCaption,s=o.msgOnNotSelected,r=o.isShow,l=o.onShow,d=o.onFront,p=o.initFromDate,u=o.initToDate,S=o.msgOnNotValidFormat,w=o.onTestDate,m=this.state,_=m.isToolbar,g=m.isShowLabels,T=m.isShowDate,f=m.isShowOptions,D=m.validationMessages;return(0,h.jsxs)(c.Z.DraggableDialog,{isShow:r,caption:t,menuModel:this._menuMore,commandButtons:this._commandButtons,onShowChart:l,onFront:d,onClose:this._handleClose,children:[(0,h.jsx)(c.Z.Toolbar,{isShow:_,buttons:this.toolbarButtons}),(0,h.jsx)(c.Z.SelectOneTwo,{ref:this._refOneTwo,isShow:r,isShowLabels:g,uri:n,oneCaption:e,oneJsonProp:a,twoCaption:i,msgOnNotSelected:s}),(0,h.jsx)(c.Z.ShowHide,{isShow:T,children:(0,h.jsx)(c.Z.DatesFragment,{ref:this._refDates,isShowLabels:g,initFromDate:p,initToDate:u,msgOnNotValidFormat:S,onTestDate:w})}),(0,h.jsx)(c.Z.ShowHide,{isShow:f,children:(0,h.jsx)(c.Z.RowCheckBox,{initValue:!1,caption:"Add Seria with Second YAxis",onCheck:this._handleMode.bind(null,L,!0),onUnCheck:this._handleMode.bind(null,L,!1)})}),(0,h.jsx)(c.Z.ValidationMessages,{validationMessages:D})]})},t}(l.Component))||M;var v,I=e(3014),W=c.Z.Decor,j=c.Z.crMenuMore,y="hasSecondYAxis",A=[{caption:"Default: Area",value:I.oX.AREA},{caption:"Scatter: Label Up",value:I.oX.SCATTER_UP},{caption:"Scatter: Label Down",value:I.oX.SCATTER_DOWN}];const B={Query:g,Type4:x,Type4A:Z,Type5:(0,W.dialog)(v=function(o){function t(t){var e;return(e=o.call(this,t)||this)._handleSelectOne=function(o){e.one=o},e._handleLoad=function(){e._handleWithValidationLoad(e._createValidationMessages(),e._createLoadOption)},e._createValidationMessages=function(){var o=e.props.oneCaption,t=[];e.one||t.push(e.props.msgOnNotSelected(o));var n=e.twoThree.getValidation(),a=n.isValid,i=n.msg;a||(t=t.concat(i));var s=e.datesFragment.getValidation(),r=s.isValid,h=s.datesMsg;return r||(t=t.concat(h)),t.isValid=0===t.length,t},e._createLoadOption=function(){var o=e.twoThree.getValues(),t=o.one,n=o.two,a=e.datesFragment.getValues(),i=a.fromDate,s=a.toDate,r=e.chartType?e.chartType.value:void 0;return e.props.loadFn(e.props,{one:e.one,two:t,three:n,fromDate:i,toDate:s,hasSecondYAxis:e.hasSecondYAxis,seriaType:r})},e._handleClose=function(){e._handleWithValidationClose()},e._handleMode=function(o,t){e[o]=t},e._handlerSelectChartType=function(o){e.chartType=o},e._refTwoThree=function(o){return e.twoThree=o},e._refDates=function(o){return e.datesFragment=o},e._menuMore=j(i()(e),{toggleToolBar:e._toggleWithToolbar,onAbout:e._clickInfoWithToolbar}),e.toolbarButtons=e._createType2WithToolbar(t,{isShowOptions:!0}),e._commandButtons=e._crCommandsWithLoad(i()(e)),e.state=D()({},e._isWithInitialState(),{isShowDate:!1,isShowOptions:!1}),e}r()(t,o);var e=t.prototype;return e.shouldComponentUpdate=function(o,t){return this.props===o||this.props.isShow!==o.isShow},e.render=function(){var o=this.props,t=o.caption,e=o.isShow,n=o.onShow,a=o.onFront,i=o.oneCaption,s=o.oneURI,r=o.oneJsonProp,l=o.twoCaption,d=o.twoURI,p=o.twoJsonProp,u=o.threeCaption,S=o.msgOnNotSelected,w=o.initFromDate,m=o.initToDate,_=o.msgOnNotValidFormat,g=o.onTestDate,T=o.isChartType,f=this.state,D=f.isToolbar,C=f.isShowLabels,b=f.isShowDate,O=f.isShowOptions,x=f.validationMessages;return(0,h.jsxs)(c.Z.DraggableDialog,{isShow:e,caption:t,menuModel:this._menuMore,commandButtons:this._commandButtons,onShowChart:n,onFront:a,onClose:this._handleClose,children:[(0,h.jsx)(c.Z.Toolbar,{isShow:D,buttons:this.toolbarButtons}),(0,h.jsx)(c.Z.SelectWithLoad,{isShow:e,isShowLabels:C,uri:s,jsonProp:r,caption:i,optionNames:"Items",onSelect:this._handleSelectOne}),(0,h.jsx)(c.Z.SelectOneTwo,{ref:this._refTwoThree,isShow:e,isShowLabels:C,uri:d,oneCaption:l,oneJsonProp:p,twoCaption:u,msgOnNotSelected:S}),(0,h.jsx)(c.Z.ShowHide,{isShow:b,children:(0,h.jsx)(c.Z.DatesFragment,{ref:this._refDates,isShowLabels:C,initFromDate:w,initToDate:m,msgOnNotValidFormat:_,onTestDate:g})}),(0,h.jsxs)(c.Z.ShowHide,{isShow:O,children:[T&&(0,h.jsx)(c.Z.RowInputSelect,{isShowLabels:C,caption:"Chart Type:",options:A,onSelect:this._handlerSelectChartType}),(0,h.jsx)(c.Z.RowCheckBox,{initValue:!1,caption:"Add Seria with Second YAxis",onCheck:this._handleMode.bind(null,y,!0),onUnCheck:this._handleMode.bind(null,y,!1)})]}),(0,h.jsx)(c.Z.ValidationMessages,{validationMessages:x})]})},t}(l.Component))||v}}}]);