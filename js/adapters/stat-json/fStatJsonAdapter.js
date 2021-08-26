"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _fTableApi = _interopRequireDefault(require("../stat-json/fTableApi"));

var _StatJsonAdapter = _interopRequireDefault(require("./StatJsonAdapter"));

const fStatJsonAdapter = url => {
  const tableApi = (0, _fTableApi.default)(url);
  return {
    api: tableApi,
    optionFetch: tableApi.crOptionFetch,
    adapter: _StatJsonAdapter.default
  };
};

var _default = fStatJsonAdapter;
exports.default = _default;
//# sourceMappingURL=fStatJsonAdapter.js.map