import {
  useEffect,
  useImperativeHandle
} from '../uiApi';
import useRefInit from '../hooks/useRefInit';

import ResizeElementImpl from './ResizeElementImpl';

const useResizeElement = ({
  refEl,
  ...restProps
}
) => {
  const resizeImpl = useRefInit(() => {
    return new ResizeElementImpl(restProps);
  });

  /*eslint-disable react-hooks/exhaustive-deps */
  useImperativeHandle(refEl, () => ({
    toWidth: resizeImpl.toWidth,
    resizeBy: resizeImpl.resizeBy
  }), [])
  // resizeImpl.toWidth, resizeImpl.resizeBy

  useEffect(() => {
    return () => resizeImpl.clearInterval();
  }, [])
  // resizeImpl
  /*eslint-enable react-hooks/exhaustive-deps */

  return [
    resizeImpl.hStartResizeLeft,
    resizeImpl.hStartResizeRight,
    resizeImpl.hStopResize,
    resizeImpl.hKdLeft,
    resizeImpl.hKdRight
  ];
};

export default useResizeElement
