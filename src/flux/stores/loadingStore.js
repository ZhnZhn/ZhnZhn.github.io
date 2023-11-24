import { atom } from '../storeApi';

import {
  LPAT_LOADING,
  LPAT_LOADING_COMPLETE,
  LPAT_LOADING_FAILED
} from '../actions/LoadingProgressActions';

const COMPLETE_TIMEOUT_MLS = 450;

const _atomLoading = atom()
, _setLoading = _atomLoading.setValue
, _atomLimitRemaining = atom()
, _setLimitRemaining = (limitRemaining)  => {
  _atomLimitRemaining.setValue(
      limitRemaining == null
        ? void 0
        : limitRemaining
  )
};

export const useLoading = _atomLoading.useAtomValue
export const useLimitRemaining = _atomLimitRemaining.useAtomValue

export const setLoading = () => _setLoading(LPAT_LOADING)
export const setLoadingComplete = (limitRemaining) => {
  setTimeout(() => {
    _setLoading(LPAT_LOADING_COMPLETE)
    _setLimitRemaining(limitRemaining)
  }, COMPLETE_TIMEOUT_MLS)
}
export const setLoadingFailed = (limitRemaining) => {
  _setLoading(LPAT_LOADING_FAILED)
  _setLimitRemaining(limitRemaining)
}
