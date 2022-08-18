import {
  useReducer,
  useRef,
  getRefValue
} from '../uiApi';

const _initState = initialValue => !!initialValue
, _reducer = (state, boolValue) => boolValue;

const useBool = (
  initialValue
) => {
  const [is, setIs] = useReducer(
    _reducer,
    initialValue,
    _initState
  )
  , _refSetTrue = useRef(() => setIs(true))
  , _refSetFalse = useRef(() => setIs(false));
  return [
    is,
    getRefValue(_refSetTrue),
    getRefValue(_refSetFalse)
  ];
};

export default useBool
