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

var _ModalDialog = require('../zhn/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = _DialogStyles2.default;

var Styles = {
  CAPTION: {
    width: '400px',
    paddingLeft: '10px',
    color: 'rgba(164, 135, 212,1)',
    fontSize: '18px',
    fontWeight: 'bold',
    lineHeight: 2
  },
  DESCR: {
    color: 'gray',
    width: '400px',
    paddingLeft: '10px',
    fontWeight: 'bold',
    lineHeight: 1.4,
    whiteSpace: 'pre'
  }
};

var InfoDialog = function (_Component) {
  (0, _inherits3.default)(InfoDialog, _Component);

  function InfoDialog(props) {
    (0, _classCallCheck3.default)(this, InfoDialog);
    return (0, _possibleConstructorReturn3.default)(this, (InfoDialog.__proto__ || Object.getPrototypeOf(InfoDialog)).call(this));
  }

  (0, _createClass3.default)(InfoDialog, [{
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
      var _props = this.props,
          isShow = _props.isShow,
          data = _props.data,
          onClose = _props.onClose,
          caption = data.caption,
          descr = data.descr;

      return _react2.default.createElement(
        _ModalDialog2.default,
        {
          caption: 'Information',
          isShow: isShow,
          onClose: onClose
        },
        _react2.default.createElement(
          'div',
          { style: styles.rowDiv, key: '1' },
          _react2.default.createElement(
            'p',
            { style: Styles.CAPTION },
            caption
          )
        ),
        _react2.default.createElement(
          'div',
          { style: styles.rowDiv, key: '2' },
          _react2.default.createElement(
            'p',
            { style: Styles.DESCR },
            descr
          )
        )
      );
    }
  }]);
  return InfoDialog;
}(_react.Component);

InfoDialog.displayName = 'InfoDialog';

exports.default = InfoDialog;
//# sourceMappingURL=InfoDialog.js.map