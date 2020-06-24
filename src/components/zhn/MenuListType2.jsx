import React, { Component } from 'react';

import C from '../styles/Color'
import OpenClose2 from './OpenClose2'

const LIST_OPEN_COLOR = C.GREEN;
const GROUP_OPEN_COLOR = C.TITLE;

const MODEL_PROP = {
  CAPTION : 'caption',
  GROUPS : 'groups',
  LISTS : 'lists',
  ITEMS : 'items'
}

const STYLE = {
  GROUP_DIV : {
    lineHeight : 2
  },
  LIST_DIV : {
    marginLeft : 8,
    paddingLeft : 12,
    lineHeight : 2,
    borderLeft : `2px solid ${GROUP_OPEN_COLOR}`
  },
  ITEM_DIV : {
    position: 'relative',
    paddingRight: 10,
    paddingTop : 5,
    paddingBottom: 5,
    lineHeight : 1.4
  },
  ITEM_SPAN : {
    display: 'inline-block',
    width: '100%',
    //maxWidth: '250px',
    //direction: "ltr",
    verticalAlign : 'middle',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
};


class MenuListType2 extends Component {
  state = {}

  shouldComponentUpdate(nextProps, nextState){
      if (this.state === nextState && this.props.model === nextProps.model){
        return false;
      }
      return true;
  }

 _renderLevel3 = (items=[], captionProp) => {
   const { itemClassName, ItemComp, onClickItem } = this.props;
   return items.map((item, index) => {
     const caption  = item[captionProp];
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

  _renderLevel2 = (lists=[], captionProp, itemsProp) => {
    return lists.map((list, index) => {
      const caption  = list[captionProp]
          , items = list[itemsProp];
      return (
        <OpenClose2
           key={index}
           style={STYLE.LIST_DIV}
           openColor={LIST_OPEN_COLOR}
           caption={caption}
        >
          {this._renderLevel3(items, captionProp)}
        </OpenClose2>
      );
    })
  }

  _renderLevel1 = (model={}) => {
     const { meta={} } = model
     , { caption, level1, level2, level3 } = meta
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
             style={STYLE.GROUP_DIV}
             openColor={GROUP_OPEN_COLOR}
             caption={caption}
          >
            {this._renderLevel2(lists, _captionProp, _itemsProp)}
          </OpenClose2>
        );
     })
  }

  render(){
    const { model } = this.props;
    return (
      <div>
         {this._renderLevel1(model)}
      </div>
    )
  }
}

export default MenuListType2
