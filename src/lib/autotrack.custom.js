/* eslint-disable */
(function(){var g,aa="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(c.get||c.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},k="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this;function l(){l=function(){};k.Symbol||(k.Symbol=ba)}var ca=0;function ba(a){return"jscomp_symbol_"+(a||"")+ca++}
function m(){l();var a=k.Symbol.iterator;a||(a=k.Symbol.iterator=k.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&aa(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return da(this)}});m=function(){}}function da(a){var b=0;return ea(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})}function ea(a){m();a={next:a};a[k.Symbol.iterator]=function(){return this};return a}function fa(a){m();l();m();var b=a[Symbol.iterator];return b?b.call(a):da(a)}
function n(a){if(!(a instanceof Array)){a=fa(a);for(var b,c=[];!(b=a.next()).done;)c.push(b.value);a=c}return a}function ha(a,b){function c(){}c.prototype=b.prototype;a.Z=b.prototype;a.prototype=new c;a.prototype.constructor=a;for(var d in b)if(Object.defineProperties){var e=Object.getOwnPropertyDescriptor(b,d);e&&Object.defineProperty(a,d,e)}else a[d]=b[d]}var p=window.Element.prototype,ia=p.matches||p.matchesSelector||p.webkitMatchesSelector||p.mozMatchesSelector||p.msMatchesSelector||p.oMatchesSelector;
function ja(a,b){if(a&&1==a.nodeType&&b){if("string"==typeof b||1==b.nodeType)return a==b||ka(a,b);if("length"in b)for(var c=0,d;d=b[c];c++)if(a==d||ka(a,d))return!0}return!1}function ka(a,b){if("string"!=typeof b)return!1;if(ia)return ia.call(a,b);b=a.parentNode.querySelectorAll(b);for(var c=0,d;d=b[c];c++)if(d==a)return!0;return!1}function la(a){for(var b=[];a&&a.parentNode&&1==a.parentNode.nodeType;)a=a.parentNode,b.push(a);return b}
function ma(a,b,c){function d(a){var d;if(h.composed&&"function"==typeof a.composedPath)for(var e=a.composedPath(),f=0,F;F=e[f];f++)1==F.nodeType&&ja(F,b)&&(d=F);else a:{if((d=a.target)&&1==d.nodeType&&b)for(d=[d].concat(la(d)),e=0;f=d[e];e++)if(ja(f,b)){d=f;break a}d=void 0}d&&c.call(d,a,d)}var e=document,h={composed:!0,L:!0},h=void 0===h?{}:h;e.addEventListener(a,d,h.L);return{l:function(){e.removeEventListener(a,d,h.L)}}}
function na(a){var b={};if(!a||1!=a.nodeType)return b;a=a.attributes;if(!a.length)return{};for(var c=0,d;d=a[c];c++)b[d.name]=d.value;return b}var oa=/:(80|443)$/,q=document.createElement("a"),t={};
function u(a){a=a&&"."!=a?a:location.href;if(t[a])return t[a];q.href=a;if("."==a.charAt(0)||"/"==a.charAt(0))return u(q.href);var b="80"==q.port||"443"==q.port?"":q.port,b="0"==b?"":b,c=q.host.replace(oa,"");return t[a]={hash:q.hash,host:c,hostname:q.hostname,href:q.href,origin:q.origin?q.origin:q.protocol+"//"+c,pathname:"/"==q.pathname.charAt(0)?q.pathname:"/"+q.pathname,port:b,protocol:q.protocol,search:q.search}}var v=[];
function pa(a,b){var c=this;this.context=a;this.J=b;this.f=(this.c=/Task$/.test(b))?a.get(b):a[b];this.b=[];this.a=[];this.g=function(a){for(var b=[],d=0;d<arguments.length;++d)b[d-0]=arguments[d];return c.a[c.a.length-1].apply(null,[].concat(n(b)))};this.c?a.set(b,this.g):a[b]=this.g}function w(a,b,c){a=qa(a,b);a.b.push(c);ra(a)}function x(a,b,c){a=qa(a,b);c=a.b.indexOf(c);-1<c&&(a.b.splice(c,1),0<a.b.length?ra(a):a.l())}
function ra(a){a.a=[];for(var b,c=0;b=a.b[c];c++){var d=a.a[c-1]||a.f.bind(a.context);a.a.push(b(d))}}pa.prototype.l=function(){var a=v.indexOf(this);-1<a&&(v.splice(a,1),this.c?this.context.set(this.J,this.f):this.context[this.J]=this.f)};function qa(a,b){var c=v.filter(function(c){return c.context==a&&c.J==b})[0];c||(c=new pa(a,b),v.push(c));return c}
function y(a,b,c,d,e,h){if("function"==typeof d){var f=c.get("buildHitTask");return{buildHitTask:function(c){c.set(a,null,!0);c.set(b,null,!0);d(c,e,h);f(c)}}}return z({},a,b)}function A(a,b){var c=na(a),d={};Object.keys(c).forEach(function(a){if(!a.indexOf(b)&&a!=b+"on"){var e=c[a];"true"==e&&(e=!0);"false"==e&&(e=!1);a=sa(a.slice(b.length));d[a]=e}});return d}
function ta(a){"loading"==document.readyState?document.addEventListener("DOMContentLoaded",function c(){document.removeEventListener("DOMContentLoaded",c);a()}):a()}function ua(a){var b;return function(c){for(var d=[],e=0;e<arguments.length;++e)d[e-0]=arguments[e];clearTimeout(b);b=setTimeout(function(){return a.apply(null,[].concat(n(d)))},500)}}function va(a){function b(){c||(c=!0,a())}var c=!1;setTimeout(b,2E3);return b}var B={};
function wa(a,b){function c(){clearTimeout(e.timeout);e.send&&x(a,"send",e.send);delete B[d];e.K.forEach(function(a){return a()})}var d=a.get("trackingId"),e=B[d]=B[d]||{};clearTimeout(e.timeout);e.timeout=setTimeout(c,0);e.K=e.K||[];e.K.push(b);e.send||(e.send=function(a){return function(b){for(var d=[],e=0;e<arguments.length;++e)d[e-0]=arguments[e];c();a.apply(null,[].concat(n(d)))}},w(a,"send",e.send))}
var z=Object.assign||function(a,b){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];for(var d=0,e=c.length;d<e;d++){var h=Object(c[d]),f;for(f in h)Object.prototype.hasOwnProperty.call(h,f)&&(a[f]=h[f])}return a};function sa(a){return a.replace(/[\-\_]+(\w?)/g,function(a,c){return c.toUpperCase()})}var C=function xa(b){return b?(b^16*Math.random()>>b/4).toString(16):"10000000-1000-4000-8000-100000000000".replace(/[018]/g,xa)};
function D(a,b){var c=window.GoogleAnalyticsObject||"ga";window[c]=window[c]||function(a){for(var b=[],d=0;d<arguments.length;++d)b[d-0]=arguments[d];(window[c].q=window[c].q||[]).push(b)};window.gaDevIds=window.gaDevIds||[];0>window.gaDevIds.indexOf("i5iSjo")&&window.gaDevIds.push("i5iSjo");window[c]("provide",a,b);window.gaplugins=window.gaplugins||{};window.gaplugins[a.charAt(0).toUpperCase()+a.slice(1)]=b}var E={M:1,N:2,O:3,W:4,X:5,R:6,S:7,Y:8,T:9,P:10},G=Object.keys(E).length;
function H(a,b){a.set("\x26_av","2.4.1");var c=a.get("\x26_au"),c=parseInt(c||"0",16).toString(2);if(c.length<G)for(var d=G-c.length;d;)c="0"+c,d--;b=G-b;c=c.substr(0,b)+1+c.substr(b+1);a.set("\x26_au",parseInt(c||"0",2).toString(16))}
function I(a,b){var c=this;H(a,E.N);if(window.addEventListener){this.a=z({events:["click"],fieldsObj:{},attributePrefix:"ga-"},b);this.f=a;this.c=this.c.bind(this);var d="["+this.a.attributePrefix+"on]";this.b={};this.a.events.forEach(function(a){c.b[a]=ma(a,d,c.c)})}}
I.prototype.c=function(a,b){var c=this.a.attributePrefix;if(!(0>b.getAttribute(c+"on").split(/\s*,\s*/).indexOf(a.type))){var c=A(b,c),d=z({},this.a.fieldsObj,c);this.f.send(c.hitType||"event",y({transport:"beacon"},d,this.f,this.a.hitFilter,b,a))}};I.prototype.remove=function(){var a=this;Object.keys(this.b).forEach(function(b){a.b[b].l()})};D("eventTracker",I);
function J(a,b){var c=this;H(a,E.R);window.addEventListener&&(this.a=z({events:["click"],linkSelector:"a, area",shouldTrackOutboundLink:this.shouldTrackOutboundLink,fieldsObj:{},attributePrefix:"ga-"},b),this.c=a,this.f=this.f.bind(this),this.b={},this.a.events.forEach(function(a){c.b[a]=ma(a,c.a.linkSelector,c.f)}))}
J.prototype.f=function(a,b){var c=this;if(this.a.shouldTrackOutboundLink(b,u)){var d=b.getAttribute("href")||b.getAttribute("xlink:href"),e=u(d),e={transport:"beacon",eventCategory:"Outbound Link",eventAction:a.type,eventLabel:e.href},h=z({},this.a.fieldsObj,A(b,this.a.attributePrefix)),f=y(e,h,this.c,this.a.hitFilter,b,a);if(navigator.sendBeacon||"click"!=a.type||"_blank"==b.target||a.metaKey||a.ctrlKey||a.shiftKey||a.altKey||1<a.which)this.c.send("event",f);else{var r=function(){window.removeEventListener("click",
r);if(!a.defaultPrevented){a.preventDefault();var b=f.hitCallback;f.hitCallback=va(function(){"function"==typeof b&&b();location.href=d})}c.c.send("event",f)};window.addEventListener("click",r)}}};J.prototype.shouldTrackOutboundLink=function(a,b){a=a.getAttribute("href")||a.getAttribute("xlink:href");b=b(a);return b.hostname!=location.hostname&&"http"==b.protocol.slice(0,4)};J.prototype.remove=function(){var a=this;Object.keys(this.b).forEach(function(b){a.b[b].l()})};D("outboundLinkTracker",J);
function ya(a,b){H(a,E.T);history.pushState&&window.addEventListener&&(this.a=z({shouldTrackUrlChange:this.shouldTrackUrlChange,trackReplaceState:!1,fieldsObj:{},hitFilter:null},b),this.b=a,this.c=location.pathname+location.search,this.B=this.B.bind(this),this.C=this.C.bind(this),this.w=this.w.bind(this),w(history,"pushState",this.B),w(history,"replaceState",this.C),window.addEventListener("popstate",this.w))}g=ya.prototype;
g.B=function(a){var b=this;return function(c){for(var d=[],e=0;e<arguments.length;++e)d[e-0]=arguments[e];a.apply(null,[].concat(n(d)));K(b,!0)}};g.C=function(a){var b=this;return function(c){for(var d=[],e=0;e<arguments.length;++e)d[e-0]=arguments[e];a.apply(null,[].concat(n(d)));K(b,!1)}};g.w=function(){K(this,!0)};
function K(a,b){setTimeout(function(){var c=a.c,d=location.pathname+location.search;c!=d&&a.a.shouldTrackUrlChange.call(a,d,c)&&(a.c=d,a.b.set({page:d,title:document.title}),(b||a.a.trackReplaceState)&&a.b.send("pageview",y({transport:"beacon"},a.a.fieldsObj,a.b,a.a.hitFilter)))},0)}g.shouldTrackUrlChange=function(a,b){return!(!a||!b)};g.remove=function(){x(history,"pushState",this.B);x(history,"replaceState",this.C);window.removeEventListener("popstate",this.w)};D("urlChangeTracker",ya);
function L(a,b){H(a,E.M);this.a=z({},b);this.g=a;this.b=this.a.stripQuery&&this.a.queryDimensionIndex?"dimension"+this.a.queryDimensionIndex:null;this.f=this.f.bind(this);this.c=this.c.bind(this);w(a,"get",this.f);w(a,"buildHitTask",this.c)}L.prototype.f=function(a){var b=this;return function(c){if("page"==c||c==b.b){var d={location:a("location"),page:a("page")};return za(b,d)[c]}return a(c)}};
L.prototype.c=function(a){var b=this;return function(c){var d=za(b,{location:c.get("location"),page:c.get("page")});c.set(d,null,!0);a(c)}};
function za(a,b){var c=u(b.page||b.location),d=c.pathname;if(a.a.indexFilename){var e=d.split("/");a.a.indexFilename==e[e.length-1]&&(e[e.length-1]="",d=e.join("/"))}"remove"==a.a.trailingSlash?d=d.replace(/\/+$/,""):"add"==a.a.trailingSlash&&(/\.\w+$/.test(d)||"/"==d.substr(-1)||(d+="/"));d={page:d+(a.a.stripQuery?Aa(a,c.search):c.search)};b.location&&(d.location=b.location);a.b&&(d[a.b]=c.search.slice(1)||"(not set)");return"function"==typeof a.a.urlFieldsFilter?(b=a.a.urlFieldsFilter(d,u),c={page:b.page,
location:b.location},a.b&&(c[a.b]=b[a.b]),c):d}function Aa(a,b){if(Array.isArray(a.a.queryParamsWhitelist)){var c=[];b.slice(1).split("\x26").forEach(function(b){var d=fa(b.split("\x3d"));b=d.next().value;d=d.next().value;-1<a.a.queryParamsWhitelist.indexOf(b)&&d&&c.push([b,d])});return c.length?"?"+c.map(function(a){return a.join("\x3d")}).join("\x26"):""}return""}L.prototype.remove=function(){x(this.g,"get",this.f);x(this.g,"buildHitTask",this.c)};D("cleanUrlTracker",L);
function Ba(a,b){var c=this;H(a,E.O);window.IntersectionObserver&&window.MutationObserver&&(this.a=z({rootMargin:"0px",fieldsObj:{},attributePrefix:"ga-"},b),this.c=a,this.G=this.G.bind(this),this.I=this.I.bind(this),this.D=this.D.bind(this),this.F=this.F.bind(this),this.b=null,this.items=[],this.i={},this.h={},ta(function(){c.a.elements&&c.observeElements(c.a.elements)}))}g=Ba.prototype;
g.observeElements=function(a){var b=this;a=M(this,a);this.items=this.items.concat(a.items);this.i=z({},a.i,this.i);this.h=z({},a.h,this.h);a.items.forEach(function(a){var c=b.h[a.threshold]=b.h[a.threshold]||new IntersectionObserver(b.I,{rootMargin:b.a.rootMargin,threshold:[+a.threshold]});(a=b.i[a.id]||(b.i[a.id]=document.getElementById(a.id)))&&c.observe(a)});this.b||(this.b=new MutationObserver(this.G),this.b.observe(document.body,{childList:!0,subtree:!0}));requestAnimationFrame(function(){})};
g.unobserveElements=function(a){var b=[],c=[];this.items.forEach(function(d){a.some(function(a){a=Ca(a);return a.id===d.id&&a.threshold===d.threshold&&a.trackFirstImpressionOnly===d.trackFirstImpressionOnly})?c.push(d):b.push(d)});if(b.length){var d=M(this,b),e=M(this,c);this.items=d.items;this.i=d.i;this.h=d.h;c.forEach(function(a){if(!d.i[a.id]){var b=e.h[a.threshold],c=e.i[a.id];c&&b.unobserve(c);d.h[a.threshold]||e.h[a.threshold].disconnect()}})}else this.unobserveAllElements()};
g.unobserveAllElements=function(){var a=this;Object.keys(this.h).forEach(function(b){a.h[b].disconnect()});this.b.disconnect();this.b=null;this.items=[];this.i={};this.h={}};function M(a,b){var c=[],d={},e={};b.length&&b.forEach(function(b){b=Ca(b);c.push(b);e[b.id]=a.i[b.id]||null;d[b.threshold]=a.h[b.threshold]||null});return{items:c,i:e,h:d}}g.G=function(a){for(var b=0,c;c=a[b];b++){for(var d=0,e;e=c.removedNodes[d];d++)N(this,e,this.F);for(d=0;e=c.addedNodes[d];d++)N(this,e,this.D)}};
function N(a,b,c){1==b.nodeType&&b.id in a.i&&c(b.id);for(var d=0,e;e=b.childNodes[d];d++)N(a,e,c)}
g.I=function(a){for(var b=[],c=0,d;d=a[c];c++)for(var e=0,h;h=this.items[e];e++){var f;if(f=d.target.id===h.id)(f=h.threshold)?f=d.intersectionRatio>=f:(f=d.intersectionRect,f=0<f.top||0<f.bottom||0<f.left||0<f.right);if(f){var r=h.id;f=document.getElementById(r);var r={transport:"beacon",eventCategory:"Viewport",eventAction:"impression",eventLabel:r,nonInteraction:!0},Ea=z({},this.a.fieldsObj,A(f,this.a.attributePrefix));this.c.send("event",y(r,Ea,this.c,this.a.hitFilter,f));h.trackFirstImpressionOnly&&
b.push(h)}}b.length&&this.unobserveElements(b)};g.D=function(a){var b=this,c=this.i[a]=document.getElementById(a);this.items.forEach(function(d){a==d.id&&b.h[d.threshold].observe(c)})};g.F=function(a){var b=this,c=this.i[a];this.items.forEach(function(d){a==d.id&&b.h[d.threshold].unobserve(c)});this.i[a]=null};g.remove=function(){this.unobserveAllElements()};D("impressionTracker",Ba);function Ca(a){"string"==typeof a&&(a={id:a});return z({threshold:0,trackFirstImpressionOnly:!0},a)}
function Da(){this.a={}}function Fa(a,b){(a.a.externalSet=a.a.externalSet||[]).push(b)}Da.prototype.U=function(a,b){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];(this.a[a]=this.a[a]||[]).forEach(function(a){return a.apply(null,[].concat(n(c)))})};var O={},P=!1,Q;function R(a,b){b=void 0===b?{}:b;this.a={};this.b=a;this.v=b;this.j=null}ha(R,Da);function S(a,b,c){a=["autotrack",a,b].join(":");O[a]||(O[a]=new R(a,c),P||(window.addEventListener("storage",Ga),P=!0));return O[a]}
function T(){if(null!=Q)return Q;try{window.localStorage.setItem("autotrack","autotrack"),window.localStorage.removeItem("autotrack"),Q=!0}catch(a){Q=!1}return Q}R.prototype.get=function(){if(this.j)return this.j;if(T())try{this.j=U(window.localStorage.getItem(this.b))}catch(a){}return this.j=z({},this.v,this.j)};R.prototype.set=function(a){this.j=z({},this.v,this.j,a);if(T())try{var b=JSON.stringify(this.j);window.localStorage.setItem(this.b,b)}catch(c){}};
function Ha(a){a.j={};if(T())try{window.localStorage.removeItem(a.b)}catch(b){}}R.prototype.l=function(){delete O[this.b];Object.keys(O).length||(window.removeEventListener("storage",Ga),P=!1)};function Ga(a){var b=O[a.key];if(b){var c=z({},b.v,U(a.oldValue));a=z({},b.v,U(a.newValue));b.j=a;b.U("externalSet",a,c)}}function U(a){var b={};if(a)try{b=JSON.parse(a)}catch(c){}return b}var V={};
function W(a,b,c){this.f=a;this.timeout=b||Ia;this.timeZone=c;this.b=this.b.bind(this);w(a,"sendHitTask",this.b);try{this.c=new Intl.DateTimeFormat("en-US",{timeZone:this.timeZone})}catch(d){}this.a=S(a.get("trackingId"),"session",{hitTime:0,isExpired:!1});this.a.get().id||this.a.set({id:C()})}function Ja(a,b,c){var d=a.get("trackingId");return V[d]?V[d]:V[d]=new W(a,b,c)}function X(a){return a.a.get().id}
W.prototype.isExpired=function(a){a=void 0===a?X(this):a;if(a!=X(this))return!0;a=this.a.get();if(a.isExpired)return!0;var b=a.hitTime;return b&&(a=new Date,b=new Date(b),a-b>6E4*this.timeout||this.c&&this.c.format(a)!=this.c.format(b))?!0:!1};W.prototype.b=function(a){var b=this;return function(c){a(c);var d=c.get("sessionControl");c="start"==d||b.isExpired();var d="end"==d,e=b.a.get();e.hitTime=+new Date;c&&(e.isExpired=!1,e.id=C());d&&(e.isExpired=!0);b.a.set(e)}};
W.prototype.l=function(){x(this.f,"sendHitTask",this.b);this.a.l();delete V[this.f.get("trackingId")]};var Ia=30,Y=C();
function Ka(a,b){var c=this;H(a,E.S);document.visibilityState&&(this.a=z({sessionTimeout:Ia,visibleThreshold:5E3,sendInitialPageview:!1,fieldsObj:{}},b),this.b=a,this.g=document.visibilityState,this.m=null,this.o=!1,this.u=this.u.bind(this),this.s=this.s.bind(this),this.A=this.A.bind(this),this.H=this.H.bind(this),this.c=S(a.get("trackingId"),"plugins/page-visibility-tracker"),Fa(this.c,this.H),this.f=Ja(a,this.a.sessionTimeout,this.a.timeZone),w(a,"set",this.u),window.addEventListener("unload",this.A),
document.addEventListener("visibilitychange",this.s),wa(this.b,function(){if("visible"==document.visibilityState)c.a.sendInitialPageview&&(La(c,{V:!0}),c.o=!0),c.c.set({time:+new Date,state:"visible",pageId:Y,sessionId:X(c.f)});else if(c.a.sendInitialPageview&&c.a.pageLoadsMetricIndex){var a={},a=(a.transport="beacon",a.eventCategory="Page Visibility",a.eventAction="page load",a.eventLabel="(not set)",a["metric"+c.a.pageLoadsMetricIndex]=1,a.nonInteraction=!0,a);c.b.send("event",y(a,c.a.fieldsObj,
c.b,c.a.hitFilter))}}))}g=Ka.prototype;
g.s=function(){var a=this;if("visible"==document.visibilityState||"hidden"==document.visibilityState){var b=Ma(this),c={time:+new Date,state:document.visibilityState,pageId:Y,sessionId:X(this.f)};"visible"==document.visibilityState&&this.a.sendInitialPageview&&!this.o&&(La(this),this.o=!0);"hidden"==document.visibilityState&&this.m&&clearTimeout(this.m);this.f.isExpired(b.sessionId)?(Ha(this.c),"hidden"==this.g&&"visible"==document.visibilityState&&(clearTimeout(this.m),this.m=setTimeout(function(){a.c.set(c);
La(a,{hitTime:c.time})},this.a.visibleThreshold))):(b.pageId==Y&&"visible"==b.state&&Na(this,b),this.c.set(c));this.g=document.visibilityState}};function Ma(a){var b=a.c.get();"visible"==a.g&&"hidden"==b.state&&b.pageId!=Y&&(b.state="visible",b.pageId=Y,a.c.set(b));return b}
function Na(a,b,c){c=(c?c:{}).hitTime;var d={hitTime:c},d=(d?d:{}).hitTime;(b=b.time?(d||+new Date)-b.time:0)&&b>=a.a.visibleThreshold&&(b=Math.round(b/1E3),d={transport:"beacon",nonInteraction:!0,eventCategory:"Page Visibility",eventAction:"track",eventValue:b,eventLabel:"(not set)"},c&&(d.queueTime=+new Date-c),a.a.visibleMetricIndex&&(d["metric"+a.a.visibleMetricIndex]=b),a.b.send("event",y(d,a.a.fieldsObj,a.b,a.a.hitFilter)))}
function La(a,b){var c=b?b:{};b=c.hitTime;var c=c.V,d={transport:"beacon"};b&&(d.queueTime=+new Date-b);c&&a.a.pageLoadsMetricIndex&&(d["metric"+a.a.pageLoadsMetricIndex]=1);a.b.send("pageview",y(d,a.a.fieldsObj,a.b,a.a.hitFilter))}g.u=function(a){var b=this;return function(c,d){var e={},e="object"==typeof c&&null!==c?c:(e[c]=d,e);e.page&&e.page!==b.b.get("page")&&"visible"==b.g&&b.s();a(c,d)}};
g.H=function(a,b){a.time!=b.time&&(b.pageId!=Y||"visible"!=b.state||this.f.isExpired(b.sessionId)||Na(this,b,{hitTime:a.time}))};g.A=function(){"hidden"!=this.g&&this.s()};g.remove=function(){this.c.l();this.f.l();x(this.b,"set",this.u);window.removeEventListener("unload",this.A);document.removeEventListener("visibilitychange",this.s)};D("pageVisibilityTracker",Ka);
function Z(a,b){H(a,E.P);window.addEventListener&&(this.b=z({increaseThreshold:20,sessionTimeout:Ia,fieldsObj:{}},b),this.f=a,this.c=Oa(this),this.g=ua(this.g.bind(this)),this.o=this.o.bind(this),this.a=S(a.get("trackingId"),"plugins/max-scroll-tracker"),this.m=Ja(a,this.b.sessionTimeout,this.b.timeZone),w(a,"set",this.o),Pa(this))}function Pa(a){100>(a.a.get()[a.c]||0)&&window.addEventListener("scroll",a.g)}
Z.prototype.g=function(){var a=document.documentElement,b=document.body,a=Math.min(100,Math.max(0,Math.round(window.pageYOffset/(Math.max(a.offsetHeight,a.scrollHeight,b.offsetHeight,b.scrollHeight)-window.innerHeight)*100))),b=X(this.m);b!=this.a.get().sessionId&&(Ha(this.a),this.a.set({sessionId:b}));if(this.m.isExpired(this.a.get().sessionId))Ha(this.a);else if(b=this.a.get()[this.c]||0,a>b&&(100!=a&&100!=b||window.removeEventListener("scroll",this.g),b=a-b,100==a||b>=this.b.increaseThreshold)){var c=
{};this.a.set((c[this.c]=a,c.sessionId=X(this.m),c));a={transport:"beacon",eventCategory:"Max Scroll",eventAction:"increase",eventValue:b,eventLabel:String(a),nonInteraction:!0};this.b.maxScrollMetricIndex&&(a["metric"+this.b.maxScrollMetricIndex]=b);this.f.send("event",y(a,this.b.fieldsObj,this.f,this.b.hitFilter))}};Z.prototype.o=function(a){var b=this;return function(c,d){a(c,d);var e={};("object"==typeof c&&null!==c?c:(e[c]=d,e)).page&&(c=b.c,b.c=Oa(b),b.c!=c&&Pa(b))}};
function Oa(a){a=u(a.f.get("page")||a.f.get("location"));return a.pathname+a.search}Z.prototype.remove=function(){this.m.l();window.removeEventListener("scroll",this.g);x(this.f,"set",this.o)};D("maxScrollTracker",Z);})();
//# sourceMappingURL=autotrack.custom.js.map