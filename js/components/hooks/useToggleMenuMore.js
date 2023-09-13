"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const useToggleMenuMore = refBtMore => {
  const [isMenuMore, setIsMenuMore] = (0, _uiApi.useState)(false)
    /*eslint-disable react-hooks/exhaustive-deps */,
    toggleIsMenuMore = (0, _uiApi.useCallback)(() => {
      setIsMenuMore(is => {
        if (is) {
          (0, _uiApi.focusRefElement)(refBtMore);
        }
        return !is;
      });
    }, []);
  // refBtMore
  /*eslint-enable react-hooks/exhaustive-deps */
  return [isMenuMore, toggleIsMenuMore];
};
var _default = useToggleMenuMore;
exports.default = _default;
//# sourceMappingURL=useToggleMenuMore.js.map