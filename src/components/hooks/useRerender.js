import { useReducer } from '../uiApi';

const _reducer = () => ({});
const useRerender = () => useReducer(_reducer)[1];

export default useRerender
