import { crStyle2 } from '../styleFn';
import { GREEN_COLOR } from '../styles/Color';

import OpenClose from '../zhn/OpenClose';
import { MarkBlack } from '../zhn/SpanToken';
import {
  LINK_OECD,
  LINK_BIS,
  LINK_ECB,
  LINK_BOC,
  LINK_SNB,
  LINK_NDL,
  LINK_DBNOMICS,
  LINK_EI,
  LINK_EMBER,
  LINK_IRENA,
  LINK_FMP,
  LINK_TW,
  LINK_AV,
  LINK_MSV,
  LINK_EUROSTAT,
  LINK_UNCOMTRADE,
  LINK_WORLBANK,
  LINK_WTO,
  LINK_FAOSTAT,
  LINK_BEA,
  LINK_BLS,
  LINK_EIA,
  LINK_INTRINIO,
  LINK_STAT_FRANCE,
  LINK_STAT_UK,
  LINK_STAT_NORWAY,
  LINK_STAT_SWEDEN,
  LINK_STAT_FINLAND,
  LINK_STAT_DENMARK,
  LINK_STAT_IRELAND,
  LINK_STAT_SWISS,
  LINK_COIN_CAP,
  LINK_CRYPTO_COMPARE,
  LINK_COIN_GECKO,
  LINK_COIN_METRICS,
  LINK_COIN_LORE,
  LINK_COINPAPRIKA,
  LINK_BINANCE,
  LINK_BITGET,
  LINK_BITSTAMP,
  LINK_COINBASE,
  LINK_BITFINEX,
  LINK_GATEIO,
  LINK_KRAKEN,
  LINK_KUCOIN,
  LINK_HTX,
  LINK_OKX,
  LINK_BYBIT,
  LINK_CRYPTOCOM
} from '../links/ProviderLinks';

const CL_NOTE_BR = "provider__note__br"
, OPEN_COLOR_L2 = GREEN_COLOR
, S_ROOT_CHILD = {
  borderLeftStyle: 'solid',
  borderLeftWidth: 2,
  marginLeft: -5,
  paddingLeft: 8
}
, S_OC_L2 = {
  paddingTop: 6,
  lineHeight: 1.8
}
, S_PL_4 = { paddingLeft: 4 }
, S_PT_4 = { paddingTop: 4 }
, S_PROVIDER = {
  display: 'inline-block',
  padding: '0 8px'
}
, S_PR_4 = { paddingRight: 4 }
, S_NOTE = {
  padding: '8px 4px 4px 6px',
  lineHeight: 1.4
}
, S_SETTINGS = { color: '#607d8b' };

const _isArr = Array.isArray;

const DP = [
  LINK_DBNOMICS,
  LINK_EI,
  LINK_EMBER,
  LINK_IRENA,
  LINK_EUROSTAT,
  LINK_FAOSTAT,
  LINK_WORLBANK,
  LINK_BOC,
  LINK_STAT_FRANCE,
  LINK_STAT_UK,
  LINK_STAT_NORWAY,
  LINK_STAT_SWEDEN,
  LINK_STAT_FINLAND,
  LINK_STAT_DENMARK,
  LINK_STAT_IRELAND,
  LINK_STAT_SWISS,
  LINK_OECD,
  [LINK_BLS, '25'],
  LINK_CRYPTO_COMPARE,
  LINK_COIN_CAP,
  LINK_COIN_GECKO,
  LINK_COIN_METRICS,
  LINK_COIN_LORE,
  LINK_COINPAPRIKA,
  LINK_BINANCE,
  LINK_BITGET,
  LINK_BITSTAMP,
  LINK_COINBASE
]
, DP_KEY = [
  LINK_NDL,
  LINK_AV,
  LINK_FMP,
  LINK_TW,
  LINK_MSV,
  LINK_INTRINIO,
  LINK_WTO,  
  [LINK_BLS, '500'],
  LINK_EIA,
  LINK_BEA
]
, DP_PR = [
  LINK_NDL,
  LINK_BIS,
  LINK_ECB,
  LINK_SNB,
  LINK_UNCOMTRADE,
  LINK_WTO,
  LINK_BITFINEX,
  LINK_CRYPTOCOM,
  LINK_GATEIO,
  LINK_KRAKEN,
  LINK_KUCOIN,
  LINK_OKX,
  LINK_BYBIT,
  LINK_HTX
];

const LinkPer = ({
  Comp,
  per
}) => (
  <>
    <Comp />
    <MarkBlack>
      &nbsp;({per})
    </MarkBlack>
  </>
);


const LinkList = ({
  list
}) => list.map((CompOrConfig, index) => {
  const _isConfig = _isArr(CompOrConfig);
  return (
    <span
       key={index}
       style={crStyle2(S_PROVIDER, _isConfig && S_PR_4)}
    >
      {_isConfig
          ? <LinkPer Comp={CompOrConfig[0]} per={CompOrConfig[1]} />
          : <CompOrConfig />
      }
    </span>
  );
})

const _crListCaption = (
  items,
  captionSuffix
) => `(${items.length}) ${captionSuffix}:`

const DataProviders = ({ isClose }) => (
  <OpenClose
     isClose={isClose}
     caption="Data Providers (All 49):"
     childStyle={S_ROOT_CHILD}
  >
    <div>
      <p>
        <LinkList list={DP} />
      </p>
      <OpenClose
        caption={_crListCaption(DP_KEY, 'Required API Key')}
        style={S_OC_L2}
        openColor={OPEN_COLOR_L2}
        childStyle={S_PL_4}
      >
      <p style={S_PT_4}>
        <LinkList list={DP_KEY} />
      </p>
      <div style={S_NOTE}>
        <p>
          <MarkBlack>Note:&nbsp;</MarkBlack>
          This product uses the Bureau of Economic Analysis (BEA) Data API but is not endorsed or certified by BEA.&nbsp;
        </p>
      </div>
      <div style={S_NOTE}>
        <p>
          <MarkBlack>Note:&nbsp;</MarkBlack>
          User API key from data provider required for request.&nbsp;
          <br className={CL_NOTE_BR} />
          Can be set in <span style={S_SETTINGS}>SETTINGS&nbsp;[s]</span>.
        </p>
      </div>
      </OpenClose>
      <OpenClose
        caption={_crListCaption(DP_PR, 'Required Local Http Proxy')}
        style={S_OC_L2}
        openColor={OPEN_COLOR_L2}
        childStyle={S_PL_4}
      >
        <p style={S_PT_4}>
          <LinkList list={DP_PR} />
        </p>
        <div style={S_NOTE}>
          <p>
            <MarkBlack>Note:&nbsp;</MarkBlack>
            Local Http Proxy is required for data APIs without CORS.&nbsp;
            <br className={CL_NOTE_BR} />
            Could be set in <span style={S_SETTINGS}>SETTINGS&nbsp;[s]</span>.
          </p>
        </div>
      </OpenClose>
     </div>
   </OpenClose>
);

export default DataProviders
