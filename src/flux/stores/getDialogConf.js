import { getSourceConfig } from './browserLogic';

export const getDialogConf = (
  conf,
  chartType
) => {
  //DialogStatN
  if (conf && conf.dialogConf) {
    return conf;
  }
  const _browserId = chartType.split('_')[0];
  return getSourceConfig(_browserId, chartType);
}
