import { CL_ROW_PANE_TOPIC } from '../../styleFn';
import {
  crItem,
  crSliderMenu
} from '../../menuModelFn';

const _crItem = (
  name,
  onClick
) => crItem(
  name,
  onClick,
  true,
  CL_ROW_PANE_TOPIC
);

const crMenuMore = (
  onToggleToolbar,
  onAbout
) => crSliderMenu(
  CL_ROW_PANE_TOPIC,
  185,
  1, {
    p0: [
      _crItem('Toggle Toolbar', onToggleToolbar),
      _crItem('About Data Source', onAbout)
    ]
  }
);

export default crMenuMore
