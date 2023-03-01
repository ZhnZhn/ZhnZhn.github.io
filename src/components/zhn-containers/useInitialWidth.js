import { useMemo } from '../uiApi';
import { initWidthStyle } from '../has';

const INITIAL_WIDTH = 635;
const MIN_WIDTH = 365;
const MIN_WIDTH_WITH_TAB_MINI = 470;

const _isContWidth = contWidth => contWidth
 && contWidth <= INITIAL_WIDTH;

/*eslint-disable react-hooks/exhaustive-deps */
const useInitialWidth = (
  contWidth
) => useMemo(() => {
  const _initialWidthStyle = _isContWidth(contWidth)
    ? { width: contWidth }
    : initWidthStyle(INITIAL_WIDTH, MIN_WIDTH)
  , _INITIAL_WIDTH = _initialWidthStyle.width;
  return [
    _initialWidthStyle,
    _INITIAL_WIDTH,
    _INITIAL_WIDTH > MIN_WIDTH_WITH_TAB_MINI
      ? MIN_WIDTH_WITH_TAB_MINI
      : MIN_WIDTH
  ];
}, [])
// contWidth
/*eslint-enable react-hooks/exhaustive-deps */

export default useInitialWidth
