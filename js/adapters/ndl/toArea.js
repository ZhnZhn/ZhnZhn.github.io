"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _pipe = _interopRequireDefault(require("../../utils/pipe"));
var _configBuilderFn = require("../../charts/configBuilderFn");
var _NdlFn = require("./NdlFn");
var _crAreaData = _interopRequireDefault(require("./crAreaData"));
const _isArr = Array.isArray;
const _assign = Object.assign;
const toArea = (json, option) => {
  const {
      isDrawDeltaExtrems,
      isNotZoomToMinMax,
      dfR,
      title,
      subtitle
    } = option,
    {
      seria,
      minY,
      maxY
    } = (0, _crAreaData.default)(json, option);
  const config = _isArr(option.items) ? (0, _configBuilderFn.crSplineConfig)(seria, option) : (0, _configBuilderFn.crAreaConfig)();
  _assign(config.series[0], {
    data: seria
  });
  return {
    config: (0, _pipe.default)(config, (0, _configBuilderFn.fAddCaption)(title, subtitle), (0, _configBuilderFn.fAddMinMax)(seria, {
      minY,
      maxY,
      isNotZoomToMinMax,
      isDrawDeltaExtrems
    }), (0, _configBuilderFn.fAdd)({
      valueMoving: (0, _NdlFn.valueMoving)(seria, dfR),
      zhConfig: (0, _NdlFn.crZhConfig)(option)
    }), _configBuilderFn.toConfig)
  };
};
var _default = exports.default = toArea;
//# sourceMappingURL=toArea.js.map