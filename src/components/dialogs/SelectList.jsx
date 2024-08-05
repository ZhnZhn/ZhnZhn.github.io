import { safeMap } from '../uiApi';
import D from './DialogCell';

const SelectList = ({
  isShow,
  isShowLabels,
  selectProps,
  isShowById,
  hSelect,
  tupleFilter
}) => {
  const [filterId, filters] = tupleFilter || [];
  return safeMap(selectProps, ({type, id, ...restItem}, index) => {
    const Comp = !type
      ? D.SelectWithLoad
      : type === "two"
      ? D.SelectOneTwo
      : null
    , _onSelect = item => hSelect(id, index, item);
    return (
      <D.ShowHide key={id} isShow={isShowById(id)}>
        {Comp && <Comp
          //uri, jsonProp, caption, isWithInput
          //uri, caption, oneCaption, twoCaption, isAddTitle
          {...restItem}
          isShow={isShow}
          isShowLabels={isShowLabels}
          onSelect={_onSelect}
          filters={id === filterId ? void 0 : filters}
        />}
      </D.ShowHide>
    );
  });
};

export default SelectList
