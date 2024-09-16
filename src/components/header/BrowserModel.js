import { CL_ROW__PANE_TOPIC } from '../styleFn';

import {
  BT_BLOCKCHAIN,
  BT_COMMODITIES,
  BT_CENTRAL_BANKS,
  BT_CURRENCY,
  BT_WATCH_LIST,
  BT_DB_NOMICS,
  BT_FGR,
  BT_PE,
  BT_COMEXT,
  BT_SDG,
  BT_MIP,
  BT_CEI,
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
  BT_SWISS_STAT,
  BT_STOCK_MARKETS,
  BT_NYSE_STOCKS,
  BT_NASDAQ_STOCKS,
  BT_FAOSTAT,
  BT_UN_COMTRADE,
  BT_WORLD_BANK,
  BT_WTO
} from '../../constants/BrowserType';

import {
  showAbout
} from '../../flux/stores/compStore';
import {
  showBrowser
} from '../../flux/stores/browserStore';

import {
  crSubItem,
  crItem,
  crSliderMenu
} from '../menuModelFn';

const PREFIX_CL_ROW_ITEM = `${CL_ROW__PANE_TOPIC} item__`
, CL_BR = `${PREFIX_CL_ROW_ITEM}browser`
, CL_ORG = `${PREFIX_CL_ROW_ITEM}org`
, CL_W = `${PREFIX_CL_ROW_ITEM}watch`;

const _crSubMenuItem = (
  id,
  name
) => crSubItem(id, name, CL_BR)
, _crMenuItem = (
  cn,
  name,
  id
) => crItem(
  name,
  () => showBrowser(id),
  true,
  cn
);

const _crMenuItems = (
  configs
) => configs
  .map(([cn, name, id]) => _crMenuItem(cn, name, id))

const PAGE_CONFIGS_1 = [
  [CL_BR, 'Central Banks', BT_CENTRAL_BANKS],
  [CL_ORG, 'DBnomics', BT_DB_NOMICS],
  [CL_BR, 'Energy', BT_ENERGY],
  [CL_BR, 'U.S. Economics', BT_US_ECONOMICS],
  [CL_BR, 'Commodities', BT_COMMODITIES]
]
, PAGE_CONFIGS_2 = [
  [CL_ORG, 'Overview', BT_EUROSTAT],
  [CL_ORG, 'Circular Economy', BT_CEI],
  [CL_ORG, 'Euro Indicators / PEEIs', BT_PE],
  [CL_ORG, 'EU Comext', BT_COMEXT],
  [CL_ORG, 'EU FIGARO', BT_FGR],
  [CL_ORG, 'EU MIP', BT_MIP],
  [CL_ORG, 'EU SDG', BT_SDG],
]
, PAGE_CONFIGS_3 = [
  [CL_ORG, 'INSEE: Statistics France', BT_FRANCE_STATISTICS],
  [CL_ORG, 'ONS: Statistics UK', BT_UK_STATISTICS],
  [CL_ORG, 'Statistics Norway', BT_NORWAY_STATISTICS],
  [CL_ORG, 'Statistics Norway All', BT_NORWAY_STAT_ALL],
  [CL_ORG, 'Statistics Sweden', BT_SWEDEN_STAT],
  [CL_ORG, 'Statistics Sweden All', BT_SWEDEN_STAT_ALL],
  [CL_ORG, 'Statistics Finland All', BT_FINLAND_STAT_ALL],
  [CL_ORG, 'Statistics Denmark All', BT_DENMARK_STAT_ALL],
  [CL_ORG, 'CSO: Statistics Ireland All', BT_IRELAND_STAT_ALL],
  [CL_ORG, 'FSO: Statistics Swiss', BT_SWISS_STAT]
]
, PAGE_CONFIGS_4 = [
  [CL_BR, 'Stock Markets', BT_STOCK_MARKETS],
  [CL_BR, 'NYSE by Sectors', BT_NYSE_STOCKS],
  [CL_BR, 'NASDAQ by Sectors', BT_NASDAQ_STOCKS]
]
, PAGE_CONFIGS_5 = [
  [CL_ORG, 'FAOSTAT', BT_FAOSTAT],
  [CL_ORG, 'UN Comtrade', BT_UN_COMTRADE],
  [CL_ORG, 'World Bank', BT_WORLD_BANK],
  [CL_ORG, 'WTO', BT_WTO]
];

const crBrowserModel = () => crSliderMenu(
  CL_BR,
  235,
  2, {
    p0: [
      _crSubMenuItem('p1', 'Economics'),
      _crSubMenuItem('p2', 'Eurostat'),
      _crSubMenuItem('p3', 'Statistics Agencies'),
      _crSubMenuItem('p4', 'Stock Markets'),
      _crSubMenuItem('p5', 'World Organizations'),
      _crMenuItem(CL_BR, 'Blockchains', BT_BLOCKCHAIN),
      _crMenuItem(CL_BR, 'Currencies', BT_CURRENCY),
      _crMenuItem(CL_W, 'Watch List', BT_WATCH_LIST),
      crItem('About', showAbout, true, CL_BR)
    ],
    p1: _crMenuItems(PAGE_CONFIGS_1),
    p2: _crMenuItems(PAGE_CONFIGS_2),
    p3: _crMenuItems(PAGE_CONFIGS_3),
    p4: _crMenuItems(PAGE_CONFIGS_4),
    p5: _crMenuItems(PAGE_CONFIGS_5)
  }
);

export default crBrowserModel
