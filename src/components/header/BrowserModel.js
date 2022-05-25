import {
  BT_FUTURES,
  BT_BLOCKCHAIN,
  BT_WATCH_LIST,
  BT_DB_NOMICS,
  BT_FGR,
  BT_PE,
  BT_QUANDL,
  BT_US_ECONOMICS,
  BT_EUROSTAT,
  BT_FRANCE_STATISTICS,
  BT_UK_STATISTICS,
  BT_NORWAY_STATISTICS,
  BT_NORWAY_STAT_ALL,
  BT_SWEDEN_STAT,
  BT_SWEDEN_STAT_ALL,
  BT_FINLAND_STAT_ALL,
  BT_DENMARK_STAT_ALL,
  BT_IRELAND_STAT_ALL,
  BT_STOCK_MARKETS,
  BT_NYSE_STOCKS,
  BT_NASDAQ_STOCKS,
  BT_FAOSTAT,
  BT_UN_COMTRADE,
  BT_WORLD_BANK
} from '../../constants/BrowserType';

import {
  ComponentActions
} from '../../flux/actions/ComponentActions';
import {
  BrowserActions
} from '../../flux/actions/BrowserActions';

const CL_ROW = 'row__pane-topic'
, CL_BR = `${CL_ROW} item__browser`
, CL_Q = `${CL_ROW} item__quandl`
, CL_DBN = `${CL_ROW} item__dbnomics`
, CL_ORG = `${CL_ROW} item__org`
, CL_W = `${CL_ROW} item__watch`
, CL_AB = `${CL_ROW} item__about`;

const _fBD = id => () => {
  BrowserActions.showBrowserDynamic(id)
};

const _crSubMenuItem = (
  id,
  name
) => ({
  id,
  name,
  type: 'sub',
  cn: CL_BR
})

const _crMenuItem = (
  cn,
  name,
  id
) => ({
  cn,
  name,
  onClick: _fBD(id),
  isClose: true
})

const _crMenuItems = (configs) => configs
  .map(([cn, name, id]) => _crMenuItem(cn, name, id))

const PAGE_CONFIGS_01 = [
  [CL_DBN, 'DB Nomics', BT_DB_NOMICS],
  [CL_ORG, 'EU: FIGARO', BT_FGR],
  [CL_ORG, 'Euro Indicators / PEEIs', BT_PE],
  [CL_Q, 'Quandl', BT_QUANDL],
  [CL_BR, 'USA Economics', BT_US_ECONOMICS]
]
, PAGE_CONFIGS_02 = [
  [CL_ORG, 'Eurostat', BT_EUROSTAT],
  [CL_ORG, 'Insee: France Statistics', BT_FRANCE_STATISTICS],
  [CL_ORG, 'ONS: UK Statistics', BT_UK_STATISTICS],
  [CL_ORG, 'Statistics Norway', BT_NORWAY_STATISTICS],
  [CL_ORG, 'Statistics Norway All', BT_NORWAY_STAT_ALL],
  [CL_ORG, 'Statistics Sweden', BT_SWEDEN_STAT],
  [CL_ORG, 'Statistics Sweden All', BT_SWEDEN_STAT_ALL],
  [CL_ORG, 'Statistics Finland All', BT_FINLAND_STAT_ALL],
  [CL_ORG, 'Statistics Denmark All', BT_DENMARK_STAT_ALL],
  [CL_ORG, 'CSO Ireland All', BT_IRELAND_STAT_ALL]
]
, PAGE_CONFIGS_03 = [
  [CL_BR, 'Stock Markets', BT_STOCK_MARKETS],
  [CL_BR, 'NYSE by Sectors', BT_NYSE_STOCKS],
  [CL_BR, 'NASDAQ by Sectors', BT_NASDAQ_STOCKS]
]
, PAGE_CONFIGS_04 = [
  [CL_ORG, 'FAOSTAT', BT_FAOSTAT],
  [CL_ORG, 'UN Comtrade', BT_UN_COMTRADE],
  [CL_ORG, 'World Bank', BT_WORLD_BANK]
];

const crBrowserModel = () => ({
  titleCl: CL_BR,
  pageWidth: 235,
  maxPages: 2,
  initId: 'page_0',
  page_0: [
    _crSubMenuItem('page_01', 'Economics'),
    _crSubMenuItem('page_02', 'Statistics Agencies'),
    _crSubMenuItem('page_03', 'Stock Markets'),
    _crSubMenuItem('page_04', 'World Organizations'),
    _crMenuItem(CL_BR, 'Futures Markets', BT_FUTURES),
    _crMenuItem(CL_BR, 'Blockchain', BT_BLOCKCHAIN),
    _crMenuItem(CL_W, 'Watch List', BT_WATCH_LIST),
    {
      cn: CL_AB,
      name: 'About',
      onClick: ComponentActions.showAbout,
      isClose: true
    }
  ],
  page_01: _crMenuItems(PAGE_CONFIGS_01),
  page_02: _crMenuItems(PAGE_CONFIGS_02),
  page_03: _crMenuItems(PAGE_CONFIGS_03),
  page_04: _crMenuItems(PAGE_CONFIGS_04)
})

export default crBrowserModel
