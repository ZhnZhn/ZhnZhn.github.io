import {
  useRef, useState, useCallback,
  useEffect, useImperativeHandle
} from 'react'

import useRefSet from '../hooks/useRefSet'
import useTheme from '../hooks/useTheme'

import Model from '../../constants/Model'

import SvgCheckBox from '../zhn/SvgCheckBox'
import CellColor from '../zhn-moleculs/CellColor'
import ModalPalette from '../zhn-moleculs/ModalPalette'
import InputSelect from '../zhn-select/InputSelect'


const TH_ID = 'ROW_CHECKBOX'
, CHECKED_COLOR = '#1b2836'
, DF_COLOR = '#7cb5ec'

, CL_ELL = 'ellipsis'
, CL_INPUT_COLOR = 'p-r va-m'

, S_ROOT = { padding: '0 0 16px 16px' }
, S_TITLE = {
  color: '##1b75bb',
  width: 100,
  padding: '0 16px 0 4px',
  verticalAlign: 'middle',
  textAlign: 'right',
  fontSize: '16px',
  fontWeight: 'bold',
  userSelect: 'none'
}
, S_CHECK_BOX = { verticalAlign: 'middle'}
, S_SELECT = {
   marginLeft: 24,
   verticalAlign: 'middle'
}, S_SELECT_OPTIONS = { minHeight: 100 };

const _fnNoop = () => {};

const _getRefValue = ref => ref.current;

const SeriaRow = (props) => {
  const {
    seria={},
    yAxisOptions,
    compIndex,
    onReg=_fnNoop,
    onUnReg=_fnNoop
  } = props
  , { color, name='' } = seria
  , ref = useRef()
  , _refIsChecked = useRef(false)
  , _refCellColor = useRef()
  , [_refToYAxis, _hSelectYAxis] = useRefSet()
  , [isShowPallete, setIsShowPallete] = useState(false)
  , [colorEntered, setColorEntered] = useState()
  , _hCheck = useCallback(() => {
    _refIsChecked.current = true
  }, [])
  , _hUnCheck = useCallback(() => {
    _refIsChecked.current = false
  }, [])
  , _hEnterColor = useCallback(color => {
    setColorEntered(color)
  }, [])
  , _hClosePalette = useCallback(() => {
    setIsShowPallete(false)
  }, [])
  , _hClickPallete = useCallback((color, event) => {
    if (event && event.target === _getRefValue(_refCellColor)) {
      setIsShowPallete(is => !is)
    }
  }, [])
  , TS = useTheme(TH_ID)
  , _color = colorEntered || color || DF_COLOR;

  /*eslint-disable react-hooks/exhaustive-deps */
  useImperativeHandle(ref, () => ({
    getValue: () => {
      const { userOptions } = seria
      , { data, name } = userOptions || {};
      return {
        isChecked: _getRefValue(_refIsChecked),
        color: _color,
        yIndex: (_getRefValue(_refToYAxis) || {}).value,
        data, name
      };
    }
  }), [_color])
  //seria
  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    onReg(ref, compIndex)
    return () => onUnReg(compIndex);
  }, [])
  //compIndex, onReg, onUnReg
  useEffect(() => {
    _refToYAxis.current = void 0
  }, [props])
  //_refToYAxis
  /*eslint-enable react-hooks/exhaustive-deps */

  return (
    <div style={S_ROOT}>
      <SvgCheckBox
        style={S_CHECK_BOX}
        color={CHECKED_COLOR}
        checkedColor={TS.CHECKED_COLOR}
        onCheck={_hCheck}
        onUnCheck={_hUnCheck}
      />
      <span
         className={CL_ELL}
         style={S_TITLE}
      >
        {name}
      </span>
      <CellColor
         ref={_refCellColor}
         className={CL_INPUT_COLOR}
         color={_color}
         onClick={_hClickPallete}
      >
        <ModalPalette
           isShow={isShowPallete}
           model={Model.palette}
           onClickCell={_hEnterColor}
           onClose={_hClosePalette}
        />
      </CellColor>
      <InputSelect
        placeholder="withYAxis"
        width="150"
        style={S_SELECT}
        optionsStyle={S_SELECT_OPTIONS}
        options={yAxisOptions}
        noFooterBts={true}
        onSelect={_hSelectYAxis}
      />
    </div>
  );
};

export default SeriaRow
