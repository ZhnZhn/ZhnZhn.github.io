import { memo } from 'react';

const _isNotShouldRerender = (
  prevProps,
  nextProps
) => prevProps.isShow === nextProps.isShow
const memoIsShow = Comp => memo(Comp, _isNotShouldRerender)

export default memoIsShow
