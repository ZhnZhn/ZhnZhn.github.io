import useRefInit from '../../hooks/useRefInit';

const CLICK_TO_TOGGLE = 'Click to toggle';

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
  toggleDate,
  onClickInfo
}) => useRefInit(() => [
  toggleLabels
    ? _crToolbarItem('L', `${CLICK_TO_TOGGLE} input labels`, toggleLabels)
    : void 0,
  toggleOptions
    ? _crToolbarItem('O', `${CLICK_TO_TOGGLE} dialog options`, toggleOptions)
    : void 0,
  toggleDate
    ? _crToolbarItem('D', `${CLICK_TO_TOGGLE} date input`, toggleDate)
    : void 0,
  _crToolbarItem('A', 'About datasouce', onClickInfo)
].filter(Boolean))

export default useToolbar
