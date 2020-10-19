const S = {
  STEP: {
    display: 'inline-block',
    color: '#80c040',
    border: '2px solid #80c040',
    borderRadius: '50%',
    lineHeight: '24px',
    width: 26,
    height: 26,
    textAlign: 'center',
    textTransform: 'uppercase'
  }
};

const Step = ({ step='0' }) => (
  <span style={S.STEP}>
      {step}
  </span>
);

export default Step
