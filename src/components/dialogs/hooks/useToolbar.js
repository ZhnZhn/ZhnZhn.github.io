import useRefInit from '../../hooks/useRefInit';

const _crToolbarItem = (
  caption,
  title,
  onClick
) => ({
  caption,
  title,
  onClick
});

const useToolbar = ({
  toggleLabels,
  onClickInfo
}) => useRefInit(() => {
  const _arr = [];
  if (toggleLabels) {
    _arr.push(_crToolbarItem(
       'L', 'Click to toggle input labels',
       toggleLabels
    ))
  }
  _arr.push(_crToolbarItem(
    'A', 'About Datasouce',
    onClickInfo
  ))
  return _arr;
})

export default useToolbar
