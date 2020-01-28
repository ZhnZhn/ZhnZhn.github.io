import React from 'react'

import ChartContainer from '../../components/zhn-containers/ChartContainer';
import BrowserConfig from '../../constants/BrowserConfig';

import CA from '../actions/ComponentActions';
import CHA from '../actions/ChartActions';

const _crCaption = (dialogConf, browserType) => {
  let _caption = dialogConf.chartContainerCaption
    || dialogConf.contFullCaption
    || BrowserConfig[browserType].contFullCaption;
  if (_caption) {
    return _caption;
  }

  const { dataSource='' } = dialogConf.dialogProps || {};
  _caption = dialogConf.contCaption
     || dialogConf.dialogCaption
     || dialogConf.menuTitle
     || 'Chart Container'
  return dataSource && dataSource.length>0
     ? `${dataSource}: ${_caption}`
     : _caption;
};

const fItemContainer = {
  crItemContainerEl: ({ browserType, dialogConf, store }) => {
    const { type, chartContainerComp, contWidth } = dialogConf || {}
    , Comp = chartContainerComp || ChartContainer
    , _type = type || BrowserConfig[browserType].chartContainerType
    , _caption = _crCaption(dialogConf, browserType);

    return React.createElement(Comp, {
      key: _type,
      store: store,
      caption: _caption,
      chartType: _type,
      browserType, contWidth,
      onSetActive: CA.setActiveContainer,
      onCloseContainer: CA.closeChartContainer
        .bind(null, _type, browserType),
      onSortBy: CHA.sortBy.bind(null, _type),
      updateMovingValues: CHA.updateMovingValues.bind(null, _type),
      onCloseItem: CHA.closeChart,
      onRemoveAll: CHA.removeAll.bind(null, _type, browserType)
    });
  }
};

export default fItemContainer
