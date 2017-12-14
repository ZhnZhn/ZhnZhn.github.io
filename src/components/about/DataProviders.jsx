import React from 'react'

import OpenClose from '../zhn/OpenClose'
import Link from '../links/Links';

import S from './About.Style'

const ST = {
  P4: {
    paddingTop: '4px'
  }
}

const DataProviders = ({ isClose }) => (
  <OpenClose
     isClose={isClose}
     caption="Data Providers:"
     rootStyle={{ ...S.LINE_HEIGHT, ...S.P_BOTTOM}}
  >
    <div>
      <p>
        <span style={S.PROVIDER}>
          <Link.Eurostat/>
          <span style={S.BLACK}>
            &nbsp;
          </span>
        </span>
        <span style={S.PROVIDER}>
         <Link.UnComtrade />
         <span style={S.BLUE}>;</span>
        </span>
      </p>
      <p style={ST.P4}>
        <span style={S.PROVIDER}>
          <Link.Quandl/>
          <span style={S.BLACK}>
            &nbsp;
          </span>
        </span>
        <span style={S.PROVIDER}>
          <Link.Barchart/>
          <span style={S.BLACK}>
            &nbsp;
          </span>
        </span>
        <span style={S.PROVIDER}>
          <Link.AlphaVantage/>
          <span style={S.BLACK}>
            &nbsp;:&nbsp;(API Key);
          </span>
        </span>
      </p>
      <p style={ST.P4}>
        <span style={S.PROVIDER}>
         <Link.FaoStat />
         <span>&nbsp;</span>
        </span>
        <span style={S.PROVIDER}>
          <Link.Insee/>
          <span>&nbsp;</span>
        </span>
        <span style={S.PROVIDER}>
          <Link.StatNorway/>
          <span>&nbsp;</span>
        </span>
        <span style={S.PROVIDER}>
          <Link.StatSweden/>
          <span style={S.BLACK}>
            &nbsp;:&nbsp;(Https Proxy for CORS);
          </span>
        </span>
      </p>

     </div>
   </OpenClose>
);

export default DataProviders
