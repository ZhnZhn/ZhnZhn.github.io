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

var _isUpdateDescr = function _isUpdateDescr(prevProps, props) {
  return prevProps !== props && prevProps.isShow !== props.isShow && prevProps.data.descrUrl !== props.data.descrUrl;
};

var DescriptionDialog = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(DescriptionDialog, _Component);

  function DescriptionDialog() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DescriptionDialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DescriptionDialog.__proto__ || Object.getPrototypeOf(DescriptionDialog)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      descrHtml: ''
    }, _this._loadDescr = function () {
      var descrUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (descrUrl) {
        (0, _fnFetch.fetchTxt)({
          uri: descrUrl,
          onFetch: _this._setDescrHtml
        });
      } else {
        _this._setDescrHtml();
      }
    }, _this._setDescrHtml = function () {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$json = _ref2.json,
          text = _ref2$json === undefined ? DESCR_EMPTY : _ref2$json;

      _this.setState({ descrHtml: text });
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
      if (_isUpdateDescr(prevProps, this.props)) {
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
          descrHtml = this.state.descrHtml,
          _html = _dompurify2.default.sanitize(descrHtml);

      return _react2.default.createElement(
        _ModalDialog2.default,
        {
          caption: 'Description for Datasource',
          isShow: isShow,
          style: S.DIALOG,
          onClose: onClose
        },
        _react2.default.createElement('div', {
          style: S.DIV,
          dangerouslySetInnerHTML: { __html: _html }
        })
      );
    }
  }]);
  return DescriptionDialog;
}(_react.Component), _class.defaultProps = {
  data: {}
}, _temp2);
exports.default = DescriptionDialog;
//# sourceMappingURL=DescriptionDialog.js.map