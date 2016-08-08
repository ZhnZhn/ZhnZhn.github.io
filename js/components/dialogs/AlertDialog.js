'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var AlertDialog = _react2.default.createClass({
  displayName: 'AlertDialog',
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  },
  render: function render() {
    var _props = this.props;
    var isShow = _props.isShow;
    var data = _props.data;
    var onClose = _props.onClose;
    var alertCaption = data.alertCaption;
    var alertItemId = data.alertItemId;
    var alertDescr = data.alertDescr;
    var _alertItemId = alertItemId.substring(0, 20) + ELLIPSIS;
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
});

exports.default = AlertDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\AlertDialog.js.map