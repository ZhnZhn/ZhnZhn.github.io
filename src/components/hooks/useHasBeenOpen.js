import usePrevValue from './usePrevValue';

const useHasBeenOpen = (
  isShow
) => !usePrevValue(isShow) && isShow;

export default useHasBeenOpen
