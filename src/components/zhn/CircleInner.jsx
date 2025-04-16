import { crAbsoluteTopLeftStyle } from '../styleFn';

const S_CIRCLE_INNER = {
  ...crAbsoluteTopLeftStyle(0, 0),
  width: 12,
  height: 12,
  overflow: 'visible'
}
, S_CIRCLE_INNER_EL = {
  ...crAbsoluteTopLeftStyle(-12, -12),  
  width: '300%',
  height: 36,
  borderRadius: '50%',
  backgroundColor: 'rgba(0, 188, 212, 0.16)'
};

const CircleInner = ({
   is,
   circleStyle,
   emberStyle
}) => (
  <div style={{...S_CIRCLE_INNER, ...circleStyle}}>
    {is
      ? <div style={{...S_CIRCLE_INNER_EL, ...emberStyle}} />
      : null
    }
  </div>
);

export default CircleInner
