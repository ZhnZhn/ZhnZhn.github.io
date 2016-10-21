import React from 'react';

import InputSearch from './InputSearch';


const WrapperInputSearch = React.createClass({

  shouldComponentUpdate(){
    return false;
  },

  _handlerSelectItem(item){
     this.props.onSelect(item);
  },

  _createOptions(data){
     const { meta } = data
         , { level1, level2, level3 } = meta

     const _options = [];
      for(let i1=0, l1=data[level1].length; i1<l1; i1++){
        let industry = data[level1][i1]
        for(let i2=0, l2=industry[level2].length; i2<l2; i2++){
          let sector = industry[level2][i2]
          for (let i3=0, l3=sector[level3].length; i3<l3; i3++){
             let item = sector[level3][i3];
             item.caption = item.text;
             _options.push(item);
          }
        }
      }

      return _options;
  },

  render(){
    const { data, placeholder='' } = this.props
         , _options = this._createOptions(data)

    //console.log(_options)

    return (
      <div style={{ paddingBottom: '8px' }}>
        <InputSearch
           placeholder={placeholder}
           options={_options}
           width={280}
           onSelect={this._handlerSelectItem}
        />
     </div>
    );
  }
});

export default WrapperInputSearch
