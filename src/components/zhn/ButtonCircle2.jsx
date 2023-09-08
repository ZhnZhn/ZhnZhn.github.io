import {
  crCn,
  crBtCircleCn
} from '../styleFn';

import ButtonCircle from './ButtonCircle';

const CL_BT_C2 = crBtCircleCn("bt-c2");

const ButtonCircle2 = ({
  className,
  caption='',
  ...restProps
}) => (
  <ButtonCircle
     {...restProps}
     caption={caption}
     className={crCn(CL_BT_C2, className)}
  />
);

export default ButtonCircle2
