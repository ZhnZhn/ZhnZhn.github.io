import { useMemo } from '../uiApi';

import { useToggleFalse } from '../hooks/useBool';

import useToggleLabels from '../dialogs/hooks/useToggleLabels';
import useTitles from '../dialogs/hooks/useTitles';
import useRowToggle from './useRowToggle';

import D from '../dialogs/DialogCell';
import { PN_IS_SHOW_CHART } from './crIsId';

const useModalToggle = (
  configs
) => {
  const [
    isShowLabels,
    toggleLabels
  ] = useToggleLabels()
  , [
    isToggle,
    toggleInputs,
    hideInputs
  ] = useToggleFalse()
  , [
    isRow,
    toggleIsRow,
    toggleIsChart
  ] = useRowToggle(configs)
  , isShowChart = isRow[PN_IS_SHOW_CHART]
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
        isShowLabels={isShowLabels}
        isShowChart={isShowChart}
        isCh={configs.length > 2}
        onToggleLabels={toggleLabels}
        onToggle={toggleIsRow}
        onToggleChart={toggleIsChart}
        onCheckCaption={addTitleIndex}
        onUnCheckCaption={removeTitleIndex}
        onClose={hideInputs}
      />
    ), [isToggle, configs, isShowLabels, isShowChart])
    //toggleIsRow, checkCaptionBy, uncheckCaption, hideInputs
    /*eslint-enable react-hooks/exhaustive-deps */
    , refTitles
    , isShowLabels
    , isRow
    , toggleInputs
  ];
};

export default useModalToggle
