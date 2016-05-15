'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgClose = require('./SvgClose.js');

var _SvgClose2 = _interopRequireDefault(_SvgClose);

var _ToolBarButton = require('./ToolBarButton.js');

var _ToolBarButton2 = _interopRequireDefault(_ToolBarButton);

var _Interact = require('../utils/Interact.js');

var _Interact2 = _interopRequireDefault(_Interact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  rootDiv: {
    position: 'absolute',
    top: '30px',
    left: '50px',
    backgroundColor: '#4D4D4D',
    border: 'solid 2px #232F3B',
    borderRadius: '5px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 6px',
    zIndex: 10
  },
  captionDiv: {
    padding: '5px',
    //color: 'yellow',
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

var ZhDialog = _react2.default.createClass({
  displayName: 'ZhDialog',


  componentDidMount: function componentDidMount() {
    _Interact2.default.makeDragable(this.refs['rootDiv']);
  },

  _renderChildren: function _renderChildren() {
    var domChildren = this.props.children.map(function (component, index) {
      return _react2.default.createElement('component', { key: index });
    });
    return _react2.default.createElement(
      'div',
      { style: { cursor: 'default' } },
      domChildren
    );
  },

  _renderCommandButton: function _renderCommandButton() {
    return _react2.default.createElement(
      'div',
      { style: styles.commandDiv },
      this.props.commandButtons,
      _react2.default.createElement(_ToolBarButton2.default, {
        type: 'TypeC',
        caption: 'Show',
        onClick: this.props.onShowChart
      }),
      _react2.default.createElement(_ToolBarButton2.default, {
        type: 'TypeC',
        caption: 'Close',
        onClick: this.props.onClose,
        onTouchStart: this.props.onClose
      })
    );
  },

  render: function render() {
    var _props = this.props;
    var caption = _props.caption;
    var children = _props.children;

    /*
    let index = 0
    let childrenWithProps = React.Children.map(this.props.children, function(child) {
            return React.cloneElement(child, {key : index++});
    });
    */

    var styleShow = this.props.isShow ? { display: 'block' } : { display: 'none' };
    var classShow = this.props.isShow ? 'show-popup' : null;

    return _react2.default.createElement(
      'div',
      {
        ref: 'rootDiv',
        className: classShow,
        style: Object.assign({}, styles.rootDiv, styleShow)
      },
      _react2.default.createElement(
        'div',
        { style: styles.captionDiv },
        _react2.default.createElement(
          'span',
          null,
          caption
        ),
        _react2.default.createElement(_SvgClose2.default, { onClose: this.props.onClose })
      ),
      _react2.default.createElement(
        'div',
        { style: { cursor: 'default' } },
        children
      ),
      this._renderCommandButton()
    );
  }
});

exports.default = ZhDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\ZhDialog.js.map