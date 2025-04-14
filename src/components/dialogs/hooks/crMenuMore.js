import {
  CL_ROW_PANE_TOPIC
} from '../../styleFn';

import {
  crItem,
  addToggleTo,
  crSliderMenu
} from '../../menuModelFn';

const crMenuMore = (
  onToggleToolbar,
  onAbout
) => crSliderMenu(
  CL_ROW_PANE_TOPIC,
  185,
  1, {
    p0: [
      addToggleTo(crItem('Toolbar', onToggleToolbar, !1), !0),
      crItem('About Data Source', onAbout)
    ]
  }
);

export default crMenuMore
