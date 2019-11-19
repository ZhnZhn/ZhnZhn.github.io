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

var _withInitialState = require('./withInitialState');

var _withInitialState2 = _interopRequireDefault(_withInitialState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Decorators = {
  dialog: function dialog(target) {
    (0, _withToolbar2.default)(target);
    (0, _withValidationLoad2.default)(target);
    (0, _withLoad2.default)(target);
    (0, _withInitialState2.default)(target);
  },
  withLoadOptions: _withLoadOptions2.default,
  withToolbar: _withToolbar2.default,
  withValidationLoad: _withValidationLoad2.default,
  withLoad: _withLoad2.default,
  withInitialState: _withInitialState2.default
};

exports.default = Decorators;
//# sourceMappingURL=Decorators.js.map