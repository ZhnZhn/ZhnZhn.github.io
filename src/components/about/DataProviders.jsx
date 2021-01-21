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

const DP = [
  Link.DbNomics, Link.Eurostat, Link.UnComtrade, Link.WorldBank,
  Link.Insee, Link.ONS, Link.StatNorway,
  Link.StatSweden, Link.StatFinland, Link.Bsl,
  Link.CryptoCompare, Link.CoinGecko, Link.CoinMetrics,
  Link.CoinLore, Link.Coinpaprika, Link.Binance, Link.Bitstamp
]
, DP_KEY = [
  Link.AlphaVantage, Link.Iex,
  Link.Fmp, Link.Tw, Link.Intrinio,
  Link.Bea, Link.Eia
];

const Links = ({ list }) => list.map((LinkComp, index) => (
  <span style={S.PROVIDER} key={index}>
    <LinkComp />
  </span>
));

const QuanlLink = ({ req }) => (
  <span style={S.PROVIDER}>
    <Link.Quandl/>
    <span style={S.BLACK}>
       &nbsp;({req} per day)
    </span>
  </span>
);

const DataProviders = ({ isClose }) => (
  <OpenClose
     isClose={isClose}
     caption="Data Providers (All 26):"
     style={ST.OC_L1}
     childStyle={ST.ROOT_CHILD}
  >
    <div>
      <p>
        <QuanlLink req="50" />
        <Links list={DP} />
      </p>
      <OpenClose
        caption="(8) Required API Key:"
        style={ST.OC_L2}
        openColor={OPEN_COLOR_L2}
        childStyle={ST.CHILD_STYLE}
      >
      <p style={ST.P4}>
        <QuanlLink req="50 000" />
        <Links list={DP_KEY} />
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
        caption="(1) Required Https Proxy:"
        style={ST.OC_L2}
        openColor={OPEN_COLOR_L2}
        childStyle={ST.CHILD_STYLE}
      >
        <p style={ST.P4}>
          <span style={S.PROVIDER}>
           <Link.FaoStat />
          </span>
        </p>
        <div style={ST.NOTE}>
          <p>
            <span style={S.BLACK}>Note:&nbsp;</span>
            Https Proxy is required for CORS Http API services.&nbsp;
            <br className={CL.BR} />
            By default set. Can be changed in <span style={ST.SETTINGS}>SETTINGS&nbsp;[s]</span>.
          </p>
        </div>
      </OpenClose>
     </div>
   </OpenClose>
);

export default DataProviders
