import React, { Component } from 'react';

import RowInputSelect from './rows/RowInputSelect';
import withLoadOptions from './decorators/withLoadOptions';

@withLoadOptions
class SelectParentChild extends Component {

  static defaultProps = {
    isShow : true,
    msgOnNotSelected : (item) => `${item} is not selected`
  }

  state = {
    parentOptions : [],
    isLoading : false,
    isLoadingFailed : false,
    childOptions : []
  }

  constructor(props){
    super();
    this.parent = null;
    this.child = null;
  }

  componentDidMount(){
    this._handlerLoadParentOptions();
  }
  componentDidUpdate(prevProps, prevState){
    if (prevProps !== this.props){
       if (this.state.isLoadingFailed && this.props.isShow){
         this._handlerLoadParentOptions();
       }
    }
  }
  componetWillUnmount(){
    this._unmountWithLoadOptions();
  }

  _handlerLoadParentOptions = () => {
    const { uri, parentJsonProp } = this.props;
    this._handlerWithLoadOptions(
          'parentOptions', 'isLoading', 'isLoadingFailed',
          uri, parentJsonProp
    );
  }

  _setChildOptions = (childOptions=[]) => {
    this.child = null;
    this.setState({ childOptions });
  }

  _handlerSelectParent = (parent) => {
    const { onSelectParent } = this.props;
    this.parent = parent;
    if (parent) {
      if (parent.columns) {
        this._setChildOptions(parent.columns)
        /*
        this.child = null;
        this.setState({ childOptions: parent.columns });
        */
      } else if (!this._isDfColumns) {
        this._setChildOptions()
        /*
        this.child = null;
        this.setState({ childOptions : defaultChildOptions });
        */
      }
    } else if (!this._isDfColumns) {
      this._setChildOptions()
      /*
      this.child = null;
      this.setState({ childOptions: [] });
      */
    }
    if (typeof onSelectParent === 'function') {
      onSelectParent(parent)
    }
  }
  _handlerSelectChild = (child) => {
    this.child = child;
  }

  render(){
    const {
            isShowLabels,
            parentCaption, parentOptionNames,
            childCaption
          } = this.props
        , {
            parentOptions, isLoading, isLoadingFailed,
            childOptions
          } = this.state;
    return (
      <div>
         <RowInputSelect
           isShowLabels={isShowLabels}
           caption={parentCaption}
           options={parentOptions}
           optionNames={parentOptionNames}
           isLoading={isLoading}
           isLoadingFailed={isLoadingFailed}
           onLoadOption={this._handlerLoadParentOptions}
           onSelect={this._handlerSelectParent}
         />
         <RowInputSelect
           isShowLabels={isShowLabels}
           caption={childCaption}
           options={childOptions}
           onSelect={this._handlerSelectChild}
         />
      </div>
    )
  }

  getValidation = () => {
     const msg = []
         , { parentCaption, childCaption, msgOnNotSelected } = this.props;
     if (!this.parent){
       msg.push(msgOnNotSelected(parentCaption));
     }
     if (!this.child){
       msg.push(msgOnNotSelected(childCaption));
     }

     if (msg.length>0){
       return { isValid: false, msg }
     }
     return { isValid : true }
  }

  getValues = () => {
    return {
      parent : this.parent,
      child : this.child
    }
  }
}

export default SelectParentChild
