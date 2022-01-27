import memoEqual from '../hoc/memoEqual';
import useToggle from '../hooks/useToggle';

const CL = "bt-sub-item"
, S_ACTIVE = { fontWeight: 'bold' }
, _isFn = fn => typeof fn === 'function';

const SubMenuItem = memoEqual(({
  caption,
  initialIsActive=false,
  onClick,
  onClose
}) => {
  const [isActive, toggleIsAcive] = useToggle(initialIsActive)
  , _hClick = () => {
    onClick()
    if (_isFn(onClose)) {
      onClose()
    } else {
      toggleIsAcive()
    }
  };

  if (!_isFn(onClick)){
    return null;
  }
  const _style = isActive ? S_ACTIVE : null;

  return (
    <button
      className={CL}
      style={_style}
      onClick={_hClick}
    >
      {caption}
    </button>
  );
});

export default SubMenuItem
