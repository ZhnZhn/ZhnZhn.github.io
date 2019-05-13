import React from 'react'

const FAILED_COLOR = '#f44336';
const S = {
  LOADING: {
    margin: '16px auto'
  },
  LOAD_FAILED: {
    borderColor: FAILED_COLOR
  },
  ERR_MSG: {
    color: FAILED_COLOR,
    paddingLeft: 16,
    fontWeight: 600
  }
};

const Loading = () => (
  <div
    data-loader="circle"
    style={S.LOADING}
  />
);
const LoadFailed = ({ errMsg='' }) => (
  <React.Fragment>
    <div
      data-loader="circle-failed"
      style={{...S.LOADING, ...S.LOAD_FAILED}}
    />
    <p style={S.ERR_MSG}>
      {`${errMsg}: Network error.`}
    </p>
  </React.Fragment>
);

const Load = {
  Loading,
  LoadFailed
};

export default Load;
