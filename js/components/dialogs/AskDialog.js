'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import InputSlider from '../zhn/InputSlider';


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
  _inherits(AskDialog, _Component);

  function AskDialog(props) {
    _classCallCheck(this, AskDialog);

    var _this = _possibleConstructorReturn(this, (AskDialog.__proto__ || Object.getPrototypeOf(AskDialog)).call(this));

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

  _createClass(AskDialog, [{
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

AskDialog.displayName = 'AskDialog';

exports.default = AskDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\AskDialog.js.map