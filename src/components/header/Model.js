import { BrowserType as BT } from '../../constants/Type'

const CL = {
  BR: 'item__browser',
  EU: 'item__eurostat',
  W: 'item__watch'
};

const MODEL = [
  {
    id: BT.STOCK_MARKETS,
    cn: CL.BR,
    title: 'Stock Markets'
  },{
    id: BT.UN_COMTRADE,
    cn: CL.EU,
    title: 'UN Comtrade'
  },{
    id: BT.FAOSTAT,
    cn: CL.EU,
    title: 'FAOSTAT',
  },{
    id: BT.EUROSTAT,
    cn: CL.EU,
    title: 'Eurostat'
  },{
    id: BT.FRANCE_STATISTICS,
    cn: CL.EU,
    title: 'Insee: France Statistics'
  },{
    id: BT.NORWAY_STATISTICS,
    cn: CL.EU,
    title: 'Statistics Norway'
  },{
    id: BT.SWEDEN_STAT,
    cn: CL.EU,
    title: 'Statistics Sweden',
    isNew: true
  },{
    id: BT.QUANDL,
    isQuandl: true,
    title: 'Quandl Economic'
  },{
    id: BT.US_STOCKS,
    title: 'US Stocks by Sectors'
  },{
    id: BT.NYSE_STOCKS,
    title: 'US NYSE by Sectors'
  },{
    id: BT.NASDAQ_STOCKS,
    title: 'US NASDAQ by Sectors'
  },{
    id: BT.LONDON_STOCKS,
    title: 'LSE by Sectors'
  },{
    id: BT.PREMIUM_SAMPLE,
    title: 'Quandl Premium Sample'
  },{
    id: BT.WATCH_LIST,
    cn: CL.W,
    title: 'Watch'
  }
];

export default MODEL
