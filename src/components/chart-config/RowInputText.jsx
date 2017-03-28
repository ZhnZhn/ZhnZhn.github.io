import React, { PropTypes } from 'react'

import InputText from '../zhn/InputText'

const STYLE = {
  ROOT : {
    paddingTop : '6px',
    paddingBottom : '6px',
    paddingRight : '6px'
  },
  CAPTION : {
    color: 'rgb(27, 117, 187)',
    display: 'inline-block',
    textAlign: 'right',
    width: '80px',
    paddingRight: '5px',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  INPUT_TEXT : {
    width: '250px',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  }
}

const RowInputText = ({
     styleRoot, styleCaption, styleInput,
     caption, initValue, onEnter
}) => (
  <div style={{...STYLE.ROOT, ...styleRoot}}>
    <label>
      <span style={{...STYLE.CAPTION, ...styleCaption}}>
        {caption}
      </span>
      <InputText
         style={{...STYLE.INPUT_TEXT, ...styleInput}}
         initValue={initValue}
         onEnter={onEnter}
      />
    </label>
  </div>
)

RowInputText.propTypes = {
  styleRoot: PropTypes.object,
  styleCaption: PropTypes.object,
  styleInput: PropTypes.object,
  caption: PropTypes.string,
  initValue: PropTypes.string,
  onEnter: PropTypes.func
}

export default RowInputText
