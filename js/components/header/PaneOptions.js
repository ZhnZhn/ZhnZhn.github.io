"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _highcharts = _interopRequireDefault(require("highcharts"));

var _safeFn = _interopRequireDefault(require("../../utils/safeFn"));

var _withTheme = _interopRequireDefault(require("../hoc/withTheme"));

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
}];
var SET = {
  PROXY: 'setProxy'
};
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

var PaneOptions = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(PaneOptions, _Component);

  /*
  static propTypes = {
    titleStyle: PropTypes.object,
    btStyle: PropTypes.object,
    data: PropTypes.object,
    onClose: PropTypes.func
  }
  */
  function PaneOptions(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._hMode = function (fnName, mode) {
      var data = _this.props.data,
          fnMode = (0, _safeFn["default"])(data, fnName);
      fnMode(mode);
    };

    _this._hSetProxy = function () {
      _this._setProxy(_this.proxyComp.getValue());
    };

    _this._hSelectTheme = function (item) {
      var _this$props = _this.props,
          theme = _this$props.theme,
          onChangeTheme = _this$props.onChangeTheme;

      if (item && theme.getThemeName() !== item.value) {
        theme.setThemeName(item.value);
        onChangeTheme(item.value);
      }
    };

    _this._setHalo = function (is) {
      _highcharts["default"].setOptions(_crHaloOption(is));
    };

    _this._refProxy = function (n) {
      return _this.proxyComp = n;
    };

    var _data = props.data;
    _this._setProxy = (0, _safeFn["default"])(_data, SET.PROXY);
    return _this;
  }

  var _proto = PaneOptions.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        titleStyle = _this$props2.titleStyle,
        btStyle = _this$props2.btStyle,
        data = _this$props2.data,
        onClose = _this$props2.onClose,
        _proxy = data.getProxy(),
        _isAdminMode = (0, _safeFn["default"])(data, MODE_ADMIN, false)(),
        _isDrawDeltaExtrems = (0, _safeFn["default"])(data, MODE_DELTA, false)(),
        _isNotZoomToMinMax = (0, _safeFn["default"])(data, MODE_ZOOM, false)();

    return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowPattern, {
      ref: this._refProxy,
      captionStyle: titleStyle,
      caption: "Https Proxy:",
      placeholder: "Https Proxy for CORS",
      initValue: _proxy,
      onEnter: this._setProxy
    }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowInputSelect, {
      caption: "UI Theme",
      captionStyle: titleStyle,
      options: UI_THEME_OPTIONS,
      onSelect: this._hSelectTheme
    }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowCheckBox, {
      initValue: _isAdminMode,
      caption: "View in Admin Mode",
      onCheck: this._hMode.bind(null, MODE_ADMIN, true),
      onUnCheck: this._hMode.bind(null, MODE_ADMIN, false)
    }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowCheckBox, {
      initValue: _isDrawDeltaExtrems,
      caption: "Draw Deltas to Min-Max",
      onCheck: this._hMode.bind(null, MODE_DELTA, true),
      onUnCheck: this._hMode.bind(null, MODE_DELTA, false)
    }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowCheckBox, {
      initValue: _isNotZoomToMinMax,
      caption: "Not Zoom to Min-Max",
      onCheck: this._hMode.bind(null, MODE_ZOOM, true),
      onUnCheck: this._hMode.bind(null, MODE_ZOOM, false)
    }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowCheckBox, {
      initValue: false,
      caption: "Without Points Halo",
      onCheck: this._setHalo.bind(null, false),
      onUnCheck: this._setHalo.bind(null, true)
    }), /*#__PURE__*/_react["default"].createElement(_RowButtons["default"], {
      btStyle: btStyle,
      onClose: onClose
    }, /*#__PURE__*/_react["default"].createElement(_FlatButton["default"], {
      style: (0, _extends2["default"])({}, btStyle, S.BT_PROXY),
      caption: "SET PROXY",
      onClick: this._hSetProxy
    })));
  };

  return PaneOptions;
}(_react.Component);

var _default = (0, _withTheme["default"])(PaneOptions);

exports["default"] = _default;
//# sourceMappingURL=PaneOptions.js.map