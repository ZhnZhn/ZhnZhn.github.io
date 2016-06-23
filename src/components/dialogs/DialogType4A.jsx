import React from 'react';

import ZhDialog from '../ZhDialog';
import WithLoadOptions from './WithLoadOptions';
import WithValidation from './WithValidation';
import ToolbarButtonCircle from './ToolbarButtonCircle';
import RowInputSelect from './RowInputSelect';
import ToolBarButton from '../ToolBarButton';

import DatesFragment from '../DatesFragment';
import ValidationMessagesFragment from '../ValidationMessagesFragment';
import ShowHide from '../zhn/ShowHide';

const defaultColumns = [];

const DialogType4A = React.createClass({
  ...WithLoadOptions,
  ...WithValidation,

  getInitialState(){
    this.one = null;
    this.two = null;

    this.toolbarButtons = [{ caption: 'D', onClick: this._handlerClickDate }];
    if (this.props.onClickInfo) {
      this.toolbarButtons.unshift({ caption: 'I', onClick: this._handlerClickInfo });
    }

    return {
      isShowDate : true,

      isLoadingOne : false,
      isLoadingOneFailed : false,
      optionOne : [],

      optionTwo : [],

      validationMessages: []
    }
  },

  componentDidMount(){
    this._handlerLoadOne();
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
    }
  },

  componetWillUnmount(){
    this._unmountWithLoadOptions();
  },

  _handlerClickInfo(){
    const {descrUrl, onClickInfo} = this.props;
    onClickInfo({ descrUrl });
  },

  _handlerClickDate(){
    this.setState({isShowDate: !this.state.isShowDate});
  },

  _handlerLoadOne(){
    const {oneURI, oneJsonProp} = this.props;
    this._handlerWithLoadOptions(
          'optionOne', 'isLoadingOne', 'isLoadingOneFailed',
          oneURI, oneJsonProp
    );
  },

  _handlerSelectOne(one){
    this.one = one;
    if (one) {
      if (one.columns) {
        this.two = null;
        this.setState({ optionTwo: one.columns });
      } else {
        this.two = null;
        this.setState({ optionTwo: defaultColumns });
      }
    } else {
      this.two = null;
      this.setState({ optionTwo: defaultColumns });
    }
  },
  _handlerSelectTwo(two){
    this.two = two;
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

     const {isValid, datesMsg} = this.datesFragment.getValidation();
     if (!isValid) { msg = msg.concat(datesMsg); }
     msg.isValid = (msg.length === 0) ? true : false;
     return msg;
  },
  _createLoadOption(){
    const {fromDate, toDate} = this.datesFragment.getValues()
        , {fnValue, dataColumn} = this.props;
    return {
         value : fnValue(this.one.value, this.two.value),
         fromDate: fromDate,
         toDate: toDate,
         dataColumn : dataColumn
      }
  },
  _handlerClose(){
    this._handlerWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  },


  render(){
    const {
           caption, oneCaption, twoCaption,
           isShow, onShow, onClose,
           initFromDate, initToDate, msgOnNotValidFormat, onTestDate
          } = this.props
        , {
           isShowDate,
           optionOne, isLoadingOne, isLoadingOneFailed,
           optionTwo,
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
             <ToolbarButtonCircle
                buttons={this.toolbarButtons}
             />
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
                onSelect={this._handlerSelectTwo}
             />
             <ShowHide isShow={isShowDate}>
               <DatesFragment
                 ref={c => this.datesFragment = c}
                 initFromDate={initFromDate}
                 initToDate={initToDate}
                 msgOnNotValidFormat={msgOnNotValidFormat}
                 onTestDate={onTestDate}
               />
             </ShowHide>
             <ValidationMessagesFragment
                 validationMessages={validationMessages}
             />
        </ZhDialog>
    );
  }
});

export default DialogType4A
