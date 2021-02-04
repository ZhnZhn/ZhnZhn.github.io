
import { forwardRef, useImperativeHandle } from 'react'
import useLoadOptions  from './hooks/useLoadOptions'

import RowInputSelect from './rows/RowInputSelect'

const SelectWithLoad = forwardRef(({
  isShow=true,
  optionNames='Items',
  jsonProp='items',
  uri,
  ...restProps
}, ref) => {
  const [state, loadOptions] = useLoadOptions(isShow, uri, jsonProp)
  , { options } = state;

  useImperativeHandle(ref, () => ({
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
})

export default SelectWithLoad
