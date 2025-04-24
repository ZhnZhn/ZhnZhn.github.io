"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));
var _jsxRuntime = require("react/jsx-runtime");
/*eslint-disable react-hooks/exhaustive-deps */const useCommandButtons = (getConfigs, deps) => (0, _uiApi.useMemo)(() => getConfigs().map(config => /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
  caption: config[0],
  onClick: config[1]
}, config[0])), deps || []);
// getConfigs
/*eslint-enable react-hooks/exhaustive-deps */
var _default = exports.default = useCommandButtons;
//# sourceMappingURL=useCommandButtons.js.map