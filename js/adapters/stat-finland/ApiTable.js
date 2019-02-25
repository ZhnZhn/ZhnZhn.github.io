'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fTableApi = require('../stat-json/fTableApi');

var _fTableApi2 = _interopRequireDefault(_fTableApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_URL = 'https://pxnet2.stat.fi/PXWeb/api/v1/en/StatFin';
var TableApi = (0, _fTableApi2.default)(ROOT_URL);

exports.default = TableApi;
//# sourceMappingURL=ApiTable.js.map