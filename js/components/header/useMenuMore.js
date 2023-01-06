"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));
var _has = require("../has");
const IS_WIDE_WIDTH = (0, _has.isWideWidth)();
const useSettingsMenuMore = CL_ROW => {
  const [isShowLabels, toggleLabels] = (0, _useToggle.default)(IS_WIDE_WIDTH)
    /*eslint-disable react-hooks/exhaustive-deps */,
    menuModel = (0, _uiApi.useMemo)(() => ({
      titleCl: CL_ROW,
      pageWidth: 190,
      maxPages: 1,
      p0: [{
        cn: CL_ROW,
        onClick: toggleLabels,
        name: "Toggle Input Labels",
        isClose: true
      }]
    }), []);
  //toggleLabels, CL_ROW
  /*eslint-enable react-hooks/exhaustive-deps */
  return [isShowLabels, menuModel];
};
var _default = useSettingsMenuMore;
exports.default = _default;
//# sourceMappingURL=useMenuMore.js.map