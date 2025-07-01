import { useMemo } from '../uiApi';

import useDialogModalToggle from '../dialogs/hooks/useModalToggle';
import useTitles from '../dialogs/hooks/useTitles';
import useRowToggle from './useRowToggle';

import ModalToggle from '../dialogs/modals/ModalToggle';
import { PN_IS_SHOW_CHART } from './crIsId';

const useModalToggle = (
  configs
) => {
  const [
    isToggle,
    toggleInputs,
    hideInputs,
    isShowLabels,
    toggleLabels
  ] = useDialogModalToggle()
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
      <ModalToggle
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
