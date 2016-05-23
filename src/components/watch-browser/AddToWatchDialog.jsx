import React from 'react';

import WithValidation from '../dialogs/WithValidation';

import WatchActions from '../../flux/actions/WatchActions';

import ModalDialog from '../zhn/ModalDialog';
import ToolBarButton from '../ToolBarButton';
import ZhSelect from '../ZhSelect';
import InputSecret from '../zhn/InputSecret';
import ValidationMessagesFragment from '../ValidationMessagesFragment';

import DialogStyles from '../styles/DialogStyles'

const styles = DialogStyles;

const AddToWatchDialog = React.createClass({
  ...WithValidation,

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

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  },

  _handlerSelectGroup(group){
    const {store} = this.props;
    this.groupCaption = group.caption;
    if (group.lists){
      this.setState({listOptions : group.lists})
    }  else {
      this.setState({listOptions : []})
    }
  },
  _handlerSelectList(list){
      this.listCaption = list.caption;
  },
  _handlerAdd(){
    const validationMessages = this._getValidationMessages();
    if (validationMessages.isValid){
      const {data, onClose} = this.props
          , {caption, config} = data
          , {groupCaption, listCaption} = this;

      WatchActions.addItem({caption, groupCaption, listCaption, config});
      onClose();
    }
    this._updateValidationMessages(validationMessages);
  },
  _getValidationMessages(){
    const validationMessages = [];
    if (!this.groupCaption){
      validationMessages.push("Group is Required to Select");
    }
    if (!this.listCaption){
      validationMessages.push("List is Required to Select");
    }
    validationMessages.isValid = (validationMessages.length === 0) ? true : false;

    return validationMessages;
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
            Groups:
          </span>
          <ZhSelect
             width="250"
             onSelect={this._handlerSelectGroup}
             options={groupOptions}
           />
        </div>
        <div style={styles.rowDiv} key="2">
          <span style={styles.labelSpan}>
            Lists:
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
