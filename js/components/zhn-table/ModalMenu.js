"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var S = {
  ROW: {
    paddingLeft: 0,
    paddingBottom: 4
  },
  HR: {
    borderColor: 'black',
    marginTop: 2,
    marginBottom: 2
  }
};

var _renderHeaders = function _renderHeaders(headers, _onToggle) {
  /*eslint-disable no-unused-vars*/
  var rank = headers[0],
      restHeader = headers.slice(1);
  /*eslint-enable no-unused-vars*/

  return restHeader.map(function (h, index) {
    return _react["default"].createElement(_DialogCell["default"].RowCheckBox, {
      key: h.name,
      rootStyle: S.ROW,
      checkedColor: "black",
      caption: h.name,
      value: !h.isHide,
      onToggle: function onToggle() {
        return _onToggle(index);
      }
    });
  });
};

var ModalMenu = function ModalMenu(_ref) {
  var isShow = _ref.isShow,
      style = _ref.style,
      onClose = _ref.onClose,
      isGridLine = _ref.isGridLine,
      onToggleGrid = _ref.onToggleGrid,
      headers = _ref.headers,
      onToggle = _ref.onToggle;
  return _react["default"].createElement(_ModalPopup["default"], {
    style: style,
    isShow: isShow,
    onClose: onClose
  }, _react["default"].createElement(_DialogCell["default"].RowCheckBox, {
    rootStyle: S.ROW,
    checkedColor: "black",
    caption: "withStripLines",
    value: isGridLine,
    onToggle: onToggleGrid
  }), _react["default"].createElement("hr", {
    style: S.HR
  }), _renderHeaders(headers, onToggle));
};

var _default = ModalMenu;
exports["default"] = _default;
//# sourceMappingURL=ModalMenu.js.map