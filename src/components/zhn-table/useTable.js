import {
  useState,
  useCallback
} from '../uiApi';

import {
  fCompareBy2,
  fNegate,
  fCompareDescBy
} from './compareFactory';
import { TOKEN_NAN } from './Style';

const SORT_TO_UP = 'UP'
, SORT_TO_DOWN = 'DOWN';

export const useMenu = () => {
  const [
    isMenuMore,
    _setIsMenuMore
  ] = useState(!1)
  , toggleMenuMore = useCallback((evt) => {
       evt.stopPropagation()
       _setIsMenuMore(is => !is)
     }, [])
  return [isMenuMore, toggleMenuMore];
}

export const useColumn = (initialArr) => {
  const [arr, _setArr] = useState(initialArr || [])
  , hToggleBy = useCallback((index) => {
      _setArr(arr => {
        arr[index].isHide = !arr[index].isHide
        return [...arr];
      })
    }, [])
  return [arr, hToggleBy];
}

export const useSort = (initialRows) => {
  const [
    state,
    _setRows
  ] = useState({
    _rows: initialRows || [],
    _compByPrev: v => v
  })
  , sortByPn = useCallback((pn) => {
      _setRows(({
        _rows,
        _compByPrev,
        sortBy,
        sortTo
      }) => {
        const _compByPn = fCompareDescBy(TOKEN_NAN, pn)
        , [
          _compByNext,
          _sortToNext
        ] = pn === sortBy && sortTo === SORT_TO_UP
          ? [fNegate(_compByPn), SORT_TO_DOWN]
          : [_compByPn, SORT_TO_UP];
        return {
          _rows: _rows.sort(fCompareBy2(_compByNext, _compByPrev)),
          _compByPrev: _compByNext,
          sortTo: _sortToNext,
          sortBy: pn
        };
      })
    }, []);
    return [state, sortByPn];
}
