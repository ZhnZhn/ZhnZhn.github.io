"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _crModalDialog = _interopRequireDefault(require("./fns/crModalDialog"));

var _Button = _interopRequireDefault(require("./Button"));

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _MathCaptcha = _interopRequireDefault(require("../zhn-moleculs/MathCaptcha"));

var _FactoryAction = _interopRequireDefault(require("../../flux/actions/FactoryAction"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
const MSG_PREFIX = "Would you like load item",
      MSG_SUFFIX = "from url?",
      S_MODAL = {
  position: 'static',
  width: 400,
  height: 205,
  margin: '70px auto'
},
      S_ROOT_DIV = {
  margin: 5
},
      S_NAME = {
  color: '#a487d4',
  padding: '0 5px'
},
      S_DESCR = {
  color: 'gray',
  width: 400,
  padding: '5px 0 0 10px',
  lineHeight: 1.4,
  fontWeight: 'bold',
  whiteSpace: 'pre'
},
      S_CAPTCHA = {
  padding: '8px 8px 0 8px'
};
const _DF_DATA = {};

const _getName = data => {
  const {
    options
  } = data,
        {
    name,
    title
  } = options || {};
  return name || title || '';
};

const AskDialog = (0, _crModalDialog.default)(_ref => {
  let {
    isShow,
    data = _DF_DATA,
    onClose
  } = _ref;

  const _refCaptcha = (0, _react.useRef)(),
        _hLoad = (0, _react.useCallback)(() => {
    if (_refCaptcha.current.isOk()) {
      const {
        options
      } = data;

      _FactoryAction.default.crLoadQuery(options).run();

      onClose();
    }
  }, [data, onClose]),
        _commandButtons = (0, _react.useMemo)(() => [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default.Flat, {
    caption: "Yes, Load",
    isPrimary: true,
    onClick: _hLoad
  }, "k1"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default.Flat, {
    caption: "No, Close",
    onClick: onClose
  }, "k2")], [_hLoad, onClose]),
        _name = _getName(data);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalDialog.default, {
    style: S_MODAL,
    caption: "Confirm Load",
    isShow: isShow,
    commandButtons: _commandButtons,
    withoutClose: true,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_ROOT_DIV,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
        style: S_DESCR,
        children: [MSG_PREFIX, /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: S_NAME,
          children: _name
        }), MSG_SUFFIX]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_MathCaptcha.default, {
        ref: _refCaptcha,
        style: S_CAPTCHA
      })]
    })
  });
});
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
exports.default = _default;
//# sourceMappingURL=AskDialog.js.map