import {
  crRowOcSelectStyle,
  crRowLabelStyle
} from '../../styles/DialogStyles';

//rowStyle, labelStyle
const crRowStyle = ({
  isShowLabels,
  captionStyle
}, isOc) => isOc
  ? crRowOcSelectStyle(isShowLabels, captionStyle)
  : crRowLabelStyle(isShowLabels, captionStyle);

export default crRowStyle
