import React from 'react';

import FragmentSelectGroupList from './FragmentSelectGroupList';
import RowInputText from './RowInputText';
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

const ListEditPane = React.createClass({
  displayName : 'ListEditPane',
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
      listOptions : [],
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
    const {actionCompleted, actionFailed, forActionType, store} = this.props;
    if (actionType === actionCompleted){
        if (data.forActionType === forActionType){
          this._handlerClear();
        }
        this.setState({groupOptions : store.getWatchGroups()});
    } else if (actionType === actionFailed && data.forActionType === forActionType){
      this.setState({validationMessages:data.messages});
    }
  },

  _handlerClear(isFullClear){
     this.inputText.setValue('');
     if (this.state.validationMessages.length>0){
       this.setState({validationMessages:[]})
     }
  },


  _handlerRename(){
    const {captionGroup, captionList} = this.selectGroupList.getValue()
        , captionListTo = this.inputText.getValue();
    if (captionGroup && captionList && captionListTo){
      this.props.onRename({
        captionGroup : captionGroup,
        captionListFrom : captionList,
        captionListTo : captionListTo
      })
    } else {
      const {msgOnIsEmptyName, msgOnNotSelect} = this.props
          , msg = [];
      if (!captionGroup) { msg.push(msgOnNotSelect('Group')); }
      if (!captionList)  { msg.push(msgOnNotSelect('List From')); }
      if (!captionListTo){ msg.push(msgOnIsEmptyName('List To')); }
      this.setState({validationMessages:msg})
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
           listCaption={'List From:'}
         />
         <RowInputText
            ref={c => this.inputText = c}
            caption={'List To:'}
         />
         <ValidationMessages
           validationMessages={validationMessages}
         />
         <div style={Styles.COMMAND_DIV}>
            <ActionButton
               type="TypeC"
               caption="Rename"
               onClick={this._handlerRename}
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

export default ListEditPane
