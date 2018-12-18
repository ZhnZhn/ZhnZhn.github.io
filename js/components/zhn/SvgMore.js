'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = 'focusable';

var S = {
  BT: {
    verticalAlign: 'middle',
    paddingLeft: '6px',
    paddingRight: '6px'
  },
  SVG: {
    fill: 'black',
    stroke: 'black'
  }
};

var SvgMore = function SvgMore(_ref) {
  var style = _ref.style,
      svgStyle = _ref.svgStyle,
      btRef = _ref.btRef,
      onClick = _ref.onClick;

  return _react2.default.createElement(
    'button',
    {
      ref: btRef,
      className: CL,
      style: (0, _extends3.default)({}, S.BT, style),
      onClick: onClick
    },
    _react2.default.createElement(
      'svg',
      {
        style: (0, _extends3.default)({}, S.SVG, svgStyle),
        width: '6px', height: '22px',
        viewBox: '0 0 6 22',
        preserveAspectRatio: 'none', xmlns: 'http://www.w3.org/2000/svg'
      },
      _react2.default.createElement('circle', { cx: '3', cy: '4', r: '2' }),
      _react2.default.createElement('circle', { cx: '3', cy: '11', r: '2' }),
      _react2.default.createElement('circle', { cx: '3', cy: '18', r: '2' })
    )
  );
};

exports.default = SvgMore;
//# sourceMappingURL=SvgMore.js.map