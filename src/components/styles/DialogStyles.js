import {
  S_INLINE,
  S_NONE,
  crStyle2
} from '../styleFn';

//Dialogs, DatesFragments
const S_ROW = {
  display: 'flex',
  alignItems: 'center',
  margin: 5
}
, S_ROW_SHORT = {
  margin: '5px 12px'
}
, S_LABEL = {
  ...S_INLINE,
  width: 100,
  paddingRight: 6,
  textAlign: 'right'
};

//Dialogs, DatesFragments
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

//ValidationMessagesFragment
export const S_VM_CONT = {
  color: '#f44336',
  paddingLeft: 10,
  paddingTop: 5
}
export const S_VM_MSG_NUMBER = {
  ...S_INLINE,
  width: 22,
  height: 22,
  marginRight: 5,
  textAlign: 'center',
  border: 'solid 2px #f44336',
  borderRadius: '50%'
}
export const S_VM_MSG = {
  //whiteSpace: 'pre',
  fontWeight: 'bold'
}
