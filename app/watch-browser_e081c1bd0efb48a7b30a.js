"use strict";(self.webpackChunkweb_app_erc=self.webpackChunkweb_app_erc||[]).push([[103],{6366:(e,t,r)=>{r.r(t),r.d(t,{default:()=>ge});var o=r(4558),n=r(4867),a=r(634),i=r(8801),s=r(4427),l=r(3597);const p=()=>(0,s.BK)(l.VO),d=()=>(0,s.BK)(l.aF),c=e=>(0,s.BK)(l.R0,e),u=(e,t)=>{t.stopPropagation(),(0,i._x)(e)};var g=r(7326),C=r(1358),x=r(4848);const I="bt__watch__bar",T={marginBottom:10},y={marginLeft:20},m=e=>{let{isShow:t,onClickGroup:r,onClickList:o}=e;return t?(0,x.jsxs)("div",{style:T,children:[(0,x.jsx)(C.A,{caption:"GROUP",className:I,onClick:r}),(0,x.jsx)(C.A,{caption:"LIST",className:I,style:y,onClick:o})]}):null};var v=r(2009);const f=e=>JSON.parse(e.dataTransfer.getData("text")),E={GROUP:"GROUP",C_GROUP_ENTER:"#1b2836",LIST:"LIST",C_LIST_ENTER:"#80c040",ITEM:"ITEM"},h="border-bottom",P="border-left";let S,D,j,_;const b=e=>e.currentTarget.style,L=(e,t)=>(e=>"4px solid "+e)((e=>-1!==S.indexOf(e))(e)?t||"green":"red"),k=e=>{const t=D.style;b(e).removeProperty(P),t.removeProperty("border"),t.setProperty(h,j)},A=Object.assign,N=e=>{let{event:t,dragId:r,xType:o}=e;A(t.dataTransfer,{effectAllowed:"move",dropEffect:"move"}).setData("text",JSON.stringify({dragId:r,xType:o}))},w=(e,t)=>(r,o)=>{((e,t)=>{D=e.currentTarget,S=t,j=b(e).getPropertyValue(h)})(o,e),N({event:o,dragId:t(r),xType:e[0]})},O=(e,t)=>r=>{r.preventDefault(),((e,t,r)=>{const o=b(e);_=o.getPropertyValue(P),o.setProperty(P,L(t,r))})(r,e,t)},R=e=>{e.preventDefault()},M=e=>{e.preventDefault(),(e=>{const t=b(e);t.removeProperty(P),t.setProperty(P,_)})(e)},G=(e,t,r,o,n,a,i)=>a?{draggable:!0,onDragStart:(0,v.Jr)(e,i),onDrop:(0,v.Jr)(t,i),onDragEnter:r,onDragOver:o,onDragLeave:n}:void 0,U=e=>{let{caption:t}=e;return t+";"},B=w([E.GROUP],U),J=O(E.GROUP,E.C_GROUP_ENTER),K=(0,v.Jr)(G,B,((e,t)=>{k(t);const{xType:r,dragId:o}=f(t),n=U(e);if(r===E.GROUP){if(o===n)return;t.preventDefault(),(0,i.Gw)({dragId:o,dropId:n})}else r===E.LIST&&(t.preventDefault(),(0,i.DX)({dragId:o,dropId:n}))}),J,R,M);var V=r(7144),H=r(9073);const F=e=>{let{groupCaption:t,caption:r}=e;return t+";"+r+";"},W=w([E.LIST,E.GROUP],F),X=O(E.LIST,E.C_LIST_ENTER),Z=(0,v.Jr)(G,W,((e,t)=>{k(t);const{xType:r,dragId:o}=f(t),n=F(e);if(r===E.LIST){if(o===n)return;t.preventDefault(),(0,i.DX)({dragId:o,dropId:n})}else r===E.ITEM&&(t.preventDefault(),(0,i.yN)({dragId:o,dropId:n}))}),X,R,M),q=e=>{let{groupCaption:t,listCaption:r,caption:o}=e;return t+";"+r+";"+o},z=w([E.ITEM,E.LIST],q),Q=O(E.ITEM,E.C_LIST_ENTER),Y=(0,v.Jr)(G,z,((e,t)=>{k(t);const{xType:r,dragId:o}=f(t),n=q(e);if(r===E.ITEM){if(o===n)return;t.preventDefault(),(0,i.yN)({dragId:o,dropId:n})}}),Q,R,M);var $=r(6736),ee=r(9355),te=r(6204);const re={position:"relative",padding:"5px 40px 5px 0"},oe={width:"100%",maxWidth:250,height:28,verticalAlign:"middle"},ne={top:8},ae="Not Found",ie=e=>{let{item:t,className:r,onClick:o,onClose:n,isDraggable:a,dndHandlers:i,option:s}=e;const{caption:l=ae}=t||{},p=a?(0,x.jsx)(ee.P,{style:ne,onClick:(0,v.Jr)(n,s)}):null,d=(0,v.hb)((()=>o(t)),[t]),c=(0,v.hb)((e=>{(0,$.P0)(e)&&d()}),[d]);return(0,x.jsxs)("div",{role:"menuitem",tabIndex:"0",className:r,style:re,onClick:d,onKeyUp:c,...i,children:[(0,x.jsx)(te.A,{style:oe,text:l}),p]})},se=Array.isArray,le=e=>{let{isModeEdit:t,items:r,groupCaption:n,listCaption:a}=e;return se(r)?r.map((e=>{const{caption:r}=e,i={groupCaption:n,listCaption:a,caption:r};return(0,x.jsx)(ie,{className:o.eA,item:e,isDraggable:t,option:i,dndHandlers:Y(t,i),onClick:c,onClose:u},r)})):null},pe=e=>{let{isModeEdit:t,groupCaption:r,lists:n}=e;return(0,v.lZ)(n,(e=>{let{caption:n,items:a}=e;return(0,x.jsx)(V.A,{role:"menuitem",style:o.Ke,openColor:H.ui,caption:n,dndHandlers:Z(t,{groupCaption:r,caption:n}),children:(0,x.jsx)(le,{isModeEdit:t,items:a,groupCaption:r,listCaption:n})},n)}))},de=e=>{let{isModeEdit:t,groups:r}=e;return(0,v.lZ)(r,(e=>{let{caption:r,lists:o}=e;return(0,x.jsx)(V.A,{role:"menuitem",caption:r,dndHandlers:K(t,{caption:r}),children:(0,x.jsx)(pe,{isModeEdit:t,groupCaption:r,lists:o})},r)}))},ce=(0,o.nV)("scroll-watch"),ue={position:"relative",top:-6,marginLeft:20},ge=e=>{const{caption:t,useWatchList:r}=e,[o,s]=(0,n.A)(),[l,c,u]=(0,a.A)(e),C=r(),{groups:I}=C||{},T=o?"V":"E";return(0,x.jsxs)(g.A.Browser,{isShow:l,onKeyDown:u,children:[(0,x.jsxs)(g.A.BrowserCaption,{caption:t,onClose:c,children:[(0,x.jsx)(g.A.ButtonCircle,{caption:"S",title:"Save to LocalStorage",style:ue,onClick:i.vk}),(0,x.jsx)(g.A.ButtonCircle,{caption:T,title:"Toggle Edit Mode: E/V",style:ue,onClick:s})]}),(0,x.jsx)(m,{isShow:o,onClickGroup:p,onClickList:d}),(0,x.jsx)(g.A.ScrollPane,{className:ce,children:(0,x.jsx)(de,{isModeEdit:o,groups:I})})]})}}}]);