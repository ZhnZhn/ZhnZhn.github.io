"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _toFns = _interopRequireDefault(require("./toFns"));

var TITLE = "Source: IEX Platform";

var Scatter = function Scatter(impl) {
  if (!(this instanceof Scatter)) {
    return new Scatter(impl);
  }

  this.impl = impl;
};

Scatter.prototype = Object.assign(Scatter.prototype, {
  toConfig: function toConfig(json, option) {
    var _this$impl = this.impl,
        crSubtitle = _this$impl.crSubtitle,
        crSeria = _this$impl.crSeria;
    return (0, _ConfigBuilder["default"])().areaConfig({
      spacingTop: 25,
      isCrosshair: false
    }).addCaption(TITLE, crSubtitle(option)).addSeriaTo(0, crSeria(json, option)).add({
      zhConfig: _toFns["default"].crZhConfig(option)
    }).toConfig();
  },
  toSeries: function toSeries(json, option, chart) {
    var _this$impl2 = this.impl,
        caption = _this$impl2.caption,
        color = _this$impl2.color,
        crSeria = _this$impl2.crSeria,
        seria = crSeria(json, option);
    return _toFns["default"].crToSeria({
      chart: chart,
      seria: seria,
      caption: caption,
      color: color,
      option: option
    });
  }
});
var _default = Scatter;
exports["default"] = _default;
//# sourceMappingURL=Scatter.js.map