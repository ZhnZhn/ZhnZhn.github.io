"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _LoadType = require("../../constants/LoadType");

var _crDfArrQuery = _interopRequireDefault(require("./crDfArrQuery"));

const _crResponseFormat = _ref => {
  let {
    loadId
  } = _ref;
  return loadId === _LoadType.LT_SFL ? "json-stat2" : "json-stat";
};

const crDfQuery = option => ({
  method: 'POST',
  body: JSON.stringify({
    query: (0, _crDfArrQuery.default)(option),
    response: {
      format: _crResponseFormat(option)
    }
  })
});

var _default = crDfQuery;
exports.default = _default;
//# sourceMappingURL=crDfQuery.js.map