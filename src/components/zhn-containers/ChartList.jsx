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
      , { id } = zhConfig || {}
      , _refChartFn = zhCompType
        ? void 0
        : bindTo(refChartFn, id);
      return crItem({
       config,
       index,
       chartType,
       props: {
         isAdminMode,
         refEl: _refChartFn,
         onCloseItem: () => {
           onCloseItem(chartType, browserType, id)
           if (_refChartFn) {
             _refChartFn()
           }
         }
       }
     });
   })}
 </div>
);

export default ChartList
