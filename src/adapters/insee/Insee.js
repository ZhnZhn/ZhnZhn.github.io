import { fetchTxt } from '../../utils/fnFetch'

import api from './InseeApi'
import adapter from './InseeAdapter'

const Insee = {
  fnFetch: fetchTxt,
  api, adapter
};

export default Insee
