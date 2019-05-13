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

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dompurify = require('dompurify');

var _dompurify2 = _interopRequireDefault(_dompurify);

var _fnFetch = require('../../utils/fnFetch');

var _ModalDialog = require('../zhn-moleculs/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _Load = require('../zhn/Load');

var _Load2 = _interopRequireDefault(_Load);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var Description = function Description(_ref) {
  var _html = _ref._html;
  return _react2.default.createElement('div', {
    style: S.DIV,
    dangerouslySetInnerHTML: { __html: _html }
  });
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

var DescriptionDialog = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(DescriptionDialog, _Component);

  function DescriptionDialog() {
    var _ref2;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DescriptionDialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = DescriptionDialog.__proto__ || Object.getPrototypeOf(DescriptionDialog)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
      isLoading: false,
      isLoadFailed: false,
      errMsg: '',
      descrHtml: ''
    }, _this._loadDescr = function () {
      var descrUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

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
    }, _this._setDescrHtml = function () {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$json = _ref3.json,
          text = _ref3$json === undefined ? DESCR_EMPTY : _ref3$json;

      _this.setState({
        isLoading: false,
        isLoadFailed: false,
        errMsg: '',
        descrHtml: text
      });
    }, _this._onFailed = function () {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          error = _ref4.error;

      _this.setState({
        isLoading: false,
        isLoadFailed: true,
        errMsg: error.message
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DescriptionDialog, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
        return false;
      }
      return true;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._loadDescr(this.props.data.descrUrl);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (_isUpdateDescr(prevProps, this.props, this.state)) {
        var data = this.props.data,
            descrUrl = data.descrUrl;

        this._loadDescr(descrUrl);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          isShow = _props.isShow,
          onClose = _props.onClose,
          _state = this.state,
          isLoading = _state.isLoading,
          isLoadFailed = _state.isLoadFailed,
          errMsg = _state.errMsg,
          descrHtml = _state.descrHtml,
          _html = _dompurify2.default.sanitize(descrHtml),
          _el = isLoading ? _react2.default.createElement(_Load2.default.Loading, null) : isLoadFailed ? _react2.default.createElement(_Load2.default.LoadFailed, { errMsg: errMsg }) : _react2.default.createElement(Description, { _html: _html });

      return _react2.default.createElement(
        _ModalDialog2.default,
        {
          caption: 'Description for Datasource',
          isShow: isShow,
          style: S.DIALOG,
          onClose: onClose
        },
        _el
      );
    }
  }]);
  return DescriptionDialog;
}(_react.Component), _class.defaultProps = {
  data: {}
}, _temp2);
exports.default = DescriptionDialog;
//# sourceMappingURL=DescriptionDialog.js.map