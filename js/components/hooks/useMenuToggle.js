"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const useMenuToggle = refBtMenuMore => {
  const [isShow, setIsShow] = (0, _uiApi.useState)(false)
    /*eslint-disable react-hooks/exhaustive-deps */,
    toggle = (0, _uiApi.useCallback)(() => {
      setIsShow(is => {
        if (is) {
          (0, _uiApi.focusRefElement)(refBtMenuMore);
        }
        return !is;
      });
    }, []);
  //refBtMenuMore
  /*eslint-enable react-hooks/exhaustive-deps */
  return [isShow, toggle];
};
var _default = exports.default = useMenuToggle;
//# sourceMappingURL=useMenuToggle.js.map