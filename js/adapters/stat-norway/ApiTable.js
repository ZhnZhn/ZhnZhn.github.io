'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fTableApi = require('../stat-json/fTableApi');

var _fTableApi2 = _interopRequireDefault(_fTableApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_URL = 'https://data.ssb.no/api/v0/en/table';
var TableApi = (0, _fTableApi2.default)(ROOT_URL);

exports.default = TableApi;
//# sourceMappingURL=ApiTable.js.map