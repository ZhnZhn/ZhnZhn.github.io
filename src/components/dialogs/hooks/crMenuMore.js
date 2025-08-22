import {
  crItem,
  addToggleTo,
  crSliderMenu
} from '../../menuModelFn';

const crMenuMore = (
  onToggleToolbar,
  onAbout
) => crSliderMenu(
  185, {
    p0: [
      addToggleTo(crItem('Toolbar', onToggleToolbar, !1), !0),
      crItem('About Data Source', onAbout)
    ]
  }
);

export default crMenuMore
