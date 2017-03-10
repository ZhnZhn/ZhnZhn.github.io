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

var _ModalDialog = require('../zhn/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _InputSecret = require('../zhn/InputSecret');

var _InputSecret2 = _interopRequireDefault(_InputSecret);

var _ActionButton = require('../zhn/ActionButton');

var _ActionButton2 = _interopRequireDefault(_ActionButton);

var _ChartStore = require('../../flux/stores/ChartStore');

var _ChartStore2 = _interopRequireDefault(_ChartStore);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = _DialogStyles2.default;

var S = {
  MODAL: {
    position: 'static',
    width: '400px',
    height: '120px',
    margin: '70px auto 0px'
  }
};

var SettingsDialog = function (_Component) {
  (0, _inherits3.default)(SettingsDialog, _Component);

  function SettingsDialog() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SettingsDialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SettingsDialog.__proto__ || Object.getPrototypeOf(SettingsDialog)).call.apply(_ref, [this].concat(args))), _this), _this._handleSet = function () {
      _ChartStore2.default.setQuandlKey(_this.inputEl.getValue());
      _this.props.onClose();
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
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
      var _this2 = this;

      var commandButtons = [_react2.default.createElement(_ActionButton2.default, {
        key: 'a',
        type: 'TypeC',
        caption: 'Set',
        onClick: this._handleSet
      })];
      var _props = this.props,
          isShow = _props.isShow,
          onClose = _props.onClose;

      return _react2.default.createElement(
        _ModalDialog2.default,
        {
          style: S.MODAL,
          caption: 'User Settings',
          isShow: isShow,
          commandButtons: commandButtons,
          onClose: onClose
        },
        _react2.default.createElement(
          'div',
          { style: styles.rowDiv },
          _react2.default.createElement(
            'span',
            { style: styles.labelSpan },
            'Quandl:'
          ),
          _react2.default.createElement(_InputSecret2.default, {
            ref: function ref(c) {
              return _this2.inputEl = c;
            },
            placeholder: 'Quandl API Key'
          })
        )
      );
    }
  }]);
  return SettingsDialog;
}(_react.Component);

exports.default = SettingsDialog;
//# sourceMappingURL=SettingsDialog.js.map