import React from 'react'

import ModalPane from '../zhn-moleculs/ModalPane'
import ShowHide from '../zhn/ShowHide'

const S = {
  SHOW_HIDE: {
    padding: '0px'
  }
}

const PanelBrowsers = ({
  className, isShow, BROWSER, browserConfig,
  onClose, onClickQuandl, onClickDynamic, onClickWatch
}) =>
    <ModalPane
      isShow={isShow}
      onClose={onClose}
    >
      <ShowHide
         className={className}
         style={S.SHOW_HIDE}
         isShow={isShow}
      >
          <div
            className="row__pane-topic item__eurostat"
            onClick={onClickDynamic.bind(null, browserConfig[BROWSER.EUROSTAT])}
          >
            Eurostat
          </div>
          <div
            className="row__pane-topic item__quandl"
            onClick={onClickQuandl}
          >
            Quandl Economic
          </div>
          <div
            className="row__pane-topic item__quandl"
            onClick={onClickDynamic.bind(null, browserConfig[BROWSER.FRANCE_STATISTICS])}
          >
            France Statistics
          </div>
          {/*
          <div
            className="row__pane-topic item__quandl"
            onClick={onClickDynamic.bind(null, browserConfig[BROWSER.YAHOO])}
          >
            Yahoo Finance Stocks
          </div>
          <div
            className="row__pane-topic item__quandl"
            onClick={onClickDynamic.bind(null, browserConfig[BROWSER.GOOGLE])}
          >
            Google Finance Stocks
          </div>
         */}
          <div
            className="row__pane-topic item__quandl"
            onClick={onClickDynamic.bind(null, browserConfig[BROWSER.US_STOCKS])}
          >
            Stocks By Sectors
          </div>
          <div
            className="row__pane-topic item__quandl"
            onClick={onClickDynamic.bind(null, browserConfig[BROWSER.NYSE_STOCKS])}
          >
            US NYSE by Sectors
          </div>
          <div
            className="row__pane-topic item__quandl"
            onClick={onClickDynamic.bind(null, browserConfig[BROWSER.NASDAQ_STOCKS])}
          >
            US NASDAQ by Sectors
          </div>
          <div
            className="row__pane-topic item__quandl"
            onClick={onClickDynamic.bind(null, browserConfig[BROWSER.LONDON_STOCKS])}
          >
            LSE by Sectors
          </div>
          <div
            className="row__pane-topic item__quandl"
            onClick={onClickDynamic.bind(null, browserConfig[BROWSER.PREMIUM_SAMPLE])}
          >
            Quandl Premium Sample
          </div>
          <div
            className="row__pane-topic item__watch"
            onClick={onClickWatch}
          >
            Watch
          </div>
      </ShowHide>
  </ModalPane>


export default PanelBrowsers
