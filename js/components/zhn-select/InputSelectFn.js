"use strict";

exports.__esModule = true;
exports.undecorateComp = exports.stepUpOption = exports.stepDownOption = exports.makeVisible = exports.decorateCurrentComp = exports.crWidthStyle = exports.crValue = exports.crInitialStateFromProps = exports.crFilterOptions = exports.crAriaExpandedProps = exports.NO_ITEMS_FOUND_VALUE = void 0;
var _uiApi = require("../uiApi");
var _CL = require("./CL");
const NO_ITEMS_FOUND_CAPTION = "No items found";
const NO_ITEMS_FOUND_VALUE = exports.NO_ITEMS_FOUND_VALUE = NO_ITEMS_FOUND_CAPTION;
const crAriaExpandedProps = (isShowOption, controlsId) => ({
  "aria-expanded": isShowOption,
  "aria-controls": isShowOption ? controlsId : void 0
});
exports.crAriaExpandedProps = crAriaExpandedProps;
const crWidthStyle = (width, style) => width ? {
  ...style,
  width: width + ((0, _uiApi.isTokenInStr)("" + width, "%") ? "" : "px")
} : null;
exports.crWidthStyle = crWidthStyle;
const INPUT_PREFIX = "From input:",
  DF_OPTIONS = [],
  _isArr = Array.isArray;
const crValue = str => (str || "").replace(INPUT_PREFIX, "").trim();
exports.crValue = crValue;
const _crInputItem = (inputValue, _ref) => {
  let {
    propCaption,
    isWithInput,
    maxInput
  } = _ref;
  const _inputValue = inputValue.slice(0, maxInput),
    _caption = isWithInput ? INPUT_PREFIX + " " + _inputValue : NO_ITEMS_FOUND_CAPTION;
  return {
    [propCaption]: _caption,
    _c: _caption,
    value: NO_ITEMS_FOUND_VALUE,
    inputValue: _inputValue
  };
};
const crInitialStateFromProps = (propCaption, options) => {
  const _options = _isArr(options) ? options : DF_OPTIONS;
  _options.forEach(item => {
    item._c = item[propCaption].toLowerCase();
  });
  return {
    value: "",
    initialOptions: _options,
    options: _options,
    nAll: _options.length
  };
};
exports.crInitialStateFromProps = crInitialStateFromProps;
const _filterOptions = (options, value) => {
  const _value = value.toLowerCase();
  return options.filter(item => item._c.indexOf(_value) !== -1);
};
const crFilterOptions = (options, token, props) => {
  const _arr = _filterOptions(options, token);
  if (_arr.length === 0) {
    _arr.push(_crInputItem(token, props));
  }
  return _arr;
};
exports.crFilterOptions = crFilterOptions;
const _calcDeltaTop = (comp, optionsComp) => comp && optionsComp ? comp.offsetTop - optionsComp.scrollTop : void 0;
const makeVisible = (comp, indexActive, optionsComp) => {
  if (comp) {
    if (indexActive === 0) {
      return;
    }
    const deltaTop = _calcDeltaTop(comp, optionsComp);
    if (deltaTop > 70) {
      optionsComp.scrollTop += deltaTop - 70;
    }
    if (deltaTop < 0) {
      optionsComp.scrollTop = 0;
    }
  }
};
exports.makeVisible = makeVisible;
const decorateCurrentComp = (comp, indexEl, indexActive) => {
  if (comp) {
    comp.classList.add(_CL.CL_OPTIONS_ROW_ACTIVE);
    if (indexEl) {
      indexEl.textContent = indexActive + 1;
    }
  }
};
exports.decorateCurrentComp = decorateCurrentComp;
const undecorateComp = comp => {
  if (comp) {
    comp.classList.remove(_CL.CL_OPTIONS_ROW_ACTIVE);
  }
};
exports.undecorateComp = undecorateComp;
const _predicateStepDown = delta => delta > 70,
  _predicateStepUp = delta => delta < 70,
  _decorateByStep = (fnPredicate, comp, indexEl, indexActive, optionsComp) => {
    decorateCurrentComp(comp, indexEl, indexActive);
    const deltaTop = _calcDeltaTop(comp, optionsComp);
    if (fnPredicate(deltaTop)) {
      optionsComp.scrollTop += deltaTop - 70;
    }
  };
const stepDownOption = (getCurrentComp, refIndexActive, maxIndex, indexEl, optionsComp) => {
  const prevComp = getCurrentComp();
  if (prevComp) {
    undecorateComp(prevComp);
    (0, _uiApi.setRefValue)(refIndexActive, (0, _uiApi.getRefValue)(refIndexActive) + 1);
    if ((0, _uiApi.getRefValue)(refIndexActive) >= maxIndex) {
      (0, _uiApi.setRefValue)(refIndexActive, 0);
      optionsComp.scrollTop = 0;
    }
    _decorateByStep(_predicateStepDown, getCurrentComp(), indexEl, (0, _uiApi.getRefValue)(refIndexActive), optionsComp);
  }
};
exports.stepDownOption = stepDownOption;
const stepUpOption = (getCurrentComp, refIndexActive, maxIndex, indexEl, optionsComp) => {
  const prevComp = getCurrentComp();
  if (prevComp) {
    undecorateComp(prevComp);
    (0, _uiApi.setRefValue)(refIndexActive, (0, _uiApi.getRefValue)(refIndexActive) - 1);
    if ((0, _uiApi.getRefValue)(refIndexActive) < 0) {
      (0, _uiApi.setRefValue)(refIndexActive, maxIndex - 1);
      const bottomComp = getCurrentComp();
      optionsComp.scrollTop = bottomComp.offsetTop;
    }
    _decorateByStep(_predicateStepUp, getCurrentComp(), indexEl, (0, _uiApi.getRefValue)(refIndexActive), optionsComp);
  }
};
exports.stepUpOption = stepUpOption;
//# sourceMappingURL=InputSelectFn.js.map