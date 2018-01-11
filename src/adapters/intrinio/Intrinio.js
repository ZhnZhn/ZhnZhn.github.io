import api from './IntrinioApi'
import adapter from './IntrinioAdapter'

const Intrinio = {
  optionFetch: api.crOptionFetch,
  api,
  adapter
}

export default Intrinio
