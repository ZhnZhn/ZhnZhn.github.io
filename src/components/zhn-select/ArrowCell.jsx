import { forwardRef, useRef, useImperativeHandle } from 'react';

import CL from './CL';

const S = {
  ARROW_CELL: {
    position: 'absolute',
    top: 10,
    right: 0,
    width: 35,
    paddingRight: 5,
    textAlign: 'center',
    verticalAlign: 'middle',
    cursor: 'pointer'
  },
  ARROW: {
    position: 'relative',
    top: 2,
    display: 'inline-block',
    height: 0,
    width: 0,
    borderColor: '#999 transparent transparent',
    borderStyle: 'solid',
    borderWidth: '10px 8px 4px'
  }
};

const C = {
  ANIMATION_CIRCLE: "circle infinite 1.25s linear",
  BORDER_COLOR: "#1b75bb transparent transparent"
};

const _getStyle = ref => ref.current.style;

const ArrowCell = forwardRef(({
  arrowStyle,
  onClick
}, ref) => {
  const _refArrowCell = useRef()
  , _refArrow = useRef();

  useImperativeHandle(ref, () => ({
    startAnimation: () => {
      _getStyle(_refArrowCell).animation = C.ANIMATION_CIRCLE;
      _getStyle(_refArrow).borderColor = C.BORDER_COLOR;
    },
    stopAnimation: () => {
      _getStyle(_refArrowCell).animation = "";
    }
  }), [])

  return (
    <button
       ref={_refArrowCell}
       className={CL.BT_ARROW}
       style={S.ARROW_CELL}
       tabIndex="-1"
       onClick={onClick}
    >
      <span
         ref={_refArrow}
         style={{...S.ARROW, ...arrowStyle}}
      />
    </button>
  );
})

/*
ArrowCell.propTypes = {
 arrowStyle: PropTypes.object,
 onClick: PropTypes.func
}
*/

export default ArrowCell
