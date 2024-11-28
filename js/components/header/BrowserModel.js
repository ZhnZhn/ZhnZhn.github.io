"use strict";

exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _BrowserType = require("../../constants/BrowserType");
var _compStore = require("../../flux/stores/compStore");
var _browserStore = require("../../flux/stores/browserStore");
var _menuModelFn = require("../menuModelFn");
const PREFIX_CL_ROW_ITEM = `${_styleFn.CL_ROW__PANE_TOPIC} item__`,
  CL_BR = `${PREFIX_CL_ROW_ITEM}browser`,
  CL_ORG = `${PREFIX_CL_ROW_ITEM}org`,
  CL_W = `${PREFIX_CL_ROW_ITEM}watch`;
const _crSubMenuItem = (id, name) => (0, _menuModelFn.crSubItem)(id, name, CL_BR),
  _crMenuItem = (cn, name, id) => (0, _menuModelFn.crItem)(name, () => (0, _browserStore.showBrowser)(id), true, cn);
const _crMenuItems = configs => configs.map(_ref => {
  let [cn, name, id] = _ref;
  return _crMenuItem(cn, name, id);
});
const PAGE_CONFIGS_1 = [[CL_ORG, 'Central Banks', _BrowserType.BT_CENTRAL_BANKS], [CL_ORG, 'DBnomics', _BrowserType.BT_DB_NOMICS], [CL_ORG, 'Energy', _BrowserType.BT_ENERGY], [CL_ORG, 'U.S. Economics', _BrowserType.BT_US_ECONOMICS], [CL_ORG, 'Commodities', _BrowserType.BT_COMMODITIES], [CL_ORG, 'OECD', _BrowserType.BT_OECD]],
  PAGE_CONFIGS_2 = [[CL_ORG, 'Overview', _BrowserType.BT_EUROSTAT], [CL_ORG, 'Circular Economy', _BrowserType.BT_CEI], [CL_ORG, 'Euro Indicators / PEEIs', _BrowserType.BT_PE], [CL_ORG, 'EU Comext', _BrowserType.BT_COMEXT], [CL_ORG, 'EU FIGARO', _BrowserType.BT_FGR], [CL_ORG, 'EU MIP', _BrowserType.BT_MIP], [CL_ORG, 'EU SDG', _BrowserType.BT_SDG]],
  PAGE_CONFIGS_3 = [[CL_ORG, 'INSEE: Statistics France', _BrowserType.BT_FRANCE_STATISTICS], [CL_ORG, 'ONS: Statistics UK', _BrowserType.BT_UK_STATISTICS], [CL_ORG, 'Statistics Norway', _BrowserType.BT_NORWAY_STAT_ALL], [CL_ORG, 'Statistics Norway (A)', _BrowserType.BT_NORWAY_STATISTICS], [CL_ORG, 'Statistics Sweden', _BrowserType.BT_SWEDEN_STAT_ALL], [CL_ORG, 'Statistics Sweden (A)', _BrowserType.BT_SWEDEN_STAT], [CL_ORG, 'Statistics Finland', _BrowserType.BT_FINLAND_STAT_ALL], [CL_ORG, 'Statistics Denmark', _BrowserType.BT_DENMARK_STAT_ALL], [CL_ORG, 'CSO: Statistics Ireland', _BrowserType.BT_IRELAND_STAT_ALL], [CL_ORG, 'FSO: Statistics Swiss', _BrowserType.BT_SWISS_STAT]],
  PAGE_CONFIGS_4 = [[CL_ORG, 'Stock Markets', _BrowserType.BT_STOCK_MARKETS], [CL_ORG, 'NYSE by Sectors', _BrowserType.BT_NYSE_STOCKS], [CL_ORG, 'NASDAQ by Sectors', _BrowserType.BT_NASDAQ_STOCKS]],
  PAGE_CONFIGS_5 = [[CL_ORG, 'FAOSTAT', _BrowserType.BT_FAOSTAT], [CL_ORG, 'UN Comtrade', _BrowserType.BT_UN_COMTRADE], [CL_ORG, 'World Bank', _BrowserType.BT_WORLD_BANK], [CL_ORG, 'WTO', _BrowserType.BT_WTO]];
const crBrowserModel = () => (0, _menuModelFn.crSliderMenu)(CL_BR, 215, 2, {
  p0: [_crSubMenuItem('p1', 'Economics'), _crSubMenuItem('p2', 'Eurostat'), _crSubMenuItem('p3', 'Statistics Agencies'), _crSubMenuItem('p4', 'Stock Markets'), _crSubMenuItem('p5', 'World Organizations'), _crMenuItem(CL_BR, 'Blockchains', _BrowserType.BT_BLOCKCHAIN), _crMenuItem(CL_BR, 'Currencies', _BrowserType.BT_CURRENCY), _crMenuItem(CL_W, 'Watch List', _BrowserType.BT_WATCH_LIST), (0, _menuModelFn.crItem)('About', _compStore.showAbout, true, CL_BR)],
  p1: _crMenuItems(PAGE_CONFIGS_1),
  p2: _crMenuItems(PAGE_CONFIGS_2),
  p3: _crMenuItems(PAGE_CONFIGS_3),
  p4: _crMenuItems(PAGE_CONFIGS_4),
  p5: _crMenuItems(PAGE_CONFIGS_5)
});
var _default = exports.default = crBrowserModel;
//# sourceMappingURL=BrowserModel.js.map