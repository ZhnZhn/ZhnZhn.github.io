"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _memoEqual = _interopRequireDefault(require("../hoc/memoEqual"));

var _Button = _interopRequireDefault(require("./Button"));

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _MathCaptcha = _interopRequireDefault(require("../zhn-moleculs/MathCaptcha"));

var _FactoryAction = _interopRequireDefault(require("../../flux/actions/FactoryAction"));

//import PropTypes from "prop-types";
var MSG_PREFIX = "Would you like load item";
var MSG_SUFFIX = "from url?";
var S = {
  MODAL: {
    position: 'static',
    width: 400,
    height: 205,
    margin: '70px auto'
  },
  ROOT_DIV: {
    margin: 5
  },
  NAME: {
    color: '#a487d4',
    paddingLeft: 5,
    paddingRight: 5
  },
  DESCR: {
    color: 'gray',
    width: 400,
    paddingLeft: 10,
    paddingTop: 5,
    lineHeight: 1.4,
    fontWeight: 'bold',
    whiteSpace: 'pre'
  },
  CAPTCHA: {
    padding: 8,
    paddingBottom: 0
  }
};
var _DF_DATA = {};

var _areEqualProps = function _areEqualProps(prevProps, nextProps) {
  return nextProps.isShow === prevProps.isShow;
};

var AskDialog = (0, _memoEqual["default"])(function (_ref) {
  var isShow = _ref.isShow,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? _DF_DATA : _ref$data,
      onClose = _ref.onClose;

  var _refCaptcha = (0, _react.useRef)(),
      _hLoad = (0, _react.useCallback)(function () {
    if (_refCaptcha.current.isOk()) {
      var _options = data.options;

      _FactoryAction["default"].crLoadQuery(_options).run();

      onClose();
    }
  }, [data, onClose]),
      _commandButtons = (0, _react.useMemo)(function () {
    return [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Button["default"].Flat, {
      caption: "Yes, Load" //accessKey="s"
      ,
      isPrimary: true,
      onClick: _hLoad
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button["default"].Flat, {
      caption: "No, Close" //accessKey="c"
      ,
      onClick: onClose
    })];
  }, [_hLoad, onClose]),
      options = data.options,
      _ref2 = options || {},
      _ref2$name = _ref2.name,
      name = _ref2$name === void 0 ? '' : _ref2$name;

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalDialog["default"], {
    style: S.MODAL,
    caption: "Confirm Load",
    isShow: isShow,
    commandButtons: _commandButtons,
    withoutClose: true,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S.ROOT_DIV,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
        style: S.DESCR,
        children: [MSG_PREFIX, /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: S.NAME,
          children: name
        }), MSG_SUFFIX]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_MathCaptcha["default"], {
        ref: _refCaptcha,
        style: S.CAPTCHA
      })]
    })
  });
}, _areEqualProps);
/*
AskDialog.propTypes = {
  isShow: PropTypes.bool,
  data: PropTypes.shape({
    options: PropTypes.shape({
      chartType: PropTypes.string,
      browserType: PropTypes.string
    })
  }),
  onClose: PropTypes.func
}
*/

var _default = AskDialog;
exports["default"] = _default;
//# sourceMappingURL=AskDialog.js.map