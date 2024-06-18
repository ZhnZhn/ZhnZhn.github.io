import { joinBy } from '../uiApi';
import { BtSvgClear } from '../zhn/BtSvgX';
import ButtonCircle2 from '../zhn/ButtonCircle2';
import ArrowCell from './ArrowCell';

import {
  CL_SPINNER,
  CL_SPINNER_FAILED
} from './CL';

const S_SVG_CLEAR = {
  position: 'absolute',
  top: 5,
  right: 8,
  stroke: '#1b75bb'
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

  _hClear,
  _hToggleOptions,
  propsOptions
) => {
  const _optionNames = optionNames || optionName || '';

  let _placeholder, _afterInputEl;
  if (!isLoading && !isLoadingFailed){
     if (isBtSvgClear) {
       _afterInputEl = (
          <BtSvgClear
             style={S_SVG_CLEAR}
             onClick={_hClear}
          />
        )
     } else {
       const _propsOptionsLength = propsOptions.length
       , _numberOfOptions = _propsOptionsLength > 1000
           ? `(${_propsOptionsLength})`
           : '';
       _placeholder = placeholder
         || joinBy(' ', 'Select', optionName, _numberOfOptions, '...');
       _afterInputEl = (
         <ArrowCell
           isShowOption={isShowOption}
           labelId={labelId}
           controlsId={optionsViewId}
           onClick={_hToggleOptions}
         />
      );
    }

  } else if (isLoading){
    _placeholder = joinBy(' ', 'Loading', _optionNames, '...');
    _afterInputEl = (
      <span
        className={CL_SPINNER}
        data-loader="circle"
      />
    );
  } else if (isLoadingFailed) {
     _placeholder = joinBy(' ', 'Loading', _optionNames, 'Failed');
     _afterInputEl = (
       <ButtonCircle2
         className={CL_SPINNER_FAILED}
         dataLoader="circle-failed"
         onClick={onLoadOption}
       />
     )
  }
  return [
    _afterInputEl,
    _placeholder
  ];
}

export default crAfterInputEl
