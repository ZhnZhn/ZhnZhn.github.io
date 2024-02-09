import usePrevValue from '../hooks/usePrevValue';

const useHasBeenOpen = (
  isShow
) => !usePrevValue(isShow) && isShow;

export default useHasBeenOpen
