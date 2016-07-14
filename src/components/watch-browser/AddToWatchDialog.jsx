import React from 'react';

import WithValidation from '../dialogs/WithValidation';

import WatchActions from '../../flux/actions/WatchActions';
import {WatchActionTypes} from '../../flux/actions/WatchActions';
import Msg from '../../constants/Msg';


import ModalDialog from '../zhn/ModalDialog';
import ToolBarButton from '../ToolBarButton';
import ZhSelect from '../ZhSelect';
import ValidationMessagesFragment from '../ValidationMessagesFragment';

import DialogStyles from '../styles/DialogStyles'

const styles = DialogStyles;

const actionCompleted = WatchActionTypes.EDIT_WATCH_COMPLETED
    , actionFailed =  WatchActionTypes.EDIT_WATCH_FAILED
    , forActionType = WatchActionTypes.ADD_ITEM

const AddToWatchDialog = React.createClass({
  ...WithValidation,

  displayName : 'AddToWatchDialog',
  propTypes : {
    isShow  : React.PropTypes.bool.isRequired,
    data    : React.PropTypes.object.isRequired,
    store   : React.PropTypes.object,
    onClose : React.PropTypes.func.isRequired
  },
  getInitialState(){
    const {store} = this.props;
    this.groupCaption = null;
    this.listCaption = null;
    return {
      groupOptions : store.getWatchGroups(),
      listOptions : [],
      validationMessages : []
    }
  },

  componentDidMount(){
    this.unsubscribe = this.props.store.listen(this._onStore);
  },
  componetWillUnmount(){
    this.unsubscribe()
  },
  _onStore(actionType, data){
    if (actionType === actionCompleted && data.forActionType === forActionType){
       if (this.state.validationMessages.length>0){
         this.setState({validationMessages:[]});
       }
       this.props.onClose();
    } else if (actionType === actionFailed && data.forActionType === forActionType){
       this.setState({validationMessages:data.messages});
    }
  },

  componentWillReceiveProps(nextProps){
    if (nextProps !== this.props && nextProps.isShow !== this.props.isShow) {
      const groups = nextProps.store.getWatchGroups();
      if (groups !== this.state.groupOptions){
        this.groupCaption = null;
        this.listCaption = null;
        this.setState({groupOptions:groups, listOptions:[]});
      } else if (this.groupCaption){
        const lists = nextProps.store.getWatchListsByGroup(this.groupCaption);
        if (lists !== this.state.listOptions){
          this.listCaption = null;
          this.setState({listOptions:lists})
        }
      }
    }
  },

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  },

  _handlerSelectGroup(group){
    if (group && group.caption){
       const {store} = this.props;
       this.groupCaption = group.caption;
       if (group.lists){
         this.setState({listOptions : group.lists})
       }  else {
         this.setState({listOptions : []})
       }
    } else {
      this.groupCaption = null;
    }
  },
  _handlerSelectList(list){
      if (list && list.caption){
        this.listCaption = list.caption;
      } else {
        this.listCaption = null;
      }
  },
  _handlerAdd(){
    const validationMessages = this._getValidationMessages();
    if (validationMessages.isValid){
      const {data, onClose} = this.props
          , {caption, config} = data
          , {groupCaption, listCaption} = this;

      WatchActions.addItem({caption, groupCaption, listCaption, config});
    } else {
      this._updateValidationMessages(validationMessages);
    }
  },
  _getValidationMessages(){
    const msg = [];
    if (!this.groupCaption){ msg.push(Msg.NOT_SELECTED('Group'));}
    if (!this.listCaption) { msg.push(Msg.NOT_SELECTED('List'));}
    msg.isValid = (msg.length === 0) ? true : false;
    return msg;
  },

  _handlerClose(){
    if (this.state.validationMessages.length>0){
      this.setState({validationMessages:[]});
    }
    this.props.onClose();
  },

  render(){
    const {isShow, data, onClose} = this.props
        , {caption} = data
        , {groupOptions, listOptions, validationMessages} = this.state
        , commandButtons =[
       <ToolBarButton
          key="a"
          type="TypeC"
          caption="Add"
          onClick={this._handlerAdd}
       />
    ];
    return (
      <ModalDialog
         caption="Add To Watch List"
         isShow={isShow}
         commandButtons={commandButtons}
         onClose={this._handlerClose}
      >
        <div style={styles.rowDiv} key="1">
          <span style={styles.labelSpan}>
            Group:
          </span>
          <ZhSelect
             width="250"
             options={groupOptions}
             onSelect={this._handlerSelectGroup}
           />
        </div>
        <div style={styles.rowDiv} key="2">
          <span style={styles.labelSpan}>
            List:
          </span>
          <ZhSelect
             width="250"
             onSelect={this._handlerSelectList}
             options={listOptions}
           />
        </div>
        <div style={Object.assign({}, styles.rowDiv, {lineHeight: 2})} key="3">
          <span style={styles.labelSpan}>
            Item:
          </span>
          <span style={{fontWeight: 'bold'}}>
             {caption}
          </span>
        </div>
        <ValidationMessagesFragment
           key="4"
           validationMessages={validationMessages}
         />
      </ModalDialog>
    );
  }
});

export default AddToWatchDialog
