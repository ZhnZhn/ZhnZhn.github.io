import { CL_ROW_PANE_TOPIC } from '../styleFn';
import {
  crItem,
  crSliderMenu
} from '../menuModelFn';

const crModel = (
  toggleToolbar,
  onToTop,
  hideCaption
) => crSliderMenu(
  CL_ROW_PANE_TOPIC,
  150,
  1, {
  p0: [
    crItem('Move to Top', onToTop),
    crItem('Hide Caption', hideCaption),
    crItem('Toggle Toolbar', toggleToolbar)
  ]
 });

export default crModel
