import {
  loadSparklines
} from '../../routers/loadAsset';
import {
  crModuleDefault,
  crRetryableLazy
} from './crRetryableLazy';

const _fLazy = compName => () => loadSparklines()
  .then(moduleDefault => crModuleDefault(moduleDefault[compName]))

export const SparkView = crRetryableLazy(_fLazy('SparkView'))
export const Line = crRetryableLazy(_fLazy('Line'))
export const Bars = crRetryableLazy(_fLazy('Bars'))
export const ReferenceLine = crRetryableLazy(_fLazy('ReferenceLine'))
export const Spot = crRetryableLazy(_fLazy('Spot'))
export const Spots = crRetryableLazy(_fLazy('Spot'))
export const MaxLabel = crRetryableLazy(_fLazy('MaxLabel'))
export const MinLabel = crRetryableLazy(_fLazy('MinLabel'))
