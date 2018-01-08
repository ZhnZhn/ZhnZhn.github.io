import React from 'react'

import Step from './Step'

const StepTitle = ({ step, title }) => (
  <p>
    <Step step={step} />
    <span>
       &nbsp;{title}.       
    </span>
  </p>
);

export default StepTitle
