'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ModalDialog = require('../zhn/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _InputSecret = require('../zhn/InputSecret');

var _InputSecret2 = _interopRequireDefault(_InputSecret);

var _ToolBarButton = require('../ToolBarButton');

var _ToolBarButton2 = _interopRequireDefault(_ToolBarButton);

var _ChartStore = require('../../flux/stores/ChartStore');

var _ChartStore2 = _interopRequireDefault(_ChartStore);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = _DialogStyles2.default;

var SettingsDialog = _react2.default.createClass({
  displayName: 'SettingsDialog',
  _handlerSet: function _handlerSet() {
    _ChartStore2.default.setQuandlKey(this.refs.input.getValue());
    this.props.onClose();
  },
  render: function render() {
    var commandButtons = [_react2.default.createElement(_ToolBarButton2.default, {
      key: 'a',
      type: 'TypeC',
      caption: 'Set',
      onClick: this._handlerSet
    })];
    var _props = this.props;
    var isShow = _props.isShow;
    var onClose = _props.onClose;

    return _react2.default.createElement(
      _ModalDialog2.default,
      {
        caption: 'User Settings',
        isShow: isShow,
        commandButtons: commandButtons,
        onClose: onClose
      },
      _react2.default.createElement(
        'div',
        { style: styles.rowDiv, key: '1' },
        _react2.default.createElement(
          'span',
          { style: styles.labelSpan },
          'Quandl:'
        ),
        _react2.default.createElement(_InputSecret2.default, {
          ref: 'input',
          placeholder: 'Quandl API Key'
        })
      )
    );
  }
});

exports.default = SettingsDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\header\SettingsDialog.js.map