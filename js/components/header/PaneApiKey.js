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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _safeFn = require('../../utils/safeFn');

var _safeFn2 = _interopRequireDefault(_safeFn);

var _RowSecret = require('../dialogs/RowSecret');

var _RowSecret2 = _interopRequireDefault(_RowSecret);

var _FlatButton = require('../zhn-m/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _RowButtons = require('./RowButtons');

var _RowButtons2 = _interopRequireDefault(_RowButtons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import PropTypes from 'prop-types'

var PaneApiKey = function (_Component) {
  (0, _inherits3.default)(PaneApiKey, _Component);

  /*
  static propTypes = {
    titleStyle: PropTypes.object,
    btStyle: PropTypes.object,
    data: PropTypes.object,
    onClose: PropTypes.func
  }
  */

  function PaneApiKey(props) {
    (0, _classCallCheck3.default)(this, PaneApiKey);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PaneApiKey.__proto__ || Object.getPrototypeOf(PaneApiKey)).call(this));

    _this._hSetAll = function () {
      var onClose = _this.props.onClose;


      _this._setKey1(_this.iComp1.getValue());
      _this._setKey2(_this.iComp2.getValue());
      _this._setKey3(_this.iComp3.getValue());
      _this._setKey4(_this.iComp4.getValue());
      _this._setKey5(_this.iComp5.getValue());
      _this._setKey6(_this.iComp6.getValue());

      onClose();
    };

    _this._hClearAll = function () {
      _this._setKey1('');
      _this._setKey2('');
      _this._setKey3('');
      _this._setKey4('');
      _this._setKey5('');
      _this._setKey6('');

      _this.iComp1.clear();
      _this.iComp2.clear();
      _this.iComp3.clear();
      _this.iComp4.clear();
      _this.iComp5.clear();
      _this.iComp6.clear();
    };

    _this._ref1 = function (n) {
      return _this.iComp1 = n;
    };

    _this._ref2 = function (n) {
      return _this.iComp2 = n;
    };

    _this._ref3 = function (n) {
      return _this.iComp3 = n;
    };

    _this._ref4 = function (n) {
      return _this.iComp4 = n;
    };

    _this._ref5 = function (n) {
      return _this.iComp5 = n;
    };

    _this._ref6 = function (n) {
      return _this.iComp6 = n;
    };

    var data = props.data;


    var i = 1;
    for (; i < 7; i++) {
      _this['_setKey' + i] = (0, _safeFn2.default)(data, 'key' + i);
    }
    return _this;
  }

  (0, _createClass3.default)(PaneApiKey, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          titleStyle = _props.titleStyle,
          btStyle = _props.btStyle,
          onClose = _props.onClose;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_RowSecret2.default, {
          ref: this._ref1,
          titleStyle: titleStyle,
          title: 'Alpha:',
          placeholder: 'Alpha Vantage API Key',
          onEnter: this._setKey1
        }),
        _react2.default.createElement(_RowSecret2.default, {
          ref: this._ref2,
          titleStyle: titleStyle,
          title: 'Barchar:',
          placeholder: 'Barchar API Key',
          onEnter: this._setKey2
        }),
        _react2.default.createElement(_RowSecret2.default, {
          ref: this._ref3,
          titleStyle: titleStyle,
          title: 'BEA:',
          placeholder: 'BEA API Key',
          maxLength: '36',
          onEnter: this._setKey3
        }),
        _react2.default.createElement(_RowSecret2.default, {
          ref: this._ref4,
          titleStyle: titleStyle,
          title: 'Intrinio:',
          placeholder: 'Intrinio API Key',
          maxLength: '32',
          onEnter: this._setKey4
        }),
        _react2.default.createElement(_RowSecret2.default, {
          ref: this._ref5,
          titleStyle: titleStyle,
          title: 'Quandl:',
          placeholder: 'Quandl API Key',
          onEnter: this._setKey5
        }),
        _react2.default.createElement(_RowSecret2.default, {
          ref: this._ref6,
          titleStyle: titleStyle,
          title: 'EIA:',
          placeholder: 'EIA API Key',
          maxLength: '32',
          onEnter: this._setKey6
        }),
        _react2.default.createElement(
          _RowButtons2.default,
          { btStyle: btStyle, onClose: onClose },
          _react2.default.createElement(_FlatButton2.default, {
            caption: 'SET ALL & CLOSE',
            isPrimary: true,
            onClick: this._hSetAll
          }),
          _react2.default.createElement(_FlatButton2.default, {
            rootStyle: btStyle,
            caption: 'CLEAR ALL',
            onClick: this._hClearAll
          })
        )
      );
    }
  }]);
  return PaneApiKey;
}(_react.Component);

exports.default = PaneApiKey;
//# sourceMappingURL=PaneApiKey.js.map