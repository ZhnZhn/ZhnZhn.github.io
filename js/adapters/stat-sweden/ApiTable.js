'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _factoryTableApi = require('../stat-json/factoryTableApi');

var _factoryTableApi2 = _interopRequireDefault(_factoryTableApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_URL = 'http://api.scb.se/OV0104/v1/doris/en/ssd';
var TableApi = (0, _factoryTableApi2.default)(ROOT_URL);

exports.default = TableApi;
//# sourceMappingURL=ApiTable.js.map