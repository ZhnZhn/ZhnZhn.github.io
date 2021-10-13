import {useState, useRef, useCallback, useMemo} from 'react';

import D from '../dialogs/DialogCell';
import useToggle2 from './useToggle2';
import crIsId from './crIsId';

const useModalToggle = (configs) => {
  const [isToggle, _toggleInputs, _hideInputs] = useToggle2(false)
  , [isRow, setIsRow] = useState({ isShowChart: true, isShowDate: false})
  , {isShowChart, isShowDate} = isRow
  , _toggleIsRow = useCallback(propName => {
      setIsRow(is => {
        is[propName] = !is[propName]
        return {...is};
      })
  }, [])
  , _refTitles = useRef([])
  ,  _checkCaptionBy = useCallback(index => {
      _refTitles.current.push(index)
  }, [])
  , _uncheckCaption = useCallback(index => {
     _refTitles.current = _refTitles.current
        .filter(v => v !== index)
  }, [])

  return [
    /*eslint-disable react-hooks/exhaustive-deps */
    useMemo(() => (
      <D.ModalToggle
        isShow={isToggle}
        selectProps={configs}
        isShowChart={isShowChart}
        isShowDate={isShowDate}
        crIsId={crIsId}
        onToggle={_toggleIsRow}
        onCheckCaption={_checkCaptionBy}
        onUnCheckCaption={_uncheckCaption}
        onClose={_hideInputs}
      />
    ), [isToggle, configs, isShowChart, isShowDate])
    //_toggleIsRow, _checkCaptionBy, _uncheckCaption, _hideInputs
    /*eslint-enable react-hooks/exhaustive-deps */
    , _refTitles
    , isRow
    , setIsRow
    , _toggleInputs
  ];
};

export default useModalToggle
