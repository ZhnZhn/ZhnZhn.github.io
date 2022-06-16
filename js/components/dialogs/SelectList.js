"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _DialogCell = _interopRequireDefault(require("./DialogCell"));

var _jsxRuntime = require("react/jsx-runtime");

const SelectList = _ref => {
  let {
    isShow,
    isShowLabels,
    selectProps,
    isShowById,
    hSelect
  } = _ref;
  return (selectProps || []).map((_ref2, index) => {
    let {
      id,
      ...restItem
    } = _ref2;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: isShowById(id),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectWithLoad, { ...restItem,
        isShow: isShow,
        isShowLabels: isShowLabels,
        onSelect: item => hSelect(id, index, item)
      })
    }, id);
  });
};

var _default = SelectList;
exports.default = _default;
//# sourceMappingURL=SelectList.js.map