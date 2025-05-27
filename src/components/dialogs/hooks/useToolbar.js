import { filterBoolean } from '../../../utils/arrFn';

import { crBtAriaLabelProps } from '../../a11yFn';
import { useRefInit } from '../../hooks/useProperty';
import { crToolbarButton } from '../../zhn/ToolbarButtonCircle';

import {
  FlatButtonToggleOn,
  FlatButtonSettings,
  FlatButtonInfo
} from '../../zhn-m/FlatButtonSvg';

export const TITLE_TOGGLE = "Toggle input labels"

const LABEL_TOGGLE = "Open toggle inputs"
, LABEL_OPTIONS = "Open dialog options"
, LABEL_ABOUT = "Open about data source"
, CLICK_TO_TOGGLE = 'Click to toggle';

export const useToolbar = ({
  titleToggle,
  toggleInputs,
  toggleOptions,
  toggleDate,
  onAbout
}) => useRefInit(() => filterBoolean([
  toggleInputs
    ? <FlatButtonToggleOn
        key="t"
        {...crBtAriaLabelProps(titleToggle || LABEL_TOGGLE)}
        onClick={toggleInputs}
      />
    : void 0,
  toggleOptions
    ? <FlatButtonSettings
        key="o"
        {...crBtAriaLabelProps(LABEL_OPTIONS)}
        timeout={0}
        onClick={toggleOptions}
      />
    : void 0,
  toggleDate
    ? crToolbarButton('D', `${CLICK_TO_TOGGLE} date input`, toggleDate)
    : void 0,
  <FlatButtonInfo
     key="a"
     {...crBtAriaLabelProps(LABEL_ABOUT)}
     onClick={onAbout}
  />
]))
