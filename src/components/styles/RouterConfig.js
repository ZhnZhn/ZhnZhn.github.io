import General from './ConfigGeneral'
import HeaderBar from './ConfigHeaderBar'

import Element from './ConfigElement'
import RowCheckBox from './ConfigRowCheckBox'
import Logos from './ConfigLogos'

const router = {
  DF: General,
  /*
  ABOUT: General,
  BROWSER: General,
  DRAGGABLE_DIALOG: General,
  MODAL_DIALOG: General,
  MODAL_PANE: General,
  CHART_CONTAINER: General,
  SCROLL_PANE: General,
  */
  HEADER_BAR: HeaderBar,
  /*
    BrowserCaption, ButtonTab, MenuBadge, Tab,
    ModalPopup
  */

  ELEMENT: Element,
  ROW_CHECKBOX: RowCheckBox,
  LOGOS: Logos
};

export default router
