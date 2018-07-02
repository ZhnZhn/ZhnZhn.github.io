import React, { Component } from 'react'

import throttleOnce from '../../utils/throttleOnce'

import fOnClickItem from './factoryClickItem'
import loadItems from './loadItems'

import Frame from './Frame'
import MenuItem from './MenuItem'
import ErrMsg from './ErrMsg'

const S = {
  ROOT: {
    width: '300px',
    overflow: 'hidden',
    //border: '1px solid green'
  },
  PAGES: {
    width: '1500px',
    overflowX: 'hidden',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'flex-start',
    transition: 'all 750ms ease-out'
  },
  PAGE: {
    width: '300px'
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

class MenuSlider extends Component {

  constructor(props){
    super()
    this.hNextPage = throttleOnce(
      this.hNextPage.bind(this)
    )
    this.hPrevPage = throttleOnce(
      this.hPrevPage.bind(this)
    )
    this._direction = 0
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
            this.setState({ model, errMsg: undefined })
         }
      })
      .catch(err => {
         this.setState({ errMsg: err.message })
      })
  }


  hPrevPage = (pageNumber) => {
    this.setState(prevState => {
      prevState.pageCurrent = pageNumber - 1
      this._direction = -1
      return prevState;
    })
  }

  _addPage = (pages, id, title) => {
    const { dfProps, store } = this.props;
    pages.push((
      <Frame
        key={id}
        id={id}
        rootStyle={S.PAGE}
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
      this._direction = 1
      return prevState;
    })
  }


_refFirst = n => this._firstNode = n

 _renderMenu = () => {
   const { model, errMsg } = this.state
       , items = model.map((item, index) => {
           const { text, id } = item
                , _ref = index === 0
                    ? this._refFirst
                    : void 0;
           return (
             <MenuItem
               ref={_ref}
               key={id}
               item={item}
               onClick={this.hNextPage.bind(null, id, text, 0)}
             />
           );
         })

   return (
     <div style={S.PAGE}>
       {items}
       <ErrMsg errMsg={errMsg} />
     </div>
   );
 }


  _renderPages = () => {
    const { pages, pageCurrent } = this.state;
    return pages.map((page, index) => {
      return React.cloneElement(page, {
        pageCurrent,
        pageNumber: index + 1,
      });
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
           {this._renderMenu()}
           {this._renderPages()}
        </div>
      </div>
    );
  }

  focusFirst = () => {
    if (this._firstNode){
      this._firstNode.focus()
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
