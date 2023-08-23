"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const _getFocusRefImpl = (refFirst, refLast, lastIndex, index) => index === 0 ? refFirst : index === lastIndex ? refLast : void 0;
const _isArr = Array.isArray;
const useItemsFocusTrap = (items, ref1, ref2) => {
  const _ref1 = (0, _uiApi.useRef)(),
    _ref2 = (0, _uiApi.useRef)(),
    _refFirstItem = ref1 || _ref1,
    _refLastItem = ref2 || _ref2,
    _getFocusRef = (0, _uiApi.useMemo)(() => _isArr(items) ? index => {
      const _lastIndex = items.length - 1;
      return _getFocusRefImpl(_refFirstItem, _refLastItem, _lastIndex, index);
    } : void 0, [items, _refFirstItem, _refLastItem]);
  return [_getFocusRef, _refLastItem, _refFirstItem];
};
var _default = useItemsFocusTrap;
exports.default = _default;
//# sourceMappingURL=useItemsFocusTrap.js.map