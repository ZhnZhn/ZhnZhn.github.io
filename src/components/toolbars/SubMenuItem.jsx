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
  const [
    isActive,
    toggleIsAcive
  ] = useToggle(initialIsActive)
  , _hClick = () => {
    onClick()
    if (_isFn(onClose)) {
      onClose()
    } else {
      toggleIsAcive()
    }
  };

  return _isFn(onClick) ? (
    <button
      type="button"
      className={CL}
      style={isActive ? S_ACTIVE : null}
      onClick={_hClick}
    >
      {caption}
    </button>
  ) : null;
});

export default SubMenuItem
