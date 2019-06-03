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

var _ModalDialog = require('../zhn-moleculs/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import PropTypes from "prop-types";

var CL = {
  ELL: 'ellipsis'
};

var S = {
  CAPTION: {
    display: 'inline-block',
    width: 380,
    paddingLeft: 10,
    color: '#F44336',
    fontSize: '18px',
    fontWeight: 'bold',
    lineHeight: 2
  },
  ITEM_ID: {
    width: 120,
    color: '#a487d4',
    fontWeight: 'bold',
    verticalAlign: 'bottom'
  },
  DESCR: {
    color: 'gray',
    width: 380,
    paddingLeft: 10,
    paddingRight: 8,
    fontWeight: 'bold',
    lineHeight: 1.4,
    whiteSpace: 'pre-line',
    wordWrap: 'break-word'
  }
};

var AlertDialog = function (_Component) {
  (0, _inherits3.default)(AlertDialog, _Component);

  function AlertDialog() {
    (0, _classCallCheck3.default)(this, AlertDialog);
    return (0, _possibleConstructorReturn3.default)(this, (AlertDialog.__proto__ || Object.getPrototypeOf(AlertDialog)).apply(this, arguments));
  }

  (0, _createClass3.default)(AlertDialog, [{
    key: 'shouldComponentUpdate',

    /*
    static propTypes = {
      isShow: PropTypes.bool,
      data: PropTypes.shape({
        alertCaption: PropTypes.string,
        alertItemId: PropTypes.string,
        alertDescr: PropTypes.string
      }),
      onClose: PropTypes.func
    }
    */

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
          _data$alertCaption = data.alertCaption,
          alertCaption = _data$alertCaption === undefined ? 'Item' : _data$alertCaption,
          _data$alertItemId = data.alertItemId,
          alertItemId = _data$alertItemId === undefined ? '' : _data$alertItemId,
          alertDescr = data.alertDescr,
          _caption = alertCaption + ': ';

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
            { style: S.CAPTION },
            _caption,
            _react2.default.createElement(
              'span',
              {
                className: CL.ELL,
                style: S.ITEM_ID,
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
            { style: S.DESCR },
            alertDescr
          )
        )
      );
    }
  }]);
  return AlertDialog;
}(_react.Component);

exports.default = AlertDialog;
//# sourceMappingURL=AlertDialog.js.map