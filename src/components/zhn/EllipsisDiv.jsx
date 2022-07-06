import {
  S_ELLIPSIS
} from '../styles/GeneralStyles';

const EllipsisDiv = ({
  style,
  text,
  title
}) => (
  <div style={{...style, ...S_ELLIPSIS}} title={title}>
    {text}
  </div>
);

export default EllipsisDiv
