import { BrowserType as BT } from '../../constants/Type'

import CA from '../../flux/actions/ComponentActions'
import BA from '../../flux/actions/BrowserActions'

const CL_ROW = 'row__pane-topic'
, CL_BR = `${CL_ROW} item__browser`
, CL_Q = `${CL_ROW} item__quandl`
, CL_DBN = `${CL_ROW} item__dbnomics`
, CL_ORG = `${CL_ROW} item__org`
, CL_W = `${CL_ROW} item__watch`
, CL_AB = `${CL_ROW} item__about`;

const _fBD = id => () => {
  BA.showBrowserDynamic(id)
};

const crBrowserModel = () => {
  return {
    titleCl: CL_BR,
    pageWidth: 235,
    maxPages: 2,
    initId: 'page_0',
    page_0: [
      {
        id: 'page_01',
        type: 'sub',
        cn: CL_BR,
        name: 'Economics'
      },{
        id: 'page_02',
        type: 'sub',
        cn: CL_BR,
        name: 'Statistics Agencies'
      },{
        id: 'page_03',
        type: 'sub',
        cn: CL_BR,
        name: 'Stock Markets'
      },{
        id: 'page_04',
        type: 'sub',
        cn: CL_BR,
        name: 'World Organizations'
      },{
         cn: CL_BR,
         name: 'Futures Markets',
         onClick: _fBD(BT.FUTURES),
         isClose: true
      },{
        cn: CL_BR,
        name: 'Blockchain',
        onClick: _fBD(BT.BLOCKCHAIN),
        isClose: true
      },{
        cn: CL_W,
        name: 'Watch List',
        onClick: _fBD(BT.WATCH_LIST),
        isClose: true
      },{
        cn: CL_AB,
        name: 'About',
        onClick: CA.showAbout,
        isClose: true
      }
    ],
    page_01: [
      {
        cn: CL_DBN,
        name: 'DB Nomics',
        onClick: _fBD(BT.DB_NOMICS),
        isClose: true
      },{
        cn: CL_ORG,
        name: 'EU: FIGARO',
        onClick: _fBD(BT.FGR),
        isClose: true
      },{
        cn: CL_ORG,
        name: 'Euro Indicators / PEEIs',
        onClick: _fBD(BT.PE),
        isClose: true
      },{
        cn: CL_Q,
        name: 'Quandl',
        onClick: _fBD(BT.QUANDL),
        isClose: true
      },{
        cn: CL_BR,
        name: 'USA Economics',
        onClick: _fBD(BT.US_ECONOMICS),
        isClose: true
      }
    ],
    page_02: [
      {
        cn: CL_ORG,
        name: 'Eurostat',
        onClick: _fBD(BT.EUROSTAT),
        isClose: true
      },{
        cn: CL_ORG,
        name: 'Insee: France Statistics',
        onClick: _fBD(BT.FRANCE_STATISTICS),
        isClose: true
      },{
        cn: CL_ORG,
        name: 'ONS: UK Statistics',
        onClick: _fBD(BT.UK_STATISTICS),
        isClose: true
      },{
        cn: CL_ORG,
        name: 'Statistics Norway',
        onClick: _fBD(BT.NORWAY_STATISTICS),
        isClose: true
      },{
        cn: CL_ORG,
        name: 'Statistics Norway All',
        onClick: _fBD(BT.NORWAY_STAT_ALL),
        isClose: true
      },{
        cn: CL_ORG,
        name: 'Statistics Sweden',
        onClick: _fBD(BT.SWEDEN_STAT),
        isClose: true
      },{
        cn: CL_ORG,
        name: 'Statistics Sweden All',
        onClick: _fBD(BT.SWEDEN_STAT_ALL),
        isClose: true
      },{
        cn: CL_ORG,
        name: 'Statistics Finland All',
        onClick: _fBD(BT.FINLAND_STAT_ALL),
        isClose: true
      },{
        cn: CL_ORG,
        name: 'Statistics Denmark All',
        onClick: _fBD(BT.DENMARK_STAT_ALL),
        isClose: true
      },{
        cn: CL_ORG,
        name: 'CSO Ireland All',
        onClick: _fBD(BT.IRELAND_STAT_ALL),
        isClose: true
      }
    ],
    page_03: [
      {
         cn: CL_BR,
         name: 'Stock Markets',
         onClick: _fBD(BT.STOCK_MARKETS),
         isClose: true
      },{
        cn: CL_BR,
        name: 'NYSE by Sectors',
        onClick: _fBD(BT.NYSE_STOCKS),
        isClose: true
      },{
        cn: CL_BR,
        name: 'NASDAQ by Sectors',
        onClick: _fBD(BT.NASDAQ_STOCKS),
        isClose: true
      }
    ],
    page_04: [
      {
        cn: CL_ORG,
        name: 'FAOSTAT',
        onClick: _fBD(BT.FAOSTAT),
        isClose: true
      },{
        cn: CL_ORG,
        name: 'UN Comtrade',
        onClick: _fBD(BT.UN_COMTRADE),
        isClose: true
      },{
        cn: CL_ORG,
        name: 'World Bank',
        onClick: _fBD(BT.WORLD_BANK),
        isClose: true
      }
    ]
  };
}

export default crBrowserModel
