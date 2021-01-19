import { useReducer } from 'react'

const _reducer = () => ({});
const useForceUpdate = () => useReducer(_reducer)[1];

export default useForceUpdate
