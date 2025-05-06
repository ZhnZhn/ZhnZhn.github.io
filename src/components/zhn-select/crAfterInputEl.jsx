import { joinByBlank } from '../../utils/arrFn';

import {
  crAbsoluteTopLeftStyle,
  crBtCircle2Cn
} from '../styleFn';

import { BtSvgClear } from '../zhn/BtSvgX';
import Button from '../zhn/Button';
import ArrowCell from './ArrowCell';

import {
  CL_SPINNER,
  CL_SPINNER_FAILED
} from './CL';

const CL_BT_SPINNER_FAILED = crBtCircle2Cn(CL_SPINNER_FAILED)
, S_SVG_CLEAR = {
  ...crAbsoluteTopLeftStyle(5, 8, !0),
  stroke: '#1b75bb'
};

const _crNumberOfOptionsToken = (
  propsOptions
) => {
  const _propsOptionsLength = (propsOptions || []).length
  return _propsOptionsLength > 999
    ? `(${_propsOptionsLength})`
    : '';
};

const crAfterInputEl = (
  isLoading,
  isLoadingFailed,
  placeholder,
  optionName,
  optionNames,
  onLoadOption,

  isBtSvgClear,
  isShowOption,
  labelId,
  optionsViewId,

  _refBtClear,
  _hClear,
  _hToggleOptions,
  propsOptions
) => {
  const _optionNames = optionNames || optionName || '';

  return isLoading
    ? [
        (<span
           className={CL_SPINNER}
           data-loader="circle"
        />),
        joinByBlank('Loading', _optionNames, '...')]
    : isLoadingFailed ? [
        (<Button
           className={CL_BT_SPINNER_FAILED}
           data-loader="circle-failed"
           onClick={onLoadOption}
        />),
        joinByBlank('Loading', _optionNames, 'Failed')
    ] : isBtSvgClear ? [
       (<BtSvgClear
           refEl={_refBtClear}
           style={S_SVG_CLEAR}
           onClick={_hClear}
       />)
    ] : [
       (<ArrowCell
           isShowOption={isShowOption}
           labelId={labelId}
           controlsId={optionsViewId}
           onClick={_hToggleOptions}
       />),
      placeholder || joinByBlank('Select', optionName, _crNumberOfOptionsToken(propsOptions), '...')
    ];
};

export default crAfterInputEl
