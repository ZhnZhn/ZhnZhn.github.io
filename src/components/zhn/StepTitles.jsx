import ItemStack from './ItemStack';
import StepTitle from './StepTitle';

const _crItem = (
  title,
  index,
  restProps
) => (
  <StepTitle
    {...restProps}
    key={title}
    step={index+1}
    title={title}
  />
);

const StepTitles = ({
  style,
  stepStyle,
  titles
}) => (
 <div style={style}>
   <ItemStack
     items={titles}
     crItem={_crItem}
     stepStyle={stepStyle}
   />
 </div>
);

export default StepTitles
