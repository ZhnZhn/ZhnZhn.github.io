import React, { Component } from 'react';
import PropTypes from "prop-types";

import RowInputSelect from './RowInputSelect';

class FragmentSelectGroupList extends Component {
  static propTypes = {
    store: PropTypes.shape({
      listen: PropTypes.func,
      getWatchListsByGroup: PropTypes.func
    }),
    groupCaption: PropTypes.string,
    groupOptions: PropTypes.array,
    listCaption: PropTypes.string
  }

  constructor(props){
    super()
    this.groupCaption = null
    this.listCaption = null

    this.state = {
      listOptions : []
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps !== this.props){
      if (nextProps.groupOptions !== this.props.groupOptions){
          this.groupCaption = null;
          this.listCaption = null;
          this.setState({ listOptions: [] });
      } else {
        if (this.groupCaption){
          const listOptions = this.props.store.getWatchListsByGroup(this.groupCaption);
          if (listOptions !== this.state.listOptions)
            this.listCaption = null;
            this.setState({ listOptions });
        }
      }
    }
  }

  _handleSelectGroup = (item) => {
    if (item && item.caption){
      this.groupCaption = item.caption;
      if (item.lists){
        this.setState({ listOptions : item.lists })
      }  else {
        this.setState({ listOptions : [] })
      }
    } else {
      this.groupCaption = null
    }
  }

  _handleSelectList = (item) => {
     this.listCaption = (item && item.caption) ? item.caption : null
  }

  render(){
    const { groupCaption, groupOptions, listCaption } = this.props
        , { listOptions } = this.state;
    return (
      <div>
         <RowInputSelect
           caption={groupCaption}
           options={groupOptions}
           onSelect={this._handleSelectGroup}
         />
         <RowInputSelect
           caption={listCaption}
           options={listOptions}
           onSelect={this._handleSelectList}
         />
      </div>
    );
  }

  getValue(){
    return {
      captionGroup: this.groupCaption,
      captionList: this.listCaption
    };
  }

  setValueNull(){
    this.groupCaption = null
    this.listCaption = null
  }
}

export default FragmentSelectGroupList
