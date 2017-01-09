import React from 'react';

const STYLE = {
  ROOT_DIV: {
    margin: '5px',
    lineHeight: 2,
    fontWeight: 'bold'
  },
  LABEL_SPAN : {
    color: '#1B75BB',
    display: 'inline-block',
    textAlign: 'right',
    width: '100px',
    paddingRight: '5px',
    fontSize: '16px'
  }
}

const RowText = ({ caption, text, styleRoot }) => {
  return (
    <div style={Object.assign({}, STYLE.ROOT_DIV, styleRoot)}>
      <span style={STYLE.LABEL_SPAN}>
        {caption}
      </span>
      <span>
        {text}
      </span>
    </div>
  )
}

export default RowText
