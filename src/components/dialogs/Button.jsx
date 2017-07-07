import React from 'react'

import FlatButton from '../zhn-m/FlatButton'

const S = {
  LOAD: {
    color: '#607D8B'
  },
  SHOW: {
    color: 'rgb(35, 47, 59)'
  }
};

const Load = ({ onClick }) =>
  <FlatButton
    rootStyle={S.LOAD}
    caption="Load"
    title="Load Item to Pane Container"
    //accessKey="l"
    onClick={onClick}
  />

  const Show = ({ onClick }) =>
    <FlatButton
      rootStyle={S.SHOW}
      caption="Show"
      title="Show Pane Container"
      //accessKey="s"
      onClick={onClick}
    />


export default { Load, Show, Flat: FlatButton }
