'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  A: {
    marginTop: '8px',
    marginRight: '16px'
  }
};

var IconFaoStat = function IconFaoStat() {
  return _react2.default.createElement(
    'a',
    {
      className: 'icon__eurostat',
      style: S.A,
      title: 'FAOSTAT',
      href: 'http://www.fao.org/faostat/en/#data'
    },
    'FAOSTAT'
  );
};

exports.default = IconFaoStat;
//# sourceMappingURL=IconFaoStat.js.map