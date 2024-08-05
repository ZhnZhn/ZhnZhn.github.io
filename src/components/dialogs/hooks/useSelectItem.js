import {
  isArr,
  useRef,
  useState,
  useCallback,
  getRefValue,
} from '../../uiApi';

const TABLE_ID = 'table';
const _isRequireClearFilters = (
  id,
  tupleFilter
) => id === tupleFilter[0] && isArr(tupleFilter[1]);

const useSelectItem = (
  setChartConfigFromItem
) => {
  const _refItems = useRef([])
  , [tupleFilter, setFilters] = useState([])

  , _hSelect = useCallback((id, index, item) => {
     getRefValue(_refItems)[index] = item
     if (item) {
       item.id = id
       if (id === TABLE_ID) {
         setChartConfigFromItem(item)
       }
       setFilters(prevTupleFilter => isArr(item.not)
         ? [id, item.not]
         : _isRequireClearFilters(id, prevTupleFilter)
           ? []
           : prevTupleFilter
       )
     } else {
       setFilters(prevTupleFilter => _isRequireClearFilters(id, prevTupleFilter)
         ? []
         : prevTupleFilter
       )
     }
  }, [setChartConfigFromItem]);

  return [
    _refItems,
    _hSelect,
    tupleFilter
  ];
};

export default useSelectItem
