
import api from './BarchartApi'
import adapter from './BarchartAdapter'

const Barchart = {
  optionFetch: {
    jsonpCallbackFunction: 'BarchartAPIcallback'
  },
  api, adapter
};

export default Barchart
