import { CL_ROW__PANE_TOPIC } from '../styleFn';

import {
  BT_BLOCKCHAIN,
  BT_COMMODITIES,
  BT_OECD,
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
  name,
  id
) => crSubItem(id, name, CL_BR)
, _crMenuItem = (
  name,
  id,
  cn
) => crItem(
  name,
  () => showBrowser(id),
  true,
  cn
);

const _crMenuItems = (
  configs
) => configs
  .map(([name, id]) => _crMenuItem(name, id, CL_ORG))

const PAGE_CONFIGS_1 = [
  ['Central Banks', BT_CENTRAL_BANKS],
  ['DBnomics', BT_DB_NOMICS],
  ['Energy', BT_ENERGY],
  ['U.S. Economics', BT_US_ECONOMICS],
  ['Commodities', BT_COMMODITIES],
  ['OECD', BT_OECD]
]
, PAGE_CONFIGS_2 = [
  ['Overview', BT_EUROSTAT],
  ['Circular Economy', BT_CEI],
  ['Euro Indicators / PEEIs', BT_PE],
  ['EU Comext', BT_COMEXT],
  ['EU FIGARO', BT_FGR],
  ['EU MIP', BT_MIP],
  ['EU SDG', BT_SDG],
]
, PAGE_CONFIGS_3 = [
  ['INSEE: Statistics France', BT_FRANCE_STATISTICS],
  ['ONS: Statistics UK', BT_UK_STATISTICS],
  ['Statistics Norway', BT_NORWAY_STAT_ALL],
  ['Statistics Norway (A)', BT_NORWAY_STATISTICS],
  ['Statistics Sweden', BT_SWEDEN_STAT_ALL],
  ['Statistics Sweden (A)', BT_SWEDEN_STAT],
  ['Statistics Finland', BT_FINLAND_STAT_ALL],
  ['Statistics Denmark', BT_DENMARK_STAT_ALL],
  ['CSO: Statistics Ireland', BT_IRELAND_STAT_ALL],
  ['FSO: Statistics Swiss', BT_SWISS_STAT]
]
, PAGE_CONFIGS_4 = [
  ['Stock Markets', BT_STOCK_MARKETS],
  ['NYSE by Sectors', BT_NYSE_STOCKS],
  ['NASDAQ by Sectors', BT_NASDAQ_STOCKS]
]
, PAGE_CONFIGS_5 = [
  ['FAOSTAT', BT_FAOSTAT],
  ['UN Comtrade', BT_UN_COMTRADE],
  ['World Bank', BT_WORLD_BANK],
  ['WTO', BT_WTO]
];

const crBrowserModel = () => crSliderMenu(
  CL_BR,
  215,
  2, {
    p0: [
      _crSubMenuItem('Economics', 'p1'),
      _crSubMenuItem('Eurostat', 'p2'),
      _crSubMenuItem('Statistics Agencies', 'p3'),
      _crSubMenuItem('Stock Markets', 'p4'),
      _crSubMenuItem('World Organizations', 'p5'),
      _crMenuItem('Blockchains', BT_BLOCKCHAIN, CL_BR),
      _crMenuItem('Currencies', BT_CURRENCY, CL_BR),
      _crMenuItem('Watch List', BT_WATCH_LIST, CL_W),
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
