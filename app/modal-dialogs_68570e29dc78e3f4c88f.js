"use strict";(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[430],{299:(t,e,i)=>{i.r(e),i.d(e,{default:()=>ut});var o=i(5672),s=i(2009),n=i(4575),l=i(4867),a=i(6984),r=i(6072);const h={style:{color:"black"}},c={xAxis:{labels:h},yAxis:{tickColor:"black",labels:h}},d={title:h},p={plotOptions:{area:{color:"black"},spline:{color:"black"},line:{color:"black"}}},u=(t,e)=>({caption:t,value:e});var y=i(2400),x=i(761),A=i(4302),m=i(2357),b=i(1205),f=i(6539),C=i(9821),_=i(4848);const g={display:"inline-block",color:"#1b75bb",fontSize:"16px",fontWeight:"bold"},j={...A.I,marginTop:10},S={...g,width:100,paddingRight:5,textAlign:"right"},k={...g,padding:"0 5px 0 3px"},w={...k,paddingLeft:6},v={width:60,height:30,marginLeft:0},I={width:250,height:30,marginLeft:0},W=(t,e,i)=>t>e&&t<i,R=function(t,e,i){return void 0===e&&(e=-70),void 0===i&&(i="9px"),{html:t,style:{left:0,top:e,color:"#909090","font-size":i}}},L={},D=(0,n.A)((t=>{let{isShow:e,data:i=L,onClose:n}=t;const[h,g]=(0,l.A)(!0),[D,E]=(0,l.A)(!0),[T,B]=(0,l.A)(!0),z=(0,s.li)({}),V=(0,s.li)([{caption:"D",onClick:g},{caption:"T",onClick:E},{caption:"S",onClick:B}]),Y=(0,a.A)((()=>[u("Default",{}),u("Default + Black Axis",(0,o.A)(!1,{},c)),u("Default + Black Axis + Black Title",(0,o.A)(!1,{},c,d)),u("All Black",(0,o.A)(!1,{},c,d,p))])),M=(0,s.li)(),P=(0,s.li)(),O=(0,s.li)(),H=(0,s.li)(),N=(0,s.Kr)((()=>t=>{(0,s.nl)(z,t&&t.value||{})}),[]),{chart:Z,fn:K}=i,q=(0,r.A)((()=>{var t,e;const[i,l]=((t,e,i)=>{let{chartWidth:o,chartHeight:s}=t;return[W(e,351,2001)?e:o,W(i,251,1001)?i:s]})(Z,(0,s.y5)(M),(0,s.y5)(P)),a=(0,o.A)(!0,{chart:{width:i,height:l},title:{text:(0,s.y5)(O)},subtitle:{text:(0,s.y5)(H)},labels:{items:[R("Web app ERC https://zhnzhn.github.io"),R("DataSource: "+(null!=(t=null==(e=Z.userOptions.zhConfig)?void 0:e.dataSource)?t:""),l-90,"10px")]}},(0,s.ZC)(z));K.apply(Z,[null,a]),n()})),F=(0,s.li)([(0,_.jsx)(f.A,{caption:"Export",isPrimary:!0,onClick:q},"export")]),{chartWidth:Q,chartHeight:U,options:X}=Z,J=X.title.text,G=X.subtitle.text;return(0,_.jsxs)(y.A,{caption:"Customize Export Chart",isShow:e,commandButtons:(0,s.ZC)(F),onClose:n,children:[(0,_.jsx)(x.A,{buttons:(0,s.ZC)(V)}),(0,_.jsx)(m.A,{isShow:h,children:(0,_.jsxs)("div",{style:A.I,children:[(0,_.jsx)("span",{style:S,children:"Dimension:"}),(0,_.jsx)("span",{style:k,children:"Width:"}),(0,_.jsx)(b.A,{ref:M,type:"number",placeholder:Q,initValue:Q,style:v,min:351,max:2001}),(0,_.jsx)("span",{style:w,children:"Height:"}),(0,_.jsx)(b.A,{ref:P,type:"number",placeholder:U,initValue:U,style:v,min:251,max:1001})]})}),(0,_.jsxs)(m.A,{isShow:D,children:[(0,_.jsxs)("div",{style:j,children:[(0,_.jsx)("span",{style:S,children:"Title:"}),(0,_.jsx)(b.A,{ref:O,initValue:J,style:I})]}),(0,_.jsxs)("div",{style:A.I,children:[(0,_.jsx)("span",{style:S,children:"Subtitle:"}),(0,_.jsx)(b.A,{ref:H,initValue:G,style:I})]})]}),(0,_.jsx)(m.A,{isShow:T,children:(0,_.jsxs)("div",{style:j,children:[(0,_.jsx)("span",{style:S,children:"Style:"}),(0,_.jsx)(C.A,{width:"250",options:Y,placeholder:"Default",onSelect:N})]})})]})}));var E=i(4250),T=i(8005),B=i(8632),z=i(5317),V=i(7591),Y=i(9288),M=i(9517);const P={width:280},O={display:"inline-block",maxWidth:295},H={marginBottom:10},N={display:"flex",alignItems:"center",margin:"8px 5px 0 5px",lineHeight:1.5,fontWeight:"bold"},Z={color:"#1b75bb",display:"inline-block",width:100,paddingRight:5,textAlign:"right",fontSize:"16px"},K={paddingTop:0},q={marginLeft:8},F=[{a:"1 Month",b:"1m"},{a:"3 Months",b:"3m"},{a:"6 Months",b:"6m"},{a:"1 Year",b:"1y"},{a:"2 Years",b:"2y"}].map((t=>{let{a:e,b:i}=t;return{caption:"IEX Cloud: "+e,value:"IEX",dfProps:{dfType:"chart",dfPeriod:i}}})),Q="TIME_SERIES",U="ADJUSTED",X=[...[{c:"Daily Adjusted (100)",r:Q+"_DAILY_"+U+"&outputsize=compact"},{c:"Weekly Adjusted",r:Q+"_WEEKLY_"+U},{c:"Monthly Adjusted",r:Q+"_MONTHLY_"+U}].map((t=>{let{c:e,r:i}=t;return{caption:"Alpha Vantage: "+e,value:"AL",route:i,dfProps:{dfFn:"EOD",dfSubId:"I"}}})),...F],J=X[0],G=(0,Y.Ox)(void 0,"t1a"),$=(0,n.A)((t=>{let{isShow:e,data:i,onClose:o}=t;const n=(0,s.li)(),[a,h]=(0,l.A)(!0),[c,d]=(0,l.A)(),p=(0,s.li)([{caption:"L",title:"Click to toggle labels",onClick:h},{caption:"O",title:"Click to toggle options",onClick:d}]),[u,A]=(0,E.A)(),[b,f]=(0,E.A)(),C=(0,r.A)((()=>{i&&"function"==typeof i.onShow&&i.onShow()})),g=(0,r.A)((()=>{const{item:t,browserType:e,chartContainerType:l,dialogProps:a}=i||{},{id:r,text:h}=t||{},{caption:c,value:d,route:p,dfProps:u}=A()||J;if(r){const i=f();(0,T.YM)({chartType:l,browserType:e},{id:r,item:t,items:[{c:h,v:r},{c,v:p}],title:h,value:r,loadId:d,_itemKey:r+"_"+d,linkFn:"NASDAQ",dataSource:c,...a,...u,...(0,s.y5)(n),seriaType:i?i.value:void 0})}o()})),j=(0,s.li)([(0,_.jsx)(B.N,{onClick:g},"load"),(0,_.jsx)(B.q,{onClick:C},"show")]),{item:S}=i||{},{text:k}=S||{},w=a?null:P,v=a?K:{...K,...q};return(0,_.jsxs)(y.A,{caption:k,style:w,styleCaption:O,isShow:e,commandButtons:(0,s.ZC)(j),onClose:o,children:[(0,_.jsx)(x.A,{buttons:(0,s.ZC)(p)}),(0,_.jsx)(z.A,{isShowLabels:a,caption:"Source",placeholder:J.caption,options:X,onSelect:u}),(0,_.jsx)(V.A,{refSeriaColor:n,isShowLabels:a,options:G,onSelectChart:b}),(0,_.jsx)(m.A,{isShow:c,style:H,children:(0,_.jsxs)("div",{style:N,children:[a&&(0,_.jsx)("span",{style:Z,children:"Link:"}),(0,_.jsx)(M.A,{style:v,item:S,caption:"NASDAQ"})]})})]})}));var tt=i(4654),et=i(6674);const it={padding:"16px 0 0 16px",fontWeight:600},ot={paddingLeft:8},st={display:"inline-block"},nt={width:60},lt={width:100},at={width:40},rt={name:"Range",type:"columnrange",borderWidth:0,pointWidth:1},ht=(t,e)=>t[e].color,ct=(t,e)=>{const{options:i}=e;i.marker.radius=t,e.update(i,!1)},dt=(t,e,i)=>function(o){const s=parseInt(o,10);s>e&&s<i&&(this[t]=o)};class pt extends s.uA{constructor(t){super(t),this._hAdd=()=>{const{_fromIndex:t,_toIndex:e,_color:i,props:o}=this,{data:n,onClose:l}=o,{chart:a}=n,r=a.series,h=r[t],c=r[e],d=((t,e)=>{const i=[];return t.forEach(((t,o)=>{const s=e[o];Boolean(t.y)&&Boolean(s.y)&&i.push({name:t.category,low:t.y<=s.y?t.y:s.y,high:t.y>=s.y?t.y:s.y})})),i})(h.data,c.data);var p;this._heWidth((0,s.y5)(this._refW)),this._heRadius1((0,s.y5)(this._refR1)),this._heRadius2((0,s.y5)(this._refR2)),ct(this._r1,h),ct(this._r2,c),a.zhAddSeriaToYAxis({data:d,color:i,yIndex:0},(p=this._pointWidth,{...rt,pointWidth:p})),a.zhEnableDataLabels(),l()},this._heColor=t=>{this._color=t},this._commandButtons=[(0,_.jsx)(f.A,{caption:"Yes, Connect",isPrimary:!0,onClick:this._hAdd},"yes")],this._heWidth=dt("_pointWidth",-1,7).bind(this),this._heRadius1=dt("_r1",-1,9).bind(this),this._heRadius2=dt("_r2",-1,9).bind(this),this._r1=4,this._r2=0,this._pointWidth=1,this._refW=(0,s._3)(),this._refR1=(0,s._3)(),this._refR2=(0,s._3)()}shouldComponentUpdate(t,e){return t===this.props||t.isShow!==this.props.isShow}render(){const{isShow:t,data:e,onClose:i}=this.props,{chart:o}=e,{series:s}=o,[n,l,a,r]=(t=>{const e=t[0].name,i=t[1].name;return e<=i?[e,i,0,1]:[i,e,1,0]})(s),h=ht(s,a),c=ht(s,r);return this._fromIndex=a,this._toIndex=r,this._color=h,(0,_.jsxs)(y.A,{caption:"Add ColumnRange",isShow:t,commandButtons:this._commandButtons,onClose:i,children:[(0,_.jsx)("div",{style:it,children:"Connect dots series by column range?"}),(0,_.jsxs)("div",{style:ot,children:[(0,_.jsx)(et.A,{style:st,captionStyle:nt,caption:"Color",initValue:h,onEnter:this._heColor}),(0,_.jsx)(tt.A,{ref:this._refW,styleRoot:st,styleCaption:nt,styleInput:at,caption:"Width",initValue:1,maxLength:2,type:"number",min:0,max:6,step:1})]}),(0,_.jsxs)("div",{style:ot,children:[(0,_.jsx)(tt.A,{ref:this._refR1,styleRoot:st,styleCaption:{...lt,color:h},styleInput:at,caption:"R "+n,initValue:4,type:"number",maxLength:2}),(0,_.jsx)(tt.A,{ref:this._refR2,styleRoot:st,styleCaption:{...lt,color:c},styleInput:at,caption:"R "+l,initValue:0,type:"number",maxLength:2})]})]})}}const ut={CeDialog:D,SbsDialog:$,CrDialog:pt}},8632:(t,e,i)=>{i.d(e,{N:()=>a,q:()=>r});var o=i(6539),s=i(4848);const n={color:"#607d8b"},l={color:"#232f3b"},a=t=>{let{onClick:e}=t;return(0,s.jsx)(o.A,{style:n,caption:"Load",title:"Load Item to Container",onClick:e})},r=t=>{let{onClick:e}=t;return(0,s.jsx)(o.A,{style:l,caption:"Show",title:"Show Item Container",onClick:e})}}}]);