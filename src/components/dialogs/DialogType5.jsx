import React from 'react';

import ZhDialog from '../ZhDialog';
import WithLoadOptions from '../dialogs/WithLoadOptions';
import WithValidation from '../dialogs/WithValidation';
import RowInputSelect from '../dialogs/RowInputSelect';
import ToolBarButton from '../ToolBarButton';

import DatesFragment from '../DatesFragment';
import ValidationMessagesFragment from '../ValidationMessagesFragment';

const defaultColumns = [
  {caption : 'Value', value: 1}
]

const DialogType5 = React.createClass({
  ...WithLoadOptions,
  ...WithValidation,

  getInitialState(){
    this.one = null;
    this.two = null;
    this.three = null;

    return {
      isLoadingOne : false,
      isLoadingOneFailed : false,
      optionOne : [],

      isLoadingTwo : false,
      isLoadingTwoFailed : false,
      optionTwo : [],

      optionThree : [
        {caption: 'Import', value: 1},
        {caption: 'Export', value: 3}
      ],

      validationMessages: []
    }
  },

  componentDidMount(){
    this._handlerLoadOne();
    this._handlerLoadTwo();
  },

  shouldComponentUpdate(nextProps, nextState){
    if (this.props !== nextProps){
       if (this.props.isShow === nextProps.isShow){
          return false;
       }
    }
    return true;
  },

  componentDidUpdate(prevProps, prevState){
    if (prevProps !== this.props){
       if (this.state.isLoadingOneFailed && this.props.isShow){
         this._handlerLoadOne();
       }
       if (this.state.isLoadingTwoFailed && this.props.isShow){
         this._handlerLoadTwo();
       }
    }
  },

  componetWillUnmount(){
    this._unmountWithLoadOptions();
  },

  _handlerLoadOne(){
    const {oneURI, oneJsonProp} = this.props;
    this._handlerWithLoadOptions(
          'optionOne', 'isLoadingOne', 'isLoadingOneFailed',
          oneURI, oneJsonProp
    );
  },
  _handlerLoadTwo(){
    const {twoURI, twoJsonProp} = this.props;
    this._handlerWithLoadOptions(
         'optionTwo', 'isLoadingTwo', 'isLoadingTwoFailed',
         twoURI, twoJsonProp
    );
  },
  _handlerSelectOne(one){
    this.one = one;
  },
  _handlerSelectTwo(two){
    this.two = two;
    if (two) {
      if (two.columns) {
        this.three = null;
        this.setState({optionThree: two.columns});
      } else {
        this.three = null;
        this.setState({optionThree: defaultColumns});
      }
    } else {
      this.three = null;
      this.setState({optionThree: []});
    }
  },
  _handlerSelectThree(three){
    this.three = three;
  },
  _handlerLoad(){
    this._handlerWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    );
  },
  _createValidationMessages(){
     const {oneCaption, twoCaption, threeCaption} = this.props;
     let msg = [];

     if (!this.one)    { msg.push(this.props.msgOnNotSelected(oneCaption));}
     if (!this.two)    { msg.push(this.props.msgOnNotSelected(twoCaption));}
     if (!this.three)  { msg.push(this.props.msgOnNotSelected(threeCaption));}

     const {isValid, datesMsg} = this.datesFragment.getValidation();
     if (!isValid) { msg = msg.concat(datesMsg); }
     msg.isValid = (msg.length === 0) ? true : false;
     return msg;
  },
  _createLoadOption(){
    const {fromDate, toDate} = this.datesFragment.getValues()
        , {fnValue, isTreeItem, dataColumn} = this.props;
    if (!isTreeItem){
      const _dataColumn = (this.three) ? this.three.value : 1;
      return {
         value : fnValue(this.one.value, this.two.value),
         fromDate: fromDate,
         toDate: toDate,
         dataColumn : _dataColumn
      }
    } else {
      return {
        value : fnValue(this.one.value, this.three.value),
        fromDate: fromDate,
        toDate: toDate,
        dataColumn : dataColumn
      }
    }
  },
  _handlerClose(){
    this._handlerWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  },


  render(){
    const {
           caption, oneCaption, twoCaption, threeCaption,
           isShow, onShow, onClose,
           initFromDate, initToDate, msgOnNotValidFormat, onTestDate
          } = this.props
        , {
           optionOne, isLoadingOne, isLoadingOneFailed,
           optionTwo, isLoadingTwo, isLoadingTwoFailed,
           optionThree,
           validationMessages
         } = this.state
        , _commandButtons = [
       <ToolBarButton
          key="a"
          type="TypeC"
          caption="Load"
          onClick={this._handlerLoad}
       />
    ];

    return(
        <ZhDialog
             caption={caption}
             isShow={isShow}
             commandButtons={_commandButtons}
             onShowChart={onShow}
             onClose={this._handlerClose}
         >
             <RowInputSelect
                caption={oneCaption}
                options={optionOne}
                optionNames={'Items'}
                isLoading={isLoadingOne}
                isLoadingFailed={isLoadingOneFailed}
                onLoadOption={this._handlerLoadOne}
                onSelect={this._handlerSelectOne}
             />
             <RowInputSelect
                caption={twoCaption}
                options={optionTwo}
                optionNames={'Items'}
                isLoading={isLoadingTwo}
                isLoadingFailed={isLoadingTwoFailed}
                onLoadOption={this._handlerLoadTwo}
                onSelect={this._handlerSelectTwo}
             />
             <RowInputSelect
               caption={threeCaption}
               options={optionThree}
               onSelect={this._handlerSelectThree}
             />
             <DatesFragment
                 ref={c => this.datesFragment = c}
                 initFromDate={initFromDate}
                 initToDate={initToDate}
                 msgOnNotValidFormat={msgOnNotValidFormat}
                 onTestDate={onTestDate}
             />
             <ValidationMessagesFragment
                 validationMessages={validationMessages}
             />
        </ZhDialog>
    );
  }
});

export default DialogType5
