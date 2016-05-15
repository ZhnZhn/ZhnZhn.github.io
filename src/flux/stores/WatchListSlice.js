
const WatchListSlice = {
  watchList : {
    groups : [
      {
         title : 'Economic Metrics',
         lists : [
           {
             title : 'List1'
           }
         ]
      },
      { title : 'Commodities' },
      { title : 'Stocks' },
      { title : 'Indexes'}
    ]
  },
  getWatchList(){
    return this.watchList
  }
}

export default WatchListSlice
