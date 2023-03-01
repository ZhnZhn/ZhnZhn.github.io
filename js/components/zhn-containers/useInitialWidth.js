"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _has = require("../has");
const INITIAL_WIDTH = 635;
const MIN_WIDTH = 365;
const MIN_WIDTH_WITH_TAB_MINI = 470;
const _isContWidth = contWidth => contWidth && contWidth <= INITIAL_WIDTH;

/*eslint-disable react-hooks/exhaustive-deps */
const useInitialWidth = contWidth => (0, _uiApi.useMemo)(() => {
  const _initialWidthStyle = _isContWidth(contWidth) ? {
      width: contWidth
    } : (0, _has.initWidthStyle)(INITIAL_WIDTH, MIN_WIDTH),
    _INITIAL_WIDTH = _initialWidthStyle.width;
  return [_initialWidthStyle, _INITIAL_WIDTH, _INITIAL_WIDTH > MIN_WIDTH_WITH_TAB_MINI ? MIN_WIDTH_WITH_TAB_MINI : MIN_WIDTH];
}, []);
// contWidth
/*eslint-enable react-hooks/exhaustive-deps */
var _default = useInitialWidth;
exports.default = _default;
//# sourceMappingURL=useInitialWidth.js.map