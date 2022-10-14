"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

var _highcharts = _interopRequireDefault(require("highcharts"));

var _ThemeContext = _interopRequireDefault(require("../hoc/ThemeContext"));

var _getFnByPropName = _interopRequireDefault(require("../../utils/getFnByPropName"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

var _RowButtons = _interopRequireDefault(require("./RowButtons"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from 'prop-types'
const S_MR_4 = {
  marginRight: 4
},
      S_MR_12 = {
  marginRight: 12
};
const UI_THEME_OPTIONS = [{
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
const SET_PROXY = 'setProxy';
const MODE_ADMIN = 'isAdminMode';
const MODE_DELTA = 'isDrawDeltaExtrems';
const MODE_ZOOM = 'isNotZoomToMinMax';

const _crHaloOption = function (is) {
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

const _useProxy = data => {
  const _refProxy = (0, _uiApi.useRef)(),
        _setProxy = (0, _getFnByPropName.default)(data, SET_PROXY),
        _proxy = data.getProxy();

  return [_refProxy, _proxy, _setProxy, () => {
    const input = _refProxy.current;

    if (!_setProxy(input.getValue())) {
      input.showErrMsg();
    }
  }, () => _setProxy('')];
};

const _useTheme = onChangeTheme => {
  const theme = (0, _uiApi.useContext)(_ThemeContext.default);
  return item => {
    if (item && theme.getThemeName() !== item.value) {
      theme.setThemeName(item.value);
      onChangeTheme(item.value);
    }
  };
};

const PaneOptions = _ref => {
  let {
    isShowLabels,
    titleStyle,
    btStyle,
    data,
    onClose,
    onChangeTheme
  } = _ref;

  const [_refProxy, _proxy, _setProxy, _hSetProxy, _hClearProxy] = _useProxy(data),
        _hSelectTheme = _useTheme(onChangeTheme),
        _hMode = (fnName, mode) => (0, _getFnByPropName.default)(data, fnName)(mode),
        _hSetHalo = is => _highcharts.default.setOptions(_crHaloOption(is));

  const _isAdminMode = (0, _getFnByPropName.default)(data, MODE_ADMIN, false)(),
        _isDrawDeltaExtrems = (0, _getFnByPropName.default)(data, MODE_DELTA, false)(),
        _isNotZoomToMinMax = (0, _getFnByPropName.default)(data, MODE_ZOOM, false)();

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowPattern, {
      ref: _refProxy,
      isShowLabels: isShowLabels,
      captionStyle: titleStyle,
      caption: "Proxy",
      placeholder: "Local Http Proxy Server",
      initValue: _proxy,
      onEnter: _setProxy,
      isClearBlank: true,
      onClear: _hClearProxy,
      errorMsg: "Should start with http://127.0.0.1"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
      isShowLabels: isShowLabels,
      caption: "UI Theme",
      captionStyle: titleStyle,
      options: UI_THEME_OPTIONS,
      onSelect: _hSelectTheme
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowCheckBox, {
      initValue: _isAdminMode,
      caption: "View in Admin Mode",
      onCheck: _hMode.bind(null, MODE_ADMIN, true),
      onUnCheck: _hMode.bind(null, MODE_ADMIN, false)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowCheckBox, {
      initValue: _isDrawDeltaExtrems,
      caption: "Draw Deltas to Min-Max",
      onCheck: _hMode.bind(null, MODE_DELTA, true),
      onUnCheck: _hMode.bind(null, MODE_DELTA, false)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowCheckBox, {
      initValue: _isNotZoomToMinMax,
      caption: "Not Zoom to Min-Max",
      onCheck: _hMode.bind(null, MODE_ZOOM, true),
      onUnCheck: _hMode.bind(null, MODE_ZOOM, false)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowCheckBox, {
      initValue: false,
      caption: "Without Points Halo",
      onCheck: _hSetHalo.bind(null, false),
      onUnCheck: _hSetHalo.bind(null, true)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowButtons.default, {
      style: S_MR_12,
      btStyle: btStyle,
      onClose: onClose,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
        style: { ...btStyle,
          ...S_MR_4
        },
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
exports.default = _default;
//# sourceMappingURL=PaneOptions.js.map