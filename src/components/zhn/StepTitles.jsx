import ItemStack from './ItemStack';

const CL_STEP = "step"
, S_PB_4 = { paddingBottom: 4 };

const StepTitle = ({
  step,
  stepColor,
  title
}) => (
  <p style={S_PB_4}>
    <span className={CL_STEP} style={{color: stepColor}}>
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
  stepColor,
  titles
}) => (
 <div className={className} style={style}>
   <ItemStack
     items={titles}
     crItem={_crItem}
     stepColor={stepColor}
   />
 </div>
);

export default StepTitles
