'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _liStyle;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = {
  liStyle: (_liStyle = {
    float: 'left',
    display: 'inline-block',

    backgroundColor: '#232F3B',
    color: 'rgba(164, 135, 212, 1)'
  }, _defineProperty(_liStyle, 'color', 'gray'), _defineProperty(_liStyle, 'paddingLeft', '10px'), _defineProperty(_liStyle, 'paddingRight', '10px'), _defineProperty(_liStyle, 'paddingTop', '6px'), _defineProperty(_liStyle, 'paddingBottom', '6px'), _defineProperty(_liStyle, 'borderTopLeftRadius', '8px'), _defineProperty(_liStyle, 'borderTopRightRadius', '8px'), _defineProperty(_liStyle, 'cursor', 'pointer'), _defineProperty(_liStyle, 'fontWeight', 'bold'), _defineProperty(_liStyle, 'border', '2px solid gray'), _defineProperty(_liStyle, 'borderBottom', 'none'), _liStyle)
};

//borderTop : 'none'
var Tab = _react2.default.createClass({
  displayName: 'Tab',
  render: function render() {
    var _props = this.props;
    var title = _props.title;
    var isSelected = _props.isSelected;
    var onClick = _props.onClick;

    var selectedStyle = isSelected ?
    //{backgroundColor : '#2C2828', color : 'rgba(164, 135, 212, 1)'}
    { borderColor: 'rgba(164, 135, 212, 1)', color: 'rgba(164, 135, 212, 1)' } : null;
    return _react2.default.createElement(
      'li',
      {
        style: Object.assign({}, styles.liStyle, selectedStyle),
        onClick: onClick
      },
      _react2.default.createElement(
        'span',
        null,
        title
      )
    );
  }
});

exports.default = Tab;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\Tab.js.map