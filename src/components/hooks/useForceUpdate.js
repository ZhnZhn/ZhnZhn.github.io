import { useReducer } from 'react'

const useForceUpdate = () => useReducer( _ => Object.create(null));

export default useForceUpdate
