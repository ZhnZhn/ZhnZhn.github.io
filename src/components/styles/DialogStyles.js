import {
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
    void 0,
    isShowLabels ? captionStyle : S_NONE
  )
];
