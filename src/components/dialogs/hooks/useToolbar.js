import useRefInit from '../../hooks/useRefInit';
import crToolbarItem from './crToolbarItem';

const CLICK_TO_TOGGLE = 'Click to toggle';

const useToolbar = ({
  toggleLabels,
  toggleOptions,
  toggleDate,
  onClickInfo
}) => useRefInit(() => [
  toggleLabels
    ? crToolbarItem('L', `${CLICK_TO_TOGGLE} input labels`, toggleLabels)
    : void 0,
  toggleOptions
    ? crToolbarItem('O', `${CLICK_TO_TOGGLE} dialog options`, toggleOptions)
    : void 0,
  toggleDate
    ? crToolbarItem('D', `${CLICK_TO_TOGGLE} date input`, toggleDate)
    : void 0,
  crToolbarItem('A', 'About datasouce', onClickInfo)
].filter(Boolean))

export default useToolbar
