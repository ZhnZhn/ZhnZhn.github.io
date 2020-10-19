import { Component } from 'react';
//import PropTypes from "prop-types";

import A from './Atoms'

class ListCreatePane extends Component {
  /*
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
  */

  constructor(props){
    super()
    this.captionGroup = null
    this._primaryBt = (<A.Button.Primary
       caption="Create"
       title="Create New List"
       onClick={this._handleCreate}
    />)
    this.state = {
      groupOptions: props.store.getWatchGroups(),
      validationMessages: []
    }
  }

  componentDidMount(){
    this.unsubscribe = this.props.store
      .listen(this._onStore)
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
        this.setState({
           groupOptions: store.getWatchGroups()
        });
    } else if (actionType === actionFailed && data.forActionType === forActionType){
      this.setState({
        validationMessages: data.messages
      })
    }
  }

  _handleSelectGroup = (item) => {
    this.captionGroup = (item && item.caption) || null;
  }

  _handleClear = () => {
     this.inputText.setValue('')
     if (this.state.validationMessages.length>0){
       this.setState({
         validationMessages: []
       })
     }
  }

  _handleCreate = () => {
     const { onCreate, msgOnNotSelect, msgOnIsEmptyName } = this.props
         , captionList = this.inputText.getValue();
     if (this.captionGroup && captionList){
       onCreate({
          captionGroup: this.captionGroup,
          captionList: captionList
       });
     } else {
       const msg = [];
       if (!this.captionGroup) { msg.push(msgOnNotSelect('In Group')); }
       if (!captionList)       { msg.push(msgOnIsEmptyName('List')); }
       this.setState({
         validationMessages: msg
       });
     }
  }

  _refInputText = c => this.inputText = c

  render(){
    const { onClose } = this.props
        , { groupOptions, validationMessages } = this.state;
    return (
      <div>
        <A.RowInputSelect
           caption="In Group:"
           options={groupOptions}
           onSelect={this._handleSelectGroup}
        />
        <A.RowInputText
           ref={this._refInputText}
           caption="List:"
        />
        <A.ValidationMessages
          validationMessages={validationMessages}
        />
        <A.RowButtons
           Primary={this._primaryBt}
           onClear={this._handleClear}
           onClose={onClose}
        />
      </div>
    )
  }
}

export default ListCreatePane
