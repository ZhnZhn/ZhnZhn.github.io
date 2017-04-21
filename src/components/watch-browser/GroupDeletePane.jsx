import React, { Component, PropTypes } from 'react';

import RowInputSelect from './RowInputSelect';
import ValidationMessages from '../zhn/ValidationMessages';
import ActionButton from '../zhn/ActionButton';

import STYLE from './Pane.Style';

class GroupDeletePane extends Component {
  static propTypes = {
    store: PropTypes.shape({
      listen: PropTypes.func,
      getWatchGroups: PropTypes.func
    }),
    actionCompleted: PropTypes.string,
    forActionType: PropTypes.string,
    msgOnNotSelect: PropTypes.func,
    onDelete: PropTypes.func,
    onClose: PropTypes.func
  }

  constructor(props){
    super()
    this.caption = null

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
    const { actionCompleted, forActionType, store } = this.props;
    if (actionType === actionCompleted) {
      if (data.forActionType === forActionType){
        this._handleClear()
      }
      this.setState({ groupOptions : store.getWatchGroups() })
    }
  }

  _handleSelectGroup = (item) => {
     if (item && item.caption){
       this.caption = item.caption
     } else {
       this.caption = null
     }
  }

  _handleClear = () => {
    if (this.state.validationMessages.length>0){
      this.setState({ validationMessages:[] })
    }
  }

  _handleDeleteGroup = () => {
     const { onDelete, msgOnNotSelect } = this.props;
     if (this.caption){
       onDelete({ caption:this.caption })
     } else {
       this.setState({ validationMessages:[msgOnNotSelect('Group')] })
     }
  }

  render(){
      const { onClose } = this.props
          , { groupOptions, validationMessages } = this.state;

      return (
         <div>
           <RowInputSelect
             caption={'Group:'}
             options={groupOptions}
             //isUpdateOptions={true}
             onSelect={this._handleSelectGroup}
           />
           <ValidationMessages
             validationMessages={validationMessages}
           />
           <div style={STYLE.COMMAND_DIV}>
             <ActionButton
               type="TypeC"
               caption="Delete"
               onClick={this._handleDeleteGroup}
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
}

export default GroupDeletePane
