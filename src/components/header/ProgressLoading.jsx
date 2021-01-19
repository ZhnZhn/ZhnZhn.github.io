import { memo, useState } from 'react';
import useListen from '../hooks/useListen';

import ProgressLine from '../zhn/ProgressLine';

const C = {
  LOADING: '#2f7ed8',
  FAILED: '#ed5813'
};

const COMPLETE_TIMEOUT_MLS = 450;

const ProgressLoading = ({
  store,
  ACTIONS
}) => {
  const [{ completed, color }, setState] = useState({
    completed: 0,
    color: C.LOADING
  });

  useListen(store, (actionType)=>{
    if (actionType === ACTIONS.LOADING){
      setState({ completed: 35, color: C.LOADING })
    } else if (actionType === ACTIONS.LOADING_COMPLETE){
      setTimeout(
        () => setState({ completed: 100, color: C.LOADING })
      , COMPLETE_TIMEOUT_MLS)
    } else if (actionType === ACTIONS.LOADING_FAILED){
      setState({ completed: 100, color: C.FAILED })
    }
  }, 'listenLoadingProgress')

  return (
    <ProgressLine
       height={3}
       color={color}
       completed={completed}
    />
  );
};

/*
ProgressLoading.propTypes = {
  store: PropTypes.shape({
    listenLoadingProgress: PropTypes.func
  }),
  ACTIONS: PropTypes.arrayOf(PropTypes.string)
}
*/

export default memo(ProgressLoading)
