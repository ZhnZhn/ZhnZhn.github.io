const fs = require('fs')

const postProcessing = prevHtml => {
  let nextHtml;
  try {
    const str = fs.readFileSync('./dll/stats.json');
    const stats = JSON.parse(str);
    const lib = stats.lib;
    nextHtml = prevHtml.replace(
      '<!--lib-->',
      '<script src="app/'+ lib + '" defer></script>'
    );
  } catch(err) {
    console.log(err.message)
    return prevHtml;
  }
  return nextHtml;
}

module.exports = postProcessing
