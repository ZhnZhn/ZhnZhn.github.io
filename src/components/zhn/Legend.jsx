import React from 'react';

import LegendItem from './LegendItem';

const Style = {
  ITEM : {
    display : 'inline-block',
    border : '2px solid',
    borderRadius : '10px',
    paddingLeft : '20px',
    paddingRight : '20px',
    marginLeft : '10px',
    cursor : 'pointer'
  }
}

const Legend = React.createClass({

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps.legend === this.props.legend){
      return false;
    }
    return true
  },

  _renderLegend(legend=[], onClickItem){
    return legend.map((item, index) =>{
      return (
        <LegendItem key={item.name} item={item} onClickItem={onClickItem} />
      )
    })
  },

  render(){
    const { legend, onClickItem } = this.props
    return (
      <div>
        {this._renderLegend(legend, onClickItem)}
      </div>
    );
  }

});

export default Legend
