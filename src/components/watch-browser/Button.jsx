import React from 'react'

import FlatButton from '../zhn-m/FlatButton'

const S = {
  BT_ROOT: {
    color: 'rgb(35, 47, 59)'
  }
}

const Clear = ({ onClick }) =>
  <FlatButton
    rootStyle={S.BT_ROOT}
    caption="Clear"
    title="Clear Input"
    onClick={onClick}
/>

const Close = ({ onClick }) =>
  <FlatButton
    rootStyle={S.BT_ROOT}
    caption="Close"
    title="Close Dialog"
    onClick={onClick}
  />

const Primary = ({ caption, title, onClick }) =>
    <FlatButton
      caption={caption}
      title={title}
      isPrimary={true}
      onClick={onClick}
    />


export default { Primary, Clear, Close, Flat: FlatButton }
