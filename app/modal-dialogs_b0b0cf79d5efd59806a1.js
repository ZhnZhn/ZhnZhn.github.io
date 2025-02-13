"use strict";(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[430],{2160:(t,e,i)=>{i.r(e),i.d(e,{default:()=>dt});var l=i(5672),o=i(6559),n=i(1315),s=i(4575),a=i(4867),r=i(6984),c=i(6072);const p={style:{color:"black"}},h={xAxis:{labels:p},yAxis:{tickColor:"black",labels:p}},d={title:p},x={plotOptions:{area:{color:"black"},spline:{color:"black"},line:{color:"black"}}},u=(t,e)=>({caption:t,value:e});var A=i(6912),y=i(2400),m=i(761),g=i(2357),j=i(1205),C=i(6539),b=i(6476),S=i(4848);const f={display:"inline-block",color:"#1b75bb",fontSize:"16px",fontWeight:"bold"},k={marginTop:10},w={...f,width:100,paddingRight:5,textAlign:"right"},v={...f,padding:"0 5px 0 10px"},E={width:60,height:30,marginLeft:0},D={width:250,height:30,marginLeft:0},L=function(t,e,i){return void 0===e&&(e=-70),void 0===i&&(i="9px"),{html:t,style:{left:0,top:e,color:"#909090","font-size":i}}},T={},I=[{caption:"PNG image",value:void 0},{caption:"JPEG image",value:{type:"image/jpeg"}},{caption:"SVG vector image",value:{type:"image/svg+xml"}}],V=I[0],$=(t,e)=>t&&t.value||e,z=t=>({text:(0,n.y5)(t)}),B=(0,s.A)((t=>{let{isShow:e,data:i=T,onClose:s}=t;const[p,f]=(0,a.A)(!0),[B,W]=(0,a.A)(!0),[Z,_]=(0,a.A)(!0),P=(0,n.li)({}),R=(0,n.li)(null),K=(0,n.li)([{caption:"D",onClick:f},{caption:"T",onClick:W},{caption:"S",onClick:_}]),N=(0,r.A)((()=>[u("Default",{}),u("Default + Black Axis",(0,l.A)(!1,{},h)),u("Default + Black Axis + Black Title",(0,l.A)(!1,{},h,d)),u("All Black",(0,l.A)(!1,{},h,d,x))])),O=(0,n.li)(),H=(0,n.li)(),M=(0,n.li)(),Y=(0,n.li)(),[G,J]=(0,n.Kr)((()=>[t=>(0,n.nl)(P,$(t,{})),t=>(0,n.nl)(R,$(t,null))]),[]),{chart:q}=i,F=(0,c.A)((()=>{const[t,e]=((t,e,i)=>{let{chartWidth:l,chartHeight:n}=t;return[(0,o.h$)(e,351,2001)?e:l,(0,o.h$)(i,251,1001)?i:n]})(q,(0,n.y5)(O),(0,n.y5)(H)),i=(0,l.A)(!0,{chart:{width:t,height:e},title:z(M),subtitle:z(Y),labels:{items:[L("Web app ERC https://zhnzhn.github.io"),L(`DataSource: ${q.userOptions.zhConfig?.dataSource??""}`,e-90,"10px")]}},(0,n.ZC)(P));q.exportChartLocal((0,n.ZC)(R),i),s()})),Q=(0,n.li)([(0,S.jsx)(C.A,{caption:"Export",isPrimary:!0,onClick:F},"export")]),{chartWidth:U,chartHeight:X,options:tt}=q,et=tt.title.text,it=tt.subtitle.text;return(0,S.jsxs)(y.A,{caption:"Customize Export Chart",isShow:e,commandButtons:(0,n.ZC)(Q),onClose:s,children:[(0,S.jsx)(m.A,{buttons:(0,n.ZC)(K)}),(0,S.jsx)(g.A,{isShow:p,children:(0,S.jsxs)(A.st,{children:[(0,S.jsx)("span",{style:w,children:"Dimension:"}),(0,S.jsx)("span",{style:v,children:"Width"}),(0,S.jsx)(j.A,{refEl:O,type:"number",placeholder:U,initValue:U,style:E,min:351,max:2001}),(0,S.jsx)("span",{style:v,children:"Height"}),(0,S.jsx)(j.A,{refEl:H,type:"number",placeholder:X,initValue:X,style:E,min:251,max:1001})]})}),(0,S.jsxs)(g.A,{isShow:B,children:[(0,S.jsxs)(A.st,{style:k,children:[(0,S.jsx)("span",{style:w,children:"Title"}),(0,S.jsx)(j.A,{refEl:M,initValue:et,style:D})]}),(0,S.jsxs)(A.st,{children:[(0,S.jsx)("span",{style:w,children:"Subtitle"}),(0,S.jsx)(j.A,{refEl:Y,initValue:it,style:D})]})]}),(0,S.jsx)(g.A,{isShow:Z,children:(0,S.jsxs)(A.st,{style:k,children:[(0,S.jsx)("span",{style:w,children:"Style"}),(0,S.jsx)(b.A,{width:"250",options:N,placeholder:"Default",onSelect:G})]})}),(0,S.jsxs)(A.st,{style:k,children:[(0,S.jsx)("span",{style:w,children:"Export As"}),(0,S.jsx)(b.A,{width:"250",options:I,placeholder:V.caption,onSelect:J})]})]})}));var W=i(2190),Z=i(4250),_=i(8120),P=i(8632),R=i(5317),K=i(7591),N=i(9288),O=i(9517);const H={width:280},M={display:"inline-block",maxWidth:295},Y={marginBottom:10},G={display:"flex",alignItems:"center",margin:"8px 5px 0 5px",lineHeight:1.5,fontWeight:"bold"},J={color:"#1b75bb",display:"inline-block",width:100,paddingRight:5,textAlign:"right",fontSize:"16px"},q={paddingTop:0},F={marginLeft:8},Q=t=>`TIME_SERIES_${t}_ADJUSTED`,U=[...[{c:"Daily Adjusted (100)",r:`${Q("DAILY")}&outputsize=compact`},{c:"Weekly Adjusted",r:Q("WEEKLY")},{c:"Monthly Adjusted",r:Q("MONTHLY")}].map((t=>{let{c:e,r:i}=t;return{caption:`Alpha Vantage: ${e}`,value:W.Jm,route:i,dfProps:{dfFn:"EOD",dfSubId:"I"}}}))],X=U[0],tt=(0,N.O)(void 0,"t1"),et=(0,s.A)((t=>{let{isShow:e,data:i,onClose:l}=t;const o=(0,n.li)(),[s,r]=(0,a.A)(!0),[p,h]=(0,a.A)(),d=(0,n.li)([{caption:"L",title:"Click to toggle labels",onClick:r},{caption:"O",title:"Click to toggle options",onClick:h}]),[x,u]=(0,Z.A)(),[A,j]=(0,Z.A)(),C=(0,c.A)((()=>{i&&(0,n.fp)(i.onShow)&&i.onShow()})),b=(0,c.A)((()=>{const{item:t,browserType:e,chartContainerType:s,dialogProps:a}=i||{},{id:r,text:c}=t||{},{caption:p,value:h,route:d,dfProps:x}=u()||X;if(r){const i=j();(0,_.YM)({chartType:s,browserType:e},{id:r,item:t,items:[{c,v:r},{c:p,v:d}],title:c,value:r,loadId:h,_itemKey:`${r}_${h}`,linkFn:"NASDAQ",dataSource:p,...a,...x,...(0,n.y5)(o),seriaType:i?i.value:void 0})}l()})),f=(0,n.li)([(0,S.jsx)(P.N,{onClick:b},"load"),(0,S.jsx)(P.q,{onClick:C},"show")]),{item:k}=i||{},{text:w}=k||{},v=s?null:H,E=s?q:{...q,...F};return(0,S.jsxs)(y.A,{caption:w,style:v,styleCaption:M,isShow:e,commandButtons:(0,n.ZC)(f),onClose:l,children:[(0,S.jsx)(m.A,{buttons:(0,n.ZC)(d)}),(0,S.jsx)(R.A,{isShowLabels:s,caption:"Source",placeholder:X.caption,options:U,onSelect:x}),(0,S.jsx)(K.A,{refSeriaColor:o,isShowLabels:s,options:tt,onSelectChart:A}),(0,S.jsx)(g.A,{isShow:p,style:Y,children:(0,S.jsxs)("div",{style:G,children:[s&&(0,S.jsx)("span",{style:J,children:"Link:"}),(0,S.jsx)(O.A,{style:E,item:k,caption:"NASDAQ"})]})})]})}));var it=i(4558),lt=i(2089),ot=i(4654);const nt={paddingLeft:8,paddingBottom:8},st={width:100},at={width:40},rt=(t,e)=>t[e].color,ct=(t,e)=>{const{options:i}=e;i.marker.radius=t,e.update(i,!1)},pt=(t,e,i,l)=>{const o=parseInt((0,n.y5)(t),10);return o>=e&&o<=i?o:l},ht=t=>{let{refEl:e,color:i,caption:l,initValue:o}=t;return(0,S.jsx)(ot.A,{refEl:e,styleRoot:it.mL,styleCaption:{...st,color:i},styleInput:at,caption:l,initValue:o,type:"number",maxLength:2,min:1,max:15})},dt={CeDialog:B,SbsDialog:et,CrDialog:(0,s.A)((t=>{let{isShow:e,data:i,onClose:l}=t;const o=(0,n.li)(),s=(0,n.li)(),a=(0,n.li)(),r=(0,n.li)(),c=(0,n.li)(!1),[p,h]=(0,n.Kr)((()=>[()=>{(0,n.nl)(c,!0)},()=>{(0,n.nl)(c,!1)}]),[]),d=(0,n.Kr)((()=>()=>{const{chart:t}=i,e=t.series,p=e[(0,n.ZC)(o)],h=e[(0,n.ZC)(s)],d=pt(a,1,15,8),x=pt(r,1,15,5);ct(d,p),ct(x,h),t.zhDataLabels((0,n.ZC)(c)),l()}),[i,l]),x=(0,n.Kr)((()=>[(0,S.jsx)(C.A,{caption:"Apply",isPrimary:!0,onClick:d},"yes")]),[d]),{chart:u}=i,{series:A}=u,[m,g,j,b]=(t=>{const e=t[0].name,i=t[1].name;return e<=i?[e,i,0,1]:[i,e,1,0]})(A),f=rt(A,j),k=rt(A,b);return(0,n.nl)(o,j),(0,n.nl)(s,b),(0,S.jsxs)(y.A,{caption:"Style Dot Series",isShow:e,commandButtons:x,onClose:l,children:[(0,S.jsx)("div",{style:nt,children:(0,S.jsx)(lt.A,{caption:"Enable Labels",onCheck:p,onUnCheck:h})}),(0,S.jsxs)("div",{style:nt,children:[(0,S.jsx)(ht,{refEl:a,color:f,caption:`R ${m}`,initValue:8}),(0,S.jsx)(ht,{refEl:r,color:k,caption:`R ${g}`,initValue:5})]})]})}))}},8632:(t,e,i)=>{i.d(e,{N:()=>s,q:()=>a});var l=i(6539),o=i(4848);const n=(t,e,i)=>n=>{let{onClick:s}=n;return(0,o.jsx)(l.A,{style:t,caption:e,title:i,onClick:s})},s=n({color:"#607d8b"},"Load","Load Item to Container"),a=n({color:"#232f3b"},"Show","Show Item Container")}}]);