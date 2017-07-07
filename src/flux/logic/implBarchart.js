import { fnFetch } from '../../utils/fnJsonp'

import BarchartApi from '../../api/BarchartApi'
import BarchartAdapter from '../../adapters/barchart/BarchartAdapter'

import loadItem from './loadItem'

const loadBarchart = loadItem({
  fnFetch: fnFetch,
  api: BarchartApi,
  adapter: BarchartAdapter
})

export default loadBarchart
