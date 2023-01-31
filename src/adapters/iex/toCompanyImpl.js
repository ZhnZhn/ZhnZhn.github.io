import { toStr } from './toFns';

const _crEmployees = ({
  employees
}) => toStr(employees);
const _crExchange = ({
  exchange
}) => exchange === 'New York Stock Exchange'
  ? 'NYSE'
  : exchange;
const _crIssueType = ({
  issueType
}) => (issueType || '').toUpperCase();
const _crWebSite = ({
  website
}) => (website || '').replace('http://', '');

const toCompanyImpl = {
  CONFIGS: [
    'country',
    'city',
    'state',
    _crEmployees,
    'sector',
    'industry',
    _crExchange,
    _crIssueType,
    'securityName',
    _crWebSite
  ],
  crCaption: ({ companyName, symbol }) => companyName + ' ' + symbol,
  crDesr: ({ description }) => description || ''
};

export default toCompanyImpl
