import AdapterFn from './AdapterFn'

const { numberFormat } = AdapterFn;

const crTableConfig = ({
  id,
  title,
  headers,
  rows,
  dataSource,
  fns={}
}) => ({
  id,
  title,
  headers,
  tableFn: {
    numberFormat,
    ...fns
  },
  rows,
  dataSource,
  zhCompType: 'TABLE',
  zhConfig: {
    id: id, key: id
  }
})

export default crTableConfig
