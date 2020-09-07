import React, { Component } from 'react'

import throttleOnce from '../../utils/throttleOnce'

import ModalPane from '../zhn-moleculs/ModalPane'
import ShowHide from '../zhn/ShowHide'

import MenuPage from './MenuPage'

const S = {
  SHOW_HIDE: {
    position: 'absolute',
    overflow: 'hidden'
  },
  PAGES: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'flex-start',
    overflowX: 'hidden',
    transition: 'all 750ms ease-out'
  }
};

const _crInitialState = (model, INIT_ID) => ({
  pageCurrent: 1,
  pages: [
    <MenuPage
      key={INIT_ID}
      items={model[INIT_ID]}
      titleCl={model.titleCl}
      itemCl={model.itemCl}
    />
  ],
  model
});

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
    super(props)
    const {
      INIT_ID,
      pageWidth, maxPages,
      model
    } = props
    , _pW = model.pageWidth || pageWidth
    , _maxP = model.maxPages || maxPages;

    this._PAGE_WIDTH = _pW
    this._pagesStyle = {
      width: `${_maxP*_pW}px`
    }
    this._pageStyle = {
      width: `${_pW}px`,
    }

    this.hNextPage = throttleOnce(
      this.hNextPage.bind(this)
    )
    this.hPrevPage = throttleOnce(
      this.hPrevPage.bind(this)
    )

    this.state = _crInitialState(model, INIT_ID)
  }

  static getDerivedStateFromProps(nextProps, prevState){
    const { model, INIT_ID } = nextProps;
    return model !== prevState.model
      ? _crInitialState(model, INIT_ID)
      : null;
  }

  hPrevPage = (pageNumber) => {
    this.setState(prevState => {
      prevState.pageCurrent = pageNumber - 1
      return prevState;
    })
  }

  _addPage = (pages, id, title) => {
    const { model } = this.props;
    pages.push((
      <MenuPage
        key={id}
        title={title}
        items={model[id]}
        titleCl={model.titleCl}
        itemCl={model.itemCl}
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
      return prevState;
    })
  }

  _crTransform = () => {
    const { pageCurrent } = this.state
    , _dX = -1*this._PAGE_WIDTH*(pageCurrent - 1)+0;
    return { transform: `translateX(${_dX}px)` };
  }

  _refPages = n => this._pagesNode = n

  _renderPages = () => {
    const { onClose } = this.props
    , { pages, pageCurrent } = this.state;
    return pages.map((Page, index) => React.cloneElement(Page, {
      pageCurrent,
      style: this._pageStyle,
      pageNumber: index + 1,
      onNextPage: index === 0 ? this.hNextPage : void 0,
      onPrevPage: index !== 0 ? this.hPrevPage : void 0,
      onClose
    }));
  }

  render(){
    const { _pagesStyle, _pageStyle } = this
    , {
        isShow, className,
        rootStyle, style,
        onClose
      } = this.props
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
