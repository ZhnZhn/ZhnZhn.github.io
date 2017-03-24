import React, { PropTypes } from 'react'

import SvgCheckBox from '../zhn/SvgCheckBox'

const STYLE = {
  ROOT : {
    paddingTop: '6px',
    paddingLeft : '16px'
  },
  CAPTION : {
    display: 'inline-block',
    //color: '#a487d4',
    color: 'black',
    paddingLeft: '12px',
    fontSize: '16px',
    fontWeight: 'bold'
  }
}

const RowCheckBox = ({ caption, onCheck, onUnCheck }) => (
  <div style={STYLE.ROOT}>
    <SvgCheckBox
      onCheck={onCheck}
      onUnCheck={onUnCheck}
    />
    <span style={STYLE.CAPTION}>
      {caption}
    </span>
  </div>
)

RowCheckBox.propTypes = {
  caption: PropTypes.string,
  onCheck: PropTypes.func,
  onUnCheck: PropTypes.func
}

export default RowCheckBox
