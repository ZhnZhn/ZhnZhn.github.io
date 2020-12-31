const S = {
  SPINNER_LOADING : {
    position: 'relative',
    display: 'block',
    width: 32,
    height: 32,
    textAlign: 'middle',
    margin: '32px auto 0'
  }
};

const SpinnerLoading = ({ style }) => (
  <span
     style={{...S.SPINNER_LOADING, ...style}}
     data-loader="circle"
   />
);

export default SpinnerLoading
