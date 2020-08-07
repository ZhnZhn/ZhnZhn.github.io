import React from 'react'

import STYLE from '../../styles/DialogStyles'

const S = {
  ROOT_DIV: {
    margin: 5,
    marginLeft: 10,
    lineHeight: 2,
    fontWeight: 'bold'
  },
  LABEL_SPAN : {
    display: 'inline-block',
    color: '#1b75bb',
    width: 95,
    paddingRight: 5,
    textAlign: 'right',
    fontSize: '16px'
  },
  TEXT: {
    display: 'inline-block',
    maxWidth: 200,
    height: 32,
    verticalAlign: 'middle',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  NONE: {
    display: 'none'
  }
};

const Plain = ({ style, children }) => (
  <div style={{ ...STYLE.ROW, ...style }}>
    {children}
  </div>
);

const Text = ({
  isShowLabels=true,
  caption, text,
  styleRoot, styleCaption, styleText
}) => {
  if (!text) return null;
  const _styleCaption = isShowLabels ? void 0 : S.NONE;
  return (
    <div style={{ ...S.ROOT_DIV, ...styleRoot }}>
      <span style={{ ...S.LABEL_SPAN, ...styleCaption, ..._styleCaption }}>
        {caption}
      </span>
      <span style={{ ...S.TEXT, ...styleText }}>
        {text}
      </span>
    </div>
  );
};

export default { Plain, Text }
