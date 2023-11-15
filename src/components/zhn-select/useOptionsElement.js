import {
  useRef,
  useMemo,
  getRefValue,
  setRefValue
} from '../uiApi'

const useOptionsElement = () => {
  const refHmItems = useRef()
  , refIndexActive = useRef()
  , [
    initHmItems,
    refOptionNode,
    getCurrentComp
  ] = useMemo(() => [
    () => {
      setRefValue(refIndexActive, 0)
      setRefValue(refHmItems, Object.create(null))
    },
    (n, index) => {
      const _hmItems = getRefValue(refHmItems);
      if (_hmItems) {
        _hmItems[`v${index}`] = n
      }
    },
    () => getRefValue(refHmItems)[`v${getRefValue(refIndexActive)}`]
  ], []);

  return [
    initHmItems,
    refOptionNode,
    getCurrentComp,
    refIndexActive
  ];
}

export default useOptionsElement
