import React, { Component, PropTypes } from 'react';

import RowInputSelect from './RowInputSelect';
import RowInputText from './RowInputText';
import ValidationMessages from '../zhn/ValidationMessages';
import ActionButton from '../zhn/ActionButton';

import STYLE from './Pane.Style';

class ListCreatePane extends Component {
  static propTypes = {
    store: PropTypes.shape({
      listen: PropTypes.func,
      getWatchGroups: PropTypes.func
    }),
    actionCompleted: PropTypes.string,
    actionFailed: PropTypes.string,
    forActionType: PropTypes.string,
    msgOnNotSelect: PropTypes.func,
    msgOnIsEmptyName: PropTypes.func,
    onCreate: PropTypes.func,
    onClose: PropTypes.func
  }

  constructor(props){
    super()
    this.captionGroup = null

    this.state = {
      groupOptions : props.store.getWatchGroups(),
      isUpdateGroup : false,
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
    const { actionCompleted, actionFailed, forActionType, store } = this.props;
    if (actionType === actionCompleted){
        let isUpdateGroup = true;
        if (data.forActionType === forActionType){
          this._handleClear()
          isUpdateGroup = false
        }
        this.setState({
           groupOptions: store.getWatchGroups(),
           isUpdateGroup
        });
    } else if (actionType === actionFailed && data.forActionType === forActionType){
      this.setState({
        validationMessages: data.messages,
        isUpdateGroup:false
      })
    }
  }

  _handleSelectGroup = (item) => {
    if (item && item.caption){
      this.captionGroup = item.caption
    } else {
      this.captionGroup = null
    }
  }

  _handleClear = () => {
     this.inputText.setValue('')
     if (this.state.validationMessages.length>0){
       this.setState({ validationMessages: [], isUpdateGroup:false })
     }
  }

  _handleCreate = () => {
     const { onCreate, msgOnNotSelect, msgOnIsEmptyName } = this.props
         , captionList = this.inputText.getValue();
     if (this.captionGroup && captionList){
       onCreate({
          captionGroup : this.captionGroup,
          captionList : captionList
       });
     } else {
       const msg = [];
       if (!this.captionGroup) { msg.push(msgOnNotSelect('In Group')); }
       if (!captionList)       { msg.push(msgOnIsEmptyName('List')); }
       this.setState({ validationMessages:msg, isUpdateGroup:false });
     }
  }

  render(){
    const { onClose } = this.props
        , { groupOptions, validationMessages } = this.state;
    return (
      <div>
        <RowInputSelect
           caption={'In Group:'}
           options={groupOptions}
           //isUpdateOptions={isUpdateGroup}
           onSelect={this._handleSelectGroup}
        />
        <RowInputText
           ref={c => this.inputText = c}
           caption={'List:'}
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

export default ListCreatePane
