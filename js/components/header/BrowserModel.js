"use strict";

exports.__esModule = true;
exports.default = void 0;
var _BrowserType = require("../../constants/BrowserType");
var _ComponentActions = require("../../flux/actions/ComponentActions");
var _BrowserActions = require("../../flux/actions/BrowserActions");
const CL_ROW = 'row__pane-topic',
  PREFIX_CL_ROW_ITEM = `${CL_ROW} item__`,
  CL_BR = `${PREFIX_CL_ROW_ITEM}browser`,
  CL_ORG = `${PREFIX_CL_ROW_ITEM}org`,
  CL_W = `${PREFIX_CL_ROW_ITEM}watch`;
const _fBD = id => () => {
  _BrowserActions.BrowserActions.showBrowserDynamic(id);
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
const PAGE_CONFIGS_01 = [[CL_ORG, 'DBnomics', _BrowserType.BT_DB_NOMICS], [CL_BR, 'Energy', _BrowserType.BT_ENERGY], [CL_ORG, 'EU: FIGARO', _BrowserType.BT_FGR], [CL_ORG, 'Euro Indicators / PEEIs', _BrowserType.BT_PE], [CL_ORG, 'Nasdaq Data Link', _BrowserType.BT_NDL], [CL_BR, 'U.S. Economics', _BrowserType.BT_US_ECONOMICS]],
  PAGE_CONFIGS_02 = [[CL_ORG, 'Eurostat', _BrowserType.BT_EUROSTAT], [CL_ORG, 'Insee: France Statistics', _BrowserType.BT_FRANCE_STATISTICS], [CL_ORG, 'ONS: UK Statistics', _BrowserType.BT_UK_STATISTICS], [CL_ORG, 'Statistics Norway', _BrowserType.BT_NORWAY_STATISTICS], [CL_ORG, 'Statistics Norway All', _BrowserType.BT_NORWAY_STAT_ALL], [CL_ORG, 'Statistics Sweden', _BrowserType.BT_SWEDEN_STAT], [CL_ORG, 'Statistics Sweden All', _BrowserType.BT_SWEDEN_STAT_ALL], [CL_ORG, 'Statistics Finland All', _BrowserType.BT_FINLAND_STAT_ALL], [CL_ORG, 'Statistics Denmark All', _BrowserType.BT_DENMARK_STAT_ALL], [CL_ORG, 'CSO Ireland All', _BrowserType.BT_IRELAND_STAT_ALL]],
  PAGE_CONFIGS_03 = [[CL_BR, 'Stock Markets', _BrowserType.BT_STOCK_MARKETS], [CL_BR, 'NYSE by Sectors', _BrowserType.BT_NYSE_STOCKS], [CL_BR, 'NASDAQ by Sectors', _BrowserType.BT_NASDAQ_STOCKS]],
  PAGE_CONFIGS_04 = [[CL_ORG, 'FAOSTAT', _BrowserType.BT_FAOSTAT], [CL_ORG, 'UN Comtrade', _BrowserType.BT_UN_COMTRADE], [CL_ORG, 'World Bank', _BrowserType.BT_WORLD_BANK]];
const crBrowserModel = () => ({
  titleCl: CL_BR,
  pageWidth: 235,
  maxPages: 2,
  initId: 'page_0',
  page_0: [_crSubMenuItem('page_01', 'Economics'), _crSubMenuItem('page_02', 'Statistics Agencies'), _crSubMenuItem('page_03', 'Stock Markets'), _crSubMenuItem('page_04', 'World Organizations'), _crMenuItem(CL_BR, 'Blockchains', _BrowserType.BT_BLOCKCHAIN), _crMenuItem(CL_BR, 'Commodities', _BrowserType.BT_COMMODITIES), _crMenuItem(CL_BR, 'Currencies', _BrowserType.BT_CURRENCY), _crMenuItem(CL_W, 'Watch List', _BrowserType.BT_WATCH_LIST), {
    cn: CL_BR,
    name: 'About',
    onClick: _ComponentActions.ComponentActions.showAbout,
    isClose: true
  }],
  page_01: _crMenuItems(PAGE_CONFIGS_01),
  page_02: _crMenuItems(PAGE_CONFIGS_02),
  page_03: _crMenuItems(PAGE_CONFIGS_03),
  page_04: _crMenuItems(PAGE_CONFIGS_04)
});
var _default = exports.default = crBrowserModel;
//# sourceMappingURL=BrowserModel.js.map