import { safeMap } from '../uiApi';
import D from './DialogCell';

const SelectList = ({
  isShow,
  isShowLabels,
  selectProps,
  isShowById,
  hSelect
}) => safeMap(selectProps, ({id, ...restItem}, index) => (
  <D.ShowHide key={id} isShow={isShowById(id)}>
    <D.SelectWithLoad
      //uri, jsonProp, caption, isWithInput
      {...restItem}
      isShow={isShow}
      isShowLabels={isShowLabels}
      onSelect={item => hSelect(id, index, item)}
    />
  </D.ShowHide>
));

export default SelectList
