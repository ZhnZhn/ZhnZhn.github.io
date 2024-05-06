import useResizeElement from './useResizeElement';

import BtResize from './BtResize';

const S_ROOT_DIV = { display: 'inline-block' }
, S_BT_LEFT = { marginLeft: 10 }
, S_BT_RIGHT = {
  ...S_BT_LEFT,
  transform: 'rotate(180deg)'
};

const SvgHrzResize = (
  props
) => {
  const [
    hStartResizeLeft,
    hStartResizeRight,
    hStopResize,
    hKdLeft,
    hKdRight
  ] = useResizeElement(props);
  return props.isBts ? (
    <div style={{...S_ROOT_DIV, ...props.style}}>
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
 ) : null;
};

/*
SvgHrzResize.propTypes = {
  refEl: PropTypes.ref,
  nodeRef: PropTypes.ref,
  isBts: PropTypes.bool,
  initWidth: PropTypes.number,
  minWidth: PropTypes.number,
  maxWidth: PropTypes.number,
  step: PropTypes.number,
  onResizeAfter: PropTypes.func
}
*/

export default SvgHrzResize
