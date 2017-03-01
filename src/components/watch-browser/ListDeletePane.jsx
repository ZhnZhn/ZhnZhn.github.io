import React from 'react';

import FragmentSelectGroupList from './FragmentSelectGroupList';
import ValidationMessages from '../zhn/ValidationMessages';
import ActionButton from '../zhn/ActionButton';

const Styles = {
  COMMAND_DIV : {
     cursor: 'default',
     float: 'right',
     marginTop: '8px',
     marginBottom: '10px',
     marginRight: '4px'
  }
}

const ListDeletePane = React.createClass({
  displayName : 'ListDeletePane',
  propTypes : {
    store : React.PropTypes.object,
    actionCompleted : React.PropTypes.string,
    forActionType : React.PropTypes.string,
    onRename : React.PropTypes.func,
    onClose : React.PropTypes.func
  },

  getInitialState(){
    const {store} = this.props;
    return {
      groupOptions : store.getWatchGroups(),
      validationMessages : []
    }
  },

  componentDidMount(){
    this.unsubscribe = this.props.store.listen(this._onStore)
  },
  componentWillUnmount(){
    this.unsubscribe()
  },
  _onStore(actionType, data){
    const {actionCompleted, forActionType, store} = this.props;
    if (actionType === actionCompleted){
        if (data.forActionType === forActionType) {
          this._handlerClear();
        }
        this.setState({groupOptions : store.getWatchGroups()});
    }
  },

  _handlerClear(){
    if (this.state.validationMessages.length>0){
      this.setState({validationMessages: []})
    }
  },

  _handlerDelete(){
      const {captionGroup, captionList} = this.selectGroupList.getValue();
      if (captionGroup && captionList){
        this.props.onDelete({captionGroup, captionList});
      } else {
        const {msgOnNotSelect} = this.props
            , msg = [];
        if (!captionGroup) {msg.push(msgOnNotSelect('Group'));}
        if (!captionList)  {msg.push(msgOnNotSelect('List')); }
        this.setState({validationMessages: msg});
      }
  },

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
         <div style={Styles.COMMAND_DIV}>
            <ActionButton
               type="TypeC"
               caption="Delete"
               onClick={this._handlerDelete}
            />
            <ActionButton
               type="TypeC"
               caption="Clear"
               onClick={this._handlerClear}
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
});

export default ListDeletePane
