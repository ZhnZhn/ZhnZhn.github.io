const S_PB_4 = { paddingBottom: 4 };

const StepTitle = ({
  step,
  stepStyle,
  title
}) => (
  <p style={S_PB_4}>
    <span style={stepStyle}>
      {step}
    </span>
    <span>
       &nbsp;{title}.
    </span>
  </p>
);

export default StepTitle
