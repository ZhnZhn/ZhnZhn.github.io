import jenksBreaks from './jenksBreaks';
import jenksMatrices from './jenksMatrices';

function jenks(data, nClasses) {
  if (nClasses > data.length) {
    return null;
  }

  // sort data in numerical order, since this is expected
  // by the matrices function
  data = data
    .slice()
    .sort((a, b) => a - b);

  // get our basic matrices
  const matrices = jenksMatrices(data, nClasses);
  // we only need lower class limits here
  const lowerClassLimits = matrices.lowerClassLimits;

  // extract nClasses out of the computed matrices
  return jenksBreaks(data, lowerClassLimits, nClasses);
}

export default jenks;
