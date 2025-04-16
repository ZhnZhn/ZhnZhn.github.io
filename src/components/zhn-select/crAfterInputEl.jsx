import { joinByBlank } from '../../utils/arrFn';

import {
  crAbsoluteTopLeftStyle
} from '../styleFn';

import { BtSvgClear } from '../zhn/BtSvgX';
import ButtonCircle2 from '../zhn/ButtonCircle2';
import ArrowCell from './ArrowCell';

import {
  CL_SPINNER,
  CL_SPINNER_FAILED
} from './CL';

const S_SVG_CLEAR = {
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
        (<ButtonCircle2
           className={CL_SPINNER_FAILED}
           dataLoader="circle-failed"
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
