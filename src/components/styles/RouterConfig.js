import General from './ConfigGeneral'

import Element from './ConfigElement'
import RowCheckBox from './ConfigRowCheckBox'

const router = {
  DF: General,
  /*
  DRAGGABLE_DIALOG: General,
  MODAL_DIALOG: General,
  MODAL_PANE: General,
  CHART_CONTAINER: General,
  SCROLL_PANE: General,
  */


  ELEMENT: Element,
  /*
    BrowserCaption,
    ButtonTab,
    MenuBadge,
    Tab,
    ModalPopup
  */
  ROW_CHECKBOX: RowCheckBox
};

export default router
