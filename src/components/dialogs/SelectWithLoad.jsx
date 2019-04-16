import React, { Component } from 'react';

import RowInputSelect from './rows/RowInputSelect'

import withLoadOptions from './decorators/withLoadOptions';

@withLoadOptions
class SelectWithLoad extends Component {
    static defaultProps = {
       isShow: true,
       optionNames: 'Items',
       jsonProp: 'items'
     }

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
      return (
        <RowInputSelect
           {...this.props}
           {...this.state}
           onLoadOption={this._handlerLoadOptions}
        />
      );
    }

    getOptions(){
      return this.state.options;
    }
}


export default SelectWithLoad
