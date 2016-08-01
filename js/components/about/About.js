'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ComponentActions = require('../../flux/actions/ComponentActions');

var _ChartActions = require('../../flux/actions/ChartActions');

var _ScrollPane = require('../zhn/ScrollPane');

var _ScrollPane2 = _interopRequireDefault(_ScrollPane);

var _CaptionRow = require('../CaptionRow');

var _CaptionRow2 = _interopRequireDefault(_CaptionRow);

var _Step = require('./Step');

var _Step2 = _interopRequireDefault(_Step);

var _Token = require('./Token');

var _Token2 = _interopRequireDefault(_Token);

var _LinkToken = require('./LinkToken');

var _LinkToken2 = _interopRequireDefault(_LinkToken);

var _IconLogoBar = require('./IconLogoBar');

var _IconLogoBar2 = _interopRequireDefault(_IconLogoBar);

var _ContainerStyles = require('../styles/ContainerStyles.js');

var _ContainerStyles2 = _interopRequireDefault(_ContainerStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = _ContainerStyles2.default;

var Styles = {
  scrollDiv: {
    overflowY: 'auto',
    height: '92%',
    //height: 'calc(100vh - 90px)',
    paddingRight: '10px'
  }
};

var About = _react2.default.createClass({
  displayName: 'About',
  getInitialState: function getInitialState() {
    return {
      isShow: this.props.isShow
    };
  },


  componentWillMount: function componentWillMount() {
    this.unsubscribe = this.props.store.listen(this._onStore);
  },
  componentWillUnmount: function componentWillUnmount() {
    this.unsubscribe();
  },
  _onStore: function _onStore(actionType, data) {
    if (actionType === _ComponentActions.ComponentActionTypes.SHOW_ABOUT) {
      this.setState({ isShow: true });
    } else if (actionType === _ChartActions.ChartActionTypes.INIT_AND_SHOW_CHART) {
      this.setState({ isShow: false });
    } else if (actionType === _ChartActions.ChartActionTypes.SHOW_CHART) {
      this.setState({ isShow: false });
    }
  },
  _handlerClose: function _handlerClose() {
    this.setState({ isShow: false });
  },
  render: function render() {
    var classOpen = this.state.isShow ? "show-popup" : null;
    var styleOpen = this.state.isShow ? { display: 'block' } : { display: 'none' };

    return _react2.default.createElement(
      'div',
      { className: classOpen, style: Object.assign({}, styles.aboutRootDiv, styleOpen) },
      _react2.default.createElement(_CaptionRow2.default, {
        caption: 'About',
        onClose: this._handlerClose
      }),
      _react2.default.createElement(
        _ScrollPane2.default,
        { style: Styles.scrollDiv },
        _react2.default.createElement(
          'div',
          { style: { paddingLeft: '5px', paddingRight: '5px', lineHeight: 1.4 } },
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(
              _Token2.default,
              { color: '#80c040' },
              'ERC'
            ),
            _react2.default.createElement(
              _Token2.default,
              { color: 'gray', isFirstBlank: true },
              'is a economic RESTful client.'
            )
          ),
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(
              _Token2.default,
              { color: 'gray' },
              'With it you can view economic free open data from WEB.'
            )
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(_Step2.default, { step: '1' }),
            _react2.default.createElement(
              _Token2.default,
              { color: 'black', isFirstBlank: true },
              'Choose a data source from the header bar'
            )
          ),
          _react2.default.createElement(
            'p',
            { style: { marginTop: '3px' } },
            _react2.default.createElement(_Step2.default, { step: '2' }),
            _react2.default.createElement(
              _Token2.default,
              { color: 'black', isFirstBlank: true },
              'Choose a dataset menu item in a Browser'
            )
          ),
          _react2.default.createElement(
            'p',
            { style: { marginTop: '3px' } },
            _react2.default.createElement(_Step2.default, { step: '3' }),
            _react2.default.createElement(
              _Token2.default,
              { color: 'black', isFirstBlank: true },
              'Select a data item and enter query date in a dragable Dialog'
            )
          ),
          _react2.default.createElement(
            'p',
            { style: { marginTop: '3px' } },
            _react2.default.createElement(_Step2.default, { step: '4' }),
            _react2.default.createElement(
              _Token2.default,
              { color: 'black', isFirstBlank: true },
              'Click a button Load'
            )
          ),
          _react2.default.createElement(
            'p',
            { style: { marginTop: '3px' } },
            _react2.default.createElement(
              _Token2.default,
              { color: 'gray' },
              'The result will be shown in a Chart in a Chart container.'
            )
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(
              _Token2.default,
              { color: 'gray' },
              'After clicking a button Show in a Dialog will be opened Chart container with Charts or empty. After closing a Chart container all Charts remains.'
            )
          ),
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(
              _Token2.default,
              { color: 'gray' },
              'In one time max three Dalogs can be opened.'
            )
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(
              _Token2.default,
              { color: '#F44336' },
              'Attention:'
            ),
            _react2.default.createElement(
              _Token2.default,
              { color: 'gray', isFirstBlank: true },
              'For one item from Dialog can be only one Chart in a container. If you want change query parameters for it, close the chart in the container and load data again.'
            )
          ),
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(
              _Token2.default,
              { color: 'gray' },
              'The value of currency is not always USD as shows in a chart tooltip. Sometimes more details about data can be look at tab Info on a Chart.'
            )
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(
              _Token2.default,
              { color: 'gray' },
              'In that case all data load from'
            ),
            _react2.default.createElement(
              _LinkToken2.default,
              {
                href: 'https://www.quandl.com/',
                color: '#E05927',
                isFirstBlank: true
              },
              'Quandl'
            ),
            _react2.default.createElement(
              _Token2.default,
              { color: 'gray', isFirstBlank: true },
              'REST services. For accessing without Api Key, exists some restriction on frequency and amount queries (',
              _react2.default.createElement(
                _Token2.default,
                { color: '#2f7ed8' },
                '50 calls per day'
              ),
              _react2.default.createElement(
                _Token2.default,
                { color: 'gray' },
                ').'
              )
            )
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(
              _Token2.default,
              { color: 'gray' },
              'A Quandl Api Key, for using with ERC, can be set in dialog Settings/User Settings. Settings saves in browser\'s memory only for current WEB session.'
            )
          ),
          _react2.default.createElement(_IconLogoBar2.default, null)
        )
      )
    );
  }
});

exports.default = About;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\about\About.js.map