import { useState, useCallback } from 'react';

import {
  factoryCompareBy,
  factoryOpCompareBy
} from './compareFactory';
import { TOKEN_NAN } from './Style';

const SORT_TO_UP = 'UP'
, SORT_TO_DOWN = 'DOWN';

export const useMenu = () => {
  const [isMenuMore, _setIsMenuMore] = useState(false)
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
  const [state, _setRows] = useState({_rows: initialRows || []})
  , sortByPn = useCallback((pn) => {
      _setRows(({ _rows, sortBy, sortTo }) => {
        const _compBy = factoryCompareBy(TOKEN_NAN, pn)
        if (pn === sortBy && sortTo === SORT_TO_UP) {
          _rows = _rows.sort(factoryOpCompareBy(pn, _compBy))
          sortTo = SORT_TO_DOWN
        } else {
          _rows = _rows.sort(_compBy)
          sortTo = SORT_TO_UP
        }
        return { _rows, sortTo, sortBy: pn };
      })
    }, []);
    return [state, sortByPn];
}
