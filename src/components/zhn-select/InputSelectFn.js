import {
  isTokenInStr,
  getRefValue,
  setRefValue
} from '../uiApi';

import { CL_OPTIONS_ROW_ACTIVE } from './CL';

const NO_ITEMS_FOUND_CAPTION = "No items found";
export const NO_ITEMS_FOUND_VALUE = NO_ITEMS_FOUND_CAPTION

export const crAriaExpandedProps = (
  isShowOption,
  controlsId
) => ({
  "aria-expanded": isShowOption,
  "aria-controls": isShowOption
     ? controlsId : void 0
})

export const crWidthStyle = (
  width,
  style
) => width
  ? {
      ...style,
      width: width + (isTokenInStr(""+width, "%") ? "" : "px")
    }
  : null;

const INPUT_PREFIX = "From input:"
, DF_OPTIONS = []
, _isArr = Array.isArray;

export const crValue = str => (str || "")
  .replace(INPUT_PREFIX, "")
  .trim();

const _crInputItem = (
  inputValue, {
  propCaption,
  isWithInput,
  maxInput
}) => {
  const _inputValue = inputValue.slice(0, maxInput)
  , _caption = isWithInput
       ? `${INPUT_PREFIX} ${_inputValue}`
       : NO_ITEMS_FOUND_CAPTION;
  return {
    [propCaption]: _caption,
    _c: _caption,
    value: NO_ITEMS_FOUND_VALUE,
    inputValue: _inputValue
  };
};

export const crInitialStateFromProps = (
  propCaption,
  options
) => {
  const _options = _isArr(options)
    ? options
    : DF_OPTIONS;

  _options.forEach(item => {
    item._c = item[propCaption].toLowerCase()
  })

  return {
    value: "",

    initialOptions: _options,
    options: _options,
    nAll: _options.length
  };
}

const _filterOptions = (
  options,
  value
) => {
   const _value = value.toLowerCase();
   return options.filter(item => item._c
     .indexOf(_value) !== -1
   );
}

export const crFilterOptions = (
  options,
  token,
  props
) => {
  const _arr = _filterOptions(options, token);
  if (_arr.length === 0){
    _arr.push(_crInputItem(token, props))
  }
  return _arr;
}

const _calcDeltaTop = (
  comp,
  optionsComp
) => comp && optionsComp
  ? comp.offsetTop - optionsComp.scrollTop
  : void 0;

export const makeVisible = (
  comp,
  indexActive,
  optionsComp
) => {
  if (comp){
    if (indexActive === 0){
      return;
    }
    const deltaTop = _calcDeltaTop(comp, optionsComp);
    if (deltaTop > 70){
      optionsComp.scrollTop += deltaTop - 70;
    }
    if (deltaTop < 0){
      optionsComp.scrollTop = 0;
    }
  }
};

export const decorateCurrentComp = (
  comp,
  indexEl,
  indexActive
) => {
  if (comp){
    comp.classList.add(CL_OPTIONS_ROW_ACTIVE);
    if (indexEl) {
      indexEl.textContent = indexActive + 1
    }
  }
};

export const undecorateComp = (comp) => {
  if (comp){
    comp.classList.remove(CL_OPTIONS_ROW_ACTIVE);
  }
};

const _predicateStepDown = delta => delta > 70
, _predicateStepUp = delta => delta < 70
, _decorateByStep = (
    fnPredicate,
    comp,
    indexEl,
    indexActive,
    optionsComp
) => {
  decorateCurrentComp(comp, indexEl, indexActive)
  const deltaTop = _calcDeltaTop(comp, optionsComp);
  if (fnPredicate(deltaTop)){
     optionsComp.scrollTop += deltaTop - 70;
  }
}

export const stepDownOption = (
  getCurrentComp,
  refIndexActive,
  maxIndex,
  indexEl,
  optionsComp
) => {
  const prevComp = getCurrentComp();

  if (prevComp){
     undecorateComp(prevComp);

     setRefValue(refIndexActive, getRefValue(refIndexActive) + 1)
     if (getRefValue(refIndexActive)>=maxIndex){
        setRefValue(refIndexActive, 0)
        optionsComp.scrollTop = 0;
     }

     _decorateByStep(
       _predicateStepDown,
       getCurrentComp(),
       indexEl,
       getRefValue(refIndexActive),
       optionsComp
     )
  }
}

export const stepUpOption = (
  getCurrentComp,
  refIndexActive,
  maxIndex,
  indexEl,
  optionsComp
) => {
  const prevComp = getCurrentComp();
  if (prevComp){
    undecorateComp(prevComp);


    setRefValue(refIndexActive, getRefValue(refIndexActive) - 1)
    if (getRefValue(refIndexActive) < 0){
      setRefValue(refIndexActive, maxIndex - 1)
      const bottomComp = getCurrentComp()
      optionsComp.scrollTop = bottomComp.offsetTop
    }

    _decorateByStep(
      _predicateStepUp,
      getCurrentComp(),
      indexEl,
      getRefValue(refIndexActive),
      optionsComp
    )
  }
}
