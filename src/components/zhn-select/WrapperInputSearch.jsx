import React, { Component } from 'react';

import TransformFn from './TransformFn';
import InputSearch from './InputSearch';

class WrapperInputSearch extends Component {

  shouldComponentUpdate(){
    return false;
  }

  _handleSelectItem = (item) => {
     if (item){
      this.props.onSelect(item);
     }
  }

  render(){
    const  { style, placeholder='', data={}, ItemOptionComp } = this.props
         , { meta } = data
         , { caption={} } = meta
         , _options = TransformFn.fromLevel3(data);

    return (
      <div style={style}>
        <InputSearch
           placeholder={placeholder}
           propCaption={caption}
           options={_options}
           ItemOptionComp={ItemOptionComp}
           onSelect={this._handleSelectItem}
        />
     </div>
    );
  }
}

export default WrapperInputSearch
