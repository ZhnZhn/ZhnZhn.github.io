import STYLE from '../../styles/DialogStyles';

//rowStyle, labelStyle
const crRowStyle = ({ isShowLabels, captionStyle }, isOc) => isOc
  ? STYLE.crRowOcSelectStyle(isShowLabels, captionStyle)
  : STYLE.crRowLabelStyle(isShowLabels, captionStyle);

export default crRowStyle
