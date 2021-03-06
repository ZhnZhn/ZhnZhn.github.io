import { Component } from 'react';
//import PropTypes from "prop-types";

import Actions, { WatchActionTypes as WAT } from '../../flux/actions/WatchActions';
import Msg from '../../constants/MsgWatch';

import ModalDialog from '../zhn-moleculs/ModalDialog';
import Button from './Button';
import ValidationMessages from '../zhn/ValidationMessages';
import D from '../dialogs/DialogCell'

import withValidationLoad from '../dialogs/decorators/withValidationLoad';

const { addItem } = Actions;
const actionCompleted = WAT.EDIT_WATCH_COMPLETED
    , actionFailed =  WAT.EDIT_WATCH_FAILED
    , forActionType = WAT.ADD_ITEM;
const { notSelected } = Msg;

const S = {
  DIALOG: {
    width: 300
  },
  ITEM_CAPTION: {
    width: 100
  },
  CAPTION: {
    width: 70
  }
};

const SELECT_WIDTH = "216";

@withValidationLoad
class AddToWatchDialog extends Component {
  /*
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
  */

  constructor(props){
    super(props)
    this.groupCaption = null
    this.listCaption = null
    this._commandButtons = [
       <Button.Flat
         key="add"
         caption="Add"
         title="Add Item To Watch List"
         isPrimary={true}
         onClick={this._handleAdd}
        />
    ];
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

  UNSAFE_componentWillReceiveProps(nextProps){
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

      addItem({ caption, groupCaption, listCaption, config })
    } else {
      this._updateValidationMessages(validationMessages)
    }
  }
  _getValidationMessages = () => {
    const msg = [];
    if (!this.groupCaption)  { msg.push(notSelected('Group')) }
    if (!this.listCaption)   { msg.push(notSelected('List'))  }
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
        , {
            groupOptions, listOptions,
            validationMessages
          } = this.state;

    return (
      <ModalDialog
         style={S.DIALOG}
         caption="Add To Watch List"
         isShow={isShow}
         commandButtons={this._commandButtons}
         onClose={this._handleClose}
      >
        <D.Row.Text
          styleCaption={S.CAPTION}
          caption="Item:"
          text={caption}
        />
        <D.RowInputSelect
          caption="Group"
          captionStyle={S.CAPTION}
          width={SELECT_WIDTH}
          options={groupOptions}
          onSelect={this._handleSelectGroup}
        />
        <D.RowInputSelect
          caption="List"
          captionStyle={S.CAPTION}
          width={SELECT_WIDTH}
          onSelect={this._handleSelectList}
          options={listOptions}
        />
        <ValidationMessages
           validationMessages={validationMessages}
         />
      </ModalDialog>
    );
  }
}

export default AddToWatchDialog
