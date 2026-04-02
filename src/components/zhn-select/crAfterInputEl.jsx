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

const DATA_LOADER_LOADING = "circle"
, DATA_LOADER_ERR = `${DATA_LOADER_LOADING}-failed`
, CL_BT_SPINNER_FAILED = crBtCircle2Cn(CL_SPINNER_FAILED)
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
           key={DATA_LOADER_LOADING}
           data-loader={DATA_LOADER_LOADING}
           className={CL_SPINNER}
        />),
        joinByBlank('Loading', _optionNames, '...')]
    : isLoadingFailed ? [
        (<Button
           key={DATA_LOADER_ERR}
           data-loader={DATA_LOADER_ERR}
           className={CL_BT_SPINNER_FAILED}
           onClick={onLoadOption}
        />),
        joinByBlank('Loading', _optionNames, 'Failed')
    ] : isBtSvgClear ? [
       (<BtSvgClear
           key="c"
           refEl={_refBtClear}
           style={S_SVG_CLEAR}
           onClick={_hClear}
       />)
    ] : [
       (<ArrowCell
           key="a"
           isShowOption={isShowOption}
           labelId={labelId}
           controlsId={optionsViewId}
           onClick={_hToggleOptions}
       />),
      placeholder || joinByBlank('Select', optionName, _crNumberOfOptionsToken(propsOptions), '...')
    ];
};

export default crAfterInputEl
