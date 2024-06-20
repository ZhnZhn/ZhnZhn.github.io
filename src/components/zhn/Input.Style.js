import { S_BORDER_RADIUS_2 } from '../styleFn'


export const S_ROW = {
  ...S_BORDER_RADIUS_2,
  position: 'relative',
  display: 'inline-block',
  width: 250,
  backgroundColor: '#e1e1cb'
}
export const S_INPUT = {
  background: 'transparent none repeat scroll 0 0',
  color: 'green',
  width: '100%',
  height: 30,
  paddingLeft: 10,
  border: 'medium none',
  outline: 'medium none',
  fontSize: '16px',
  fontWeight: 'bold'
}
export const S_BOX_SHADOW = {
  boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
}

const COLOR_VALID = '#1b75bb'
, COLOR_NOT_VALID = '#f44336';

export const getIsValidColor = isValid => isValid
 ? COLOR_VALID
 : COLOR_NOT_VALID

export const S_HR = {
  width: 'auto',
  //width: '90%'
  //width: '230px'
  margin: '0 10px 5px 10px',
  borderWidth: 'medium medium 1px',
  borderStyle: 'none none solid',
  borderColor: COLOR_VALID,
  borderImage: 'none',
}
export const S_ERR = {
  color: COLOR_NOT_VALID,
  fontWeight: 'bold'
}
export const S_ERR_MSG = {
  ...S_ERR,
  padding: '0 0 5px 10px',
  fontSize: '12px'
}
