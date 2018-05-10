import React, { Component } from 'react'

import ModalPane from '../zhn-moleculs/ModalPane'
import ShowHide from '../zhn/ShowHide'

import MenuPage from './MenuPage'

const S = {
  SHOW_HIDE: {
    position: 'absolute',
    //top: '26px',
    //backgroundColor: '#4d4d4d',
    //padding: 0,
    overflow: 'hidden'
  },
  PAGES: {
    overflowX: 'hidden',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'flex-start',
    transition: 'all 750ms ease-out'
  }
};

const _getTranslateX = (node) => {
  const _prevStr = node
           .style.transform
           .substr(11)
           .replace('px', '')
           .replace(')', '');
   return parseInt(_prevStr, 10);
}

class ModalSlider extends Component {
  /*
  static propTypes = {
    rootStyle: PropTypes.object,
    className: PropTypes.string,
    style: PropTypes.object,

    pageWidth: PropTypes.number,
    maxPages: PropTypes.number,
    model: PropTypes.object,

    onClose: PropTypes.func
  }
  */

  static defaultProps = {
    INIT_ID: 'p0',
    model: {
      pageWidth: 100,
      maxPages: 2,
      p0: []
    }
  }

  constructor(props){
    super()
    const {
            INIT_ID,
            pageWidth, maxPages,
            model,
            onClose
          } = props
          , _pW = model.pageWidth || pageWidth
          , _maxP = model.maxPages || maxPages
          , pages = [];

    this._PAGE_WIDTH = _pW
    this._pagesStyle = {
      width: `${_maxP*_pW}px`
    }
    this._pageStyle = {
      width: `${_pW}px`,
    }

    pages.push(
     (
       <MenuPage
         key={INIT_ID}
         style={this._pageStyle}
         items={model[INIT_ID]}
         baseTitleCl={model.baseTitleCl}
         onNextPage={this.hNextPage}
         onClose={onClose}
       />
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
            onClose
          } = this.props;
    pages.push((
      <MenuPage
        key={id}
        //style={S.PAGE}
        style={this._pageStyle}
        //CL={CL}
        title={title}
        items={model[id]}
        baseTitleCl={model.baseTitleCl}
        onPrevPage={this.hPrevPage}
        onClose={onClose}
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
    const _WIDTH = this._PAGE_WIDTH;
    let dX = '0';
    if (this._direction !== 0 && this._pagesNode) {
      const _prevInt = _getTranslateX(this._pagesNode);
      dX = this._direction === 1
         ? _prevInt-_WIDTH
         : _prevInt+_WIDTH
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
    const { _pagesStyle, _pageStyle } = this
        , { isShow, className, rootStyle, style, onClose } = this.props
        , _transform = this._crTransform()
        , _showHideStyle = {
            ...style,
            ...S.SHOW_HIDE,
            ..._pageStyle
          }
        , _divStyle = {
             ...S.PAGES,
             ..._pagesStyle,
             ..._transform
           };
    return (
      <ModalPane
        isShow={isShow}
        style={rootStyle}
        onClose={onClose}
      >
        <ShowHide
          className={className}
          style={_showHideStyle}
          isShow={isShow}
        >
          <div
            ref={this._refPages}
            style={_divStyle}
          >
            {this._renderPages()}
          </div>
        </ShowHide>
      </ModalPane>
    );
  }
}

export default ModalSlider
