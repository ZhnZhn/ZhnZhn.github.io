import React from 'react';

import RowInputSelect from './RowInputSelect';
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

const GroupDeletePane = React.createClass({
  displayName : 'GroupDeletePane',
  propTypes : {
    store : React.PropTypes.object,
    actionCompleted : React.PropTypes.string,
    forActionType : React.PropTypes.string,
    msgOnNotSelect : React.PropTypes.func,
    onDelete : React.PropTypes.func,
    onClose : React.PropTypes.func
  },
  getInitialState(){
    const {store} = this.props;
    this.caption = null;
    return {
      groupOptions : store.getWatchGroups(),
      validationMessages : []
    }
  },

  componentDidMount(){
    this.unsubscribe = this.props.store.listen(this._onStore);
  },
  componentWillUnmount(){
    this.unsubscribe();
  },
  _onStore(actionType, data){
    const {actionCompleted, forActionType, store} = this.props;
    if (actionType === actionCompleted) {
      if (data.forActionType === forActionType){
        this._handlerClear();
      }
      this.setState({groupOptions : store.getWatchGroups()})
    }
  },

  _handlerSelectGroup(item){
     if (item && item.caption){
       this.caption = item.caption;
     } else {
       this.caption = null;
     }
  },

  _handlerClear(){
    if (this.state.validationMessages.length>0){
      this.setState({validationMessages:[]})
    }
  },

  _handlerDeleteGroup(){
     if (this.caption){
       this.props.onDelete({caption: this.caption})
     } else {
       this.setState({validationMessages:[this.props.msgOnNotSelect('Group')]});
     }
  },

  render(){
      const {onClose} = this.props
          , {groupOptions, validationMessages} = this.state;

      return (
         <div>
           <RowInputSelect
             caption={'Group:'}
             options={groupOptions}
             //isUpdateOptions={true}
             onSelect={this._handlerSelectGroup}
           />
           <ValidationMessages
             validationMessages={validationMessages}
           />
           <div style={Styles.COMMAND_DIV}>
             <ActionButton
               type="TypeC"
               caption="Delete"
               onClick={this._handlerDeleteGroup}
             />
            <ActionButton
               type="TypeC"
               caption="Close"
               onClick={onClose}
             />
           </div>
        </div>
    );
  }
});

export default GroupDeletePane
