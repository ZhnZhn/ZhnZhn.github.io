import React, { Component } from 'react'

import Model from '../../constants/Model'
import HandleF from '../f-handle/HandleF'

import CellColor from '../zhn-moleculs/CellColor'
import ModalPalette from '../zhn-moleculs/ModalPalette'
import InputSelect from '../zhn-select/InputSelect'
import RowCheckBox from '../dialogs/RowCheckBox'

const DF = {
  COLOR: '#7cb5ec'
};
const CL = {
  ELL: 'ellipsis'
};
const S = {
  ROOT: {
    paddingLeft: '16px',
    paddingBottom: '16px'
  },
  TITLE: {
    verticalAlign: 'middle',
    color: 'rgb(27, 117, 187)',
    textAlign: 'right',
    width: '100px',
    paddingLeft: '4px',
    paddingRight: '16px',
    fontSize: '16px',
    fontWeight: 'bold',
    userSelect: 'none'
  },
  COLOR: {
    position: 'relative',
    display: 'inline-block',
    height: '32px',
    width: '32px',
    borderRadius: '2px',
    verticalAlign: 'middle',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  },
  ROW_CHECK_BOX: {
    display: 'inline-block',
    verticalAlign: 'middle',
    paddingLeft: 0
  },
  SELECT: {
     verticalAlign: 'middle',
     marginLeft: '24px'
  },
  SELECT_OPTIONS: {
    minHeight: '100px'
  }
};

class SeriaRow extends Component {
  constructor(){
    super()

    this.isChecked = false
    this._hCheck = HandleF
      .set('isChecked', true).bind(this)
    this._hUnCheck = HandleF
      .set('isChecked', false).bind(this)

    this._hSelectYAxis = HandleF
      .reg('toYAxis').bind(this)

    this._hRegCellColor = HandleF.
      reg('cellColorNode').bind(this)
    this._hEnterColor = HandleF.
      enterTo('colorEntered').bind(this)
    this._hClosePalette = HandleF.
      closeTo('isShowPallete').bind(this)
    this._hClickPallete = HandleF.
      toggleModalTo('isShowPallete', 'cellColorNode').bind(this)

    this.state = {
      isShowPallete: false,
      colorEntered: undefined
    }
  }

  componentDidMount(){
    const { onReg } = this.props;
    if (typeof onReg === 'function') {
      onReg(this)
    }
  }
  componentWillUnmount(){
    const { onUnReg } = this.props;
    if (typeof onUnReg === 'function') {
      onUnReg(this)
    }
  }

  _getColor = () => {
    const { colorEntered } = this.state
        , { color } = this.props.seria.options;
    return colorEntered || color || DF.COLOR;
  }

  render(){
    const { isShowPallete } = this.state
        , { seria={}, yAxisOptions } = this.props
        , { name, options={} } = seria
        , { zhValueText } = options
        , _name = zhValueText || name
        , _bgColor = { backgroundColor: this._getColor() };

    return (
      <div style={S.ROOT}>
        <RowCheckBox
           rootStyle={S.ROW_CHECK_BOX}
           caption=""
           onCheck={this._hCheck}
           onUnCheck={this._hUnCheck}
        />
        <span
           className={CL.ELL}
           style={S.TITLE}
        >
          {_name}
        </span>
        <CellColor
           style={{ ...S.COLOR, ..._bgColor}}
           onReg={this._hRegCellColor}
           onClick={this._hClickPallete}
        >
          <ModalPalette
             isShow={isShowPallete}
             model={Model.palette}
             onClickCell={this._hEnterColor}
             onClose={this._hClosePalette}
          />
        </CellColor>
        <InputSelect
          placeholder="withYAxis"
          width="150"
          rootStyle={S.SELECT}
          rootOptionsStyle={S.SELECT_OPTIONS}
          options={yAxisOptions}
          onSelect={this._hSelectYAxis}
        />
      </div>
    )
  }

  getValue() {
    return {
      isChecked: this.isChecked,
      color: this._getColor(),
      toYAxis: this.toYAxis,
      data: this.props.seria.userOptions.data
    };
  }
}

export default SeriaRow
