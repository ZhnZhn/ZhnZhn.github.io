import api from './ImfTsApi';
import { toRouteTsLineAdapter } from '../toTsLineAdapter';

const ImfTs = {
  api,
  adapter: toRouteTsLineAdapter
};

export default ImfTs
