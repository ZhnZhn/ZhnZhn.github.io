"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));
var _crIsId = require("./crIsId");
var _jsxRuntime = require("react/jsx-runtime");
const S_CAPTION = {
  wordBreak: 'break-word'
};
const crSelectItem = (conf, index, _ref) => {
  let {
    isShowLabels,
    isRow,
    fSelect
  } = _ref;
  const {
      id,
      caption,
      options,
      placeholder
    } = conf,
    _isShow = !isRow[(0, _crIsId.crIsId)(id)];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
    isShow: _isShow,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
      isShowLabels: isShowLabels,
      caption: caption,
      captionStyle: S_CAPTION,
      placeholder: placeholder,
      options: options,
      onSelect: fSelect(index)
    })
  }, id);
};
var _default = exports.default = crSelectItem;
//# sourceMappingURL=crSelectItem.js.map