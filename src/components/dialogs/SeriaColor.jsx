import React, { Component } from 'react'

import CellColor from '../zhn-moleculs/CellColor'


const C_TRANSPARENT = "transparent";
const N_SHORT = 5;

const COLORS1 = [
  '#8abb5d','#f7a35c','#795548','#f15c80','#f45b5b',
  '#d2b772', '#dda0dd','#fffafa'
];
const COLORS2 = [
  '#f1d600','#008b8b','#2f7ed8','#673ab7','#000000',
  '#607d8b','#7092be','#c3c3c3'
];

const S = {
  ROOT: {
    paddingBottom: 4
  },
  ROW2: {
    paddingLeft: 56,
    paddingTop: 4
  },
  TO_CELL: {
    marginLeft: 12,
    marginRight: 12,
  },
  CELL: {
  marginRight: 4,
  position: 'relative',
  display: 'inline-block',
  height: 32,
  width: 32,
  borderRadius: 2,
  verticalAlign: 'bottom',
  boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  }
};

const _initColor = (props) => props.initColor || C_TRANSPARENT;

class SeriaColor extends Component {
  constructor(props){
    super()
    this.state = {
      color: _initColor(props)
    }
  }

  componentDidMount() {
    const { onReg } = this.props;
    if (typeof onReg === 'function'){
      onReg(this)
    }
  }

  _hInit = () => {
    this.setState({
      color: _initColor(this.props)
    })
  }

  _hClick = (color) => {
     if (color) {
       this.setState({ color })
     }
  }

  _renderColors = (colors, isLong) => {
    const _max = isLong ? colors.length : N_SHORT;
    return colors.map((c, i) => {
      return i < _max ? (
        <CellColor
          key={c}
          color={c}
          style={S.CELL}
          onClick={this._hClick}
        />
      ) : null ;
    }).filter(Boolean);
  }

  render(){
    const { isLong } = this.props
        , { color } = this.state;
    return (
      <div style={S.ROOT}>
        <div>
          <CellColor
            color={color}
            style={{ ...S.CELL, ...S.TO_CELL }}
            onClick={this._hInit}
          />
          {this._renderColors(COLORS1, isLong)}
        </div>
        <div style={S.ROW2}>
          {this._renderColors(COLORS2, isLong)}
        </div>
      </div>
    );
  }

  getColor(){
    const { color } = this.state
    return color !== C_TRANSPARENT
      ? color
      : undefined;
  }
}

export default SeriaColor
