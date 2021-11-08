import crDimUrlEs from './crDimUrlEs';

const _crDimUrl = ({
  proxy='',
  baseMeta,
  dfId
}) => `${proxy}${baseMeta}/${dfId}`;

const _rCrDimUrl = {
  DF: _crDimUrl,
  EU_STAT: crDimUrlEs
};

const _crUrl = props =>
  (_rCrDimUrl[props.loadId] || _rCrDimUrl.DF)(props);

const crDimUrl = props => props.dimUrl
  || _crUrl(props);

export default crDimUrl
