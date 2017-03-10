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

var _ActionButton = require('../zhn/ActionButton');

var _ActionButton2 = _interopRequireDefault(_ActionButton);

var _ModalDialog = require('../zhn/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _MathCaptcha = require('../zhn-moleculs/MathCaptcha');

var _MathCaptcha2 = _interopRequireDefault(_MathCaptcha);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

var _BrowserActions = require('../../flux/actions/BrowserActions');

var _BrowserActions2 = _interopRequireDefault(_BrowserActions);

var _ChartActions = require('../../flux/actions/ChartActions');

var _ChartActions2 = _interopRequireDefault(_ChartActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = _DialogStyles2.default;

var MSG_PREFIX = "Would you like load item";
var MSG_SUFFIX = "from url?";

var S = {
  MODAL: {
    position: 'static',
    width: '400px',
    height: '205px',
    margin: '70px auto'
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

  function AskDialog(props) {
    (0, _classCallCheck3.default)(this, AskDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AskDialog.__proto__ || Object.getPrototypeOf(AskDialog)).call(this));

    _this._handleLoad = _this._handleLoad.bind(_this);
    _this.commandButtons = [_react2.default.createElement(_ActionButton2.default, {
      type: 'TypeC',
      caption: 'Yes, Load',
      onClick: _this._handleLoad
    }), _react2.default.createElement(_ActionButton2.default, {
      type: 'TypeC',
      caption: 'No, Close',
      onClick: props.onClose
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
        _BrowserActions2.default.showBrowser(options.browserType);
        _ChartActions2.default.loadStock(options.chartType, options.browserType, options);
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
          commandButtons: this.commandButtons,
          withoutClose: true,
          onClose: onClose
        },
        _react2.default.createElement(
          'div',
          { style: styles.rowDiv },
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

process.env.NODE_ENV !== "production" ? AskDialog.propTypes = {
  isShow: _react.PropTypes.bool,
  data: _react.PropTypes.shape({
    options: _react.PropTypes.shape({
      chartType: _react.PropTypes.string,
      browserType: _react.PropTypes.string
    })
  }),
  onClose: _react.PropTypes.func
} : void 0;
exports.default = AskDialog;
//# sourceMappingURL=AskDialog.js.map