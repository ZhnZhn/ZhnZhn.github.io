import { filterBoolean } from '../../../utils/arrFn';

import { useRefInit } from '../../hooks/useProperty';
import { crToolbarButton } from '../../zhn/ToolbarButtonCircle';

const CLICK_TO_TOGGLE = 'Click to toggle';
const _crDialogMenuTooltip = str => `Open dialog ${str} menu`

const useToolbar = ({
  toggleLabels,
  toggleInputs,
  toggleOptions,
  toggleDate,
  onAbout
}) => useRefInit(() => filterBoolean([
  toggleLabels
    ? crToolbarButton('L', `${CLICK_TO_TOGGLE} input labels`, toggleLabels)
    : void 0,
  toggleInputs
    ? crToolbarButton('I', _crDialogMenuTooltip('inputs'), toggleInputs)
    : void 0,
  toggleOptions
    ? crToolbarButton('O', _crDialogMenuTooltip('options'), toggleOptions)
    : void 0,
  toggleDate
    ? crToolbarButton('D', `${CLICK_TO_TOGGLE} date input`, toggleDate)
    : void 0,
  crToolbarButton('A', 'About data source', onAbout)
]))

export default useToolbar
