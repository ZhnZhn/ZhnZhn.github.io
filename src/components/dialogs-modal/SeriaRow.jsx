import {
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  getRefValue
} from '../uiApi';

import {
  CL_CHB_BLACK,
  CL_BLACK
} from '../styleFn';

import useProperty from '../hooks/useProperty';
import useRefBool from '../hooks/useRefBool';

import Model from '../../constants/Model';

import SvgCheckBox from '../zhn/SvgCheckBox';
import InputColor from '../zhn-moleculs/InputColor';
import InputSelect from '../zhn-select/InputSelect';
import DivEllipsis from '../zhn/DivEllipsis';

import {
  S_FONT_BOLD_NON_SELECT
} from '../styles/GeneralStyles';

const DF_COLOR = '#7cb5ec'
, CL_INPUT_COLOR = 'p-r va-m'
, S_ROOT = {
  padding: '0 0 16px 16px'
}
, _S_VALIGN_MIDDLE = {
  verticalAlign: 'middle',
}
, S_TITLE_STYLE = {
  ..._S_VALIGN_MIDDLE,
  ...S_FONT_BOLD_NON_SELECT,
  display: 'inline-block',
  width: 100,
  padding: '0 16px 0 4px',
  textAlign: 'right'
}
, S_CHECK_BOX = {
  ..._S_VALIGN_MIDDLE
}
, S_SELECT = {
  ..._S_VALIGN_MIDDLE,
  marginLeft: 24
}
, S_SELECT_OPTIONS = {
  minHeight: 100
}

, FN_NOOP = () => {};

const SeriaRow = (props) => {
  const {
    seria,
    yAxisOptions,
    compIndex,
    onReg=FN_NOOP,
    onUnReg=FN_NOOP
  } = props
  , {
    color,
    name=''
  } = seria
  , ref = useRef()
  , [
    setYAxis,
    getYAxis
  ] = useProperty()
  , [
    _refIsChecked,
    _hCheck,
    _hUnCheck
  ] = useRefBool(false)
  , [
    _color,
    _setColor
  ] = useState(() => color || DF_COLOR);

  /*eslint-disable react-hooks/exhaustive-deps */
  useImperativeHandle(ref, () => ({
    getValue: () => {
      const {
        userOptions
      } = seria
      , {
        data,
        name
      } = userOptions || {};
      return {
        isChecked: getRefValue(_refIsChecked),
        color: _color,
        yIndex: (getYAxis() || {}).value,
        data,
        name
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
        className={CL_CHB_BLACK}
        style={S_CHECK_BOX}
        onCheck={_hCheck}
        onUnCheck={_hUnCheck}
      />
      <DivEllipsis
        className={CL_BLACK}
        style={S_TITLE_STYLE}
        text={name}
      />
      <InputColor
        className={CL_INPUT_COLOR}
        model={Model.palette}
        color={_color}
        setColor={_setColor}
      />
      <InputSelect
        placeholder="withYAxis"
        width="135"
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
