const STEP_COLOR = '#80c040' 
, S_PB_4 = { paddingBottom: 4 }
, S_STEP = {
  display: 'inline-block',
  color: STEP_COLOR,
  width: 26,
  height: 26,
  border: `2px solid ${STEP_COLOR}`,
  borderRadius: '50%',
  textAlign: 'center',
  textTransform: 'uppercase'
};

const StepTitle = ({ step, title }) => (
  <p style={S_PB_4}>
    <span style={S_STEP}>
        {step}
    </span>
    <span>
       &nbsp;{title}.
    </span>
  </p>
);

export default StepTitle
