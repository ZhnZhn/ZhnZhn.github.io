const CL_ROW = 'row__pane-topic not-selected'

const _crItem = (
  name,
  onClick
) => ({
  name,
  onClick,
  cn: CL_ROW,
  isClose: true
});

const crMenuMore = (
  onToggleToolbar,
  onAbout
) => ({
  titleCl: CL_ROW,
  pageWidth: 175,
  maxPages: 1,
  p0: [
    _crItem('Toggle Toolbar', onToggleToolbar),
    _crItem('About Data Source', onAbout)
  ]
});

export default crMenuMore
