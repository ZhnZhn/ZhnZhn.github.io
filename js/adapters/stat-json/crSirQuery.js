"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crArrQuery = _interopRequireDefault(require("./crArrQuery"));

const crSirQuery = option => ({
  method: "POST",
  headers: {
    'Content-Type': "application/json"
  },
  body: JSON.stringify({
    query: (0, _crArrQuery.default)(option.items, true),
    response: {
      format: "json-stat2",
      pivot: null
    }
  })
});

var _default = crSirQuery;
exports.default = _default;
//# sourceMappingURL=crSirQuery.js.map