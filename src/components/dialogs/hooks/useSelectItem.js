import {
  isArr,
  useRef,
  useState,
  useCallback,
  getRefValue,
} from '../../uiApi';

const _isRequireClearFilters = (
  id,
  tupleFilter
) => id === tupleFilter[0] && isArr(tupleFilter[1]);

const useSelectItem = (
  updateChartConfig
) => {
  const _refItems = useRef([])
  , [tupleFilter, setFilters] = useState([])

  , _hSelect = useCallback((id, index, item) => {
     getRefValue(_refItems)[index] = item
     if (item) {
       item.id = id
       updateChartConfig(item)
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
  }, [updateChartConfig]);

  return [
    _refItems,
    _hSelect,
    tupleFilter
  ];
};

export default useSelectItem
