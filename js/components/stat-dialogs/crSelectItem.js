"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));
var _RowInputSelect = _interopRequireDefault(require("../dialogs/rows/RowInputSelect"));
var _crIsId = require("./crIsId");
var _jsxRuntime = require("react/jsx-runtime");
const S_CAPTION = {
  wordBreak: 'break-word'
};
const crSelectItem = (conf, index, props) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide.default, {
  isShow: !props.isRow[(0, _crIsId.crIsId)(conf.id)],
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputSelect.default, {
    captionStyle: S_CAPTION,
    caption: conf.caption,
    placeholder: conf.placeholder,
    options: conf.options,
    isShowLabels: props.isShowLabels,
    onSelect: props.fSelect(index)
  })
}, conf.id);
var _default = exports.default = crSelectItem;
//# sourceMappingURL=crSelectItem.js.map