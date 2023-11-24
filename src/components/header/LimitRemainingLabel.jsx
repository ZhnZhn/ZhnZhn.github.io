import { useLimitRemaining } from '../../flux/stores/loadingStore';

const S_LABEL = {
  display: 'inline-block',
  color: '#2f7ed8',
  paddingRight: 8,
  fontSize: '16px',
  fontWeight: 'bold'
};

const LimitRemainingLabel = () => (
  <span style={S_LABEL}>
    {useLimitRemaining()}
  </span>
);

export default LimitRemainingLabel
