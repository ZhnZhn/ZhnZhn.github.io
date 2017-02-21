import React from 'react';

import ShowHide from '../zhn/ShowHide';

const PanelBrowsers = (props) => {
  const {
          className, isShow, BROWSER, browserConfig,
          onClickQuandl, onClickDynamic, onClickWatch
        } = props;

  return (
    <ShowHide
       className={className}
       isShow={isShow}
    >
      <div>
        <div
          className="row__topic__odd item__eurostat"
          onClick={onClickDynamic.bind(null, browserConfig[BROWSER.EUROSTAT])}
        >
          Eurostat
        </div>
        <div
          className="row__topic__even item__quandl"
          onClick={onClickQuandl}
        >
          Quandl Economic
        </div>
        <div
          className="row__topic__odd item__quandl"
          onClick={onClickDynamic.bind(null, browserConfig[BROWSER.FRANCE_STATISTICS])}
        >
          France Statistics
        </div>
        <div
          className="row__topic__even item__quandl"
          onClick={onClickDynamic.bind(null, browserConfig[BROWSER.YAHOO])}
        >
          Yahoo Finance Stocks
        </div>
        <div
          className="row__topic__odd item__quandl"
          onClick={onClickDynamic.bind(null, browserConfig[BROWSER.GOOGLE])}
        >
          Google Finance Stocks
        </div>
        <div
          className="row__topic__even item__quandl"
          onClick={onClickDynamic.bind(null, browserConfig[BROWSER.US_STOCKS])}
        >
          Stocks By Sectors
        </div>
        <div
          className="row__topic__odd item__quandl"
          onClick={onClickDynamic.bind(null, browserConfig[BROWSER.NYSE_STOCKS])}
        >
          US NYSE by Sectors
        </div>
        <div
          className="row__topic__even item__quandl"
          onClick={onClickDynamic.bind(null, browserConfig[BROWSER.NASDAQ_STOCKS])}
        >
          US NASDAQ by Sectors
        </div>
        <div
          className="row__topic__odd item__quandl"
          onClick={onClickDynamic.bind(null, browserConfig[BROWSER.LONDON_STOCKS])}
        >
          LSE by Sectors
        </div>
        <div
          className="row__topic__even item__quandl"
          onClick={onClickDynamic.bind(null, browserConfig[BROWSER.PREMIUM_SAMPLE])}
        >
          Quandl Premium Sample
        </div>
        <div
          className="row__topic__odd item__watch"
          onClick={onClickWatch}
        >
          Watch
        </div>
      </div>
    </ShowHide>
 );
};

export default PanelBrowsers
