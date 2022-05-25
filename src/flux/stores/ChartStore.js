import Reflux from 'reflux-core';

import Actions from '../actions/Actions'
import { ChartActions } from '../actions/ChartActions';

import ChartSlice from './ChartSlice';
import BrowserSlice from './BrowserSlice';
import ComponentSlice from './ComponentSlice';
import DialogSlice from './DialogSlice';
import SettingSlice from './SettingSlice';
import WatchListSlice from '../watch-list/WatchListSlice';
import WithLimitRemaining from './WithLimitRemaining';
import WithLoadingProgress from './WithLoadingProgress'

const ChartStore = Reflux.createStore({
  listenables: [...Actions],

  init(){
    this.initWatchList();
    this.listenLoadingProgress(ChartActions.onChangeStore);
  },

 ...ChartSlice,
 ...BrowserSlice,
 ...ComponentSlice,
 ...DialogSlice,
 ...SettingSlice,
 ...WatchListSlice,

 ...WithLimitRemaining,
 ...WithLoadingProgress
})

export default ChartStore
