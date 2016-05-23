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

var ClassNames = {
  SHOWING: 'show-popup',
  HIDING: 'hide-popup'
};

var Styles = {
  SHOW: {
    display: 'block'
  },
  HIDE: {
    display: 'none'
  },
  HIDE_POPUP: {
    opacity: 0,
    transform: 'scaleY(0)'
  },
  ROOT_DIV: {
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
  CAPTON_DIV: {
    padding: '5px',
    color: 'rgba(164, 135, 212,1)',
    backgroundColor: '#232F3B',
    textAlign: 'center',
    fontSize: '18px'
  },
  COMMAND_DIV: {
    cursor: 'default',
    float: 'right',
    marginTop: '8px',
    marginBottom: '10px',
    marginRight: '4px'
  }
};

var ModalDialog = _react2.default.createClass({
  displayName: 'ModalDialog',

  propTypes: {
    isShow: _react2.default.PropTypes.bool,
    timeout: _react2.default.PropTypes.number,
    caption: _react2.default.PropTypes.string,
    onClose: _react2.default.PropTypes.func
  },
  getDefaultProps: function getDefaultProps() {
    return {
      timeout: 450
    };
  },
  getInitialState: function getInitialState() {
    this.wasClosing = false;
    return {};
  },
  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    var _this = this;

    if (this.wasClosing) {
      setTimeout(function () {
        _this.setState({});
      }, this.props.timeout);
    }
  },
  _handlerClickDialog: function _handlerClickDialog(event) {
    event.stopPropagation();
  },


  _renderCommandButton: function _renderCommandButton() {
    var _props = this.props;
    var commandButtons = _props.commandButtons;
    var onClose = _props.onClose;

    return _react2.default.createElement(
      'div',
      { style: Styles.COMMAND_DIV },
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
    var isShow = _props2.isShow;
    var caption = _props2.caption;
    var children = _props2.children;
    var onClose = _props2.onClose;


    var _className = void 0,
        _style = void 0;

    if (this.wasClosing) {
      _style = Styles.HIDE;
      this.wasClosing = false;
    } else {
      _className = isShow ? ClassNames.SHOWING : ClassNames.HIDING;
      _style = isShow ? Styles.SHOW : Styles.HIDE_POPUP;
      if (!isShow) {
        this.wasClosing = true;
      }
    }

    return _react2.default.createElement(
      'div',
      {
        className: _className,
        style: Object.assign({}, Styles.ROOT_DIV, _style),
        onClick: this._handlerClickDialog
      },
      _react2.default.createElement(
        'div',
        { style: Styles.CAPTON_DIV },
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
    );
  }

});

exports.default = ModalDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\ModalDialog.js.map