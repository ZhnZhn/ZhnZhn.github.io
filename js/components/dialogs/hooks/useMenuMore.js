"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _useToggle = require("../../hooks/useToggle");
var _useRefInit = _interopRequireDefault(require("../../hooks/useRefInit"));
var _crMenuMore = _interopRequireDefault(require("./crMenuMore"));
const useMenuMore = onAbout => {
  const [isToolbar, toggleToolbar] = (0, _useToggle.useToggle)(true);
  return [isToolbar, (0, _useRefInit.default)(() => (0, _crMenuMore.default)(toggleToolbar, onAbout))];
};
var _default = exports.default = useMenuMore;
//# sourceMappingURL=useMenuMore.js.map