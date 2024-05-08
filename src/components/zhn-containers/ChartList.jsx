import { safeMap, bindTo } from '../uiApi';
import { crItem } from '../factories/ItemFactory';

const ChartList = ({
  refChartFn,
  configs,
  chartType,
  browserType,
  isAdminMode,
  onCloseItem
}) => (
 <div>
   {safeMap(configs, (config, index) => {
      const {
        zhConfig,
        zhCompType
      } = config
      , { id } = zhConfig || {};
      return crItem({
       config,
       index,
       chartType,
       props: {
         isAdminMode,
         refEl: zhCompType
           ? void 0
           : bindTo(refChartFn, index),
         onCloseItem: () => onCloseItem(chartType, browserType, id)
       }
     });
   })}
 </div>
);

export default ChartList
