import Reflux from 'reflux-core';

import Actions from '../actions/Actions'

import ChartSlice from './ChartSlice';
import BrowserSlice from './BrowserSlice';
import SettingSlice from './SettingSlice';
import WatchListSlice from '../watch-list/WatchListSlice';

const ChartStore = Reflux.createStore({
  listenables: [...Actions],

  init(){
    this.initWatchList();
  },

 ...ChartSlice,
 ...BrowserSlice,
 ...SettingSlice,
 ...WatchListSlice

})

export default ChartStore
