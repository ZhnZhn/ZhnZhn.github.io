import { memo } from 'react';
import C from '../styles/Color'
import Comp from '../Comp'

const { OpenClose2 } = Comp;

const LIST_OPEN_COLOR = C.GREEN;

const MODEL_PROP = {
  CAPTION : 'caption',
  GROUPS : 'groups',
  LISTS : 'lists',
  ITEMS : 'items'
}

const S_GROUP_DIV = { lineHeight: 2 }
, S_LIST_DIV = {
  marginLeft: 8,
  paddingLeft: 12,
  lineHeight: 2,
  borderLeftStyle: 'solid',
  borderLeftWidth: 2,
  borderLeftColor: 'inherit',
};

const _renderLevel3 = (items, captionProp, props) => {
  const { itemClassName, ItemComp, onClickItem } = props;
  return (items || []).map((item, index) => {
    const caption = item[captionProp];
    return (
      <ItemComp
         key={index}
         className={itemClassName}
         caption={caption}
         item={item}
         onClickItem={onClickItem}
      />
    );
  })
}

const _renderLevel2 = (lists, captionProp, itemsProp, props) => {
  return (lists || []).map((list, index) => {
    const caption  = list[captionProp]
    , items = list[itemsProp];
    return (
      <OpenClose2
         key={index}
         style={S_LIST_DIV}
         openColor={LIST_OPEN_COLOR}
         caption={caption}
      >
        {_renderLevel3(items, captionProp, props)}
      </OpenClose2>
    );
  })
};

const _renderLevel1 = (props) => {
   const { model } = props
   , { meta } = model || {}
   , { caption, level1, level2, level3 } = meta || {}
   , _captionProp = caption || MODEL_PROP.CAPTION
   , _groupsProp = level1 || MODEL_PROP.GROUPS
   , _listsProp = level2 || MODEL_PROP.LISTS
   , _itemsProp = level3 || MODEL_PROP.ITEMS
   , groups = model[_groupsProp] || [];

   return groups.map((group, index) => {
      const caption  = group[_captionProp]
      , lists = group[_listsProp]
      return (
        <OpenClose2
           key={index}
           style={S_GROUP_DIV}
           caption={caption}
        >
          {_renderLevel2(lists, _captionProp, _itemsProp, props)}
        </OpenClose2>
      );
   })
};

const _areEqual = (prevProps, nextProps) =>
  prevProps.model === nextProps.model;
const MenuItems2 = memo(props => (
  <div>
     {_renderLevel1(props)}
  </div>
), _areEqual);

export default MenuItems2
