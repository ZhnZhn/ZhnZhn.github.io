import {
  useRef
} from '../uiApi';

import useMenuToggle from './useMenuToggle';

const useMenuMore = () => {
  const refBtMenuMore = useRef()
  , [
    isMenuMore,
    toggleMenuMore
  ] = useMenuToggle(refBtMenuMore);

  return [
    refBtMenuMore,
    isMenuMore,
    toggleMenuMore
  ];
}

export default useMenuMore
