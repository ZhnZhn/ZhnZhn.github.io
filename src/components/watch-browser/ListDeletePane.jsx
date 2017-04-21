import React, { Component, PropTypes } from 'react';

import FragmentSelectGroupList from './FragmentSelectGroupList';
import ValidationMessages from '../zhn/ValidationMessages';
import ActionButton from '../zhn/ActionButton';

import STYLE from './Pane.Style';

class ListDeletePane extends Component {
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
    if (actionType === actionCompleted){
        if (data.forActionType === forActionType) {
          this._handleClear()
        }
        this.setState({ groupOptions : store.getWatchGroups() })
    }
  }

  _handleClear = () => {
    if (this.state.validationMessages.length>0){
      this.setState({ validationMessages: [] })
    }
  }

  _handleDelete = () => {
      const { onDelete, msgOnNotSelect } = this.props
          , { captionGroup, captionList } = this.selectGroupList.getValue();
      if (captionGroup && captionList){
        onDelete({ captionGroup, captionList })
      } else {
        const msg = [];
        if (!captionGroup) { msg.push(msgOnNotSelect('Group')) }
        if (!captionList)  { msg.push(msgOnNotSelect('List'))  }
        this.setState({ validationMessages: msg })
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
           listCaption={'List:'}
         />
         <ValidationMessages
            validationMessages={validationMessages}
         />
         <div style={STYLE.COMMAND_DIV}>
            <ActionButton
               type="TypeC"
               caption="Delete"
               onClick={this._handleDelete}
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

export default ListDeletePane
