'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _withLoadOptions = require('./withLoadOptions');

var _withLoadOptions2 = _interopRequireDefault(_withLoadOptions);

var _withToolbar = require('./withToolbar');

var _withToolbar2 = _interopRequireDefault(_withToolbar);

var _withValidationLoad = require('./withValidationLoad');

var _withValidationLoad2 = _interopRequireDefault(_withValidationLoad);

var _withLoad = require('./withLoad');

var _withLoad2 = _interopRequireDefault(_withLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Decorators = {
  withLoadOptions: _withLoadOptions2.default,
  withToolbar: _withToolbar2.default,
  withValidationLoad: _withValidationLoad2.default,
  withLoad: _withLoad2.default
};

exports.default = Decorators;
//# sourceMappingURL=Decorators.js.map