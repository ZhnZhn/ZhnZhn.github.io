import { crRowLabelStyle } from '../../styles/DialogStyles';
import crRowCaption from './crRowCaption';

// [rowStyle, labelStyle, inputProps, caption, title]
const crRowProps = ({
  isShowLabels,
  captionStyle,
  caption='',
  width=250,
  ...restRowProps
}) => [
   ...crRowLabelStyle(isShowLabels, captionStyle),
   {
     width,
     ...restRowProps,
     optionName: isShowLabels ? '' : caption
   },
   ...crRowCaption(caption)
];

export default crRowProps
