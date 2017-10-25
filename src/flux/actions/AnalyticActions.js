import Reflux from 'reflux';

export const AnalyticActionTypes = {
  ANSWER_YES : 'answerYes',
  ANSWER_NO  : 'answerNo',
  NO_ANSWER  : 'noAnswer'
};
const A = AnalyticActionTypes;

const AnalyticActions = Reflux.createActions({
  [A.ANSWER_YES]: {},
  [A.ANSWER_NO]: {},
  [A.NO_ANSWER]: {}
});

export default AnalyticActions
