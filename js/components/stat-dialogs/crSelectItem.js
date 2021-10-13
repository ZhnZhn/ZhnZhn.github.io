"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _crIsId = _interopRequireDefault(require("./crIsId"));

var _jsxRuntime = require("react/jsx-runtime");

const crSelectItem = (conf, index, {
  isShowLabels,
  isRow,
  fSelect
}) => {
  const {
    id,
    caption,
    options
  } = conf,
        _isShow = !isRow[(0, _crIsId.default)(id)];

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
    isShow: _isShow,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
      isShowLabels: isShowLabels,
      caption: caption,
      options: options,
      onSelect: fSelect(index)
    })
  }, id);
};

var _default = crSelectItem;
exports.default = _default;
//# sourceMappingURL=crSelectItem.js.map