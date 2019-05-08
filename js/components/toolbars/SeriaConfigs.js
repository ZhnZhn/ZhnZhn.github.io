'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _A = require('../zhn/A');

var _A2 = _interopRequireDefault(_A);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  ROW: {
    paddingTop: 5
  },
  fnSpan: function fnSpan(color) {
    return {
      color: color, paddingLeft: 8
    };
  }
};

var SeriaConfigs = function SeriaConfigs(_ref) {
  var configs = _ref.configs,
      onRemove = _ref.onRemove;
  return _react2.default.createElement(
    'div',
    null,
    configs.map(function (_ref2) {
      var id = _ref2.id,
          color = _ref2.color;
      return _react2.default.createElement(
        'div',
        { key: id, style: S.ROW },
        _react2.default.createElement(_A2.default.SvgMinus, { onClick: onRemove.bind(null, id) }),
        _react2.default.createElement(
          'span',
          { style: S.fnSpan(color) },
          id
        )
      );
    })
  );
};

exports.default = SeriaConfigs;
//# sourceMappingURL=SeriaConfigs.js.map