import crRowCaption from './crRowCaption';

// [rowStyle, labelStyle, inputProps, caption, title]
const crRowProps = ({
  isShowLabels,
  caption='',
  width=250,
  ...restRowProps
}) => [
   {
     width,
     ...restRowProps,
     optionName: isShowLabels ? '' : caption
   },
   ...crRowCaption(caption)
];

export default crRowProps
