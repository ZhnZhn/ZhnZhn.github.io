import General from './ConfigGeneral'
import HeaderBar from './ConfigHeaderBar'

import Element from './ConfigElement'

const router = {
  DF: General,
  /*
  ABOUT: General,
  DRAGGABLE_DIALOG: General,
  MODAL_DIALOG: General,
  BROWSER: General,
  CHART_CONTAINER: General,
  MODAL_PANE: General,
  SCROLL_PANE: General,
  */
  HEADER_BAR: HeaderBar,
  /*
    BrowserCaption, ButtonTab, MenuBadge, Tab,
    MenuTab, ModalPopup
  */
  ELEMENT: Element
};

export default router
