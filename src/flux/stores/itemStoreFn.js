import { getFromDate } from '../../utils/dateFn';

import {
  ERR_FEATURE_WITHOUT_KEY,
  ERR_PREMIUM_WITHOUT_KEY,
  withoutApiKey,
  withoutProxy
} from '../../constants/Msg';

import {
  getSourceConfig
} from './browserLogic';

import {
  addSettingTo,
  isApiKeyRequired,
  getApiTitle,
  isProxyRequired
} from '../stores/settingStore';

const _assign = Object.assign;

export const addSettingsTo = (
  options,
  confItem,
  itemProps
) => {
  const { loadId } = options;
  _assign(options, confItem, itemProps)
  addSettingTo(options, loadId)
}

const _checkMsgApiKey = ({
  apiKey,
  loadId,
  isKeyFeature,
  isPremium
}) => apiKey
  ? ''
  : isApiKeyRequired(loadId)
    ? withoutApiKey(getApiTitle(loadId))
    : isKeyFeature
       ? ERR_FEATURE_WITHOUT_KEY
       : isPremium
          ? ERR_PREMIUM_WITHOUT_KEY
          : '';

const _checkProxy = ({
  proxy,
  loadId
}) => isProxyRequired(loadId) && !proxy
  ? withoutProxy(getApiTitle(loadId))
  : '';

export const crMsgSetting = (
  option
) => _checkMsgApiKey(option) || _checkProxy(option)

const SUBTITLE = 'Loaded from URL Query';
const _assignDialogPropsTo = (option) => {
  const {
    chartType,
    browserType
  } = option
  , { dialogProps } = getSourceConfig(browserType, chartType) || {}
  , { dfProps } = dialogProps || {};

  _assign(option, dialogProps, dfProps, {
      subtitle: SUBTITLE
    }
  )
}

const _initOptionFromDateIf = (option) => {
  const {
    fromDate,
    nInitFromDate
  } = option;
  if (!fromDate) {
    option.fromDate = nInitFromDate
      ? getFromDate(nInitFromDate)
      : getFromDate(2)
  }
}

//Load item from query
export const addDialogPropsTo = option => {
  _assignDialogPropsTo(option)
  _initOptionFromDateIf(option)
}
