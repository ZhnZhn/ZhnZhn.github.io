import React, { Component } from 'react';
//import PropTypes from "prop-types";

import A from './Atoms'

class GroupDeletePane extends Component {
  /*
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
  */

  constructor(props){
    super()
    this.caption = null
    this._primaryBt = <A.Button.Primary
                         caption="Delete"
                         title="Delete Group"
                         onClick={this._handleDeleteGroup}
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
          , {
              groupOptions, validationMessages
            } = this.state;

      return (
         <div>
           <A.RowInputSelect
             caption="Group:"
             options={groupOptions}
             onSelect={this._handleSelectGroup}
           />
           <A.ValidationMessages
             validationMessages={validationMessages}
           />
           <A.RowButtons
             Primary={this._primaryBt}
             withoutClear={true}
             onClose={onClose}
           />
        </div>
    );
  }
}

export default GroupDeletePane
