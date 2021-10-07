const S_STEP = {
  display: 'inline-block',
  color: '#80c040',
  lineHeight: '24px',
  width: 26,
  height: 26,
  border: '2px solid #80c040',
  borderRadius: '50%',
  textAlign: 'center',
  textTransform: 'uppercase'
};

const StepTitle = ({ step, title }) => (
  <p>
    <span style={S_STEP}>
        {step}
    </span>
    <span>
       &nbsp;{title}.
    </span>
  </p>
);

export default StepTitle
