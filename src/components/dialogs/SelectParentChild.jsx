import React from 'react';

import WithLoadOptions from './WithLoadOptions';
import RowInputSelect from './RowInputSelect';

const defaultChildOptions = [];

const SelectParentChild = React.createClass({
  ...WithLoadOptions,

  getDefaultProps(){
    return  {
      msgOnNotSelected : (item) => `${item} is not selected`
    }
  },
  getInitialState(){
    this.parent = null;
    this.child = null;
    return {
      parentOptions : [],
      isLoading : false,
      isLoadingFailed : false,

      childOptions : []
    }
  },

  componentDidMount(){
    this._handlerLoadParentOptions();
  },
  componetWillUnmount(){
    this._unmountWithLoadOptions();
  },

  _handlerLoadParentOptions(){
    const { uri, parentJsonProp } = this.props;
    this._handlerWithLoadOptions(
          'parentOptions', 'isLoading', 'isLoadingFailed',
          uri, parentJsonProp
    );
  },
  _handlerSelectParent(parent){
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
  },
  _handlerSelectChild(child){
    this.child = child;
  },

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
  },

  getValidation(){
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
  },

  getValues(){
    return {
      parent : this.parent,
      child : this.child
    }
  }

});

export default SelectParentChild
