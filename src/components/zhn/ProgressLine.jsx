import {
  useRef,
  useEffect,
  getRefValue,
  setRefValue
} from '../uiApi';

import useRerender from '../hooks/useRerender';

const CL = "progress-line"
, DF_COLOR = '#2f7ed8'
, TM_PERIOD = 800
, WIDTH_TRANSITION = 'width 350ms linear';

const _crLineStyle = (
  backgroundColor,
  width,
  transition
) => ({
   backgroundColor,
   width: width + '%',
   transition,
   opacity: 1
});

const _crCompleted = (
  completed,
  _refWasCompleted
) => completed < 0
  ? 0
  : completed >= 100
     ? (setRefValue(_refWasCompleted, true), 100)
     : completed;

const _crStyle = (
  _refWasCompleted,
  color,
  completed
) => getRefValue(_refWasCompleted)
  ? (setRefValue(_refWasCompleted, false), _crLineStyle(color, 0))
  : _crLineStyle(color, _crCompleted(completed, _refWasCompleted), WIDTH_TRANSITION);

const ProgressLine = ({
  color=DF_COLOR,
  completed
}) => {
  const rerender = useRerender()
  , _refWasCompleted = useRef(false)
  , _refIdCompleted= useRef(null);

  useEffect(()=>{
    if (getRefValue(_refWasCompleted)){
      setRefValue(_refIdCompleted, setTimeout(rerender, TM_PERIOD))
    }
  })

  useEffect(()=>{
    return () => {
      clearTimeout(getRefValue(_refIdCompleted))
    }
  }, [])

  const _style = _crStyle(
    _refWasCompleted,
    color,
    completed
  );

  return (
    <div
      className={CL}
      style={_style}
    />
  );
};

export default ProgressLine
