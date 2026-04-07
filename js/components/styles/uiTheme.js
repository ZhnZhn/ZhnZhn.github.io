"use strict";

exports.__esModule = true;
exports.setUiTheme = void 0;
var _ChartUiTheme = require("../../charts/ChartUiTheme");
var _paletteFn = require("./paletteFn");
let _uiThemeId;
const _setUiThemeImpl = uiThemeId => {
  _uiThemeId = (0, _paletteFn.crUiThemeId)(uiThemeId);
  (0, _paletteFn.setUiPalette)(_uiThemeId);
  (0, _ChartUiTheme.setChartTheme)(_uiThemeId !== _paletteFn.DF_THEME_ID);
};
_setUiThemeImpl(_paletteFn.DF_THEME_ID);
const setUiTheme = item => {
  const _nextUiThemeId = (item || {}).v;
  if (_uiThemeId !== _nextUiThemeId) {
    _setUiThemeImpl(_nextUiThemeId);
  }
};
exports.setUiTheme = setUiTheme;
//# sourceMappingURL=uiTheme.js.map