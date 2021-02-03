import { Component, createElement } from 'react';
//import PropTypes from "prop-types";

import ModalDialogContainer from '../zhn-containers/ModalDialogContainer';
import { ComponentActionTypes as CAT } from '../../flux/actions/ComponentActions';

import RouterModalDialog from './RouterModalDialog';

const _setTypeTo = (prevState, type, option) => {
    prevState.shows[type] = true
    prevState.data[type] = option
    prevState.isShow = true
    prevState.currentDialog = type
    return {...prevState};
};

const _renderDialogs = (
  store,
  { shows, data, dialogs },
  _handleClose
) => dialogs
  .map(({ type, comp }) => createElement(comp, {
     key: type,
     isShow: shows[type],
     data: data[type],
     store: store,
     onClose: _handleClose.bind(null, type)
}));


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

  _onStore = (actionType, option) => {
     if (actionType === CAT.SHOW_MODAL_DIALOG){
       const type = option.modalDialogType
       , { inits } = this.state;

       if (inits[type]){
         Promise.resolve()
           .then( _ => {
             this.setState(prevState => _setTypeTo(
               prevState, type, option
             ))
           })
       } else {
         RouterModalDialog.getDialog(type)
           .then(comp => this.setState(prevState => {
               prevState.dialogs.push({ type, comp })
               prevState.inits[type] = true
               return _setTypeTo(
                 prevState, type, option
               );
             })
           )
       }
     }
  }

  _hClose = (type) => {
    this.setState(prevState => {
      prevState.shows[type] = false
      prevState.isShow = false
      prevState.currentDialog = null
      return {...prevState};
    })
  }

  render(){
    const { store } = this.props
    , { isShow, currentDialog } = this.state;
    return (
      <ModalDialogContainer
         isShow={isShow}
         onClose={this._hClose.bind(null, currentDialog)}
      >
         {_renderDialogs(store, this.state, this._hClose)}
     </ModalDialogContainer>
    )
  }
}

export default DialogContainer
