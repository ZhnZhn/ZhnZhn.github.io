"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
const TABLE_ID = 'table';
const useSelectItem = setChartConfigFromItem => {
  const _refItems = (0, _uiApi.useRef)([]),
    _hSelect = (0, _uiApi.useCallback)((id, index, item) => {
      (0, _uiApi.getRefValue)(_refItems)[index] = item;
      if (item) {
        item.id = id;
        if (id === TABLE_ID) {
          setChartConfigFromItem(item);
        }
      }
    }, [setChartConfigFromItem]);
  return [_refItems, _hSelect];
};
var _default = exports.default = useSelectItem;
//# sourceMappingURL=useSelectItem.js.map