import { useCallback } from '../uiApi';
import memoEqual from '../hoc/memoEqual'

import { transformFromLevel3 } from './TransformFn';
import InputSelect from './InputSelect';

const WrapperInputSearch = memoEqual(({
  style,
  placeholder='',
  data,
  ItemOptionComp,
  onSelect
}) => {
  const _hSelectItem = useCallback(item => {
     if (item){ onSelect(item) }
  }, [onSelect])
  , { meta } = data || {}
  , { caption } = meta || {}
  , _options = transformFromLevel3(data);

  return (
    <div style={style}>
      <InputSelect
         width="100%"         
         placeholder={placeholder}
         propCaption={caption}
         options={_options}
         ItemOptionComp={ItemOptionComp}
         onSelect={_hSelectItem}
      />
   </div>
  );
})

export default WrapperInputSearch
