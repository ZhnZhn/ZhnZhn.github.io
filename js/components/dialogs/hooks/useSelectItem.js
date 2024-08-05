"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
const TABLE_ID = 'table';
const _isRequireClearFilters = (id, tupleFilter) => id === tupleFilter[0] && (0, _uiApi.isArr)(tupleFilter[1]);
const useSelectItem = setChartConfigFromItem => {
  const _refItems = (0, _uiApi.useRef)([]),
    [tupleFilter, setFilters] = (0, _uiApi.useState)([]),
    _hSelect = (0, _uiApi.useCallback)((id, index, item) => {
      (0, _uiApi.getRefValue)(_refItems)[index] = item;
      if (item) {
        item.id = id;
        if (id === TABLE_ID) {
          setChartConfigFromItem(item);
        }
        setFilters(prevTupleFilter => (0, _uiApi.isArr)(item.not) ? [id, item.not] : _isRequireClearFilters(id, prevTupleFilter) ? [] : prevTupleFilter);
      } else {
        setFilters(prevTupleFilter => _isRequireClearFilters(id, prevTupleFilter) ? [] : prevTupleFilter);
      }
    }, [setChartConfigFromItem]);
  return [_refItems, _hSelect, tupleFilter];
};
var _default = exports.default = useSelectItem;
//# sourceMappingURL=useSelectItem.js.map