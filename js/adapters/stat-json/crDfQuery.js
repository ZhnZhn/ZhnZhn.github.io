"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crDfArrQuery = _interopRequireDefault(require("./crDfArrQuery"));

const crDfQuery = option => ({
  method: 'POST',
  body: JSON.stringify({
    query: (0, _crDfArrQuery.default)(option),
    response: {
      format: "json-stat"
    }
  })
});

var _default = crDfQuery;
exports.default = _default;
//# sourceMappingURL=crDfQuery.js.map