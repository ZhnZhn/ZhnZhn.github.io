"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));
var _RowCheckBox = _interopRequireDefault(require("../dialogs/rows/RowCheckBox3"));
var _Style = require("./Style");
var _jsxRuntime = require("react/jsx-runtime");
const S_ROW = {
    paddingLeft: 0,
    paddingBottom: 4
  },
  _crHrStyle = () => ({
    borderColor: (0, _Style.getColorBlack)(),
    marginTop: 2,
    marginBottom: 2
  });
const _renderHeaders = (headers, onToggle) => {
  /*eslint-disable no-unused-vars*/
  const [rank, ...restHeader] = headers
    /*eslint-enable no-unused-vars*/,
    _colorBlack = (0, _Style.getColorBlack)();
  return restHeader.map((h, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox.default, {
    style: S_ROW,
    color: _colorBlack,
    caption: h.name,
    value: !h.isHide,
    onToggle: () => onToggle(index + 1)
  }, h.name));
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
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox.default, {
      style: S_ROW,
      color: (0, _Style.getColorBlack)(),
      caption: "withStripLines",
      value: isGridLine,
      onToggle: onToggleGrid
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("hr", {
      style: _crHrStyle()
    }), _renderHeaders(headers, onToggle)]
  });
};
var _default = exports.default = ModalMenu;
//# sourceMappingURL=ModalMenu.js.map