import { crCn } from '../styleFn';

const CL_BT_C2 = 'bt-circle bt-c2 not-selected';

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
    <div>
      {caption}
    </div>
  </button>
);

export default ButtonCircle2
