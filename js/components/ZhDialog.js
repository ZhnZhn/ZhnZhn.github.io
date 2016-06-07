'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgClose = require('./SvgClose');

var _SvgClose2 = _interopRequireDefault(_SvgClose);

var _ToolBarButton = require('./ToolBarButton');

var _ToolBarButton2 = _interopRequireDefault(_ToolBarButton);

var _Interact = require('../utils/Interact');

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
    color: 'rgba(164, 135, 212,1)',
    backgroundColor: '#232F3B',
    textAlign: 'center',
    fontSize: '18px'
  },
  commandDiv: {
    cursor: 'default',
    float: 'right',
    marginTop: '8px',
    marginBottom: '10px',
    marginRight: '4px'
  }
};

var ZhDialog = _react2.default.createClass({
  displayName: 'ZhDialog',
  componentDidMount: function componentDidMount() {
    _Interact2.default.makeDragable(this.domRootDiv);
  },
  _renderCommandButton: function _renderCommandButton() {
    var _props = this.props;
    var commandButtons = _props.commandButtons;
    var onShowChart = _props.onShowChart;
    var onClose = _props.onClose;

    return _react2.default.createElement(
      'div',
      { style: styles.commandDiv },
      commandButtons,
      _react2.default.createElement(_ToolBarButton2.default, {
        type: 'TypeC',
        caption: 'Show',
        onClick: onShowChart
      }),
      _react2.default.createElement(_ToolBarButton2.default, {
        type: 'TypeC',
        caption: 'Close',
        onClick: onClose
      })
    );
  },
  render: function render() {
    var _this = this;

    var _props2 = this.props;
    var isShow = _props2.isShow;
    var caption = _props2.caption;
    var children = _props2.children;
    var onClose = _props2.onClose;
    var _styleShow = isShow ? { display: 'block' } : { display: 'none' };
    var _classShow = isShow ? 'show-popup' : null;

    return _react2.default.createElement(
      'div',
      {
        ref: function ref(c) {
          return _this.domRootDiv = c;
        },
        className: _classShow,
        style: Object.assign({}, styles.rootDiv, _styleShow)
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
        { style: { cursor: 'default' } },
        children
      ),
      this._renderCommandButton()
    );
  }
});

exports.default = ZhDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\ZhDialog.js.map