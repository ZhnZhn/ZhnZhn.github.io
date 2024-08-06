"use strict";(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[430],{299:(t,e,i)=>{i.r(e),i.d(e,{default:()=>pt});var o=i(5672),s=i(6559),n=i(2009),l=i(4575),a=i(4867),r=i(6984),h=i(6072);const c={style:{color:"black"}},d={xAxis:{labels:c},yAxis:{tickColor:"black",labels:c}},p={title:c},u={plotOptions:{area:{color:"black"},spline:{color:"black"},line:{color:"black"}}},y=(t,e)=>({caption:t,value:e});var x=i(6912),A=i(2400),m=i(761),b=i(2357),f=i(1205),_=i(6539),C=i(6476),g=i(4848);const j={display:"inline-block",color:"#1b75bb",fontSize:"16px",fontWeight:"bold"},S={marginTop:10},w={...j,width:100,paddingRight:5,textAlign:"right"},k={...j,padding:"0 5px 0 10px"},v={width:60,height:30,marginLeft:0},W={width:250,height:30,marginLeft:0},E=function(t,e,i){return void 0===e&&(e=-70),void 0===i&&(i="9px"),{html:t,style:{left:0,top:e,color:"#909090","font-size":i}}},R={},I=(0,l.A)((t=>{let{isShow:e,data:i=R,onClose:l}=t;const[c,j]=(0,a.A)(!0),[I,D]=(0,a.A)(!0),[L,T]=(0,a.A)(!0),$=(0,n.li)({}),B=(0,n.li)([{caption:"D",onClick:j},{caption:"T",onClick:D},{caption:"S",onClick:T}]),z=(0,r.A)((()=>[y("Default",{}),y("Default + Black Axis",(0,o.A)(!1,{},d)),y("Default + Black Axis + Black Title",(0,o.A)(!1,{},d,p)),y("All Black",(0,o.A)(!1,{},d,p,u))])),V=(0,n.li)(),Y=(0,n.li)(),M=(0,n.li)(),P=(0,n.li)(),O=(0,n.Kr)((()=>t=>{(0,n.nl)($,t&&t.value||{})}),[]),{chart:H,fn:N}=i,Z=(0,h.A)((()=>{const[t,e]=((t,e,i)=>{let{chartWidth:o,chartHeight:n}=t;return[(0,s.h$)(e,351,2001)?e:o,(0,s.h$)(i,251,1001)?i:n]})(H,(0,n.y5)(V),(0,n.y5)(Y)),i=(0,o.A)(!0,{chart:{width:t,height:e},title:{text:(0,n.y5)(M)},subtitle:{text:(0,n.y5)(P)},labels:{items:[E("Web app ERC https://zhnzhn.github.io"),E(`DataSource: ${H.userOptions.zhConfig?.dataSource??""}`,e-90,"10px")]}},(0,n.ZC)($));N.apply(H,[null,i]),l()})),K=(0,n.li)([(0,g.jsx)(_.A,{caption:"Export",isPrimary:!0,onClick:Z},"export")]),{chartWidth:q,chartHeight:F,options:Q}=H,U=Q.title.text,X=Q.subtitle.text;return(0,g.jsxs)(A.A,{caption:"Customize Export Chart",isShow:e,commandButtons:(0,n.ZC)(K),onClose:l,children:[(0,g.jsx)(m.A,{buttons:(0,n.ZC)(B)}),(0,g.jsx)(b.A,{isShow:c,children:(0,g.jsxs)(x.st,{children:[(0,g.jsx)("span",{style:w,children:"Dimension:"}),(0,g.jsx)("span",{style:k,children:"Width"}),(0,g.jsx)(f.A,{refEl:V,type:"number",placeholder:q,initValue:q,style:v,min:351,max:2001}),(0,g.jsx)("span",{style:k,children:"Height"}),(0,g.jsx)(f.A,{refEl:Y,type:"number",placeholder:F,initValue:F,style:v,min:251,max:1001})]})}),(0,g.jsxs)(b.A,{isShow:I,children:[(0,g.jsxs)(x.st,{style:S,children:[(0,g.jsx)("span",{style:w,children:"Title"}),(0,g.jsx)(f.A,{refEl:M,initValue:U,style:W})]}),(0,g.jsxs)(x.st,{children:[(0,g.jsx)("span",{style:w,children:"Subtitle"}),(0,g.jsx)(f.A,{refEl:P,initValue:X,style:W})]})]}),(0,g.jsx)(b.A,{isShow:L,children:(0,g.jsxs)(x.st,{style:S,children:[(0,g.jsx)("span",{style:w,children:"Style"}),(0,g.jsx)(C.A,{width:"250",options:z,placeholder:"Default",onSelect:O})]})})]})}));var D=i(4250),L=i(5775),T=i(8632),$=i(5317),B=i(7591),z=i(9288),V=i(9517);const Y={width:280},M={display:"inline-block",maxWidth:295},P={marginBottom:10},O={display:"flex",alignItems:"center",margin:"8px 5px 0 5px",lineHeight:1.5,fontWeight:"bold"},H={color:"#1b75bb",display:"inline-block",width:100,paddingRight:5,textAlign:"right",fontSize:"16px"},N={paddingTop:0},Z={marginLeft:8},K=[{a:"1 Month",b:"1m"},{a:"3 Months",b:"3m"},{a:"6 Months",b:"6m"},{a:"1 Year",b:"1y"},{a:"2 Years",b:"2y"}].map((t=>{let{a:e,b:i}=t;return{caption:"IEX Cloud: "+e,value:"IEX",dfProps:{dfType:"chart",dfPeriod:i}}})),q="TIME_SERIES",F="ADJUSTED",Q=[...[{c:"Daily Adjusted (100)",r:`${q}_DAILY_${F}&outputsize=compact`},{c:"Weekly Adjusted",r:`${q}_WEEKLY_${F}`},{c:"Monthly Adjusted",r:`${q}_MONTHLY_${F}`}].map((t=>{let{c:e,r:i}=t;return{caption:`Alpha Vantage: ${e}`,value:"AL",route:i,dfProps:{dfFn:"EOD",dfSubId:"I"}}})),...K],U=Q[0],X=(0,z.Ox)(void 0,"t1a"),J=(0,l.A)((t=>{let{isShow:e,data:i,onClose:o}=t;const s=(0,n.li)(),[l,r]=(0,a.A)(!0),[c,d]=(0,a.A)(),p=(0,n.li)([{caption:"L",title:"Click to toggle labels",onClick:r},{caption:"O",title:"Click to toggle options",onClick:d}]),[u,y]=(0,D.A)(),[x,f]=(0,D.A)(),_=(0,h.A)((()=>{i&&"function"==typeof i.onShow&&i.onShow()})),C=(0,h.A)((()=>{const{item:t,browserType:e,chartContainerType:l,dialogProps:a}=i||{},{id:r,text:h}=t||{},{caption:c,value:d,route:p,dfProps:u}=y()||U;if(r){const i=f();(0,L.YM)({chartType:l,browserType:e},{id:r,item:t,items:[{c:h,v:r},{c,v:p}],title:h,value:r,loadId:d,_itemKey:`${r}_${d}`,linkFn:"NASDAQ",dataSource:c,...a,...u,...(0,n.y5)(s),seriaType:i?i.value:void 0})}o()})),j=(0,n.li)([(0,g.jsx)(T.N,{onClick:C},"load"),(0,g.jsx)(T.q,{onClick:_},"show")]),{item:S}=i||{},{text:w}=S||{},k=l?null:Y,v=l?N:{...N,...Z};return(0,g.jsxs)(A.A,{caption:w,style:k,styleCaption:M,isShow:e,commandButtons:(0,n.ZC)(j),onClose:o,children:[(0,g.jsx)(m.A,{buttons:(0,n.ZC)(p)}),(0,g.jsx)($.A,{isShowLabels:l,caption:"Source",placeholder:U.caption,options:Q,onSelect:u}),(0,g.jsx)(B.A,{refSeriaColor:s,isShowLabels:l,options:X,onSelectChart:x}),(0,g.jsx)(b.A,{isShow:c,style:P,children:(0,g.jsxs)("div",{style:O,children:[l&&(0,g.jsx)("span",{style:H,children:"Link:"}),(0,g.jsx)(V.A,{style:v,item:S,caption:"NASDAQ"})]})})]})}));var G=i(4654),tt=i(6674);const et={padding:"16px 0 0 16px",fontWeight:600},it={paddingLeft:8},ot={display:"inline-block"},st={width:60},nt={width:100},lt={width:40},at={name:"Range",type:"columnrange",borderWidth:0,pointWidth:1},rt=(t,e)=>t[e].color,ht=(t,e)=>{const{options:i}=e;i.marker.radius=t,e.update(i,!1)},ct=(t,e,i)=>function(o){const s=parseInt(o,10);s>e&&s<i&&(this[t]=o)};class dt extends n.uA{constructor(t){super(t),this._commandButtons=[(0,g.jsx)(_.A,{caption:"Yes, Connect",isPrimary:!0,onClick:this._hAdd},"yes")],this._heWidth=ct("_pointWidth",-1,7).bind(this),this._heRadius1=ct("_r1",-1,9).bind(this),this._heRadius2=ct("_r2",-1,9).bind(this),this._r1=4,this._r2=0,this._pointWidth=1,this._refW=(0,n._3)(),this._refR1=(0,n._3)(),this._refR2=(0,n._3)()}shouldComponentUpdate(t,e){return t===this.props||t.isShow!==this.props.isShow}_hAdd=()=>{const{_fromIndex:t,_toIndex:e,_color:i,props:o}=this,{data:s,onClose:l}=o,{chart:a}=s,r=a.series,h=r[t],c=r[e],d=((t,e)=>{const i=[];return t.forEach(((t,o)=>{const s=e[o];Boolean(t.y)&&Boolean(s.y)&&i.push({name:t.category,low:t.y<=s.y?t.y:s.y,high:t.y>=s.y?t.y:s.y})})),i})(h.data,c.data);var p;this._heWidth((0,n.y5)(this._refW)),this._heRadius1((0,n.y5)(this._refR1)),this._heRadius2((0,n.y5)(this._refR2)),ht(this._r1,h),ht(this._r2,c),a.zhAddSeriaToYAxis({data:d,color:i,yIndex:0},(p=this._pointWidth,{...at,pointWidth:p})),a.zhDataLabels(!0),l()};_heColor=t=>{this._color=t};render(){const{isShow:t,data:e,onClose:i}=this.props,{chart:o}=e,{series:s}=o,[n,l,a,r]=(t=>{const e=t[0].name,i=t[1].name;return e<=i?[e,i,0,1]:[i,e,1,0]})(s),h=rt(s,a),c=rt(s,r);return this._fromIndex=a,this._toIndex=r,this._color=h,(0,g.jsxs)(A.A,{caption:"Add ColumnRange",isShow:t,commandButtons:this._commandButtons,onClose:i,children:[(0,g.jsx)("div",{style:et,children:"Connect dots series by column range?"}),(0,g.jsxs)("div",{style:it,children:[(0,g.jsx)(tt.A,{style:ot,captionStyle:st,caption:"Color",initValue:h,onEnter:this._heColor}),(0,g.jsx)(G.A,{refEl:this._refW,styleRoot:ot,styleCaption:st,styleInput:lt,caption:"Width",initValue:1,maxLength:2,type:"number",min:0,max:6,step:1})]}),(0,g.jsxs)("div",{style:it,children:[(0,g.jsx)(G.A,{refEl:this._refR1,styleRoot:ot,styleCaption:{...nt,color:h},styleInput:lt,caption:`R ${n}`,initValue:4,type:"number",maxLength:2}),(0,g.jsx)(G.A,{refEl:this._refR2,styleRoot:ot,styleCaption:{...nt,color:c},styleInput:lt,caption:`R ${l}`,initValue:0,type:"number",maxLength:2})]})]})}}const pt={CeDialog:I,SbsDialog:J,CrDialog:dt}},8632:(t,e,i)=>{i.d(e,{N:()=>l,q:()=>a});var o=i(6539),s=i(4848);const n=(t,e,i)=>n=>{let{onClick:l}=n;return(0,s.jsx)(o.A,{style:t,caption:e,title:i,onClick:l})},l=n({color:"#607d8b"},"Load","Load Item to Container"),a=n({color:"#232f3b"},"Show","Show Item Container")}}]);