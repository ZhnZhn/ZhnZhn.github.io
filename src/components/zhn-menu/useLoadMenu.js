import {
  useReducer,
  useEffect
} from '../uiApi';

const LOADING = 'a'
, LOADED = 'b'
, FAILED = 'c'
, UPDATE = 'd'
, _crAction = (type, menu) => ({ type, menu })
, initialState = {
  isLoaded: false,
  isLoading: false,
  menu: [],
};

const _reducer = (
  state,
  {type, menu}
) => {
  switch(type){
    case LOADING: return { ...state, isLoading: true };
    case LOADED: return {
      isLoading: false,
      isLoaded: true,
      menu
    };
    case FAILED: return { ...initialState };
    case UPDATE: return { ...state, menu };
    default: return state;
  }
};

const useLoadMenu = (
  isShow,
  onLoadMenu,
  useMsBrowserLoad,
  browserType
) => {
   const [{
     isLoading,
     isLoaded,
     menu
   }, dispatch] = useReducer(_reducer, initialState)
   , setLoading = () => dispatch(_crAction(LOADING))
   , updateMenu = menu => dispatch(_crAction(UPDATE, menu));

   useMsBrowserLoad(msBrowserLoad => {
     if (msBrowserLoad && msBrowserLoad.browserType === browserType) {
       const { menuItems } = msBrowserLoad;
       if (menuItems) {
         dispatch(_crAction(LOADED, menuItems))
       } else {
         dispatch(_crAction(FAILED))
       }
     }
   })

   /*eslint-disable react-hooks/exhaustive-deps */
   useEffect(()=>{
     if (!isLoaded && isShow) {
       onLoadMenu()
       setLoading()
     }
   }, [isLoaded, isShow])
   // onLoadMenu
   /*eslint-enable react-hooks/exhaustive-deps */

   return [
     isLoading,
     menu,
     updateMenu
   ];
};

export default useLoadMenu
