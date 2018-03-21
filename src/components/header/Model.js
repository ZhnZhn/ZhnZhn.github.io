import { BrowserType as BT } from '../../constants/Type'

const CL = {
  BR: 'item__browser',
  EU: 'item__eurostat',
  W: 'item__watch',
  AB: 'item__about'
};

const MODEL = {
  page_0: [
    {
      id: 'page_01',
      type: 'sub',
      cn: CL.BR,
      title: 'Economics'
    },{
      id: 'page_02',
      type: 'sub',
      cn: CL.BR,
      title: 'Statistics Agencies'
    },{
      id: 'page_03',
      type: 'sub',
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
      id: BT.WORLD_BANK,
      cn: CL.EU,
      title: 'World Bank'
    },{
      id: BT.BLOCKCHAIN,
      cn: CL.BR,
      title: 'Blockchain'
    },{
      id: BT.PREMIUM_SAMPLE,
      title: 'Quandl Premium Sample'
    },{
      id: BT.WATCH_LIST,
      cn: CL.W,
      title: 'Watch'
    }
    /*
    ,{
      id: 'ABOUT',
      cn: CL.AB,
      title: 'About'
    }
    */
  ],
  page_01: [
    {
      id: BT.QUANDL,
      isQuandl: true,
      title: 'World Economy'
    },{
      id: BT.US_ECONOMY,
      cn: CL.BR,
      title: 'U.S. Economy'
    }
  ],
  page_02: [
    {
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
      id: BT.NORWAY_STAT_ALL,
      cn: CL.EU,
      title: 'Statistics Norway All'
    },{
      id: BT.SWEDEN_STAT,
      cn: CL.EU,
      title: 'Statistics Sweden'
    },{
      id: BT.SWEDEN_STAT_ALL,
      cn: CL.EU,
      title: 'Statistics Sweden All'
    }
  ],
  page_03: [
    {
       id: BT.STOCK_MARKETS,
       cn: CL.BR,
       title: 'Stock Markets'
    },{
      id: BT.NYSE_STOCKS,
      title: 'NYSE by Sectors'
    },{
      id: BT.NASDAQ_STOCKS,
      title: 'NASDAQ by Sectors'
    },{
      id: BT.US_STOCKS,
      title: '1000 Stocks by Sectors'
    },{
      id: BT.LONDON_STOCKS,
      title: 'LSE by Sectors'
    }
  ]
};

export default MODEL
