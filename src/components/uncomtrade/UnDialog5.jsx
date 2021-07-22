import { Component } from 'react';

import D from '../dialogs/DialogCell';

const { Decor, crMenuMore } = D;

const TRADE_FLOW_OPTIONS = [
  { caption: "Export Value", value: { rg: 2, measure: "TradeValue" } },
  { caption: "Export Weight", value: { rg: 2, measure: "NetWeight" } },
  { caption: "Export Quantity", value: { rg: 2, measure: "TradeQuantity" } },
  { caption: "Export Average Value Per Weight", value: { rg: 2, measure: "avgPerWeight" } },
  { caption: "Export Average Value Per Quantity", value: { rg: 2, measure: "avgPerQuantity" } },
  { caption: "Import Value", value: { rg: 1, measure: "TradeValue" } },
  { caption: "Import Weight", value: { rg: 1, measure: "NetWeight" } },
  { caption: "Import Quantity", value: { rg: 1, measure: "TradeQuantity" } },
  { caption: "Import Average Value Per Weight", value: { rg: 1, measure: "avgPerWeight" } },
  { caption: "Import Average Value Per Quantity", value: { rg: 1, measure: "avgPerQuantity" } }
];

@Decor.dialog
class UnDialog5 extends Component {

  constructor(props){
    super(props)

    this._menuMore = crMenuMore(this, {
      toggleToolBar: this._toggleWithToolbar,
      onAbout: this._clickInfoWithToolbar
    })

    this.toolbarButtons = this._createType2WithToolbar(
      props, { isShowOptions: true, noDate: true })

    this._commandButtons = this._crCommandsWithLoad(this)

    this.state = {
      ...this._isWithInitialState(),
      isShowOptions: false
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.props !== nextProps){
       if (this.props.isShow === nextProps.isShow){
          return false;
       }
    }
    return true;
  }

  _handleSelectOne = (one) => {
    this.one = one;
  }
  _handleSelectTradeFlow = (tradeFlow) => {
    this.tradeFlow = tradeFlow
  }

  _handleLoad = () => {
    this._handleWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    );
  }
  _createValidationMessages = () => {
     const { msg=[] } = this.groupItem.getValidation();

     msg.isValid = msg.length === 0 ? true : false;
     return msg;
  }

  _createLoadOption = () => {
    const { one:two, two:three } = this.groupItem.getValues()

    return this.props.loadFn(
      this.props, {
      one : this.one, two, three,
      tradeFlow: this.tradeFlow
    });
  }

  _handleClose = () => {
    this._handleWithValidationClose()
  }

  _refGroupItem = c => this.groupItem = c

  render(){
    const {
       caption, isShow, onShow, onFront,
       oneCaption, oneURI, oneJsonProp,
       twoCaption, twoURI, twoJsonProp, threeCaption, msgOnNotSelected,
    } = this.props
    , {
      isToolbar,
      isShowLabels,
      isShowOptions,
      validationMessages
    } = this.state;

    return(
        <D.DraggableDialog
             isShow={isShow}
             caption={caption}
             menuModel={this._menuMore}
             commandButtons={this._commandButtons}
             onShowChart={onShow}
             onFront={onFront}
             onClose={this._handleClose}
         >
             <D.Toolbar
                isShow={isToolbar}
                buttons={this.toolbarButtons}
             />
             <D.SelectWithLoad
               isShow={isShow}
               isShowLabels={isShowLabels}
               uri={oneURI}
               jsonProp={oneJsonProp}
               caption={oneCaption}
               placeholder="Default: All"
               onSelect={this._handleSelectOne}
             />

             <D.SelectOneTwo
                 ref={this._refGroupItem}
                 isShow={isShow}
                 isShowLabels={isShowLabels}
                 uri={twoURI}
                 oneCaption={twoCaption}
                 oneJsonProp={twoJsonProp}
                 twoCaption={threeCaption}
                 msgOnNotSelected={msgOnNotSelected}
             />
             <D.ShowHide isShow={isShowOptions}>
               <D.RowInputSelect
                 isShowLabels={isShowLabels}
                 caption="Trade Flow"
                 options={TRADE_FLOW_OPTIONS}
                 placeholder="Default: Export Value"
                 onSelect={this._handleSelectTradeFlow}
               />
             </D.ShowHide>
             <D.ValidationMessages
                 validationMessages={validationMessages}
             />
        </D.DraggableDialog>
    );
  }
}

export default UnDialog5
