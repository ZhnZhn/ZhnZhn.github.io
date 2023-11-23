"use strict";(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[940],{1572:(t,e,i)=>{i.d(e,{E:()=>o});const o=(t,e)=>{const i=[];return t.forEach(((t,o)=>{const s=e[o];Boolean(t.y)&&Boolean(s.y)&&i.push({name:t.category,low:t.y<=s.y?t.y:s.y,high:t.y>=s.y?t.y:s.y})})),i}},5069:(t,e,i)=>{i.r(e),i.d(e,{default:()=>yt});var o=i(9999),s=i(6016),n=i(1926),l=i(6612),a=i(3683),r=i(3551);const h=i.n(r)().merge,c={style:{color:"black"}},d={xAxis:{labels:c},yAxis:{tickColor:"black",labels:c}},p={title:c},u={plotOptions:{area:{color:"black"},spline:{color:"black"},line:{color:"black"}}},x=h;var y=i(5138),m=i(4973),b=i(7376),f=i(4019),g=i(5313),_=i(9916),C=i(5262),j=i(5893);const S={display:"inline-block",color:"#1b75bb",fontSize:"16px",fontWeight:"bold"},Z={...b.UR,marginTop:10},k={...S,width:100,paddingRight:5,textAlign:"right"},w={...S,padding:"0 5px 0 3px"},v={...w,paddingLeft:6},A={width:60,height:30,marginLeft:0},R={width:250,height:30,marginLeft:0},W=(t,e,i)=>t>e&&t<i,I=function(t,e,i){return void 0===e&&(e=-70),void 0===i&&(i="9px"),{html:t,style:{left:0,top:e,color:"#909090","font-size":i}}},L={},D=(0,s.Z)((t=>{let{isShow:e,data:i=L,onClose:s}=t;const[r,c]=(0,n.Z)(!0),[S,D]=(0,n.Z)(!0),[T,E]=(0,n.Z)(!0),O=(0,o.sO)({}),V=(0,o.sO)([{caption:"D",onClick:c},{caption:"T",onClick:D},{caption:"S",onClick:E}]),B=(0,l.Z)((()=>[{caption:"Default",value:{}},{caption:"Default + Black Axis",value:h(!1,{},d)},{caption:"Default + Black Axis + Black Title",value:h(!1,{},d,p)},{caption:"All Black",value:h(!1,{},d,p,u)}])),$=(0,o.sO)(),z=(0,o.sO)(),Y=(0,o.sO)(),P=(0,o.sO)(),M=(0,o.Ye)((()=>t=>{(0,o.oe)(O,t&&t.value||{})}),[]),{chart:H,fn:U}=i,X=(0,a.Z)((()=>{const[t,e]=((t,e,i)=>{let{chartWidth:o,chartHeight:s}=t;return[W(e,351,2001)?e:o,W(i,251,1001)?i:s]})(H,(0,o.d9)($),(0,o.d9)(z)),i=x(!0,{chart:{width:t,height:e},title:{text:(0,o.d9)(Y)},subtitle:{text:(0,o.d9)(P)},labels:{items:[I("Web app ERC https://zhnzhn.github.io"),I(`DataSource: ${H.userOptions.zhConfig?.dataSource??""}`,e-90,"10px")]}},(0,o.eA)(O));U.apply(H,[null,i]),s()})),N=(0,o.sO)([(0,j.jsx)(_.Z,{caption:"Export",isPrimary:!0,onClick:X},"export")]),{chartWidth:F,chartHeight:K,options:Q}=H,J=Q.title.text,q=Q.subtitle.text;return(0,j.jsxs)(y.Z,{caption:"Customize Export Chart",isShow:e,commandButtons:(0,o.eA)(N),onClose:s,children:[(0,j.jsx)(m.Z,{buttons:(0,o.eA)(V)}),(0,j.jsx)(f.Z,{isShow:r,children:(0,j.jsxs)("div",{style:b.UR,children:[(0,j.jsx)("span",{style:k,children:"Dimension:"}),(0,j.jsx)("span",{style:w,children:"Width:"}),(0,j.jsx)(g.Z,{ref:$,type:"number",placeholder:F,initValue:F,style:A,min:351,max:2001}),(0,j.jsx)("span",{style:v,children:"Height:"}),(0,j.jsx)(g.Z,{ref:z,type:"number",placeholder:K,initValue:K,style:A,min:251,max:1001})]})}),(0,j.jsxs)(f.Z,{isShow:S,children:[(0,j.jsxs)("div",{style:Z,children:[(0,j.jsx)("span",{style:k,children:"Title:"}),(0,j.jsx)(g.Z,{ref:Y,initValue:J,style:R})]}),(0,j.jsxs)("div",{style:b.UR,children:[(0,j.jsx)("span",{style:k,children:"Subtitle:"}),(0,j.jsx)(g.Z,{ref:P,initValue:q,style:R})]})]}),(0,j.jsx)(f.Z,{isShow:T,children:(0,j.jsxs)("div",{style:Z,children:[(0,j.jsx)("span",{style:k,children:"Style:"}),(0,j.jsx)(C.Z,{width:"250",options:B,placeholder:"Default",onSelect:M})]})})]})}));var T=i(5868),E=i(192),O=i(6235),V=i(3491),B=i(565),$=i(9620),z=i(5201);const Y={width:280},P={display:"inline-block",maxWidth:295},M={marginBottom:10},H={display:"flex",alignItems:"center",margin:"8px 5px 0 5px",lineHeight:1.5,fontWeight:"bold"},U={color:"#1b75bb",display:"inline-block",width:100,paddingRight:5,textAlign:"right",fontSize:"16px"},X={paddingTop:0},N={marginLeft:8},F=[{a:"1 Month",b:"1m"},{a:"3 Months",b:"3m"},{a:"6 Months",b:"6m"},{a:"1 Year",b:"1y"},{a:"2 Years",b:"2y"}].map((t=>{let{a:e,b:i}=t;return{caption:"IEX Cloud: "+e,value:"IEX",dfProps:{dfType:"chart",dfPeriod:i}}})),K="TIME_SERIES",Q="ADJUSTED",J=[...[{c:"Daily Adjusted (100)",r:`${K}_DAILY_${Q}&outputsize=compact`},{c:"Weekly Adjusted",r:`${K}_WEEKLY_${Q}`},{c:"Monthly Adjusted",r:`${K}_MONTHLY_${Q}`}].map((t=>{let{c:e,r:i}=t;return{caption:`Alpha Vantage: ${e}`,value:"AL",route:i,dfProps:{dfFn:"EOD",dfSubId:"I"}}})),...F],q=J[0],G=(0,$.T9)(void 0,"t1a"),tt=(0,s.Z)((t=>{let{isShow:e,data:i,onClose:s}=t;const l=(0,o.sO)(),[r,h]=(0,n.Z)(!0),[c,d]=(0,n.Z)(),p=(0,o.sO)([{caption:"L",title:"Click to toggle labels",onClick:h},{caption:"O",title:"Click to toggle options",onClick:d}]),[u,x]=(0,T.Z)(),[b,g]=(0,T.Z)(),_=(0,a.Z)((()=>{i&&"function"==typeof i.onShow&&i.onShow()})),C=(0,a.Z)((()=>{const{item:t,browserType:e,chartContainerType:n,dialogProps:a}=i||{},{id:r,text:h}=t||{},{caption:c,value:d,route:p,dfProps:u}=x()||q;if(r){const i=g();E.LX[E.SX]({chartType:n,browserType:e},{id:r,item:t,items:[{c:h,v:r},{c,v:p}],title:h,value:r,loadId:d,_itemKey:`${r}_${d}`,linkFn:"NASDAQ",dataSource:c,...a,...u,...(0,o.d9)(l),seriaType:i?i.value:void 0})}s()})),S=(0,o.sO)([(0,j.jsx)(O.T,{onClick:C},"load"),(0,j.jsx)(O.V,{onClick:_},"show")]),{item:Z}=i||{},{text:k}=Z||{},w=r?null:Y,v=r?X:{...X,...N};return(0,j.jsxs)(y.Z,{caption:k,style:w,styleCaption:P,isShow:e,commandButtons:(0,o.eA)(S),onClose:s,children:[(0,j.jsx)(m.Z,{buttons:(0,o.eA)(p)}),(0,j.jsx)(V.Z,{isShowLabels:r,caption:"Source",placeholder:q.caption,options:J,onSelect:u}),(0,j.jsx)(B.Z,{refSeriaColor:l,isShowLabels:r,options:G,onSelectChart:b}),(0,j.jsx)(f.Z,{isShow:c,style:M,children:(0,j.jsxs)("div",{style:H,children:[r&&(0,j.jsx)("span",{style:U,children:"Link:"}),(0,j.jsx)(z.Z,{style:v,item:Z,caption:"NASDAQ"})]})})]})}));var et=i(1572),it=i(9547),ot=i(7444);const st={padding:"16px 0 0 16px",fontWeight:600},nt={paddingLeft:8},lt={display:"inline-block"},at={width:60},rt={width:100},ht={width:40},ct={name:"Range",type:"columnrange",borderWidth:0,pointWidth:1},dt=(t,e)=>t[e].color,pt=(t,e)=>{const{options:i}=e;i.marker.radius=t,e.update(i,!1)},ut=(t,e,i)=>function(o){const s=parseInt(o,10);s>e&&s<i&&(this[t]=o)};class xt extends o.wA{constructor(t){super(t),this._commandButtons=[(0,j.jsx)(_.Z,{caption:"Yes, Connect",isPrimary:!0,onClick:this._hAdd},"yes")],this._heWidth=ut("_pointWidth",-1,7).bind(this),this._heRadius1=ut("_r1",-1,9).bind(this),this._heRadius2=ut("_r2",-1,9).bind(this),this._r1=4,this._r2=0,this._pointWidth=1,this._refW=(0,o.Vf)(),this._refR1=(0,o.Vf)(),this._refR2=(0,o.Vf)()}shouldComponentUpdate(t,e){return t===this.props||t.isShow!==this.props.isShow}_hAdd=()=>{const{_fromIndex:t,_toIndex:e,_color:i,props:s}=this,{data:n,onClose:l}=s,{chart:a}=n,r=a.series,h=r[t],c=r[e],d=(0,et.E)(h.data,c.data);var p;this._heWidth((0,o.d9)(this._refW)),this._heRadius1((0,o.d9)(this._refR1)),this._heRadius2((0,o.d9)(this._refR2)),pt(this._r1,h),pt(this._r2,c),a.zhAddSeriaToYAxis({data:d,color:i,yIndex:0},(p=this._pointWidth,{...ct,pointWidth:p})),a.zhEnableDataLabels(),l()};_heColor=t=>{this._color=t};render(){const{isShow:t,data:e,onClose:i}=this.props,{chart:o}=e,{series:s}=o,[n,l,a,r]=(t=>{const e=t[0].name,i=t[1].name;return e<=i?[e,i,0,1]:[i,e,1,0]})(s),h=dt(s,a),c=dt(s,r);return this._fromIndex=a,this._toIndex=r,this._color=h,(0,j.jsxs)(y.Z,{caption:"Add ColumnRange",isShow:t,commandButtons:this._commandButtons,onClose:i,children:[(0,j.jsx)("div",{style:st,children:"Connect dots series by column range?"}),(0,j.jsxs)("div",{style:nt,children:[(0,j.jsx)(ot.Z,{style:lt,captionStyle:at,caption:"Color",initValue:h,onEnter:this._heColor}),(0,j.jsx)(it.Z,{ref:this._refW,styleRoot:lt,styleCaption:at,styleInput:ht,caption:"Width",initValue:1,maxLength:2,type:"number",min:0,max:6,step:1})]}),(0,j.jsxs)("div",{style:nt,children:[(0,j.jsx)(it.Z,{ref:this._refR1,styleRoot:lt,styleCaption:{...rt,color:h},styleInput:ht,caption:`R ${n}`,initValue:4,type:"number",maxLength:2}),(0,j.jsx)(it.Z,{ref:this._refR2,styleRoot:lt,styleCaption:{...rt,color:c},styleInput:ht,caption:`R ${l}`,initValue:0,type:"number",maxLength:2})]})]})}}const yt={CeDialog:D,SbsDialog:tt,CrDialog:xt}},6235:(t,e,i)=>{i.d(e,{T:()=>a,V:()=>r});var o=i(9916),s=i(5893);const n={color:"#607d8b"},l={color:"#232f3b"},a=t=>{let{onClick:e}=t;return(0,s.jsx)(o.Z,{style:n,caption:"Load",title:"Load Item to Container",onClick:e})},r=t=>{let{onClick:e}=t;return(0,s.jsx)(o.Z,{style:l,caption:"Show",title:"Show Item Container",onClick:e})}}}]);