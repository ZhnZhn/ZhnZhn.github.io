import { BtSvgClear } from '../zhn/BtSvgX';
import ButtonCircle2 from '../zhn/ButtonCircle2';
import ArrowCell from './ArrowCell';

import {
  CL_SPINNER,
  CL_SPINNER_FAILED
} from './CL';

const S_ARROW_SHOW = {
  borderColor: '#1b75bb transparent transparent'
}
, S_SVG_CLEAR = {
  position: 'absolute',
  top: 5,
  right: 8,
  stroke: '#1b75bb'
};

const crAfterInputEl = (
  props,

  isBtSvgClear,
  isShowOption,
  optionNames,

  _refArrowCell,
  _hClear,
  _hToggleOptions
) => {
  const {
    isLoading,
    isLoadingFailed,
    placeholder,
    optionName,
    onLoadOption
  } = props;

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
       _placeholder = placeholder || `Select ${optionName}...`;
       _afterInputEl = (
         <ArrowCell
           ref={_refArrowCell}
           arrowStyle={isShowOption ? S_ARROW_SHOW : void 0}
           onClick={_hToggleOptions}
         />
      );
    }

  } else if (isLoading){
    _placeholder = `Loading ${optionNames}...`;
    _afterInputEl = (
      <span
        className={CL_SPINNER}
        data-loader="circle"
      />
    );
  } else if (isLoadingFailed) {
     _placeholder=`Loading ${optionNames} Failed`;
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
