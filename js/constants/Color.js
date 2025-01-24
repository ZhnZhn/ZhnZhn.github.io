"use strict";

exports.__esModule = true;
exports.COLOR_Y_TICK = exports.COLOR_Y_LINE = exports.COLOR_Y_LABEL = exports.COLOR_Y_GRID_LINE = exports.COLOR_X_TICK = exports.COLOR_X_LINE = exports.COLOR_X_LABEL = exports.COLOR_X_GRID_LINE = exports.COLOR_WHITE = exports.COLOR_TOOLTIP = exports.COLOR_TITLE_SHOW = exports.COLOR_TITLE_HIDE = exports.COLOR_S_STOCK_CLOSE = exports.COLOR_S_OPEN = exports.COLOR_S_LOW = exports.COLOR_S_HIGH = exports.COLOR_SPLIT_RATIO = exports.COLOR_RED = exports.COLOR_PLOT_PRINT = exports.COLOR_PLOT_G3 = exports.COLOR_PLOT_G2 = exports.COLOR_PLOT_G1 = exports.COLOR_PLOT = exports.COLOR_MONO_BASE3 = exports.COLOR_MONO_BASE2 = exports.COLOR_MONO_BASE1 = exports.COLOR_METRIC_TITLE = exports.COLOR_MARKER_HOVER_LINE = exports.COLOR_MARKER_HOVER_FILL = exports.COLOR_MARKER_HOVER = exports.COLOR_LOW = exports.COLOR_LINE_PRINT = exports.COLOR_LEGEND_ITEM_HOVER = exports.COLOR_LEGEND_ITEM_HIDDEN = exports.COLOR_LEGEND_ITEM = exports.COLOR_LABEL_LINK = exports.COLOR_HOVER = exports.COLOR_HIGH = exports.COLOR_HALO_BASE = exports.COLOR_GRID_LINE_PRINT = exports.COLOR_GREY = exports.COLOR_GREEN = exports.COLOR_EX_DIVIDEND = exports.COLOR_DATE = exports.COLOR_CROSSHAIR = exports.COLOR_COLUMN_MARKER_LINE = exports.COLOR_COLUMN_HOVER_LINE = exports.COLOR_CHART_TITLE = exports.COLOR_CHART_SUBTITLE = exports.COLOR_CHART_PRINT = exports.COLOR_CHART = exports.COLOR_BLUE = exports.COLOR_BG_TITLE = exports.COLOR_AREA_MARKER_LINE = exports.COLOR_AREA_HOVER_LINE = exports.COLOR_AREA_FILL_PRINT = void 0;
const P_HIGH = '#4caf50',
  P_RED = '#f44336',
  P_BLUE = '#2f7ed8',
  P_SIREN = '#a487d4',
  P_YELLOW = '#f1d600',
  P_GREY = 'grey',
  P_DARK_GREY = '#4d4d4d',
  P_BLACK = 'black',
  P_WHITE = 'white',
  P_DATE = '#fdb316';
