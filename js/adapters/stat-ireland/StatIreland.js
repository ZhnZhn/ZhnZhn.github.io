"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _fStatJsonAdapter = _interopRequireDefault(require("../stat-json/fStatJsonAdapter"));

const DATA_URL = 'https://ws.cso.ie/public/api.restful/PxStat.Data.Cube_API.ReadDataset';

const _crUrlPath = option => {
  const {
    dfId
  } = option,
        _arr = dfId.split('/');

  return '/' + _arr[_arr.length - 1] + '/JSON-stat/2.0/en';
};

const StatIreland = (0, _fStatJsonAdapter.default)(DATA_URL, _crUrlPath);
var _default = StatIreland;
exports.default = _default;
//# sourceMappingURL=StatIreland.js.map