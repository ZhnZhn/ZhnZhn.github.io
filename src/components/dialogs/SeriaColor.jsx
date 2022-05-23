import { Component, createRef } from 'react';

import CellColor from '../zhn-moleculs/CellColor';
import BtCounter from './BtCounter';
import ColorList from './ColorList';

const C_TRANSPARENT = "transparent";

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

const _initColor = ({
  initColor
}) => initColor || C_TRANSPARENT;
const _hasLineWidth = ({
  value
} = {}) => !value
 || value === 'SPLINE'
 || value === 'LINE'


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
          <ColorList
            isLong={isLong}
            colors={COLORS1}
            onClick={this._hClick}
          />
        </div>
        <div style={_rowStyle}>
           <BtCounter
              ref={this._refLineWidth}
              isShow={_isLineWidth}
              style={S_BT_COUNTER}
              title="Line Width"
            />
            <ColorList
              isLong={isLong}
              colors={COLORS2}
              onClick={this._hClick}
            />
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
