import { Component, createElement } from 'react';
//import PropTypes from "prop-types";

import ModalDialogContainer from '../zhn-containers/ModalDialogContainer';
import { ComponentActionTypes as CAT } from '../../flux/actions/ComponentActions';

import RouterModalDialog from './RouterModalDialog';

class DialogContainer extends Component {
  /*
  static propTypes = {
    store: PropTypes.shape({
      listen: PropTypes.func
    })
  }
  */

  state = {
    isShow: false,
    inits: {},
    shows: {},
    data: {},
    dialogs: [],
    currentDialog: null
  }

  componentDidMount(){
    this.unsubscribe = this.props.store.listen(this._onStore)
  }
  componentWillUnmount(){
    this.unsubscribe()
  }

  _setTypeTo = (prevState, type, option) => {
      prevState.shows[type] = true
      prevState.data[type] = option
      prevState.isShow = true
      prevState.currentDialog = type
      return prevState;
  }
  _onStore = (actionType, option) => {
     if (actionType === CAT.SHOW_MODAL_DIALOG){
       const type = option.modalDialogType
          , { inits } = this.state;

       if (inits[type]){
         this.setState(prevState => this._setTypeTo(
           prevState, type, option
         ))
       } else {
         RouterModalDialog.getDialog(type)
           .then(comp => this.setState(prevState => {
               prevState.dialogs.push({ type, comp })
               prevState.inits[type] = true
               return this._setTypeTo(
                 prevState, type, option
               );
             })
           )
       }
     }
  }

  _handleClose = (type) => {
    this.setState(prevState => {
      prevState.shows[type] = false
      prevState.isShow = false
      prevState.currentDialog = null
      return prevState;
    })
  }

  _renderDialogs = () => {
    const { store } = this.props
        , {
            shows, data, dialogs,
          } = this.state;

    return dialogs
      .map(dialog => {
        const { type, comp } = dialog;
        return createElement(comp, {
           key: type,
           isShow: shows[type],
           data: data[type],
           store: store,
           onClose: this._handleClose.bind(null, type)
        });
      });
  }

  render(){
    const { isShow, currentDialog } = this.state;
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
