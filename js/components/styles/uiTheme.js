"use strict";

exports.__esModule = true;
exports.setUiTheme = exports.getColorBlack = void 0;
var _paletteFn = require("./paletteFn");
exports.getColorBlack = _paletteFn.getColorBlack;
var _ChartUiTheme = require("../../charts/ChartUiTheme");
let _uiThemeId;
const _setUiThemeImpl = uiThemeId => {
  _uiThemeId = (0, _paletteFn.crUiThemeId)(uiThemeId);
  (0, _paletteFn.setUiPalette)(_uiThemeId);
  (0, _ChartUiTheme.setChartTheme)(_uiThemeId !== _paletteFn.DF_THEME_ID);
};
_setUiThemeImpl(_paletteFn.DF_THEME_ID);
const setUiTheme = item => {
  const _nextUiThemeId = (item || {}).value;
  if (_uiThemeId !== _nextUiThemeId) {
    _setUiThemeImpl(_nextUiThemeId);
  }
};
exports.setUiTheme = setUiTheme;
//# sourceMappingURL=uiTheme.js.map