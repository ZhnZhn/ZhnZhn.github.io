import React, { Component } from 'react';

import RowInputSelect from './RowInputSelect';
import ShowHide from '../../zhn/ShowHide'
import withLoadOptions from '../decorators/withLoadOptions';

const _isFn = fn => typeof fn === 'function';

@withLoadOptions
class SelectOneTwo extends Component {

  static defaultProps = {
    isShow: true,
    isHideTwo: false,
    oneOptionNames: 'Items',
    msgOnNotSelected: (item) => `${item} is not selected`
  }

  state = {
    isLoading: false,
    isLoadingFailed: false,
    oneOptions: [],
    twoOptions: []
  }

  constructor(props){
    super(props);
    this.one = null;
    this.two = null;
  }

  componentDidMount(){
    this._loadOptions();
  }
  componentDidUpdate(prevProps, prevState){
    if (prevProps !== this.props){
       if (this.state.isLoadingFailed && this.props.isShow){
         this._loadOptions();
       }
    }
  }
  componetWillUnmount(){
    this._unmountWithLoadOptions();
  }

  _loadOptions = () => {
    const { uri, oneJsonProp } = this.props;
    this._handlerWithLoadOptions(
      'oneOptions', 'isLoading', 'isLoadingFailed',
       uri, oneJsonProp
    );
  }

  _setTwoOptions = (twoOptions=[]) => {
    this.two = null;
    this.setState({ twoOptions });
  }

  _hSelectOne = (one) => {
    const { onSelectOne } = this.props;
    this.one = one;
    if (one) {
      if (one.columns) {
        this._setTwoOptions(one.columns)
      } else if (!this._isDfColumns) {
        this._setTwoOptions()
      }
    } else if (!this._isDfColumns) {
      this._setTwoOptions()
    }
    if (_isFn(onSelectOne)) {
      onSelectOne(one)
    }
  }
  _hSelectTwo = (two) => {
    this.two = two;
  }

  render(){
    const {
      isShowLabels,
      oneCaption, oneOptionNames,
      isHideTwo,
      twoCaption
    } = this.props
    , {
      isLoading, isLoadingFailed,
      oneOptions,
      twoOptions
    } = this.state;
    return (
      <div>
         <RowInputSelect
           isShowLabels={isShowLabels}
           caption={oneCaption}
           options={oneOptions}
           optionNames={oneOptionNames}
           isLoading={isLoading}
           isLoadingFailed={isLoadingFailed}
           onLoadOption={this._loadOptions}
           onSelect={this._hSelectOne}
         />
         <ShowHide isShow={!isHideTwo}>
           <RowInputSelect
             isShowLabels={isShowLabels}
             caption={twoCaption}
             options={twoOptions}
             onSelect={this._hSelectTwo}
           />
         </ShowHide>
      </div>
    )
  }

  getValidation() {
     const msg = []
     , { oneCaption, twoCaption, msgOnNotSelected } = this.props;
     if (!this.one){
       msg.push(msgOnNotSelected(oneCaption));
     }
     if (!this.two){
       msg.push(msgOnNotSelected(twoCaption));
     }

     if (msg.length>0){
       return { isValid: false, msg };
     }
     return { isValid: true };
  }

  getValues() {
    return {
      one: this.one,
      two: this.two
    };
  }
}

export default SelectOneTwo
