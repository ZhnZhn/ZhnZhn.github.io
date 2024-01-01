import { useMemo } from '../uiApi';

import { useToggleFalse } from '../hooks/useBool';
import useTitles from '../dialogs/hooks/useTitles';
import useRowToggle from './useRowToggle';

import D from '../dialogs/DialogCell';
import crIsId from './crIsId';

const useModalToggle = (
  configs
) => {
  const [
    isToggle,
    toggleInputs,
    hideInputs
  ] = useToggleFalse()
  , [
    isRow,
    toggleIsRow
  ] = useRowToggle(configs)
  , {
    isShowChart
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
        crIsId={crIsId}
        onToggle={toggleIsRow}
        onCheckCaption={addTitleIndex}
        onUnCheckCaption={removeTitleIndex}
        onClose={hideInputs}
      />
    ), [isToggle, configs, isShowChart])
    //toggleIsRow, checkCaptionBy, uncheckCaption, hideInputs
    /*eslint-enable react-hooks/exhaustive-deps */
    , refTitles
    , isRow
    , toggleInputs
  ];
};

export default useModalToggle
