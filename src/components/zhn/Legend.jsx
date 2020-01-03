import React, { Component } from 'react';

import LegendItem from './LegendItem';

const C = {
  CL_SCROLL: "with-scroll",
  MORE_MAX: 12,
  MORE: 'MORE',
  LESS: 'LESS'
};

const S = {
  ROOT_MORE: {
    overflowY: 'auto',
    height: 250,
    marginLeft: -8,
    paddingRight: 4,
    transform: 'scaleX(-1)'
  },
  ROOT_LESS: {
    height: 'auto',
  },
  DIV: {
    transform: 'scaleX(-1)'
  },

  BT_MORE: {
    display: 'inline-block',
    marginTop: 10,
    marginLeft: 8,
    color: '#1b2836',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};

const BtMore = ({ isMore, legend, onClick }) => {
  const _len = legend.length;
  if (_len > C.MORE_MAX) {
    const _caption = isMore
            ? C.LESS + ': ' + C.MORE_MAX
            : C.MORE + ': +' + (_len - C.MORE_MAX);
    return (
      <button
        style={S.BT_MORE}
        onClick={onClick}
      >
        {_caption}
      </button>
    );
  } else {
    return null;
  }
}

class Legend extends Component {

  static defaultProps = {
    legend: []
  }

  state = {
    isMore: false
  }

  shouldComponentUpdate(nextProps, nextState){
    if (
        nextProps.legend === this.props.legend
        && nextState.isMore === this.state.isMore
    ){
      return false;
    }
    return true;
  }

  _handleMore = () => {
    this.setState(prevState => ({
      isMore: !prevState.isMore
    }))
  }

  _renderLegend = (legend, isMore, onClickItem) => {
     const _legend = [], max = legend.length;
     let i=0;
     for (; i<max; i++){
       if ( (isMore) || (!isMore && i < C.MORE_MAX) ) {
         const item = legend[i];
         _legend.push(
           <LegendItem
              key={item.name}
              item={item}
              onClickItem={onClickItem}
           />
         )
       } else {
         break;
       }
     }
     return _legend;
  }

  render(){
    const {
        legend, onClickItem
      } = this.props
    , { isMore } = this.state
    , _rootStyle = isMore
         ? S.ROOT_MORE
         : {...S.ROOT_MORE, ...S.ROOT_LESS};
    return (
      <div className={C.CL_SCROLL} style={_rootStyle}>
        <div style={S.DIV}>
          {this._renderLegend(legend, isMore, onClickItem)}
          <BtMore
            isMore={isMore}
            legend={legend}
            onClick={this._handleMore}
         />
        </div>
      </div>
    );
  }
}

export default Legend
