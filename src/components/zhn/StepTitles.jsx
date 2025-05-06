import { crColorStyle } from '../styleFn';
import ItemStack from './ItemStack';

const CL_STEP = "step"
, S_PB_4 = { paddingBottom: 4 };

const StepTitle = (props) => (
  <p style={S_PB_4}>
    <span className={CL_STEP} style={crColorStyle(props.color)}>
      {props.step}
    </span>
    <span>
       &nbsp;{props.title}.
    </span>
  </p>
);

const _crItem = (
  title,
  index,
  restProps
) => (
  <StepTitle
    key={title}
    color={restProps.color}
    step={index+1}
    title={title}
  />
);

const StepTitles = (props) => (
 <div className={props.className} style={props.style}>
   <ItemStack
     items={props.titles}
     crItem={_crItem}
     color={props.stepColor}
   />
 </div>
);

export default StepTitles
