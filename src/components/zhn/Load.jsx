const FAILED_COLOR = '#f44336'
, S_LOADING = { margin: '16px auto' }
, S_LOAD_FAILED = { borderColor: FAILED_COLOR }
, S_ERR_MSG = {
  color: FAILED_COLOR,
  paddingLeft: 16,
  fontWeight: 600
};

const Loading = () => (
  <div
    data-loader="circle"
    style={S_LOADING}
  />
);
const LoadFailed = ({ errMsg='' }) => (
  <>
    <div
      data-loader="circle-failed"
      style={{...S_LOADING, ...S_LOAD_FAILED}}
    />
    <p style={S_ERR_MSG}>
      {`${errMsg}: Network error.`}
    </p>
  </>
);

const Load = {
  Loading,
  LoadFailed
};

export default Load;
