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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dompurify = require('dompurify');

var _dompurify2 = _interopRequireDefault(_dompurify);

var _fnFetch = require('../../utils/fnFetch');

var _ModalDialog = require('../zhn-moleculs/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DESCR_EMPTY = '<p class="descr__part">Description Empty for this Datasource</p>';
var STYLE = {
  DIALOG: {
    top: '10%',
    left: '10%',
    width: 'auto',
    maxWidth: '89%'
  },
  DIV: {
    padding: '16px'
  }
};

var DescriptionDialog = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(DescriptionDialog, _Component);

  function DescriptionDialog(props) {
    (0, _classCallCheck3.default)(this, DescriptionDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DescriptionDialog.__proto__ || Object.getPrototypeOf(DescriptionDialog)).call(this));

    _this._loadDescr = function () {
      var descrUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (descrUrl) {
        (0, _fnFetch.fetchTxt)({ uri: descrUrl, onFetch: _this._setDescrHtml });
      } else {
        _this._setDescrHtml();
      }
    };

    _this._setDescrHtml = function () {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$json = _ref.json,
          text = _ref$json === undefined ? DESCR_EMPTY : _ref$json;

      _this.setState({ descrHtml: text });
    };

    _this.state = {
      descrHtml: ''
    };
    return _this;
  }

  (0, _createClass3.default)(DescriptionDialog, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps !== this.props && nextProps.isShow !== this.props.isShow && nextProps.data.descrUrl !== this.props.data.descrUrl) {
        this._loadDescr(nextProps.data.descrUrl);
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
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._loadDescr(this.props.data.descrUrl);
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
          style: STYLE.DIALOG,
          onClose: onClose
        },
        _react2.default.createElement('div', {
          style: STYLE.DIV,
          dangerouslySetInnerHTML: { __html: _html }
        })
      );
    }
  }]);
  return DescriptionDialog;
}(_react.Component), _class.defaultProps = {
  data: {}
}, _temp);
exports.default = DescriptionDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\DescriptionDialog.js.map