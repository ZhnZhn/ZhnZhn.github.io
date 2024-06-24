"use strict";

exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _BrowserType = require("../../constants/BrowserType");
var _compStore = require("../../flux/stores/compStore");
var _browserStore = require("../../flux/stores/browserStore");
const PREFIX_CL_ROW_ITEM = _styleFn.CL_ROW__PANE_TOPIC + " item__",
  CL_BR = PREFIX_CL_ROW_ITEM + "browser",
  CL_ORG = PREFIX_CL_ROW_ITEM + "org",
  CL_W = PREFIX_CL_ROW_ITEM + "watch";
const _fBD = id => () => {
  (0, _browserStore.showBrowser)(id);
};
const _crSubMenuItem = (id, name) => ({
  id,
  name,
  type: 'sub',
  cn: CL_BR
});
const _crMenuItem = (cn, name, id) => ({
  cn,
  name,
  onClick: _fBD(id),
  isClose: true
});
const _crMenuItems = configs => configs.map(_ref => {
  let [cn, name, id] = _ref;
  return _crMenuItem(cn, name, id);
});
const PAGE_CONFIGS_01 = [[CL_ORG, 'DBnomics', _BrowserType.BT_DB_NOMICS], [CL_BR, 'Energy', _BrowserType.BT_ENERGY], [CL_BR, 'U.S. Economics', _BrowserType.BT_US_ECONOMICS], [CL_BR, 'Commodities', _BrowserType.BT_COMMODITIES], [CL_ORG, 'Nasdaq Data Link', _BrowserType.BT_NDL]],
  PAGE_CONFIGS_02 = [[CL_ORG, 'Overview', _BrowserType.BT_EUROSTAT], [CL_ORG, 'Circular Economy', _BrowserType.BT_CEI], [CL_ORG, 'Euro Indicators / PEEIs', _BrowserType.BT_PE], [CL_ORG, 'EU Comext', _BrowserType.BT_COMEXT], [CL_ORG, 'EU FIGARO', _BrowserType.BT_FGR], [CL_ORG, 'EU MIP', _BrowserType.BT_MIP], [CL_ORG, 'EU SDG', _BrowserType.BT_SDG]],
  PAGE_CONFIGS_03 = [[CL_ORG, 'INSEE: Statistics France', _BrowserType.BT_FRANCE_STATISTICS], [CL_ORG, 'ONS: Statistics UK', _BrowserType.BT_UK_STATISTICS], [CL_ORG, 'Statistics Norway', _BrowserType.BT_NORWAY_STATISTICS], [CL_ORG, 'Statistics Norway All', _BrowserType.BT_NORWAY_STAT_ALL], [CL_ORG, 'Statistics Sweden', _BrowserType.BT_SWEDEN_STAT], [CL_ORG, 'Statistics Sweden All', _BrowserType.BT_SWEDEN_STAT_ALL], [CL_ORG, 'Statistics Finland All', _BrowserType.BT_FINLAND_STAT_ALL], [CL_ORG, 'Statistics Denmark All', _BrowserType.BT_DENMARK_STAT_ALL], [CL_ORG, 'CSO: Statistics Ireland All', _BrowserType.BT_IRELAND_STAT_ALL], [CL_ORG, 'FSO: Statistics Swiss', _BrowserType.BT_SWISS_STAT]],
  PAGE_CONFIGS_04 = [[CL_BR, 'Stock Markets', _BrowserType.BT_STOCK_MARKETS], [CL_BR, 'NYSE by Sectors', _BrowserType.BT_NYSE_STOCKS], [CL_BR, 'NASDAQ by Sectors', _BrowserType.BT_NASDAQ_STOCKS]],
  PAGE_CONFIGS_05 = [[CL_ORG, 'FAOSTAT', _BrowserType.BT_FAOSTAT], [CL_ORG, 'UN Comtrade', _BrowserType.BT_UN_COMTRADE], [CL_ORG, 'World Bank', _BrowserType.BT_WORLD_BANK], [CL_ORG, 'WTO', _BrowserType.BT_WTO]];
const crBrowserModel = () => ({
  titleCl: CL_BR,
  pageWidth: 235,
  maxPages: 2,
  initId: 'page_0',
  page_0: [_crSubMenuItem('page_01', 'Economics'), _crSubMenuItem('page_02', 'Eurostat'), _crSubMenuItem('page_03', 'Statistics Agencies'), _crSubMenuItem('page_04', 'Stock Markets'), _crSubMenuItem('page_05', 'World Organizations'), _crMenuItem(CL_BR, 'Blockchains', _BrowserType.BT_BLOCKCHAIN), _crMenuItem(CL_BR, 'Currencies', _BrowserType.BT_CURRENCY), _crMenuItem(CL_W, 'Watch List', _BrowserType.BT_WATCH_LIST), {
    cn: CL_BR,
    name: 'About',
    onClick: _compStore.showAbout,
    isClose: true
  }],
  page_01: _crMenuItems(PAGE_CONFIGS_01),
  page_02: _crMenuItems(PAGE_CONFIGS_02),
  page_03: _crMenuItems(PAGE_CONFIGS_03),
  page_04: _crMenuItems(PAGE_CONFIGS_04),
  page_05: _crMenuItems(PAGE_CONFIGS_05)
});
var _default = exports.default = crBrowserModel;
//# sourceMappingURL=BrowserModel.js.map