"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _highcharts = _interopRequireDefault(require("highcharts"));

var _ThemeContext = _interopRequireDefault(require("../hoc/ThemeContext"));

var _safeFn = _interopRequireDefault(require("../../utils/safeFn"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

var _RowButtons = _interopRequireDefault(require("./RowButtons"));

//import PropTypes from 'prop-types'
var S = {
  BT_PROXY: {
    marginRight: 8
  }
};
var UI_THEME_OPTIONS = [{
  caption: 'Dark',
  value: 'GREY'
}, {
  caption: 'Light',
  value: 'WHITE'
}, {
  caption: 'Sand',
  value: 'SAND'
}, {
  caption: 'Sand Light',
  value: 'SAND_L'
}];
var SET_PROXY = 'setProxy';
var MODE_ADMIN = 'isAdminMode';
var MODE_DELTA = 'isDrawDeltaExtrems';
var MODE_ZOOM = 'isNotZoomToMinMax';

var _crHaloOption = function _crHaloOption(is) {
  if (is === void 0) {
    is = false;
  }

  return {
    plotOptions: {
      series: {
        states: {
          hover: {
            enabled: is
          }
        }
      }
    }
  };
};

var _useProxy = function _useProxy(data) {
  var _refProxy = (0, _react.useRef)(),
      _setProxy = (0, _safeFn["default"])(data, SET_PROXY),
      _proxy = data.getProxy();

  return [_refProxy, _proxy, _setProxy, function () {
    var input = _refProxy.current;

    if (!_setProxy(input.getValue())) {
      input.showErrMsg();
    }
  }, function () {
    return _setProxy('');
  }];
};

var _useTheme = function _useTheme(onChangeTheme) {
  var theme = (0, _react.useContext)(_ThemeContext["default"]);
  return function (item) {
    if (item && theme.getThemeName() !== item.value) {
      theme.setThemeName(item.value);
      onChangeTheme(item.value);
    }
  };
};

var PaneOptions = function PaneOptions(_ref) {
  var titleStyle = _ref.titleStyle,
      btStyle = _ref.btStyle,
      data = _ref.data,
      onClose = _ref.onClose,
      onChangeTheme = _ref.onChangeTheme;

  var _useProxy2 = _useProxy(data),
      _refProxy = _useProxy2[0],
      _proxy = _useProxy2[1],
      _setProxy = _useProxy2[2],
      _hSetProxy = _useProxy2[3],
      _hClearProxy = _useProxy2[4],
      _hSelectTheme = _useTheme(onChangeTheme),
      _hMode = function _hMode(fnName, mode) {
    return (0, _safeFn["default"])(data, fnName)(mode);
  },
      _hSetHalo = function _hSetHalo(is) {
    return _highcharts["default"].setOptions(_crHaloOption(is));
  };

  var _isAdminMode = (0, _safeFn["default"])(data, MODE_ADMIN, false)(),
      _isDrawDeltaExtrems = (0, _safeFn["default"])(data, MODE_DELTA, false)(),
      _isNotZoomToMinMax = (0, _safeFn["default"])(data, MODE_ZOOM, false)();

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].RowPattern, {
      ref: _refProxy,
      captionStyle: titleStyle,
      caption: "Proxy",
      placeholder: "Local Http Proxy Server",
      initValue: _proxy,
      onEnter: _setProxy,
      isClearBlank: true,
      onClear: _hClearProxy,
      errorMsg: "Should start with http://127.0.0.1"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].RowInputSelect, {
      caption: "UI Theme",
      captionStyle: titleStyle,
      options: UI_THEME_OPTIONS,
      onSelect: _hSelectTheme
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].RowCheckBox, {
      initValue: _isAdminMode,
      caption: "View in Admin Mode",
      onCheck: _hMode.bind(null, MODE_ADMIN, true),
      onUnCheck: _hMode.bind(null, MODE_ADMIN, false)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].RowCheckBox, {
      initValue: _isDrawDeltaExtrems,
      caption: "Draw Deltas to Min-Max",
      onCheck: _hMode.bind(null, MODE_DELTA, true),
      onUnCheck: _hMode.bind(null, MODE_DELTA, false)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].RowCheckBox, {
      initValue: _isNotZoomToMinMax,
      caption: "Not Zoom to Min-Max",
      onCheck: _hMode.bind(null, MODE_ZOOM, true),
      onUnCheck: _hMode.bind(null, MODE_ZOOM, false)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].RowCheckBox, {
      initValue: false,
      caption: "Without Points Halo",
      onCheck: _hSetHalo.bind(null, false),
      onUnCheck: _hSetHalo.bind(null, true)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowButtons["default"], {
      btStyle: btStyle,
      onClose: onClose,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton["default"], {
        style: (0, _extends2["default"])({}, btStyle, S.BT_PROXY),
        caption: "SET PROXY",
        onClick: _hSetProxy
      })
    })]
  });
};
/*
PaneOptions.propTypes = {
  titleStyle: PropTypes.object,
  btStyle: PropTypes.object,
  data: PropTypes.object,
  onClose: PropTypes.func,
  onChangeTheme: PropTypes.func
}
*/


var _default = PaneOptions;
exports["default"] = _default;
//# sourceMappingURL=PaneOptions.js.map