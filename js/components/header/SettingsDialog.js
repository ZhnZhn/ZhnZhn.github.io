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

var _ComponentActions = require('../../flux/actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

var _ModalDialog = require('../zhn-moleculs/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _TabPane = require('../zhn/TabPane');

var _TabPane2 = _interopRequireDefault(_TabPane);

var _Tab = require('../zhn/Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _PaneApiKey = require('./PaneApiKey');

var _PaneApiKey2 = _interopRequireDefault(_PaneApiKey);

var _PaneOptions = require('./PaneOptions');

var _PaneOptions2 = _interopRequireDefault(_PaneOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import PropTypes from 'prop-types'

var S = {
  MODAL: {
    position: 'static',
    width: 380,
    height: 345,
    margin: '70px auto 0px'
  },
  TITLE_API: {
    width: '80px'
  },
  TITLE_OPTION: {
    width: '110px'
  },
  BT: {
    color: '#232f3b'
  }
};

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
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

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SettingsDialog.__proto__ || Object.getPrototypeOf(SettingsDialog)).call.apply(_ref, [this].concat(args))), _this), _this._hClose = function () {
      _this.props.onClose();
      if (_this._modal && _isFn(_this._modal.focusPrev)) {
        _this._modal.focusPrev();
      }
    }, _this._refModal = function (n) {
      return _this._modal = n;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(SettingsDialog, [{
    key: 'shouldComponentUpdate',

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
          data = _props.data;

      return _react2.default.createElement(
        _ModalDialog2.default,
        {
          ref: this._refModal,
          caption: 'User Settings',
          style: S.MODAL,
          isWithButton: false,
          isShow: isShow,
          onClose: this._hClose
        },
        _react2.default.createElement(
          _TabPane2.default,
          { isUpdateInit: true },
          _react2.default.createElement(
            _Tab2.default,
            { title: 'ApiKeys' },
            _react2.default.createElement(_PaneApiKey2.default, {
              titleStyle: S.TITLE_API,
              btStyle: S.BT,
              data: data,
              onClose: this._hClose
            })
          ),
          _react2.default.createElement(
            _Tab2.default,
            { title: 'Options' },
            _react2.default.createElement(_PaneOptions2.default, {
              titleStyle: S.TITLE_OPTION,
              btStyle: S.BT,
              data: data,
              onChangeTheme: _ComponentActions2.default.changeTheme,
              onClose: this._hClose
            })
          )
        )
      );
    }
  }]);
  return SettingsDialog;
}(_react.Component);

exports.default = SettingsDialog;
//# sourceMappingURL=SettingsDialog.js.map