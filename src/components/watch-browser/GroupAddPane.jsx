import React, { Component, PropTypes } from 'react';

import RowInputText from './RowInputText';
import ActionButton from '../zhn/ActionButton';
import ValidationMessages from '../zhn/ValidationMessages';

import STYLE from './Pane.Style';

class GroupAddPane extends Component {
  static propTypes = {
    store: PropTypes.shape({
      listen: PropTypes.func
    }),
    actionCompleted: PropTypes.string,
    actionFailed: PropTypes.string,
    forActionType: PropTypes.string,
    msgOnIsEmptyName: PropTypes.func,
    onCreate: PropTypes.func,
    onClose: PropTypes.func
  }

  constructor(props){
    super()
    this.state = {
      validationMessages : []
    }
  }

  componentDidMount(){
    this.unsubscribe = this.props.store.listen(this._onStore)
  }
  componentWillUnmount(){
    this.unsubscribe()
  }
  _onStore = (actionType, data) => {
    const { actionCompleted, actionFailed, forActionType } = this.props;
    if (actionType === actionCompleted && data.forActionType === forActionType){
       this._handleClear()
    } else if (actionType === actionFailed && data.forActionType === forActionType){
       this.setState({ validationMessages: data.messages })
    }
  }

  _handleClear = () => {
    this.inputText.setValue('')
    if (this.state.validationMessages.length>0){
       this.setState({ validationMessages: [] })
    }
  }

  _handleCreate = () => {
     const { onCreate, msgOnIsEmptyName } = this.props
          , caption = this.inputText.getValue();
     if (caption){
       onCreate({ caption })
     } else {
       this.inputText.setValue('')
       this.setState({ validationMessages:[msgOnIsEmptyName('Group')] })
     }
  }

  render(){
    const { onClose } = this.props
        , { validationMessages } = this.state;
    return (
      <div>
        <RowInputText
           ref={c => this.inputText = c}
           caption={'Group:'}
        />
        <ValidationMessages
           validationMessages={validationMessages}
         />
        <div style={STYLE.COMMAND_DIV}>
         <ActionButton
            type="TypeC"
            caption="Create"
            onClick={this._handleCreate}
         />
         <ActionButton
            type="TypeC"
            caption="Clear"
            onClick={this._handleClear}
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
}

export default GroupAddPane
