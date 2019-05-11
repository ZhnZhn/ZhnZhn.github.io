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

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _ModalDialog = require('../zhn-moleculs/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  MODAL: {
    position: 'static',
    width: 350,
    height: 175,
    margin: '70px auto'
  },
  ROOT: {
    color: 'gray',
    paddingTop: 8,
    paddingLeft: 16,
    lineHeight: 1.7,
    fontWeight: 'bold'
  },
  DATE: {
    color: '#80c040'
  },
  CLOSE: {
    color: '#232f3b'
  }
};

var ReloadDialog = function (_Component) {
  (0, _inherits3.default)(ReloadDialog, _Component);

  function ReloadDialog(props) {
    (0, _classCallCheck3.default)(this, ReloadDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ReloadDialog.__proto__ || Object.getPrototypeOf(ReloadDialog)).call(this, props));

    _this._hReload = function () {
      document.cookie = "erc=1";
      window.location.reload(true);
    };

    _this._commandButtons = [_react2.default.createElement(_Button2.default.Flat, {
      key: 'reload',
      caption: 'Yes, Reload',
      isPrimary: true,
      onClick: _this._hReload
    }), _react2.default.createElement(_Button2.default.Flat, {
      key: 'no',
      rootStyle: S.CLOSE,
      caption: 'No',
      onClick: props.onClose
    })];
    return _this;
  }

  (0, _createClass3.default)(ReloadDialog, [{
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
          onClose = _props.onClose,
          data = _props.data,
          _data$buildDate = data.buildDate,
          buildDate = _data$buildDate === undefined ? '' : _data$buildDate;

      return _react2.default.createElement(
        _ModalDialog2.default,
        {
          style: S.MODAL,
          caption: 'Reload Web App',
          isShow: isShow,
          commandButtons: this._commandButtons,
          withoutClose: true,
          onClose: onClose
        },
        _react2.default.createElement(
          'div',
          { style: S.ROOT },
          _react2.default.createElement(
            'p',
            null,
            'Browser has loaded ERC from a cache.'
          ),
          _react2.default.createElement(
            'p',
            null,
            'Reload web app ERC to the new build?'
          ),
          _react2.default.createElement(
            'p',
            { style: S.DATE },
            'New build ' + buildDate + ' is available.'
          )
        )
      );
    }
  }]);
  return ReloadDialog;
}(_react.Component);

exports.default = ReloadDialog;
//# sourceMappingURL=ReloadDialog.js.map