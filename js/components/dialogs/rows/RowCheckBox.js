"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _useTheme = _interopRequireDefault(require("../../hooks/useTheme"));

var _useRefInit = _interopRequireDefault(require("../../hooks/useRefInit"));

var _SvgCheckBox = _interopRequireDefault(require("../../zhn/SvgCheckBox"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
const CL = "bt-chb",
      TH_ID = 'ROW_CHECKBOX',
      CHECKED_COLOR = '#1b2836',
      S_ROOT = {
  padding: '6px 0 0 16px'
},
      S_CAPTION = {
  display: 'inline-block',
  color: 'grey',
  paddingLeft: 12,
  fontSize: '16px',
  fontWeight: 'bold',
  userSelect: 'none',
  cursor: 'pointer'
};

const _isFn = fn => typeof fn == 'function',
      _isUndefined = v => typeof v === 'undefined',
      _isBool = bool => typeof bool === 'boolean',
      _crCheckedStyle = color => ({
  color
});

const RowCheckBox = ({
  style,
  checkedColor = CHECKED_COLOR,
  value,
  initValue,
  caption,
  captionStyle,
  onCheck,
  onUnCheck,
  onToggle
}) => {
  const [valueState, setValueState] = (0, _react.useState)(() => _isUndefined(value) ? !!initValue : void 0),
        _isValueState = (0, _useRefInit.default)(() => _isBool(valueState)),
        _value = _isValueState ? valueState : value,
        _hCheck = (0, _react.useCallback)(() => {
    if (_isFn(onCheck)) {
      onCheck();
    } else if (_isFn(onToggle)) {
      onToggle(true);
    }

    if (_isValueState) {
      setValueState(true);
    }
  }, [onCheck, onToggle, _isValueState]),
        _hUnCheck = (0, _react.useCallback)(() => {
    if (_isFn(onUnCheck)) {
      onUnCheck();
    } else if (_isFn(onToggle)) {
      onToggle(false);
    }

    if (_isValueState) {
      setValueState(false);
    }
  }, [onUnCheck, onToggle, _isValueState]),
        _hToggle = (0, _react.useCallback)(() => {
    if (_value) {
      _hUnCheck();
    } else {
      _hCheck();
    }
  }, [_value, _hUnCheck, _hCheck]),
        TS = (0, _useTheme.default)(TH_ID);

  const _style = _value ? { ...captionStyle,
    ..._crCheckedStyle(checkedColor)
  } : captionStyle;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: { ...S_ROOT,
      ...style
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCheckBox.default, {
      value: _value,
      color: checkedColor,
      checkedColor: TS.CHECKED_COLOR,
      onCheck: _hCheck,
      onUnCheck: _hUnCheck
    }), caption && /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      className: CL,
      tabIndex: "-1",
      style: { ...S_CAPTION,
        ..._style
      },
      onClick: _hToggle,
      children: caption
    })]
  });
};
/*
RowCheckBox.propTypes = {
  style: PropTypes.object,
  checkedColor: PropTypes.string,
  initValue: PropTypes.bool,
  value: PropTypes.bool,
  caption: PropTypes.string,
  captionStyle: PropTypes.object,
  onCheck: PropTypes.func,
  onUnCheck: PropTypes.func,
  onToggle: PropTypes.func
}
*/


var _default = RowCheckBox;
exports.default = _default;
//# sourceMappingURL=RowCheckBox.js.map