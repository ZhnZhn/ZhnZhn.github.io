import React from 'react';

import ZhDialog from '../ZhDialog';
import WithToolbar from '../dialogs/WithToolbar';
import WithValidation from '../dialogs/WithValidation';
import ToolbarButtonCircle from '../dialogs/ToolbarButtonCircle';
import SelectWithLoad from '../dialogs/SelectWithLoad';
import SelectParentChild from '../dialogs/SelectParentChild';
import ToolBarButton from '../ToolBarButton';

import ValidationMessagesFragment from '../ValidationMessagesFragment';


const EuroStatDialog = React.createClass({
  ...WithToolbar,
  ...WithValidation,

  getInitialState(){
    this.one = null;
    this.toolbarButtons = [
      { caption: 'I', onClick: this._clickInfoWithToolbar }
    ];

    return {
      validationMessages: []
    }
  },

  shouldComponentUpdate(nextProps, nextState){
    if (this.props !== nextProps){
       if (this.props.isShow === nextProps.isShow){
          return false;
       }
    }
    return true;
  },
  
  _handlerSelectOne(one){
    this.one = one;
  },

  _handlerLoad(){
    this._handlerWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    );
  },
  _createValidationMessages(){
     const { oneCaption } = this.props;
     let msg = [];

     if (!this.one) { msg.push(this.props.msgOnNotSelected(oneCaption)); }

     const { isValid:isValid1, msg:msg1 } = this.parentChild.getValidation();
     if (!isValid1) { msg = msg.concat(msg1); }

     msg.isValid = (msg.length === 0) ? true : false;
     return msg;
  },
  _createLoadOption(){
    const { parent:group, child:metric } = this.parentChild.getValues()
        , { loadId } = this.props;

    return {
      geo : this.one.value,
      group : group.value,
      metric : metric.value,
      loadId : loadId,
      itemCaption: this.one.caption,
      title : this.one.caption,
      subtitle : `${group.caption}:${metric.caption}`
    }
  },

  _handlerClose(){
    this._handlerWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  },

  render(){
    const {
           caption, isShow, onShow,
           oneCaption, oneURI, oneJsonProp,
           twoCaption, twoURI, twoJsonProp, threeCaption, msgOnNotSelected
          } = this.props
        , { validationMessages } = this.state
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
             <SelectWithLoad
               isShow={isShow}
               uri={oneURI}
               jsonProp={oneJsonProp}
               caption={oneCaption}
               optionNames={'Items'}
               onSelect={this._handlerSelectOne}
             />

             <SelectParentChild
                 ref={c => this.parentChild = c}
                 isShow={isShow}
                 uri={twoURI}
                 parentCaption={twoCaption}
                 parentOptionNames="Items"
                 parentJsonProp={twoJsonProp}
                 childCaption={threeCaption}
                 msgOnNotSelected={msgOnNotSelected}
             />

             <ValidationMessagesFragment
                 validationMessages={validationMessages}
             />
        </ZhDialog>
    );
  }
});

export default EuroStatDialog
