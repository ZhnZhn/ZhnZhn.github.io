import Reflux from 'reflux-core';

import DU from '../../utils/DateUtils';
import Msg from '../../constants/Msg';
import ChartStore from '../stores/ChartStore';
import SettingSlice from '../stores/SettingSlice';
import LoadConfig from '../logic/LoadConfig';
import LogicUtils from '../logic/LogicUtils';

import {
  LPAT_LOADING_COMPLETE,
  LPAT_LOADING_FAILED
} from './LoadingProgressActions'

const ALERT_DESCR_BY_QUERY = "Loader for this item hasn't found."
, META = '_Meta'
, _fnNoop = () => {}
, _isFn = fn => typeof fn === 'function'
, _isUndef = v => typeof v === 'undefined';

export const CHAT_INIT_AND_SHOW = 'initAndShowChart'
export const CHAT_SHOW = 'showChart'
export const CHAT_CLOSE = 'closeChart'

export const CHAT_LOAD = 'loadItem'
export const CHAT_LOAD_ADDED = 'loadItemAdded'
export const CHAT_LOAD_COMPLETED = 'loadItemCompleted'
export const CHAT_LOAD_FAILED = 'loadItemFailed'

export const CHAT_LOAD_BY_QUERY = 'loadItemByQuery'

export const CHAT_TO_TOP = 'toTop'

export const CHAT_COPY = 'copy'

export const CHAT_UPDATE_MOVING_VALUES = 'updateMovingValues'
export const CHAT_SORT_BY = 'sortBy'
export const CHAT_REMOVE_ALL = 'removeAll'

const M = Msg.Alert;

const _cancelLoad = function(option, alertMsg, isWithFailed){
  Msg.setAlertMsg(option, alertMsg);
  this.failed(option);
  this.isShouldEmit = false;

  if (_isFn(option.onCancel)) {
    option.onCancel();
  } else if (isWithFailed && _isFn(option.onFailed)) {
    option.onFailed();
  }
};

const _addBoolOptionTo = (options, propName) => {
  if (_isUndef(options[propName])) {
    options[propName] = ChartStore.isSetting(propName)
  }
};

const _addSettingsTo = (options, ...restArgs) => {
  const { loadId } = options;
  Object.assign(options, ...restArgs, {
    apiKey: ChartStore.getKey(loadId),
    proxy: ChartStore.getProxy(loadId)
  })
  _addBoolOptionTo(options, 'isDrawDeltaExtrems')
  _addBoolOptionTo(options, 'isNotZoomToMinMax')
};

const ChartActions =  Reflux.createActions({
  [CHAT_LOAD]: {
     children: ['completed', 'added', 'failed'],
     isLoading: false,
     idLoading: void 0,
     isShouldEmit: true,
     cancelLoad: _cancelLoad
   },
  [CHAT_LOAD_BY_QUERY]: {
    children: ['completed', 'failed']
  },
  [CHAT_SHOW]: {},
  [CHAT_CLOSE]: {},

  [CHAT_TO_TOP]: {},
  [CHAT_COPY]: {},
  [CHAT_UPDATE_MOVING_VALUES]: {},
  [CHAT_SORT_BY]: {},
  [CHAT_REMOVE_ALL]: {}
});

const _isItemLoaded = actionType =>
  actionType === LPAT_LOADING_COMPLETE
  || actionType === LPAT_LOADING_FAILED;

const _onChangeStore = actionType => {
  if (_isItemLoaded(actionType)) {
    ChartActions[CHAT_LOAD].isLoading = false;
  }
};

ChartActions.onChangeStore = _onChangeStore

const {
  isApiKeyRequired,
  isProxyRequired,
  getApiTitle
} = SettingSlice;

const _checkMsgApiKey = ({
  apiKey,
  loadId,
  isKeyFeature,
  isPremium
}) => {
  if (!apiKey){
    if (isApiKeyRequired(loadId)) {
      return M.withoutApiKey(getApiTitle(loadId));
    }
    if (isKeyFeature) {
      return M.FEATURE_WITHOUT_KEY;
    }
    if (isPremium) {
      return M.PREMIUM_WITHOUT_KEY;
    }
  }
  return '';
};
const _checkProxy = ({ proxy, loadId }) => {
  if (isProxyRequired(loadId) && !proxy) {
    return M.withoutProxy(getApiTitle(loadId));
  }
  return '';
};

ChartActions[CHAT_LOAD].preEmit = function(confItem={}, option={}) {
  const key = LogicUtils.createKeyForConfig(option)
  , isDoublingLoad = this.isLoading && key === this.idLoading
  , isDoublLoadMeta = option.isLoadMeta
      ? (key + META === this.idLoading)
      : false;

  this.isShouldEmit = true;
  const _isTs = ChartStore.isLoadToChart();
  //{ chartType, browserType, dialogConf } = confItem
  _addSettingsTo(option, confItem, { key, _isTs })

  const _msgSetting = _checkMsgApiKey(option)
    || _checkProxy(option);
  if (_msgSetting) {
    this.cancelLoad(option, _msgSetting, false);
  } else if (isDoublingLoad){
    this.cancelLoad(option, M.LOADING_IN_PROGRESS, false);
  } else if (isDoublLoadMeta){
    this.cancelLoad(option, M.DOUBLE_LOAD_META, false);
  } else if (!_isTs){
    if (ChartStore.isChartExist(option)){
      this.cancelLoad(option, M.ALREADY_EXIST, true);
    }
  }
  return;
}

ChartActions[CHAT_LOAD].shouldEmit = function(){
  return this.isShouldEmit;
}
ChartActions[CHAT_LOAD].listen(function(confItem, option){
  const { key, isLoadMeta, loadId='Q' } = option;
  this.isLoading = true;
  this.idLoading = isLoadMeta ? key + META : key;
  LoadConfig[loadId].loadItem(
    option, this.completed, this.added, this.failed
  );
})

const SUBTITLE = 'Loaded from URL Query';
const _addDialogPropsTo = option => {
  const { chartType, browserType } = option
  , { dialogProps } = ChartStore
        .getSourceConfig(browserType, chartType) || {}
  , { dfProps } = dialogProps || {};

  Object.assign(option,
    dialogProps, dfProps, {
      subtitle: SUBTITLE
    }
  )

  const { fromDate, nInitFromDate } = option;
  if (!fromDate) {
    option.fromDate = nInitFromDate
       ? DU.getFromDate(nInitFromDate)
       : DU.getFromDate(2)
  }
};

ChartActions[CHAT_LOAD_BY_QUERY].listen(function(option){
  _addDialogPropsTo(option)
  const { loadId } = option;
  option.proxy = ChartStore.getProxy(loadId)

  const impl = LoadConfig[loadId];
  if (impl) {
    const { addPropsTo } = impl;
    if (_isFn(addPropsTo)){
      addPropsTo(option)
    }
    impl.loadItem(option, this.completed, _fnNoop, this.failed)
  } else {
    option.alertDescr = ALERT_DESCR_BY_QUERY
    this.failed(option)
  }
})

export default ChartActions
