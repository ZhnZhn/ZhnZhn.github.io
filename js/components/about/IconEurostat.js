'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  A: {
    marginLeft: '8px'
  }
};

var IconEurostat = function IconEurostat() {
  return _react2.default.createElement(
    'a',
    {
      className: 'icon__eurostat',
      title: 'Eurostat',
      style: S.A,
      href: 'http://ec.europa.eu/eurostat'
    },
    'eurostat'
  );
};

exports.default = IconEurostat;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\about\IconEurostat.js.map