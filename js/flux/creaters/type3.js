'use strict';

Object.defineProperty(exports, "__esModule", {
      value: true
});

var createLoadOptions = function createLoadOptions() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var columnName = props.columnName,
          dataColumn = props.dataColumn,
          seriaColumnNames = props.seriaColumnNames,
          loadId = props.loadId,
          fnValue = props.fnValue,
          fnItemCaption = props.fnItemCaption,
          linkFn = props.linkFn,
          dataSource = props.dataSource,
          fromDate = options.fromDate,
          toDate = options.toDate,
          stock = options.stock,
          transform = options.transform,
          _value = typeof fnValue === 'function' ? fnValue(stock.value) : stock.value,
          _itemCaption = typeof fnItemCaption === 'function' ? fnItemCaption(stock.value) : undefined,
          _transform = transform ? transform.value : undefined,
          _subtitle = transform ? transform.caption : undefined;

      return {
            value: _value,
            transform: _transform,
            title: stock.caption,
            subtitle: _subtitle,
            stock: stock,
            fromDate: fromDate,
            toDate: toDate,
            columnName: columnName,
            dataColumn: dataColumn,
            itemCaption: _itemCaption,
            loadId: loadId,
            linkFn: linkFn,
            seriaColumnNames: seriaColumnNames, dataSource: dataSource
      };
};

exports.default = createLoadOptions;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\creaters\type3.js.map