import ItemStack from './ItemStack';

const S_PB_4 = { paddingBottom: 4 };
const StepTitle = ({
  step,
  stepStyle,
  title
}) => (
  <p style={S_PB_4}>
    <span style={stepStyle}>
      {step}
    </span>
    <span>
       &nbsp;{title}.
    </span>
  </p>
);

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
  className,
  style,
  stepStyle,
  titles
}) => (
 <div className={className} style={style}>
   <ItemStack
     items={titles}
     crItem={_crItem}
     stepStyle={stepStyle}
   />
 </div>
);

export default StepTitles
