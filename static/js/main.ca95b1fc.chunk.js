(this.webpackJsonpbitter=this.webpackJsonpbitter||[]).push([[0],{39:function(e,t,n){},47:function(e,t,n){},48:function(e,t,n){},53:function(e,t,n){},54:function(e,t,n){},55:function(e,t,n){},56:function(e,t,n){},57:function(e,t,n){},58:function(e,t,n){},59:function(e,t,n){},60:function(e,t,n){},61:function(e,t,n){},62:function(e,t,n){},63:function(e,t,n){},64:function(e,t,n){},65:function(e,t,n){},66:function(e,t,n){"use strict";n.r(t);var s=n(1),c=n.n(s),a=n(30),r=n.n(a),i=(n(39),n(2)),o=n(6),l=n(7),u=n(0),j=function(){return document.title="Admin / Bitter",Object(u.jsx)("div",{children:"Admin page"})},d=n(3),b=n.n(d),O=n(9),h=n(31),f=n(4),p=n(14),m=new p.d({UserPoolId:"eu-west-2_QLAkrTR47",ClientId:"4m544sn8a7kf2023cq5qs4polc"}),x=Object(s.createContext)(void 0),g=function(e){var t=e.isLoggedIn,n=e.setIsLoggedIn,c=e.myHandle,a=e.setMyHandle,r=e.children,o="https://7z39hjjfg1.execute-api.eu-west-2.amazonaws.com/dev",l=Object(s.useState)(""),j=Object(i.a)(l,2),d=j[0],g=j[1],v=Object(s.useState)(""),w=Object(i.a)(v,2),N=w[0],y=w[1],S=Object(s.useState)(!1),k=Object(i.a)(S,2),C=k[0],F=k[1],I=Object(s.useState)(!0),P=Object(i.a)(I,2),L=P[0],E=P[1];Object(s.useEffect)((function(){H().then((function(e){n(!0),g(e.sub),a(e.user.username)})).catch((function(e){g("")}))}),[]);var H=function(){var e=Object(f.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e,t){var n=m.getCurrentUser();n?n.getSession(function(){var s=Object(f.a)(b.a.mark((function s(c,a){var r,i;return b.a.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:if(!c){s.next=4;break}t(),s.next=10;break;case 4:if(!a){s.next=10;break}return s.next=7,new Promise((function(e,t){n.getUserAttributes((function(n,s){if(n)t(n);else if(s){var c,a={},r=Object(h.a)(s);try{for(r.s();!(c=r.n()).done;){var i=c.value,o=i.Name,l=i.Value;a[o]=l}}catch(n){r.e(n)}finally{r.f()}e(a)}}))}));case 7:r=s.sent,i=a.getIdToken().getJwtToken(),e(Object(O.a)(Object(O.a)({user:n,headers:{Authorization:i,"x-api-key":r["custom:apikey"]}},a),r));case 10:case"end":return s.stop()}}),s)})));return function(e,t){return s.apply(this,arguments)}}()):t("Not logged in")}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),A=function(){var e=Object(f.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:H().then(function(){var e=Object(f.a)(b.a.mark((function e(n){var s;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s=n.headers,fetch("".concat(o,"/users/follow?handle=").concat(t),{headers:s,method:"POST"}).then((function(e){return e.text()})).then((function(e){return console.log(e)})).catch((function(e){return console.error("Follow error:",e)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),U=function(){var e=Object(f.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:H().then(function(){var e=Object(f.a)(b.a.mark((function e(n){var s;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s=n.headers,fetch("".concat(o,"/users/unfollow?handle=").concat(t),{headers:s,method:"POST"}).then((function(e){return e.text()})).then((function(e){return console.log(e)})).catch((function(e){return console.error("Unfollow error:",e)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),D=function(){var e=Object(f.a)(b.a.mark((function e(t,n){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e,s){var c=new p.b({Username:t,Pool:m}),a=new p.a({Username:t,Password:n});c.authenticateUser(a,{onSuccess:function(t){console.log("onSuccess:",t),e(t)},onFailure:function(e){console.error("onFailure:",e),s(e)},newPasswordRequired:function(t){console.log("newPasswordRequired:",t),e(t)}})}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),M=function(){var e=Object(f.a)(b.a.mark((function e(t){var n,s;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(o,"/users/exists?email=").concat(t));case 2:return n=e.sent,e.next=5,n.json();case 5:return s=e.sent,console.log(s),e.abrupt("return",s);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(u.jsx)(x.Provider,{value:{authenticate:D,getSession:H,logout:function(){var e=m.getCurrentUser();e&&(e.signOut(),g(""),a(""),n(!1))},isLoggedIn:t,setIsLoggedIn:n,currHandle:N,setCurrHandle:y,API_URL:o,isFollowing:C,setIsFollowing:F,myId:d,setMyId:g,myHandle:c,setMyHandle:a,createFollowEdge:A,deleteFollowEdge:U,isEmailUsed:M,refreshList:L,setRefreshList:E},children:r})},v=(n(47),n(32)),w=(n(48),function(e){var t=e.title,n=e.logo,s=e.link;return Object(u.jsx)("div",{className:"option",children:Object(u.jsxs)(o.b,{to:s,children:[Object(u.jsx)("div",{className:"option-logo-box",children:Object(u.jsx)("img",{src:n,alt:"logo",className:"option-logo"})}),Object(u.jsx)("div",{className:"option-title",children:t})]})})}),N=function(){var e=Object(s.useContext)(x).myHandle;return Object(u.jsxs)("div",{className:"options-userbox",children:["Logged in as: ",Object(u.jsxs)(o.b,{to:"/u/".concat(e),children:["@",e]})]})},y=n.p+"static/media/home.671555e9.svg",S=n.p+"static/media/user.279444fa.svg",k=n.p+"static/media/settings.949b2aef.svg",C=n.p+"static/media/login.58b554af.svg",F=n.p+"static/media/register.2c6615d2.svg",I=function(){var e=Object(s.useContext)(x).isLoggedIn,t=function e(t,n,s){Object(v.a)(this,e),this.title=void 0,this.link=void 0,this.logo=void 0,this.title=t,this.link=n,this.logo=s},n=new t("Home","/home",y),c=new t("My Page","/me",S),a=new t("Settings","/settings",k),r=new t("Login","/login",C),i=new t("Register","/register",F);return Object(u.jsxs)("div",{className:"options-box",children:[Object(u.jsx)(w,Object(O.a)({},n)),e?Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(w,Object(O.a)({},c)),Object(u.jsx)(w,Object(O.a)({},a)),Object(u.jsx)("hr",{}),Object(u.jsx)(N,{})]}):Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(w,Object(O.a)({},r)),Object(u.jsx)(w,Object(O.a)({},i))]})]})},P=(n(53),function(){return Object(u.jsx)("div",{className:"app-title-box",children:Object(u.jsx)(o.b,{to:"/home",children:Object(u.jsx)("div",{className:"app-title",children:"Bitter"})})})}),L=function(){return Object(u.jsxs)("div",{id:"left-col",className:"main-col",children:[Object(u.jsx)(P,{}),Object(u.jsx)(I,{})]})},E=(n(54),function(){var e=Object(s.useState)(""),t=Object(i.a)(e,2),n=t[0],c=t[1],a=Object(s.useState)([!1,"50%"]),r=Object(i.a)(a,2),o=r[0],j=r[1],d=Object(l.g)(),O=function(){var e=Object(f.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),d.push("/u/".concat(n)),c("");case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(u.jsxs)("form",{children:[Object(u.jsxs)("span",{className:"textbox",children:["@",Object(u.jsx)("input",{type:"text",name:"url",id:"find-user-input-field",value:n,placeholder:"handle",onChange:function(e){var t=e.target.value;c(t),0===t.length?j([!1,"50%"]):j([!0,"100%"])}})]}),Object(u.jsx)("button",{type:"submit",className:"button-primary",onClick:O,disabled:!o[0],style:{opacity:o[1]},children:"Search"})]})}),H=function(){return Object(u.jsxs)("div",{className:"find-user",children:[Object(u.jsx)("div",{className:"find-user-title",children:"Go to user's page:"}),Object(u.jsx)(E,{})]})},A=(n(55),function(e){var t=e.setIsFollowingSuggested,n=e.handle,c=Object(s.useContext)(x),a=c.currHandle,r=c.setIsFollowing,i=c.createFollowEdge,o=c.isLoggedIn,l=function(){var e=Object(f.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o?(t(!0),n===a&&r(!0),i(n)):console.log("Not logged in!");case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(u.jsx)("button",{className:"button",onClick:l,children:"Follow"})}),U=function(e){var t=e.setIsFollowingSuggested,n=e.handle,c=Object(s.useContext)(x),a=c.myHandle,r=c.currHandle,i=c.setIsFollowing,o=c.deleteFollowEdge,l=function(){var e=Object(f.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a!==n){e.next=3;break}return console.log("Can't unfollow yourself!"),e.abrupt("return");case 3:t(!1),n===r&&i(!1),o(n);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(u.jsx)("button",{className:"button-primary",onClick:l,children:"Following"})},D=function(e){var t=Object(s.useState)(!1),n=Object(i.a)(t,2),c=n[0],a=n[1],r=e.handle,o=e.className,l=Object(s.useContext)(x),j=l.currHandle,d=(l.myHandle,l.isFollowing);return Object(s.useEffect)((function(){e.isFollowing&&a(e.isFollowing)}),[e.isFollowing]),Object(s.useEffect)((function(){r===j&&a(d)}),[d]),Object(u.jsx)("div",{className:o,children:c?Object(u.jsx)(U,{handle:r,setIsFollowingSuggested:a}):Object(u.jsx)(A,{handle:r,setIsFollowingSuggested:a})})},M=function(e){return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("hr",{className:"solid"}),Object(u.jsxs)("div",{className:"user-suggestion",children:[Object(u.jsxs)(o.b,{to:"/u/"+e.handle,children:[Object(u.jsx)("div",{className:"user-suggestion-pfp",children:Object(u.jsx)("img",{src:"https://via.placeholder.com/48",alt:"profile pic"})}),Object(u.jsxs)("div",{className:"user-suggestion-info",children:[Object(u.jsx)("div",{className:"user-suggestion-displayname",children:e.display_name}),Object(u.jsxs)("div",{className:"user-suggestion-handle",children:["@",e.handle]})]})]}),Object(u.jsx)(D,{className:"user-suggestion-follow",handle:e.handle,isFollowing:e.isFollowing})]})]})},_=function(){var e=Object(s.useState)([]),t=Object(i.a)(e,2),n=t[0],c=t[1],a=Object(s.useState)(!1),r=Object(i.a)(a,2),o=r[0],l=r[1],j=Object(s.useContext)(x),d=j.API_URL,h=j.myHandle,p=function(){var e=Object(f.a)(b.a.mark((function e(){var t,n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l(!0),e.next=3,fetch("".concat(d,"/users/suggested?myHandle=").concat(h));case 3:return t=e.sent,e.next=6,t.json();case 6:n=e.sent,c(n),l(!1);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(s.useEffect)((function(){p()}),[h]),Object(u.jsxs)("div",{className:"user-suggestions",children:[Object(u.jsx)("div",{className:"user-suggestions-title",children:"Suggested users"}),o?Object(u.jsx)("div",{className:"user-suggestions-loader",children:Object(u.jsx)("div",{className:"loader"})}):Object(u.jsxs)(u.Fragment,{children:[n.map((function(e){return Object(s.createElement)(M,Object(O.a)(Object(O.a)({},e),{},{key:e.handle}))})),Object(u.jsx)("div",{className:"user-suggestions-reroller",children:Object(u.jsx)("button",{onClick:p,children:" Reroll "})})]})]})},R=function(){return Object(u.jsxs)("div",{id:"right-col",className:"main-col",children:[Object(u.jsx)(H,{}),Object(u.jsx)(_,{})]})},J=function(){return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("div",{className:"nopage-code",children:"404"}),Object(u.jsx)("div",{className:"nopage-msg",children:"Page not found"})]})},T=n(34),B=function(){var e=Object(s.useContext)(x),t=e.API_URL,n=e.getSession,c=e.setRefreshList,a=e.refreshList,r=Object(s.useState)(""),o=Object(i.a)(r,2),l=o[0],j=o[1],d=Object(s.useState)(140),O=Object(i.a)(d,2),h=O[0],p=O[1],m=Object(s.useState)("black"),g=Object(i.a)(m,2),v=g[0],w=g[1],N=Object(s.useState)([!1,"50%"]),y=Object(i.a)(N,2),S=y[0],k=y[1],C=Object(s.useState)(!1),F=Object(i.a)(C,2),I=F[0],P=F[1],L=Object(s.useState)(!1),E=Object(i.a)(L,2),H=E[0],A=E[1],U=function(){k([!0,"100%"])},D=function(){k([!1,"50%"])};Object(s.useEffect)((function(){p(140-l.length),l.length>140?(D(),w("red")):l.length>110?(U(),w("orange")):0===l.length?(D(),w("black")):(U(),w("black"))}),[l]);var M=function(){var e=Object(f.a)(b.a.mark((function e(s){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s.preventDefault(),n().then(function(){var e=Object(f.a)(b.a.mark((function e(n){var s,r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s=n.headers,!(h<0||h>=140)){e.next=4;break}return console.error("Invalid post length."),e.abrupt("return");case 4:return A(!0),(new FormData).append("content",l),s["Content-Type"]="application/json",r={headers:s,method:"POST",body:JSON.stringify({content:l})},e.next=11,fetch("".concat(t,"/bits/post"),r).then((function(e){return e.text()})).then((function(e){"postSuccess"===JSON.parse(e).code?j(""):P(!0)})).catch((function(e){console.log("Error:",e),P(!0)})).finally((function(){A(!1),c(!a)}));case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(u.jsx)("div",{className:"postbox-input",children:H?Object(u.jsx)("div",{id:"postbox-loader-wrapper",children:Object(u.jsx)("div",{className:"loader"})}):Object(u.jsxs)("form",{children:[Object(u.jsx)(T.a,{className:"bit-content",id:"postbox-input-field",placeholder:"Post a bit!",value:l,onChange:function(e){var t=e.target.value;j(t)}}),Object(u.jsx)("button",{type:"submit",className:"button-primary",onClick:M,disabled:!S[0],style:{opacity:S[1]},children:"Post"}),Object(u.jsxs)("div",{id:"postbox-charcount",style:{color:v},children:["Remaining characters: ",h]}),I?Object(u.jsx)("div",{id:"postbox-error",children:"An error occurred."}):""]})})},z=(n(56),function(){var e=Object(s.useContext)(x).isLoggedIn;return Object(u.jsx)("div",{className:"postbox",children:e?Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("div",{className:"postbox-pfp",children:Object(u.jsx)("img",{src:"https://via.placeholder.com/48",alt:"profile pic"})}),Object(u.jsx)(B,{})]}):Object(u.jsxs)("div",{id:"postbox-login",children:[Object(u.jsx)(o.b,{to:"/login",children:"Login"})," or ",Object(u.jsx)(o.b,{to:"/register",children:"register"})," ","to post bits"]})})}),Y=n.p+"static/media/reply.34834fc8.svg",q=n.p+"static/media/rebit.e12d3005.svg",V=n.p+"static/media/like.231952c6.svg",G=n.p+"static/media/dislike.4c5bf648.svg",Q=function(e){return Object(u.jsxs)("div",{className:"bit-buttons",children:[Object(u.jsx)("input",{type:"image",src:Y,alt:"reply button",onClick:function(){console.log("reply to tweet ".concat(e.post_id)),console.log(JSON.stringify(e))}}),Object(u.jsx)("input",{type:"image",src:q,alt:"rebit button",onClick:function(){console.log("rebit tweet ".concat(e.post_id))}}),Object(u.jsx)("input",{type:"image",src:V,alt:"like button",onClick:function(){console.log("like tweet ".concat(e.post_id))}}),Object(u.jsx)("input",{type:"image",src:G,alt:"dislike button",onClick:function(){console.log("dislike tweet ".concat(e.post_id))}})]})};var K=function(e){var t=function(e){var t=Date.now()-e.getTime(),n=Math.floor(t/1e3),s=Math.floor((n%=31536e3)/86400);if(s){if(s>30){var c=String(e.getDate());return["Jan ","Feb ","Mar ","Apr ","May ","Jun ","Jul ","Aug ","Sep ","Oct ","Nov ","Dec "][e.getMonth()]+c+(e.getFullYear()===(new Date).getFullYear()?"":", bitTime.getFullYear()")}return s+"d"}var a=Math.floor((n%=86400)/3600);if(a)return a+"h";var r=Math.floor((n%=3600)/60);if(r)return r+"m";var i=n%60;return i?i+"s":"less than a second"}(new Date(e.post_time));return Object(u.jsxs)("div",{className:"bit",children:[Object(u.jsx)(o.b,{to:"/u/".concat(e.handle),children:Object(u.jsx)("div",{className:"bit-pfp",children:Object(u.jsx)("img",{src:"https://via.placeholder.com/48",alt:"profile pic"})})}),Object(u.jsxs)("div",{className:"bit-content",children:[Object(u.jsxs)("div",{className:"bit-info",children:[Object(u.jsxs)(o.b,{to:"/u/".concat(e.handle),children:[Object(u.jsx)("span",{className:"bit-info-displayname",children:e.display_name}),Object(u.jsxs)("span",{className:"bit-info-handle",children:["@",e.handle]})]}),"\u30fb",Object(u.jsx)(o.b,{to:"/t/".concat(e.post_id),children:Object(u.jsx)("span",{className:"bit-info-time",children:t})})]}),Object(u.jsxs)("div",{className:"bit-text",children:[" ",e.content," "]}),Object(u.jsx)(Q,Object(O.a)({},e))]})]})},W=(n(57),function(e){var t=e.bits,n=e.isLoading;return Object(u.jsx)(u.Fragment,{children:n?Object(u.jsx)("div",{className:"bitlist-loader",children:Object(u.jsx)("div",{className:"loader"})}):t.length>0?t.map((function(e,t){return Object(s.createElement)(K,Object(O.a)(Object(O.a)({},e),{},{key:e.post_id,index:t}))})):Object(u.jsx)("div",{className:"no-bits",children:"No bits found"})})}),X=function(){var e=Object(s.useState)([]),t=Object(i.a)(e,2),n=t[0],c=t[1],a=Object(s.useState)(!1),r=Object(i.a)(a,2),o=r[0],l=r[1],j=Object(s.useState)(0),d=Object(i.a)(j,2),O=d[0],h=d[1],p=Object(s.useContext)(x),m=p.API_URL,g=p.myHandle,v=p.refreshList;Object(s.useEffect)((function(){w()}),[g,v]);var w=function(){var e=Object(f.a)(b.a.mark((function e(){var t,n,s;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return h(O+1),t=O,l(!0),c([]),console.log("Fetching bits..."),e.next=7,fetch("".concat(m,"/bits/timeline?handle=").concat(g));case 7:return n=e.sent,e.next=10,n.json();case 10:s=e.sent,t===O&&(c(s),l(!1));case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(u.jsx)(W,{bits:n,isLoading:o})},Z=(n(58),function(){return document.title="Home / Bitter",Object(u.jsxs)("div",{className:"timeline",children:[Object(u.jsx)(z,{}),Object(u.jsx)(X,{})]})}),$=(n(59),function(e){e.handle;return Object(u.jsx)("div",{className:"user-banner",children:Object(u.jsx)("img",{src:"https://via.placeholder.com/600x".concat(150,"?text=Banner"),alt:"profile banner"})})}),ee=function(e){e.handle;return Object(u.jsx)("div",{className:"user-photo",children:Object(u.jsx)("img",{src:"https://via.placeholder.com/".concat(140,"x").concat(140,"/000000/FFFFFF/?text=Profile+picture"),alt:"profile pic"})})},te=function(e){var t=e.handle,n=Object(s.useContext)(x),c=n.setIsFollowing,a=n.createFollowEdge,r=n.isLoggedIn,i=function(){var e=Object(f.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r?(c(!0),a(t)):console.log("Not logged in");case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(u.jsx)("button",{className:"button",onClick:i,children:"Follow"})},ne=function(e){var t=e.handle,n=Object(s.useContext)(x),c=n.myHandle,a=n.setIsFollowing,r=n.deleteFollowEdge,i=function(){var e=Object(f.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(c!==t){e.next=3;break}return console.log("Can't unfollow yourself!"),e.abrupt("return");case 3:a(!1),r(t);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(u.jsx)("button",{className:"button-primary",onClick:i,children:"Following"})},se=function(){return Object(u.jsx)("button",{className:"button-primary",onClick:function(){return console.log("You can't unfollow yourself!")},children:"Following"})},ce=function(e){var t=e.handle,n=Object(s.useContext)(x),c=n.myHandle,a=n.isFollowing;n.setIsFollowing;return Object(u.jsx)("div",{className:"user-follow-button",children:c===t?Object(u.jsx)(se,{}):a?Object(u.jsx)(ne,{handle:t}):Object(u.jsx)(te,{handle:t})})},ae=function(e){e.updatePageState;var t=e.user,n=["Jan ","Feb ","Mar ","Apr ","May ","Jun ","Jul ","Aug ","Sep ","Oct ","Nov ","Dec "];return Object(u.jsxs)("div",{className:"user-info",children:[Object(u.jsx)("div",{className:"user-displayname",onClick:function(){console.log("yo",t)},children:t.display_name}),Object(u.jsx)("div",{id:"user-joindate",children:function(e){if(!e)return"";var t=new Date(e),s=t.getMonth(),c=t.getFullYear();return"Joined: "+n[s]+" "+c}(t.created_on)}),Object(u.jsx)("div",{className:"user-handle",children:t.handle}),Object(u.jsx)("div",{className:"user-bio",children:t.bio}),Object(u.jsxs)("div",{className:"user-tabs",children:[Object(u.jsxs)("div",{className:"user-tab-bits user-current-tab",children:[Object(u.jsx)("b",{children:"5"})," Bits"]}),Object(u.jsxs)("div",{className:"user-tab-replies ",children:[Object(u.jsx)("b",{children:"7"})," Bits and replies"]}),Object(u.jsxs)("div",{className:"user-following",children:[Object(u.jsx)("b",{children:t.following_count})," Following"]}),Object(u.jsxs)("div",{className:"user-followers",children:[Object(u.jsx)("b",{children:t.follower_count})," Followers"]}),Object(u.jsxs)("div",{className:"user-likes",children:[Object(u.jsx)("b",{children:"5"})," Likes"]})]})]})},re=function(e){var t=e.updatePageState,n=e.user;return Object(u.jsxs)("div",{className:"user-header",children:[Object(u.jsx)($,{handle:n.handle}),Object(u.jsxs)("div",{className:"user-pfp-follow",children:[Object(u.jsx)(ee,{handle:n.handle}),Object(u.jsx)(ce,{handle:n.handle})]}),Object(u.jsx)(ae,{updatePageState:t,user:n})]})},ie=(n(60),function(e){e.replies;var t=Object(s.useState)([]),n=Object(i.a)(t,2),c=n[0],a=n[1],r=Object(s.useState)(!1),o=Object(i.a)(r,2),l=o[0],j=o[1],d=Object(s.useContext)(x),O=d.API_URL,h=d.currHandle;Object(s.useEffect)((function(){p()}),[h]);var p=function(){var e=Object(f.a)(b.a.mark((function e(){var t,n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return j(!0),e.next=3,fetch("".concat(O,"/users/posts?handle=").concat(h));case 3:return t=e.sent,e.next=6,t.json();case 6:n=e.sent,a(n),j(!1);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(u.jsx)(W,{bits:c,isLoading:l})}),oe=(n(61),function(e){var t=e.handle;return Object(u.jsxs)("div",{className:"user-not-found",children:["User ",Object(u.jsxs)("span",{className:"user-not-found-handle",children:["@",t]})," could not be found."]})}),le=(n(62),function(){var e=Object(s.useState)({handle:""}),t=Object(i.a)(e,2),n=t[0],c=t[1],a=Object(s.useState)(!1),r=Object(i.a)(a,2),o=r[0],j=r[1],d=Object(s.useState)(Object(u.jsx)(ie,{replies:!1})),O=Object(i.a)(d,2),h=O[0],p=O[1];document.title=(n.handle?"@"+n.handle:"user")+" / Bitter";var m=Object(s.useContext)(x),g=m.API_URL,v=m.currHandle,w=m.setCurrHandle,N=m.myHandle,y=m.setIsFollowing,S=Object(l.h)().pathname.slice(3),k=function(){var e=Object(f.a)(b.a.mark((function e(t){var n,s;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return j(!0),e.next=3,fetch("".concat(g,"/users/data?handle=").concat(t,"&myHandle=").concat(N));case 3:return n=e.sent,e.next=6,n.json();case 6:s=e.sent,c(s),w(s.handle),s.isFollowing&&y(s.isFollowing),j(!1);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();Object(s.useEffect)((function(){k(S)}),[N]);var C=Object(l.g)();return Object(s.useEffect)((function(){return C.listen((function(e){k(e.pathname.slice(3))}))}),[]),Object(u.jsx)(u.Fragment,{children:o?Object(u.jsx)("div",{className:"user-loader",children:Object(u.jsx)("div",{className:"loader"})}):Object(u.jsx)("div",{className:"user-page",children:""!==v?Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(re,{updatePageState:function(e){0===e?p(Object(u.jsx)(ie,{replies:!1})):1===e&&p(Object(u.jsx)(ie,{replies:!0}))},user:n}),h]}):Object(u.jsx)(oe,{handle:S})})})}),ue=(n(63),function(){var e=Object(s.useState)(""),t=Object(i.a)(e,2),n=t[0],c=t[1],a=Object(s.useState)(""),r=Object(i.a)(a,2),o=r[0],l=r[1],j=Object(s.useState)(!1),d=Object(i.a)(j,2),O=d[0],h=d[1],m=Object(s.useState)(!0),g=Object(i.a)(m,2),v=g[0],w=g[1],N=Object(s.useState)(!1),y=Object(i.a)(N,2),S=y[0],k=y[1],C=Object(s.useContext)(x),F=C.authenticate,I=C.getSession,P=C.isEmailUsed,L=function(){var e=Object(f.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,P(n);case 3:if(!e.sent){e.next=6;break}return h(!0),e.abrupt("return");case 6:I().then((function(e){var t=e.user;F(t.username,o).then((function(){var e=[new p.c({Name:"email",Value:n})];t.updateAttributes(e,(function(e,t){e?console.error(e):k(!0),console.log(t)}))})).catch((function(e){switch(e.code){case"NotAuthorizedException":w(!1)}}))})).catch((function(e){return console.error(e)}));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(u.jsxs)("div",{className:"settings-field",children:[Object(u.jsx)("div",{className:"settings-header",children:"Change email"}),Object(u.jsxs)("form",{onSubmit:L,children:[Object(u.jsxs)("div",{className:"settings-input-field",children:[Object(u.jsx)("div",{className:"settings-input-label",children:"New email:"}),Object(u.jsxs)("div",{className:"settings-input-wrapper",children:[Object(u.jsx)("input",{value:n,onChange:function(e){h(!1),c(e.target.value)},type:"email",className:O?"invalid":""}),O?Object(u.jsx)("div",{className:"form-error-message",children:"An account with this email already exists"}):""]})]}),Object(u.jsxs)("div",{className:"settings-input-field",children:[Object(u.jsx)("div",{className:"settings-input-label",children:"Password:"}),Object(u.jsxs)("div",{className:"settings-input-wrapper",children:[Object(u.jsx)("input",{value:o,onChange:function(e){w(!0),l(e.target.value)},type:"password",className:v?"":"invalid"}),v?"":Object(u.jsx)("div",{className:"form-error-message",children:"Incorrect password"})]})]}),Object(u.jsx)("button",{type:"submit",children:"Submit"})]}),S?Object(u.jsx)("div",{className:"form-success-message",children:"Success! Please check your email to verify the new address"}):"",Object(u.jsx)("hr",{})]})}),je=function(){var e=Object(s.useState)(""),t=Object(i.a)(e,2),n=t[0],c=t[1],a=Object(s.useState)(""),r=Object(i.a)(a,2),o=r[0],l=r[1],j=Object(s.useState)(""),d=Object(i.a)(j,2),b=d[0],O=d[1];return Object(u.jsxs)("div",{className:"settings-field",children:[Object(u.jsx)("div",{className:"settings-header",children:"Current password:"}),Object(u.jsxs)("form",{onSubmit:function(e){e.preventDefault(),console.log("change password")},children:[Object(u.jsxs)("div",{className:"settings-input-field",children:[Object(u.jsx)("div",{className:"settings-input-label",children:"Password:"}),Object(u.jsx)("div",{className:"settings-input-wrapper",children:Object(u.jsx)("input",{value:n,onChange:function(e){return c(e.target.value)},type:"password"})})]}),Object(u.jsxs)("div",{className:"settings-input-field",children:[Object(u.jsx)("div",{className:"settings-input-label",children:"New password:"}),Object(u.jsx)("div",{className:"settings-input-wrapper",children:Object(u.jsx)("input",{value:o,onChange:function(e){return l(e.target.value)},type:"password"})})]}),Object(u.jsxs)("div",{className:"settings-input-field",children:[Object(u.jsx)("div",{className:"settings-input-label",children:"Confirm password:"}),Object(u.jsx)("div",{className:"settings-input-wrapper",children:Object(u.jsx)("input",{value:b,onChange:function(e){return O(e.target.value)},type:"password"})})]}),Object(u.jsx)("button",{type:"submit",children:"Submit"})]}),Object(u.jsx)("hr",{})]})},de=function(){var e=Object(s.useContext)(x).logout;return Object(u.jsx)("div",{id:"logout-button",children:Object(u.jsx)("button",{className:"button-primary",onClick:function(t){t.preventDefault(),e()},children:"Logout"})})},be=function(){return Object(u.jsx)("div",{id:"delete-account-button",children:Object(u.jsx)("button",{onClick:function(e){e.preventDefault(),console.log("delete account")},className:"button-primary",children:"Delete account"})})},Oe=function(){return document.title="Settings / Bitter",Object(u.jsxs)("div",{className:"settings",children:[Object(u.jsx)("div",{className:"settings-title",children:"Settings"}),Object(u.jsx)(ue,{}),Object(u.jsx)(je,{}),Object(u.jsx)(de,{}),Object(u.jsx)(be,{})]})},he=(n(64),function(e){var t=e.setMyHandle;document.title="Login / Bitter";var n=Object(s.useState)(""),c=Object(i.a)(n,2),a=c[0],r=c[1],l=Object(s.useState)(""),j=Object(i.a)(l,2),d=j[0],b=j[1],O=Object(s.useState)(!1),h=Object(i.a)(O,2),f=h[0],p=h[1],m=Object(s.useState)(!1),g=Object(i.a)(m,2),v=g[0],w=g[1],N=Object(s.useContext)(x),y=N.authenticate,S=N.setIsLoggedIn,k=N.setMyId;return Object(u.jsxs)("div",{className:"login",children:[Object(u.jsx)("div",{className:"login-title",children:"Login"}),Object(u.jsxs)("form",{onSubmit:function(e){e.preventDefault(),y(a,d).then((function(e){console.log("Logged in!"),k(e.getIdToken().payload.sub),t(e.getIdToken().payload["cognito:username"]),S(!0)})).catch((function(e){switch(e.code){case"UserNotConfirmedException":console.error("Email not verified"),p(!0);break;case"NotAuthorizedException":console.error("Incorrect username or password"),w(!0);break;default:console.error("Failed to login!",e)}}))},children:[Object(u.jsxs)("div",{className:"login-input-field",children:[Object(u.jsx)("div",{className:"login-input-label",children:"Email / Handle:"}),Object(u.jsx)("input",{value:a,onChange:function(e){p(!1),w(!1),r(e.target.value)},type:"text",className:f||v?"invalid":""}),f?Object(u.jsx)("div",{className:"form-error-message",children:"You need to verify your email before logging in"}):""]}),Object(u.jsxs)("div",{className:"login-input-field",children:[Object(u.jsx)("div",{className:"login-input-label",children:"Password:"}),Object(u.jsx)("input",{value:d,onChange:function(e){w(!1),b(e.target.value)},type:"password",className:v?"invalid":""}),v?Object(u.jsx)("div",{className:"form-error-message",children:"Incorrect username or password"}):""]}),Object(u.jsx)("button",{type:"submit",children:"Submit"}),Object(u.jsx)("div",{id:"login-register-link",children:Object(u.jsx)(o.b,{to:"/register",children:"Create an account"})})]})]})}),fe=(n(65),function(){document.title="Register / Bitter";var e=Object(s.useState)(""),t=Object(i.a)(e,2),n=t[0],c=t[1],a=Object(s.useState)(""),r=Object(i.a)(a,2),l=r[0],j=r[1],d=Object(s.useState)(""),O=Object(i.a)(d,2),h=O[0],g=O[1],v=Object(s.useState)(""),w=Object(i.a)(v,2),N=w[0],y=w[1],S=Object(s.useState)(!1),k=Object(i.a)(S,2),C=k[0],F=k[1],I=Object(s.useState)(!1),P=Object(i.a)(I,2),L=P[0],E=P[1],H=Object(s.useState)(!1),A=Object(i.a)(H,2),U=A[0],D=A[1],M=Object(s.useState)(!1),_=Object(i.a)(M,2),R=_[0],J=_[1],T=Object(s.useState)(!1),B=Object(i.a)(T,2),z=B[0],Y=B[1],q=Object(s.useState)(!1),V=Object(i.a)(q,2),G=V[0],Q=V[1],K=Object(s.useState)(!0),W=Object(i.a)(K,2),X=W[0],Z=W[1],$=Object(s.useState)(!0),ee=Object(i.a)($,2),te=ee[0],ne=ee[1],se=Object(s.useState)(!0),ce=Object(i.a)(se,2),ae=ce[0],re=ce[1],ie=Object(s.useState)(!1),oe=Object(i.a)(ie,2),le=oe[0],ue=oe[1],je=Object(s.useContext)(x).isEmailUsed,de=function(){var e=Object(f.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!be()){e.next=4;break}return console.log("Empty fields!"),e.abrupt("return");case 4:return e.next=6,je(l);case 6:if(!e.sent){e.next=9;break}return Y(!0),e.abrupt("return");case 9:m.signUp(n,h,[new p.c({Name:"email",Value:l})],[],(function(e,t){if(e){var n=e.code;switch(console.log(e),n){case"UsernameExistsException":J(!0);break;case"InvalidPasswordException":re(!1);break;default:console.log("an error occured")}}t&&ue(!0)}));case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),be=function(){var e=!1;return n.length<1?(console.log("no handle!"),F(!0),e=!0):n.length>25?(console.log("handle too long!"),E(!0),e=!0):Oe(n)||(console.log("invalid handle"),Z(!1),e=!0),l.length<1&&(console.log("no email!"),D(!0),e=!0),he(h)||(console.log("invalid password"),re(!1),e=!0),h!==N&&(Q(!0),e=!0),e},Oe=function(e){if(e.length<1)return!1;for(var t=e.split(""),n=0;n<t.length;n++)if(!"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".includes(t[n]))return!1;return!0},he=function(e){if(e.length<8)return!1;var t=e.split(""),n=[!1,!1,!1,!1];return t.forEach((function(e){"abcdefghijklmnopqrstuvwxyz".includes(e)?n[0]=!0:"ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(e)?n[1]=!0:"0123456789".includes(e)?n[2]=!0:"=+-^$*.[]{}()?\"!@#%&/\\,><':;|_~`".includes(e)&&(n[3]=!0)})),n.every((function(e){return e}))};return Object(u.jsxs)("div",{className:"register",children:[Object(u.jsx)("div",{className:"register-title",children:"Register"}),Object(u.jsxs)("form",{onSubmit:de,children:[Object(u.jsxs)("div",{className:"register-input-field",children:[Object(u.jsx)("div",{className:"register-input-label ",children:"Handle:"}),Object(u.jsx)("input",{value:n,onChange:function(e){F(!1),E(!1),Z(!0),J(!1),c(e.target.value)},type:"text",className:C||!X||R||L?"invalid":""}),C?Object(u.jsx)("div",{className:"form-error-message",children:"Handle field is empty"}):"",L?Object(u.jsx)("div",{className:"form-error-message",children:"Handle is too long"}):"",X?"":Object(u.jsx)("div",{className:"form-error-message",children:"Invalid handle (no special characters allowed)"}),R?Object(u.jsx)("div",{className:"form-error-message",children:"An account with this handle already exists"}):""]}),Object(u.jsxs)("div",{className:"register-input-field",children:[Object(u.jsx)("div",{className:"register-input-label",children:"Email:"}),Object(u.jsx)("input",{value:l,onChange:function(e){D(!1),Y(!1),ne(!0),j(e.target.value)},type:"email",className:U||z?"invalid":""}),U?Object(u.jsx)("div",{className:"form-error-message",children:"Email field is empty"}):"",z?Object(u.jsx)("div",{className:"form-error-message",children:"An account with this email already exists"}):"",te?"":Object(u.jsx)("div",{className:"form-error-message",children:"Invalid email"})]}),Object(u.jsxs)("div",{className:"register-input-field",children:[Object(u.jsx)("div",{className:"register-input-label",children:"Password:"}),Object(u.jsx)("input",{value:h,onChange:function(e){Q(!1),re(!0),g(e.target.value)},type:"password",className:!ae||G?"invalid":""}),ae?"":Object(u.jsx)("div",{className:"form-error-message",children:"Password must be at least 8 characters long, and contain at least one uppercase, lowercase, number and special character."}),Object(u.jsxs)("div",{className:"register-input-field",children:[Object(u.jsx)("div",{className:"register-input-label",children:"Confirm Password:"}),Object(u.jsx)("input",{value:N,onChange:function(e){Q(!1),y(e.target.value)},type:"password",className:!ae||G?"invalid":""})]}),G&&ae?Object(u.jsx)("div",{className:"form-error-message",children:"! Passwords do not match !"}):""]}),Object(u.jsx)("button",{type:"submit",children:"Submit"}),le?Object(u.jsxs)("div",{style:{fontSize:"16px"},className:"form-success-message",children:["Success! Please verify your email before"," ",Object(u.jsx)(o.b,{style:{color:"#33c3f0",textDecoration:"underline"},to:"/login",children:"logging in"})]}):"",Object(u.jsxs)("div",{id:"register-login-link",children:["Already have an account? ",Object(u.jsx)(o.b,{to:"/login",children:"Login here"})]})]})]})}),pe=function(e){var t=e.Component,n=(e.path,Object(s.useContext)(x).isLoggedIn);return Object(u.jsx)(l.b,{render:function(){return!0===n?Object(u.jsx)(t,{}):Object(u.jsx)(l.a,{to:{pathname:"/login"}})}})},me=function(){var e=Object(s.useState)(!1),t=Object(i.a)(e,2),n=t[0],c=t[1],a=Object(s.useState)(""),r=Object(i.a)(a,2),d=r[0],b=r[1];return Object(u.jsx)(g,{isLoggedIn:n,setIsLoggedIn:c,myHandle:d,setMyHandle:b,children:Object(u.jsx)(o.a,{basename:"/",children:Object(u.jsxs)("div",{className:"App",children:[Object(u.jsx)(L,{}),Object(u.jsx)("div",{id:"mid-col",className:"main-col",children:Object(u.jsxs)(l.d,{children:[Object(u.jsx)(l.b,{path:"/login",render:function(){return!0===n?Object(u.jsx)(l.a,{to:{pathname:"/home"}}):Object(u.jsx)(he,{setMyHandle:b})}}),Object(u.jsx)(l.b,{path:"/register",render:function(){return!0===n?Object(u.jsx)(l.a,{to:{pathname:"/home"}}):Object(u.jsx)(fe,{})}}),Object(u.jsx)(l.b,{path:"/home",exact:!0,render:function(){return Object(u.jsx)(Z,{})}}),Object(u.jsx)(l.b,{path:"/",exact:!0,render:function(){return Object(u.jsx)(l.a,{to:{pathname:"/home"}})}}),Object(u.jsx)(pe,{path:"/admin",Component:j}),Object(u.jsx)(pe,{path:"/settings",Component:Oe}),Object(u.jsx)(l.b,{path:"/me",render:function(){return!0===n?Object(u.jsx)(l.a,{to:{pathname:"/u/".concat(d)}}):Object(u.jsx)(l.a,{to:{pathname:"/login"}})}}),Object(u.jsx)(l.b,{path:"/u/:handle",render:function(){return Object(u.jsx)(le,{})}}),Object(u.jsx)(l.b,{component:J})]})}),Object(u.jsx)(R,{})]})})})},xe=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,67)).then((function(t){var n=t.getCLS,s=t.getFID,c=t.getFCP,a=t.getLCP,r=t.getTTFB;n(e),s(e),c(e),a(e),r(e)}))};r.a.render(Object(u.jsx)(c.a.StrictMode,{children:Object(u.jsx)(me,{})}),document.getElementById("root")),xe()}},[[66,1,2]]]);
//# sourceMappingURL=main.ca95b1fc.chunk.js.map