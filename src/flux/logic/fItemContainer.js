import React from 'react'

import ChartContainer from '../../components/zhn-containers/ChartContainer';
import BrowserConfig from '../../constants/BrowserConfig';

import CA from '../actions/ComponentActions';
import CHA from '../actions/ChartActions';

const _isStr = str => typeof str === 'string';

const _crCaption = (dialogConf, browserType) => {
  let _caption = dialogConf.contFullCaption
    || BrowserConfig[browserType].contFullCaption;
  if (_caption) {
    return _caption;
  }

  const {
    contCaption, dialogCaption, menuTitle,
    dialogProps
  } = dialogConf
  , { dataSource= ''} = dialogProps || {};

  _caption = _isStr(contCaption)
      ? contCaption
      : dialogCaption || menuTitle || 'Item Container';
  return [dataSource, _caption]
    .filter(Boolean)
    .join(': ');
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
