
import useRowStyle from './useRowStyle'
import useRowCaption from './useRowCaption'

const useRow = ({
  isShowLabels,
  caption,
  captionStyle,
}, isOc) => ({
  //rowStyle, labelStyle,
  ...useRowStyle({ isShowLabels, captionStyle }, isOc),
  //caption
  ...useRowCaption(caption)
});

export default useRow
