import React, { Component } from 'react';

import LegendItem from './LegendItem';

class Legend extends Component {
  shouldComponentUpdate(nextProps, nextState){
    if (nextProps.legend === this.props.legend){
      return false;
    }
    return true;
  }

  _renderLegend = (legend=[], onClickItem) => {
    return legend.map((item, index) =>{
      return (
        <LegendItem key={item.name} item={item} onClickItem={onClickItem} />
      )
    })
  }

  render(){
    const { legend, onClickItem } = this.props
    return (
      <div>
        {this._renderLegend(legend, onClickItem)}
      </div>
    );
  }
}

export default Legend
