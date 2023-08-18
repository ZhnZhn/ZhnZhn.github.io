import { crCn } from '../styleFn';

export const CL_TAB = 'tab'
, CL_TAB_SELECTED = `${CL_TAB}--selected`
, crTabCn = (isSelected) => crCn(
  CL_TAB,
  [isSelected, CL_TAB_SELECTED]
)
, crTabId = (
  tabPaneId,
  index
) => `tab-${tabPaneId}-${index}`
, crTabPanelId = (
  tabPaneId,
  index
) => `tabpanel-${tabPaneId}-${index}`
