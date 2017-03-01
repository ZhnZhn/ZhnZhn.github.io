'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ModalDialog = require('../zhn/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = _DialogStyles2.default;

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
    color: 'rgba(164, 135, 212,1)',
    fontWeight: 'bold'
  },
  DESCR: {
    color: 'gray',
    width: '400px',
    paddingLeft: '10px',
    fontWeight: 'bold',
    lineHeight: 1.4,
    whiteSpace: 'pre-line'
  }
};

var ELLIPSIS = '...';

var AlertDialog = function (_Component) {
  _inherits(AlertDialog, _Component);

  function AlertDialog(props) {
    _classCallCheck(this, AlertDialog);

    return _possibleConstructorReturn(this, (AlertDialog.__proto__ || Object.getPrototypeOf(AlertDialog)).call(this));
  }

  _createClass(AlertDialog, [{
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
          alertDescr = data.alertDescr,
          _alertItemId = alertItemId.substring(0, 20) + ELLIPSIS;

      return _react2.default.createElement(
        _ModalDialog2.default,
        {
          caption: 'Alert',
          isShow: isShow,
          onClose: onClose
        },
        _react2.default.createElement(
          'div',
          { style: styles.rowDiv, key: '1' },
          _react2.default.createElement(
            'span',
            { style: Styles.CAPTION },
            alertCaption + ': ',
            _react2.default.createElement(
              'span',
              { style: Styles.ITEM_ID, title: alertItemId },
              _alertItemId
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { style: styles.rowDiv, key: '2' },
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
}(_react.Component);

AlertDialog.displayName = 'AlertDialog';

exports.default = AlertDialog;
//# sourceMappingURL=AlertDialog.js.map