import { forwardRef } from '../uiApi';
import useResizeElement from './useResizeElement';

import BtResize from './BtResize';

const S_ROOT_DIV = { display: 'inline-block' }
, S_BT_LEFT = { marginLeft: 10 }
, S_BT_RIGHT = {
  marginLeft: 10,
  transform: 'rotate(180deg)'
};

const SvgHrzResize = forwardRef((
  props,
  ref
) => {
  const [
    hStartResizeLeft,
    hStartResizeRight,
    hStopResize,
    hKdLeft,
    hKdRight
  ] = useResizeElement(props, ref);
  return (
    <div style={S_ROOT_DIV}>
      <BtResize
        style={S_BT_LEFT}
        title="Resize container to left"
        startResize={hStartResizeLeft}
        stopResize={hStopResize}
        onKeyDown={hKdLeft}
      />
      <BtResize
        style={S_BT_RIGHT}
        title="Resize container to right"
        startResize={hStartResizeRight}
        stopResize={hStopResize}
        onKeyDown={hKdRight}
      />
   </div>
  );
});

/*
SvgHrzResize.propTypes = {
  nodeRef: PropTypes.ref,
  initWidth: PropTypes.number,
  minWidth: PropTypes.number,
  maxWidth: PropTypes.number,
  step: PropTypes.number,
  onResizeAfter: PropTypes.func
}
*/

export default SvgHrzResize
