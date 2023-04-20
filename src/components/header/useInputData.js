import {
  useRef,
  getRefValue
} from '../uiApi';
import getFnByPropName from '../../utils/getFnByPropName';

const useInputData = (data, id) => {
  const _refInput = useRef()
  , _setInput = getFnByPropName(data, id)
  , _dataValue = data[id]();
  return [
    _refInput,
    _dataValue,
    () => {
      const _inputInst = getRefValue(_refInput);
      if (_inputInst && !_setInput(_inputInst.getValue())) {
        _inputInst.showErrMsg()
      }
    },
    () => _setInput('')
  ];
}

export default useInputData
