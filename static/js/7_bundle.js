(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{1300:function(e,t,a){"use strict";a.d(t,"a",function(){return u}),a.d(t,"b",function(){return c});var n=a(334),l=a(155),r=a.n(l),u=function(e){void 0===e&&(e=!0),r.a.publish(n.a,e)},c=function(e){void 0===e&&(e=!0),r.a.publish(n.b,e)}},1342:function(e,t,a){"use strict";a.r(t);var n=a(1),l=a.n(n),r=a(327),u=a(1298),c=a(500),o=a(1295),m=a(1300),i=function(){return l.a.createElement("div",null,"路由首页")},E=function(){return l.a.createElement("div",null,l.a.createElement("h3",null,"About"))},p=function(e){var t=e.match;return l.a.createElement("div",null,l.a.createElement("h2",null,"Topics"),l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement(r.a,{to:t.url+"/messages/1234"},"gotoMessage 1234"))),l.a.createElement(c.a,{path:t.url+"/messages/:id",component:s}))},s=function(e){var t=e.match;return l.a.createElement("div",null,l.a.createElement("h3",null,"new messages"),l.a.createElement("h3",null,t.params.id))};t.default=function(e){var t=e.match;return Object(m.a)(),Object(m.b)(),l.a.createElement("div",null,l.a.createElement("h1",null,"App"),l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement(r.a,{to:t.url+"/App"},"子路由首页")),l.a.createElement("li",null,l.a.createElement(r.a,{to:t.url+"/info"},"Inbox")),l.a.createElement("li",null,l.a.createElement(r.a,{to:t.url+"/about"},"About"))),l.a.createElement(u.a,null,l.a.createElement(c.a,{path:t.url+"/App",component:i}),l.a.createElement(c.a,{path:t.url+"/info",component:p}),l.a.createElement(c.a,{path:t.url+"/about",component:E}),l.a.createElement(o.a,{to:t.url+"/App"})))}}}]);