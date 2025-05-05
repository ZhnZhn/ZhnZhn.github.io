import { IfTrue } from '../uiApi';
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

const CircleInner = (props) => (
  <div style={{...S_CIRCLE_INNER, ...props.circleStyle}}>
    <IfTrue v={props.is}>
      <div style={{...S_CIRCLE_INNER_EL, ...props.emberStyle}} />
    </IfTrue>
  </div>
);

export default CircleInner
