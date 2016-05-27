import React from 'react';

import RowInputSelect from './RowInputSelect';

const FragmentSelectGroupList = React.createClass({
  displayName : 'FragmentSelectGroupList',
  propTypes : {
    store : React.PropTypes.object,
    groupCaption : React.PropTypes.string,
    groupOptions : React.PropTypes.array,
    listCaption : React.PropTypes.string
  },

  getInitialState(){
    this.groupCaption = null;
    this.listCaption = null;
    return {
       listOptions : []
    }
  },

  componentWillReceiveProps(nextProps){
    if (nextProps !== this.props){
      if (nextProps.groupOptions !== this.props.groupOptions){
          this.groupCaption = null;
          this.listCaption = null;
          this.setState({listOptions: []});
      } else {
        if (this.groupCaption){
          const listOptions = this.props.store.getWatchListsByGroup(this.groupCaption);
          if (listOptions !== this.state.listOptions)
            this.listCaption = null;
            this.setState({listOptions});
        }
      }
    }
  },

  _handlerSelectGroup(item){
    if (item && item.caption){
      this.groupCaption = item.caption;
      if (item.lists){
        this.setState({listOptions : item.lists})
      }  else {
        this.setState({listOptions : []})
      }
    } else {
      this.groupCaption = null;
    }
  },

  _handlerSelectList(item){
     this.listCaption = (item && item.caption) ? item.caption : null;
  },

  render(){
    const {groupCaption, groupOptions, listCaption} = this.props
        , {listOptions} = this.state;
    return (
      <div>
         <RowInputSelect
           caption={groupCaption}
           options={groupOptions}
           onSelect={this._handlerSelectGroup}
         />
         <RowInputSelect
           caption={listCaption}
           options={listOptions}
           onSelect={this._handlerSelectList}
         />
      </div>
    );
  },

  getValue(){
    return {captionGroup: this.groupCaption, captionList: this.listCaption}
  },
  setValueNull(){
    this.groupCaption = null;
    this.listCaption = null;
  }
});

export default FragmentSelectGroupList
