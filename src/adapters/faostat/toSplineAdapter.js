import { addToConfigDfLink } from '../AdapterFn';
import { crAdapterType1 } from '../crAdapterType1';

import {
  crSubtitle,
  crTitle,
  toDataPoints,
  crZhConfig,
  toInfo
} from './fnAdapter';

const trOption = (option, json) => {
  option.title = crTitle(json, option)
  option.subtitle = crSubtitle(json, option)
}

const addToConfig = (config, json, option) => {
  config.info = toInfo(
    json,
    option.title,
    option.subtitle
  )
  config.zhConfig = {
    ...crZhConfig(option),
    ...config.zhConfig
  }
  addToConfigDfLink(config,
    "FAOSTAT",
    `https://www.fao.org/faostat/en/#data/${option.dfDomain || ''}`
  )
  return config;
}

const toSplineAdapter = crAdapterType1({
  crData: toDataPoints,
  trOption,
  addToConfig
})

export default toSplineAdapter
