import {
  bindTo
} from '../uiApi';

import {
  crValueMoving,
  crId
} from '../../charts/ChartFn';

import {
  ComponentActions
} from '../../flux/actions/ComponentActions';
import {
  setActiveCheckbox
} from '../../flux/stores/chartCheckBoxLogic';
import {
  moveToTop,
  copyChart,
  getCopyFromChart
} from '../../flux/stores/itemStore';

import {
  CIT_EUROSTAT_MAP,
  CIT_TABLE,
  CIT_ALPHA_PERF,
  CIT_INFO_ITEM,
  CIT_TW_LIST
} from '../../constants/CompItemType';

import {
  ChartItem,
  MapChartItem,
  TableItem,
  AlphaPerfItem,
  InfoItem,
  TwListItem
} from '../items/Items';

const _getIdKey = (
  config,
  index
) => {
  const { zhConfig } = config
  , { id, key } = zhConfig || {};
  return [id || `Id:${index}`, key || id || crId()];
};

const _fAddToWatch = (
  caption,
  config
) => () => ComponentActions
 .showAddToWatch({
   caption,
   config
 });

const _fOnPasteToDialog = () => toChart =>
  ComponentActions.showPasteTo({
    toChart,
    fromChart: getCopyFromChart()
  });


const _crAreaChart = ({
  config,
  index,
  chartType,
  props
}) => {
  const [id, key] = _getIdKey(config, index);
  return (
    <ChartItem
       key={key}
       chartType={chartType}
       caption={id}
       config={config}
       onSetActive={setActiveCheckbox}
       onAddToWatch={_fAddToWatch(id, config)}
       {...props}
       crValueMoving={crValueMoving}
       onToTop={bindTo(moveToTop, chartType, id)}
       onCopy={copyChart}
       onPasteTo={_fOnPasteToDialog()}
       onZoom={ComponentActions.zoom}
    />
  );
};

const _crMapChart = ({
  config,
  index,
  chartType,
  props
}) => {
  const [id, key] = _getIdKey(config, index);
  return(
    <MapChartItem
       key={key}
       chartType={chartType}
       caption={id}
       config={config}
       {...props}
    />
  );
};

const _fItem = (Comp) => ({
  config={},
  props
}) => (
  <Comp
    key={config.id}
    config={config}
    {...props}
  />
);

const _rCrItem = {
  DF: _crAreaChart,
  [CIT_EUROSTAT_MAP]: _crMapChart,
  [CIT_TABLE]: _fItem(TableItem),
  [CIT_ALPHA_PERF]: _fItem(AlphaPerfItem),
  [CIT_INFO_ITEM]: _fItem(InfoItem),
  [CIT_TW_LIST]: _fItem(TwListItem)
};

/* { config, index, chartType, props, store } */
export const crItem = (itemOptions) => {
  const { config } = itemOptions
  , { zhCompType } = config || {}
  , _crItem = _rCrItem[zhCompType] || _rCrItem.DF;
  return _crItem(itemOptions);
}
