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
  onLoadMenu
) => {
   const [{
     isLoading,
     isLoaded,
     menu
   }, dispatch] = useReducer(_reducer, initialState)
   , setLoading = () => dispatch(_crAction(LOADING))
   , setFailed = () => dispatch(_crAction(FAILED))
   , setLoaded = menu => dispatch(_crAction(LOADED, menu))
   , updateMenu = menu => dispatch(_crAction(UPDATE, menu));

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
     setLoaded,
     setFailed,
     updateMenu
   ];
};

export default useLoadMenu
