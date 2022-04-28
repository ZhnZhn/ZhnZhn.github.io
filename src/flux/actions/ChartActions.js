import Reflux from 'reflux-core';

import { getFromDate } from '../../utils/DateUtils';
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
, META_SUFFIX = '_Meta'
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

const _assign = Object.assign;

const _cancelLoad = function(option, alertMsg){
  Msg.setAlertMsg(option, alertMsg);
  this.failed(option);

  if (_isFn(option.onCancel)) {
    option.onCancel();
  } else if (alertMsg === M.ALREADY_EXIST && _isFn(option.onFailed)) {
    option.onFailed();
  }
};

const _addBoolOptionTo = (options, propName) => {
  if (_isUndef(options[propName])) {
    options[propName] = ChartStore.isSetting(propName)
  }
};

const _addSettingsTo = (options, confItem, itemProps) => {
  const { loadId } = options;
  _assign(options, confItem, itemProps, {
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
}) => apiKey
  ? ''
  : isApiKeyRequired(loadId)
    ? M.withoutApiKey(getApiTitle(loadId))
    : isKeyFeature
       ? M.FEATURE_WITHOUT_KEY
       : isPremium
          ? M.PREMIUM_WITHOUT_KEY
          : '';


const _checkProxy = ({ proxy, loadId }) => {
  if (isProxyRequired(loadId) && !proxy) {
    return M.withoutProxy(getApiTitle(loadId));
  }
  return '';
};

const _crMsgSetting = option =>
  _checkMsgApiKey(option) || _checkProxy(option);

const _crMetaDataKey = key => key + META_SUFFIX;

ChartActions[CHAT_LOAD].shouldEmit = function(confItem={}, option={}){
  const _key = LogicUtils.createKeyForConfig(option)
  , { isLoadMeta } = option
  , key = isLoadMeta ? _crMetaDataKey(_key) : _key
  , _isDoublingLoad = this.isLoading && key === this.idLoading
  , _isTs = ChartStore.isLoadToChart();

  //{ chartType, browserType, dialogConf } = confItem
  _addSettingsTo(option, confItem, { key, _isTs })

  const _alertMsg = _crMsgSetting(option)
   || (isLoadMeta && _isDoublingLoad
        ? M.DOUBLE_LOAD_META
        : _isDoublingLoad
           ? M.LOADING_IN_PROGRES
           : !_isTs && ChartStore.isChartExist(option)
               ? M.ALREADY_EXIST
               : '');

  return _alertMsg
    ? (this.cancelLoad(option, _alertMsg), false)
    : true;
}

ChartActions[CHAT_LOAD].listen(function(confItem, option){
  const { key, loadId='Q' } = option;
  this.isLoading = true;
  this.idLoading = key
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

  _assign(option, dialogProps, dfProps, {
      subtitle: SUBTITLE
    }
  )

  const { fromDate, nInitFromDate } = option;
  if (!fromDate) {
    option.fromDate = nInitFromDate
       ? getFromDate(nInitFromDate)
       : getFromDate(2)
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
