"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _min = _interopRequireDefault(require("./min"));

var _max = _interopRequireDefault(require("./max"));

var _default = function _default(_ref) {
  var data = _ref.data,
      limit = _ref.limit,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 1 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 1 : _ref$height,
      _ref$margin = _ref.margin,
      margin = _ref$margin === void 0 ? 0 : _ref$margin,
      _ref$max = _ref.max,
      max = _ref$max === void 0 ? (0, _max["default"])(data) : _ref$max,
      _ref$min = _ref.min,
      min = _ref$min === void 0 ? (0, _min["default"])(data) : _ref$min;
  var len = data.length;

  if (limit && limit < len) {
    data = data.slice(len - limit);
  }

  var vfactor = (height - margin * 2) / (max - min || 2);
  var hfactor = (width - margin * 2) / ((limit || len) - (len > 1 ? 1 : 0)); //const hfactor = (width - marginLeft - marginRight) / ((limit || len) - (len > 1 ? 1 : 0));

  return data.map(function (d, i) {
    return {
      x: i * hfactor + margin,
      //x: i * hfactor + marginLeft + marginRight,
      y: (max === min ? 1 : max - d) * vfactor + margin
    };
  });
};

exports["default"] = _default;
//# sourceMappingURL=dataToPoints.js.map