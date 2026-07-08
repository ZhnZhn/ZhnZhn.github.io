import { joinByColon } from '../utils/arrFn';

import {
  BT_STOCK_MARKETS,
  BT_EUROSTAT,
  BT_FGR,
  BT_PE,
  BT_COMEXT,
  BT_SDG,
  BT_MIP,
  BT_CEI,
  BT_UN_COMTRADE,
  BT_FAOSTAT,
  BT_WORLD_BANK,
  BT_WTO,
  BT_DB_NOMICS,
  BT_ENERGY,
  BT_BLOCKCHAIN,
  BT_COMMODITIES,
  BT_CENTRAL_BANKS,
  BT_CURRENCY,
  BT_OECD,
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
  BT_US_ECONOMICS,
  BT_NYSE_STOCKS,
  BT_STOCKS_BY_SECTORS,
  BT_NASDAQ_STOCKS,
  BT_WATCH_LIST
} from './BrowserType';
import {
  MDT_STOCKS_BY_SECTOR
} from './ModalDialogType';
import {
  LT_NST_2,
  LT_SWS,
  LT_SFL,
  LT_SDN,
  LT_SIR
} from './LoadType';

const S_ITEM_MULTI_LINE = {
  maxWidth: 275,
  lineHeight: 1.3,
  paddingTop: 6,
  paddingBottom: 6
}
, S_ITEM_MULTI_LINE_WHITE_SPACE = {
  ...S_ITEM_MULTI_LINE,
  whiteSpace: 'unset'
}

const _crDescrUrl = (
  token
) => `./data/${token}/${token}`
, _crSourceMenuUrl = (
  token
) => `./data/${token}/source-menu.json`

, _crBrowserItem = (
  browserType,
  caption,
  token,
  itemStyle,
  topicStyle
) => ({
  browserType,
  caption,
  sourceMenuUrl: _crSourceMenuUrl(token),
  itemStyle,
  topicStyle
})

, _crStatisticsToken = (
  countryName
) => `statistics-${countryName.toLowerCase()}`
, _crStatisticsFullCaption = (
  countryName,
  fullCaptionPrefix
) => {
  const caption = `Statistics ${countryName}`
  , fullCaption = joinByColon(fullCaptionPrefix, caption);
  return [
    fullCaption,
    caption
  ];
}
, _crStatisticsBrowserItem = (
  [countryName, fullCaptionPrefix],
  browserType,
  loadType,
  rootUrl,
  dfPropsOptions
) => {
  const [
    fullCaption,
    caption
  ] = _crStatisticsFullCaption(
    countryName,
    fullCaptionPrefix
  );
  return {
    browserType,
    caption: fullCaption,
    dfProps: {
      bT: browserType,
      lT: loadType,
      sP: `Stat. ${countryName}`,
      dU: _crDescrUrl(_crStatisticsToken(countryName)),
      dS: caption,
      rootUrl,
      ...dfPropsOptions
    }
  };
}
, _crSourceMenuStatisticsBrowserItem = (
  browserType,
  countryName,
  fullCaptionPrefix
) => _crBrowserItem(
  browserType,
  fullCaptionPrefix
    ? _crStatisticsFullCaption(countryName, fullCaptionPrefix)[0]
    : `Statistics ${countryName} (A)`,
  _crStatisticsToken(countryName)
)

, _crStockMarketBrowserItem = (
  browserType,
  exchangeName
) => {
  const caption = `${exchangeName} by Sectors`
  , exchangeToken = `${exchangeName.toLowerCase()}-stocks`
  return {
    browserType,
    caption,
    sourceMenuUrl: _crSourceMenuUrl(exchangeToken),
    withoutItemCounter: true,
    modalDialogType: MDT_STOCKS_BY_SECTOR,
    chartContainerType: `${browserType}_${BT_STOCKS_BY_SECTORS}`,
    contFullCaption: caption,
    itemOptionType: 'ItemTopicOption',
    itemType: 'ItemWithCap',
    descr: _crDescrUrl(exchangeToken)
  };
};

