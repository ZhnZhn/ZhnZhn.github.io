import { useState, useCallback } from 'react';

import F from './compFactory';
import S from './Style';

const C = {
  UP: 'UP',
  DOWN: 'DOWN'    
};

const useTable = {
  useMenu: () => {
    const [isMenuMore, _setIsMenuMore] = useState(false)
    , toggleMenuMore = useCallback((evt) => {
         evt.stopPropagation()
         _setIsMenuMore(is => !is)
       }, [])
    return [isMenuMore, toggleMenuMore];
  },

  useColumn: (initialArr) => {
    const [arr, _setArr] = useState(initialArr || [])
    , hToggleBy = useCallback((index) => {
        _setArr(arr => {
          arr[index].isHide = !arr[index].isHide
          return [...arr];
        })
      }, [])
    return [arr, hToggleBy];
  },

  useSort: (initialRows) => {
    const [state, _setRows] = useState({_rows: initialRows || []})
    , sortByPn = useCallback((pn) => {
        _setRows(({ _rows, sortBy, sortTo }) => {
          const _compBy = F.compBy(S.TOKEN_NAN, pn)
          if (pn === sortBy && sortTo === C.UP) {
            _rows = _rows.sort(F.opCompBy(pn, _compBy))
            sortTo = C.DOWN
          } else {
            _rows = _rows.sort(_compBy)
            sortTo = C.UP
          }
          return { _rows, sortTo, sortBy: pn };
        })
      }, []);
      return [state, sortByPn];
  }
};

export default useTable
