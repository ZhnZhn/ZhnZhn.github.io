import {
  isArr,
  isFn
} from '../../utils/isTypeFn';
import { bindTo } from '../../utils/bindTo';
import { fetchJson } from '../../utils/fnFetch';

import { isTreeMap } from '../../adapters/CategoryFn';
import { loadTreeMap } from '../../charts/initChartTheme';

import {
  isLoadToChart,
  getActiveChart
} from '../stores/chartCheckBoxLogic';
import {
  addSeriaWithRenderLabel
} from '../../charts/ChartFn';
import {
  isCategoryItem
} from '../../components/dialogs/ChartOptionsFn';

import onCatch from './onCatch';

const ALERT_CATEGORY_TO_SPLINE = {
  alertCaption: "Series Error",
  alertDescr: "Adding category seria to not category isn't allowed."
};

const _crOptionFetch = (
  { optionFetch },
  option
) => isFn(optionFetch)
  ? optionFetch(option)
  : optionFetch;

const _fetchToChartComp = (
  objImpl, {
  json,
  option,
  onCompleted
}) => {
  const { adapter } = objImpl
  , { config } = adapter.toConfig(json, option)
  , _onCompleteImpl = () => {
    if (!isFn(config.then)){
       onCompleted(option, config)
    } else {
      config.then(config => {
        onCompleted(option, config)
      })
    }
  };

  if (isTreeMap(option)){
    loadTreeMap().then(_onCompleteImpl)
  } else {
    _onCompleteImpl()
  }
};

const _crRequestUrl = (
  api,
  option,
  onFailed
) => {
  try {
    return api.getRequestUrl(option);
  } catch (error) {
    onCatch({ error, option, onFailed })
  }
};

const _loadToChartComp = (
  objImpl,
  option,
  onCompleted,
  onFailed
) => {
  const {
    fnFetch,
    api
  } = objImpl
  , { getLimitRemaiming } = api || {}
  , optionFetch = _crOptionFetch(objImpl, option);

  fnFetch({
    uri: _crRequestUrl(api, option, onFailed),
    option,
    optionFetch,
    getLimitRemaiming,
    onCheckResponse: api.checkResponse,
    onFetch: bindTo(_fetchToChartComp, objImpl),
    onCompleted: onCompleted,
    onCatch,
    onFailed
  })
}

const _isNotAllowToAdd = ({
  toSeries,
  isAdd },
  option
) => !isFn(toSeries)
  || (isFn(isAdd) && !isAdd(option));

const _loadToChart = (
  objImpl,
  option,
  onAdded,
  onFailed
) => {
  const {
    fnFetch,
    api
  } = objImpl
  , { getLimitRemaiming } = api || {}
  , optionFetch = _crOptionFetch(objImpl, option);
  fnFetch({
    uri: _crRequestUrl(api, option, onFailed),
    option,
    optionFetch,
    getLimitRemaiming,
    onCheckResponse: api.checkResponse,
    onFetch: bindTo(_fetchToChart, objImpl),
    onCompleted: onAdded,
    onCatch,
    onFailed
  })
};

const _fetchToChart = (
  objImpl, {
  json,
  option,
  onCompleted
}) => {
  const { adapter } = objImpl
  , {
    itemCaption:label,
    value,
    hasSecondYAxis
  } = option
  , chart = getActiveChart()
  , series = adapter.toSeries(json, option, chart)
  , {
     itemCaption,
     color,
     zhColor
   } = series || {};

   addSeriaWithRenderLabel({
     chart,
     series,
     label: itemCaption || label || value,
     color: color || zhColor,
     hasSecondYAxis: !!hasSecondYAxis
   })
   onCompleted(option)
}

const _isAddCategoryToSpline = ({ seriaType }) => {
  const chart = getActiveChart();
  return seriaType
    && isCategoryItem({ value: seriaType })
    && chart && isArr(chart.xAxis)
    && !isArr(chart.xAxis[0].categories);
};

const _runAsync = (fn, mls=500) => {
  setTimeout(fn, mls)
};

const _loadItem = (
  objImpl,
  option,
  onCompleted,
  onAdded,
  onFailed
) => {
  const parentId = isLoadToChart();
  if (!parentId) {
     _loadToChartComp(objImpl, option, onCompleted, onFailed);
  } else {
    if (_isNotAllowToAdd(objImpl.adapter, option)) {
      _runAsync(() => {
        onCatch({
          error: new Error("ERR_10"),
          option,
          onFailed
        })
      })
    } else if (_isAddCategoryToSpline(option)) {
      _runAsync(() => onFailed(ALERT_CATEGORY_TO_SPLINE))
    } else {
      option.parentId = parentId;
      _loadToChart(objImpl, option, onAdded, onFailed);
    }
  }
};

const fLoadItem = (objImpl) => {
   const {
     fnFetch=fetchJson,
     api,
     adapter
   } = objImpl;
   objImpl.fnFetch = fnFetch
   return {
     loadItem: bindTo(_loadItem, objImpl),
     addPropsTo: api.addPropsTo,
     crKey: adapter.crKey
   };
};

export default fLoadItem
