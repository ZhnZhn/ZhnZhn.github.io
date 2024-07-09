const WITHOUT_API_KEY = 'Without Api Key';

const _crForReqToken = (providerName) => [
   'For this type of', providerName, 'request'
].filter(Boolean).join(' ');

const AND_THEN_ENTER_KEY = 'and then enter your API key in dialog SETTINGS [s].';

const _crMsg = (
  caption,
  descr
) => ({
  caption,
  descr
})

export const setAlertMsg = (
  option,
  msg
) => {
  const {caption, descr} = msg;
  option.alertCaption = caption;
  option.alertDescr = descr;
}

const NDL = 'Nasdaq Data Link'

export const NOT_SELECTED = (
  item
) => `${item} is not selected`
export const NOT_VALID_FORMAT = (
  item
) => `${item} is not in valid format`
export const YMD_DATE_OR_EMPTY = "YYYY-MM-DD format must be OR Empty"

export const ERR_ALREADY_EXIST = _crMsg(
  'Check Error',
  'The chart for this code has already existed in a container. Please, close it and load again.'
)
export const ERR_LOADING_IN_PROGRESS = _crMsg(
  'Loading In Progress Error',
  'Loading the chart for this item-code in progress.\nIt seems several clicks on button Load repeatedly happend.'
)
export const ERR_DOUBLE_LOAD_META = _crMsg(
  'Double Load Meta Error',
  'Meta data for this code already have been loaded.'
)
export const ERR_PREMIUM_WITHOUT_KEY = _crMsg(
  WITHOUT_API_KEY,
  `403 : Forbidden\n\nYou have attempted to view a premium database in anonymous mode, i.e., without providing a ${NDL} key. Please register for a free ${NDL} account, and then enter your API in dialog SETTINGS [s].`
)
const TOKEN_API_KEY_REQUIRED = 'API key is required';
const TOKEN_PLEASE_REGISTER_FOR_FREE = 'Please register for a free';
export const ERR_FEATURE_WITHOUT_KEY = _crMsg(
  WITHOUT_API_KEY,
  `${_crForReqToken()} a ${NDL} ${TOKEN_API_KEY_REQUIRED}. ${TOKEN_PLEASE_REGISTER_FOR_FREE} ${NDL} account, ${AND_THEN_ENTER_KEY}`
)
export const withoutApiKey = (providerName) => _crMsg(
  WITHOUT_API_KEY,
  `${_crForReqToken()} a ${providerName} ${TOKEN_API_KEY_REQUIRED}. ${TOKEN_PLEASE_REGISTER_FOR_FREE} ${providerName} account, more top button A in dialog, ${AND_THEN_ENTER_KEY}`
)
export const withoutProxy = (providerName) => _crMsg(
  'Without Proxy Server',
  `${_crForReqToken(providerName)} local HTTP proxy server is required. Could be set in dialog SETTINGS [s].`
)
export const ERR_TOO_MANY_REQUEST = _crMsg(
  'Http Code 429',
  'Too many request in a given amount of time (rate limiting)'
)
export const ERR_NETWORK = _crMsg(
  'Network Error',
  'Network error is encountered. Failed to fetch. Maybe you are offline or a DNS lookup failure or a data provider does not respond.'
)
export const ERR_10 = {
  ..._crMsg(
    'Not Allowed to Add',
    "This type of request isn't allowed to be added to selected chart. It can be loaded in his own chart or view item.",
  ),
  token: 'ERR_10'
}

export const MSG_OFFLINE = 'It seems you are offline'
