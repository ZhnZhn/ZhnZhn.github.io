import React, { PropTypes } from 'react'

const STYLE = {
  ROOT : {
    position : 'absolute',
    zIndex : 10,
    top: '25px',
    left: '0px',

    width: '150px',

    backgroundColor: 'rgb(77, 77, 77)',
    border : '2px solid rgb(35, 47, 59)',
    borderRadius : '5px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 5px',
    padding : '10px',
    paddingTop : '5px',
    paddingBottom : '12px',
    cursor: 'auto'
  }
}

const SubPanel = ({ style, children }) => (
  <div style={{...STYLE.ROOT, ...style }}>
    {children}
  </div>
)

SubPanel.propTypes = {
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default SubPanel
