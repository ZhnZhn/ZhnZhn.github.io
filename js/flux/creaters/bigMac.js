'use strict';

Object.defineProperty(exports, "__esModule", {
     value: true
});
var createLoadOptions = function createLoadOptions() {
     var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
     var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

     var fnValue = props.fnValue,
         loadId = props.loadId,
         dataSource = props.dataSource,
         isPremium = props.isPremium,
         country = options.one,
         metric = options.two,
         fromDate = options.fromDate,
         toDate = options.toDate,
         _value = typeof fnValue === 'function' ? fnValue(country.value) : undefined,
         _dataColumn = metric ? metric.value : 1,
         _subtitle = metric ? metric.caption : 'Local Price';

     return {
          viewKey: _value + '_' + _dataColumn,
          value: _value,
          fromDate: fromDate,
          toDate: toDate,
          dataColumn: _dataColumn,
          itemCaption: country.caption,
          loadId: loadId,
          title: country.caption,
          subtitle: _subtitle,
          dataSource: dataSource,
          isPremium: isPremium
     };
};

exports.default = createLoadOptions;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\creaters\bigMac.js.map