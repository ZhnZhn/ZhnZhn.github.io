import { useRef, useEffect } from 'react'

import useForceUpdate from '../hooks/useForceUpdate'

const CL = "progress-line"
, TM_PERIOD = 800
, T = {
  WIDTH: 'width 350ms linear',
  OPACITY: 'opacity 250ms linear'
};

const _crStyle = (backgroundColor, opacity, width, transition) => ({
   backgroundColor,
   width,
   opacity,
   transition
});

const _getCurrent = ref => ref.current;

const ProgressLine = ({
  color='#2f7ed8',
  completed
}) => {
  const forceUpdate = useForceUpdate()[1]
  , _refWasCompleted = useRef(false)
  , _refIdCompleted = useRef(null)
  , _refWasOpacied = useRef(false)
  , _refIdOpacied = useRef(null);

  useEffect(()=>{
    if (_getCurrent(_refWasCompleted)){
      _refIdCompleted.current = setTimeout(forceUpdate, TM_PERIOD)
    } else if (_getCurrent(_refWasOpacied)){
      _refIdOpacied.current = setTimeout(forceUpdate, TM_PERIOD)
    }
  })

  useEffect(()=>{
    return () => {
      clearTimeout(_getCurrent(_refIdCompleted))
      clearTimeout(_getCurrent(_refIdOpacied))
    }
  }, [])

  let _style;

  if (_getCurrent(_refWasOpacied)) {
    _style = _crStyle(color, 1, 0)
    _refWasOpacied.current = false;
  } else if (_getCurrent(_refWasCompleted)) {
    _style = _crStyle(color, 0, '100%', T.OPACITY)
    _refWasCompleted.current = false;
    _refWasOpacied.current = true;
  } else {
     if (completed < 0) {
       completed = 0;
     } else if (completed >= 100) {
       completed = 100;
       _refWasCompleted.current = true
     }
     _style = _crStyle(color, 1, completed+'%', T.WIDTH)
  }

  return (<div className={CL} style={_style} />);
}

/*
ProgressLine.propTypes = {
  color: PropTypes.string,
  completed: PropTypes.number
}
*/

export default ProgressLine
