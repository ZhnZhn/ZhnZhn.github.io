import React, { Component } from 'react';

import InputSelect from '../zhn-select/InputSelect';
import STYLE from '../styles/DialogStyles';

import withLoadOptions from './decorators/withLoadOptions';

@withLoadOptions
class SelectWithLoad extends Component {
    static defaultProps = { isShow : true }

    state = {
      options : [],
      isLoading : false,
      isLoadingFailed : false
    }

    componentDidMount(){
      this._handlerLoadOptions();
    }
    componentDidUpdate(prevProps, prevState){
      if (prevProps !== this.props){
         if (this.state.isLoadingFailed && this.props.isShow){
           this._handlerLoadOptions();
         }
      }
    }
    componetWillUnmount(){
      this._unmountWithLoadOptions();
    }

    _handlerLoadOptions = () => {
      const { uri, jsonProp } = this.props;
      this._handlerWithLoadOptions(
            'options', 'isLoading', 'isLoadingFailed',
            uri, jsonProp
      );
    }

    render(){
      const { caption, optionNames, placeholder, onSelect } = this.props
          , { isLoading, isLoadingFailed, options } = this.state;

      return (
        <div style={STYLE.rowDiv}>
           <span style={STYLE.labelSpan}>
              {caption}
           </span>
           <InputSelect
             width="250"
             isLoading={isLoading}
             isLoadingFailed={isLoadingFailed}
             options={options}
             optionNames={optionNames}
             placeholder={placeholder}
             onLoadOption={this._handlerLoadOptions}
             onSelect={onSelect}
           />
       </div>
      );
    }
}


export default SelectWithLoad
