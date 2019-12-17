"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _Button = _interopRequireDefault(require("./Button"));

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _MathCaptcha = _interopRequireDefault(require("../zhn-moleculs/MathCaptcha"));

var _FactoryAction = _interopRequireDefault(require("../../flux/actions/FactoryAction"));

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

var AskDialog =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(AskDialog, _Component);

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
    var _this;

    _this = _Component.call(this) || this;
    _this._handleLoad = _this._handleLoad.bind((0, _assertThisInitialized2["default"])(_this));
    _this._commandButtons = [_react["default"].createElement(_Button["default"].Flat, {
      caption: "Yes, Load" //accessKey="s"
      ,
      isPrimary: true,
      onClick: _this._handleLoad
    }), _react["default"].createElement(_Button["default"].Flat, {
      caption: "No, Close" //accessKey="c"
      ,
      onClick: props.onClose
    })];
    return _this;
  }

  var _proto = AskDialog.prototype;

  _proto._handleLoad = function _handleLoad() {
    var _this$props = this.props,
        _this$props$data = _this$props.data,
        data = _this$props$data === void 0 ? {} : _this$props$data,
        onClose = _this$props.onClose,
        _data$options = data.options,
        options = _data$options === void 0 ? {} : _data$options;

    if (this.captchaComp.isOk()) {
      _FactoryAction["default"].crLoadQuery(options).run();

      onClose();
    }
  };

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }

    return true;
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        isShow = _this$props2.isShow,
        _this$props2$data = _this$props2.data,
        data = _this$props2$data === void 0 ? {} : _this$props2$data,
        onClose = _this$props2.onClose,
        _data$options2 = data.options,
        options = _data$options2 === void 0 ? {} : _data$options2,
        _options$name = options.name,
        name = _options$name === void 0 ? '' : _options$name;
    return _react["default"].createElement(_ModalDialog["default"], {
      style: S.MODAL,
      caption: "Confirm Load",
      isShow: isShow,
      commandButtons: this._commandButtons,
      withoutClose: true,
      onClose: onClose
    }, _react["default"].createElement("div", {
      style: S.ROOT_DIV
    }, _react["default"].createElement("p", {
      style: S.DESCR
    }, MSG_PREFIX, _react["default"].createElement("span", {
      style: S.NAME
    }, name), MSG_SUFFIX), _react["default"].createElement(_MathCaptcha["default"], {
      ref: function ref(c) {
        return _this2.captchaComp = c;
      },
      rootStyle: S.CAPTCHA
    })));
  };

  return AskDialog;
}(_react.Component);

var _default = AskDialog;
exports["default"] = _default;
//# sourceMappingURL=AskDialog.js.map