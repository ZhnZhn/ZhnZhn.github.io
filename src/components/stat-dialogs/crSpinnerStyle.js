
const S_SPINNER_LOADING = { margin: '16px auto 32px' }
, S_SPINNER_FAILED = {
  ...S_SPINNER_LOADING,
  borderColor: '#f44336',
  animation: 'none'
};

const crSpinnerStyle = (isLoading, isLoadFailed) =>
 isLoading
   ? S_SPINNER_LOADING
   : isLoadFailed
     ? S_SPINNER_FAILED
     : void 0;

export default crSpinnerStyle
