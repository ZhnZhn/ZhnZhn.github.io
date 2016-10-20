import React from 'react';

import OpenClose2 from './OpenClose2'

import ComponentActions from '../../flux/actions/ComponentActions';


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
    marginLeft : '8px',
    paddingLeft : '12px',
    borderLeft : '1px solid yellow',
    lineHeight : 2
  },
  LIST_DIV_NOT_SELECTED : {
    borderBottom : '1px solid rgba(128, 192, 64, 0.6)',
    marginRight : '10px'
  },
  ITEM_DIV : {
    position: 'relative',
    paddingRight: '10px',
    lineHeight : 1.4,
    paddingTop : '5px',
    paddingBottom: '5px'
  },
  ITEM_SPAN : {
    display: 'inline-block',
    verticalAlign : 'middle',
    width: '100%',
    //maxWidth: '250px',
    //direction: "ltr",
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}

const _handlerClickItem = (item, modalDialogType) => {
  ComponentActions.showModalDialog(modalDialogType, item);
}

const Item = ({ caption, className, item, modalDialogType }) => {
  return (
    <div
      className={className}
      style={STYLE.ITEM_DIV}
      onClick={_handlerClickItem.bind(null, item, modalDialogType)}
    >
      <span style={STYLE.ITEM_SPAN}>
        {caption}
      </span>
   </div>
  );
}


const MenuListType2 = React.createClass({
  getInitialState(){
    return {}
  },

  shouldComponentUpdate(nextProps, nextState){
      if (this.state === nextState && this.props.model === nextProps.model){
        return false;
      }
      return true;
  },

 _renderLevel3(items=[], captionProp){
   const { modalDialogType, ItemComp } = this.props;
   return items.map((item, index) => {
     const caption  = item[captionProp]
         , _className = (index % 2)
              ? 'row__topic__even not-selected'
              : 'row__topic__odd not-selected'
     return (
       <ItemComp
          key={index}
          className={_className}
          caption={caption}
          item={item}
          modalDialogType={modalDialogType}
       />
     );

    /*
     return (
         <Item
           key={index}
           className={_className}
           caption={caption}
           item={item}
           modalDialogType={modalDialogType}
         />
     );
    */
   })
 },

  _renderLevel2(lists=[], captionProp, itemsProp){
    return lists.map((list, index) => {
      const  caption  = list[captionProp]
      , items = list[itemsProp]
      return (
        <OpenClose2
           key={index}
           fillOpen={'#80c040'}
           style={STYLE.LIST_DIV}
           styleNotSelected={STYLE.LIST_DIV_NOT_SELECTED}
           isClose={true}
           caption={caption}
        >
          {this._renderLevel3(items, captionProp)}
        </OpenClose2>
      );
    })
  },

  _renderLevel1(model={}){

     const { meta={} } = model
     , { caption, level1, level2, level3 } = meta
     , _captionProp = caption || MODEL_PROP.CAPTION
     , _groupsProp = level1 || MODEL_PROP.GROUPS
     , _listsProp = level2 || MODEL_PROP.LISTS
     , _itemsProp = level3 || MODEL_PROP.ITEMS
     , groups = model[_groupsProp] || []

     return groups.map((group, index) => {
        const caption  = group[_captionProp]
        , lists = group[_listsProp]
        return (
          <OpenClose2
             key={index}
             style={STYLE.GROUP_DIV}
             isClose={true}
             caption={caption}
          >
            {this._renderLevel2(lists, _captionProp, _itemsProp)}
          </OpenClose2>
        );
     })
  },

  render(){
    const { model } = this.props
    return (
      <div>
         {this._renderLevel1(model)}
      </div>
    )
  }
});

export default MenuListType2
