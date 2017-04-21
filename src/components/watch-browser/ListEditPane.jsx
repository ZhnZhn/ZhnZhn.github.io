import React, { Component, PropTypes } from 'react';

import FragmentSelectGroupList from './FragmentSelectGroupList';
import RowInputText from './RowInputText';
import ValidationMessages from '../zhn/ValidationMessages';
import ActionButton from '../zhn/ActionButton';

import STYLE from './Pane.Style'

class ListEditPane extends Component {
  static propTypes = {
    store: PropTypes.shape({
      listen: PropTypes.func,
      getWatchGroups: PropTypes.func
    }),
    actionCompleted: PropTypes.string,
    forActionType: PropTypes.string,
    onRename: PropTypes.func,
    onClose: PropTypes.func
  }

  constructor(props){
    super()
    this.state = {
      groupOptions : props.store.getWatchGroups(),
      listOptions : [],
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
        if (data.forActionType === forActionType){
          this._handleClear()
        }
        this.setState({ groupOptions : store.getWatchGroups() })
    } else if (actionType === actionFailed && data.forActionType === forActionType){
      this.setState({ validationMessages:data.messages })
    }
  }

  _handleClear = () => {
     this.inputText.setValue('');
     if (this.state.validationMessages.length>0){
       this.setState({ validationMessages:[] })
     }
  }

  _handleRename = () => {
    const { onRename, msgOnIsEmptyName, msgOnNotSelect } = this.props
        , { captionGroup, captionList } = this.selectGroupList.getValue()
        , captionListTo = this.inputText.getValue();
    if (captionGroup && captionList && captionListTo){
      onRename({
        captionGroup : captionGroup,
        captionListFrom : captionList,
        captionListTo : captionListTo
      })
    } else {
      const msg = [];
      if (!captionGroup) { msg.push(msgOnNotSelect('Group')) }
      if (!captionList)  { msg.push(msgOnNotSelect('List From')) }
      if (!captionListTo){ msg.push(msgOnIsEmptyName('List To')) }
      this.setState({ validationMessages:msg })
    }
  }

  render(){
    const { store, onClose } = this.props
        , { groupOptions, validationMessages } = this.state;
    return (
      <div>
         <FragmentSelectGroupList
           ref={c => this.selectGroupList = c}
           store={store}
           groupCaption={'In Group:'}
           groupOptions={groupOptions}
           listCaption={'List From:'}
         />
         <RowInputText
            ref={c => this.inputText = c}
            caption={'List To:'}
         />
         <ValidationMessages
           validationMessages={validationMessages}
         />
         <div style={STYLE.COMMAND_DIV}>
            <ActionButton
               type="TypeC"
               caption="Rename"
               onClick={this._handleRename}
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
    );
  }
}

export default ListEditPane
