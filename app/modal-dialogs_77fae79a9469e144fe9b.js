"use strict";(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[430],{299:(t,e,i)=>{i.r(e),i.d(e,{default:()=>pt});var o=i(5672),s=i(2009),n=i(4575),l=i(4867),a=i(6984),r=i(6072);const h={style:{color:"black"}},c={xAxis:{labels:h},yAxis:{tickColor:"black",labels:h}},d={title:h},p={plotOptions:{area:{color:"black"},spline:{color:"black"},line:{color:"black"}}},u=(t,e)=>({caption:t,value:e});var y=i(6912),x=i(2400),A=i(761),m=i(2357),b=i(1205),f=i(6539),C=i(9821),_=i(4848);const g={display:"inline-block",color:"#1b75bb",fontSize:"16px",fontWeight:"bold"},j={marginTop:10},S={...g,width:100,paddingRight:5,textAlign:"right"},k={...g,padding:"0 5px 0 10px"},w={width:60,height:30,marginLeft:0},v={width:250,height:30,marginLeft:0},W=(t,e,i)=>t>e&&t<i,R=function(t,e,i){return void 0===e&&(e=-70),void 0===i&&(i="9px"),{html:t,style:{left:0,top:e,color:"#909090","font-size":i}}},I={},D=(0,n.A)((t=>{let{isShow:e,data:i=I,onClose:n}=t;const[h,g]=(0,l.A)(!0),[D,L]=(0,l.A)(!0),[E,T]=(0,l.A)(!0),B=(0,s.li)({}),z=(0,s.li)([{caption:"D",onClick:g},{caption:"T",onClick:L},{caption:"S",onClick:T}]),V=(0,a.A)((()=>[u("Default",{}),u("Default + Black Axis",(0,o.A)(!1,{},c)),u("Default + Black Axis + Black Title",(0,o.A)(!1,{},c,d)),u("All Black",(0,o.A)(!1,{},c,d,p))])),Y=(0,s.li)(),M=(0,s.li)(),P=(0,s.li)(),O=(0,s.li)(),H=(0,s.Kr)((()=>t=>{(0,s.nl)(B,t&&t.value||{})}),[]),{chart:N,fn:Z}=i,K=(0,r.A)((()=>{var t,e;const[i,l]=((t,e,i)=>{let{chartWidth:o,chartHeight:s}=t;return[W(e,351,2001)?e:o,W(i,251,1001)?i:s]})(N,(0,s.y5)(Y),(0,s.y5)(M)),a=(0,o.A)(!0,{chart:{width:i,height:l},title:{text:(0,s.y5)(P)},subtitle:{text:(0,s.y5)(O)},labels:{items:[R("Web app ERC https://zhnzhn.github.io"),R("DataSource: "+(null!=(t=null==(e=N.userOptions.zhConfig)?void 0:e.dataSource)?t:""),l-90,"10px")]}},(0,s.ZC)(B));Z.apply(N,[null,a]),n()})),q=(0,s.li)([(0,_.jsx)(f.A,{caption:"Export",isPrimary:!0,onClick:K},"export")]),{chartWidth:F,chartHeight:Q,options:U}=N,X=U.title.text,J=U.subtitle.text;return(0,_.jsxs)(x.A,{caption:"Customize Export Chart",isShow:e,commandButtons:(0,s.ZC)(q),onClose:n,children:[(0,_.jsx)(A.A,{buttons:(0,s.ZC)(z)}),(0,_.jsx)(m.A,{isShow:h,children:(0,_.jsxs)(y.st,{children:[(0,_.jsx)("span",{style:S,children:"Dimension:"}),(0,_.jsx)("span",{style:k,children:"Width"}),(0,_.jsx)(b.A,{ref:Y,type:"number",placeholder:F,initValue:F,style:w,min:351,max:2001}),(0,_.jsx)("span",{style:k,children:"Height"}),(0,_.jsx)(b.A,{ref:M,type:"number",placeholder:Q,initValue:Q,style:w,min:251,max:1001})]})}),(0,_.jsxs)(m.A,{isShow:D,children:[(0,_.jsxs)(y.st,{style:j,children:[(0,_.jsx)("span",{style:S,children:"Title"}),(0,_.jsx)(b.A,{ref:P,initValue:X,style:v})]}),(0,_.jsxs)(y.st,{children:[(0,_.jsx)("span",{style:S,children:"Subtitle"}),(0,_.jsx)(b.A,{ref:O,initValue:J,style:v})]})]}),(0,_.jsx)(m.A,{isShow:E,children:(0,_.jsxs)(y.st,{style:j,children:[(0,_.jsx)("span",{style:S,children:"Style"}),(0,_.jsx)(C.A,{width:"250",options:V,placeholder:"Default",onSelect:H})]})})]})}));var L=i(4250),E=i(8005),T=i(8632),B=i(5317),z=i(7591),V=i(9288),Y=i(9517);const M={width:280},P={display:"inline-block",maxWidth:295},O={marginBottom:10},H={display:"flex",alignItems:"center",margin:"8px 5px 0 5px",lineHeight:1.5,fontWeight:"bold"},N={color:"#1b75bb",display:"inline-block",width:100,paddingRight:5,textAlign:"right",fontSize:"16px"},Z={paddingTop:0},K={marginLeft:8},q=[{a:"1 Month",b:"1m"},{a:"3 Months",b:"3m"},{a:"6 Months",b:"6m"},{a:"1 Year",b:"1y"},{a:"2 Years",b:"2y"}].map((t=>{let{a:e,b:i}=t;return{caption:"IEX Cloud: "+e,value:"IEX",dfProps:{dfType:"chart",dfPeriod:i}}})),F="TIME_SERIES",Q="ADJUSTED",U=[...[{c:"Daily Adjusted (100)",r:F+"_DAILY_"+Q+"&outputsize=compact"},{c:"Weekly Adjusted",r:F+"_WEEKLY_"+Q},{c:"Monthly Adjusted",r:F+"_MONTHLY_"+Q}].map((t=>{let{c:e,r:i}=t;return{caption:"Alpha Vantage: "+e,value:"AL",route:i,dfProps:{dfFn:"EOD",dfSubId:"I"}}})),...q],X=U[0],J=(0,V.Ox)(void 0,"t1a"),G=(0,n.A)((t=>{let{isShow:e,data:i,onClose:o}=t;const n=(0,s.li)(),[a,h]=(0,l.A)(!0),[c,d]=(0,l.A)(),p=(0,s.li)([{caption:"L",title:"Click to toggle labels",onClick:h},{caption:"O",title:"Click to toggle options",onClick:d}]),[u,y]=(0,L.A)(),[b,f]=(0,L.A)(),C=(0,r.A)((()=>{i&&"function"==typeof i.onShow&&i.onShow()})),g=(0,r.A)((()=>{const{item:t,browserType:e,chartContainerType:l,dialogProps:a}=i||{},{id:r,text:h}=t||{},{caption:c,value:d,route:p,dfProps:u}=y()||X;if(r){const i=f();(0,E.YM)({chartType:l,browserType:e},{id:r,item:t,items:[{c:h,v:r},{c,v:p}],title:h,value:r,loadId:d,_itemKey:r+"_"+d,linkFn:"NASDAQ",dataSource:c,...a,...u,...(0,s.y5)(n),seriaType:i?i.value:void 0})}o()})),j=(0,s.li)([(0,_.jsx)(T.N,{onClick:g},"load"),(0,_.jsx)(T.q,{onClick:C},"show")]),{item:S}=i||{},{text:k}=S||{},w=a?null:M,v=a?Z:{...Z,...K};return(0,_.jsxs)(x.A,{caption:k,style:w,styleCaption:P,isShow:e,commandButtons:(0,s.ZC)(j),onClose:o,children:[(0,_.jsx)(A.A,{buttons:(0,s.ZC)(p)}),(0,_.jsx)(B.A,{isShowLabels:a,caption:"Source",placeholder:X.caption,options:U,onSelect:u}),(0,_.jsx)(z.A,{refSeriaColor:n,isShowLabels:a,options:J,onSelectChart:b}),(0,_.jsx)(m.A,{isShow:c,style:O,children:(0,_.jsxs)("div",{style:H,children:[a&&(0,_.jsx)("span",{style:N,children:"Link:"}),(0,_.jsx)(Y.A,{style:v,item:S,caption:"NASDAQ"})]})})]})}));var $=i(4654),tt=i(6674);const et={padding:"16px 0 0 16px",fontWeight:600},it={paddingLeft:8},ot={display:"inline-block"},st={width:60},nt={width:100},lt={width:40},at={name:"Range",type:"columnrange",borderWidth:0,pointWidth:1},rt=(t,e)=>t[e].color,ht=(t,e)=>{const{options:i}=e;i.marker.radius=t,e.update(i,!1)},ct=(t,e,i)=>function(o){const s=parseInt(o,10);s>e&&s<i&&(this[t]=o)};class dt extends s.uA{constructor(t){super(t),this._hAdd=()=>{const{_fromIndex:t,_toIndex:e,_color:i,props:o}=this,{data:n,onClose:l}=o,{chart:a}=n,r=a.series,h=r[t],c=r[e],d=((t,e)=>{const i=[];return t.forEach(((t,o)=>{const s=e[o];Boolean(t.y)&&Boolean(s.y)&&i.push({name:t.category,low:t.y<=s.y?t.y:s.y,high:t.y>=s.y?t.y:s.y})})),i})(h.data,c.data);var p;this._heWidth((0,s.y5)(this._refW)),this._heRadius1((0,s.y5)(this._refR1)),this._heRadius2((0,s.y5)(this._refR2)),ht(this._r1,h),ht(this._r2,c),a.zhAddSeriaToYAxis({data:d,color:i,yIndex:0},(p=this._pointWidth,{...at,pointWidth:p})),a.zhEnableDataLabels(),l()},this._heColor=t=>{this._color=t},this._commandButtons=[(0,_.jsx)(f.A,{caption:"Yes, Connect",isPrimary:!0,onClick:this._hAdd},"yes")],this._heWidth=ct("_pointWidth",-1,7).bind(this),this._heRadius1=ct("_r1",-1,9).bind(this),this._heRadius2=ct("_r2",-1,9).bind(this),this._r1=4,this._r2=0,this._pointWidth=1,this._refW=(0,s._3)(),this._refR1=(0,s._3)(),this._refR2=(0,s._3)()}shouldComponentUpdate(t,e){return t===this.props||t.isShow!==this.props.isShow}render(){const{isShow:t,data:e,onClose:i}=this.props,{chart:o}=e,{series:s}=o,[n,l,a,r]=(t=>{const e=t[0].name,i=t[1].name;return e<=i?[e,i,0,1]:[i,e,1,0]})(s),h=rt(s,a),c=rt(s,r);return this._fromIndex=a,this._toIndex=r,this._color=h,(0,_.jsxs)(x.A,{caption:"Add ColumnRange",isShow:t,commandButtons:this._commandButtons,onClose:i,children:[(0,_.jsx)("div",{style:et,children:"Connect dots series by column range?"}),(0,_.jsxs)("div",{style:it,children:[(0,_.jsx)(tt.A,{style:ot,captionStyle:st,caption:"Color",initValue:h,onEnter:this._heColor}),(0,_.jsx)($.A,{ref:this._refW,styleRoot:ot,styleCaption:st,styleInput:lt,caption:"Width",initValue:1,maxLength:2,type:"number",min:0,max:6,step:1})]}),(0,_.jsxs)("div",{style:it,children:[(0,_.jsx)($.A,{ref:this._refR1,styleRoot:ot,styleCaption:{...nt,color:h},styleInput:lt,caption:"R "+n,initValue:4,type:"number",maxLength:2}),(0,_.jsx)($.A,{ref:this._refR2,styleRoot:ot,styleCaption:{...nt,color:c},styleInput:lt,caption:"R "+l,initValue:0,type:"number",maxLength:2})]})]})}}const pt={CeDialog:D,SbsDialog:G,CrDialog:dt}},8632:(t,e,i)=>{i.d(e,{N:()=>a,q:()=>r});var o=i(6539),s=i(4848);const n={color:"#607d8b"},l={color:"#232f3b"},a=t=>{let{onClick:e}=t;return(0,s.jsx)(o.A,{style:n,caption:"Load",title:"Load Item to Container",onClick:e})},r=t=>{let{onClick:e}=t;return(0,s.jsx)(o.A,{style:l,caption:"Show",title:"Show Item Container",onClick:e})}}}]);