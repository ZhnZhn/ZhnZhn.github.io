import React, { Component } from 'react';
import PropTypes from "prop-types";

import RowInputSelect from './RowInputSelect'
import RowInputText from './RowInputText'
import ValidationMessages from '../zhn/ValidationMessages'
import Button from './Button'
import RowButtons from './RowButtons'

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
    this._primaryBt = <Button.Primary
                         caption="Create"
                         title="Create New List"
                         onClick={this._handleCreate}
                      />
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
           caption="In Group:"
           options={groupOptions}
           //isUpdateOptions={isUpdateGroup}
           onSelect={this._handleSelectGroup}
        />
        <RowInputText
           ref={c => this.inputText = c}
           caption="List:"
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

export default ListCreatePane
