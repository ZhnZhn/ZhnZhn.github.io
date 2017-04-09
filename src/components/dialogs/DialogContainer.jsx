import React, { Component, PropTypes } from 'react';

import ModalDialogContainer from '../zhn/ModalDialogContainer';
import {ComponentActionTypes} from '../../flux/actions/ComponentActions';

import RouterModalDialog from './RouterModalDialog';
const _hmDialogs = RouterModalDialog;

class DialogContainer extends Component {
  static propTypes = {
    store: PropTypes.shape({
      listen: PropTypes.func
    })
  }

  state = {
    isShow : false,
    inits : {},
    shows : {},
    data : {},
    dialogs : [],
    currentDialog : null
  }

  componentDidMount(){
    this.unsubscribe = this.props.store.listen(this._onStore);
  }
  componentWillUnmount(){
    this.unsubscribe();
  }
  _onStore = (actionType, option) => {
     if (actionType === ComponentActionTypes.SHOW_MODAL_DIALOG){
       const type = option.modalDialogType
           , { inits, shows, data, dialogs } = this.state;
       
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
  }

  _handleClose = (type) => {
    this.state.shows[type] = false;
    this.setState({isShow : false, currentDialog: null, shows : this.state.shows})
  }

  _renderDialogs = () => {
    const {store} = this.props
        , {shows, data} = this.state;

    return this.state.dialogs.map((dialog, index) => {
      const {type, comp} = dialog
      return React.createElement(comp, {
           key: type,
           isShow: shows[type],
           data: data[type],
           store : store,
           onClose: this._handleClose.bind(null, type)})
    })
  }

  render(){
    const {isShow, currentDialog} = this.state;

    return (
      <ModalDialogContainer
          isShow={isShow}
          onClose={this._handleClose.bind(null, currentDialog)}
      >
         {this._renderDialogs()}
     </ModalDialogContainer>
    )
  }
}

export default DialogContainer
