'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DialogCell = require('../DialogCell');

var _DialogCell2 = _interopRequireDefault(_DialogCell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _crCommandsWithLoad = function _crCommandsWithLoad(comp) {
  return [_react2.default.createElement(_DialogCell2.default.Button.Load, { key: 'load', onClick: comp._handleLoad })];
};

var withLoad = function withLoad(target) {
  Object.assign(target.prototype, {
    _crCommandsWithLoad: _crCommandsWithLoad
  });
};

exports.default = withLoad;
//# sourceMappingURL=withLoad.js.map