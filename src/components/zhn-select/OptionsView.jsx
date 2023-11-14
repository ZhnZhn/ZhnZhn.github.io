import { useMemo } from '../uiApi';

import {
  NO_RESULT,
  crWidthStyle
} from './InputSelectFn';

import OptionList from './OptionList';
import OptionsFooter from './OptionsFooter';

import {
  S_NONE,
  S_BLOCK
} from '../styleFn';

import {
  CL_OPTIONS,
  CL_OPTIONS_DIV,
  CL_OPTIONS_ROW
} from './CL';

const _crFooterIndex = (
  options
) => options[0] && (options[0].value !== NO_RESULT)
  ? options.length
  : 0;

const OptionsView = ({
  optionsStyle,
  width,
  propCaption,
  ItemOptionComp,
  noFooterBts,

  isShowOption,
  options,
  nAll,

  refOptionsComp,
  refOptionNode,
  refIndexNode,
  indexActive,

  onClickItem,
  onClear
}) => {
  /*eslint-disable react-hooks/exhaustive-deps */
  const _optionListEl = useMemo(() => (
    <OptionList
      options={options}
      refOptionNode={refOptionNode}
      className={CL_OPTIONS_ROW}
      selectedIndex={indexActive}
      propCaption={propCaption}
      onClick={onClickItem}
      ItemComp={ItemOptionComp}
    />
  ), [options])
  // indexActive
  /*eslint-enable react-hooks/exhaustive-deps */

  , _styleOptions = isShowOption
    ? S_BLOCK
    : S_NONE
  , _rootWidthStyle = crWidthStyle(
      width,
      _styleOptions
    )
  , _nFiltered = _crFooterIndex(
      options
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
        {_optionListEl}
      </div>
      <OptionsFooter
         ref={refIndexNode}
         noFooterBts={noFooterBts}
         indexActiveOption={indexActive}
         nAll={nAll}
         nFiltered={_nFiltered}
         onClear={onClear}
      />
    </div>
  );
}

export default OptionsView
