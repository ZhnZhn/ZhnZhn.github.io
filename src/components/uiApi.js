export {
  createContext,
  memo,
  useContext,
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect
} from 'react';

export const getRefValue = ref => (ref || {}).current

export const setRefValue = (
  ref,
  value
) => {
  if (ref) {
    ref.current = value
  }
}
