import { useState, useCallback, useEffect } from 'react';

import crIsId from './crIsId';

const useRowTogle = configs => {
  const [isRow, setIsRow] = useState({ isShowChart: true, isShowDate: false})
  , _toggleIsRow = useCallback(propName => {
      setIsRow(is => {
        is[propName] = !is[propName]
        return {...is};
      })
  }, []);

  useEffect(() => {
    const _dfIs = {};
    let _isDfItem = false;
    configs.forEach(config => {
      if (config.dfItem) {
        _isDfItem = true
        _dfIs[crIsId(config.id)] = true
      }
    })
    setIsRow(is => _isDfItem
      ? ({...is, ..._dfIs})
      : is
    )
  }, [configs])

  return [isRow, setIsRow, _toggleIsRow];
};

export default useRowTogle
