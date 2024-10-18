import { CIT_INFO_ITEM } from '../../constants/CompItemType';
import { numberFormat } from '../AdapterFn';

const DESCR_STYLE = {
  lineHeight: 1.5,
  fontWeight: 'bold'
}
, ANALYST = "Analyst"
, ANALYST_RATING = ANALYST + "Rating";

const _getProp = (
  propName,
  json
) => json[propName] || ''
, _fGetProp = json => propName => _getProp(propName, json)
, _crAnalystToken = (
  name,
  prefix,
  json
) => `${name} ${json[prefix+name]}`
, _crMetricToken = (
  name,
  json
) => `${name} ${numberFormat(json[name])}`
, _crIncomeMetricsTokens = json => [
  `${_crMetricToken("RevenueTTM", json)}`,
  `${_crMetricToken("RevenuePerShareTTM", json)}`,
  `${_crMetricToken("EBITDA", json)}`,
  `${_crMetricToken("EPS", json)}`,
  `${_crMetricToken("DilutedEPSTTM", json)}`,
  `Q RevenueGrowthYOY ${_getProp("QuarterlyRevenueGrowthYOY", json)}`,
  `Q EarningsGrowthYOY ${_getProp("QuarterlyEarningsGrowthYOY", json)}`
]
, _crAnalystTokens = json => [
  `${_crAnalystToken("StrongBuy", ANALYST_RATING, json)}`,
  `${_crAnalystToken("Buy", ANALYST_RATING, json)}`,
  `${_crAnalystToken("Hold", ANALYST_RATING, json)}`,
  `${_crAnalystToken("Sell", ANALYST_RATING, json)}`,
  `${_crAnalystToken("StrongSell", ANALYST_RATING, json)}`
]
, _crMarketCapTokens = (_getJsonProp) => [
  `50D MA ${_getJsonProp("50DayMovingAverage")}`,
  `200D MA ${_getJsonProp("200DayMovingAverage")}`,
  `52W Low ${_getJsonProp("52WeekLow")}`,
  `52W High ${_getJsonProp("52WeekHigh")}`
]
, _crTokensItem = (caption, tokens) => ({
  caption,
  tokens
});

const OverviewAdapter = {
  toConfig(json, option) {
    const _id = option._itemKey
    , _getJsonProp = _fGetProp(json);
    return {
      config: {
        zhCompType: CIT_INFO_ITEM,
        id: _id,
        caption: `${_getJsonProp("Symbol")} ${_getJsonProp("CIK")} ${_getJsonProp("Country")} ${_getJsonProp("Currency")} ${_getJsonProp("AssetType")}`,
        items: [
          {
            caption: `${_getJsonProp("Sector")}, ${_getJsonProp("Industry")}`,
            style: DESCR_STYLE,
            descr: _getJsonProp("Description"),
            links: [{href: _getJsonProp("OfficialSite") }]
          },
          _crTokensItem(
            `${_crMetricToken("SharesOutstanding", json)}, ${_getJsonProp("LatestQuarter")}`,
            _crIncomeMetricsTokens(json)
          ),
          _crTokensItem(
            `${_crMetricToken("MarketCapitalization", json)}`,
            _crMarketCapTokens(_getJsonProp)
          ),
          _crTokensItem(
            `Analyst ${_crAnalystToken("TargetPrice", ANALYST, json)}, Beta ${_getJsonProp("Beta")}`,
            _crAnalystTokens(json)
          )
        ],
        zhConfig: {
          key: _id,
          id: _id
        }
      }
    };
  }
};

export default OverviewAdapter
