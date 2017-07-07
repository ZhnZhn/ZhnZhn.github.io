import { fnFetch } from '../../utils/fn'

import AlphaApi from '../../api/AlphaApi'
import AlphaAdapter from '../../adapters/alpha/AlphaAdapter'

import loadItem from './loadItem'

const loadAlpha = loadItem({
  fnFetch: fnFetch,
  api: AlphaApi,
  adapter: AlphaAdapter
})

export default loadAlpha
