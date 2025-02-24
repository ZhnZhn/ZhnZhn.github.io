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
const _crSubMenuItem = (name, id) => (0, _menuModelFn.crSubItem)(id, name, CL_BR),
  _crMenuItem = (name, id, cn) => (0, _menuModelFn.crItem)(name, () => (0, _browserStore.showBrowser)(id), true, cn);
const _crMenuItems = configs => configs.map(_ref => {
  let [name, id] = _ref;
  return _crMenuItem(name, id, CL_ORG);
});
const PAGE_CONFIGS_1 = [['Central Banks', _BrowserType.BT_CENTRAL_BANKS], ['DBnomics', _BrowserType.BT_DB_NOMICS], ['Energy', _BrowserType.BT_ENERGY], ['U.S. Economics', _BrowserType.BT_US_ECONOMICS], ['Commodities', _BrowserType.BT_COMMODITIES], ['OECD', _BrowserType.BT_OECD]],
  PAGE_CONFIGS_2 = [['Overview', _BrowserType.BT_EUROSTAT], ['Circular Economy', _BrowserType.BT_CEI], ['Euro Indicators / PEEIs', _BrowserType.BT_PE], ['EU Comext', _BrowserType.BT_COMEXT], ['EU FIGARO', _BrowserType.BT_FGR], ['EU MIP', _BrowserType.BT_MIP], ['EU SDG', _BrowserType.BT_SDG]],
  PAGE_CONFIGS_3 = [['INSEE: Statistics France', _BrowserType.BT_FRANCE_STATISTICS], ['ONS: Statistics UK', _BrowserType.BT_UK_STATISTICS], ['Statistics Norway', _BrowserType.BT_NORWAY_STAT_ALL], ['Statistics Norway (A)', _BrowserType.BT_NORWAY_STATISTICS], ['Statistics Sweden', _BrowserType.BT_SWEDEN_STAT_ALL], ['Statistics Sweden (A)', _BrowserType.BT_SWEDEN_STAT], ['Statistics Finland', _BrowserType.BT_FINLAND_STAT_ALL], ['Statistics Denmark', _BrowserType.BT_DENMARK_STAT_ALL], ['CSO: Statistics Ireland', _BrowserType.BT_IRELAND_STAT_ALL], ['FSO: Statistics Swiss', _BrowserType.BT_SWISS_STAT]],
  PAGE_CONFIGS_4 = [['Stock Markets', _BrowserType.BT_STOCK_MARKETS], ['NYSE by Sectors', _BrowserType.BT_NYSE_STOCKS], ['NASDAQ by Sectors', _BrowserType.BT_NASDAQ_STOCKS]],
  PAGE_CONFIGS_5 = [['FAOSTAT', _BrowserType.BT_FAOSTAT], ['UN Comtrade', _BrowserType.BT_UN_COMTRADE], ['World Bank', _BrowserType.BT_WORLD_BANK], ['WTO', _BrowserType.BT_WTO]];
const crBrowserModel = () => (0, _menuModelFn.crSliderMenu)(CL_BR, 215, 2, {
  p0: [_crSubMenuItem('Economics', 'p1'), _crSubMenuItem('Eurostat', 'p2'), _crSubMenuItem('Statistics Agencies', 'p3'), _crSubMenuItem('Stock Markets', 'p4'), _crSubMenuItem('World Organizations', 'p5'), _crMenuItem('Blockchains', _BrowserType.BT_BLOCKCHAIN, CL_BR), _crMenuItem('Currencies', _BrowserType.BT_CURRENCY, CL_BR), _crMenuItem('Watch List', _BrowserType.BT_WATCH_LIST, CL_W), (0, _menuModelFn.crItem)('About', _compStore.showAbout, true, CL_BR)],
  p1: _crMenuItems(PAGE_CONFIGS_1),
  p2: _crMenuItems(PAGE_CONFIGS_2),
  p3: _crMenuItems(PAGE_CONFIGS_3),
  p4: _crMenuItems(PAGE_CONFIGS_4),
  p5: _crMenuItems(PAGE_CONFIGS_5)
});
var _default = exports.default = crBrowserModel;
//# sourceMappingURL=BrowserModel.js.map