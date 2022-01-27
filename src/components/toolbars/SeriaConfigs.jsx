import A from '../zhn/A';

const S_ROW = { paddingTop: 5 }
, crSpanStyle = color => ({
   color, paddingLeft: 8
});

const SeriaConfigs = ({ 
  configs,
  onRemove
}) => (
  <div>
  { configs.map(({ id, color }) => (
      <div key={id} style={S_ROW}>
        <A.SvgMinus onClick={onRemove.bind(null, id)} />
        <span style={crSpanStyle(color)}>{id}</span>
      </div>
    ))
  }
  </div>
);

export default SeriaConfigs
