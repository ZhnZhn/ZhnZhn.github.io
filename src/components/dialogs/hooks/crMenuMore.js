import { CL_ROW_PANE_TOPIC } from '../../styleFn';
import { crItem } from '../../menuModelFn';

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
) => ({
  titleCl: CL_ROW_PANE_TOPIC,
  pageWidth: 185,
  maxPages: 1,
  p0: [
    _crItem('Toggle Toolbar', onToggleToolbar),
    _crItem('About Data Source', onAbout)
  ]
});

export default crMenuMore
