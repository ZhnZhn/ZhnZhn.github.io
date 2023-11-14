import {
  NO_RESULT,
  crWidthStyle
} from './InputSelectFn';

import OptionsFooter from './OptionsFooter'

import {
  S_NONE,
  S_BLOCK
} from '../styleFn';

import {
  CL_OPTIONS,
  CL_OPTIONS_DIV
} from './CL';

const _crFooterIndex = (
  options,
  initialOptions
) => [
  //_nFiltered
  options[0] && (options[0].value !== NO_RESULT)
     ? options.length
     : 0,
  // _nAll
  initialOptions
     ? initialOptions.length
     : 0
];

const OptionsView = ({
  optionsStyle,
  width,
  noFooterBts,

  isShowOption,
  options,
  initialOptions,

  optionListEl,

  refOptionsComp,
  refIndexNode,
  indexActive,

  onClear
}) => {
  const _styleOptions = isShowOption
    ? S_BLOCK
    : S_NONE
  , _rootWidthStyle = crWidthStyle(
      width,
      _styleOptions
    )
  , [
    _nFiltered,
    _nAll
  ] = _crFooterIndex(
     options,
     initialOptions
   );

  return (
    <div
       className={CL_OPTIONS}
       style={_rootWidthStyle}
       data-scrollable={true}
       tabIndex="-1"
     >
      <div
         ref={refOptionsComp}
         className={CL_OPTIONS_DIV}
         style={{...optionsStyle, ..._rootWidthStyle}}
         tabIndex="-1"
       >
        {optionListEl}
      </div>
      <OptionsFooter
         ref={refIndexNode}
         noFooterBts={noFooterBts}
         indexActiveOption={indexActive}
         nAll={_nAll}
         nFiltered={_nFiltered}
         onClear={onClear}
      />
    </div>
  );
}

export default OptionsView
