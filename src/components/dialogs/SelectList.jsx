import { safeMap } from '../uiApi';

import ShowHide from '../zhn/ShowHide';
import SelectWithLoad from './SelectWithLoad';
import SelectOneTwo from './rows/SelectOneTwo';

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
      ? SelectWithLoad
      : type === "two"
      ? SelectOneTwo
      : null
    , _onSelect = item => hSelect(id, index, item);
    return (
      <ShowHide key={id} isShow={isShowById(id)}>
        {Comp && <Comp
          //uri, jsonProp, caption, isWithInput
          //uri, caption, oneCaption, twoCaption, isAddTitle
          {...restItem}
          isShow={isShow}
          isShowLabels={isShowLabels}
          onSelect={_onSelect}
          filters={id === filterId ? void 0 : filters}
        />}
      </ShowHide>
    );
  });
};

export default SelectList
