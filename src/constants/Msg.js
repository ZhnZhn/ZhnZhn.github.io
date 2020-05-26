
const Msg = {
  setAlertMsg : (option, msg) => {
    const {caption, descr} = msg;
    option.alertCaption = caption;
    option.alertDescr = descr;
  },

  IS_EMPTY_NAME : (item) => `${item} name can not be empty.`,
  NOT_SELECTED : (item) => `${item} is not selected.`,

  NOT_VALID_FORMAT : (item) => `${item} is not in valid format.`,
  YMD_DATE_OR_EMPTY : "YYYY-MM-DD format must be OR Empty",

  Alert : {
     ALREADY_EXIST : {
        caption : 'Check Error',
        descr: 'The chart for this code has already existed in a container. Please, close it and load again.'
     },
     LOADING_IN_PROGRESS : {
        caption : 'Loading In Progress Error',
        descr: 'Loading the chart for this item-code in progress.\nIt seems several clicks on button Load repeatedly happend.'
     },
     DOUBLE_LOAD_META : {
       caption : 'Double Load Meta Error',
       descr: 'Meta data for this code already have been loaded.'
     },
     PREMIUM_WITHOUT_KEY : {
       caption : 'Without Key',
       descr : '403 : Forbidden\n\nYou have attempted to view a premium database in anonymous mode, i.e., without providing a Quandl key. Please register for a free Quandl account, and then enter your API in dialog SETTINGS [s].'
     },
     FEATURE_WITHOUT_KEY : {
       caption : 'Without API Key',
       descr : 'For this type of request required a Quandl API key. Please register for a free Quandl account, and then enter your API key in dialog SETTINGS [s].'
     },
     withoutApiKey: (providerName) => {
       return {
         caption : 'Without API Key',
         descr : `For this type of request required a ${providerName} API key. Please register for a free ${providerName} account, more top button A in dialog, and then enter your API key in dialog SETTINGS [s].`
       };
     },
     RUNTIME_ERROR : {
        caption : 'Runtime Error'
     },
     TOO_MANY_REQUEST: {
       caption: 'Http Code 429',
       descr: 'Too many request in a given amount of time (rate limiting)'
     },
     NETWORK_ERROR : {
        caption : 'Network Error',
        descr: 'Network error is encountered. Failed to fetch. Maybe you are offline or a DNS lookup failure or a data provider does not respond.'
     },
     ERR_10: {
       token: 'ERR_10',
       caption: 'Not Allowed to Add',
       descr: "This type of request isn't allowed to be added to selected chart. This type of request can be loaded in his own chart.",
     }
  }
}

export default Msg
