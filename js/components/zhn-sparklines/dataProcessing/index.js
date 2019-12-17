"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.hm = void 0;

var _max = _interopRequireDefault(require("./max"));

var _min = _interopRequireDefault(require("./min"));

var _mean = _interopRequireDefault(require("./mean"));

var _median = _interopRequireDefault(require("./median"));

var hm = {
  max: _max["default"],
  min: _min["default"],
  mean: _mean["default"],
  avg: _mean["default"],
  median: _median["default"]
};
exports.hm = hm;
//# sourceMappingURL=index.js.map