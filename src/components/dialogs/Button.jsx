import React from 'react'

import FlatButton from '../zhn-m/FlatButton'

const S = {
  LOAD: {
    color: '#607d8b'
  },
  SHOW: {
    color: '#232f3b'
  }
};

const Load = ({ onClick }) => (
  <FlatButton
    rootStyle={S.LOAD}
    caption="Load"
    title="Load Item to Container"
    //accessKey="l"
    onClick={onClick}
  />
);

const Show = ({ onClick }) => (
  <FlatButton
    rootStyle={S.SHOW}
    caption="Show"
    title="Show Item Container"
    //accessKey="s"
    onClick={onClick}
  />
);

export default { Load, Show, Flat: FlatButton }
