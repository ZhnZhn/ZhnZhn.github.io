
import fTableApi from '../stat-json/fTableApi'

const ROOT_URL = 'https://api.scb.se/OV0104/v1/doris/en/ssd';
const TableApi = fTableApi(ROOT_URL);

export default TableApi
