"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const useMenuMore = () => {
  const refBtMenuMore = (0, _uiApi.useRef)(),
    [isMenuMore, setIsMenuMore] = (0, _uiApi.useState)(false),
    toggleMenuMore = (0, _uiApi.useCallback)(() => {
      setIsMenuMore(is => {
        if (is) {
          (0, _uiApi.focusRefElement)(refBtMenuMore);
        }
        return !is;
      });
    }, []);
  return [refBtMenuMore, isMenuMore, toggleMenuMore];
};
var _default = useMenuMore;
exports.default = _default;
//# sourceMappingURL=useMenuMore.js.map