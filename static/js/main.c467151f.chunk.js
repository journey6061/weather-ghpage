(this.webpackJsonpweather=this.webpackJsonpweather||[]).push([[0],[,,,,,,,function(e,t,n){e.exports=n(16)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),c=n(2),r=n.n(c),i=(n(12),n(3)),l=n(4),s=n(6),u=n(5),h=(n(13),function(e){return o.a.createElement(o.a.Fragment,null,o.a.createElement("button",{onClick:e.click,className:"geoinfo"},e.geoinfo))}),m=(n(14),function(e){return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:""},o.a.createElement("span",null,"temperature: ",e.temp," / "),o.a.createElement("span",null,"time: ",e.time," / "),o.a.createElement("span",null,"detail: ",e.detail)))}),f=(n(15),function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(e=t.call.apply(t,[this].concat(o))).state={weather:[],geos:[],geo:[],fav:null,inputvalue:null},e.getInput=function(){console.log(e.inputwhat.value.length),e.setState({inputvalue:e.inputwhat.value})},e.geoback=function(t){var n=[];Object.keys(t).map((function(e,a){return n.push(t[e])})),console.log(n),e.setState({geo:n})},e.getValue=function(){},e}return Object(l.a)(n,[{key:"componentDidUpdate",value:function(){var e=this;if(null!==this.state.inputvalue){var t=[];console.log(this.state.inputvalue),fetch("https://api.geocod.io/v1.4/geocode?q=".concat(this.state.inputvalue,"&api_key=25de1572225915e7eee55d929d76e4e65e61e62")).then((function(e){return e.json()})).then((function(n){console.log(n),n.results.map((function(e,n){return t.push([e.formatted_address,e.location])})),e.setState((function(e,n){if(JSON.stringify(t)!==JSON.stringify(e.geos))return{geos:t}}))})).catch((function(e){console.log("request failed",e),alert("please input correct location info.")}))}if(this.state.geo.length){var n=[];fetch("https://api.weather.gov/points/".concat(this.state.geo[0],",").concat(this.state.geo[1])).then((function(e){return e.json()})).then((function(t){return fetch(t.properties.forecast).then((function(e){return e.json()})).then((function(t){t.properties.periods.map((function(e,t){n.push([e.temperature,e.name,e.shortForecast])})),e.setState((function(e,t){if(JSON.stringify(n)!==JSON.stringify(e.weather))return{weather:n}}))})).catch((function(e){console.log(e),alert("weather can't find. ".concat(e))}))})).catch((function(e){console.log(e),alert("geo can't find. ".concat(e))}))}}},{key:"render",value:function(){var e=this,t=o.a.createElement("p",null,"no geos info now!");0!==this.state.geos.length&&(console.log(this.state.geos),t=this.state.geos.map((function(t,n){return o.a.createElement(h,{geoinfo:t[0],key:n,click:e.geoback.bind(e,t[1])})})));var n=o.a.createElement("p",null,"there's no weather info now.");if(0!==this.state.weather.length){var a=this.state.weather[0];n=o.a.createElement(m,{temp:a[0],time:a[1],detail:a[2]}),console.log(a[1]),console.log(typeof this.state.weather[0])}return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"main"},o.a.createElement("div",{className:"header"},"weather app"),o.a.createElement("div",{className:"left"}),o.a.createElement("div",{className:"mid"},o.a.createElement("div",{className:"inputarea"},o.a.createElement("input",{type:"text",placeholder:"zip, location...",ref:function(t){return e.inputwhat=t}}),o.a.createElement("button",{onClick:this.getInput},"submit")),o.a.createElement("div",{className:"geo"},t),o.a.createElement("div",{className:"weather"},n)),o.a.createElement("div",{className:"right"}),o.a.createElement("div",{className:"footer"})))}}]),n}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(f,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[7,1,2]]]);
//# sourceMappingURL=main.c467151f.chunk.js.map