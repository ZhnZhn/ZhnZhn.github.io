import Reflux from 'reflux';

import DU from '../../utils/DateUtils';
import Msg from '../../constants/Msg';
import ChartStore from '../stores/ChartStore';
import SettingSlice from '../stores/SettingSlice';
import LoadConfig from '../logic/LoadConfig';
import LogicUtils from '../logic/LogicUtils';
import { T as LPA } from './LoadingProgressActions'

const C = {
  DESR_LOADER: "Loader for this item hasn't found."
};

const META = '_Meta'
, _fnNoop = () => {}
, _isFn = fn => typeof fn === 'function'
, _isUndef = v => typeof v === 'undefined';


export const ChartActionTypes = {
  INIT_AND_SHOW_CHART: 'initAndShowChart',
  SHOW_CHART: 'showChart',
  CLOSE_CHART: 'closeChart',

  LOAD_STOCK: 'loadStock',
  LOAD_STOCK_COMPLETED: 'loadStockCompleted',
  LOAD_STOCK_ADDED: 'loadStockAdded',
  LOAD_STOCK_FAILED: 'loadStockFailed',

  LOAD_STOCK_BY_QUERY: 'loadStockByQuery',
  LOAD_STOCK_BY_QUERY_C: 'loadStockByQueryC',
  LOAD_STOCK_BY_QUERY_F: 'loadStockByQueryF',

  TO_TOP: 'toTop',

  COPY: 'copy',

  SORT_BY: 'sortBy',
  REMOVE_ALL:'removeAll'
};
const A = ChartActionTypes;
const M = Msg.Alert;

const _fnOnChangeStore = function(actionType, data){
  if (actionType === LPA.LOADING_COMPLETE ||
      actionType === LPA.LOADING_FAILED
  ) {
    ChartActions[A.LOAD_STOCK].isLoading = false;
  }
};

const _fnCancelLoad = function(option, alertMsg, isWithFailed){
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

const _addSettingsTo = (options, ...args) => {
  const { loadId } = options;
  Object.assign(options, ...args, {
    apiKey: ChartStore.getKey(loadId),
    proxy: ChartStore.getProxy(loadId)
  })
  _addBoolOptionTo(options, 'isDrawDeltaExtrems')
  _addBoolOptionTo(options, 'isNotZoomToMinMax')
}


const ChartActions =  Reflux.createActions({
      [A.LOAD_STOCK] : {
         children : ['completed', 'added', 'failed'],
         isLoading : false,
         idLoading : undefined,
         isShouldEmit : true,
         cancelLoad : _fnCancelLoad
       },
      [A.LOAD_STOCK_BY_QUERY]: {
        children: [ 'completed', 'failed']
      },
      [A.SHOW_CHART] : {},
      [A.CLOSE_CHART] : {},

      [A.TO_TOP]: {},
      [A.COPY]: {},
      [A.SORT_BY]: {},
      [A.REMOVE_ALL]: {}
});

ChartActions.fnOnChangeStore = _fnOnChangeStore

const {
  isApiKeyRequired,
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

ChartActions[A.LOAD_STOCK].preEmit = function(confItem={}, option={}) {
  const key = option._itemKey || LogicUtils.createKeyForConfig(option)
  , isDoublingLoad = this.isLoading && key === this.idLoading
  , isDoublLoadMeta = option.isLoadMeta
      ? (key + META === this.idLoading)
      : false;

  this.isShouldEmit = true;
  //{ chartType, browserType, conf } = confItem
  _addSettingsTo(option, confItem, { key })

  const _msgApiKey = _checkMsgApiKey(option);
  if (_msgApiKey) {
    this.cancelLoad(option, _msgApiKey, false);
  } else if (isDoublingLoad){
    this.cancelLoad(option, M.LOADING_IN_PROGRESS, false);
  } else if (isDoublLoadMeta){
    this.cancelLoad(option, M.DOUBLE_LOAD_META, false);
  } else if (!ChartStore.isLoadToChart()){    
    if (ChartStore.isChartExist(option)){
      this.cancelLoad(option, M.ALREADY_EXIST, true);
    }
  }
  return;
}

ChartActions[A.LOAD_STOCK].shouldEmit = function(){
  return this.isShouldEmit;
}
ChartActions[A.LOAD_STOCK].listen(function(confItem, option){
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
            .getSourceConfig(browserType, chartType) || {};

  Object.assign(option,
    dialogProps,
    dialogProps.dfProps, {
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

ChartActions[A.LOAD_STOCK_BY_QUERY].listen(function(option){
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
    option.alertDescr = C.DESCR_LOADER
    this.failed(option)
  }
})

export default ChartActions
