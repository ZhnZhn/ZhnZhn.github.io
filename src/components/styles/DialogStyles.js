import {
  crStyle2
} from '../zhn-utils/crStyle';

//Dialogs, DatesFragments
const S_ROW = {
  display: 'flex',
  alignItems: 'center',
  margin: 5
}
, S_ROW_SHORT = { margin: '5px 12px' }
, S_ROW_OC = {
  display: 'flex',
  alignItems: 'center',
  margin: 5
}
, S_ROW_OC_SHORT = { margin: '5px 12px' }
, S_LABEL = {
  color: '#1b75bb',
  display: 'inline-block',
  //verticalAlign: 'top',
  textAlign: 'right',
  width: 100,
  paddingRight: 6,
  fontSize: '16px',
  fontWeight: 'bold',
  userSelect: 'none'
}
, S_NONE = { display: 'none' };


//Dialogs, DatesFragments
export const S_DIALOG_CAPTION = {...S_LABEL}
export const S_DIALOG_ROW = {...S_ROW}

//[rowStyle, labelStyle]
export const crRowLabelStyle = (
  isShowLabels=true,
  captionStyle
) => [
  crStyle2(
    {...S_ROW},
    isShowLabels && S_ROW_SHORT
  ),
  crStyle2(
    {...S_LABEL},
    isShowLabels ? captionStyle : S_NONE
  )
];

//[rowStyle, labelStyle]
export const crRowOcSelectStyle = (
  isShowLabels=true,
  captionStyle
) => [
  crStyle2(
    {...S_ROW_OC},
    isShowLabels && S_ROW_OC_SHORT
  ),
  crStyle2(
    {...S_LABEL},
    isShowLabels ? captionStyle : S_NONE
  )
];

//ValidationMessagesFragment
export const S_VM_CONT = {
  color: '#f44336',
  paddingLeft: 10,
  paddingTop: 5
}
export const S_VM_MSG_NUMBER = {
  display: 'inline-block',
  width: 22,
  height: 22,
  marginRight: 5,
  textAlign: 'center',
  border: 'solid 2px #F44336',
  borderRadius: '50%'
}
export const S_VM_MSG = {
  //whiteSpace: 'pre',
  fontWeight: 'bold'
}
