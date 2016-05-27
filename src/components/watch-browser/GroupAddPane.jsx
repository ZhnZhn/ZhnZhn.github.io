import React from 'react';

import RowInputText from './RowInputText';
import ToolBarButton from '../ToolBarButton';
import ValidationMessagesFragment from '../ValidationMessagesFragment';

const Styles = {
  COMMAND_DIV : {
     cursor: 'default',
     float: 'right',
     marginTop: '8px',
     marginBottom: '10px',
     marginRight: '4px'
  }
}

const GroupAddPane = React.createClass({
  displayName : 'GroupAddPane',
  propTypes : {
    store : React.PropTypes.object,
    actionCompleted : React.PropTypes.string,
    actionFailed : React.PropTypes.string,
    forActionType : React.PropTypes.string,
    msgOnIsEmptyName : React.PropTypes.func,
    onCreate : React.PropTypes.func,
    onClose : React.PropTypes.func
  },
  getInitialState(){
    return {
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
    const {actionCompleted, actionFailed, forActionType, store} = this.props;
    if (actionType === actionCompleted && data.forActionType === forActionType){
       this._handlerClear();
    } else if (actionType === actionFailed && data.forActionType === forActionType){
       this.setState({validationMessages: data.messages});
    }
  },

  _handlerClear(){
    this.inputText.setValue('');
    if (this.state.validationMessages.length>0){
       this.setState({validationMessages: []});
    }
  },

  _handlerCreate(){
     const caption = this.inputText.getValue();
     if (caption){
       this.props.onCreate({caption});
     } else {
       this.inputText.setValue('');
       this.setState({validationMessages:[this.props.msgOnIsEmptyName('Group')]});
     }
  },

  render(){
    const {onClose} = this.props
        , {validationMessages} = this.state;
    return (
      <div>
        <RowInputText
           ref={c => this.inputText = c}
           caption={'Group:'}
        />
        <ValidationMessagesFragment
           validationMessages={validationMessages}
         />
        <div style={Styles.COMMAND_DIV}>          
         <ToolBarButton
            type="TypeC"
            caption="Create"
            onClick={this._handlerCreate}
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
    )
  }
})

export default GroupAddPane
