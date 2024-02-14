import { safeMap, memo } from '../uiApi';

import { GREEN_COLOR } from '../styles/Color';
import OpenClose2 from '../zhn/OpenClose2';

const S_LH_2 = {
  lineHeight: 2
}
, S_LIST_DIV = {
  ...S_LH_2,
  marginLeft: 8,
  paddingLeft: 12,
  borderLeftStyle: 'solid',
  borderLeftWidth: 2,
  borderLeftColor: 'inherit'
}
, MODEL_PROP_CAPTION = 'caption'
, MODEL_PROP_GROUPS = 'groups'
, MODEL_PROP_LISTS = 'lists'
, MODEL_PROP_ITEMS = 'items';

const _renderLevel3 = (
  items,
  captionProp,
  {
    itemClassName,
    ItemComp,
    onClickItem
  }
) => safeMap(items, (item, index) => (
  <ItemComp
     key={index}
     className={itemClassName}
     caption={item[captionProp]}
     item={item}
     onClickItem={onClickItem}
  />
))

const _renderLevel2 = (
  lists,
  captionProp,
  itemsProp,
  props
) => safeMap(lists, (list, index) => (
  <OpenClose2
     key={index}
     style={S_LIST_DIV}
     openColor={GREEN_COLOR}
     caption={list[captionProp]}
  >
   {_renderLevel3(
       list[itemsProp],
       captionProp,
       props
   )}
  </OpenClose2>
))


const _renderLevel1 = (props) => {
  const { model } = props
  , { meta } = model
  , { caption, level1, level2, level3 } = meta || {}
  , _captionProp = caption || MODEL_PROP_CAPTION
  , _groupsProp = level1 || MODEL_PROP_GROUPS
  , _listsProp = level2 || MODEL_PROP_LISTS
  , _itemsProp = level3 || MODEL_PROP_ITEMS
  , groups = model[_groupsProp];

  return safeMap(groups, (group, index) => (
    <OpenClose2
       key={index}
       style={S_LH_2}
       caption={group[_captionProp]}
    >
      {_renderLevel2(
          group[_listsProp],
          _captionProp,
          _itemsProp,
          props
      )}
    </OpenClose2>
  ))
};

const _areEqual = (
  prevProps,
  nextProps
) => prevProps.model === nextProps.model;
const MenuItems2 = memo(props => (
  <div>
     {_renderLevel1(props)}
  </div>
), _areEqual);

export default MenuItems2
