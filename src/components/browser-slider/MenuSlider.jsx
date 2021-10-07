import { Component, createRef } from 'react'

import throttleOnce from '../../utils/throttleOnce'

import fOnClickItem from './factoryClickItem'
import loadItems from './loadItems'

import Frame from './Frame'
import PageList from './PageList'

const S_ROOT = {
  width: 300,
  overflow: 'hidden'
}
, S_PAGES = {
  width: 1500,
  overflowX: 'hidden',
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'flex-start',
  transition: 'all 750ms ease-out'
}
, S_PAGE = { width: 300 };

const _getTranslateX = (node) => {
  const _prevStr = node
     .style.transform
     .substring(11)
     .replace('px', '')
     .replace(')', '');
   return parseInt(_prevStr, 10);
}

class MenuSlider extends Component {

  constructor(props){
    super(props)
    this.hNextPage = throttleOnce(
      this.hNextPage.bind(this)
    )
    this.hPrevPage = throttleOnce(
      this.hPrevPage.bind(this)
    )
    this._refMenu = createRef()
    this._direction = 0

    this._fOnClickItem = ({ id, text }) => this
      .hNextPage.bind(null, id, text, 0)

    this.state = {
      pageCurrent: 0,
      pages: []
    }
  }

  hPrevPage = (pageNumber) => {
    this.setState(({ pageCurrent }) => {
      if (pageCurrent === 0 || pageCurrent !== pageNumber) {
        return null;
      }
      this._direction = -1
      return { pageCurrent: pageNumber - 1};
    })
  }

  _addPage = (pages, id, title) => {
    const { dfProps, store } = this.props;
    pages.push((
      <Frame
        key={id}
        id={id}
        style={S_PAGE}
        store={store}
        title={title}
        dfProps={dfProps}
        onClickPrev={this.hPrevPage}
        onClickNext={this.hNextPage}
        loadItems={loadItems}
        fOnClickItem={fOnClickItem}
      />
    ))
  }


  hNextPage = (id, title, pageNumber) => {
    this.setState(({ pageCurrent, pages }) => {
       if (pageNumber !== pageCurrent) {
         return null;
       }

      if (pageNumber < pages.length) {
        if (pages[pageNumber] && pages[pageNumber].key !== id) {
           if (pageNumber>0) {
             pages.splice(pageNumber)
           } else {
             pages = []
           }
           this._addPage(pages, id, title)
        }
      } else {
        this._addPage(pages, id, title)
      }

      this._direction = 1
      return { pages, pageCurrent: pageNumber + 1};
    })
  }


 _crTransform = () => {
   let dX = '0';
   const _menuNode = this._refMenu.current;
   if (this._direction !== 0 && _menuNode) {
     const _prevInt = _getTranslateX(_menuNode);
     dX = this._direction === 1
       ? _prevInt-300
       : _prevInt+300
     this._direction = 0
   } else if (this._direction === 0 && _menuNode) {
     dX = _getTranslateX(_menuNode);
   }

   return { transform: `translateX(${dX}px)` };
 }

  render(){
    const { dfProps, store } = this.props
    , { pages, pageCurrent } = this.state
    , _transform = this._crTransform()
    , _pagesStyle = {...S_PAGES, ..._transform};

    return (
      <div style={S_ROOT}>
        <div
          ref={this._refMenu}
          style={_pagesStyle}
        >
          <Frame
            style={S_PAGE}
            title="Main Menu"
            store={store}
            dfProps={dfProps}
            pageCurrent={pageCurrent}
            pageNumber={0}
            onClickNext={this.hNextPage}
            loadItems={loadItems}
            fOnClickItem={fOnClickItem}
          />
          <PageList
            pages={pages}
            pageCurrent={pageCurrent}
          />
        </div>
      </div>
    );
  }
}

export default MenuSlider
