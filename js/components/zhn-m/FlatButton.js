"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _crCn = _interopRequireDefault(require("../zhn-utils/crCn"));

var _CaptionInput = _interopRequireDefault(require("./CaptionInput"));

var _jsxRuntime = require("react/jsx-runtime");

const CL = {
  BT: 'bt-flat',
  BT_DIV: 'bt-flat__div',
  BT_SPAN: 'bt-flat__span'
};
const S = {
  PRIMARY: {
    color: '#607d8b'
  }
};

const FlatButton = ({
  timeout = 3000,
  className,
  style,
  clDiv = CL.BT_DIV,
  isPrimary,
  title = '',
  caption,
  accessKey,
  children,
  onClick
}) => {
  const _refTimeStamp = (0, _react.useRef)(null),
        _hClick = (0, _react.useCallback)(event => {
    if (timeout === 0) {
      onClick(event);
      return;
    }

    const _timeStampPrev = _refTimeStamp.current,
          {
      timeStamp
    } = event;

    if (_timeStampPrev == null || timeStamp - _timeStampPrev > timeout) {
      onClick(event);
      _refTimeStamp.current = timeStamp;
    }
  }, [timeout, onClick]),
        _className = (0, _crCn.default)(CL.BT, className),
        _style = isPrimary ? { ...style,
    ...S.PRIMARY
  } : style,
        _title = accessKey ? title + " [" + accessKey + "]" : title;

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    className: _className,
    style: _style,
    accessKey: accessKey,
    title: _title,
    onClick: _hClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: clDiv,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CaptionInput.default, {
        className: CL.BT_SPAN,
        caption: caption,
        accessKey: accessKey
      }), children]
    })
  });
};

var _default = FlatButton;
exports.default = _default;
//# sourceMappingURL=FlatButton.js.map