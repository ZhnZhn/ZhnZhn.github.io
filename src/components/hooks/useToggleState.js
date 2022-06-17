import {
  useState,
  useCallback
} from '../uiApi';

const useToggleState = initialValue => {
  const [
    toggleState,
    setToggleState
  ] = useState(initialValue)
  , toggleByPropName = useCallback(
     propName => setToggleState(prevState => ({
       ...prevState,
       [propName]: !prevState[propName]
     }))
  , []);
  return [
    toggleState,
    toggleByPropName
  ];
};

export default useToggleState
