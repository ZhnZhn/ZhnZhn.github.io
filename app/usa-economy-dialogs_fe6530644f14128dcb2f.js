(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{NB5s:function(e,t,o){"use strict";o.r(t);var a,n=o("pVnL"),i=o.n(n),r=o("PJYZ"),s=o.n(r),l=o("VbXa"),d=o.n(l),c=o("q1tI"),p=o.n(c),u=o("4Fsi"),h=o("/plH"),m=o("H9NR"),w={TIP:{margin:10,marginTop:16,fontWeight:"bold"}},S=function(e){return e&&"Z"===e.value},f=function(e,t){var o=e.fnValue,a=e.dataColumn,n=e.loadId,i=e.dataSource,r=t.one,s=t.two,l=t.three,d=t.fromDate,c=t.toDate,p=t.zipCode,u=S(s),h=u?{value:p,caption:p}:l;return{value:"function"==typeof o?o(r.value,s.value,h.value):void 0,fromDate:d,toDate:c,dataColumn:a,loadId:n,title:s.caption+": "+h.caption,subtitle:r.caption,dataSource:i,isKeyFeature:u}},g=/^\d{5}$/,C=function(e){return g.test(e.trim())},_={Zillow:(0,m.a.dialog)(a=function(e){function t(t){var o;return(o=e.call(this,t)||this)._hSelectMetric=function(e){o.metric=e},o._handleSelectType=function(e){S(e)?o.setState({isShowPattern:!0}):o.setState({isShowPattern:!1})},o._handleLoad=function(){o._handleWithValidationLoad(o._createValidationMessages(),o._createLoadOption)},o._createValidationMessages=function(){var e=o.props.oneCaption,t=[];o.metric||t.push(o.props.msgOnNotSelected(e));var a=o.inputTypeCode.getValues().one;if(S(a))o.inputZipCode.isValid()||(t=t.concat("Zip Code is not valid"));else{var n=o.inputTypeCode.getValidation(),i=n.isValid,r=n.msg;i||(t=t.concat(r))}var s=o.datesFragment.getValidation(),l=s.isValid,d=s.datesMsg;return l||(t=t.concat(d)),t.isValid=0===t.length,t},o._createLoadOption=function(){var e=o.inputTypeCode.getValues(),t=e.one,a=e.two,n=o.datesFragment.getValues(),i=n.fromDate,r=n.toDate,s=o.inputZipCode.getValue();return f(o.props,{one:o.metric,two:t,three:a,fromDate:i,toDate:r,zipCode:s})},o._handleClose=function(){o._handleWithValidationClose()},o._refTypeCode=function(e){return o.inputTypeCode=e},o._refZip=function(e){return o.inputZipCode=e},o._refDates=function(e){return o.datesFragment=e},o._menuMore=Object(h.a)(s()(o),{toggleToolBar:o._toggleWithToolbar,onAbout:o._clickInfoWithToolbar}),o.toolbarButtons=o._createType2WithToolbar(t),o._commandButtons=o._crCommandsWithLoad(s()(o)),o.state=i()({},o._isWithInitialState(),{isShowPattern:!1}),o}d()(t,e);var o=t.prototype;return o.shouldComponentUpdate=function(e,t){return this.props===e||this.props.isShow!==e.isShow},o.render=function(){var e=this.props,t=e.caption,o=e.isShow,a=e.onShow,n=e.onFront,i=e.oneCaption,r=e.oneURI,s=e.oneJsonProp,l=e.twoCaption,d=e.twoURI,c=e.twoJsonProp,h=e.threeCaption,m=e.msgOnNotSelected,S=e.initFromDate,f=e.initToDate,g=e.nForecastDate,_=e.msgOnNotValidFormat,T=e.onTestDate,D=this.state,b=D.isToolbar,v=D.isShowLabels,V=D.isShowDate,F=D.isShowPattern,y=D.validationMessages;return p.a.createElement(u.a.DraggableDialog,{isShow:o,caption:t,menuModel:this._menuMore,commandButtons:this._commandButtons,onShowChart:a,onFront:n,onClose:this._handleClose},p.a.createElement(u.a.Toolbar,{isShow:b,buttons:this.toolbarButtons}),p.a.createElement(u.a.SelectWithLoad,{isShow:o,isShowLabels:v,uri:r,jsonProp:s,caption:i,optionNames:"Items",onSelect:this._hSelectMetric}),p.a.createElement(u.a.SelectOneTwo,{ref:this._refTypeCode,isShow:o,isShowLabels:v,isHideTwo:F,uri:d,oneCaption:l,oneJsonProp:c,twoCaption:h,msgOnNotSelected:m,onSelectOne:this._handleSelectType}),p.a.createElement(u.a.ShowHide,{isShow:F},p.a.createElement(u.a.RowPattern,{ref:this._refZip,isShowLabels:v,caption:"*Zip Code",placeholder:"Zip Code, 5 Digits",onTest:C,errorMsg:"5 digits format is required"})),p.a.createElement(u.a.ShowHide,{isShow:V},p.a.createElement(u.a.DatesFragment,{ref:this._refDates,isShowLabels:v,initFromDate:S,initToDate:f,nForecastDate:g,msgOnNotValidFormat:_,onTestDate:T})),p.a.createElement(u.a.ShowHide,{isShow:F},p.a.createElement("div",{style:w.TIP},"*Data present not for all zip codes")),p.a.createElement(u.a.ValidationMessages,{validationMessages:y}))},t}(c.Component))||a};t.default=_}}]);