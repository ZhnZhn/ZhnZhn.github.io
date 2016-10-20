import React from 'react';

import ComponentActions from '../../flux/actions/ComponentActions';

const STYLE = {
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

const Item = ({ caption, className, item, modalDialogType, children }) => {
  return (
    <div
      className={className}
      style={STYLE.ITEM_DIV}
      onClick={_handlerClickItem.bind(null, item, modalDialogType)}
    >
      <span style={STYLE.ITEM_SPAN}>
        {caption}
      </span>
      {children}
   </div>
  );
};

export default Item
