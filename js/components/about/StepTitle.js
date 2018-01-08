'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Step = require('./Step');

var _Step2 = _interopRequireDefault(_Step);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StepTitle = function StepTitle(_ref) {
  var step = _ref.step,
      title = _ref.title;
  return _react2.default.createElement(
    'p',
    null,
    _react2.default.createElement(_Step2.default, { step: step }),
    _react2.default.createElement(
      'span',
      null,
      '\xA0',
      title,
      '.'
    )
  );
};

exports.default = StepTitle;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\about\StepTitle.js.map