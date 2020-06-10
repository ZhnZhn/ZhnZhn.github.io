"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _useListen = _interopRequireDefault(require("../hooks/useListen"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _MenuSlider = _interopRequireDefault(require("./MenuSlider"));

var CL_SCROLL = 'scroll-container-y';
var S = {
  BROWSER: {
    paddingRight: 0
  },
  SCROLL_PANE: {
    height: '92%'
  }
};

var BrowserSlider = /*#__PURE__*/_react["default"].memo(function (props) {
  var isInitShow = props.isInitShow,
      caption = props.caption,
      store = props.store,
      browserType = props.browserType,
      showAction = props.showAction;

  var _useState = (0, _react.useState)(!!isInitShow),
      isShow = _useState[0],
      setIsShow = _useState[1],
      _hHide = (0, _react.useCallback)(function () {
    setIsShow(false);
  }, []);

  (0, _useListen["default"])(store, function (actionType, data) {
    if (actionType === showAction && data === browserType) {
      setIsShow(true);
    }
  });
  return /*#__PURE__*/_react["default"].createElement(_Comp["default"].Browser, {
    isShow: isShow,
    style: S.BROWSER
  }, /*#__PURE__*/_react["default"].createElement(_Comp["default"].BrowserCaption, {
    caption: caption,
    onClose: _hHide
  }), /*#__PURE__*/_react["default"].createElement(_Comp["default"].ScrollPane, {
    className: CL_SCROLL,
    style: S.SCROLL_PANE
  }, /*#__PURE__*/_react["default"].createElement(_MenuSlider["default"], props)));
});

var _default = BrowserSlider;
exports["default"] = _default;
//# sourceMappingURL=BrowserSlider.js.map