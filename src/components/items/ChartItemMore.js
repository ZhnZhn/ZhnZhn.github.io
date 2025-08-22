import {
  crItem,
  addToggleTo,
  crSliderMenu
} from '../menuModelFn';

const crModel = (
  toggleToolbar,
  onToTop,
  hideCaption
) => crSliderMenu(
  150, {
  p0: [
    crItem('Move to Top', onToTop),
    addToggleTo(crItem('Caption', hideCaption), !0),
    addToggleTo(crItem('Toolbar', toggleToolbar, !1), !0)
  ]
 });

export default crModel
