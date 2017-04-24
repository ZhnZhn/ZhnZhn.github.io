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

var _ModalDialog = require('../zhn-moleculs/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _InputSecret = require('../zhn/InputSecret');

var _InputSecret2 = _interopRequireDefault(_InputSecret);

var _ActionButton = require('../zhn/ActionButton');

var _ActionButton2 = _interopRequireDefault(_ActionButton);

var _RowCheckBox = require('../dialogs/RowCheckBox');

var _RowCheckBox2 = _interopRequireDefault(_RowCheckBox);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  MODAL: {
    position: 'static',
    width: '400px',
    height: '150px',
    margin: '70px auto 0px'
  }
};

var SettingsDialog = function (_Component) {
  (0, _inherits3.default)(SettingsDialog, _Component);

  function SettingsDialog(props) {
    (0, _classCallCheck3.default)(this, SettingsDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SettingsDialog.__proto__ || Object.getPrototypeOf(SettingsDialog)).call(this));

    _this._handleSet = function () {
      var _this$props = _this.props,
          data = _this$props.data,
          onClose = _this$props.onClose,
          setQuandlKey = (0, _safeFn2.default)(data, 'setQuandlKey');

      setQuandlKey(_this.inputComp.getValue());
      onClose();
    };

    _this._handleAdminMode = function (mode) {
      var data = _this.props.data,
          isAdminMode = (0, _safeFn2.default)(data, 'isAdminMode');

      isAdminMode(mode);
    };

    _this.commandButtons = [_react2.default.createElement(_ActionButton2.default, {
      type: 'TypeC',
      caption: 'Set',
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
      var _this2 = this;

      var _props = this.props,
          isShow = _props.isShow,
          data = _props.data,
          onClose = _props.onClose,
          _isAdminMode = (0, _safeFn2.default)(data, 'isAdminMode', false)();

      return _react2.default.createElement(
        _ModalDialog2.default,
        {
          style: S.MODAL,
          caption: 'User Settings',
          isShow: isShow,
          commandButtons: this.commandButtons,
          onClose: onClose
        },
        _react2.default.createElement(
          'label',
          { style: _DialogStyles2.default.rowDiv },
          _react2.default.createElement(
            'span',
            { style: _DialogStyles2.default.labelSpan },
            'Quandl:'
          ),
          _react2.default.createElement(_InputSecret2.default, {
            ref: function ref(c) {
              return _this2.inputComp = c;
            },
            placeholder: 'Quandl API Key'
          })
        ),
        _react2.default.createElement(_RowCheckBox2.default, {
          initValue: _isAdminMode,
          caption: 'View in Admin Mode',
          onCheck: this._handleAdminMode.bind(null, true),
          onUnCheck: this._handleAdminMode.bind(null, false)
        })
      );
    }
  }]);
  return SettingsDialog;
}(_react.Component);

process.env.NODE_ENV !== "production" ? SettingsDialog.propTypes = {
  isShow: _react.PropTypes.bool,
  data: _react.PropTypes.shape({
    setQuandlKey: _react.PropTypes.func,
    isAdminMode: _react.PropTypes.func
  }),
  onClose: _react.PropTypes.func
} : void 0;
exports.default = SettingsDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\header\SettingsDialog.js.map