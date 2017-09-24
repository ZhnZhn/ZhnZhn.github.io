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

var _ModalDialog = require('../zhn-moleculs/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = {
  ELL: 'ellipsis'
};

var Styles = {
  CAPTION: {
    display: 'inline-block',
    width: '400px',
    paddingLeft: '10px',
    color: '#F44336',
    fontSize: '18px',
    fontWeight: 'bold',
    lineHeight: 2
  },
  ITEM_ID: {
    width: '120px',
    color: '#a487d4',
    fontWeight: 'bold',
    verticalAlign: 'bottom'
  },
  DESCR: {
    color: 'gray',
    width: '400px',
    paddingLeft: '10px',
    paddingRight: '8px',
    fontWeight: 'bold',
    lineHeight: 1.4,
    whiteSpace: 'pre-line',
    wordWrap: 'break-word'
  }
};

var AlertDialog = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(AlertDialog, _Component);

  function AlertDialog() {
    (0, _classCallCheck3.default)(this, AlertDialog);
    return (0, _possibleConstructorReturn3.default)(this, (AlertDialog.__proto__ || Object.getPrototypeOf(AlertDialog)).apply(this, arguments));
  }

  (0, _createClass3.default)(AlertDialog, [{
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
          alertCaption = data.alertCaption,
          _data$alertItemId = data.alertItemId,
          alertItemId = _data$alertItemId === undefined ? '' : _data$alertItemId,
          alertDescr = data.alertDescr;

      return _react2.default.createElement(
        _ModalDialog2.default,
        {
          caption: 'Alert',
          isShow: isShow,
          onClose: onClose
        },
        _react2.default.createElement(
          'div',
          { style: _DialogStyles2.default.rowDiv },
          _react2.default.createElement(
            'span',
            { style: Styles.CAPTION },
            alertCaption + ': ',
            _react2.default.createElement(
              'span',
              {
                className: CL.ELL,
                style: Styles.ITEM_ID,
                title: alertItemId
              },
              alertItemId
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { style: _DialogStyles2.default.rowDiv },
          _react2.default.createElement(
            'p',
            { style: Styles.DESCR },
            alertDescr
          )
        )
      );
    }
  }]);
  return AlertDialog;
}(_react.Component), _class.defaultProps = {
  data: {}
}, _temp);
process.env.NODE_ENV !== "production" ? AlertDialog.propTypes = {
  isShow: _react.PropTypes.bool,
  data: _react.PropTypes.shape({
    alertCaption: _react.PropTypes.string,
    alertItemId: _react.PropTypes.string,
    alertDescr: _react.PropTypes.string
  }),
  onClose: _react.PropTypes.func
} : void 0;
exports.default = AlertDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\AlertDialog.js.map