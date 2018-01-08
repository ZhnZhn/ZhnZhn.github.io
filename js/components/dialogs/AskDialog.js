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

var _MathCaptcha = require('../zhn-moleculs/MathCaptcha');

var _MathCaptcha2 = _interopRequireDefault(_MathCaptcha);

var _FactoryAction = require('../../flux/actions/FactoryAction');

var _FactoryAction2 = _interopRequireDefault(_FactoryAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import PropTypes from "prop-types";

var MSG_PREFIX = "Would you like load item";
var MSG_SUFFIX = "from url?";

var S = {
  MODAL: {
    position: 'static',
    width: '400px',
    height: '205px',
    margin: '70px auto'
  },
  ROOT_DIV: {
    display: 'block',
    margin: '5px'
  },
  NAME: {
    color: '#a487d4',
    paddingLeft: '5px',
    paddingRight: '5px'
  },
  DESCR: {
    color: 'gray',
    width: '400px',
    paddingLeft: '10px',
    paddingTop: '5px',
    fontWeight: 'bold',
    lineHeight: 1.4,
    whiteSpace: 'pre'
  },
  CAPTCHA: {
    padding: '8px',
    paddingBottom: '0px'
  }
};

var AskDialog = function (_Component) {
  (0, _inherits3.default)(AskDialog, _Component);

  /*
  static propTypes = {
    isShow: PropTypes.bool,
    data: PropTypes.shape({
      options: PropTypes.shape({
        chartType: PropTypes.string,
        browserType: PropTypes.string
      })
    }),
    onClose: PropTypes.func
  }
  */

  function AskDialog(props) {
    (0, _classCallCheck3.default)(this, AskDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AskDialog.__proto__ || Object.getPrototypeOf(AskDialog)).call(this));

    _this._handleLoad = _this._handleLoad.bind(_this);
    _this._commandButtons = [_react2.default.createElement(_Button2.default.Flat, {
      caption: 'Yes, Load'
      //accessKey="s"
      , isPrimary: true,
      onClick: _this._handleLoad
    }), _react2.default.createElement(_Button2.default.Flat, {
      caption: 'No, Close'
      //accessKey="c"
      , onClick: props.onClose
    })];
    return _this;
  }

  (0, _createClass3.default)(AskDialog, [{
    key: '_handleLoad',
    value: function _handleLoad() {
      var _props = this.props,
          _props$data = _props.data,
          data = _props$data === undefined ? {} : _props$data,
          onClose = _props.onClose,
          _data$options = data.options,
          options = _data$options === undefined ? {} : _data$options;

      if (this.captchaComp.isOk()) {
        _FactoryAction2.default.crLoadQuery(options).run();
        onClose();
      }
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
      var _this2 = this;

      var _props2 = this.props,
          isShow = _props2.isShow,
          _props2$data = _props2.data,
          data = _props2$data === undefined ? {} : _props2$data,
          onClose = _props2.onClose,
          _data$options2 = data.options,
          options = _data$options2 === undefined ? {} : _data$options2,
          _options$name = options.name,
          name = _options$name === undefined ? '' : _options$name;

      return _react2.default.createElement(
        _ModalDialog2.default,
        {
          style: S.MODAL,
          caption: 'Confirm Load',
          isShow: isShow,
          commandButtons: this._commandButtons,
          withoutClose: true,
          onClose: onClose
        },
        _react2.default.createElement(
          'div',
          { style: S.ROOT_DIV },
          _react2.default.createElement(
            'p',
            { style: S.DESCR },
            MSG_PREFIX,
            _react2.default.createElement(
              'span',
              { style: S.NAME },
              name
            ),
            MSG_SUFFIX
          ),
          _react2.default.createElement(_MathCaptcha2.default, {
            ref: function ref(c) {
              return _this2.captchaComp = c;
            },
            rootStyle: S.CAPTCHA
          })
        )
      );
    }
  }]);
  return AskDialog;
}(_react.Component);

exports.default = AskDialog;
//# sourceMappingURL=AskDialog.js.map