import React, { Component, PropTypes } from 'react';

import DraggableDialog from '../zhn-moleculs/DraggableDialog';
import ToolbarButtonCircle from './ToolbarButtonCircle';
import SelectWithLoad from './SelectWithLoad';
import Button from './Button';
import ShowHide from '../zhn/ShowHide';
import RowInputSelect from './RowInputSelect';
import DatesFragment from '../zhn-moleculs/DatesFragment';
import ValidationMessages from '../zhn/ValidationMessages';

import withValidationLoad from './decorators/withValidationLoad';

const transformOptions = [
  { caption: "NO EFFECT: z[t]=y[t]", value: "none" },
  { caption: "ROW-ON-ROW CHANGE: z[t]=y[t]–y[t-1]", value: "diff" },
  { caption: "ROW-ON-ROW % CHANGE: z[t]=(y[t]–y[t-1])/y[t-1]", value: "rdiff" },
  { caption: "LATEST VALUE AS % INCREMENT: z[t]=(y[latest]–y[t])/y[t]", value: "rdiff_from" },
  { caption: "SCALE SERIES TO START AT 100: z[t]=y[t]÷y[0]*100", value: "normalize" }
]

@withValidationLoad
class DialogType3 extends Component {
  static propTypes = {
    isShow: PropTypes.bool,
    caption: PropTypes.string,
    itemCaption: PropTypes.string,
    optionURI: PropTypes.string,
    optionsJsonProp: PropTypes.string,
    optionNames: PropTypes.string,
    initFromDate: PropTypes.string,
    initToDate: PropTypes.string,
    msgOnNotValidFormat: PropTypes.func,
    onTestDate: PropTypes.func,
    onShow: PropTypes.func,

    descrUrl: PropTypes.string,
    isTransform: PropTypes.bool,
    onClickInfo: PropTypes.func,
    loadFn: PropTypes.func
  }

  constructor(props){
    super(props);

    this.stock = undefined
    this.transform = undefined
    this.toolbarButtons = []
    if (props.descrUrl) {
      this.toolbarButtons.push({
        caption: 'I', onClick: this._handleClickInfo
      })
    }
    if (props.isTransform){
      this.toolbarButtons.push({
        caption: 'T', onClick: this._handleClickTransform
      })
    }
    this._commandButtons = [
      <Button.Load onClick={this._handleLoad} />
    ]
    this.state = {
           isShowTransform: false,
           validationMessages: []
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

  _handleClickInfo = () => {
    const {descrUrl, onClickInfo} = this.props;
    onClickInfo({ descrUrl });
  }
  _handleClickTransform = () => {
    this.setState(prevState => {
      return { isShowTransform: !prevState.isShowTransform };
    })
  }
  _handleSelectTransform = (option) => {
    this.transform = option
  }

  _handleSelectStock = (stock) => {
    this.stock = stock
  }

  _handleLoad = (event) => {
    event.target.focus();
    this._handleWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    );
  }
  _createValidationMessages = () => {
    const { itemCaption='Stock' } = this.props;
    let msg = [];
    if (!this.stock) { msg.push(this.props.msgOnNotSelected(itemCaption));}
    const {isValid, datesMsg} = this.datesFragment.getValidation();
    if (!isValid) { msg = msg.concat(datesMsg); }
    msg.isValid = (msg.length === 0) ? true : false;
    return msg;
  }

  _createLoadOption = () => {
    const { fromDate, toDate } = this.datesFragment.getValues()
    return this.props.loadFn(
      this.props,
      { stock : this.stock, fromDate, toDate, transform: this.transform }
    );
  }

  _handleClose = () => {
    this._handleWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  }

  render(){
    const {
            caption, isShow, onShow, onFront,
            optionURI, optionsJsonProp,
            itemCaption='Stock:', optionNames='Stocks',
            isWithInputStock,
            initFromDate, initToDate, msgOnNotValidFormat, onTestDate
          } = this.props
        , { isShowTransform, validationMessages } = this.state;

    return (
       <DraggableDialog
           caption={caption}
           isShow={isShow}
           commandButtons={this._commandButtons}
           onShowChart={onShow}
           onFront={onFront}
           onClose={this._handleClose}
       >
         <ToolbarButtonCircle
           buttons={this.toolbarButtons}
         />
         <SelectWithLoad
           isShow={isShow}
           uri={optionURI}
           jsonProp={optionsJsonProp}
           caption={itemCaption}
           optionNames={optionNames}
           isWithInput={isWithInputStock}
           onSelect={this._handleSelectStock}
         />
         <ShowHide isShow={isShowTransform}>
           <RowInputSelect
             caption="Transform:"
             options={transformOptions}
             onSelect={this._handleSelectTransform}
           />
         </ShowHide>
         <DatesFragment
            ref={c => this.datesFragment = c}
            initFromDate={initFromDate}
            initToDate={initToDate}
            msgOnNotValidFormat={msgOnNotValidFormat}
            onTestDate={onTestDate}
         />
         <ValidationMessages
            validationMessages={validationMessages}
         />
      </DraggableDialog>
    );
  }
}

export default DialogType3
