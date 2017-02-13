import React, { Component } from 'react';

import RowInputSelect from './RowInputSelect';
import withLoadOptions from './decorators/withLoadOptions';

const defaultChildOptions = [];


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
  _handlerSelectParent = (parent) => {
    this.parent = parent;
    if (parent) {
      if (parent.columns) {
        this.child = null;
        this.setState({ childOptions: parent.columns });
      } else {
        this.child = null;
        this.setState({ childOptions : defaultChildOptions });
      }
    } else {
      this.child = null;
      this.setState({ childOptions: [] });
    }
  }
  _handlerSelectChild = (child) => {
    this.child = child;
  }

  render(){
    const {
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
           caption={parentCaption}
           options={parentOptions}
           optionNames={parentOptionNames}
           isLoading={isLoading}
           isLoadingFailed={isLoadingFailed}
           onLoadOption={this._handlerLoadParentOptions}
           onSelect={this._handlerSelectParent}
         />
         <RowInputSelect
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
