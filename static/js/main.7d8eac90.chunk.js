(this.webpackJsonpbitter_react=this.webpackJsonpbitter_react||[]).push([[0],{27:function(e,t,n){},29:function(e,t,n){},30:function(e,t,n){},36:function(e,t,n){},38:function(e,t,n){},39:function(e,t,n){},40:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){},43:function(e,t,n){},44:function(e,t,n){},45:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),s=n(19),a=n.n(s),o=(n(27),n(2)),i=n(5),u=n(8),l=n(6),j=n(0),d=function(e){return Object(j.jsx)("div",{children:"Admin page"})},b=(n(29),n(20)),f=(n(30),function(e){var t="option ".concat(0===e.index?"first-option":"");return Object(j.jsx)("div",{className:t,children:Object(j.jsxs)(u.b,{to:e.link,children:[Object(j.jsx)("div",{className:"option-logo-box",children:Object(j.jsx)("img",{src:e.logo,alt:"logo",className:"option-logo"})}),Object(j.jsxs)("div",{className:"option-title",children:[" ",e.title]})]})})}),O=n.p+"static/media/home.671555e9.svg",p=n.p+"static/media/user.279444fa.svg",h=n.p+"static/media/settings.949b2aef.svg",x=function(e){var t=function e(t,n,c){Object(b.a)(this,e),this.title=t,this.link=n,this.logo=c},n=[new t("Home","/home",O),new t("My Page","/u/user",p),new t("Settings","/settings",h)];return Object(j.jsx)("div",{className:"options-box",children:n.map((function(e,t){return Object(j.jsx)(f,Object(o.a)({index:t},e),e.title)}))})},m=(n(36),n(3)),g=n.n(m),v=n(4),w=function(){var e=Object(c.useState)(""),t=Object(i.a)(e,2),n=t[0],r=t[1],s=Object(c.useState)([!1,"50%"]),a=Object(i.a)(s,2),o=a[0],u=a[1],d=Object(l.f)(),b=function(){var e=Object(v.a)(g.a.mark((function e(t){var c;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),function(){return!0}&&(c=f(n),d.push("/u/".concat(c.handle))),r("");case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),f=function(e){return{handle:e}};return Object(j.jsxs)("form",{children:[Object(j.jsxs)("span",{className:"textbox",children:["@",Object(j.jsx)("input",{type:"text",name:"url",id:"find-user-input-field",value:n,placeholder:"handle",onChange:function(e){var t=e.target.value;r(t),0===t.length?u([!1,"50%"]):u([!0,"100%"])}})]}),Object(j.jsx)("button",{type:"submit",className:"button-primary",onClick:b,disabled:!o[0],style:{opacity:o[1]},children:"Search"})]})},y=function(){return Object(j.jsxs)("div",{className:"find-user",children:[Object(j.jsx)("div",{className:"find-user-title",children:"Go to user's page:"}),Object(j.jsx)(w,{})]})},N=(n(38),function(e){var t=function(){var t=Object(v.a)(g.a.mark((function t(){return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.hasOwnProperty("user_id")){t.next=3;break}return console.error("props not loaded yet"),t.abrupt("return");case 3:e.setFollowingSuggested(!0),e.user_id===e.currId&&e.setIsFollowing(!0),fetch("".concat(e.API_URL,"create-follow/post?source_id=").concat(e.myId,"&destination_id=").concat(e.user_id),{method:"POST"}).then((function(e){return e.text()})).then((function(e){return console.log(e)})).catch((function(e){return console.error("error",e)}));case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(j.jsx)("button",{className:"button",onClick:t,children:"Follow"})}),I=function(e){var t=function(){var t=Object(v.a)(g.a.mark((function t(){return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.hasOwnProperty("user_id")){t.next=3;break}return console.error("props not loaded yet"),t.abrupt("return");case 3:e.setFollowingSuggested(!1),e.user_id===e.currId&&e.setIsFollowing(!1),fetch("".concat(e.API_URL,"delete-follow/post?source_id=").concat(e.myId,"&destination_id=").concat(e.user_id),{method:"POST"}).then((function(e){return e.text()})).then((function(e){return console.log(e)})).catch((function(e){return console.error("error",e)}));case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(j.jsx)("button",{className:"button-primary",onClick:t,children:"Following"})},_=function(e){var t=Object(c.useState)(!1),n=Object(i.a)(t,2),r=n[0],s=n[1],a=function(){var t=Object(v.a)(g.a.mark((function t(){var n,c;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(e.API_URL,"is-following/get?source_id=").concat(e.myId,"&destination_id=").concat(e.user_id));case 2:return n=t.sent,t.next=5,n.json();case 5:c=t.sent,s(c);case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(c.useEffect)((function(){a()}),[]),Object(c.useEffect)((function(){e.user_id===e.currId&&s(e.isFollowing)}),[e.isFollowing]),Object(j.jsx)("div",{className:e.className,children:r?Object(j.jsx)(I,Object(o.a)(Object(o.a)({},e),{},{setFollowingSuggested:s})):Object(j.jsx)(N,Object(o.a)(Object(o.a)({},e),{},{setFollowingSuggested:s}))})},k=function(e){return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("hr",{className:"solid"}),Object(j.jsxs)("div",{className:"user-suggestion",children:[Object(j.jsxs)(u.b,{to:"/u/"+e.handle,children:[Object(j.jsx)("div",{className:"user-suggestion-pfp",children:Object(j.jsx)("img",{src:"https://via.placeholder.com/48",alt:"profile pic"})}),Object(j.jsxs)("div",{className:"user-suggestion-info",children:[Object(j.jsx)("div",{className:"user-suggestion-displayname",children:e.display_name}),Object(j.jsxs)("div",{className:"user-suggestion-handle",children:["@",e.handle]})]})]}),Object(j.jsx)(_,Object(o.a)({className:"user-suggestion-follow"},e))]})]})},F=function(e){var t=Object(c.useState)([]),n=Object(i.a)(t,2),r=n[0],s=n[1],a=function(){var t=Object(v.a)(g.a.mark((function t(){var n,c;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(e.API_URL,"user-suggestions/get"));case 2:return n=t.sent,t.next=5,n.json();case 5:c=t.sent,s(c);case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(c.useEffect)((function(){a()}),[]),Object(j.jsxs)("div",{className:"user-suggestions",children:[Object(j.jsx)("div",{className:"user-suggestions-title",children:"Suggested users"}),r.map((function(t){return Object(c.createElement)(k,Object(o.a)(Object(o.a)(Object(o.a)({},t),e),{},{key:t.handle}))})),Object(j.jsx)("div",{className:"user-suggestions-reroller",children:Object(j.jsx)("button",{onClick:a,children:" Reroll "})})]})},P=(n(39),function(){return Object(j.jsx)("div",{className:"app-title-box",children:Object(j.jsx)(u.b,{to:"/home",children:Object(j.jsx)("div",{className:"app-title",children:"BitteR"})})})}),S=n(22),C=function(e){var t=Object(c.useState)(""),n=Object(i.a)(t,2),r=n[0],s=n[1],a=Object(c.useState)(140),o=Object(i.a)(a,2),u=o[0],l=o[1],d=Object(c.useState)("black"),b=Object(i.a)(d,2),f=b[0],O=b[1],p=Object(c.useState)([!1,"50%"]),h=Object(i.a)(p,2),x=h[0],m=h[1],w=function(){m([!0,"100%"])},y=function(){var t=Object(v.a)(g.a.mark((function t(n){var c,a;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),!(u<0||u>=140)){t.next=4;break}return console.error("Invalid post length."),t.abrupt("return");case 4:(c=new FormData).append("user_id",e.myId),c.append("content",r),a={method:"POST",body:c,redirect:"follow"},fetch("".concat(e.API_URL,"bit/post"),a).then((function(e){return e.text()})).then((function(e){return console.log(e)})).catch((function(e){return console.log("error",e)})),s("");case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(j.jsx)("div",{className:"postbox-input",children:Object(j.jsxs)("form",{children:[Object(j.jsx)(S.a,{type:"text",className:"bit-content",id:"postbox-input-field",placeholder:"Post a bit!",value:r,onChange:function(e){var t=e.target.value;s(t),l(140-t.length),t.length>140?(m([!1,"50%"]),O("red")):t.length>110?(w(),O("orange")):(w(),O("black"))}}),Object(j.jsx)("button",{type:"submit",className:"button-primary",onClick:y,disabled:!x[0],style:{opacity:x[1]},children:"Post"}),Object(j.jsxs)("div",{id:"postbox-charcount",style:{color:f},children:["Remaining characters: ",u]})]})})},R=(n(40),function(e){return Object(j.jsxs)("div",{className:"postbox",children:[Object(j.jsx)("div",{className:"postbox-pfp",children:Object(j.jsx)("img",{src:"https://via.placeholder.com/48",alt:"profile pic"})}),Object(j.jsx)(C,Object(o.a)({},e))]})}),A=n.p+"static/media/reply.34834fc8.svg",L=n.p+"static/media/rebit.e12d3005.svg",U=n.p+"static/media/like.231952c6.svg",E=n.p+"static/media/dislike.4c5bf648.svg",T=function(e){var t=function(){var t=Object(v.a)(g.a.mark((function t(){var c;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:(c=new FormData).append("username","userben"),c.append("password","passwordman"),fetch("".concat(e.API_URL,"rest-auth/login/"),{method:"POST",body:c}).then((function(e){return e.json()})).then((function(e){return n(e)})).catch((function(e){return console.log("error",e)}));case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),n=function(e){console.log(e)};return Object(j.jsxs)("div",{className:"bit-buttons",children:[Object(j.jsx)("input",{type:"image",src:A,alt:"reply button",onClick:function(){console.log("reply to tweet ".concat(e.index)),console.log(JSON.stringify(e))}}),Object(j.jsx)("input",{type:"image",src:L,alt:"rebit button",onClick:function(){console.log("rebit tweet ".concat(e.index))}}),Object(j.jsx)("input",{type:"image",src:U,alt:"like button",onClick:t}),Object(j.jsx)("input",{type:"image",src:E,alt:"dislike button",onClick:function(){console.log("dislike tweet ".concat(e.index))}})]})},D=function(e){return Object(j.jsxs)("div",{className:"bit",children:[Object(j.jsx)(u.b,{to:"/u/".concat(e.handle),children:Object(j.jsx)("div",{className:"bit-pfp",children:Object(j.jsx)("img",{src:"https://via.placeholder.com/48",alt:"profile pic"})})}),Object(j.jsxs)("div",{className:"bit-content",children:[Object(j.jsxs)("div",{className:"bit-info",children:[Object(j.jsxs)(u.b,{to:"/u/".concat(e.handle),children:[Object(j.jsx)("span",{className:"bit-info-displayname",children:e.display_name}),Object(j.jsxs)("span",{className:"bit-info-handle",children:["@",e.handle]})]}),"\u30fb",Object(j.jsx)(u.b,{to:"/t/".concat(e.id),children:Object(j.jsx)("span",{className:"bit-info-time",children:"8hr"})})]}),Object(j.jsxs)("div",{className:"bit-text",children:[" ",e.content," "]}),Object(j.jsx)(T,Object(o.a)({},e))]})]})},B=(n(41),function(e){var t=e.bits;return Object(j.jsx)(j.Fragment,{children:t.map((function(e,t){return Object(c.createElement)(D,Object(o.a)(Object(o.a)({},e),{},{key:e.post_id,index:t}))}))})}),J=function(e){var t=Object(c.useState)([]),n=Object(i.a)(t,2),r=n[0],s=n[1];Object(c.useEffect)((function(){e.hasOwnProperty("myId")&&a()}),[e.myId]);var a=function(){var t=Object(v.a)(g.a.mark((function t(){var n,c;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(e.API_URL,"bits/timeline?user_id=").concat(e.myId));case 2:return n=t.sent,t.next=5,n.json();case 5:c=t.sent,s(c);case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(j.jsx)(B,Object(o.a)(Object(o.a)({},e),{},{bits:r}))},M=(n(42),function(e){return Object(j.jsxs)("div",{className:"timeline",children:[Object(j.jsx)(R,Object(o.a)({},e)),Object(j.jsx)(J,Object(o.a)({},e))]})}),G=(n(43),function(e){return Object(j.jsx)("div",{className:"user-banner",children:Object(j.jsx)("img",{src:"https://via.placeholder.com/600x".concat(150,"?text=Banner"),alt:"profile banner"})})}),H=function(e){return Object(j.jsx)("div",{className:"user-photo",children:Object(j.jsx)("img",{src:"https://via.placeholder.com/".concat(140,"x").concat(140,"/000000/FFFFFF/?text=Profile+picture"),alt:"profile pic"})})},q=function(e){var t=function(){var t=Object(v.a)(g.a.mark((function t(){return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.hasOwnProperty("user_id")){t.next=3;break}return console.error("props not loaded yet"),t.abrupt("return");case 3:e.setIsFollowing(!0),console.log(e.user_id,e.myId),fetch("".concat(e.API_URL,"create-follow/post?source_id=").concat(e.myId,"&destination_id=").concat(e.user_id),{method:"POST"}).then((function(e){return e.text()})).then((function(e){return console.log(e)})).catch((function(e){return console.error("error",e)}));case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(j.jsx)("button",{className:"button",onClick:t,children:"Follow"})},z=function(e){var t=function(){var t=Object(v.a)(g.a.mark((function t(){return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.hasOwnProperty("user_id")){t.next=3;break}return console.error("props not loaded yet"),t.abrupt("return");case 3:e.setIsFollowing(!1),console.log(e.user_id,e.myId),fetch("".concat(e.API_URL,"delete-follow/post?source_id=").concat(e.myId,"&destination_id=").concat(e.user_id),{method:"POST"}).then((function(e){return e.text()})).then((function(e){return console.log(e)})).catch((function(e){return console.error("error",e)}));case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(j.jsx)("button",{className:"button-primary",onClick:t,children:"Following"})},K=function(e){var t=function(){var t=Object(v.a)(g.a.mark((function t(){var n,c;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(e.API_URL,"is-following/get?source_id=").concat(e.myId,"&destination_id=").concat(e.currId));case 2:return n=t.sent,t.next=5,n.json();case 5:c=t.sent,e.setIsFollowing(c);case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(c.useEffect)((function(){0!==e.currId&&e.hasOwnProperty("currId")&&(console.log(e.currId),t())}),[e.currId]),Object(j.jsx)("div",{className:e.className,children:e.isFollowing?Object(j.jsx)(z,Object(o.a)({setIsFollowing:e.setIsFollowing},e)):Object(j.jsx)(q,Object(o.a)({setIsFollowing:e.setIsFollowing},e))})},Q=function(e){return Object(j.jsxs)("div",{className:"user-header",children:[Object(j.jsx)(G,Object(o.a)({},e)),Object(j.jsxs)("div",{className:"user-pfp-follow",children:[Object(j.jsx)(H,{}),Object(j.jsx)(K,Object(o.a)(Object(o.a)({},e),{},{className:"user-follow-button"}))]}),"yo ",e.handle]})},V=(n(44),function(e){var t=Object(c.useState)([]),n=Object(i.a)(t,2),r=n[0],s=n[1];Object(c.useEffect)((function(){e.hasOwnProperty("currId")&&a()}),[e.currId]);var a=function(){var t=Object(v.a)(g.a.mark((function t(){var n,c;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(e.API_URL,"bits/user?user_id=").concat(e.currId));case 2:return n=t.sent,t.next=5,n.json();case 5:c=t.sent,s(c);case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(j.jsx)(B,Object(o.a)(Object(o.a)({},e),{},{bits:r}))}),W=(n(45),function(e){return Object(j.jsxs)("div",{className:"user-not-found",children:["User"," ",Object(j.jsxs)("span",{className:"user-not-found-handle",children:["@",e.match.params.handle]})," ","could not be found."]})}),X=(n(46),function(e){var t=Object(c.useState)({}),n=Object(i.a)(t,2),r=n[0],s=n[1],a=function(){var t=Object(v.a)(g.a.mark((function t(n){var c,r;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(e.API_URL,"user/get?handle=").concat(n));case 2:return c=t.sent,t.next=5,c.json();case 5:r=t.sent,s(r),e.setCurrId(r.user_id);case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();Object(c.useEffect)((function(){a(e.match.params.handle)}),[]);var u=Object(l.f)();return Object(c.useEffect)((function(){return u.listen((function(e){a(e.pathname.slice(3))}))}),[u]),Object(j.jsx)("div",{className:"user-page",children:-1!==e.currId?Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(Q,Object(o.a)(Object(o.a)({},r),e))," ",Object(j.jsx)(V,Object(o.a)(Object(o.a)({},r),e))," "]}):Object(j.jsx)(W,Object(o.a)({},e))})}),Y=function(e){var t=Object(c.useState)(0),n=Object(i.a)(t,2),r=n[0],s=n[1],a=Object(c.useState)(1),b=Object(i.a)(a,2),f=b[0],O=(b[1],Object(c.useState)(!1)),p=Object(i.a)(O,2),h=p[0],m=p[1],g={currId:r,myId:f,isFollowing:h,API_URL:"http://77.100.149.123:8000/"};return Object(j.jsxs)(u.a,{children:[Object(j.jsxs)("div",{className:"App",children:[Object(j.jsxs)("div",{id:"left-col",className:"main-col",children:[Object(j.jsx)(P,{}),Object(j.jsx)(x,{})]}),Object(j.jsx)("div",{id:"mid-col",className:"main-col",children:Object(j.jsxs)(l.c,{children:[Object(j.jsx)(l.a,{exact:!0,path:"/",render:function(e){return Object(j.jsx)(M,Object(o.a)(Object(o.a)({},e),g))}}),Object(j.jsx)(l.a,{path:"/home",render:function(e){return Object(j.jsx)(M,Object(o.a)(Object(o.a)({},e),g))}}),Object(j.jsx)(l.a,{path:"/bitter_react",render:function(e){return Object(j.jsx)(M,Object(o.a)(Object(o.a)({},e),g))}}),Object(j.jsx)(l.a,{path:"/admin",component:d}),Object(j.jsx)(l.a,{path:"/u/:handle",render:function(e){return Object(j.jsx)(X,Object(o.a)(Object(o.a)(Object(o.a)({},e),g),{},{setCurrId:s,setIsFollowing:m}))}})]})}),Object(j.jsxs)("div",{id:"right-col",className:"main-col",children:[Object(j.jsx)(y,{}),Object(j.jsx)(F,Object(o.a)(Object(o.a)(Object(o.a)({},e),g),{},{setIsFollowing:m}))]})]}),Object(j.jsx)("div",{})]})},Z=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,48)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,s=t.getLCP,a=t.getTTFB;n(e),c(e),r(e),s(e),a(e)}))};a.a.render(Object(j.jsx)(r.a.StrictMode,{children:Object(j.jsx)(Y,{})}),document.getElementById("root")),Z()}},[[47,1,2]]]);
//# sourceMappingURL=main.7d8eac90.chunk.js.map