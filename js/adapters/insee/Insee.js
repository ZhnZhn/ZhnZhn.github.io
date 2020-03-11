"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _fnFetch = require("../../utils/fnFetch");

var _InseeApi = _interopRequireDefault(require("./InseeApi"));

var _InseeAdapter = _interopRequireDefault(require("./InseeAdapter"));

var Insee = {
  fnFetch: _fnFetch.fetchTxt,
  api: _InseeApi["default"],
  adapter: _InseeAdapter["default"]
};
var _default = Insee;
exports["default"] = _default;
//# sourceMappingURL=Insee.js.map