"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));
var _SelectWithLoad = _interopRequireDefault(require("./SelectWithLoad"));
var _SelectOneTwo = _interopRequireDefault(require("./rows/SelectOneTwo"));
var _jsxRuntime = require("react/jsx-runtime");
const SelectList = _ref => {
  let {
    isShow,
    isShowLabels,
    selectProps,
    isShowById,
    hSelect,
    tupleFilter
  } = _ref;
  const [filterId, filters] = tupleFilter || [];
  return (0, _uiApi.safeMap)(selectProps, (_ref2, index) => {
    let {
      type,
      id,
      ...restItem
    } = _ref2;
    const Comp = !type ? _SelectWithLoad.default : type === "two" ? _SelectOneTwo.default : null,
      _onSelect = item => hSelect(id, index, item);
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide.default, {
      isShow: isShowById(id),
      children: Comp && /*#__PURE__*/(0, _jsxRuntime.jsx)(Comp
      //uri, jsonProp, caption, isWithInput
      //uri, caption, oneCaption, twoCaption, isAddTitle
      , {
        ...restItem,
        isShow: isShow,
        isShowLabels: isShowLabels,
        onSelect: _onSelect,
        filters: id === filterId ? void 0 : filters
      })
    }, id);
  });
};
var _default = exports.default = SelectList;
//# sourceMappingURL=SelectList.js.map