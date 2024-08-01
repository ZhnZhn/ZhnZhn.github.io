"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
const _isArr = Array.isArray;
const TABLE_ID = 'table';
const useSelectItem = setChartConfigFromItem => {
  const _refItems = (0, _uiApi.useRef)([]),
    _refFilterId = (0, _uiApi.useRef)(),
    [filters, setFilters] = (0, _uiApi.useState)(),
    _hSelect = (0, _uiApi.useCallback)((id, index, item) => {
      (0, _uiApi.getRefValue)(_refItems)[index] = item;
      if (item) {
        item.id = id;
        if (id === TABLE_ID) {
          setChartConfigFromItem(item);
        }
        setFilters(prevFilters => {
          if (_isArr(item.not)) {
            (0, _uiApi.setRefValue)(_refFilterId, id);
            return item.not;
          } else {
            if (_isArr(prevFilters)) {
              return prevFilters.length === 0 ? void 0 : id === (0, _uiApi.getRefValue)(_refFilterId) ? [] : prevFilters;
            } else {
              return prevFilters;
            }
          }
        });
      } else {
        setFilters();
      }
    }, [setChartConfigFromItem]);
  return [_refItems, _hSelect, filters];
};
var _default = exports.default = useSelectItem;
//# sourceMappingURL=useSelectItem.js.map