import memoEqual from '../hoc/memoEqual';
import { useLoading } from '../../flux/stores/loadingStore';

import {
  LPAT_LOADING,
  LPAT_LOADING_COMPLETE,
  LPAT_LOADING_FAILED
} from '../../flux/actions/LoadingProgressActions';

import ProgressLine from '../zhn/ProgressLine';

const COLOR_LOADING = '#2f7ed8'
, COLOR_FAILED = '#ed5813';

const ProgressLoading = memoEqual(() => {
  const status = useLoading()
  , [
    completed,
    color
  ] = status === LPAT_LOADING
    ? [35, COLOR_LOADING]
    : status === LPAT_LOADING_COMPLETE
       ? [100, COLOR_LOADING]
       : status === LPAT_LOADING_FAILED
          ? [100, COLOR_FAILED]
          : [0, COLOR_LOADING];

  return (
    <ProgressLine
       completed={completed}
       color={color}       
    />
  );
});

export default ProgressLoading
