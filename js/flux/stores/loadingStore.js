"use strict";

exports.__esModule = true;
exports.useLoading = exports.useLimitRemaining = exports.setLoadingFailed = exports.setLoadingComplete = exports.setLoading = void 0;
var _storeApi = require("../storeApi");
var _LoadingProgressActions = require("../actions/LoadingProgressActions");
const COMPLETE_TIMEOUT_MLS = 450;
const _atomLoading = (0, _storeApi.atom)(),
  _setLoading = _atomLoading.setValue,
  _atomLimitRemaining = (0, _storeApi.atom)(),
  _setLimitRemaining = limitRemaining => {
    _atomLimitRemaining.setValue(limitRemaining == null ? void 0 : limitRemaining);
  };
const useLoading = exports.useLoading = _atomLoading.useAtomValue;
const useLimitRemaining = exports.useLimitRemaining = _atomLimitRemaining.useAtomValue;
const setLoading = () => _setLoading(_LoadingProgressActions.LPAT_LOADING);
exports.setLoading = setLoading;
const setLoadingComplete = limitRemaining => {
  setTimeout(() => {
    _setLoading(_LoadingProgressActions.LPAT_LOADING_COMPLETE);
    _setLimitRemaining(limitRemaining);
  }, COMPLETE_TIMEOUT_MLS);
};
exports.setLoadingComplete = setLoadingComplete;
const setLoadingFailed = limitRemaining => {
  _setLoading(_LoadingProgressActions.LPAT_LOADING_FAILED);
  _setLimitRemaining(limitRemaining);
};
exports.setLoadingFailed = setLoadingFailed;
//# sourceMappingURL=loadingStore.js.map