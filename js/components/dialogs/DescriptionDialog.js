'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _purify = require('purify');

var _purify2 = _interopRequireDefault(_purify);

var _fn = require('../../utils/fn');

var _ModalDialog = require('../zhn/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DESCR_EMPTY = '<p class="descr__part">Description Empty for this Datasource</p>';
var Style = {
  DIALOG: {
    top: '10%',
    left: '10%',
    width: 'auto',
    maxWidth: '80%'
  },
  DIV: {
    padding: 16
  }
};

var DescriptionDialog = function (_Component) {
  _inherits(DescriptionDialog, _Component);

  function DescriptionDialog(props) {
    _classCallCheck(this, DescriptionDialog);

    var _this = _possibleConstructorReturn(this, (DescriptionDialog.__proto__ || Object.getPrototypeOf(DescriptionDialog)).call(this));

    _this.state = {
      descrHtml: ''
    };

    _this._loadDescr = function () {
      var descrUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (descrUrl) {
        (0, _fn.fnFetchText)({ uri: descrUrl, onFetch: _this._setDescrHtml });
      } else {
        _this._setDescrHtml();
      }
    };

    _this._setDescrHtml = function () {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$text = _ref.text,
          text = _ref$text === undefined ? DESCR_EMPTY : _ref$text;

      _this.setState({ descrHtml: text });
    };

    return _this;
  }

  _createClass(DescriptionDialog, [{
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
          _html = _purify2.default.sanitize(descrHtml);

      return _react2.default.createElement(
        _ModalDialog2.default,
        {
          caption: 'Description for Datasource',
          isShow: isShow,
          style: Style.DIALOG,
          onClose: onClose
        },
        _react2.default.createElement('div', {
          style: Style.DIV,
          dangerouslySetInnerHTML: { __html: _html }
        })
      );
    }
  }]);

  return DescriptionDialog;
}(_react.Component);

DescriptionDialog.defaultProps = { data: {} };
DescriptionDialog.displayName = 'DescriptionDialog';

exports.default = DescriptionDialog;
//# sourceMappingURL=DescriptionDialog.js.map