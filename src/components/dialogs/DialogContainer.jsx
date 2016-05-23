import React from 'react';

import ModalDialogContainer from '../zhn/ModalDialogContainer';
import AlertDialog from './AlertDialog';
import SettingsDialog from '../header/SettingsDialog';
import AddToWatchDialog from '../watch-browser/AddToWatchDialog';
import LoadItemDialog from '../watch-browser/LoadItemDialog';

import {ComponentActionTypes} from '../../flux/actions/ComponentActions';
import {ModalDialog} from '../../constants/Type';

const _hmDialogs = {
  [ModalDialog.ALERT] : AlertDialog,
  [ModalDialog.SETTINGS] : SettingsDialog,
  [ModalDialog.ADD_TO_WATCH] : AddToWatchDialog,
  [ModalDialog.LOAD_ITEM] : LoadItemDialog
}

const DialogContainer = React.createClass({
  getInitialState(){
    return {
      isShow : false,
      inits : {},
      shows : {},
      data : {},
      dialogs : [],
      currentDialog : null
    }
  },

  componentDidMount: function(){
    this.unsubscribe = this.props.store.listen(this._onStore);
  },
  componentWillUnmount: function(){
    this.unsubscribe();
  },
  _onStore(actionType, option){
     if (actionType === ComponentActionTypes.SHOW_MODAL_DIALOG){
       const type = option.modalDialogType
           , {inits, shows, data, dialogs } = this.state;

       data[type] = option;
       shows[type] = true;
       if (inits[type]){
         this.setState({isShow: true, currentDialog: type, shows, data})
       } else {
         dialogs.push({type : type, comp : _hmDialogs[type]});
         inits[type] = true
         this.setState({isShow: true, currentDialog: type, shows, data, dialogs});
       }
     }
  },

  _handlerClose(type){
    this.state.shows[type] = false;
    this.setState({isShow : false, currentDialog: null, shows : this.state.shows})
  },

  _renderDialogs(){
    const {store} = this.props
        , {shows, data} = this.state;

    return this.state.dialogs.map((dialog, index) => {
      const {type, comp} = dialog
      return React.createElement(comp, {
           key: type,
           isShow: shows[type],
           data: data[type],
           store : store,
           onClose: this._handlerClose.bind(null, type)})
    })
  },
  render(){
    const {isShow, currentDialog} = this.state;

    return (
      <ModalDialogContainer
          isShow={isShow}
          onClose={this._handlerClose.bind(null, currentDialog)}
      >
         {this._renderDialogs()}
     </ModalDialogContainer>
    )
  }
});

export default DialogContainer
