import { fToKline } from '../fToKline';
import {
  getData,
  klineOptions
} from './fnAdapter';



const toHistorical = fToKline({
  ...klineOptions,
  getData,
  c: 'close'
});

export default toHistorical
