import STYLE from '../../styles/DialogStyles';

const useRowStyle = ({
  isShowLabels, captionStyle
}, isOc) => {
  const _style = isOc
    ? STYLE.crRowOcSelectStyle(isShowLabels, captionStyle)
    : STYLE.crRowLabelStyle(isShowLabels, captionStyle);
  return {
    //rowStyle, labelStyle
    ..._style
  };
}

export default useRowStyle
