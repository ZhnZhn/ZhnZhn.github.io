import React, { Component } from 'react'

import ModalPane from '../zhn-moleculs/ModalPane'
import ShowHide from '../zhn/ShowHide'

import MenuPage from './MenuPage'

const CL = {
  ROW: 'row__pane-topic',

  ITEM_DF: 'row__pane-topic item__quandl',
  //ITEM_WATCH: 'row__pane-topic item__watch',
  ITEM_ABOUT: 'row__pane-topic item__about',

  TITLE: 'row__pane-topic'
};

const S = {
  SHOW_HIDE: {
    padding: '0px',
    width: '235px',

    overflow: 'hidden'
  },

  PAGES: {
    width: '470px',
    overflowX: 'hidden',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'flex-start',
    transition: 'all 750ms ease-out'
  },

  PAGE: {
    width: '235px'
  }
}

const _getTranslateX = (node) => {
  const _prevStr = node
           .style.transform
           .substr(11)
           .replace('px', '')
           .replace(')', '');
   return parseInt(_prevStr, 10);
}

class BrowserMenu extends Component {

  constructor(props){
    super()
    const {
            model,
            onClickDynamic, onClickQuandl,
            onClickAbout
          } = props
         , pages = []
    pages.push(
      (
        <MenuPage
          key="page_0"
          style={S.PAGE}
          CL={CL}
          model={model.page_0}
          onClickDynamic={onClickDynamic}
          onClickQuandl={onClickQuandl}
          onClickNext={this.hNextPage}
        >
          <div
            className={CL.ITEM_ABOUT}
            onClick={onClickAbout}
          >
            About
          </div>
        </MenuPage>
      )
    )
    this._direction = 0

    this.state = {
      pageCurrent: 1,
      pages
    }
  }

  hPrevPage = (pageNumber) => {
    this.setState(prevState => {
      prevState.pageCurrent = pageNumber - 1
      this._direction = -1
      return prevState;
    })
  }

  _addPage = (pages, id, title) => {
    const {
            model,
            onClickDynamic,
            onClickQuandl
           } = this.props
         //, { pageCurrent } = this.state;
    pages.push((
      <MenuPage
        key={id}
        style={S.PAGE}
        CL={CL}
        title={title}
        model={model[id]}
        onClickDynamic={onClickDynamic}
        onClickQuandl={onClickQuandl}
        onClickPrev={this.hPrevPage}
        //onClickPrev={this.hPrevPage.bind(null, pageCurrent)}
      />
    ))
  }

  hNextPage = (id, title, pageNumber) => {
    this.setState(prevState => {
       const { pages } = prevState
          , _max = pages.length-1;

      if ( (_max+1) > pageNumber) {
        if (pages[pageNumber] && pages[pageNumber].key !== id) {
           if (pageNumber>0) {
             prevState.pages.splice(pageNumber)
           } else {
             prevState.pages = []
           }
           this._addPage(prevState.pages, id, title)
        }
      } else {
        this._addPage(pages, id, title)
      }

      prevState.pageCurrent = pageNumber + 1
      //prevState.direction = 1
      this._direction = 1
      return prevState;
    })
  }

  _crTransform = () => {
    let dX = '0';
    if (this._direction !== 0 && this._pagesNode) {
      const _prevInt = _getTranslateX(this._pagesNode);
      if ( this._direction === 1 ) {
        dX = _prevInt-235
      } else {
        dX = _prevInt+235
      }
      this._direction = 0
    } else if ( this._direction === 0 && this._pagesNode) {
      dX = _getTranslateX(this._pagesNode)
    }

    return { transform: `translateX(${dX}px)` };
  }


  _refPages = n => this._pagesNode = n

  _renderPages = () => {
    const { pages, pageCurrent } = this.state;
    return pages.map((Page, index) => {
      return React.cloneElement(Page, {
        pageCurrent,
        //pageNumber: index,
        pageNumber: index + 1,
      });
    })
  }

  render(){
    const { isShow, className, style, onClose } = this.props
    , _transform = this._crTransform()
    , _pagesStyle = {
         ...S.PAGES,
         ..._transform
       };

    return (
      <ModalPane
        isShow={isShow}
        onClose={onClose}
      >
        <ShowHide
           className={className}
           style={{ ...style, ...S.SHOW_HIDE }}
           isShow={isShow}
        >
          <div
            ref={this._refPages}
            style={_pagesStyle}
          >
            {this._renderPages()}
          </div>
        </ShowHide>
      </ModalPane>
    );
  }
}

export default BrowserMenu
