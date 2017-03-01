'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
    LI: {
        float: 'left',
        display: 'inline-block',

        backgroundColor: '#232F3B',

        //color : 'rgba(164, 135, 212, 1)',
        color: 'gray',
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingTop: '6px',
        paddingBottom: '6px',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        cursor: 'pointer',

        fontWeight: 'bold',
        //border: '2px solid rgb(44, 40, 40)',
        border: '2px solid gray',
        borderBottom: 'none'
    },
    SELECTED: {
        borderColor: 'rgba(164, 135, 212, 1)',
        color: 'rgba(164, 135, 212, 1)'
    }
};

var Tab = function Tab(props) {
    var title = props.title,
        isSelected = props.isSelected,
        onClick = props.onClick;

    var _selectedStyle = isSelected ? S.SELECTED : null;
    return _react2.default.createElement(
        'li',
        {
            style: Object.assign({}, S.LI, _selectedStyle),
            onClick: onClick
        },
        _react2.default.createElement(
            'span',
            null,
            title
        )
    );
};

exports.default = Tab;
//# sourceMappingURL=Tab.js.map