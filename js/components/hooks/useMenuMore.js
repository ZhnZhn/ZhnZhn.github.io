"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useMenuToggle = _interopRequireDefault(require("./useMenuToggle"));
const useMenuMore = () => {
  const refBtMenuMore = (0, _uiApi.useRef)(),
    [isMenuMore, toggleMenuMore] = (0, _useMenuToggle.default)(refBtMenuMore);
  return [refBtMenuMore, isMenuMore, toggleMenuMore];
};
var _default = exports.default = useMenuMore;
//# sourceMappingURL=useMenuMore.js.map