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

const _renderItems = ({ model, onClickDynamic, onClickQuandl }) => {
  return model.map(item => {
    const { cn, id, title, isQuandl, isNew } = item
        , _className = cn
             ? `${CL.ROW} ${cn}`
             : CL.ITEM_DF
        , _onClick = isQuandl
             ? onClickQuandl
             : onClickDynamic.bind(null, id)
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
  className, isShow, model,
  onClose, onClickQuandl, onClickDynamic,
  onClickAbout
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
         { _renderItems({ model, onClickDynamic, onClickQuandl }) }
          <div
            className={CL.ITEM_ABOUT}
            onClick={onClickAbout}
          >
            About
          </div>
      </ShowHide>
  </ModalPane>


export default PanelBrowsers
