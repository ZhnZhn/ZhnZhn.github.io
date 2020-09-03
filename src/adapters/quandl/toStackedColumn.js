import { ChartType } from '../../constants/Type';
import fnStacked from './fnStacked'

const { crConfig  } = fnStacked;

const toStackedColumn = (json, option) => crConfig({
   type: 'column',
   percentType: ChartType.STACKED_COLUMN_PERCENT,
   json, option
});

export default toStackedColumn