const COLOR_BLUE = exports.COLOR_BLUE = P_BLUE;
const COLOR_GREEN = exports.COLOR_GREEN = "#80c040";
const COLOR_RED = exports.COLOR_RED = P_RED;
const COLOR_WHITE = exports.COLOR_WHITE = "white";
const COLOR_GREY = exports.COLOR_GREY = '#607d8b';
const COLOR_DATE = exports.COLOR_DATE = P_DATE;
const COLOR_CHART_PRINT = exports.COLOR_CHART_PRINT = P_WHITE;
const COLOR_PLOT_PRINT = exports.COLOR_PLOT_PRINT = P_WHITE;
const COLOR_LINE_PRINT = exports.COLOR_LINE_PRINT = P_BLACK;
const COLOR_GRID_LINE_PRINT = exports.COLOR_GRID_LINE_PRINT = P_GREY;
const COLOR_AREA_FILL_PRINT = exports.COLOR_AREA_FILL_PRINT = 'transparent';
const COLOR_LABEL_LINK = exports.COLOR_LABEL_LINK = '#909090';
const COLOR_BG_TITLE = exports.COLOR_BG_TITLE = '#232f3b';
const COLOR_TITLE_HIDE = exports.COLOR_TITLE_HIDE = P_GREY;
const COLOR_TITLE_SHOW = exports.COLOR_TITLE_SHOW = P_SIREN;
const COLOR_HOVER = exports.COLOR_HOVER = P_YELLOW;
const COLOR_CHART = exports.COLOR_CHART = P_DARK_GREY;
const COLOR_PLOT = exports.COLOR_PLOT = P_DARK_GREY;
const COLOR_PLOT_G1 = exports.COLOR_PLOT_G1 = "rgba(69, 114, 167, 1)";
//bottomColor for area chart fill dark ui theme
const COLOR_PLOT_G2 = exports.COLOR_PLOT_G2 = "rgba(2, 0, 0, 0)";
//bottomcollor for area chart fill light ui theme
const COLOR_PLOT_G3 = exports.COLOR_PLOT_G3 = "rgba(254, 256, 256, 0)";
const COLOR_CHART_TITLE = exports.COLOR_CHART_TITLE = P_BLACK;
const COLOR_CHART_SUBTITLE = exports.COLOR_CHART_SUBTITLE = P_BLACK;
const COLOR_METRIC_TITLE = exports.COLOR_METRIC_TITLE = P_SIREN;
const COLOR_X_LINE = exports.COLOR_X_LINE = P_GREY;
const COLOR_X_GRID_LINE = exports.COLOR_X_GRID_LINE = P_GREY;
const COLOR_X_TICK = exports.COLOR_X_TICK = P_DATE;
const COLOR_X_LABEL = exports.COLOR_X_LABEL = P_DATE;
const COLOR_Y_LINE = exports.COLOR_Y_LINE = P_GREY;
const COLOR_Y_GRID_LINE = exports.COLOR_Y_GRID_LINE = P_GREY;
const COLOR_Y_TICK = exports.COLOR_Y_TICK = P_BLUE;
const COLOR_Y_LABEL = exports.COLOR_Y_LABEL = P_BLUE;
const COLOR_TOOLTIP = exports.COLOR_TOOLTIP = 'rgba(0,0,0, 0.5)';
const COLOR_HIGH = exports.COLOR_HIGH = P_HIGH;
const COLOR_LOW = exports.COLOR_LOW = P_RED;
const COLOR_EX_DIVIDEND = exports.COLOR_EX_DIVIDEND = P_HIGH;
const COLOR_SPLIT_RATIO = exports.COLOR_SPLIT_RATIO = '#f7a35c';
const COLOR_MONO_BASE1 = exports.COLOR_MONO_BASE1 = '#7cb5ec';
const COLOR_MONO_BASE2 = exports.COLOR_MONO_BASE2 = '#90ed7d';
const COLOR_MONO_BASE3 = exports.COLOR_MONO_BASE3 = P_SIREN;
const COLOR_MARKER_HOVER = exports.COLOR_MARKER_HOVER = P_YELLOW;
const COLOR_CROSSHAIR = exports.COLOR_CROSSHAIR = P_YELLOW;
const COLOR_HALO_BASE = exports.COLOR_HALO_BASE = P_YELLOW;
const COLOR_AREA_HOVER_LINE = exports.COLOR_AREA_HOVER_LINE = P_YELLOW;
const COLOR_AREA_MARKER_LINE = exports.COLOR_AREA_MARKER_LINE = P_SIREN;
const COLOR_COLUMN_HOVER_LINE = exports.COLOR_COLUMN_HOVER_LINE = P_YELLOW;
const COLOR_COLUMN_MARKER_LINE = exports.COLOR_COLUMN_MARKER_LINE = P_SIREN;
const COLOR_LEGEND_ITEM = exports.COLOR_LEGEND_ITEM = P_BLACK;
const COLOR_LEGEND_ITEM_HOVER = exports.COLOR_LEGEND_ITEM_HOVER = P_BLUE;
const COLOR_LEGEND_ITEM_HIDDEN = exports.COLOR_LEGEND_ITEM_HIDDEN = P_GREY;
const COLOR_MARKER_HOVER_FILL = exports.COLOR_MARKER_HOVER_FILL = '#ff0';
const COLOR_MARKER_HOVER_LINE = exports.COLOR_MARKER_HOVER_LINE = '#ff0';
const COLOR_S_OPEN = exports.COLOR_S_OPEN = '#90ed7d';
const COLOR_S_HIGH = exports.COLOR_S_HIGH = P_HIGH;
const COLOR_S_LOW = exports.COLOR_S_LOW = P_RED;
const COLOR_S_STOCK_CLOSE = exports.COLOR_S_STOCK_CLOSE = '#7cb5ec';
//# sourceMappingURL=Color.js.map