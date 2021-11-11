import { LOADING, FAILED } from './SpinnerStatus'


const crSpinnerStatus = (
  isLoading,
  isLoadFailed
) => isLoading
   ? LOADING
   : isLoadFailed
     ? FAILED
     : void 0;

export default crSpinnerStatus
