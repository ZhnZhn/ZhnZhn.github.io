import {
  useState,
  useCallback
} from '../uiApi';

const S_DATA_SOURCE = {
  position: 'absolute',
  left: 5,
  bottom: 0,
  color: '#909090',
  fontSize: '11px'
};

const DataSource = ({ ds }) => (
  <div style={S_DATA_SOURCE}>
    {ds || ''}
  </div>
);

const useDataSourceEl = (dataSource) => {
  const [dataSourceEl, setDataSourceEl] = useState(() => (
      <DataSource ds={dataSource}/>
    ))
  , _setDataSourceEl = useCallback((dataSource) => {
      setDataSourceEl(<DataSource ds={dataSource} />)
    }, [])
  return [dataSourceEl, _setDataSourceEl];
};

export default useDataSourceEl
