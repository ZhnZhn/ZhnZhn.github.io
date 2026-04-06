import {
  splineValueDmy,
  splineValueTdmyIf
} from './tp/tpSpline';
import {
  categorySimple,
  categoryRemove
} from './tp/tpCategory';
import {
  scatterExDividend,
  scatterExValue
} from './tp/tpScatter';
import {
  stockAth
} from './tp/tpStock';

import { treeMapValue } from './tp/tpTreeMap';
import { donutValue } from './tp/tpDonut';

import _fFormatter from './crTooltipFormatter';

export const tooltipValueDmy = _fFormatter({...splineValueDmy})
export const tooltipValueTdmyIf = _fFormatter({...splineValueTdmyIf})

export const tooltipCategorySimple = _fFormatter({...categorySimple})
export const tooltipCategory = _fFormatter({...categoryRemove})

export const tooltipExDividend = _fFormatter({...scatterExDividend})
export const tooltipExValue = _fFormatter({...scatterExValue})

export const tooltipAth = _fFormatter({...stockAth})

export const tooltipDonut = _fFormatter({...donutValue})

export const tooltipTreeMap = _fFormatter({...treeMapValue})
