import React, { Component } from 'react'

import MenuTitle from './MenuTitle'
import MenuItem from './MenuItem'
import ErrMsg from './ErrMsg'

const T_O_FOCUS_FIRST = 1000;

const _isArr = Array.isArray;

class Frame extends Component {

  state = {
    model: []
  }

  componentDidMount(){
    const { title, id } = this.props;
    if (title) {
      this.loadMenu(id)
    }
  }

  loadMenu = (id) => {

    const { dfProps={}, loadItems, store } = this.props
        , { lT } = dfProps
        , proxy = store.getProxy(lT);
    loadItems(`${dfProps.rootUrl}/${id}`, proxy)
      .then(model => {
        if (_isArr(model)){
           this.setState({ model, errMsg: undefined })
        }
      })
      .catch(err => {
         this.setState({ errMsg: err.message })
      })
  }

  _renderMenu = () => {
    const { dfProps={}, pageNumber, store } = this.props
        , { lT } = dfProps
        , proxy = store.getProxy(lT)
        , { model } = this.state
        , {
            onClickNext,
            fOnClickItem,
            id:rootId
          } = this.props
        , items = model.map(item => {
            const { text, id, type } = item
                , _onClick = type === 'l'
                    ? onClickNext.bind(null, `${rootId}/${id}`, text, pageNumber)
                    : fOnClickItem({
                         id: `${rootId}/${id}`,
                         ...dfProps,
                         text,
                         proxy
                       })
             return (
               <MenuItem
                 key={id}
                 item={item}
                 onClick={_onClick}
               />
              );
          });

    return (
      <div>
        {items}
      </div>
    );
  }

 _refFirst = n => this._firstNode = n

  render(){
    const { title, rootStyle, pageNumber, onClickPrev } = this.props
        , { errMsg } = this.state;

    return (
      <div style={rootStyle}>
        <MenuTitle
          ref={this._refFirst}
          title={title}
          onClick={onClickPrev.bind(null, pageNumber)}
        />
        {this._renderMenu()}
        <ErrMsg errMsg={errMsg} />
      </div>
    );
  }

  focusFirst = () => {
    if (this._firstNode) {
      this._firstNode.focus()
    }
  }

  componentDidUpdate(prevProps){
    const { pageNumber, pageCurrent } = this.props;
    if ( pageNumber === pageCurrent ) {
      setTimeout(this.focusFirst, T_O_FOCUS_FIRST)
    }
  }
}

export default Frame
