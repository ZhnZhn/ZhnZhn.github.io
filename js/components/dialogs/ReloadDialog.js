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
    width: '350px',
    height: '190px',
    margin: '70px auto'
  },
  ROOT: {
    color: 'gray',
    paddingTop: '16px',
    paddingLeft: '16px',
    fontWeight: 'bold',
    lineHeight: 1.4
  },
  DATE: {
    color: '#80c040'
  },
  CLOSE: {
    color: 'rgb(35, 47, 59)'
  }
};

var ReloadDialog = function (_Component) {
  (0, _inherits3.default)(ReloadDialog, _Component);

  function ReloadDialog(props) {
    (0, _classCallCheck3.default)(this, ReloadDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ReloadDialog.__proto__ || Object.getPrototypeOf(ReloadDialog)).call(this));

    _this._handleReload = _this._handleReload.bind(_this);
    _this._commandButtons = [_react2.default.createElement(_Button2.default.Flat, {
      caption: 'Yes, Reload'
      //accessKey="r"
      , isPrimary: true,
      onClick: _this._handleReload
    }), _react2.default.createElement(_Button2.default.Flat, {
      rootStyle: S.CLOSE,
      caption: 'No'
      //accessKey="n"
      , onClick: props.onClose
    })];
    return _this;
  }

  (0, _createClass3.default)(ReloadDialog, [{
    key: '_handleReload',
    value: function _handleReload() {
      document.cookie = "erc=1";
      window.location.reload(true);
    }
  }, {
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
          prevDate = data.prevDate,
          nextDate = data.nextDate;

      return _react2.default.createElement(
        _ModalDialog2.default,
        {
          style: S.MODAL,
          caption: 'Reload',
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
            'You browser open ERC from a cache.'
          ),
          _react2.default.createElement(
            'p',
            { style: S.DATE },
            prevDate
          ),
          _react2.default.createElement(
            'p',
            null,
            'A new build exists. Is Reload App?'
          ),
          _react2.default.createElement(
            'p',
            { style: S.DATE },
            nextDate
          )
        )
      );
    }
  }]);
  return ReloadDialog;
}(_react.Component);

exports.default = ReloadDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\ReloadDialog.js.map