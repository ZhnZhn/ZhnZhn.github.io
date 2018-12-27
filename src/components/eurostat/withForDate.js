
const _getDateWithForDate = function() {
  if (this.date && this.date.value) {
    return this.date.value;
  }
  const { dateOptions, dateDefault } = this.state;
  return Array.isArray(dateOptions) && dateOptions.length !== 0
     ? dateDefault
     : '';
};

const withForDate = (target) => {
  Object.assign(target.prototype, {
    _getDateWithForDate
  })
};

export default withForDate
