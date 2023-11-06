"use strict";

exports.__esModule = true;
exports.setUiTheme = exports.getColorBlack = void 0;
var _paletteFn = require("./paletteFn");
exports.getColorBlack = _paletteFn.getColorBlack;
var _ChartUiTheme = require("../../charts/ChartUiTheme");
const uiTheme = {
  uiThemeId: _paletteFn.DF_THEME_ID,
  _init() {
    this.setUiThemeId(_paletteFn.DF_THEME_ID);
  },
  getUiThemeId() {
    return this.uiThemeId;
  },
  setUiThemeId(uiThemeId) {
    this.uiThemeId = (0, _paletteFn.crUiThemeId)(uiThemeId);
    (0, _paletteFn.setUiPalette)(this.uiThemeId);
    (0, _ChartUiTheme.setChartTheme)(uiThemeId !== _paletteFn.DF_THEME_ID);
  }
};
uiTheme._init();
const setUiTheme = item => {
  const _uiThemeId = (item || {}).value;
  if (uiTheme.getUiThemeId() !== _uiThemeId) {
    uiTheme.setUiThemeId(_uiThemeId);
  }
};
exports.setUiTheme = setUiTheme;
//# sourceMappingURL=uiTheme.js.map