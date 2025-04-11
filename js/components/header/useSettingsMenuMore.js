"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useToggle = require("../hooks/useToggle");
var _has = require("../has");
var _menuModelFn = require("../menuModelFn");
const IS_WIDE_WIDTH = (0, _has.isWideWidth)();
const useSettingsMenuMore = CL_ROW => {
  const [isShowLabels, toggleLabels] = (0, _useToggle.useToggle)(IS_WIDE_WIDTH)
    /*eslint-disable react-hooks/exhaustive-deps */,
    menuModel = (0, _uiApi.useMemo)(() => (0, _menuModelFn.crSliderMenu)(CL_ROW, 190, 1, {
      p0: [(0, _menuModelFn.crItem)("Toggle Input Labels", toggleLabels, true, CL_ROW)]
    }), []);
  //toggleLabels, CL_ROW
  /*eslint-enable react-hooks/exhaustive-deps */
  return [isShowLabels, menuModel];
};
var _default = exports.default = useSettingsMenuMore;
//# sourceMappingURL=useSettingsMenuMore.js.map