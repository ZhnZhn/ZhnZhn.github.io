import { useImperativeHandle } from '../uiApi';
import useLoadOptions  from './hooks/useLoadOptions';

import RowInputSelect from './rows/RowInputSelect';

const SelectWithLoad = ({
  refEl,
  isShow=true,
  optionNames='Items',
  jsonProp='items',
  uri,
  ...restProps
}) => {
  const [
    state,
    loadOptions
  ] = useLoadOptions(isShow, uri, jsonProp)
  , { options } = state;

  useImperativeHandle(refEl, () => ({
    getOptions: () => options
  }), [options])

  return (
    <RowInputSelect
       isShow={isShow}
       {...restProps}
       {...state}
       onLoadOption={loadOptions}
    />
  );
};

export default SelectWithLoad
