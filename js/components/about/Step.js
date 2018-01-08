'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  STEP: {
    display: 'inline-block',
    color: '#80c040',
    border: '2px solid #80c040',
    borderRadius: '50%',
    lineHeight: '24px',
    width: '26px',
    height: '26px',
    textAlign: 'center',
    textTransform: 'uppercase'
  }
};

var Step = function Step(_ref) {
  var _ref$step = _ref.step,
      step = _ref$step === undefined ? '0' : _ref$step;
  return _react2.default.createElement(
    'span',
    { style: S.STEP },
    step
  );
};

exports.default = Step;
//# sourceMappingURL=Step.js.map