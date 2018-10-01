'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DbNomicsApi = require('./DbNomicsApi');

var _DbNomicsApi2 = _interopRequireDefault(_DbNomicsApi);

var _DbNomicsAdapter = require('./DbNomicsAdapter');

var _DbNomicsAdapter2 = _interopRequireDefault(_DbNomicsAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DbNomics = {
  api: _DbNomicsApi2.default,
  adapter: _DbNomicsAdapter2.default
};

exports.default = DbNomics;
//# sourceMappingURL=DbNomics.js.map