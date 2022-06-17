import {
  useRef,
  useCallback,
  getRefValue
} from '../../uiApi';

const useTitles = () => {
  const refTitles = useRef([0])
  , addTitleIndex = useCallback(index => {
    getRefValue(refTitles).push(index)
  }, [])
  , removeTitleIndex = useCallback(index => {
     refTitles.current = getRefValue(refTitles)
       .filter(v => v !== index)
  }, []);
  return [
    refTitles,
    addTitleIndex,
    removeTitleIndex
  ];
};

export default useTitles
