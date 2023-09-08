import {
  S_INLINE,
  S_NONE,
  crCn,
  crBsContainerCn
} from '../styleFn';

const CL_ROOT = crBsContainerCn("item-container")
, CL_SHOW_CONT = "show-cont";

const crChartContainerStyle = (
  isShow
) => [
  isShow ? S_INLINE : S_NONE,
  crCn(
    CL_ROOT,
    [isShow, CL_SHOW_CONT]
  )
];

export default crChartContainerStyle
