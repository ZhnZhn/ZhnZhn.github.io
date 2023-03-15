"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));
var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));
var _jsxRuntime = require("react/jsx-runtime");
const S_ROW = {
    paddingLeft: 0,
    paddingBottom: 4
  },
  S_HR = {
    borderColor: 'black',
    marginTop: 2,
    marginBottom: 2
  };
const _renderHeaders = (headers, onToggle) => {
  /*eslint-disable no-unused-vars*/
  const [rank, ...restHeader] = headers;
  /*eslint-enable no-unused-vars*/
  return restHeader.map((h, index) => {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowCheckBox1, {
      style: S_ROW,
      checkedColor: "black",
      caption: h.name,
      value: !h.isHide,
      onToggle: () => onToggle(index + 1)
    }, h.name);
  });
};
const ModalMenu = _ref => {
  let {
    isShow,
    isGridLine,
    style,
    headers,
    onToggleGrid,
    onToggle,
    onClose
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalPopup.default, {
    style: style,
    isShow: isShow,
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowCheckBox1, {
      style: S_ROW,
      checkedColor: "black",
      caption: "withStripLines",
      value: isGridLine,
      onToggle: onToggleGrid
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("hr", {
      style: S_HR
    }), _renderHeaders(headers, onToggle)]
  });
};
var _default = ModalMenu;
exports.default = _default;
//# sourceMappingURL=ModalMenu.js.map