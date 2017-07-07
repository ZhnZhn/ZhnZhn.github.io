import React, { Component, PropTypes } from 'react'

import RowInputSelect from './RowInputSelect'
import RowInputText from './RowInputText'
import ValidationMessages from '../zhn/ValidationMessages'
import Button from './Button'
import RowButtons from './RowButtons'

class GroupEditPane extends Component {
  static propTypes = {
    store: PropTypes.shape({
      listen: PropTypes.func,
      getWatchGroups: PropTypes.func
    }),
    actionCompleted: PropTypes.string,
    actionFailed: PropTypes.string,
    forActionType: PropTypes.string,
    msgOnIsEmptyName: PropTypes.func,
    msgOnNotSelect: PropTypes.func,
    onRename: PropTypes.func,
    onClose: PropTypes.func
  }

  constructor(props){
    super()
    this.captionFrom = null
    this._primaryBt = <Button.Primary
                         caption="Edit"
                         title="Edit Group Name"
                         onClick={this._handleRename}
                      />
    this.state = {
      groupOptions : props.store.getWatchGroups(),
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
    const { actionCompleted, actionFailed, forActionType, store } = this.props
    if (actionType === actionCompleted){
      if (data.forActionType === forActionType){
        this._handleClear()
      }
      this.setState({ groupOptions : store.getWatchGroups() })
    } else if (actionType === actionFailed && data.forActionType === forActionType){
      this.setState({ validationMessages: data.messages })
    }
  }

  _handleSelectGroup = (item) => {
     if (item && item.caption){
       this.captionFrom = item.caption
     } else {
       this.captionFrom = null
     }
  }

  _handleClear = () => {
    this.inputText.setValue('')
    if (this.state.validationMessages.length>0){
      this.setState({ validationMessages:[] })
    }
  }
  _handleRename = () => {
     const { onRename, msgOnNotSelect, msgOnIsEmptyName } = this.props
         , captionTo = this.inputText.getValue();
     if (captionTo && this.captionFrom) {
       onRename({ captionFrom: this.captionFrom, captionTo })
     } else {
       const msg = [];
       if (!this.captionFrom){
         msg.push(msgOnNotSelect('Group From'))
       }
       if (!captionTo){
         msg.push(msgOnIsEmptyName('Group To'))
       }
       this.setState({ validationMessages:msg })
     }
  }

  render(){
    const { onClose } = this.props
        , {
            groupOptions, validationMessages
          } = this.state;

    return (
       <div>
          <RowInputSelect
             caption="Group From:"
             options={groupOptions}
             onSelect={this._handleSelectGroup}
          />
         <RowInputText
           ref={c => this.inputText = c}
           caption="Group To:"
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
    );
  }
}

export default GroupEditPane
