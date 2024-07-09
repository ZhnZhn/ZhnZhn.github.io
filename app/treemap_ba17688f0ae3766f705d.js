"use strict";(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[195],{9048:(t,e,o)=>{var i,r,n;n=function(t){function e(t,e,o,i){t.hasOwnProperty(e)||(t[e]=i.apply(null,o))}e(t=t?t._modules:{},"Mixins/ColorMapSeries.js",[t["Core/Globals.js"],t["Core/Series/Point.js"],t["Core/Utilities.js"]],(function(t,e,o){var i=o.defined;o=o.addEvent;var r=t.noop;return t=t.seriesTypes,o(e,"afterSetState",(function(t){this.moveToTopOnHover&&this.graphic&&this.graphic.attr({zIndex:t&&"hover"===t.state?1:0})})),{colorMapPointMixin:{dataLabelOnNull:!0,moveToTopOnHover:!0,isValid:function(){return null!==this.value&&1/0!==this.value&&-1/0!==this.value}},colorMapSeriesMixin:{pointArrayMap:["value"],axisTypes:["xAxis","yAxis","colorAxis"],trackerGroups:["group","markerGroup","dataLabelsGroup"],getSymbol:r,parallelArrays:["x","y","value"],colorKey:"value",pointAttribs:t.column.prototype.pointAttribs,colorAttribs:function(t){var e={};return!i(t.color)||t.state&&"normal"!==t.state||(e[this.colorProp||"fill"]=t.color),e}}}})),e(t,"Series/Treemap/TreemapAlgorithmGroup.js",[],(function(){return function(){function t(t,e,o,i){this.height=t,this.width=e,this.plot=i,this.startDirection=this.direction=o,this.lH=this.nH=this.lW=this.nW=this.total=0,this.elArr=[],this.lP={total:0,lH:0,nH:0,lW:0,nW:0,nR:0,lR:0,aspectRatio:function(t,e){return Math.max(t/e,e/t)}}}return t.prototype.addElement=function(t){this.lP.total=this.elArr[this.elArr.length-1],this.total+=t,0===this.direction?(this.lW=this.nW,this.lP.lH=this.lP.total/this.lW,this.lP.lR=this.lP.aspectRatio(this.lW,this.lP.lH),this.nW=this.total/this.height,this.lP.nH=this.lP.total/this.nW,this.lP.nR=this.lP.aspectRatio(this.nW,this.lP.nH)):(this.lH=this.nH,this.lP.lW=this.lP.total/this.lH,this.lP.lR=this.lP.aspectRatio(this.lP.lW,this.lH),this.nH=this.total/this.width,this.lP.nW=this.lP.total/this.nH,this.lP.nR=this.lP.aspectRatio(this.lP.nW,this.nH)),this.elArr.push(t)},t.prototype.reset=function(){this.lW=this.nW=0,this.elArr=[],this.total=0},t}()})),e(t,"Mixins/DrawPoint.js",[],(function(){var t=function(t){return"function"==typeof t},e=function(e){var o=this,i=e.animatableAttribs,r=e.onComplete,n=e.css,s=e.renderer,a=this.series&&this.series.chart.hasRendered?void 0:this.series&&this.series.options.animation,l=this.graphic;if(this.shouldDraw())l||(this.graphic=l=s[e.shapeType](e.shapeArgs).add(e.group)),l.css(n).attr(e.attribs).animate(i,!e.isNew&&a,r);else if(l){var p=function(){o.graphic=l=l&&l.destroy(),t(r)&&r()};Object.keys(i).length?l.animate(i,void 0,(function(){p()})):p()}};return{draw:e,drawPoint:function(t){(t.attribs=t.attribs||{}).class=this.getClassName(),e.call(this,t)},isFn:t}})),e(t,"Series/Treemap/TreemapPoint.js",[t["Mixins/DrawPoint.js"],t["Core/Series/SeriesRegistry.js"],t["Core/Utilities.js"]],(function(t,e,o){var i=this&&this.__extends||function(){var t=function(e,o){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])},t(e,o)};return function(e,o){function i(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(i.prototype=o.prototype,new i)}}(),r=e.series.prototype.pointClass,n=e.seriesTypes;e=n.pie.prototype.pointClass;var s=o.extend,a=o.isNumber,l=o.pick;return o=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.name=void 0,e.node=void 0,e.options=void 0,e.series=void 0,e.value=void 0,e}return i(e,t),e.prototype.getClassName=function(){var t=r.prototype.getClassName.call(this),e=this.series,o=e.options;return this.node.level<=e.nodeMap[e.rootNode].level?t+=" highcharts-above-level":this.node.isLeaf||l(o.interactByLeaf,!o.allowTraversingTree)?this.node.isLeaf||(t+=" highcharts-internal-node"):t+=" highcharts-internal-node-interactive",t},e.prototype.isValid=function(){return!(!this.id&&!a(this.value))},e.prototype.setState=function(t){r.prototype.setState.call(this,t),this.graphic&&this.graphic.attr({zIndex:"hover"===t?1:0})},e.prototype.shouldDraw=function(){return a(this.plotY)&&null!==this.y},e}(n.scatter.prototype.pointClass),s(o.prototype,{draw:t.drawPoint,setVisible:e.prototype.setVisible}),o})),e(t,"Series/Treemap/TreemapUtilities.js",[t["Core/Utilities.js"]],(function(t){var e,o=t.objectEach;return function(t){t.AXIS_MAX=100,t.isBoolean=function(t){return"boolean"==typeof t},t.eachObject=function(t,e,i){i=i||this,o(t,(function(o,r){e.call(i,o,r,t)}))},t.recursive=function t(e,o,i){void 0===i&&(i=this),!1!==(e=o.call(i,e))&&t(e,o,i)}}(e||(e={})),e})),e(t,"Mixins/TreeSeries.js",[t["Core/Color/Color.js"],t["Core/Utilities.js"]],(function(t,e){var o=e.extend,i=e.isArray,r=e.isNumber,n=e.isObject,s=e.merge,a=e.pick;return{getColor:function(e,o){var i,r=o.index,n=o.mapOptionsToLevel,s=o.parentColor,l=o.parentColorIndex,p=o.series,h=o.colors,d=o.siblings,c=p.points,u=p.chart.options.chart;if(e){if(c=c[e.i],e=n[e.level]||{},n=c&&e.colorByPoint)var v=c.index%(h?h.length:u.colorCount),f=h&&h[v];p.chart.styledMode||(h=c&&c.options.color,u=e&&e.color,(i=s)&&(i=(i=e&&e.colorVariation)&&"brightness"===i.key?t.parse(s).brighten(r/d*i.to).get():s),i=a(h,u,f,i,p.color));var y=a(c&&c.options.colorIndex,e&&e.colorIndex,v,l,o.colorIndex)}return{color:i,colorIndex:y}},getLevelOptions:function(t){var e=null;if(n(t)){e={};var a=r(t.from)?t.from:1,l=t.levels,p={},h=n(t.defaults)?t.defaults:{};for(i(l)&&(p=l.reduce((function(t,e){if(n(e)&&r(e.level)){var i=s({},e),l="boolean"==typeof i.levelIsConstant?i.levelIsConstant:h.levelIsConstant;delete i.levelIsConstant,delete i.level,e=e.level+(l?0:a-1),n(t[e])?o(t[e],i):t[e]=i}return t}),{})),l=r(t.to)?t.to:1,t=0;t<=l;t++)e[t]=s({},h,n(p[t])?p[t]:{})}return e},setTreeValues:function t(e,i){var r=i.before,n=i.idRoot,s=i.mapIdToNode[n],l=i.points[e.i],p=l&&l.options||{},h=0,d=[];return e.levelDynamic=e.level-("boolean"!=typeof i.levelIsConstant||i.levelIsConstant?0:s.level),e.name=a(l&&l.name,""),e.visible=n===e.id||"boolean"==typeof i.visible&&i.visible,"function"==typeof r&&(e=r(e,i)),e.children.forEach((function(r,n){var s=o({},i);o(s,{index:n,siblings:e.children.length,visible:e.visible}),r=t(r,s),d.push(r),r.visible&&(h+=r.val)})),e.visible=0<h||e.visible,r=a(p.value,h),e.children=d,e.childrenTotal=h,e.isLeaf=e.visible&&!h,e.val=r,e},updateRootId:function(t){if(n(t)){var e=n(t.options)?t.options:{};e=a(t.rootNode,e.rootId,""),n(t.userOptions)&&(t.userOptions.rootId=e),t.rootNode=e}return e}}})),e(t,"Series/Treemap/TreemapComposition.js",[t["Core/Series/SeriesRegistry.js"],t["Series/Treemap/TreemapUtilities.js"],t["Core/Utilities.js"]],(function(t,e,o){var i=o.addEvent,r=o.extend,n=!1;i(t.series,"afterBindAxes",(function(){var t=this.xAxis,o=this.yAxis;if(t&&o)if(this.is("treemap")){var i={endOnTick:!1,gridLineWidth:0,lineWidth:0,min:0,minPadding:0,max:e.AXIS_MAX,maxPadding:0,startOnTick:!1,title:void 0,tickPositions:[]};r(o.options,i),r(t.options,i),n=!0}else n&&(o.setOptions(o.userOptions),t.setOptions(t.userOptions),n=!1)}))})),e(t,"Series/Treemap/TreemapSeries.js",[t["Core/Color/Color.js"],t["Mixins/ColorMapSeries.js"],t["Core/Globals.js"],t["Mixins/LegendSymbol.js"],t["Core/Color/Palette.js"],t["Core/Series/SeriesRegistry.js"],t["Series/Treemap/TreemapAlgorithmGroup.js"],t["Series/Treemap/TreemapPoint.js"],t["Series/Treemap/TreemapUtilities.js"],t["Mixins/TreeSeries.js"],t["Core/Utilities.js"]],(function(t,e,o,i,r,n,s,a,l,p,h){var d=this&&this.__extends||function(){var t=function(e,o){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])},t(e,o)};return function(e,o){function i(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(i.prototype=o.prototype,new i)}}(),c=t.parse,u=e.colorMapSeriesMixin;t=o.noop;var v=n.series,f=(e=n.seriesTypes).column,y=e.heatmap,g=e.scatter,x=p.getColor,b=p.getLevelOptions,m=p.updateRootId,T=h.addEvent,w=h.correctFloat,A=h.defined,C=h.error,P=h.extend,M=h.fireEvent,S=h.isArray,O=h.isObject,L=h.isString,I=h.merge,R=h.pick,j=h.stableSort;return p=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.axisRatio=void 0,e.data=void 0,e.mapOptionsToLevel=void 0,e.nodeMap=void 0,e.options=void 0,e.points=void 0,e.rootNode=void 0,e.tree=void 0,e}return d(e,t),e.prototype.algorithmCalcPoints=function(t,e,o,i){var r,n,s,a,l=o.lW,p=o.lH,h=o.plot,d=0,c=o.elArr.length-1;if(e)l=o.nW,p=o.nH;else var u=o.elArr[o.elArr.length-1];o.elArr.forEach((function(t){(e||d<c)&&(0===o.direction?(r=h.x,n=h.y,a=t/(s=l)):(r=h.x,n=h.y,s=t/(a=p)),i.push({x:r,y:n,width:s,height:w(a)}),0===o.direction?h.y+=a:h.x+=s),d+=1})),o.reset(),0===o.direction?o.width-=l:o.height-=p,h.y=h.parent.y+(h.parent.height-o.height),h.x=h.parent.x+(h.parent.width-o.width),t&&(o.direction=1-o.direction),e||o.addElement(u)},e.prototype.algorithmFill=function(t,e,o){var i,r,n,s,a,l=[],p=e.direction,h=e.x,d=e.y,c=e.width,u=e.height;return o.forEach((function(o){i=o.val/e.val*e.height*e.width,r=h,n=d,0===p?(c-=s=i/(a=u),h+=s):(u-=a=i/(s=c),d+=a),l.push({x:r,y:n,width:s,height:a}),t&&(p=1-p)})),l},e.prototype.algorithmLowAspectRatio=function(t,e,o){var i,r=[],n=this,a={x:e.x,y:e.y,parent:e},l=0,p=o.length-1,h=new s(e.height,e.width,e.direction,a);return o.forEach((function(o){i=o.val/e.val*e.height*e.width,h.addElement(i),h.lP.nR>h.lP.lR&&n.algorithmCalcPoints(t,!1,h,r,a),l===p&&n.algorithmCalcPoints(t,!0,h,r,a),l+=1})),r},e.prototype.alignDataLabel=function(t,e,o){var i=o.style;i&&!A(i.textOverflow)&&e.text&&e.getBBox().width>e.text.textWidth&&e.css({textOverflow:"ellipsis",width:i.width+="px"}),f.prototype.alignDataLabel.apply(this,arguments),t.dataLabel&&t.dataLabel.attr({zIndex:(t.node.zIndex||0)+1})},e.prototype.buildNode=function(t,e,o,i,r){var n,s=this,a=[],l=s.points[e],p=0;return(i[t]||[]).forEach((function(e){n=s.buildNode(s.points[e].id,e,o+1,i,t),p=Math.max(n.height+1,p),a.push(n)})),e={id:t,i:e,children:a,height:p,level:o,parent:r,visible:!1},s.nodeMap[e.id]=e,l&&(l.node=e),e},e.prototype.calculateChildrenAreas=function(t,e){var o,i=this,r=i.options,n=i.mapOptionsToLevel[t.level+1],s=R(i[n&&n.layoutAlgorithm]&&n.layoutAlgorithm,r.layoutAlgorithm),a=r.alternateStartingDirection;t=t.children.filter((function(t){return!t.ignore})),n&&n.layoutStartingDirection&&(e.direction="vertical"===n.layoutStartingDirection?0:1),o=i[s](e,t),t.forEach((function(t,r){r=o[r],t.values=I(r,{val:t.childrenTotal,direction:a?1-e.direction:e.direction}),t.pointValues=I(r,{x:r.x/i.axisRatio,y:l.AXIS_MAX-r.y-r.height,width:r.width/i.axisRatio}),t.children.length&&i.calculateChildrenAreas(t,t.values)}))},e.prototype.drawDataLabels=function(){var t,e,o=this,i=o.mapOptionsToLevel;o.points.filter((function(t){return t.node.visible})).forEach((function(r){e=i[r.node.level],t={style:{}},r.node.isLeaf||(t.enabled=!1),e&&e.dataLabels&&(t=I(t,e.dataLabels),o._hasPointLabels=!0),r.shapeArgs&&(t.style.width=r.shapeArgs.width,r.dataLabel&&r.dataLabel.css({width:r.shapeArgs.width+"px"})),r.dlOptions=I(t,r.options.dataLabels)})),v.prototype.drawDataLabels.call(this)},e.prototype.drawPoints=function(){var t=this,e=t.chart,o=e.renderer,i=e.styledMode,r=t.options,n=i?{}:r.shadow,s=r.borderRadius,a=e.pointCount<r.animationLimit,l=r.allowTraversingTree;t.points.forEach((function(e){var p=e.node.levelDynamic,h={},d={},c={},u="level-group-"+e.node.level,v=!!e.graphic,f=a&&v,y=e.shapeArgs;e.shouldDraw()&&(e.isInside=!0,s&&(d.r=s),I(!0,f?h:d,v?y:{},i?{}:t.pointAttribs(e,e.selected?"select":void 0)),t.colorAttribs&&i&&P(c,t.colorAttribs(e)),t[u]||(t[u]=o.g(u).attr({zIndex:1e3-(p||0)}).add(t.group),t[u].survive=!0)),e.draw({animatableAttribs:h,attribs:d,css:c,group:t[u],renderer:o,shadow:n,shapeArgs:y,shapeType:"rect"}),l&&e.graphic&&(e.drillId=r.interactByLeaf?t.drillToByLeaf(e):t.drillToByGroup(e))}))},e.prototype.drillToByGroup=function(t){var e=!1;return 1!=t.node.level-this.nodeMap[this.rootNode].level||t.node.isLeaf||(e=t.id),e},e.prototype.drillToByLeaf=function(t){var e=!1;if(t.node.parent!==this.rootNode&&t.node.isLeaf)for(t=t.node;!e;)(t=this.nodeMap[t.parent]).parent===this.rootNode&&(e=t.id);return e},e.prototype.drillToNode=function(t,e){C(32,!1,void 0,{"treemap.drillToNode":"use treemap.setRootNode"}),this.setRootNode(t,e)},e.prototype.drillUp=function(){var t=this.nodeMap[this.rootNode];t&&L(t.parent)&&this.setRootNode(t.parent,!0,{trigger:"traverseUpButton"})},e.prototype.getExtremes=function(){var t=v.prototype.getExtremes.call(this,this.colorValueData),e=t.dataMax;return this.valueMin=t.dataMin,this.valueMax=e,v.prototype.getExtremes.call(this)},e.prototype.getListOfParents=function(t,e){t=S(t)?t:[];var o=S(e)?e:[];return e=t.reduce((function(t,e,o){return void 0===t[e=R(e.parent,"")]&&(t[e]=[]),t[e].push(o),t}),{"":[]}),l.eachObject(e,(function(t,e,i){""!==e&&-1===o.indexOf(e)&&(t.forEach((function(t){i[""].push(t)})),delete i[e])})),e},e.prototype.getTree=function(){var t=this.data.map((function(t){return t.id}));return t=this.getListOfParents(this.data,t),this.nodeMap={},this.buildNode("",-1,0,t)},e.prototype.hasData=function(){return!!this.processedXData.length},e.prototype.init=function(t,e){u&&(this.colorAttribs=u.colorAttribs);var o=T(this,"setOptions",(function(t){t=t.userOptions,A(t.allowDrillToNode)&&!A(t.allowTraversingTree)&&(t.allowTraversingTree=t.allowDrillToNode,delete t.allowDrillToNode),A(t.drillUpButton)&&!A(t.traverseUpButton)&&(t.traverseUpButton=t.drillUpButton,delete t.drillUpButton)}));v.prototype.init.call(this,t,e),delete this.opacity,this.eventsToUnbind.push(o),this.options.allowTraversingTree&&this.eventsToUnbind.push(T(this,"click",this.onClickDrillToNode))},e.prototype.onClickDrillToNode=function(t){var e=(t=t.point)&&t.drillId;L(e)&&(t.setState(""),this.setRootNode(e,!0,{trigger:"click"}))},e.prototype.pointAttribs=function(t,e){var o=O(this.mapOptionsToLevel)?this.mapOptionsToLevel:{},i=t&&o[t.node.level]||{};o=this.options;var r=e&&o.states[e]||{},n=t&&t.getClassName()||"";return t={stroke:t&&t.borderColor||i.borderColor||r.borderColor||o.borderColor,"stroke-width":R(t&&t.borderWidth,i.borderWidth,r.borderWidth,o.borderWidth),dashstyle:t&&t.borderDashStyle||i.borderDashStyle||r.borderDashStyle||o.borderDashStyle,fill:t&&t.color||this.color},-1!==n.indexOf("highcharts-above-level")?(t.fill="none",t["stroke-width"]=0):-1!==n.indexOf("highcharts-internal-node-interactive")?(e=R(r.opacity,o.opacity),t.fill=c(t.fill).setOpacity(e).get(),t.cursor="pointer"):-1!==n.indexOf("highcharts-internal-node")?t.fill="none":e&&(t.fill=c(t.fill).brighten(r.brightness).get()),t},e.prototype.renderTraverseUpButton=function(t){var e=this,o=e.options.traverseUpButton,i=R(o.text,e.nodeMap[t].name,"◁ Back");if(""===t||e.is("sunburst")&&1===e.tree.children.length&&t===e.tree.children[0].id)e.drillUpButton&&(e.drillUpButton=e.drillUpButton.destroy());else if(this.drillUpButton)this.drillUpButton.placed=!1,this.drillUpButton.attr({text:i}).align();else{var r=(t=o.theme)&&t.states;this.drillUpButton=this.chart.renderer.button(i,0,0,(function(){e.drillUp()}),t,r&&r.hover,r&&r.select).addClass("highcharts-drillup-button").attr({align:o.position.align,zIndex:7}).add().align(o.position,!1,o.relativeTo||"plotBox")}},e.prototype.setColorRecursive=function(t,e,o,i,r){var n=this,s=n&&n.chart;if(s=s&&s.options&&s.options.colors,t){var a=x(t,{colors:s,index:i,mapOptionsToLevel:n.mapOptionsToLevel,parentColor:e,parentColorIndex:o,series:n,siblings:r});(e=n.points[t.i])&&(e.color=a.color,e.colorIndex=a.colorIndex),(t.children||[]).forEach((function(e,o){n.setColorRecursive(e,a.color,a.colorIndex,o,t.children.length)}))}},e.prototype.setPointValues=function(){var t=this,e=t.xAxis,o=t.yAxis,i=t.chart.styledMode;t.points.forEach((function(r){var n=r.node,s=n.pointValues;if(n=n.visible,s&&n){n=s.height;var a=s.width,l=s.x,p=s.y,h=i?0:(t.pointAttribs(r)["stroke-width"]||0)%2/2;s=Math.round(e.toPixels(l,!0))-h,a=Math.round(e.toPixels(l+a,!0))-h,l=Math.round(o.toPixels(p,!0))-h,n=Math.round(o.toPixels(p+n,!0))-h,n={x:Math.min(s,a),y:Math.min(l,n),width:Math.abs(a-s),height:Math.abs(n-l)},r.plotX=n.x+n.width/2,r.plotY=n.y+n.height/2,r.shapeArgs=n}else delete r.plotX,delete r.plotY}))},e.prototype.setRootNode=function(t,e,o){t=P({newRootId:t,previousRootId:this.rootNode,redraw:R(e,!0),series:this},o),M(this,"setRootNode",t,(function(t){var e=t.series;e.idPreviousRoot=t.previousRootId,e.rootNode=t.newRootId,e.isDirty=!0,t.redraw&&e.chart.redraw()}))},e.prototype.setState=function(t){this.options.inactiveOtherPoints=!0,v.prototype.setState.call(this,t,!1),this.options.inactiveOtherPoints=!1},e.prototype.setTreeValues=function(t){var e=this,o=e.options,i=e.nodeMap[e.rootNode];o=!l.isBoolean(o.levelIsConstant)||o.levelIsConstant;var r=0,n=[],s=e.points[t.i];t.children.forEach((function(t){t=e.setTreeValues(t),n.push(t),t.ignore||(r+=t.val)})),j(n,(function(t,e){return(t.sortIndex||0)-(e.sortIndex||0)}));var a=R(s&&s.options.value,r);return s&&(s.value=a),P(t,{children:n,childrenTotal:r,ignore:!(R(s&&s.visible,!0)&&0<a),isLeaf:t.visible&&!r,levelDynamic:t.level-(o?0:i.level),name:R(s&&s.name,""),sortIndex:R(s&&s.sortIndex,-a),val:a}),t},e.prototype.sliceAndDice=function(t,e){return this.algorithmFill(!0,t,e)},e.prototype.squarified=function(t,e){return this.algorithmLowAspectRatio(!0,t,e)},e.prototype.strip=function(t,e){return this.algorithmLowAspectRatio(!1,t,e)},e.prototype.stripes=function(t,e){return this.algorithmFill(!1,t,e)},e.prototype.translate=function(){var t=this,e=t.options,o=m(t);v.prototype.translate.call(t);var i=t.tree=t.getTree(),r=t.nodeMap[o];""===o||r&&r.children.length||(t.setRootNode("",!1),o=t.rootNode,r=t.nodeMap[o]),t.renderTraverseUpButton(o),t.mapOptionsToLevel=b({from:r.level+1,levels:e.levels,to:i.height,defaults:{levelIsConstant:t.options.levelIsConstant,colorByPoint:e.colorByPoint}}),l.recursive(t.nodeMap[t.rootNode],(function(e){var o=!1,i=e.parent;return e.visible=!0,(i||""===i)&&(o=t.nodeMap[i]),o})),l.recursive(t.nodeMap[t.rootNode].children,(function(t){var e=!1;return t.forEach((function(t){t.visible=!0,t.children.length&&(e=(e||[]).concat(t.children))})),e})),t.setTreeValues(i),t.axisRatio=t.xAxis.len/t.yAxis.len,t.nodeMap[""].pointValues=o={x:0,y:0,width:l.AXIS_MAX,height:l.AXIS_MAX},t.nodeMap[""].values=o=I(o,{width:o.width*t.axisRatio,direction:"vertical"===e.layoutStartingDirection?0:1,val:i.val}),t.calculateChildrenAreas(i,o),t.colorAxis||e.colorByPoint||t.setColorRecursive(t.tree),e.allowTraversingTree&&(e=r.pointValues,t.xAxis.setExtremes(e.x,e.x+e.width,!1),t.yAxis.setExtremes(e.y,e.y+e.height,!1),t.xAxis.setScale(),t.yAxis.setScale()),t.setPointValues()},e.defaultOptions=I(g.defaultOptions,{allowTraversingTree:!1,animationLimit:250,borderRadius:0,showInLegend:!1,marker:void 0,colorByPoint:!1,dataLabels:{defer:!1,enabled:!0,formatter:function(){var t=this&&this.point?this.point:{};return L(t.name)?t.name:""},inside:!0,verticalAlign:"middle"},tooltip:{headerFormat:"",pointFormat:"<b>{point.name}</b>: {point.value}<br/>"},ignoreHiddenPoint:!0,layoutAlgorithm:"sliceAndDice",layoutStartingDirection:"vertical",alternateStartingDirection:!1,levelIsConstant:!0,drillUpButton:{position:{align:"right",x:-10,y:10}},traverseUpButton:{position:{align:"right",x:-10,y:10}},borderColor:r.neutralColor10,borderWidth:1,colorKey:"colorValue",opacity:.15,states:{hover:{borderColor:r.neutralColor40,brightness:y?0:.1,halo:!1,opacity:.75,shadow:!1}}}),e}(g),P(p.prototype,{buildKDTree:t,colorKey:"colorValue",directTouch:!0,drawLegendSymbol:i.drawRectangle,getExtremesFromAll:!0,getSymbol:t,optionalAxis:"colorAxis",parallelArrays:["x","y","value","colorValue"],pointArrayMap:["value"],pointClass:a,trackerGroups:["group","dataLabelsGroup"],utils:{recursive:l.recursive}}),n.registerSeriesType("treemap",p),p})),e(t,"masters/modules/treemap.src.js",[],(function(){}))},t.exports?(n.default=n,t.exports=n):(i=[o(2908)],void 0===(r=function(t){return n(t),n.Highcharts=t,n}.apply(e,i))||(t.exports=r))}}]);