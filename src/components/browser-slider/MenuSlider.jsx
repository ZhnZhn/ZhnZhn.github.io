import { Component, createRef } from 'react'

import throttleOnce from '../../utils/throttleOnce'

import fOnClickItem from './factoryClickItem'
import loadItems from './loadItems'

import Frame from './Frame'
import MenuList from './MenuList'
import ErrMsg from './ErrMsg'
import PageList from './PageList'

const S = {
  ROOT: {
    width: 300,
    overflow: 'hidden'
  },
  PAGES: {
    width: 1500,
    overflowX: 'hidden',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'flex-start',
    transition: 'all 750ms ease-out'
  },
  PAGE: {
    width: 300
  }
};

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
    this._direction = 0
    this._refFirstItem = createRef()

    this._fOnClickItem = ({ id, text }) => this
      .hNextPage.bind(null, id, text, 0)

    this.state = {
      model: [],
      pageCurrent: 0,
      pages: []
    }
  }

  componentDidMount(){
    this._loadItems()
  }

  _loadItems = () => {
    const { dfProps={}, store } = this.props
        , { lT } = dfProps
        , proxy = store.getProxy(lT);
    loadItems(dfProps.rootUrl, proxy)
      .then(model => {
         if (Array.isArray(model)) {
            this.setState({ model, errMsg: void 0})
         } else {
           throw new Error('Response is not array');
         }
      })
      .catch(err => {
         this.setState({ errMsg: err.message })
      })
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
        style={S.PAGE}
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
   if (this._direction !== 0 && this._menuNode) {
     const _prevInt = _getTranslateX(this._menuNode);
     if ( this._direction === 1 ) {
       dX = _prevInt-300
     } else {
       dX = _prevInt+300
     }
     this._direction = 0
   } else if (this._direction === 0 && this._menuNode) {
     dX = _getTranslateX(this._menuNode);
   }

   return { transform: `translateX(${dX}px)` };
 }

  _refMenu = n => this._menuNode = n

  render(){
    const {
      model, errMsg,
      pages, pageCurrent
    } = this.state
    const _transform = this._crTransform()
    , _pagesStyle = {
         ...S.PAGES,
         ..._transform
       };

    return (
      <div style={S.ROOT}>
        <div
          ref={this._refMenu}
          style={_pagesStyle}
        >
          <div style={S.PAGE}>
            <MenuList
              refFirstItem={this._refFirstItem}
              model={model}
              fOnClickItem={this._fOnClickItem}
            />
            <ErrMsg errMsg={errMsg} />
          </div>
          <PageList
            pages={pages}
            pageCurrent={pageCurrent}
          />
        </div>
      </div>
    );
  }

  focusFirst = () => {
    const _nodeItem = this._refFirstItem.current;
    if (_nodeItem) {
      _nodeItem.focus()
    }
  }

  componentDidUpdate(){
    const { pageCurrent } = this.state;
    if (pageCurrent === 0) {
       setTimeout(this.focusFirst, 1000)
    }
  }
}

export default MenuSlider
