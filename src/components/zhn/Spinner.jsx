import {
  useState,
  useEffect
} from '../uiApi';

const S_SPINNER_DIV = {
  width: 32,
  height: 32
};

const SpinnerDiv = ({ style }) => (
  <div
    style={{...S_SPINNER_DIV, ...style}}
    data-loader="circle"
  />
);

const S_SPINNER_LOADING = {
  position: 'relative',
  textAlign: 'middle',
  margin: '32px auto 0'
};

export const SpinnerLoading = ({
  style
}) => (
  <SpinnerDiv style={{
    ...S_SPINNER_LOADING,
    ...style}}
  />
)

const SPINNER_LOADING = 'L';
const SPINNER_FAILED = 'F';

export const crSpinnerStatus = (
  isLoading,
  isLoadFailed
) => isLoading
  ? SPINNER_LOADING
  : isLoadFailed
     ? SPINNER_FAILED
     : void 0

const S_LOADING = {
  position: 'absolute',
  top: 80,
  left: '45%',
  zIndex: 10,
  opacity: 1,
  transition: 'opacity 800ms ease-out'
}, S_FAILED = {
  borderColor: '#f44336',
  animation: 'none'
}, S_LOADED = {
  opacity: 0,
};

const _useIsHide = (status) => {
  const [isHide, setIsHide] = useState(false);
  useEffect(() => {
    if (!status) {
      setTimeout(() => setIsHide(true), 1000)
    }
  }, [status])
  return isHide;
};

export const Spinner = ({
  style,
  status
}) => {
  const isHide = _useIsHide(status)
  , _style = status === SPINNER_LOADING
    ? S_LOADING
    : status === SPINNER_FAILED
      ? S_FAILED
      : S_LOADED;

  return isHide ? null : (
    <SpinnerDiv style={{
      ...S_LOADING,
      ...style,
      ..._style}}
    />
  );
}
