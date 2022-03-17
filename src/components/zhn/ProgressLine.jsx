import {
  useRef,
  useEffect
} from 'react';

import useRerender from '../hooks/useRerender';

const CL = "progress-line"
, DF_COLOR = '#2f7ed8'
, TM_PERIOD = 800
, T_WIDTH = 'width 350ms linear'
, T_OPACITY = 'opacity 250ms linear'
, _crStyle = (
  backgroundColor,
  opacity,
  width,
  transition
) => ({
   backgroundColor,
   width,
   opacity,
   transition
})
, _getRefValue = ref => ref.current;

const ProgressLine = ({
  color=DF_COLOR,
  completed
}) => {
  const _rerender = useRerender()
  , _refWasCompleted = useRef(false)
  , _refIdCompleted = useRef(null)
  , _refWasOpacied = useRef(false)
  , _refIdOpacied = useRef(null);

  useEffect(()=>{
    if (_getRefValue(_refWasCompleted)){
      _refIdCompleted.current = setTimeout(_rerender, TM_PERIOD)
    } else if (_getRefValue(_refWasOpacied)){
      _refIdOpacied.current = setTimeout(_rerender, TM_PERIOD)
    }
  })

  useEffect(()=>{
    return () => {
      clearTimeout(_getRefValue(_refIdCompleted))
      clearTimeout(_getRefValue(_refIdOpacied))
    }
  }, [])

  let _style;

  if (_getRefValue(_refWasOpacied)) {
    _style = _crStyle(color, 1, 0)
    _refWasOpacied.current = false;
  } else if (_getRefValue(_refWasCompleted)) {
    _style = _crStyle(color, 0, '100%', T_OPACITY)
    _refWasCompleted.current = false;
    _refWasOpacied.current = true;
  } else {
     if (completed < 0) {
       completed = 0;
     } else if (completed >= 100) {
       completed = 100;
       _refWasCompleted.current = true
     }
     _style = _crStyle(color, 1, completed+'%', T_WIDTH)
  }

  return (
    <div className={CL} style={_style} />
  );
}

/*
ProgressLine.propTypes = {
  color: PropTypes.string,
  completed: PropTypes.number
}
*/

export default ProgressLine
