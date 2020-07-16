import React, { useContext } from 'react'

import ThemeContext from '../hoc/ThemeContext'
import A from '../Comp'

const TH_ID = 'ELEMENT';

const CL_CAPTION = "not-selected text-clip bt-left";

const S = {
  ROOT: {
    position: 'relative',
    backgroundColor: '#1b2836',
    height: 'auto',
    width: '100%',
    paddingTop: 6,
    paddingLeft: 10,
    paddingRight: 42,
    paddingBottom: 6,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2
  },
  CAPTION: {
    width: '75%',
    paddingRight: 2,
    paddingTop: 4,
    paddingBottom: 2    
  },
  OPEN: {
    color: '#a487d4',
  },
  CLOSE: {
    color: 'gray'
  },
  SVG_CLOSE: {
    position: 'absolute',
    right: 0,
    top: 4
  }
};

const MAX_LENGTH = 45;
const _crTitle = (title, caption) => title
   || caption.length > MAX_LENGTH
 ? caption
 : void 0;

function ItemHeader({
  isOpen,
  rootStyle, captionStyle,
  caption='', title,
  children,
  onClick, onClose
}){
  const theme = useContext(ThemeContext)
  , TS = theme.getStyle(TH_ID)
  , _title = _crTitle(title, caption)
  , _styleCaption = isOpen
      ? S.OPEN
      : S.CLOSE;
  return (
    <div style={{
       ...S.ROOT,
       ...rootStyle,
       ...TS.ROOT
     }}>
      <button
         className={CL_CAPTION}
         style={{
           ...S.CAPTION,
           ...captionStyle,
           ..._styleCaption
         }}
         title={_title}
         onClick={onClick}
      >
         {caption}
      </button>
      {children}
      <A.SvgClose
         style={S.SVG_CLOSE}
         onClose={onClose}
       />
    </div>
  );
}

export default ItemHeader
