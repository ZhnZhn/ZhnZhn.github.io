(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[673],{4376:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>u});var a,s=o(9679),i=o(2812),n=o(5893);const{Decor:r,crMenuMore:h}=i.Z,l=[{caption:"Export Value",value:{rg:2,measure:"TradeValue"}},{caption:"Export Weight",value:{rg:2,measure:"NetWeight"}},{caption:"Export Quantity",value:{rg:2,measure:"TradeQuantity"}},{caption:"Export Average Value Per Weight",value:{rg:2,measure:"avgPerWeight"}},{caption:"Export Average Value Per Quantity",value:{rg:2,measure:"avgPerQuantity"}},{caption:"Import Value",value:{rg:1,measure:"TradeValue"}},{caption:"Import Weight",value:{rg:1,measure:"NetWeight"}},{caption:"Import Quantity",value:{rg:1,measure:"TradeQuantity"}},{caption:"Import Average Value Per Weight",value:{rg:1,measure:"avgPerWeight"}},{caption:"Import Average Value Per Quantity",value:{rg:1,measure:"avgPerQuantity"}}];const u={UnDialog5:(0,r.dialog)(a=class extends s.Component{constructor(e){super(e),this._handleSelectOne=e=>{this.one=e},this._handleSelectTradeFlow=e=>{this.tradeFlow=e},this._handleLoad=()=>{this._handleWithValidationLoad(this._createValidationMessages(),this._createLoadOption)},this._createValidationMessages=()=>{const{msg:e=[]}=this.groupItem.getValidation();return e.isValid=0===e.length,e},this._createLoadOption=()=>{const{one:e,two:t}=this.groupItem.getValues();return this.props.loadFn(this.props,{one:this.one,two:e,three:t,tradeFlow:this.tradeFlow})},this._handleClose=()=>{this._handleWithValidationClose()},this._refGroupItem=e=>this.groupItem=e,this._menuMore=h(this,{toggleToolBar:this._toggleWithToolbar,onAbout:this._clickInfoWithToolbar}),this.toolbarButtons=this._createType2WithToolbar(e,{isShowOptions:!0,noDate:!0}),this._commandButtons=this._crCommandsWithLoad(this),this.state={...this._isWithInitialState(),isShowOptions:!1}}shouldComponentUpdate(e,t){return this.props===e||this.props.isShow!==e.isShow}render(){const{caption:e,isShow:t,onShow:o,onFront:a,oneCaption:s,oneURI:r,oneJsonProp:h,twoCaption:u,twoURI:p,twoJsonProp:c,threeCaption:d,msgOnNotSelected:g}=this.props,{isToolbar:m,isShowLabels:w,isShowOptions:S,validationMessages:_}=this.state;return(0,n.jsxs)(i.Z.DraggableDialog,{isShow:t,caption:e,menuModel:this._menuMore,commandButtons:this._commandButtons,onShowChart:o,onFront:a,onClose:this._handleClose,children:[(0,n.jsx)(i.Z.Toolbar,{isShow:m,buttons:this.toolbarButtons}),(0,n.jsx)(i.Z.SelectWithLoad,{isShow:t,isShowLabels:w,uri:r,jsonProp:h,caption:s,placeholder:"Default: All",onSelect:this._handleSelectOne}),(0,n.jsx)(i.Z.SelectOneTwo,{ref:this._refGroupItem,isShow:t,isShowLabels:w,uri:p,oneCaption:u,oneJsonProp:c,twoCaption:d,msgOnNotSelected:g}),(0,n.jsx)(i.Z.ShowHide,{isShow:S,children:(0,n.jsx)(i.Z.RowInputSelect,{isShowLabels:w,caption:"Trade Flow",options:l,placeholder:"Default: Export Value",onSelect:this._handleSelectTradeFlow})}),(0,n.jsx)(i.Z.ValidationMessages,{validationMessages:_})]})}})||a}}}]);