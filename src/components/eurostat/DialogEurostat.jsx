import React, { Component } from 'react';
//import PropTypes from "prop-types";

import D from '../dialogs/DialogCell'
import crMenuMore from '../dialogs/MenuMore'
import Decor from '../dialogs/decorators/Decorators'

@Decor.withToolbar
@Decor.withValidationLoad
class DialogEurostat extends Component {  
  /*
  static propTypes = {
    isShow: PropTypes.bool,
    caption: PropTypes.string,

    oneCaption: PropTypes.string,
    oneURI: PropTypes.string,
    oneJsonProp: PropTypes.string,

    twoCaption: PropTypes.string,
    twoURI: PropTypes.string,
    twoJsonProp: PropTypes.string,

    msgOnNotSelected: PropTypes.func,
    onShow: PropTypes.func,
    loadFn: PropTypes.func
  }
  */

  static defaultProps = {
    oneCaption: 'Item',
    oneJsonProp: 'items',
    twoCaption: 'Metric',
    twoJsonProp: 'metrics',
  }

  constructor(props){
    super();
    this.one = undefined;
    this.two = undefined;

    this._menuMore = crMenuMore(this, {
      toggleToolBar: this._toggleWithToolbar,
      onAbout: this._clickInfoWithToolbar
    })

    this.toolbarButtons = this._createType2WithToolbar(
      props, { noDate: true }
    )
    this._commandButtons = [
      <D.Button.Load onClick={this._handleLoad} />
    ];
    this.state = {
      isToolbar: true,
      isShowLabels: true,
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

  _handleSelectOne = (one) => {
    this.one = one;
  }
  _handleSelectTwo = (two) => {
    this.two = two;
  }

  _handleLoad = () => {
    this._handleWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    );
  }
  _createValidationMessages = () => {
     const { oneCaption, twoCaption } = this.props;
     let msg = [];

     if (!this.one) { msg.push(this.props.msgOnNotSelected(oneCaption)); }
     if (!this.two) { msg.push(this.props.msgOnNotSelected(twoCaption)); }

     msg.isValid = (msg.length === 0) ? true : false;
     return msg;
  }
  _createLoadOption = () => {
    return this.props.loadFn(
      this.props,
      { one : this.one, two : this.two }
    );
  }

  _handleClose = () => {
    this._handleWithValidationClose()
  }

  render(){
    const {
           caption, isShow, onShow, onFront,
           oneCaption, oneURI, oneJsonProp,
           twoCaption, twoURI, twoJsonProp
          } = this.props
        , {
            isToolbar,
            isShowLabels,
            validationMessages
          } = this.state;

    return(
        <D.DraggableDialog
             caption={caption}
             isShow={isShow}
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
               optionNames="Items"
               onSelect={this._handleSelectOne}
             />
             <D.SelectWithLoad
               isShow={isShow}
               isShowLabels={isShowLabels}
               uri={twoURI}
               jsonProp={twoJsonProp}
               caption={twoCaption}
               optionNames="Items"
               onSelect={this._handleSelectTwo}
             />
             <D.ValidationMessages
                 validationMessages={validationMessages}
             />
        </D.DraggableDialog>
    );
  }
}

export default DialogEurostat
