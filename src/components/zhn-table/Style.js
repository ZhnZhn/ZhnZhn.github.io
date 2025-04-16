export { CL_BLACK, getColorBlack } from '../styleFn';

import {
  getColorBlack,
  crAbsoluteTopLeftStyle
} from '../styleFn';

export const TOKEN_NAN = '―'
export const CL_LINK = "native-link"
export const CL_GRID = "grid"

export const S_WRAPPER_DIV = { position: 'relative' }
export const S_TABLE = {
  width: '100%',
  borderCollapse: 'collapse',
  borderSpacing: 0
}
export const S_THEAD = { lineHeight: 1.8 }
export const S_TH = {
  //position: 'sticky',
  //top: 32,
  //zIndex: 2,
  borderTop: '3px solid transparent',
  borderBottom: '3px solid transparent',
  pointerEvents: 'auto',
  userSelect: 'none',
  cursor: 'pointer',
}
export const S_TH_MORE_SPAN = {
  position: 'relative',
  top: -2
}
export const S_TH_UP = { borderTop: '3px solid #f1d600' }
export const S_TH_DOWN = { borderBottom: '3px solid #f1d600' }

export const S_BT_SVG_MORE = {
  position: 'relative',
  top: 2,
  marginRight: 4
}
export const crSvgMoreStyle = () => ({
  fill: getColorBlack(),
  stroke: getColorBlack()
})
export const crNaNStyle = () => ({
  color: getColorBlack(),
  fontWeight: 'bold'
})

export const S_MENU_MORE = {
  ...crAbsoluteTopLeftStyle(36, 0),  
  zIndex: 1010,
  backgroundColor: 'inherit',
  padding: '4px 12px 6px',
  borderRadius: 5,
  boxShadow: 'rgba(0, 0, 0, 0.2) 0 0 0 5px'
}

export const S_TD = {
  padding: 6,
  verticalAlign: 'middle',
  lineHeight: 1.4,
  whiteSpace: 'nowrap',
  borderTop: 0
}

export const S_UP = {
  color: '#4caf50',
  fontWeight: 'bold'
}
export const S_DOWN = {
  color: '#f44336',
  fontWeight: 'bold'
}
