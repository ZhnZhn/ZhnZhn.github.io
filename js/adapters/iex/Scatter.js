'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ConfigBuilder = require('../../charts/ConfigBuilder');

var _ConfigBuilder2 = _interopRequireDefault(_ConfigBuilder);

var _toFns = require('./toFns');

var _toFns2 = _interopRequireDefault(_toFns);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TITLE = "Source: IEX Platform";

var Scatter = function Scatter(impl) {
  if (!(this instanceof Scatter)) {
    return new Scatter(impl);
  }
  this.impl = impl;
};

Scatter.prototype = Object.assign(Scatter.prototype, {
  toConfig: function toConfig(json, option) {
    var _impl = this.impl,
        crSubtitle = _impl.crSubtitle,
        crSeria = _impl.crSeria;

    return (0, _ConfigBuilder2.default)().areaConfig({ spacingTop: 25, isCrosshair: false }).addCaption(TITLE, crSubtitle(option)).addSeriaTo(0, crSeria(json, option)).add({ zhConfig: _toFns2.default.crZhConfig(option) }).toConfig();
  },
  toSeries: function toSeries(json, option, chart) {
    var _impl2 = this.impl,
        caption = _impl2.caption,
        color = _impl2.color,
        crSeria = _impl2.crSeria,
        seria = crSeria(json, option);

    return _toFns2.default.crToSeria(chart, seria, caption, color);
  }
});

exports.default = Scatter;
//# sourceMappingURL=Scatter.js.map