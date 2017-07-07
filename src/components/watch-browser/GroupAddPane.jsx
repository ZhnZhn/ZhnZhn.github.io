import React, { Component, PropTypes } from 'react'

import RowInputText from './RowInputText'
import Button from './Button'
import RowButtons from './RowButtons'
import ValidationMessages from '../zhn/ValidationMessages'

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
    this._primaryBt = <Button.Primary
                         caption="Create"
                         title="Create New Group"
                         onClick={this._handleCreate}
                      />
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
           caption="Group:"
        />
        <ValidationMessages
           validationMessages={validationMessages}
         />
         <RowButtons
            Primary={this._primaryBt}
            onClear={this._handleClear}
            onClose={onClose}
         />
      </div>
    )
  }
}

export default GroupAddPane
