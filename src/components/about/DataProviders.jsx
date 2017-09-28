import React from 'react'

import OpenClose from '../zhn/OpenClose'
import Link from '../links/Links';

import S from './About.Style'

const DataProviders = ({ isClose }) => (
  <OpenClose
     isClose={isClose}
     caption="Data Providers:"
     rootStyle={{ ...S.LINE_HEIGHT, ...S.P_BOTTOM}}
  >
    <div>
      <span style={S.PROVIDER}>
        <Link.Quandl/>
        <span style={S.BLACK}>
          &nbsp;(API Key),
        </span>
      </span>
      <span style={S.PROVIDER}>
        <Link.Barchart/>
        <span style={S.BLACK}>
          &nbsp;(API Key),
        </span>
      </span>
      <span style={S.PROVIDER}>
        <Link.AlphaVantage/>
        <span style={S.BLACK}>
          &nbsp;(API Key),
        </span>
      </span>
      <span style={S.PROVIDER}>
        <Link.Eurostat/>
        <span style={S.BLUE}>,</span>
      </span>
      <span style={S.PROVIDER}>
       <Link.UnComtrade />
       <span style={S.BLUE}>,</span>
      </span>
      <span style={S.PROVIDER}>
       <Link.FaoStat />
       <span style={S.BLACK}>
         &nbsp;(Https Proxy for CORS),
       </span>
      </span>
      <span style={S.PROVIDER}>
        <Link.Insee/>
        <span style={S.BLACK}>
          &nbsp;(Https Proxy for CORS).
        </span>
      </span>

     </div>
   </OpenClose>
);

export default DataProviders
