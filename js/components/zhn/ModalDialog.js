'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgClose = require('../SvgClose.js');

var _SvgClose2 = _interopRequireDefault(_SvgClose);

var _ToolBarButton = require('../ToolBarButton.js');

var _ToolBarButton2 = _interopRequireDefault(_ToolBarButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  rootDiv: {
    position: 'absolute',
    top: '20%',
    left: '40%',
    display: 'block',
    backgroundColor: '#4D4D4D',
    border: 'solid 2px #232F3B',
    borderRadius: '5px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 6px',
    zIndex: 10
  },
  captionDiv: {
    padding: '5px',
    color: 'rgba(164, 135, 212,1)',
    backgroundColor: '#232F3B',
    textAlign: 'center',
    fontSize: '18px'
  },
  rowDiv: {
    margin: '5px'
  },
  labelSpan: {
    color: '#1B75BB',
    display: 'inline-block',
    textAlign: 'right',
    width: '90px'
  },
  commandDiv: {
    cursor: 'default',
    float: 'right',
    marginTop: '8px',
    marginBottom: '10px',
    marginRight: '4px'
  },
  inputText: {
    background: 'transparent none repeat scroll 0 0',
    border: 'medium none',
    outline: 'medium none',
    height: '30px',
    paddingLeft: '10px',
    color: 'green'
  }
};

var ModalDialog = _react2.default.createClass({
  displayName: 'ModalDialog',
  _handlerClickDialog: function _handlerClickDialog(event) {
    event.stopPropagation();
  },


  _renderCommandButton: function _renderCommandButton() {
    var _props = this.props;
    var commandButtons = _props.commandButtons;
    var onClose = _props.onClose;

    return _react2.default.createElement(
      'div',
      { style: styles.commandDiv },
      commandButtons,
      _react2.default.createElement(_ToolBarButton2.default, {
        type: 'TypeC',
        caption: 'Close',
        onClick: onClose
      })
    );
  },

  render: function render() {
    var _props2 = this.props;
    var caption = _props2.caption;
    var isShow = _props2.isShow;
    var children = _props2.children;
    var onClose = _props2.onClose;


    var _rootStyle = isShow ? { display: 'block' } : { display: 'none' };

    return _react2.default.createElement(
      'div',
      { className: 'modal-root', style: _rootStyle, onClick: onClose },
      _react2.default.createElement(
        'div',
        {
          ref: 'rootDiv',
          className: 'show-popup',
          style: styles.rootDiv,
          onClick: this._handlerClickDialog
        },
        _react2.default.createElement(
          'div',
          { style: styles.captionDiv },
          _react2.default.createElement(
            'span',
            null,
            caption
          ),
          _react2.default.createElement(_SvgClose2.default, { onClose: onClose })
        ),
        _react2.default.createElement(
          'div',
          null,
          children
        ),
        this._renderCommandButton()
      )
    );
  }
});

exports.default = ModalDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\ModalDialog.js.map