import {
  useRef,
  useState,
  useCallback,
  getRefValue,
  setRefValue
} from '../../uiApi';

const _isArr = Array.isArray;
const TABLE_ID = 'table';

const useSelectItem = (
  setChartConfigFromItem
) => {
  const _refItems = useRef([])

  , _refFilterId = useRef()
  , [filters, setFilters] = useState()

  , _hSelect = useCallback((id, index, item) => {
     getRefValue(_refItems)[index] = item
     if (item) {
       item.id = id
       if (id === TABLE_ID) {
         setChartConfigFromItem(item)
       }
       setFilters(prevFilters => {
         if (_isArr(item.not)) {
           setRefValue(_refFilterId, id)
           return item.not;
         } else {
           if (_isArr(prevFilters)) {
             return prevFilters.length === 0
               ? void 0
               : id === getRefValue(_refFilterId)
                  ? []
                  : prevFilters;
           } else {
             return prevFilters;
           }
         }
       })
     } else {
       setFilters()
     }
  }, [setChartConfigFromItem]);

  return [
    _refItems,
    _hSelect,
    filters
  ];
};

export default useSelectItem
