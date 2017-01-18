import React from 'react';

import ShowHide from '../zhn/ShowHide';

/*
const STYLE = {
  ROOT : {
    position : 'absolute',
    zIndex : 1010,
    top : '45px',
    left : '80px',

    backgroundColor: 'rgb(77, 77, 77)',
    border : '2px solid rgb(35, 47, 59)',
    borderBottom: '4px solid green',
    borderRadius : '5px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 5px',

    padding : '10px',
    paddingTop : '5px',
    paddingBottom : '5px',

    width: '280px'
  }
}
*/

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
