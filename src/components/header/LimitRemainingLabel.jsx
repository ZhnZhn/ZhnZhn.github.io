import { isNumber } from '../../utils/isTypeFn';
import { useLimitRemaining } from '../../flux/stores/loadingStore';

const S_LABEL = {
  display: 'inline-block',
  color: '#2f7ed8',
  paddingRight: 5,
  fontSize: '16px',
  fontWeight: 'bold'
};

const LimitRemainingLabel = () => {
  const _limitRemaining = useLimitRemaining();
  return isNumber(_limitRemaining)
    ? (<span style={S_LABEL}>{_limitRemaining}</span>)
    : null
}

export default LimitRemainingLabel
