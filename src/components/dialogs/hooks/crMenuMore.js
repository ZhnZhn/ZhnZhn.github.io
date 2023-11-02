import { CL_ROW_PANE_TOPIC } from '../../styleFn';

const _crItem = (
  name,
  onClick
) => ({
  name,
  onClick,
  cn: CL_ROW_PANE_TOPIC,
  isClose: true
});

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
