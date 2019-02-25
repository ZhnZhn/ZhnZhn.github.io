import fTableApi from '../stat-json/fTableApi'

const ROOT_URL = 'https://pxnet2.stat.fi/PXWeb/api/v1/en/StatFin'
const TableApi = fTableApi(ROOT_URL);

export default TableApi
