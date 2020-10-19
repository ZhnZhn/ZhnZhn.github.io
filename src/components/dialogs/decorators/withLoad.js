import D from '../DialogCell'

const _crCommandsWithLoad = function(comp) {
  return [
    <D.Button.Load key="load" onClick={comp._handleLoad} />
  ];
};

const withLoad = (target) => {
  Object.assign(target.prototype, {
    _crCommandsWithLoad
  })
};

export default withLoad
