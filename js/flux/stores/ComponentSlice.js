"use strict";

exports.__esModule = true;
exports.default = void 0;
var _browserLogic = require("./browserLogic");
var _chartCheckBoxLogic = require("./chartCheckBoxLogic");
var _contCheckBoxLogic = require("./contCheckBoxLogic");
const ComponentSlice = {
  onCloseChartContainer(chartType, browserType) {
    (0, _contCheckBoxLogic.uncheckActiveContCheckBox)(chartType);
    (0, _chartCheckBoxLogic.uncheckActiveCheckbox)(chartType);
    (0, _browserLogic.setMenuItemClose)(chartType, browserType);
  }
};
var _default = exports.default = ComponentSlice;
//# sourceMappingURL=ComponentSlice.js.map