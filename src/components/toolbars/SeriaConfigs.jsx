import A from '../zhn/A';

const S = {
  ROW: {
    paddingTop: 5
  },
  fnSpan: color => ({
    color, paddingLeft: 8
  })
};

const SeriaConfigs = ({ configs, onRemove }) => (
  <div>
  { configs.map(({ id, color }) => (
      <div key={id} style={S.ROW}>
        <A.SvgMinus onClick={onRemove.bind(null, id)} />
        <span style={S.fnSpan(color)}>{id}</span>
      </div>
    ))
  }
  </div>
);

export default SeriaConfigs
