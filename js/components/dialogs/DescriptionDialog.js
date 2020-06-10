"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _fnFetch = require("../../utils/fnFetch");

var _Comp = _interopRequireDefault(require("../Comp"));

var ModalDialog = _Comp["default"].ModalDialog,
    Load = _Comp["default"].Load,
    DivHtml = _Comp["default"].DivHtml;
var DESCR_EMPTY = '<p class="descr__part">Description Empty for this Datasource</p>';
var S = {
  DIALOG: {
    top: 54,
    left: 20,
    width: 'auto',
    marginLeft: 0,
    maxWidth: '89%'
  },
  DIV: {
    padding: 16
  }
};

var _isNewShow = function _isNewShow(prevProps, props) {
  return prevProps !== props && prevProps.isShow !== props.isShow;
};

var _isUpdateDescr = function _isUpdateDescr(prevProps, props, state) {
  if (_isNewShow(prevProps, props) && props.isShow && state.isLoadFailed) {
    return true;
  }

  return _isNewShow(prevProps, props) && prevProps.data.descrUrl !== props.data.descrUrl;
};

var DescriptionDialog = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(DescriptionDialog, _Component);

  function DescriptionDialog() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      isLoading: false,
      isLoadFailed: false,
      errMsg: '',
      descrHtml: ''
    };

    _this._loadDescr = function (descrUrl) {
      if (descrUrl === void 0) {
        descrUrl = '';
      }

      if (descrUrl) {
        _this.setState({
          isLoading: true
        }, function () {
          return (0, _fnFetch.fetchTxt)({
            uri: descrUrl,
            onFetch: _this._setDescrHtml,
            onCatch: _this._onFailed
          });
        });
      } else {
        _this._setDescrHtml();
      }
    };

    _this._setDescrHtml = function (_temp) {
      var _ref = _temp === void 0 ? {} : _temp,
          _ref$json = _ref.json,
          text = _ref$json === void 0 ? DESCR_EMPTY : _ref$json;

      _this.setState({
        isLoading: false,
        isLoadFailed: false,
        errMsg: '',
        descrHtml: text
      });
    };

    _this._onFailed = function (_temp2) {
      var _ref2 = _temp2 === void 0 ? {} : _temp2,
          error = _ref2.error;

      _this.setState({
        isLoading: false,
        isLoadFailed: true,
        errMsg: error.message
      });
    };

    return _this;
  }

  var _proto = DescriptionDialog.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }

    return true;
  };

  _proto.componentDidMount = function componentDidMount() {
    this._loadDescr(this.props.data.descrUrl);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (_isUpdateDescr(prevProps, this.props, this.state)) {
      var data = this.props.data,
          descrUrl = data.descrUrl;

      this._loadDescr(descrUrl);
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        isShow = _this$props.isShow,
        onClose = _this$props.onClose,
        _this$state = this.state,
        isLoading = _this$state.isLoading,
        isLoadFailed = _this$state.isLoadFailed,
        errMsg = _this$state.errMsg,
        descrHtml = _this$state.descrHtml;
    return /*#__PURE__*/_react["default"].createElement(ModalDialog, {
      caption: "About Datasource",
      isShow: isShow,
      style: S.DIALOG,
      onClose: onClose
    }, isLoading ? /*#__PURE__*/_react["default"].createElement(Load.Loading, null) : isLoadFailed ? /*#__PURE__*/_react["default"].createElement(Load.LoadFailed, {
      errMsg: errMsg
    }) : /*#__PURE__*/_react["default"].createElement(DivHtml, {
      style: S.DIV,
      str: descrHtml
    }));
  };

  return DescriptionDialog;
}(_react.Component);

DescriptionDialog.defaultProps = {
  data: {}
};
var _default = DescriptionDialog;
exports["default"] = _default;
//# sourceMappingURL=DescriptionDialog.js.map