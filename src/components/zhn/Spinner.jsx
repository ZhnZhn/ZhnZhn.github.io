import {
  useState,
  useEffect,
  IfTrue
} from '../uiApi';

const SpinnerDiv = (props) => (
  <div
    style={props.style}
    data-loader="circle"
  />
);

const S_SPINNER = {
  position: 'relative',
  width: 32,
  height: 32,
  margin: '32px auto 0'
};

export const SpinnerLoading = (props) => (
  <SpinnerDiv
    style={{...S_SPINNER, ...props.style}}
  />
)

const FAILED_LOAD_COLOR = '#f44336'
, CL_ERR_MSG = 'err-msg'
, S_ERR_MSG = {
  padding: 16
};

export const LoadFailedMsg = (props) => (
  <>
    <div
      data-loader="circle-failed"
      style={S_SPINNER}
    />
    <p className={CL_ERR_MSG} style={S_ERR_MSG}>
      {`${props.errMsg || ''}: Network error.`}
    </p>
  </>
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

const TRANSITION_DURATION = 800
, HIDE_TIMEOUT_MLS = TRANSITION_DURATION + 200
, S_SPINNER_TRANSITION = {
  transition: `opacity ${TRANSITION_DURATION}ms ease-out`
}
, S_LOADING = {
  opacity: 1
}, S_FAILED = {
  borderColor: FAILED_LOAD_COLOR,
  animation: 'none'
}, S_LOADED = {
  opacity: 0
};

const useIsHide = (status) => {
  const [
    isHide,
    setIsHide
  ] = useState(!1);
  useEffect(() => {
    if (!status) {
      setTimeout(
        () => setIsHide(!0),
        HIDE_TIMEOUT_MLS
      )
    }
  }, [status])
  return isHide;
};

export const Spinner = ({
  style,
  status
}) => {
  const isHide = useIsHide(status)
  , _style = status === SPINNER_LOADING
    ? S_LOADING
    : status === SPINNER_FAILED
      ? S_FAILED
      : S_LOADED;

  return (
    <IfTrue v={isHide}>
      <SpinnerDiv style={{
        ...S_SPINNER_TRANSITION,
        ...style,
        ..._style}}
      />
    </IfTrue>
  );
}
