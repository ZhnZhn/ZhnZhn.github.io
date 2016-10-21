import React from 'react';

import InputSearch from './InputSearch';


const WrapperInputSearch = React.createClass({

  shouldComponentUpdate(){
    return false;
  },

  _handlerSelectItem(item){
     if (item){
      this.props.onSelect(item);
     }
  },

  _createOptions(data, meta){
     const { level1, level2, level3 } = meta
         , _options = [];

      for(let i1=0, l1=data[level1].length; i1<l1; i1++){
        let industry = data[level1][i1]
        for(let i2=0, l2=industry[level2].length; i2<l2; i2++){
          let sector = industry[level2][i2]
          for (let i3=0, l3=sector[level3].length; i3<l3; i3++){
             let item = sector[level3][i3];
             _options.push(item);
          }
        }
      }

      return _options;
  },

  render(){
    const  { style, placeholder='', data } = this.props
         , { meta } = data
         , { caption } = meta
         , _options = this._createOptions(data, meta)

    return (
      <div style={style}>
        <InputSearch
           placeholder={placeholder}
           propCaption={caption}
           options={_options}
           width={280}
           onSelect={this._handlerSelectItem}
        />
     </div>
    );
  }
});

export default WrapperInputSearch