const BrowserConfig = {
  [BT_STOCK_MARKETS]: _crBrowserItem(
    BT_STOCK_MARKETS,
    'Stock Markets',
    'stock-markets'
  ),
  [BT_EUROSTAT]: _crBrowserItem(
    BT_EUROSTAT,
    'Eurostat Overview',
    'eurostat'
  ),
  [BT_FGR]: _crBrowserItem(
    BT_FGR,
    'EU FIGARO',
    'figaro'
  ),
  [BT_PE]: _crBrowserItem(
    BT_PE,
    'Euro Indicators / PEEIs',
    'peeis'
  ),
  [BT_COMEXT]: _crBrowserItem(
    BT_COMEXT,
    'EU Comext',
    'comext'
  ),
  [BT_SDG]: _crBrowserItem(
    BT_SDG,
    'EU SDG',
    'eu-sdg',
    {...S_ITEM_MULTI_LINE},
    {...S_ITEM_MULTI_LINE_WHITE_SPACE}
  ),
  [BT_MIP]: _crBrowserItem(
    BT_MIP,
    'EU MIP',
    'eu-mip',
    {...S_ITEM_MULTI_LINE},
    {...S_ITEM_MULTI_LINE_WHITE_SPACE}
  ),
  [BT_CEI]: _crBrowserItem(
    BT_CEI,
    'Circular economy indicators',
    'eu-cei',
    {...S_ITEM_MULTI_LINE},
    {...S_ITEM_MULTI_LINE_WHITE_SPACE}
  ),
  [BT_UN_COMTRADE]: _crBrowserItem(
    BT_UN_COMTRADE,
    'UN Comtrade',
    'uncomtrade'
  ),
  [BT_FAOSTAT]: _crBrowserItem(
    BT_FAOSTAT,
    'FAOSTAT',
    'faostat'
  ),
  [BT_WORLD_BANK]: _crBrowserItem(
    BT_WORLD_BANK,
    'World Bank',
    'world-bank'
  ),
  [BT_WTO]: _crBrowserItem(
    BT_WTO,
    'WTO',
    'wto'
  ),
  [BT_DB_NOMICS]: _crBrowserItem(
    BT_DB_NOMICS,
    'DBnomics',
    'db-nomics'
  ),
  [BT_ENERGY]: _crBrowserItem(
    BT_ENERGY,
    'Energy',
    'energy'
  ),
  [BT_BLOCKCHAIN]: _crBrowserItem(
    BT_BLOCKCHAIN,
    'Blockchains',
    'blockchain'
  ),
  [BT_COMMODITIES]: _crBrowserItem(
    BT_COMMODITIES,
    'Commodities',
    'commodities'
  ),
  [BT_CENTRAL_BANKS]: _crBrowserItem(
    BT_CENTRAL_BANKS,
    'Central Banks',
    'central-banks'
  ),
  [BT_CURRENCY]: _crBrowserItem(
    BT_CURRENCY,
    'Currencies',
    'currency'
  ),
  [BT_OECD]: _crBrowserItem(
    BT_OECD,
    'OECD',
    'oecd'
  ),

  [BT_FRANCE_STATISTICS]: _crSourceMenuStatisticsBrowserItem(
    BT_FRANCE_STATISTICS,
    'France',
    'INSEE'
  ),
  [BT_UK_STATISTICS]: _crSourceMenuStatisticsBrowserItem(
    BT_UK_STATISTICS,
    'UK',
    'ONS'
  ),
  [BT_SWISS_STAT]: _crSourceMenuStatisticsBrowserItem(
    BT_SWISS_STAT,
    'Swiss',
    'FSO'
  ),

  [BT_NORWAY_STATISTICS]: _crSourceMenuStatisticsBrowserItem(
    BT_NORWAY_STATISTICS,
    'Norway'
  ),
  [BT_NORWAY_STAT_ALL]: _crStatisticsBrowserItem(
    ['Norway'],
    BT_NORWAY_STAT_ALL,
    LT_NST_2,
    'https://data.ssb.no/api/v0/en/table'
  ),
  [BT_SWEDEN_STAT]: _crSourceMenuStatisticsBrowserItem(
    BT_SWEDEN_STAT,
    'Sweden'
  ),
  [BT_SWEDEN_STAT_ALL]: _crStatisticsBrowserItem(
    ['Sweden'],
    BT_SWEDEN_STAT_ALL,
    LT_SWS,
    'https://api.scb.se/OV0104/v1/doris/en/ssd'
  ),
  [BT_FINLAND_STAT_ALL]: _crStatisticsBrowserItem(
    ['Finland'],
    BT_FINLAND_STAT_ALL,
    LT_SFL,
    'https://statfin.stat.fi/PXWeb/api/v1/en/StatFin',
    { noTime: true }
  ),
  [BT_DENMARK_STAT_ALL]: _crStatisticsBrowserItem(
    ['Denmark'],
    BT_DENMARK_STAT_ALL,
    LT_SDN,
    'https://api.statbank.dk/v1/subjects',
    {
      dfTi: '?lang=en&includeTables=true',
      rootDimUrl: 'https://api.statbank.dk/v1/tableinfo',
      dfDimQuery: '?lang=en'
    }
  ),
  [BT_IRELAND_STAT_ALL]: _crStatisticsBrowserItem(
    ['Ireland', 'CSO'],
    BT_IRELAND_STAT_ALL,
    LT_SIR,
    'https://ws.cso.ie/public/api.restful/PxStat.Data.Cube_API.PxAPIv1/en'
  ),
  [BT_US_ECONOMICS]: _crBrowserItem(
    BT_US_ECONOMICS,
    'U.S. Economics',
    'us-economics'
  ),
  [BT_NYSE_STOCKS]: _crStockMarketBrowserItem(
    BT_NYSE_STOCKS,
    'NYSE'
  ),
  [BT_NASDAQ_STOCKS]: _crStockMarketBrowserItem(
    BT_NASDAQ_STOCKS,
    'NASDAQ'
  ),
  [BT_WATCH_LIST]: {
    browserType: BT_WATCH_LIST,
    withoutItemCounter: true
  }
};

export default BrowserConfig
