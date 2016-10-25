'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  ARROW_CELL: {
    position: 'absolute',
    top: '10px',
    right: '0px',
    cursor: 'pointer',
    textAlign: 'center',
    verticalAlign: 'middle',
    width: '35px',
    paddingRight: '5px'
  },
  ARROW: {
    borderColor: '#999 transparent transparent',
    borderStyle: 'solid',
    borderWidth: '5px 5px 2.5px',
    display: 'inline-block',
    height: '0px',
    width: '0px'
  }
};

var C = {
  ANIMATION_CIRCLE: "circle infinite 1.25s linear",
  BORDER_COLOR: "rgb(27, 117, 187) transparent transparent"
};

var ArrowCell = _react2.default.createClass({
  displayName: 'ArrowCell',
  render: function render() {
    var _this = this;

    var _props = this.props;
    var styleArrow = _props.styleArrow;
    var onClick = _props.onClick;

    return _react2.default.createElement(
      'span',
      {
        ref: function ref(c) {
          return _this.arrowCell = c;
        },
        style: STYLE.ARROW_CELL,
        onClick: onClick },
      _react2.default.createElement('span', {
        ref: function ref(c) {
          return _this.arrow = c;
        },
        style: Object.assign({}, STYLE.ARROW, styleArrow)
      })
    );
  },
  startAnimation: function startAnimation() {
    this.arrowCell.style.animation = C.ANIMATION_CIRCLE;
    this.arrow.style.borderColor = C.BORDER_COLOR;
  },
  stopAnimation: function stopAnimation() {
    this.arrowCell.style.animation = "";
  }
});

exports.default = ArrowCell;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-select\ArrowCell.js.map