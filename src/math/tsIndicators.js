import sma from './sma';
import mfi from './mfi';
import momAth from './momAth';

import {
  categoryDiff,
  categoryRate,
  categoryRoc
} from './categoryFn';
import pby10 from './pby10';

const tsIndicators = {
  sma,
  mfi,
  momAth,
  categoryRate,
  categoryDiff,
  categoryRoc,
  pby10
};

export default tsIndicators
