import {
  useRef,
  useCallback,
  getRefValue
} from '../../uiApi';

const TABLE_ID = 'table';

const useSelectItem = (
  setChartConfigFromItem
) => {
  const _refItems = useRef([])
  , _hSelect = useCallback((id, index, item) => {
     getRefValue(_refItems)[index] = item
     if (item) {
       item.id = id
       if (id === TABLE_ID) {
         setChartConfigFromItem(item)
       }
     }
  }, [setChartConfigFromItem]);
  return [
    _refItems,
    _hSelect
  ];
};

export default useSelectItem
