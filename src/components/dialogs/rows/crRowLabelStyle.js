import { S_NONE } from '../../styleFn';

const crRowLabelStyle = ({
  isShowLabels,
  captionStyle
}) => isShowLabels
  ? captionStyle
  : S_NONE;

export default crRowLabelStyle
