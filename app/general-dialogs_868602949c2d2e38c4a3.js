(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[146],{7317:(t,o,s)=>{"use strict";s.r(o),s.d(o,{default:()=>L});var e,i=s(9679),n=s(4706),a=s(4827),h=s(5893);const{crOptions:r}=n.Z,{Decor:l,crMenuMore:c}=a.Z,d={ID_CAPTION:{width:85},ID_ROOT:{width:270}},p=t=>"string"==typeof t&&t.trim(),S=t=>!(!p(t)||!p(t.split("/")[2]));const w=(0,l.withToolbar)(e=(0,l.withLoad)(e=class extends i.Component{constructor(t){super(t),this._hSelectChartType=t=>{this.setState({chartType:t})},this._onRegColor=t=>{this.colorComp=t},this._handleLoad=()=>{if(this._idInput)if(this._idInput.isValid()){const t=this._idInput.getValue(),{props:o,state:s,colorComp:e,dialogOptions:i}=this,{onLoad:n,loadFn:a}=o,{chartType:h}=s,{seriaColor:r,seriaWidth:l}=e?e.getConf():{};n(a(this.props,{items:[{c:t,v:t}],chartType:h,seriaColor:r,seriaWidth:l,dialogOptions:i}))}else this._idInput.showErrMsg()},this._refIdInput=t=>this._idInput=t,this._refDates=t=>this.datesFragment=t,this._menuMore=c(this,{toggleToolBar:this._toggleWithToolbar,onAbout:this._clickInfoWithToolbar});const{noDate:o}=t;this.toolbarButtons=this._createType2WithToolbar(t,{noDate:o,isOptions:!0}),this._chartOptions=r({chartsType:"t2"}),this._commandButtons=this._crCommandsWithLoad(this),this.state={isToolbar:!0,isShowLabels:!0,isShowDate:!0,isOptions:!1,chartType:"SPLINE"}}shouldComponentUpdate(t,o){return this.props===t||this.props.isShow!==t.isShow}render(){const{caption:t,isShow:o,onShow:s,onFront:e,onClose:i,oneCaption:n,onePlaceholder:r,noDate:l,initFromDate:c,initToDate:p,msgOnNotValidFormat:w,onTestDate:_}=this.props,{isToolbar:m,isShowLabels:u,isShowDate:g,isOptions:T,chartType:C}=this.state;return(0,h.jsxs)(a.Z.DraggableDialog,{isShow:o,menuModel:this._menuMore,caption:t,commandButtons:this._commandButtons,onShowChart:s,onFront:e,onClose:i,children:[(0,h.jsx)(a.Z.Toolbar,{isShow:m,buttons:this.toolbarButtons}),(0,h.jsx)(a.Z.ModalOptions,{isShow:T,toggleOption:this._toggleOptionWithToolbar,onClose:this._hideOptionsWithToolbar}),(0,h.jsx)(a.Z.RowPattern,{ref:this._refIdInput,isShow:o,isShowLabels:u,captionStyle:d.ID_CAPTION,rootStyle:d.ID_ROOT,placeholder:r,caption:n,onTest:S,errorMsg:"Empty or Id format is not valid"}),(0,h.jsx)(a.Z.RowChartDate,{chartType:C,isShowLabels:u,isShowChart:!0,labelStyle:d.ID_CAPTION,selectWidth:d.ID_ROOT.width,chartOptions:this._chartOptions,onSelectChart:this._hSelectChartType,onRegColor:this._onRegColor,noDate:l}),!l&&(0,h.jsx)(a.Z.ShowHide,{isShow:g,children:(0,h.jsx)(a.Z.DatesFragment,{ref:this._refDates,isShowLabels:u,initFromDate:c,initToDate:p,msgOnNotValidFormat:w,onTestDate:_})})]})}})||e)||e;var _;const{Decor:m,crMenuMore:u}=a.Z;const g=(0,m.dialog)(_=class extends i.Component{constructor(t){super(t),this._handleSelectOne=t=>{this.one=t},this._handleSelectTwo=t=>{this.two=t},this._handleSelectThree=t=>{this.three=t},this._handleLoad=()=>{this._handleWithValidationLoad(this._createValidationMessages(),this._createLoadOption)},this._createValidationMessages=()=>{const{oneCaption:t,twoCaption:o,threeURI:s,threeCaption:e,msgOnNotSelected:i}=this.props;let n=[];if(this.one||n.push(i(t)),this.two||n.push(i(o)),s&&!this.three&&n.push(i(e)),this.datesFragment){const{isValid:t,datesMsg:o}=this.datesFragment.getValidation();t||(n=n.concat(o))}return n.isValid=0===n.length,n},this._createLoadOption=()=>{const{fromDate:t,toDate:o}=this.datesFragment?this.datesFragment.getValues():{};return this.props.loadFn(this.props,{one:this.one,two:this.two,three:this.three,fromDate:t,toDate:o,hasSecondYAxis:this.hasSecondYAxis})},this._handleClose=()=>{this._handleWithValidationClose()},this._hCheckSecondYAxis=()=>{this.hasSecondYAxis=!0},this._hUnCheckSecondYAxis=()=>{this.hasSecondYAxis=!1},this._refDates=t=>this.datesFragment=t,this._menuMore=u(this,{toggleToolBar:this._toggleWithToolbar,onAbout:this._clickInfoWithToolbar});const{noDate:o,noOptions:s}=t;this.toolbarButtons=this._createType2WithToolbar(t,{noDate:o,isShowOptions:!s}),this._commandButtons=this._crCommandsWithLoad(this),this.state={...this._isWithInitialState(),isShowOptions:!1}}shouldComponentUpdate(t,o){return this.props===t||this.props.isShow!==t.isShow}render(){const{caption:t,isShow:o,onShow:s,onFront:e,oneCaption:i,oneNames:n,oneURI:r,oneJsonProp:l,isWithOneInput:c,twoCaption:d,twoNames:p,twoURI:S,twoJsonProp:w,isWithInputTwo:_,threeCaption:m,threeNames:u,threeURI:g,threeJsonProp:T,isWithInputThree:C,initFromDate:D,initToDate:x,msgOnNotValidFormat:b,onTestDate:O,noDate:V,noOptions:A}=this.props,{isToolbar:F,isShowLabels:L,isShowDate:I,isShowOptions:f,validationMessages:M}=this.state;return(0,h.jsxs)(a.Z.DraggableDialog,{isShow:o,caption:t,menuModel:this._menuMore,commandButtons:this._commandButtons,onShowChart:s,onFront:e,onClose:this._handleClose,children:[(0,h.jsx)(a.Z.Toolbar,{isShow:F,buttons:this.toolbarButtons}),(0,h.jsx)(a.Z.SelectWithLoad,{isShow:o,isShowLabels:L,uri:r,jsonProp:l,caption:i,optionNames:n,isWithInput:c,onSelect:this._handleSelectOne}),(0,h.jsx)(a.Z.SelectWithLoad,{isShow:o,isShowLabels:L,uri:S,jsonProp:w,caption:d,optionNames:p,isWithInput:_,onSelect:this._handleSelectTwo}),g&&(0,h.jsx)(a.Z.SelectWithLoad,{isShow:o,isShowLabels:L,uri:g,jsonProp:T,caption:m,optionNames:u,isWithInput:C,onSelect:this._handleSelectThree}),!0!==V&&(0,h.jsx)(a.Z.ShowHide,{isShow:I,children:(0,h.jsx)(a.Z.DatesFragment,{ref:this._refDates,isShowLabels:L,initFromDate:D,initToDate:x,msgOnNotValidFormat:b,onTestDate:O})}),!0!==A&&(0,h.jsx)(a.Z.ShowHide,{isShow:f,children:(0,h.jsx)(a.Z.RowCheckBox,{initValue:!1,caption:"Add Seria with Second YAxis",onCheck:this._hCheckSecondYAxis,onUnCheck:this._hUnCheckSecondYAxis})}),(0,h.jsx)(a.Z.ValidationMessages,{validationMessages:M})]})}})||_;var T;const{Decor:C,crMenuMore:D}=a.Z;const x=(0,C.dialog)(T=class extends i.Component{constructor(t){super(t),this._handleLoad=()=>{this._handleWithValidationLoad(this._createValidationMessages(),this._createLoadOption)},this._createValidationMessages=()=>{let t=[];const{isValid:o,msg:s}=this.oneTwo.getValidation();o||(t=t.concat(s));const{isValid:e,datesMsg:i}=this.datesFragment.getValidation();return e||(t=t.concat(i)),t.isValid=0===t.length,t},this._createLoadOption=()=>{const{one:t,two:o}=this.oneTwo.getValues(),{fromDate:s,toDate:e}=this.datesFragment.getValues();return this.props.loadFn(this.props,{one:t,two:o,fromDate:s,toDate:e,hasSecondYAxis:this.hasSecondYAxis})},this._handleClose=()=>{this._handleWithValidationClose()},this._hCheckSecondYAxis=()=>{this.hasSecondYAxis=!0},this._hUnCheckSecondYAxis=()=>{this.hasSecondYAxis=!1},this._refOneTwo=t=>this.oneTwo=t,this._refDates=t=>this.datesFragment=t,this._menuMore=D(this,{toggleToolBar:this._toggleWithToolbar,onAbout:this._clickInfoWithToolbar}),this.toolbarButtons=this._createType2WithToolbar(t,{isShowOptions:!0}),this.hasSecondYAxis=!1,this._commandButtons=this._crCommandsWithLoad(this),this.state={...this._isWithInitialState(),isShowOptions:!1}}shouldComponentUpdate(t,o){return this.props===t||this.props.isShow!==t.isShow}render(){const{caption:t,oneCaption:o,oneURI:s,oneJsonProp:e,twoCaption:i,msgOnNotSelected:n,isShow:r,onShow:l,onFront:c,initFromDate:d,initToDate:p,msgOnNotValidFormat:S,onTestDate:w}=this.props,{isToolbar:_,isShowLabels:m,isShowDate:u,isShowOptions:g,validationMessages:T}=this.state;return(0,h.jsxs)(a.Z.DraggableDialog,{isShow:r,caption:t,menuModel:this._menuMore,commandButtons:this._commandButtons,onShowChart:l,onFront:c,onClose:this._handleClose,children:[(0,h.jsx)(a.Z.Toolbar,{isShow:_,buttons:this.toolbarButtons}),(0,h.jsx)(a.Z.SelectOneTwo,{ref:this._refOneTwo,isShow:r,isShowLabels:m,uri:s,oneCaption:o,oneJsonProp:e,twoCaption:i,msgOnNotSelected:n}),(0,h.jsx)(a.Z.ShowHide,{isShow:u,children:(0,h.jsx)(a.Z.DatesFragment,{ref:this._refDates,isShowLabels:m,initFromDate:d,initToDate:p,msgOnNotValidFormat:S,onTestDate:w})}),(0,h.jsx)(a.Z.ShowHide,{isShow:g,children:(0,h.jsx)(a.Z.RowCheckBox,{initValue:!1,caption:"Add Seria with Second YAxis",onCheck:this._hCheckSecondYAxis,onUnCheck:this._hUnCheckSecondYAxis})}),(0,h.jsx)(a.Z.ValidationMessages,{validationMessages:T})]})}})||T;var b,O=s(3014);const{Decor:V,crMenuMore:A}=a.Z,F=[{caption:"Default: Area",value:O.oX.AREA},{caption:"Scatter: Label Up",value:O.oX.SCATTER_UP},{caption:"Scatter: Label Down",value:O.oX.SCATTER_DOWN}];const L={Query:w,Type4:g,Type4A:x,Type5:(0,V.dialog)(b=class extends i.Component{constructor(t){super(t),this._handleSelectOne=t=>{this.one=t},this._handleLoad=()=>{this._handleWithValidationLoad(this._createValidationMessages(),this._createLoadOption)},this._createValidationMessages=()=>{const{oneCaption:t}=this.props;let o=[];this.one||o.push(this.props.msgOnNotSelected(t));const{isValid:s,msg:e}=this.twoThree.getValidation();s||(o=o.concat(e));const{isValid:i,datesMsg:n}=this.datesFragment.getValidation();return i||(o=o.concat(n)),o.isValid=0===o.length,o},this._createLoadOption=()=>{const{one:t,two:o}=this.twoThree.getValues(),{fromDate:s,toDate:e}=this.datesFragment.getValues(),i=this.chartType?this.chartType.value:void 0;return this.props.loadFn(this.props,{one:this.one,two:t,three:o,fromDate:s,toDate:e,hasSecondYAxis:this.hasSecondYAxis,seriaType:i})},this._handleClose=()=>{this._handleWithValidationClose()},this._hCheckSecondYAxis=()=>{this.hasSecondYAxis=!0},this._hUnCheckSecondYAxis=()=>{this.hasSecondYAxis=!1},this._handlerSelectChartType=t=>{this.chartType=t},this._refTwoThree=t=>this.twoThree=t,this._refDates=t=>this.datesFragment=t,this._menuMore=A(this,{toggleToolBar:this._toggleWithToolbar,onAbout:this._clickInfoWithToolbar}),this.toolbarButtons=this._createType2WithToolbar(t,{isShowOptions:!0}),this._commandButtons=this._crCommandsWithLoad(this),this.state={...this._isWithInitialState(),isShowDate:!1,isShowOptions:!1}}shouldComponentUpdate(t,o){return this.props===t||this.props.isShow!==t.isShow}render(){const{caption:t,isShow:o,onShow:s,onFront:e,oneCaption:i,oneURI:n,oneJsonProp:r,twoCaption:l,twoURI:c,twoJsonProp:d,threeCaption:p,msgOnNotSelected:S,initFromDate:w,initToDate:_,msgOnNotValidFormat:m,onTestDate:u,isChartType:g}=this.props,{isToolbar:T,isShowLabels:C,isShowDate:D,isShowOptions:x,validationMessages:b}=this.state;return(0,h.jsxs)(a.Z.DraggableDialog,{isShow:o,caption:t,menuModel:this._menuMore,commandButtons:this._commandButtons,onShowChart:s,onFront:e,onClose:this._handleClose,children:[(0,h.jsx)(a.Z.Toolbar,{isShow:T,buttons:this.toolbarButtons}),(0,h.jsx)(a.Z.SelectWithLoad,{isShow:o,isShowLabels:C,uri:n,jsonProp:r,caption:i,optionNames:"Items",onSelect:this._handleSelectOne}),(0,h.jsx)(a.Z.SelectOneTwo,{ref:this._refTwoThree,isShow:o,isShowLabels:C,uri:c,oneCaption:l,oneJsonProp:d,twoCaption:p,msgOnNotSelected:S}),(0,h.jsx)(a.Z.ShowHide,{isShow:D,children:(0,h.jsx)(a.Z.DatesFragment,{ref:this._refDates,isShowLabels:C,initFromDate:w,initToDate:_,msgOnNotValidFormat:m,onTestDate:u})}),(0,h.jsxs)(a.Z.ShowHide,{isShow:x,children:[g&&(0,h.jsx)(a.Z.RowInputSelect,{isShowLabels:C,caption:"Chart Type:",options:F,onSelect:this._handlerSelectChartType}),(0,h.jsx)(a.Z.RowCheckBox,{initValue:!1,caption:"Add Seria with Second YAxis",onCheck:this._hCheckSecondYAxis,onUnCheck:this._hUnCheckSecondYAxis})]}),(0,h.jsx)(a.Z.ValidationMessages,{validationMessages:b})]})}})||b}}}]);