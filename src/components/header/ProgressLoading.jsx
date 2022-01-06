import { memo, useState } from 'react';
import useListen from '../hooks/useListen';

import {
  LPAT_LOADING,
  LPAT_LOADING_COMPLETE,
  LPAT_LOADING_FAILED
} from '../../flux/actions/LoadingProgressActions';

import ProgressLine from '../zhn/ProgressLine';

const COLOR_LOADING = '#2f7ed8'
, COLOR_FAILED = '#ed5813'
, COMPLETE_TIMEOUT_MLS = 450;

const _crState = (completed, color) => [
  completed,
  color
];

const ProgressLoading = () => {
  const [state, setState] = useState(
    ()=>_crState(0, COLOR_LOADING)
  )
  , [completed, color] = state;

  useListen(actionType => {
    if (actionType === LPAT_LOADING){
      setState(_crState(35, COLOR_LOADING))
    } else if (actionType === LPAT_LOADING_COMPLETE){
      setTimeout(
        () => setState(_crState(100, COLOR_LOADING))
      , COMPLETE_TIMEOUT_MLS)
    } else if (actionType === LPAT_LOADING_FAILED){
      setState(_crState(100, COLOR_FAILED))
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

export default memo(ProgressLoading)
