import {
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  getRefValue
} from '../uiApi';

import useProperty from '../hooks/useProperty';
import useRefBool from '../hooks/useRefBool';
import useBool from '../hooks/useBool';
import useTheme from '../hooks/useTheme';

import Model from '../../constants/Model';

import SvgCheckBox from '../zhn/SvgCheckBox';
import CellColor from '../zhn-moleculs/CellColor';
import ModalPalette from '../zhn-moleculs/ModalPalette';
import InputSelect from '../zhn-select/InputSelect';
import DivEllipsis from '../zhn/DivEllipsis';

const TH_ID = 'ROW_CHECKBOX'
, CHECKED_COLOR = '#1b2836'
, DF_COLOR = '#7cb5ec'

, CL_INPUT_COLOR = 'p-r va-m'

, S_ROOT = { padding: '0 0 16px 16px' }
, S_TITLE = {
  display: 'inline-block',
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
}, S_SELECT_OPTIONS = { minHeight: 100 }

, FN_NOOP = () => {};

const SeriaRow = (props) => {
  const {
    seria={},
    yAxisOptions,
    compIndex,
    onReg=FN_NOOP,
    onUnReg=FN_NOOP
  } = props
  , { color, name='' } = seria
  , ref = useRef()
  , [setYAxis, getYAxis] = useProperty()
  , [_refIsChecked, _hCheck, _hUnCheck] = useRefBool(false)
  , [_color, _setColor] = useState(() => color || DF_COLOR)
  , [isShowPallete, _hOpenPallete, _hClosePalette] = useBool(false)
  , TS = useTheme(TH_ID);

  /*eslint-disable react-hooks/exhaustive-deps */
  useImperativeHandle(ref, () => ({
    getValue: () => {
      const { userOptions } = seria
      , { data, name } = userOptions || {};
      return {
        isChecked: getRefValue(_refIsChecked),
        color: _color,
        yIndex: (getYAxis() || {}).value,
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
    setYAxis()
  }, [props])
  //setYAxis
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
      <DivEllipsis
         style={S_TITLE}
         text={name}
      />
      <CellColor
         className={CL_INPUT_COLOR}
         color={_color}
         onClick={_hOpenPallete}
      >
        <ModalPalette
           isShow={isShowPallete}
           model={Model.palette}
           onClickCell={_setColor}
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
        onSelect={setYAxis}
      />
    </div>
  );
};

export default SeriaRow
