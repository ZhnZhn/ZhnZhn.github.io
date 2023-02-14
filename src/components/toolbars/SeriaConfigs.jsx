import SvgMinus from '../zhn/SvgMinus';

const S_ROW = { paddingTop: 5 }
, _crSpanStyle = color => ({
   color,
   paddingLeft: 8
});

const SeriaConfigs = ({
  configs,
  onRemove
}) => configs.map(({ id, color }) => (
   <div key={id} style={S_ROW}>
     <SvgMinus onClick={() => onRemove(id)} />
     <span style={_crSpanStyle(color)}>{id}</span>
   </div>
))

export default SeriaConfigs
