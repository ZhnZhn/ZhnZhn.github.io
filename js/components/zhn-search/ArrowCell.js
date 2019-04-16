'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
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
    position: 'relative',
    top: '2px',
    borderColor: '#999 transparent transparent',
    borderStyle: 'solid',
    borderWidth: '10px 8px 4px',
    display: 'inline-block',
    height: '0px',
    width: '0px'
  }
};

var ArrowCell = function ArrowCell(_ref) {
  var arrowStyle = _ref.arrowStyle,
      _ref$tabIndex = _ref.tabIndex,
      tabIndex = _ref$tabIndex === undefined ? "-1" : _ref$tabIndex,
      onClick = _ref.onClick;
  return _react2.default.createElement(
    'button',
    {
      style: S.ARROW_CELL,
      tabIndex: tabIndex,
      onClick: onClick },
    _react2.default.createElement('span', { style: (0, _extends3.default)({}, S.ARROW, arrowStyle) })
  );
};

exports.default = ArrowCell;
//# sourceMappingURL=ArrowCell.js.map