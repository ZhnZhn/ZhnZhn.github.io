'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dompurify = require('dompurify');

var _dompurify2 = _interopRequireDefault(_dompurify);

var _fn = require('../../utils/fn');

var _ModalDialog = require('../zhn/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DOMPurify = (0, _dompurify2.default)(window);

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

var DescriptionDialog = _react2.default.createClass({
  displayName: 'DescriptionDialog',
  getDefaultProps: function getDefaultProps() {
    return {
      data: {}
    };
  },
  getInitialState: function getInitialState() {
    return {
      descrHtml: ''
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props && nextProps.isShow !== this.props.isShow && nextProps.data.descrUrl !== this.props.data.descrUrl) {
      this._loadDescr(nextProps.data.descrUrl);
    }
  },
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  },
  componentDidMount: function componentDidMount() {
    this._loadDescr(this.props.data.descrUrl);
  },
  _loadDescr: function _loadDescr() {
    var descrUrl = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

    if (descrUrl) {
      (0, _fn.fnFetchText)({ uri: descrUrl, onFetch: this._setDescrHtml });
    } else {
      this._setDescrHtml();
    }
  },
  _setDescrHtml: function _setDescrHtml() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var _ref$text = _ref.text;
    var text = _ref$text === undefined ? DESCR_EMPTY : _ref$text;

    this.setState({ descrHtml: text });
  },
  render: function render() {
    var _props = this.props;
    var isShow = _props.isShow;
    var data = _props.data;
    var onClose = _props.onClose;
    var descrHtml = this.state.descrHtml;
    var _html = DOMPurify.sanitize(descrHtml);

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
});

exports.default = DescriptionDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\DescriptionDialog.js.map