import fTableApi from '../stat-json/fTableApi';

const ROOT_URL = 'https://api.statbank.dk/v1/data';
const TableApi = fTableApi(ROOT_URL);

export default TableApi
