import {
  useState,
  useEffect
} from '../uiApi';

import useHasBeenOpen from '../hooks/useHasBeenOpen';

const useLoadMenu = (
  isShow,
  onLoadMenu,
  useMsBrowserLoad,
  browserType
) => {
  const [state, setState] = useState([])
  , [isLoading, menu] = state
  , _isRequireLoadMenu = useHasBeenOpen(isShow)
      && !menu && !isLoading;

   useMsBrowserLoad(msBrowserLoad => {
     if (msBrowserLoad && msBrowserLoad.browserType === browserType) {
       const { menuItems } = msBrowserLoad;
       setState(menuItems
         ? [false, menuItems]
         : []
       )
     }
   })

   /*eslint-disable react-hooks/exhaustive-deps */
   useEffect(() => {
     if (_isRequireLoadMenu) {
       onLoadMenu()
       setState([true])
     }
   }, [_isRequireLoadMenu])
   // onLoadMenu
   /*eslint-enable react-hooks/exhaustive-deps */

   return state;
};

export default useLoadMenu
