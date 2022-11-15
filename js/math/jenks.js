"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _jenksBreaks = _interopRequireDefault(require("./jenksBreaks"));

var _jenksMatrices = _interopRequireDefault(require("./jenksMatrices"));

function jenks(data, nClasses) {
  if (nClasses > data.length) {
    return null;
  } // sort data in numerical order, since this is expected
  // by the matrices function


  data = data.slice().sort((a, b) => a - b); // get our basic matrices

  const matrices = (0, _jenksMatrices.default)(data, nClasses); // we only need lower class limits here

  const lowerClassLimits = matrices.lowerClassLimits; // extract nClasses out of the computed matrices

  return (0, _jenksBreaks.default)(data, lowerClassLimits, nClasses);
}

var _default = jenks;
exports.default = _default;
//# sourceMappingURL=jenks.js.map