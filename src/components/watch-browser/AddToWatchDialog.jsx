import React, { Component, PropTypes } from 'react';

import WatchActions, { WatchActionTypes } from '../../flux/actions/WatchActions';
import Msg from '../../constants/Msg';

import ModalDialog from '../zhn/ModalDialog';
import ActionButton from '../zhn/ActionButton';
import ValidationMessages from '../zhn/ValidationMessages';
import RowInputSelect from '../dialogs/RowInputSelect';
import RowText from '../dialogs/RowText';

import withValidationLoad from '../dialogs/decorators/withValidationLoad';

const actionCompleted = WatchActionTypes.EDIT_WATCH_COMPLETED
    , actionFailed =  WatchActionTypes.EDIT_WATCH_FAILED
    , forActionType = WatchActionTypes.ADD_ITEM;

@withValidationLoad
class AddToWatchDialog extends Component {
  static propTypes = {
    isShow  : PropTypes.bool,
    data    : PropTypes.object,
    store   : PropTypes.shape({
      listen: PropTypes.func,
      getWatchGroups: PropTypes.func,
      getWatchListsByGroup: PropTypes.func
    }),
    onClose : PropTypes.func
  }

  constructor(props){
    super()
    this.groupCaption = null
    this.listCaption = null

    this.state = {
      groupOptions : props.store.getWatchGroups(),
      listOptions : [],
      validationMessages : []
    }
  }

  componentDidMount(){
    this.unsubscribe = this.props.store.listen(this._onStore)
  }
  componetWillUnmount(){
    this.unsubscribe()
  }
  _onStore = (actionType, data) => {
    if (actionType === actionCompleted && data.forActionType === forActionType){
       if (this.state.validationMessages.length>0){
         this.setState({ validationMessages:[] })
       }
       this.props.onClose()
    } else if (actionType === actionFailed && data.forActionType === forActionType){
       this.setState({ validationMessages:data.messages });
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps !== this.props && nextProps.isShow !== this.props.isShow) {
      const groups = nextProps.store.getWatchGroups();
      if (groups !== this.state.groupOptions){
        this.groupCaption = null
        this.listCaption = null
        this.setState({ groupOptions:groups, listOptions:[] })
      } else if (this.groupCaption){
        const lists = nextProps.store.getWatchListsByGroup(this.groupCaption);
        if (lists !== this.state.listOptions){
          this.listCaption = null
          this.setState({ listOptions:lists })
        }
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  }

  _handleSelectGroup = (group) => {
    if (group && group.caption){
       this.groupCaption = group.caption;
       if (group.lists){
         this.setState({ listOptions : group.lists })
       }  else {
         this.setState({ listOptions : [] })
       }
    } else {
      this.groupCaption = null
    }
  }
  _handleSelectList = (list) => {
      if (list && list.caption){
        this.listCaption = list.caption
      } else {
        this.listCaption = null
      }
  }
  _handleAdd = () => {
    const validationMessages = this._getValidationMessages();
    if (validationMessages.isValid){
      const { data } = this.props
          , { caption, config } = data
          , { groupCaption, listCaption } = this;

      WatchActions.addItem({ caption, groupCaption, listCaption, config })
    } else {
      this._updateValidationMessages(validationMessages)
    }
  }
  _getValidationMessages = () => {
    const msg = [];
    if (!this.groupCaption)  { msg.push(Msg.NOT_SELECTED('Group')) }
    if (!this.listCaption)   { msg.push(Msg.NOT_SELECTED('List'))  }
    msg.isValid = (msg.length === 0) ? true : false
    return msg;
  }

  _handleClose = () => {
    if (this.state.validationMessages.length>0){
      this.setState({ validationMessages:[] })
    }
    this.props.onClose()
  }

  render(){
    const { isShow, data } = this.props
        , { caption } = data
        , { groupOptions, listOptions, validationMessages } = this.state
        , commandButtons =[
             <ActionButton
               type="TypeC"
               caption="Add"
               onClick={this._handleAdd}
              />
          ];
    return (
      <ModalDialog
         caption="Add To Watch List"
         isShow={isShow}
         commandButtons={commandButtons}
         onClose={this._handleClose}
      >
        <RowInputSelect
          caption="Group:"
          options={groupOptions}
          onSelect={this._handleSelectGroup}
        />
        <RowInputSelect
          caption="List:"
          onSelect={this._handleSelectList}
          options={listOptions}
        />
        <RowText
          caption="Item:"
          text={caption}
        />
        <ValidationMessages
           validationMessages={validationMessages}
         />
      </ModalDialog>
    );
  }
}

export default AddToWatchDialog
