"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Button = _interopRequireDefault(require("./Button"));

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var S = {
  MODAL: {
    position: 'static',
    width: 350,
    height: 175,
    margin: '70px auto'
  },
  ROOT: {
    color: 'gray',
    paddingTop: 8,
    paddingLeft: 16,
    lineHeight: 1.7,
    fontWeight: 'bold'
  },
  DATE: {
    color: '#80c040'
  },
  CLOSE: {
    color: '#232f3b'
  }
};

var ReloadDialog = function ReloadDialog(_ref) {
  var isShow = _ref.isShow,
      data = _ref.data,
      onClose = _ref.onClose;

  var _hReload = (0, _react.useCallback)(function () {
    document.cookie = "erc=1";
    window.location.reload(true);
  }, []),
      _commandButtons = (0, _react.useMemo)(function () {
    return [/*#__PURE__*/_react["default"].createElement(_Button["default"].Flat, {
      key: "reload",
      caption: "Yes, Reload",
      isPrimary: true,
      onClick: _hReload
    }), /*#__PURE__*/_react["default"].createElement(_Button["default"].Flat, {
      key: "no",
      rootStyle: S.CLOSE,
      caption: "No",
      onClick: onClose
    })];
  }, [onClose]),
      _ref2 = data || {},
      _ref2$buildDate = _ref2.buildDate,
      buildDate = _ref2$buildDate === void 0 ? '' : _ref2$buildDate;
  /*eslint-disable react-hooks/exhaustive-deps */


  return /*#__PURE__*/_react["default"].createElement(_ModalDialog["default"], {
    style: S.MODAL,
    caption: "Reload Web App",
    isShow: isShow,
    commandButtons: _commandButtons,
    withoutClose: true,
    onClose: onClose
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: S.ROOT
  }, /*#__PURE__*/_react["default"].createElement("p", null, "Browser has loaded ERC from a cache."), /*#__PURE__*/_react["default"].createElement("p", null, "Reload web app ERC to the new build?"), /*#__PURE__*/_react["default"].createElement("p", {
    style: S.DATE
  }, "New build " + buildDate + " is available.")));
};
/*
ReloadDialog.propTypes = {
  isShow: PropTypes.bool,
  data: PropTypes.shape({
    buildDate: PropTypes.string
  }),
  onClose: PropTypes.func
}
*/


var _default = ReloadDialog;
exports["default"] = _default;
//# sourceMappingURL=ReloadDialog.js.map