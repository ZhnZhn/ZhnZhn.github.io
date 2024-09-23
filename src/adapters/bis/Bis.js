import { fetchTxt } from '../../utils/fnFetch';

import api from './BisApi';
import adapter from './BisAdapter';

const Bis = {
  fnFetch: fetchTxt,
  api,
  adapter
};

export default Bis
