import React from 'react'

import ModalPane from '../zhn-moleculs/ModalPane'
import ShowHide from '../zhn/ShowHide'

const CL = {
  ROW: 'row__pane-topic',
  ITEM_DF: 'row__pane-topic item__quandl',
  ITEM_WATCH: 'row__pane-topic item__watch',
  ITEM_ABOUT: 'row__pane-topic item__about'
};
const S = {
  SHOW_HIDE: {
    padding: '0px'
  },
  NEW: {
    display: 'inline-block',
    float: 'right',    
    color: 'black'
  }
};
const _model = [
  {
    id: 'STOCK_MARKETS',
    cn: 'item__browser',
    title: 'Stock Markets',
  },{
    id: 'UN_COMTRADE',
    cn: 'item__eurostat',
    title: 'UN Comtrade',
    isNew: true
  },{
    id: 'FAOSTAT',
    cn: 'item__eurostat',
    title: 'FAOSTAT',
    isNew: true
  },{
    id: 'EUROSTAT',
    cn: 'item__eurostat',
    title: 'Eurostat'
  },{
    id: 'FRANCE_STATISTICS',
    cn: 'item__eurostat',
    title: 'Insee: France Statistics'
  },{
    id: 'QUANDL',
    isQuandl: true,
    title: 'Quandl Economic'
  },{
    id: 'US_STOCKS',
    title: 'US Stocks by Sectors'
  },{
    id: 'NYSE_STOCKS',
    title: 'US NYSE by Sectors'
  },{
    id: 'NASDAQ_STOCKS',
    title: 'US NASDAQ by Sectors'
  },{
    id: 'LONDON_STOCKS',
    title: 'LSE by Sectors'
  },{
    id: 'PREMIUM_SAMPLE',
    title: 'Quandl Premium Sample'
  }
];

const _renderItems = ({
  model, browserConfig, BROWSER,
  onClickDynamic, onClickQuandl
}) => {
  return model.map(item => {
    const { cn, id, title, isQuandl, isNew } = item
        , _className = cn
             ? `${CL.ROW} ${cn}`
             : CL.ITEM_DF
        , _onClick = isQuandl
             ? onClickQuandl
             : onClickDynamic.bind(null, browserConfig[BROWSER[id]])
        , _el = isNew
            ? (<span style={S.NEW}>New</span>)
            : null ;
    return (
      <div
        className={_className}
        onClick={_onClick}
      >
        {title}
        {_el}
      </div>
    );
  });
}

const PanelBrowsers = ({
  className, isShow, BROWSER, browserConfig,
  onClose, onClickQuandl, onClickDynamic,
  onClickWatch, onClickAbout
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
          {
            _renderItems({
               model: _model, browserConfig, BROWSER,
               onClickDynamic, onClickQuandl
            })
          }
          <div
            className={CL.ITEM_WATCH}
            onClick={onClickWatch}
          >
            Watch
          </div>
          <div
            className={CL.ITEM_ABOUT}
            onClick={onClickAbout}
          >
            About
          </div>
      </ShowHide>
  </ModalPane>


export default PanelBrowsers
