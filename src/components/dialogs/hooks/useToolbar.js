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
  toggleOptions,
  onClickInfo
}) => useRefInit(() => [
  toggleLabels
    ? _crToolbarItem('L', 'Click to toggle input labels', toggleLabels)
    : void 0,
  toggleOptions
    ? _crToolbarItem('O', 'Click to toggle dialog options', toggleOptions)
    : void 0,
  _crToolbarItem('A', 'About Datasouce', onClickInfo)
].filter(Boolean))

export default useToolbar
