import { crStyle2 } from '../styleFn';
import { GREEN_COLOR } from '../styles/Color';

import Link from '../links/ProviderLinks';
import OpenClose from '../zhn/OpenClose';
import { SpanBlack } from '../zhn/SpanToken';

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
, S_MAX_WIDTH = { maxWidth: 450 }
, S_SETTINGS = { color: '#607d8b' };

const _isArr = Array.isArray;

const DP = [
  Link.DBnomics,
  Link.EI,
  Link.Ember,
  Link.IRENA,
  Link.Eurostat,
  Link.FaoStat,
  Link.WorldBank,
  Link.Insee,
  Link.ONS,
  Link.StatNorway, Link.StatSweden, Link.StatFinland, Link.StatDenmark, Link.StatIreland,
  [Link.Bsl, '25'],
  Link.CryptoCompare, Link.CoinGecko, Link.CoinMetrics,
  Link.CoinLore, Link.Coinpaprika,
  Link.Binance, Link.Bitstamp, Link.Coinbase
]
, DP_KEY = [
  [Link.Ndl, '50 000'],
  Link.AlphaVantage, Link.Iex,
  Link.Fmp, Link.Tw, Link.Intrinio,
  Link.Bea, [Link.Bsl, '500'], Link.Eia,
  Link.WTO
]
, DP_PR = [
  [Link.Ndl, '50'],
  Link.UnComtrade,
  Link.WTO,
  Link.Bitfinex,
  Link.CryptoCom,
  Link.GateIo,
  Link.Kraken,
  Link.KuCoin,
  Link.OKX,
  Link.Bybit,
  Link.HTX
];

const LinkPer = ({
  Comp,
  per
}) => (
  <>
    <Comp />
    <SpanBlack>
      &nbsp;({per})
    </SpanBlack>
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
     caption="Data Providers (All 41):"
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
          <SpanBlack>Note:&nbsp;</SpanBlack>
          User API key from data provider required for request.&nbsp;
          <br className={CL_NOTE_BR} />
          Can be set in <span style={S_SETTINGS}>SETTINGS&nbsp;[s]</span>.
        </p>
      </div>
      <div style={S_NOTE}>
        <p style={S_MAX_WIDTH}>
          <SpanBlack>Note:&nbsp;</SpanBlack>
          This product uses the Bureau of Economic Analysis (BEA)
          Data API but is not endorsed or certified by BEA.
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
            <SpanBlack>Note:&nbsp;</SpanBlack>
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
