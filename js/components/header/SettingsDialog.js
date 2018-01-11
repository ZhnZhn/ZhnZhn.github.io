'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp, _initialiseProps;
//import PropTypes from 'prop-types'

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _safeFn = require('../../utils/safeFn');

var _safeFn2 = _interopRequireDefault(_safeFn);

var _ModalDialog = require('../zhn-moleculs/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _RowSecret = require('../dialogs/RowSecret');

var _RowSecret2 = _interopRequireDefault(_RowSecret);

var _RowPattern = require('../dialogs/RowPattern');

var _RowPattern2 = _interopRequireDefault(_RowPattern);

var _FlatButton = require('../zhn-m/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _RowCheckBox = require('../dialogs/RowCheckBox');

var _RowCheckBox2 = _interopRequireDefault(_RowCheckBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  MODAL: {
    position: 'static',
    width: '380px',
    height: '390px',
    margin: '70px auto 0px'
  },
  TITLE: {
    width: '110px'
  }
};

var SET = {
  PROXY: 'setProxy'
};

var MODE_ADMIN = 'isAdminMode';
var MODE_DELTA = 'isDrawDeltaExtrems';
var MODE_ZOOM = 'isNotZoomToMinMax';

var SettingsDialog = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(SettingsDialog, _Component);

  /*
  static propTypes = {
    isShow: PropTypes.bool,
    data: PropTypes.shape({
      setQuandlKey: PropTypes.func,
      isAdminMode: PropTypes.func,
      isDrawDeltaExtrems: PropTypes.func
    }),
    onClose: PropTypes.func
  }
  */

  function SettingsDialog(props) {
    (0, _classCallCheck3.default)(this, SettingsDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SettingsDialog.__proto__ || Object.getPrototypeOf(SettingsDialog)).call(this));

    _initialiseProps.call(_this);

    var data = props.data;


    var i = 1;
    for (; i < 6; i++) {
      _this['_setKey' + i] = (0, _safeFn2.default)(data, 'key' + i);
    }
    _this._setProxy = (0, _safeFn2.default)(data, SET.PROXY);

    _this._commandButtons = [_react2.default.createElement(_FlatButton2.default, {
      caption: 'Set All & Close',
      isPrimary: true,
      onClick: _this._handleSet
    })];
    return _this;
  }

  (0, _createClass3.default)(SettingsDialog, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
        return false;
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          isShow = _props.isShow,
          data = _props.data,
          onClose = _props.onClose,
          _proxy = data.getProxy(),
          _isAdminMode = (0, _safeFn2.default)(data, MODE_ADMIN, false)(),
          _isDrawDeltaExtrems = (0, _safeFn2.default)(data, MODE_DELTA, false)(),
          _isNotZoomToMinMax = (0, _safeFn2.default)(data, MODE_ZOOM, false)();

      return _react2.default.createElement(
        _ModalDialog2.default,
        {
          style: S.MODAL,
          caption: 'User Settings',
          isShow: isShow,
          commandButtons: this._commandButtons,
          onClose: onClose
        },
        _react2.default.createElement(_RowSecret2.default, {
          ref: this._ref1,
          titleStyle: S.TITLE,
          title: 'Alpha:',
          placeholder: 'Alpha Vantage API Key',
          onEnter: this._setKey1
        }),
        _react2.default.createElement(_RowSecret2.default, {
          ref: this._ref2,
          titleStyle: S.TITLE,
          title: 'Barchar:',
          placeholder: 'Barchar API Key',
          onEnter: this._setKey2
        }),
        _react2.default.createElement(_RowSecret2.default, {
          ref: this._ref3,
          titleStyle: S.TITLE,
          title: 'BEA:',
          placeholder: 'BEA API Key',
          maxLength: '36',
          onEnter: this._setKey3
        }),
        _react2.default.createElement(_RowSecret2.default, {
          ref: this._ref4,
          titleStyle: S.TITLE,
          title: 'Intrinio:',
          placeholder: 'Intrinio API Key',
          maxLength: '32',
          onEnter: this._setKey4
        }),
        _react2.default.createElement(_RowSecret2.default, {
          ref: this._ref5,
          titleStyle: S.TITLE,
          title: 'Quandl:',
          placeholder: 'Quandl API Key',
          onEnter: this._setKey5
        }),
        _react2.default.createElement(_RowPattern2.default, {
          ref: this._refProxy,
          titleStyle: S.TITLE,
          title: 'Https Proxy:',
          placeholder: 'Https Proxy for CORS',
          initValue: _proxy,
          onEnter: this._setProxy
        }),
        _react2.default.createElement(_RowCheckBox2.default, {
          initValue: _isAdminMode,
          caption: 'View in Admin Mode',
          onCheck: this._handleMode.bind(null, MODE_ADMIN, true),
          onUnCheck: this._handleMode.bind(null, MODE_ADMIN, false)
        }),
        _react2.default.createElement(_RowCheckBox2.default, {
          initValue: _isDrawDeltaExtrems,
          caption: 'Draw Delta Extrems',
          onCheck: this._handleMode.bind(null, MODE_DELTA, true),
          onUnCheck: this._handleMode.bind(null, MODE_DELTA, false)
        }),
        _react2.default.createElement(_RowCheckBox2.default, {
          initValue: _isNotZoomToMinMax,
          caption: 'Not Zoom to Min-Max',
          onCheck: this._handleMode.bind(null, MODE_ZOOM, true),
          onUnCheck: this._handleMode.bind(null, MODE_ZOOM, false)
        })
      );
    }
  }]);
  return SettingsDialog;
}(_react.Component), _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._handleSet = function () {
    var onClose = _this2.props.onClose;


    _this2._setKey1(_this2.iComp1.getValue());
    _this2._setKey2(_this2.iComp2.getValue());
    _this2._setKey3(_this2.iComp3.getValue());
    _this2._setKey4(_this2.iComp4.getValue());
    _this2._setKey5(_this2.iComp5.getValue());
    _this2._setProxy(_this2.proxyComp.getValue());

    onClose();
  };

  this._handleMode = function (fnName, mode) {
    var data = _this2.props.data,
        fnMode = (0, _safeFn2.default)(data, fnName);

    fnMode(mode);
  };

  this._ref1 = function (n) {
    return _this2.iComp1 = n;
  };

  this._ref2 = function (n) {
    return _this2.iComp2 = n;
  };

  this._ref3 = function (n) {
    return _this2.iComp3 = n;
  };

  this._ref4 = function (n) {
    return _this2.iComp4 = n;
  };

  this._ref5 = function (n) {
    return _this2.iComp5 = n;
  };

  this._refProxy = function (n) {
    return _this2.proxyComp = n;
  };
}, _temp);
exports.default = SettingsDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\header\SettingsDialog.js.map