"use strict";(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[216],{5176:(t,e,i)=>{i.r(e),i.d(e,{default:()=>yt});var o=i(420),s=i(8504),n=i(4332),l=i(312),a=i(5896),c=i(208);const r={style:{color:"black"}},h={xAxis:{labels:r},yAxis:{tickColor:"black",labels:r}},d={title:r},p={plotOptions:{area:{color:"black"},spline:{color:"black"},line:{color:"black"}}},y=(t,e)=>({caption:t,value:e});var u=i(0),x=i(4684),m=i(9308),b=i(4636),f=i(5780),g=i(1840),_=i(1827),C=i(7624);const j={display:"inline-block",color:"#1b75bb",fontSize:"16px",fontWeight:"bold"},S={...m.WW,marginTop:10},w={...j,width:100,paddingRight:5,textAlign:"right"},k={...j,padding:"0 5px 0 3px"},W={...k,paddingLeft:6},v={width:60,height:30,marginLeft:0},A={width:250,height:30,marginLeft:0},R=(t,e,i)=>t>e&&t<i,I=function(t,e,i){return void 0===e&&(e=-70),void 0===i&&(i="9px"),{html:t,style:{left:0,top:e,color:"#909090","font-size":i}}},L={},B=(0,n.c)((t=>{let{isShow:e,data:i=L,onClose:n}=t;const[r,j]=(0,l.c)(!0),[B,D]=(0,l.c)(!0),[E,T]=(0,l.c)(!0),K=(0,s.yK)({}),$=(0,s.yK)([{caption:"D",onClick:j},{caption:"T",onClick:D},{caption:"S",onClick:T}]),Y=(0,a.c)((()=>[y("Default",{}),y("Default + Black Axis",(0,o.c)(!1,{},h)),y("Default + Black Axis + Black Title",(0,o.c)(!1,{},h,d)),y("All Black",(0,o.c)(!1,{},h,d,p))])),z=(0,s.yK)(),V=(0,s.yK)(),q=(0,s.yK)(),P=(0,s.yK)(),M=(0,s.bB)((()=>t=>{(0,s.mQ)(K,t&&t.value||{})}),[]),{chart:O,fn:H}=i,N=(0,c.c)((()=>{const[t,e]=((t,e,i)=>{let{chartWidth:o,chartHeight:s}=t;return[R(e,351,2001)?e:o,R(i,251,1001)?i:s]})(O,(0,s.aq)(z),(0,s.aq)(V)),i=(0,o.c)(!0,{chart:{width:t,height:e},title:{text:(0,s.aq)(q)},subtitle:{text:(0,s.aq)(P)},labels:{items:[I("Web app ERC https://zhnzhn.github.io"),I(`DataSource: ${O.userOptions.zhConfig?.dataSource??""}`,e-90,"10px")]}},(0,s.sB)(K));H.apply(O,[null,i]),n()})),Q=(0,s.yK)([(0,C.jsx)(g.c,{caption:"Export",isPrimary:!0,onClick:N},"export")]),{chartWidth:F,chartHeight:U,options:X}=O,J=X.title.text,G=X.subtitle.text;return(0,C.jsxs)(u.c,{caption:"Customize Export Chart",isShow:e,commandButtons:(0,s.sB)(Q),onClose:n,children:[(0,C.jsx)(x.c,{buttons:(0,s.sB)($)}),(0,C.jsx)(b.c,{isShow:r,children:(0,C.jsxs)("div",{style:m.WW,children:[(0,C.jsx)("span",{style:w,children:"Dimension:"}),(0,C.jsx)("span",{style:k,children:"Width:"}),(0,C.jsx)(f.c,{ref:z,type:"number",placeholder:F,initValue:F,style:v,min:351,max:2001}),(0,C.jsx)("span",{style:W,children:"Height:"}),(0,C.jsx)(f.c,{ref:V,type:"number",placeholder:U,initValue:U,style:v,min:251,max:1001})]})}),(0,C.jsxs)(b.c,{isShow:B,children:[(0,C.jsxs)("div",{style:S,children:[(0,C.jsx)("span",{style:w,children:"Title:"}),(0,C.jsx)(f.c,{ref:q,initValue:J,style:A})]}),(0,C.jsxs)("div",{style:m.WW,children:[(0,C.jsx)("span",{style:w,children:"Subtitle:"}),(0,C.jsx)(f.c,{ref:P,initValue:G,style:A})]})]}),(0,C.jsx)(b.c,{isShow:E,children:(0,C.jsxs)("div",{style:S,children:[(0,C.jsx)("span",{style:w,children:"Style:"}),(0,C.jsx)(_.c,{width:"250",options:Y,placeholder:"Default",onSelect:M})]})})]})}));var D=i(2660),E=i(8633),T=i(4248),K=i(6337),$=i(784),Y=i(5916),z=i(1652);const V={width:280},q={display:"inline-block",maxWidth:295},P={marginBottom:10},M={display:"flex",alignItems:"center",margin:"8px 5px 0 5px",lineHeight:1.5,fontWeight:"bold"},O={color:"#1b75bb",display:"inline-block",width:100,paddingRight:5,textAlign:"right",fontSize:"16px"},H={paddingTop:0},N={marginLeft:8},Q=[{a:"1 Month",b:"1m"},{a:"3 Months",b:"3m"},{a:"6 Months",b:"6m"},{a:"1 Year",b:"1y"},{a:"2 Years",b:"2y"}].map((t=>{let{a:e,b:i}=t;return{caption:"IEX Cloud: "+e,value:"IEX",dfProps:{dfType:"chart",dfPeriod:i}}})),F="TIME_SERIES",U="ADJUSTED",X=[...[{c:"Daily Adjusted (100)",r:`${F}_DAILY_${U}&outputsize=compact`},{c:"Weekly Adjusted",r:`${F}_WEEKLY_${U}`},{c:"Monthly Adjusted",r:`${F}_MONTHLY_${U}`}].map((t=>{let{c:e,r:i}=t;return{caption:`Alpha Vantage: ${e}`,value:"AL",route:i,dfProps:{dfFn:"EOD",dfSubId:"I"}}})),...Q],J=X[0],G=(0,Y.uO)(void 0,"t1a"),Z=(0,n.c)((t=>{let{isShow:e,data:i,onClose:o}=t;const n=(0,s.yK)(),[a,r]=(0,l.c)(!0),[h,d]=(0,l.c)(),p=(0,s.yK)([{caption:"L",title:"Click to toggle labels",onClick:r},{caption:"O",title:"Click to toggle options",onClick:d}]),[y,m]=(0,D.c)(),[f,g]=(0,D.c)(),_=(0,c.c)((()=>{i&&"function"==typeof i.onShow&&i.onShow()})),j=(0,c.c)((()=>{const{item:t,browserType:e,chartContainerType:l,dialogProps:a}=i||{},{id:c,text:r}=t||{},{caption:h,value:d,route:p,dfProps:y}=m()||J;if(c){const i=g();(0,E.SK)({chartType:l,browserType:e},{id:c,item:t,items:[{c:r,v:c},{c:h,v:p}],title:r,value:c,loadId:d,_itemKey:`${c}_${d}`,linkFn:"NASDAQ",dataSource:h,...a,...y,...(0,s.aq)(n),seriaType:i?i.value:void 0})}o()})),S=(0,s.yK)([(0,C.jsx)(T.w,{onClick:j},"load"),(0,C.jsx)(T.W,{onClick:_},"show")]),{item:w}=i||{},{text:k}=w||{},W=a?null:V,v=a?H:{...H,...N};return(0,C.jsxs)(u.c,{caption:k,style:W,styleCaption:q,isShow:e,commandButtons:(0,s.sB)(S),onClose:o,children:[(0,C.jsx)(x.c,{buttons:(0,s.sB)(p)}),(0,C.jsx)(K.c,{isShowLabels:a,caption:"Source",placeholder:J.caption,options:X,onSelect:y}),(0,C.jsx)($.c,{refSeriaColor:n,isShowLabels:a,options:G,onSelectChart:f}),(0,C.jsx)(b.c,{isShow:h,style:P,children:(0,C.jsxs)("div",{style:M,children:[a&&(0,C.jsx)("span",{style:O,children:"Link:"}),(0,C.jsx)(z.c,{style:v,item:w,caption:"NASDAQ"})]})})]})}));var tt=i(5768),et=i(1636);const it={padding:"16px 0 0 16px",fontWeight:600},ot={paddingLeft:8},st={display:"inline-block"},nt={width:60},lt={width:100},at={width:40},ct={name:"Range",type:"columnrange",borderWidth:0,pointWidth:1},rt=(t,e)=>t[e].color,ht=(t,e)=>{const{options:i}=e;i.marker.radius=t,e.update(i,!1)},dt=(t,e,i)=>function(o){const s=parseInt(o,10);s>e&&s<i&&(this[t]=o)};class pt extends s.Yl{constructor(t){super(t),this._commandButtons=[(0,C.jsx)(g.c,{caption:"Yes, Connect",isPrimary:!0,onClick:this._hAdd},"yes")],this._heWidth=dt("_pointWidth",-1,7).bind(this),this._heRadius1=dt("_r1",-1,9).bind(this),this._heRadius2=dt("_r2",-1,9).bind(this),this._r1=4,this._r2=0,this._pointWidth=1,this._refW=(0,s.Yn)(),this._refR1=(0,s.Yn)(),this._refR2=(0,s.Yn)()}shouldComponentUpdate(t,e){return t===this.props||t.isShow!==this.props.isShow}_hAdd=()=>{const{_fromIndex:t,_toIndex:e,_color:i,props:o}=this,{data:n,onClose:l}=o,{chart:a}=n,c=a.series,r=c[t],h=c[e],d=((t,e)=>{const i=[];return t.forEach(((t,o)=>{const s=e[o];Boolean(t.y)&&Boolean(s.y)&&i.push({name:t.category,low:t.y<=s.y?t.y:s.y,high:t.y>=s.y?t.y:s.y})})),i})(r.data,h.data);var p;this._heWidth((0,s.aq)(this._refW)),this._heRadius1((0,s.aq)(this._refR1)),this._heRadius2((0,s.aq)(this._refR2)),ht(this._r1,r),ht(this._r2,h),a.zhAddSeriaToYAxis({data:d,color:i,yIndex:0},(p=this._pointWidth,{...ct,pointWidth:p})),a.zhEnableDataLabels(),l()};_heColor=t=>{this._color=t};render(){const{isShow:t,data:e,onClose:i}=this.props,{chart:o}=e,{series:s}=o,[n,l,a,c]=(t=>{const e=t[0].name,i=t[1].name;return e<=i?[e,i,0,1]:[i,e,1,0]})(s),r=rt(s,a),h=rt(s,c);return this._fromIndex=a,this._toIndex=c,this._color=r,(0,C.jsxs)(u.c,{caption:"Add ColumnRange",isShow:t,commandButtons:this._commandButtons,onClose:i,children:[(0,C.jsx)("div",{style:it,children:"Connect dots series by column range?"}),(0,C.jsxs)("div",{style:ot,children:[(0,C.jsx)(et.c,{style:st,captionStyle:nt,caption:"Color",initValue:r,onEnter:this._heColor}),(0,C.jsx)(tt.c,{ref:this._refW,styleRoot:st,styleCaption:nt,styleInput:at,caption:"Width",initValue:1,maxLength:2,type:"number",min:0,max:6,step:1})]}),(0,C.jsxs)("div",{style:ot,children:[(0,C.jsx)(tt.c,{ref:this._refR1,styleRoot:st,styleCaption:{...lt,color:r},styleInput:at,caption:`R ${n}`,initValue:4,type:"number",maxLength:2}),(0,C.jsx)(tt.c,{ref:this._refR2,styleRoot:st,styleCaption:{...lt,color:h},styleInput:at,caption:`R ${l}`,initValue:0,type:"number",maxLength:2})]})]})}}const yt={CeDialog:B,SbsDialog:Z,CrDialog:pt}},4248:(t,e,i)=>{i.d(e,{W:()=>c,w:()=>a});var o=i(1840),s=i(7624);const n={color:"#607d8b"},l={color:"#232f3b"},a=t=>{let{onClick:e}=t;return(0,s.jsx)(o.c,{style:n,caption:"Load",title:"Load Item to Container",onClick:e})},c=t=>{let{onClick:e}=t;return(0,s.jsx)(o.c,{style:l,caption:"Show",title:"Show Item Container",onClick:e})}}}]);