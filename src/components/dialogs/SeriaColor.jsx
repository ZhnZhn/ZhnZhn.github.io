import { Component, createRef } from 'react';

import CellColor from '../zhn-moleculs/CellColor';
import BtCounter from './BtCounter';

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

const CL_INPUT_COLOR = 'va-b'
, S_ROOT = { padding: '6px 0 4px 4px' }
, S_ROW2 = { paddingTop: 4 }
, S_ROW2_PADDING = { paddingLeft: 56 }
, S_BT_COUNTER = {
  marginLeft: 14,
  marginRight: 16
}
, S_TO_CELL = { margin: '0 12px' }
, S_CELL = { marginRight: 4 };

const _initColor = (props) => props.initColor || C_TRANSPARENT;
const _hasLineWidth = (chartType) => {
  const { value } = chartType || {};
  if (!value
    || value === 'SPLINE'
    || value === 'LINE'
  ) {
    return true;
  }
  return false;
};

class SeriaColor extends Component {
  constructor(props){
    super(props)
    this._refLineWidth = createRef()
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

  _hReset = () => {
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
          className={CL_INPUT_COLOR}
          style={S_CELL}
          color={c}
          onClick={this._hClick}
        />
      ) : null ;
    }).filter(Boolean);
  }

  render(){
    const { isLong, chartType } = this.props
    , { color } = this.state
    , _isLineWidth = _hasLineWidth(chartType)
    , _rowStyle = _isLineWidth
         ? S_ROW2
         : {...S_ROW2, ...S_ROW2_PADDING };
    return (
      <div style={S_ROOT}>
        <div>
          <CellColor
            color={color}
            className={CL_INPUT_COLOR}
            style={S_TO_CELL}
            onClick={this._hReset}
          />
          {this._renderColors(COLORS1, isLong)}
        </div>
        <div style={_rowStyle}>
           <BtCounter
              ref={this._refLineWidth}
              isShow={_isLineWidth}
              style={S_BT_COUNTER}
              title="Line Width"
            />
          {this._renderColors(COLORS2, isLong)}
        </div>
      </div>
    );
  }

  getConf(){
    const { chartType } = this.props
    , { color } = this.state;
    return {
      seriaColor: color !== C_TRANSPARENT
         ? color
         : void 0,
      seriaWidth: _hasLineWidth(chartType)
        ? this._refLineWidth.current?.getValue()
        : void 0
    };
  }
}

export default SeriaColor
