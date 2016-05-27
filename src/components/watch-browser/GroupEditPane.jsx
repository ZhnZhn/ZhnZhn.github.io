import React from 'react';

import RowInputSelect from './RowInputSelect';
import RowInputText from './RowInputText';
import ValidationMessagesFragment from '../ValidationMessagesFragment';
import ToolBarButton from '../ToolBarButton';

const Styles = {
  COMMAND_DIV : {
     cursor: 'default',
     float: 'right',
     marginTop: '8px',
     marginBottom: '10px',
     marginRight: '4px'
  }
}

const GroupEditPane = React.createClass({
  displayName : 'GroupEditPane',
  propTypes : {
    store : React.PropTypes.object,
    actionCompleted : React.PropTypes.string,
    actionFailed : React.PropTypes.string,
    forActionType : React.PropTypes.string,
    msgOnIsEmptyName : React.PropTypes.func,
    msgOnNotSelect : React.PropTypes.func,
    onRename : React.PropTypes.func,
    onClose : React.PropTypes.func
  },
  getInitialState(){
    const {store} = this.props;
    this.captionFrom = null;
    return {
      groupOptions : store.getWatchGroups(),
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
      if (data.forActionType === forActionType){
        this._handlerClear();
      }
      this.setState({groupOptions : store.getWatchGroups()});
    } else if (actionType === actionFailed && data.forActionType === forActionType){
      this.setState({validationMessages: data.messages});
    }
  },

  _handlerSelectGroup(item){
     if (item && item.caption){
       this.captionFrom = item.caption;
     } else {
       this.captionFrom = null;
     }
  },

  _handlerClear(){
    this.inputText.setValue('');
    if (this.state.validationMessages.length>0){
      this.setState({validationMessages:[]});
    }
  },
  _handlerRename(){
     const captionTo = this.inputText.getValue();
     if (captionTo && this.captionFrom) {
       this.props.onRename({captionFrom: this.captionFrom, captionTo});
     } else {
       const msg = [];
       if (!this.captionFrom){
         msg.push(this.props.msgOnNotSelect('Group From'));
       }
       if (!captionTo){
         msg.push(this.props.msgOnIsEmptyName('Group To'));
       }
       this.setState({validationMessages:msg});
     }
  },

  render(){
    const {onClose} = this.props
        , {isUpdateOptions, groupOptions, validationMessages} = this.state;

    return (
       <div>
          <RowInputSelect
             caption={'Group From:'}
             options={groupOptions}            
             onSelect={this._handlerSelectGroup}
          />
         <RowInputText
           ref={c => this.inputText = c}
           caption={'Group To:'}
         />
         <ValidationMessagesFragment
           validationMessages={validationMessages}
         />
         <div style={Styles.COMMAND_DIV}>
           <ToolBarButton
             type="TypeC"
             caption="Rename"
             onClick={this._handlerRename}
           />
           <ToolBarButton
             type="TypeC"
             caption="Clear"
             onClick={this._handlerClear}
           />
          <ToolBarButton
             type="TypeC"
             caption="Close"
             onClick={onClose}
          />
         </div>
       </div>
    );
  }
});

export default GroupEditPane
