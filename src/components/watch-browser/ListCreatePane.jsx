import React from 'react';

import RowInputSelect from './RowInputSelect';
import RowInputText from './RowInputText';
import ValidationMessages from '../zhn/ValidationMessages';
import ActionButton from '../zhn/ActionButton';

const Styles = {
  COMMAND_DIV : {
     cursor: 'default',
     float: 'right',
     marginTop: '8px',
     marginBottom: '10px',
     marginRight: '4px'
  }
}

const ListCreatePane = React.createClass({
  displayName : 'ListCreatePane',
  propTypes : {
    store : React.PropTypes.object,
    actionCompleted : React.PropTypes.string,
    actionFailed : React.PropTypes.string,
    forActionType : React.PropTypes.string,
    msgOnNotSelect : React.PropTypes.func,
    msgOnIsEmptyName : React.PropTypes.func,
    onCreate : React.PropTypes.func,
    onClose : React.PropTypes.func
  },

  getInitialState(){
    const {store} = this.props;
    this.captionGroup = null;
    return {
      groupOptions : store.getWatchGroups(),
      isUpdateGroup : false,
      validationMessages : []
    }
  },

  componentDidMount(){
    this.unsubscribe = this.props.store.listen(this._onStore)
  },
  componentWillUnmount(){
    this.unsubscribe()
  },
  _onStore(actionType, data){
    const {actionCompleted, actionFailed, forActionType, store} = this.props;
    if (actionType === actionCompleted){
        let isUpdateGroup = true;
        if (data.forActionType === forActionType){
          this._handlerClear();
          isUpdateGroup = false;
        }
        this.setState({groupOptions : store.getWatchGroups(), isUpdateGroup});
    } else if (actionType === actionFailed && data.forActionType === forActionType){
      this.setState({validationMessages: data.messages, isUpdateGroup:false})
    }
  },

  _handlerSelectGroup(item){
    if (item && item.caption){
      this.captionGroup = item.caption;
    } else {
      this.captionGroup = null;
    }
  },

  _handlerClear(){
     this.inputText.setValue('');
     if (this.state.validationMessages.length>0){
       this.setState({validationMessages: [], isUpdateGroup:false});
     }
  },

  _handlerCreate(){
     const captionList = this.inputText.getValue();
     if (this.captionGroup && captionList){
       this.props.onCreate({
          captionGroup : this.captionGroup,
          captionList : captionList
       });
     } else {
       const {msgOnNotSelect, msgOnIsEmptyName} = this.props
           , msg = [];
       if (!this.captionGroup) { msg.push(msgOnNotSelect('In Group')); }
       if (!captionList)       { msg.push(msgOnIsEmptyName('List')); }
       this.setState({validationMessages:msg, isUpdateGroup:false});
     }
  },

  render(){
    const { onClose } = this.props
        , { groupOptions, validationMessages } = this.state;
    return (
      <div>
        <RowInputSelect
           caption={'In Group:'}
           options={groupOptions}
           //isUpdateOptions={isUpdateGroup}
           onSelect={this._handlerSelectGroup}
        />
        <RowInputText
           ref={c => this.inputText = c}
           caption={'List:'}
        />
        <ValidationMessages
          validationMessages={validationMessages}
        />
        <div style={Styles.COMMAND_DIV}>
         <ActionButton
            type="TypeC"
            caption="Create"
            onClick={this._handlerCreate}
         />
         <ActionButton
            type="TypeC"
            caption="Clear"
            onClick={this._handlerClear}
         />
         <ActionButton
            type="TypeC"
            caption="Close"
            onClick={onClose}
         />
       </div>
      </div>
    )
  }

});

export default ListCreatePane
