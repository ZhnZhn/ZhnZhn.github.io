import { useMemo } from 'react';

import D from '../dialogs/DialogCell';
import useTitles from '../dialogs/hooks/useTitles';
import useRowToggle from './useRowToggle';
import useToggle2 from './useToggle2';
import crIsId from './crIsId';

const useModalToggle = (
  configs
) => {
  const [
    isToggle,
    toggleInputs,
    hideInputs
  ] = useToggle2(false)
  , [
    isRow,
    setIsRow,
    toggleIsRow
  ] = useRowToggle(configs)
  , {
    isShowChart,
    isShowDate
  } = isRow
  , [
    refTitles,
    addTitleIndex,
    removeTitleIndex
  ] = useTitles();

  return [
    /*eslint-disable react-hooks/exhaustive-deps */
    useMemo(() => (
      <D.ModalToggle
        isShow={isToggle}
        selectProps={configs}
        isShowChart={isShowChart}
        isShowDate={isShowDate}
        crIsId={crIsId}
        onToggle={toggleIsRow}
        onCheckCaption={addTitleIndex}
        onUnCheckCaption={removeTitleIndex}
        onClose={hideInputs}
      />
    ), [isToggle, configs, isShowChart, isShowDate])
    //toggleIsRow, checkCaptionBy, uncheckCaption, hideInputs
    /*eslint-enable react-hooks/exhaustive-deps */
    , refTitles
    , isRow
    , setIsRow
    , toggleInputs
  ];
};

export default useModalToggle
