import { lazy, useMemo, Suspense } from 'react';
import useBool from '../hooks/useBool';

const S_LOADING = { color: '#2f7ed8'}
, CL_BT = 'bt'
, S_RETRY = { color: '#1b2836' };

const DfLoaderView = () => (
  <div style={S_LOADING}>Loading...</div>
);
const DfErrorRetryView = ({
  retry
}) => (
  <button
    type="button"
    className={CL_BT}
    style={S_RETRY}
    onClick={retry}
  >
    Retry
  </button>
);

const crRetryableLazy = (
	crLoadPromise,
	LoaderView = DfLoaderView,
	ErrorRetryView = DfErrorRetryView
) => {
	const RetryableLazy = props => {
    const [
      loading,
      retry,
      setLoadingFalse
    ] = useBool(true)
    /*eslint-disable react-hooks/exhaustive-deps */
		, LazyComponent = useMemo(() =>
       lazy(() => crLoadPromise()
         .catch(() => {
            setLoadingFalse()
					    return {
              default: () => <ErrorRetryView retry={retry} />
            };
					})
			 ), [loading]);
    // crLoadPromise, retry
    /*eslint-enable react-hooks/exhaustive-deps */

		return (
			<Suspense fallback={<LoaderView />}>
				<LazyComponent {...props} />
			</Suspense>
		);
	};

	return RetryableLazy;
};

export default crRetryableLazy;
