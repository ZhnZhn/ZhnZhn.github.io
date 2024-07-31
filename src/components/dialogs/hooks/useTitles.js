import {
  useRef,
  useMemo,
  getRefValue
} from '../../uiApi';

const useTitles = () => {
  const refTitles = useRef([0]);
  return [
    refTitles,
    ...useMemo(() => [
      index => {
        getRefValue(refTitles).push(index)
      },
      index => {
         refTitles.current = getRefValue(refTitles)
           .filter(v => v !== index)
      }
    ], [])    
  ];
};

export default useTitles
