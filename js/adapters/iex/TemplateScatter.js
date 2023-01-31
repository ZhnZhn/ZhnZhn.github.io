"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _pipe = _interopRequireDefault(require("../../utils/pipe"));
var _configBuilderFn = require("../../charts/configBuilderFn");
var _toFns = require("./toFns");
const TITLE = "Source: IEX Cloud";
const TemplateScatter = function (impl) {
  if (!(this instanceof TemplateScatter)) {
    return new TemplateScatter(impl);
  }
  this.impl = impl;
};
Object.assign(TemplateScatter.prototype, {
  crKey(option) {
    option.key = option.value;
    return option.value;
  },
  toConfig(json, option) {
    const {
      crSubtitle,
      crSeria
    } = this.impl;
    return {
      config: (0, _pipe.default)((0, _configBuilderFn.crAreaConfig)({
        isCrosshair: false
      }), (0, _configBuilderFn.fAddCaption)(TITLE, crSubtitle(option)), (0, _configBuilderFn.fSetSeriaBy)(0, crSeria(json, option)), (0, _configBuilderFn.fAdd)({
        zhConfig: (0, _toFns.crZhConfig)(option)
      }), _configBuilderFn.toConfig)
    };
  },
  toSeries(json, option, chart) {
    const {
        caption,
        color,
        crSeria
      } = this.impl,
      seria = crSeria(json, option);
    return (0, _toFns.crToSeria)({
      chart,
      seria,
      caption,
      color,
      option
    });
  }
});
var _default = TemplateScatter;
exports.default = _default;
//# sourceMappingURL=TemplateScatter.js.map