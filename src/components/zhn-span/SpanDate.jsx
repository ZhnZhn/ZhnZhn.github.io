import { COLOR_DATE } from '../../constants/Color';

const S = {
  color: COLOR_DATE,
  display: 'inline-block',
  fontWeight: 'bold'
};

const SpanDate = ({
  date,
  style
}) => (
  <span style={{...S, ...style}}>
    {date}
  </span>
);

export default SpanDate
