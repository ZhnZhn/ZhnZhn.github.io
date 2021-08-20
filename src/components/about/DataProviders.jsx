import C from '../styles/Color'

import OpenClose from '../zhn/OpenClose'
import Link from '../links/ProviderLinks'

import S from './About.Style'

const CL = {
  BR: "provider__note__br"
};

const OPEN_COLOR_L2 = C.GREEN;
const ST = {
  ROOT_CHILD: {
    borderLeftStyle: 'solid',
    borderLeftWidth: 2,
    marginLeft: -5,
    paddingLeft: 8
  },
  OC_L1: {
    ...S.LINE_HEIGHT,
    ...S.P_BOTTOM
  },
  OC_L2: {
    paddingTop: 6,
    lineHeight: 1.8
  },
  CHILD_STYLE: {
    paddingLeft: 4
  },
  P4: {
    paddingTop: 4
  },
  NOTE: {
    padding: '8px 4px 4px 6px',
    lineHeight: 1.4
  },
  MAX_WIDTH: {
    maxWidth: 450
  },
  SETTINGS: {
    color: '#607d8b'
  }
};

const _isArr = Array.isArray;

const DP = [
  [Link.Quandl, '50'],
  Link.DbNomics, Link.Eurostat, Link.UnComtrade, Link.WorldBank,
  Link.Insee, Link.ONS, Link.StatNorway,
  Link.StatSweden, Link.StatFinland, Link.StatDenmark, [Link.Bsl, '25'],
  Link.CryptoCompare, Link.CoinGecko, Link.CoinMetrics,
  Link.CoinLore, Link.Coinpaprika, Link.Binance, Link.Bitstamp
]
, DP_KEY = [
  [Link.Quandl, '50 000'],
  Link.AlphaVantage, Link.Iex,
  Link.Fmp, Link.Tw, Link.Intrinio,
  Link.Bea, [Link.Bsl, '500'], Link.Eia
]
, DP_PR = [
  Link.FaoStat,
  Link.Bitfinex
];

const LinkPer = ({ Comp, per }) => (
  <>
    <Comp />
    <span style={S.BLACK}>
       &nbsp;({per})
    </span>
  </>
);


const LinkList = ({ list }) => list.map((CompOrConfig, index) => {
  const _isConfig = _isArr(CompOrConfig)
  , _linkComp = _isConfig
      ? <LinkPer Comp={CompOrConfig[0]} per={CompOrConfig[1]} />
      : <CompOrConfig />
  , style = _isConfig
      ? {...S.PROVIDER, ...S.PR_4 }
      : S.PROVIDER
  return (
    <span style={style} key={index}>
      {_linkComp}
    </span>
  );
})

const DataProviders = ({ isClose }) => (
  <OpenClose
     isClose={isClose}
     caption="Data Providers (All 28):"
     style={ST.OC_L1}
     childStyle={ST.ROOT_CHILD}
  >
    <div>
      <p>
        <LinkList list={DP} />
      </p>
      <OpenClose
        caption="(9) Required API Key:"
        style={ST.OC_L2}
        openColor={OPEN_COLOR_L2}
        childStyle={ST.CHILD_STYLE}
      >
      <p style={ST.P4}>
        <LinkList list={DP_KEY} />
      </p>
      <div style={ST.NOTE}>
        <p>
          <span style={S.BLACK}>Note:&nbsp;</span>
          User API key from data provider required for request.&nbsp;
          <br className={CL.BR} />
          Can be set in <span style={ST.SETTINGS}>SETTINGS&nbsp;[s]</span>.
        </p>
      </div>
      <div style={ST.NOTE}>
        <p style={ST.MAX_WIDTH}>
          <span style={S.BLACK}>Note:&nbsp;</span>
          This product uses the Bureau of Economic Analysis (BEA)
          Data API but is not endorsed or certified by BEA.
        </p>
      </div>
      </OpenClose>
      <OpenClose
        caption="(2) Required Local Http Proxy:"
        style={ST.OC_L2}
        openColor={OPEN_COLOR_L2}
        childStyle={ST.CHILD_STYLE}
      >
        <p style={ST.P4}>
          <LinkList list={DP_PR} />
        </p>
        <div style={ST.NOTE}>
          <p>
            <span style={S.BLACK}>Note:&nbsp;</span>
            Local Http Proxy is required for CORS Http API services.&nbsp;
            <br className={CL.BR} />
            Could be set in <span style={ST.SETTINGS}>SETTINGS&nbsp;[s]</span>.
          </p>
        </div>
      </OpenClose>
     </div>
   </OpenClose>
);

export default DataProviders
