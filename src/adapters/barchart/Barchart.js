import { fetchJsonp } from '../../utils/fnFetch'
import api from './BarchartApi'
import adapter from './BarchartAdapter'

const Barchart = {
  fnFetch: fetchJsonp,
  optionFetch: {
    jsonpCallbackFunction: 'BarchartAPIcallback'
  },
  api, adapter
};

export default Barchart
