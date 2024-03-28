import {
  BT_BLOCKCHAIN,
  BT_COMMODITIES,
  BT_CURRENCY,
  BT_WATCH_LIST,
  BT_DB_NOMICS,
  BT_FGR,
  BT_PE,
  BT_COMEXT,
  BT_SDG,
  BT_CEI,
  BT_NDL,
  BT_US_ECONOMICS,
  BT_ENERGY,
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
  showAbout
} from '../../flux/stores/compStore';
import {
  showBrowser
} from '../../flux/stores/browserStore';

const CL_ROW = 'row__pane-topic'
, PREFIX_CL_ROW_ITEM = `${CL_ROW} item__`
, CL_BR = `${PREFIX_CL_ROW_ITEM}browser`
, CL_ORG = `${PREFIX_CL_ROW_ITEM}org`
, CL_W = `${PREFIX_CL_ROW_ITEM}watch`;

const _fBD = id => () => {
  showBrowser(id)
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

const _crMenuItems = (
  configs
) => configs
  .map(([cn, name, id]) => _crMenuItem(cn, name, id))

const PAGE_CONFIGS_01 = [
  [CL_ORG, 'DBnomics', BT_DB_NOMICS],
  [CL_BR, 'Energy', BT_ENERGY],
  [CL_BR, 'U.S. Economics', BT_US_ECONOMICS],
  [CL_BR, 'Commodities', BT_COMMODITIES],
  [CL_ORG, 'Nasdaq Data Link', BT_NDL],
]
, PAGE_CONFIGS_02 = [
  [CL_ORG, 'Overview', BT_EUROSTAT],
  [CL_ORG, 'Circular Economy', BT_CEI],
  [CL_ORG, 'Euro Indicators / PEEIs', BT_PE],
  [CL_ORG, 'EU Comext', BT_COMEXT],
  [CL_ORG, 'EU FIGARO', BT_FGR],
  [CL_ORG, 'EU SDG', BT_SDG],
]
, PAGE_CONFIGS_03 = [
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
, PAGE_CONFIGS_04 = [
  [CL_BR, 'Stock Markets', BT_STOCK_MARKETS],
  [CL_BR, 'NYSE by Sectors', BT_NYSE_STOCKS],
  [CL_BR, 'NASDAQ by Sectors', BT_NASDAQ_STOCKS]
]
, PAGE_CONFIGS_05 = [
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
    _crSubMenuItem('page_02', 'Eurostat'),
    _crSubMenuItem('page_03', 'Statistics Agencies'),
    _crSubMenuItem('page_04', 'Stock Markets'),
    _crSubMenuItem('page_05', 'World Organizations'),
    _crMenuItem(CL_BR, 'Blockchains', BT_BLOCKCHAIN),
    _crMenuItem(CL_BR, 'Currencies', BT_CURRENCY),
    _crMenuItem(CL_W, 'Watch List', BT_WATCH_LIST),
    {
      cn: CL_BR,
      name: 'About',
      onClick: showAbout,
      isClose: true
    }
  ],
  page_01: _crMenuItems(PAGE_CONFIGS_01),
  page_02: _crMenuItems(PAGE_CONFIGS_02),
  page_03: _crMenuItems(PAGE_CONFIGS_03),
  page_04: _crMenuItems(PAGE_CONFIGS_04),
  page_05: _crMenuItems(PAGE_CONFIGS_05)
})

export default crBrowserModel
