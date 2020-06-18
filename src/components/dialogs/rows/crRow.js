
import crRowStyle from './crRowStyle'
import crRowCaption from './crRowCaption'

const crRow = ({
  isShowLabels,
  caption,
  captionStyle,
}, isOc) => ({
  //rowStyle, labelStyle,
  ...crRowStyle({ isShowLabels, captionStyle }, isOc),
  //caption
  ...crRowCaption(caption)
});

export default crRow
