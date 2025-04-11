import { useToggle } from '../../hooks/useToggle';
import useRefInit from '../../hooks/useRefInit';

import crMenuMore from './crMenuMore';

const useMenuMore = (
  onAbout
) => {
  const [
    isToolbar,
    toggleToolbar
  ] = useToggle(true)
  return [
    isToolbar,
    useRefInit(() => crMenuMore(
      toggleToolbar,
      onAbout
   ))
 ];
}

export default useMenuMore
