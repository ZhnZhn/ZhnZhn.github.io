'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  rootDiv: {
    backgroundColor: '#4D4D4D',
    lineHeight: 1.5
  },
  divSvg: {
    width: '16px',
    height: '16px',
    display: 'inline-block'
  },
  labelCaption: {
    paddingLeft: '4px',
    verticalAlign: 'top',
    color: 'rgba(164, 135, 212, 1)',
    fontFamily: 'Roboto, Arial Unicode MS, Arial, sans-serif',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer'
  },
  itemRow: {
    backgroundColor: '#404040'
  }
};

var pathOpen = "M 2,14 L 14,14 14,2 2,14";
var pathClose = "M 2,2 L 14,8 2,14 2,2";

var OpenClose2 = _react2.default.createClass({
  displayName: 'OpenClose2',
  getInitialState: function getInitialState() {
    var isOpen = this.props.isClose ? false : true,
        fillOpen = this.props.fillOpen ? this.props.fillOpen : 'yellow',
        fillClose = this.props.fillClose ? this.props.fillClose : '#4D4D4D';

    return {
      isOpen: isOpen,
      fillOpen: fillOpen,
      fillClose: fillClose
    };
  },
  _handlerClickOpenClose: function _handlerClickOpenClose() {
    this.state.isOpen = !this.state.isOpen;
    this.setState(this.state);
  },
  render: function render() {
    var _props = this.props;
    var style = _props.style;
    var styleNotSelected = _props.styleNotSelected;
    var styleCaption = _props.styleCaption;
    var caption = _props.caption;
    var isDraggable = _props.isDraggable;
    var option = _props.option;
    var onDragStart = _props.onDragStart;
    var onDragEnter = _props.onDragEnter;
    var onDragOver = _props.onDragOver;
    var onDragLeave = _props.onDragLeave;
    var onDrop = _props.onDrop;
    var children = _props.children;
    var _dragOption = isDraggable ? {
      draggable: true,
      onDragStart: onDragStart.bind(null, option),
      onDrop: onDrop.bind(null, option),
      onDragEnter: onDragEnter,
      onDragOver: onDragOver,
      onDragLeave: onDragLeave
    } : undefined;

    var _pathV = void 0,
        _fillV = void 0,
        _displayDivStyle = void 0,
        _classShow = void 0,
        _styleNotSelected = void 0;
    if (this.state.isOpen) {
      _pathV = pathOpen;
      _fillV = this.state.fillOpen;
      _displayDivStyle = 'block';
      _classShow = 'show-popup';
      _styleNotSelected = null;
    } else {
      _pathV = pathClose;
      _fillV = this.state.fillClose;
      _displayDivStyle = 'none';
      _classShow = null;
      _styleNotSelected = styleNotSelected;
    }

    return _react2.default.createElement(
      'div',
      { style: Object.assign({}, styles.rootDiv, style) },
      _react2.default.createElement(
        'div',
        _extends({
          className: 'not-selected',
          style: _styleNotSelected,
          onClick: this._handlerClickOpenClose
        }, _dragOption),
        _react2.default.createElement(
          'div',
          { style: styles.divSvg },
          _react2.default.createElement(
            'svg',
            {
              viewBox: '0 0 16 16', width: '100%', height: '100%',
              preserveAspectRatio: 'none', xmlns: 'http://www.w3.org/2000/svg',
              style: { display: 'inline-block' }
            },
            _react2.default.createElement('path', {
              d: _pathV,
              fill: _fillV,
              strokeWidth: '1', stroke: this.state.fillOpen
            })
          )
        ),
        _react2.default.createElement(
          'span',
          { style: Object.assign({}, styles.labelCaption, styleCaption) },
          caption
        )
      ),
      _react2.default.createElement(
        'div',
        { className: _classShow, style: { display: _displayDivStyle } },
        children
      )
    );
  }
});

exports.default = OpenClose2;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\OpenClose2.js.map