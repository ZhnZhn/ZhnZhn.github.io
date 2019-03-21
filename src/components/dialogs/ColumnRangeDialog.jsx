import React, { Component } from 'react'

import fn from '../../charts/seriaFns'

import ModalDialog from '../zhn-moleculs/ModalDialog';
import Button from './Button'
import Cell from './DialogCell'


const S = {
  TEXT: {
    paddingTop: 16,
    paddingLeft: 16,
    fontWeight: 600
  },
  ROW: {
    paddingLeft: 8,
  },
  INLINE: {
    display: 'inline-block'
  },
  CAPTION_1: {
    width: 60
  },
  CAPTION_2: {
    width: 100
  },
  INPUT: {
    width: 40
  }
};


const INIT = {
  POIN_WIDTH: 1,
  R1: 4,
  R2: 0
};

const SERIA_OPTION = {
  name: 'Range',
  type: 'columnrange',
  borderWidth: 0,
  pointWidth: INIT.POIN_WIDTH
};

const _getNames = s => {
  const n1 = s[0].name, n2 = s[1].name;
  return n1 <= n2
    ? { n1, n2, fromIndex: 0, toIndex: 1 }
    : { n1: n2, n2: n1, fromIndex: 1, toIndex: 0 };
};

const _setRadius = (value, seria) => {
  const _ = seria.options;
  _.marker.radius = value
  seria.update(_, false)
}

const _fHeValue = (propName, min, max) => function(v) {
  const _ = parseInt(v, 10);
  if ( _>min && _<max) {
    this[propName] = v
  }
}

const _crSeriaOptions = (pointWidth) => ({
  ...SERIA_OPTION,
  ...{ pointWidth }
});

class ColumnRangeDialog extends Component {

  constructor(props){
    super(props)

    this._commandButtons = [
      <Button.Flat
         key="yes"
         caption="Yes, Connect"
         //accessKey="y"
         isPrimary={true}
         onClick={this._hAdd}
      />
    ]
    this._heWidth = _fHeValue('_pointWidth', -1, 4).bind(this)
    this._heRadius1 = _fHeValue('_r1', -1, 9).bind(this)
    this._heRadius2 = _fHeValue('_r2', -1, 9).bind(this)
    this._r1 = INIT.R1
    this._r2 = INIT.R1
    this._pointWidth = INIT.POIN_WIDTH

    this._refW = React.createRef()
    this._refR1 = React.createRef()
    this._refR2 = React.createRef()
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  }

  _hAdd = () => {
    const { _fromIndex, _toIndex, props } = this
     const { data, onClose } = props
     , { chart } = data
     , _series = chart.series
     , _s1 = _series[_fromIndex]
     , _s2 = _series[_toIndex]
     , _d = fn.columnRange(_s1.data, _s2.data);

     this._heWidth(this._refW.current.getValue())
     this._heRadius1(this._refR1.current.getValue())
     this._heRadius2(this._refR2.current.getValue())

     _setRadius(this._r1, _s1)
     _setRadius(this._r2, _s2)

     chart.zhAddSeriaToYAxis({
       data: _d,
       color: this._color,
       index: 0
     }, _crSeriaOptions(this._pointWidth))

     onClose()
  }

  _heColor = (color) => {
    this._color = color
  }

  render(){
    const { isShow,
      data,
      onClose
    } = this.props
    , { chart } = data
    , _s = chart.series
    , { n1, n2, fromIndex, toIndex } = _getNames(_s)
    , c1 = _s[fromIndex].color
    , c2 = _s[toIndex].color;

    this._fromIndex = fromIndex
    this._toIndex = toIndex
    this._color = c1
    return(
      <ModalDialog
        caption="Add ColumnRange"
        isShow={isShow}
        commandButtons={this._commandButtons}
        onClose={onClose}
      >
        <div style={S.TEXT}>
          Connect dots series by column range?
        </div>
        <div style={S.ROW}>
          <Cell.RowInputColor
            styleRoot={S.INLINE}
            styleCaption={S.CAPTION_1}
            initValue={c1}
            onEnter={this._heColor}
            maxLenght={7}
          />
          <Cell.RowInputText
             ref={this._refW}
             styleRoot={S.INLINE}
             styleCaption={S.CAPTION_1}
             styleInput={S.INPUT}
             caption="Width"
             initValue={INIT.POIN_WIDTH}
             type="number"
             maxLenght={2}
          />
        </div>
        <div style={S.ROW}>
          <Cell.RowInputText
             ref={this._refR1}
             styleRoot={S.INLINE}
             styleCaption={{ ...S.CAPTION_2, ...{ color: c1 }}}
             styleInput={S.INPUT}
             caption={`R ${n1}`}
             initValue={INIT.R1}
             type="number"
             maxLenght={2}
          />
          <Cell.RowInputText
             ref={this._refR2}
             styleRoot={S.INLINE}
             styleCaption={{ ...S.CAPTION_2, ...{ color: c2 }}}
             styleInput={S.INPUT}
             caption={`R ${n2}`}
             initValue={INIT.R2}
             type="number"
             maxLenght={2}
          />
       </div>
      </ModalDialog>
    );
  }
}

export default ColumnRangeDialog
