import { Component, createRef } from 'react'

import Model from '../../constants/Model'
import HandleF from '../f-handle/HandleF'

import CellColor from '../zhn-moleculs/CellColor'
import ModalPalette from '../zhn-moleculs/ModalPalette'
import InputSelect from '../zhn-select/InputSelect'
import D from '../dialogs/DialogCell'

const DF = {
  COLOR: '#7cb5ec'
};
const CL = {
  ELL: 'ellipsis'
};

const CL_INPUT_COLOR = 'p-r va-m';
const S = {
  ROOT: {
    paddingLeft: 16,
    paddingBottom: 16
  },
  TITLE: {
    color: '##1b75bb',
    width: 100,
    paddingLeft: 4,
    paddingRight: 16,
    verticalAlign: 'middle',
    textAlign: 'right',
    fontSize: '16px',
    fontWeight: 'bold',
    userSelect: 'none'
  },
  ROW_CHECK_BOX: {
    display: 'inline-block',
    paddingLeft: 0,
    verticalAlign: 'middle'
  },
  SELECT: {
     marginLeft: 24,
     verticalAlign: 'middle'
  },
  SELECT_OPTIONS: {
    minHeight: 100
  }
};

const _isFn = fn => typeof fn === 'function';

class SeriaRow extends Component {
  constructor(props){
    super(props)

    this.isChecked = false
    this._hCheck = HandleF
      .set('isChecked', true)
      .bind(this)
    this._hUnCheck = HandleF
      .set('isChecked', false)
      .bind(this)

    this._hSelectYAxis = HandleF
      .reg('toYAxis')
      .bind(this)

    this._hEnterColor = HandleF
      .enterTo('colorEntered')
      .bind(this)
    this._hClosePalette = HandleF
      .closeTo('isShowPallete')
      .bind(this)

    this._refCellColor = createRef()
    this._hClickPallete = HandleF
      .toggleModalBy('isShowPallete', '_refCellColor')
      .bind(this)

    this.state = {
      isShowPallete: false,
      colorEntered: void 0
    }
  }

  componentDidMount(){
    const { onReg } = this.props;
    if (_isFn(onReg)) {
      onReg(this)
    }
  }
  componentWillUnmount(){
    const { onUnReg } = this.props;
    if (_isFn(onUnReg)) {
      onUnReg(this)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.toYAxis = void 0
    }
  }

  _getColor = () => {
    const { colorEntered } = this.state
    , { color } = this.props.seria;
    return colorEntered || color || DF.COLOR;
  }

  render(){
    const { isShowPallete } = this.state
        , { seria={}, yAxisOptions } = this.props
        , { name='' } = seria
        , _color = this._getColor();

    return (
      <div style={S.ROOT}>
        <D.RowCheckBox
           style={S.ROW_CHECK_BOX}
           onCheck={this._hCheck}
           onUnCheck={this._hUnCheck}
        />
        <span
           className={CL.ELL}
           style={S.TITLE}
        >
          {name}
        </span>
        <CellColor
           ref={this._refCellColor}
           className={CL_INPUT_COLOR}
           color={_color}
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
          style={S.SELECT}
          optionsStyle={S.SELECT_OPTIONS}
          options={yAxisOptions}
          onSelect={this._hSelectYAxis}
        />
      </div>
    )
  }

  getValue() {
    const { userOptions } = this.props.seria
    , { data, name } = userOptions;
    return {
      isChecked: this.isChecked,
      color: this._getColor(),
      yIndex: this.toYAxis ? this.toYAxis.value : void 0,
      data, name
    };
  }
}

export default SeriaRow
