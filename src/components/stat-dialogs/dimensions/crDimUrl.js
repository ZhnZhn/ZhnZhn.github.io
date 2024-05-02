import crDimUrlEs from './crDimUrlEs';

const _crDimUrl = ({
  proxy='',
  baseMeta,
  dfId
}) => `${proxy}${baseMeta}/${dfId}`;

const _crDimUrlFso = ({
  proxy='',
  baseMeta,
  dfId
}) => `${proxy}${baseMeta}/${dfId}/${dfId}.px`;

const _rCrDimUrl = {
  DF: _crDimUrl,
  EU_STAT: crDimUrlEs,
  FSO: _crDimUrlFso
};

const _crUrl = props =>
  (_rCrDimUrl[props.loadId] || _rCrDimUrl.DF)(props);

const crDimUrl = props => props.dimUrl
  || _crUrl(props);

export default crDimUrl
