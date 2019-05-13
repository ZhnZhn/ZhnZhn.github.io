'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UnComtradeLink = function UnComtradeLink(_ref) {
   var item = _ref.item;
   return _react2.default.createElement(_Link2.default, {
      href: item,
      caption: 'UN Comtrade Link'
   });
};

exports.default = UnComtradeLink;
//# sourceMappingURL=UnComtradeLink.js.map