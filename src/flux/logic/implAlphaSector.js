import { fnFetch } from '../../utils/fn'
import api from '../../api/AlphaApi'
import adapter from '../../adapters/alpha/AlphaSectorAdapter'

import loadItem from './loadItem'

const loadAlphaSector = loadItem({
  fnFetch, api, adapter
})

export default loadAlphaSector
