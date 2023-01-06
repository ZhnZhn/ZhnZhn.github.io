"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _ThemeContext = _interopRequireDefault(require("../hoc/ThemeContext"));
const useThemeSelect = onChangeTheme => {
  const theme = (0, _uiApi.useContext)(_ThemeContext.default);
  return (0, _uiApi.useCallback)(item => {
    const _themeName = (item || {}).value;
    if (_themeName && theme.getThemeName() !== _themeName) {
      theme.setThemeName(_themeName);
      onChangeTheme(_themeName);
    }
  }, [theme, onChangeTheme]);
};
var _default = useThemeSelect;
exports.default = _default;
//# sourceMappingURL=useThemeSelect.js.map