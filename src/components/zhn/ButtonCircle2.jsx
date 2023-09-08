import {
  crCn,
  crBtCircleCn
} from '../styleFn';

const CL_BT_C2 = crBtCircleCn("bt-c2");

const ButtonCircle2 = ({
  tabIndex,
  className,
  style,
  dataLoader,
  caption='',
  onClick
}) => (
  <button
     type="button"
     tabIndex={tabIndex}
     className={crCn(CL_BT_C2, className)}
     style={style}
     data-loader={dataLoader}
     onClick={onClick}
  >
    {caption}
  </button>
);

export default ButtonCircle2
