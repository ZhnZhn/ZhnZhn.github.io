import Reflux from 'reflux';

import Actions from '../actions/Actions'
import ChartActions from '../actions/ChartActions';

import ChartSlice from './ChartSlice';
import BrowserSlice from './BrowserSlice';
import ComponentSlice from './ComponentSlice';
import SettingSlice from './SettingSlice';
import AnalyticSlice from './AnalyticSlice';
import WatchListSlice from '../watch-list/WatchListSlice';
import WithLimitRemaining from './WithLimitRemaining';
import WithLoadingProgress from './WithLoadingProgress'

const ChartStore = Reflux.createStore({
  listenables: [ ...Actions ],

  init(){
    this.initWatchList();
    this.listenLoadingProgress(ChartActions.fnOnChangeStore);
  },

 ...ChartSlice,
 ...BrowserSlice,
 ...ComponentSlice,
 ...SettingSlice,
 ...AnalyticSlice,
 ...WatchListSlice,

 ...WithLimitRemaining,
 ...WithLoadingProgress

})

export default ChartStore
