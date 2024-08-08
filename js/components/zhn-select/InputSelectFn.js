"use strict";

exports.__esModule = true;
exports.updateOptionsIfFilters = exports.undecorateComp = exports.stepUpOption = exports.stepDownOption = exports.makeVisible = exports.decorateCurrentComp = exports.crWidthStyle = exports.crValue = exports.crOptionsFromInitialOptions = exports.crInitialStateFromProps = exports.crFilterOptions = exports.NO_ITEMS_FOUND_VALUE = void 0;
var _uiApi = require("../uiApi");
var _CL = require("./CL");
const NO_ITEMS_FOUND_CAPTION = "No items found";
const NO_ITEMS_FOUND_VALUE = exports.NO_ITEMS_FOUND_VALUE = NO_ITEMS_FOUND_CAPTION;
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
    _caption = isWithInput ? `${INPUT_PREFIX} ${_inputValue}` : NO_ITEMS_FOUND_CAPTION;
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
const _fCrFilter = filters => item => filters.indexOf(item.v) === -1;
const _filterOptions = (options, value, filters) => {
  const _value = value.toLowerCase(),
    _isCaptionItem = item => item._c.indexOf(_value) !== -1,
    _isFilterItem = filters ? _fCrFilter(filters) : void 0,
    _isItem = _isFilterItem ? item => _isCaptionItem(item) && _isFilterItem(item) : _isCaptionItem;
  return options.filter(_isItem);
};
const crFilterOptions = (options, token, props) => {
  const _arr = _filterOptions(options, token, props.filters);
  if (_arr.length === 0) {
    _arr.push(_crInputItem(token, props));
  }
  return _arr;
};
exports.crFilterOptions = crFilterOptions;
const crOptionsFromInitialOptions = prevState => {
  const {
    stateFilters,
    initialOptions
  } = prevState;
  return stateFilters ? initialOptions.filter(_fCrFilter(stateFilters)) : initialOptions;
};
exports.crOptionsFromInitialOptions = crOptionsFromInitialOptions;
const updateOptionsIfFilters = (state, setState, filters, propCaption, onSelect, setSelectedItemIndex) => {
  if (state.stateFilters !== filters) {
    setState(prevState => {
      const {
          initialOptions
        } = prevState,
        _options = !filters || filters.length === 0 ? initialOptions : initialOptions.filter(_fCrFilter(filters));
      let _value = prevState.value;
      if (_value) {
        const _isPropCaptionEqualValue = item => item[propCaption] === _value,
          _v = initialOptions.find(_isPropCaptionEqualValue).v;
        if (filters && filters.indexOf(_v) !== -1) {
          _value = "";
        }
        if (_value) {
          setSelectedItemIndex(_options.findIndex(_isPropCaptionEqualValue));
        } else {
          setSelectedItemIndex(0);
          setTimeout(onSelect, 200);
        }
      }
      return {
        ...prevState,
        stateFilters: filters,
        options: _options,
        value: _value
      };
    });
  }
};
exports.updateOptionsIfFilters = updateOptionsIfFilters;
const _calcDeltaTop = (comp, optionsEl) => comp && optionsEl ? comp.offsetTop - optionsEl.scrollTop : void 0;
const OPTIONS_SCROLL_TOP = 70;
const makeVisible = (comp, indexActive, optionsEl) => {
  if (comp) {
    if (indexActive === 0) {
      return;
    }
    const deltaTop = _calcDeltaTop(comp, optionsEl);
    if (deltaTop > OPTIONS_SCROLL_TOP) {
      optionsEl.scrollTop += deltaTop - OPTIONS_SCROLL_TOP;
    }
    if (deltaTop < 0) {
      optionsEl.scrollTop = 0;
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
const _predicateStepDown = delta => delta > OPTIONS_SCROLL_TOP,
  _predicateStepUp = delta => delta < OPTIONS_SCROLL_TOP,
  _decorateByStep = (fnPredicate, comp, indexEl, indexActive, optionsEl) => {
    decorateCurrentComp(comp, indexEl, indexActive);
    const deltaTop = _calcDeltaTop(comp, optionsEl);
    if (fnPredicate(deltaTop)) {
      optionsEl.scrollTop += deltaTop - OPTIONS_SCROLL_TOP;
    }
  };
const _getChildNodesLength = el => el.childNodes.length;
const stepDownOption = (getCurrentComp, refIndexActive, indexEl, optionsEl) => {
  const prevComp = getCurrentComp();
  if (prevComp) {
    undecorateComp(prevComp);
    (0, _uiApi.setRefValue)(refIndexActive, (0, _uiApi.getRefValue)(refIndexActive) + 1);
    if ((0, _uiApi.getRefValue)(refIndexActive) >= _getChildNodesLength(optionsEl)) {
      (0, _uiApi.setRefValue)(refIndexActive, 0);
      optionsEl.scrollTop = 0;
    }
    _decorateByStep(_predicateStepDown, getCurrentComp(), indexEl, (0, _uiApi.getRefValue)(refIndexActive), optionsEl);
  }
};
exports.stepDownOption = stepDownOption;
const stepUpOption = (getCurrentComp, refIndexActive, indexEl, optionsEl) => {
  const prevComp = getCurrentComp();
  if (prevComp) {
    undecorateComp(prevComp);
    (0, _uiApi.setRefValue)(refIndexActive, (0, _uiApi.getRefValue)(refIndexActive) - 1);
    if ((0, _uiApi.getRefValue)(refIndexActive) < 0) {
      (0, _uiApi.setRefValue)(refIndexActive, _getChildNodesLength(optionsEl) - 1);
      const bottomComp = getCurrentComp();
      optionsEl.scrollTop = bottomComp.offsetTop;
    }
    _decorateByStep(_predicateStepUp, getCurrentComp(), indexEl, (0, _uiApi.getRefValue)(refIndexActive), optionsEl);
  }
};
exports.stepUpOption = stepUpOption;
//# sourceMappingURL=InputSelectFn.js.map