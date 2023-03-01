import { 
  useRef,
  useCallback
} from '../uiApi';

const _crItemRefPropName = index => 'chart' + index;
const _hmInstances = Object.create(null);

const useHmInstance = () => {
  const _refHm = useRef(_hmInstances)
  , _hmInstanceFn = useCallback((
      index,
      compInstance
    ) => _refHm.current[_crItemRefPropName(index)] = compInstance
  , []);
  return [
    _refHm,
    _hmInstanceFn
  ];
};

export default useHmInstance
