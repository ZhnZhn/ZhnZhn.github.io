import { memo } from '../uiApi';

const _arePropsEqual = (
  prevProps,
  nextProps
) => prevProps.isShow === nextProps.isShow
const memoIsShow = Comp => memo(Comp, _arePropsEqual)

export default memoIsShow
