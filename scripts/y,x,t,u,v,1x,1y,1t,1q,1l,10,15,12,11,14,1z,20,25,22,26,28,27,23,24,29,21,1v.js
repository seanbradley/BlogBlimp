BFX = {
  sneeze: function () {
    window.open("http://www.youtube.com/watch?v=WDIQyWWL810");
  }
};
$(document).ready(function() {
  BFX.mask = (function () {
    var html = $('<div></div>', {
      'class': 'mask',
      'id': 'mask'
    }).css({
      'background-color': 'black',
      'opacity': 0.5,
      'position': 'absolute',
      'z-index': h.maxZIndex() + 1
    }).hide();

    $('body').prepend(html);

    window.onresize = function(event) {
      html
        .css({
          'height': $(document).height()
        });
    }
    
    var keyupHandler = function (e) {
      if (e.keyCode == 27) {
        // esc key pressed
        $(document).trigger('maskEscPress');
      };
    }

    var clickHandler = function () {
      $(document).trigger('maskClicked');
    }

    var show = function () {
      html
        .show()
        .one('click', clickHandler)
        .css({
          'height': $(document).height()
        });

      $(document)
        .bind('keyup', keyupHandler)
        .trigger('maskShow');
        

        
    };

    var hide = function () {
      html
        .hide()
        .unbind('click', clickHandler);

      $(document)
        .unbind('keyup', keyupHandler)
        .trigger('maskHide');
    };

    return {
      show: show,
      hide: hide
    };
  })();
});

$(document).ready(function() {
  
  BFX.dialog = (function () {

    var html = null;
    var arrow = null
    var template = null
    var target = null
    var padding = 5;
    
    var options = null;
    
    var createTemplate = function() {
      return $('<div></div>', {
        'class': 'confirm-dialog'
      })
    }
    
    var positionDialogBottom = function(parent) {
      var pos = parent.offset();

      var realParentWidth = parent.outerWidth()
      var realParentHeight = parent.outerHeight()
      var realTemplateWidth = html.outerWidth()
      var realTemplateHeight = html.outerHeight()

      var t = pos.top + realParentHeight + padding
      var l = pos.left + realParentWidth/2.0 - realTemplateWidth/2.0
      
      var arrowWidth = arrow.outerWidth()/2.0;
      
      html.css('top', t + 'px');
      html.css('left', l + 'px');
      
      arrow.css('top', t - 2 * arrowWidth + padding + 'px');
      arrow.css('left', l + realTemplateWidth/2.0 - arrowWidth/2.0 + 'px');
      arrow.addClass('bottom')
    }

    var positionDialogLeft = function(parent) {
      var pos = parent.offset();

      var realParentWidth = parent.outerWidth()
      var realParentHeight = parent.outerHeight()
      var realTemplateWidth = html.outerWidth()
      var realTemplateHeight = html.outerHeight()

      var t = pos.top + realParentHeight/2.0 - realTemplateHeight/2.0
      var l = pos.left - realTemplateWidth - padding

      var arrowWidth = arrow.outerWidth()/2;

      html.css('top', t + 'px');
      html.css('left', l + 'px');
      
      arrow.css('top', t + realTemplateHeight/2.0 - arrowWidth + 'px');
      arrow.css('left', l + realTemplateWidth - padding + 'px');
      arrow.addClass('left')
    }
    
    var positionDialogTop = function(parent) {
      var pos = parent.offset();

      var realParentWidth = parent.outerWidth()
      var realParentHeight = parent.outerHeight()
      var realTemplateWidth = html.outerWidth()
      var realTemplateHeight = html.outerHeight()

      var t = pos.top - realTemplateHeight - padding
      var l = pos.left + realParentWidth/2.0 - realTemplateWidth/2.0

      var arrowWidth = arrow.outerWidth()/2;

      html.css('top', t + 'px');
      html.css('left', l + 'px');
      
      arrow.css('top', pos.top - arrowWidth/2.0 + 'px');
      arrow.css('left', l + realTemplateWidth/2.0 - arrowWidth/2.0 + 'px');
      arrow.addClass('top')
    }

    var show = function (_options) {
      $(".confirm-dialog, .dialog-arrow").remove()
      
      $(document).bind('maskClicked maskEscPress', function () {
          window.location = '#/';
          hide()
      });
      
      options = _options
      
      template = createTemplate()
      html = template
        .append(
          $(options.template)
            .clone()
            .addClass('inner')
            .show())
        .hide()
        .css({
          'position': 'absolute'
        });

      html.find('.dialog-buttons .choices.no').click(function(){
        if(options.no) {
          options.no()          
        } else {
          window.location.hash = '#/'
        }

        hide()
      });

      html.find('.dialog-buttons .choices.yes').click(function(){
        if(options.yes)
          options.yes()
        
        if(!options.submit  != false)
          html.find('form').submit();
      })

      $('body').prepend(html);
      
      if(options.mask != false )
        BFX.mask.show()
      
      html
        .show()
        .css({
          'width': options.width || template.width(),
          'height': options.height || template.height() + 10,
          'z-index': h.maxZIndex() + 1
        });
        

      arrow = $("<div></div>", {'class' : 'dialog-arrow'})
      .css({
        'z-index': h.maxZIndex() + 10
      });
        
      $('body').prepend(arrow);
      
      if(options.target) {
        if(options.position == 'bottom')
          positionDialogBottom($(options.target))
        else if(options.position == 'top')
          positionDialogTop($(options.target))
        else
          positionDialogLeft($(options.target))
      }
    };

    var hide = function () {

      if(options.mask != false){
        BFX.mask.hide()
      }
        
      html.remove()
      arrow.remove()
    };

    return {
      show: show,
      hide: hide
    };
    
    
    
    
  })();
});

$(document).ready(function() {
  BFX.flashMessage = (function () {
    var html = $("<div class='flash-message absolute'></div>").css({
      'position': 'absolute',
      'width': '500px',
      'height': '20px',
      'top': '106px',
      'left': '10px',
      'padding': '10px',
      'border': '1px solid #9E0101'
    }).click(function () {
      $(this).fadeOut();
    }).hide();

    $('body').prepend(html);

    var display = function (message) {
      html.text(message);
      html.css('left', h.pageCentreX(500))
      html.show();
      setTimeout(function () {
        html.fadeOut();
      }, 3000)
    }

    var displayError = function (message) {
      html.css('z-index', h.maxZIndex() + 1).addClass('error');
      display(message);
    };

    var displayNotice = function (message) {
      html.addClass('notice');
      display(message);
    };

    return {
      displayError: displayError,
      displayNotice: displayNotice
    };
  })();
});
h = {
  bytesToMegabytes: function (bytes) {
    return (Math.round((bytes / 1048576) * 100) / 100) + "MB"
  },

  clearDisplay: function () {
    $('.displaying').remove();
    BFX.mask.hide();
  },

  millisecondsToHrsMinSec: function (milliseconds) {
    var duration_seconds = milliseconds / 1000
    var h = Math.floor(duration_seconds / 3600);
    var m = Math.floor(duration_seconds % 3600 / 60);
    var s = Math.floor(duration_seconds % 3600 % 60);
    return ((h > 0 ? h + ":" : "") + (m > 0 ? (h > 0 && m < 10 ? "0" : "") + m + ":" : "0:") + (s < 10 ? "0" : "") + s);
  },

  // calculate the left offset to position the element centrally on the x axis 
  pageCentreX: function (elementWidth) {
    var pageWidth = $('body').width()
    return (pageWidth / 2) - (elementWidth / 2)
  },

  imageMissing: function () {
    $(this).attr('src', '/images/unavailable_screenshot.png');
  },

  smallImageMissing: function () {
    $(this).attr('src', '/images/unavailable_screenshot_small.png');
  },


  // calculate the top offset to position the element centrally on the y axis
  pageCentreY: function (elementHeight) {
    var pageHeight = $('body').height()
    return (pageHeight / 2) - (elementHeight / 2)
  },

  // http://ejohn.org/blog/javascript-pretty-date/
  timeAgoInWords: function(time){
    var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
      diff = (((new Date()).getTime() - date.getTime()) / 1000),
      day_diff = Math.floor(diff / 86400);

    if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 ){
      var month = date.getMonth()+1;
      if( month < 9 ) { month = "0"+month; }
      var day = date.getDate();
      if( day < 9 ) { day = "0"+day; }
      return month+"/"+day+"/"+date.getFullYear()
    }

    return day_diff == 0 && (
        diff < 60 && "just now" ||
        diff < 120 && "1 minute ago" ||
        diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
        diff < 7200 && "1 hour ago" ||
        diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
      day_diff == 1 && "yesterday" ||
      day_diff < 7 && day_diff + " days ago" ||
      day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
  },

  viewPortTop: function (offset) {
    return $(window).scrollTop() + offset
  },

  maxZIndex: function () {
    return Math.max.apply(null, $('body > *').map(function (i, elem) {
      var zIndex = $(elem).css('z-index');
      if (zIndex && typeof(parseInt(zIndex)) == "number" && !isNaN(parseInt(zIndex))) {
        return parseInt(zIndex);
      } else {
        return 1;
      };
    }).get());
  },
  
  truncate: function (str, limit) {
  	var bits, i;
    if(str == null)
      return ''

  	bits = str.split('');
  	if (bits.length > limit) {
  		for (i = bits.length - 1; i > -1; --i) {
  			if (i > limit) {
  				bits.length = i;
  			}
  			else if (' ' === bits[i]) {
  				bits.length = i;
  				break;
  			}
  		}
  		bits.push('...');
  	}
  	return bits.join('');
  }
};
// -- Sammy -- /sammy.js
// http://code.quirkey.com/sammy
// Version: 0.6.2
// Built: Mon Oct 11 12:41:51 -0700 2010
(function(g,i){var n,f="([^/]+)",j=/:([\w\d]+)/g,k=/\?([^#]*)$/,b=function(o){return Array.prototype.slice.call(o)},c=function(o){return Object.prototype.toString.call(o)==="[object Function]"},l=function(o){return Object.prototype.toString.call(o)==="[object Array]"},h=decodeURIComponent,e=function(o){return o.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},m=function(o){return function(p,q){return this.route.apply(this,[o,p,q])}},a={},d=[];n=function(){var p=b(arguments),q,o;n.apps=n.apps||{};if(p.length===0||p[0]&&c(p[0])){return n.apply(n,["body"].concat(p))}else{if(typeof(o=p.shift())=="string"){q=n.apps[o]||new n.Application();q.element_selector=o;if(p.length>0){g.each(p,function(r,s){q.use(s)})}if(q.element_selector!=o){delete n.apps[o]}n.apps[q.element_selector]=q;return q}}};n.VERSION="0.6.2";n.addLogger=function(o){d.push(o)};n.log=function(){var o=b(arguments);o.unshift("["+Date()+"]");g.each(d,function(q,p){p.apply(n,o)})};if(typeof i.console!="undefined"){if(c(console.log.apply)){n.addLogger(function(){i.console.log.apply(console,arguments)})}else{n.addLogger(function(){i.console.log(arguments)})}}else{if(typeof console!="undefined"){n.addLogger(function(){console.log.apply(console,arguments)})}}g.extend(n,{makeArray:b,isFunction:c,isArray:l});n.Object=function(o){return g.extend(this,o||{})};g.extend(n.Object.prototype,{escapeHTML:e,h:e,toHash:function(){var o={};g.each(this,function(q,p){if(!c(p)){o[q]=p}});return o},toHTML:function(){var o="";g.each(this,function(q,p){if(!c(p)){o+="<strong>"+q+"</strong> "+p+"<br />"}});return o},keys:function(o){var p=[];for(var q in this){if(!c(this[q])||!o){p.push(q)}}return p},has:function(o){return this[o]&&g.trim(this[o].toString())!=""},join:function(){var p=b(arguments);var o=p.shift();return p.join(o)},log:function(){n.log.apply(n,arguments)},toString:function(o){var p=[];g.each(this,function(r,q){if(!c(q)||o){p.push('"'+r+'": '+q.toString())}});return"Sammy.Object: {"+p.join(",")+"}"}});n.HashLocationProxy=function(p,o){this.app=p;this.is_native=false;this._startPolling(o)};n.HashLocationProxy.prototype={bind:function(){var o=this,p=this.app;g(i).bind("hashchange."+this.app.eventNamespace(),function(r,q){if(o.is_native===false&&!q){n.log("native hash change exists, using");o.is_native=true;i.clearInterval(n.HashLocationProxy._interval)}p.trigger("location-changed")});if(!n.HashLocationProxy._bindings){n.HashLocationProxy._bindings=0}n.HashLocationProxy._bindings++},unbind:function(){g(i).unbind("hashchange."+this.app.eventNamespace());n.HashLocationProxy._bindings--;if(n.HashLocationProxy._bindings<=0){i.clearInterval(n.HashLocationProxy._interval)}},getLocation:function(){var o=i.location.toString().match(/^[^#]*(#.+)$/);return o?o[1]:""},setLocation:function(o){return(i.location=o)},_startPolling:function(q){var p=this;if(!n.HashLocationProxy._interval){if(!q){q=10}var o=function(){var r=p.getLocation();if(!n.HashLocationProxy._last_location||r!=n.HashLocationProxy._last_location){i.setTimeout(function(){g(i).trigger("hashchange",[true])},13)}n.HashLocationProxy._last_location=r};o();n.HashLocationProxy._interval=i.setInterval(o,q)}}};n.Application=function(o){var p=this;this.routes={};this.listeners=new n.Object({});this.arounds=[];this.befores=[];this.namespace=(new Date()).getTime()+"-"+parseInt(Math.random()*1000,10);this.context_prototype=function(){n.EventContext.apply(this,arguments)};this.context_prototype.prototype=new n.EventContext();if(c(o)){o.apply(this,[this])}if(!this._location_proxy){this.setLocationProxy(new n.HashLocationProxy(this,this.run_interval_every))}if(this.debug){this.bindToAllEvents(function(r,q){p.log(p.toString(),r.cleaned_type,q||{})})}};n.Application.prototype=g.extend({},n.Object.prototype,{ROUTE_VERBS:["get","post","put","delete"],APP_EVENTS:["run","unload","lookup-route","run-route","route-found","event-context-before","event-context-after","changed","error","check-form-submission","redirect","location-changed"],_last_route:null,_location_proxy:null,_running:false,element_selector:"body",debug:false,raise_errors:false,run_interval_every:50,template_engine:null,toString:function(){return"Sammy.Application:"+this.element_selector},$element:function(){return g(this.element_selector)},use:function(){var o=b(arguments),q=o.shift(),p=q||"";try{o.unshift(this);if(typeof q=="string"){p="Sammy."+q;q=n[q]}q.apply(this,o)}catch(r){if(typeof q==="undefined"){this.error("Plugin Error: called use() but plugin ("+p.toString()+") is not defined",r)}else{if(!c(q)){this.error("Plugin Error: called use() but '"+p.toString()+"' is not a function",r)}else{this.error("Plugin Error",r)}}}return this},setLocationProxy:function(o){var p=this._location_proxy;this._location_proxy=o;if(this.isRunning()){if(p){p.unbind()}this._location_proxy.bind()}},route:function(s,p,u){var r=this,t=[],o,q;if(!u&&c(p)){p=s;u=p;s="any"}s=s.toLowerCase();if(p.constructor==String){j.lastIndex=0;while((q=j.exec(p))!==null){t.push(q[1])}p=new RegExp("^"+p.replace(j,f)+"$")}if(typeof u=="string"){u=r[u]}o=function(v){var w={verb:v,path:p,callback:u,param_names:t};r.routes[v]=r.routes[v]||[];r.routes[v].push(w)};if(s==="any"){g.each(this.ROUTE_VERBS,function(x,w){o(w)})}else{o(s)}return this},get:m("get"),post:m("post"),put:m("put"),del:m("delete"),any:m("any"),mapRoutes:function(p){var o=this;g.each(p,function(q,r){o.route.apply(o,r)});return this},eventNamespace:function(){return["sammy-app",this.namespace].join("-")},bind:function(o,q,s){var r=this;if(typeof s=="undefined"){s=q}var p=function(){var v,t,u;v=arguments[0];u=arguments[1];if(u&&u.context){t=u.context;delete u.context}else{t=new r.context_prototype(r,"bind",v.type,u,v.target)}v.cleaned_type=v.type.replace(r.eventNamespace(),"");s.apply(t,[v,u])};if(!this.listeners[o]){this.listeners[o]=[]}this.listeners[o].push(p);if(this.isRunning()){this._listen(o,p)}return this},trigger:function(o,p){this.$element().trigger([o,this.eventNamespace()].join("."),[p]);return this},refresh:function(){this.last_location=null;this.trigger("location-changed");return this},before:function(o,p){if(c(o)){p=o;o={}}this.befores.push([o,p]);return this},after:function(o){return this.bind("event-context-after",o)},around:function(o){this.arounds.push(o);return this},isRunning:function(){return this._running},helpers:function(o){g.extend(this.context_prototype.prototype,o);return this},helper:function(o,p){this.context_prototype.prototype[o]=p;return this},run:function(o){if(this.isRunning()){return false}var p=this;g.each(this.listeners.toHash(),function(q,r){g.each(r,function(t,s){p._listen(q,s)})});this.trigger("run",{start_url:o});this._running=true;this.last_location=null;if(this.getLocation()==""&&typeof o!="undefined"){this.setLocation(o)}this._checkLocation();this._location_proxy.bind();this.bind("location-changed",function(){p._checkLocation()});this.bind("submit",function(r){var q=p._checkFormSubmission(g(r.target).closest("form"));return(q===false)?r.preventDefault():false});g(i).bind("beforeunload",function(){p.unload()});return this.trigger("changed")},unload:function(){if(!this.isRunning()){return false}var o=this;this.trigger("unload");this._location_proxy.unbind();this.$element().unbind("submit").removeClass(o.eventNamespace());g.each(this.listeners.toHash(),function(p,q){g.each(q,function(s,r){o._unlisten(p,r)})});this._running=false;return this},bindToAllEvents:function(p){var o=this;g.each(this.APP_EVENTS,function(q,r){o.bind(r,p)});g.each(this.listeners.keys(true),function(r,q){if(o.APP_EVENTS.indexOf(q)==-1){o.bind(q,p)}});return this},routablePath:function(o){return o.replace(k,"")},lookupRoute:function(r,p){var q=this,o=false;this.trigger("lookup-route",{verb:r,path:p});if(typeof this.routes[r]!="undefined"){g.each(this.routes[r],function(t,s){if(q.routablePath(p).match(s.path)){o=s;return false}})}return o},runRoute:function(q,D,s,v){var r=this,B=this.lookupRoute(q,D),p,y,t,x,C,z,w,A,o;this.log("runRoute",[q,D].join(" "));this.trigger("run-route",{verb:q,path:D,params:s});if(typeof s=="undefined"){s={}}g.extend(s,this._parseQueryString(D));if(B){this.trigger("route-found",{route:B});if((A=B.path.exec(this.routablePath(D)))!==null){A.shift();g.each(A,function(E,F){if(B.param_names[E]){s[B.param_names[E]]=h(F)}else{if(!s.splat){s.splat=[]}s.splat.push(h(F))}})}p=new this.context_prototype(this,q,D,s,v);t=this.arounds.slice(0);C=this.befores.slice(0);w=[p].concat(s.splat);y=function(){var E;while(C.length>0){z=C.shift();if(r.contextMatchesOptions(p,z[0])){E=z[1].apply(p,[p]);if(E===false){return false}}}r.last_route=B;p.trigger("event-context-before",{context:p});E=B.callback.apply(p,w);p.trigger("event-context-after",{context:p});return E};g.each(t.reverse(),function(E,F){var G=y;y=function(){return F.apply(p,[G])}});try{o=y()}catch(u){this.error(["500 Error",q,D].join(" "),u)}return o}else{return this.notFound(q,D)}},contextMatchesOptions:function(r,t,p){var q=t;if(typeof q==="undefined"||q=={}){return true}if(typeof p==="undefined"){p=true}if(typeof q==="string"||c(q.test)){q={path:q}}if(q.only){return this.contextMatchesOptions(r,q.only,true)}else{if(q.except){return this.contextMatchesOptions(r,q.except,false)}}var o=true,s=true;if(q.path){if(c(q.path.test)){o=q.path.test(r.path)}else{o=(q.path.toString()===r.path)}}if(q.verb){s=q.verb===r.verb}return p?(s&&o):!(s&&o)},getLocation:function(){return this._location_proxy.getLocation()},setLocation:function(o){return this._location_proxy.setLocation(o)},swap:function(o){return this.$element().html(o)},templateCache:function(o,p){if(typeof p!="undefined"){return a[o]=p}else{return a[o]}},clearTemplateCache:function(){return a={}},notFound:function(q,p){var o=this.error(["404 Not Found",q,p].join(" "));return(q==="get")?o:true},error:function(p,o){if(!o){o=new Error()}o.message=[p,o.message].join(" ");this.trigger("error",{message:o.message,error:o});if(this.raise_errors){throw (o)}else{this.log(o.message,o)}},_checkLocation:function(){var o,p;o=this.getLocation();if(!this.last_location||this.last_location[0]!="get"||this.last_location[1]!=o){this.last_location=["get",o];p=this.runRoute("get",o)}return p},_getFormVerb:function(q){var p=g(q),r,o;o=p.find('input[name="_method"]');if(o.length>0){r=o.val()}if(!r){r=p[0].getAttribute("method")}return g.trim(r.toString().toLowerCase())},_checkFormSubmission:function(q){var o,r,t,s,p;this.trigger("check-form-submission",{form:q});o=g(q);r=o.attr("action");t=this._getFormVerb(o);if(!t||t==""){t="get"}this.log("_checkFormSubmission",o,r,t);if(t==="get"){this.setLocation(r+"?"+o.serialize());p=false}else{s=g.extend({},this._parseFormParams(o));p=this.runRoute(t,r,s,q.get(0))}return(typeof p=="undefined")?false:p},_parseFormParams:function(o){var r={},q=o.serializeArray(),p;for(p=0;p<q.length;p++){r=this._parseParamPair(r,q[p].name,q[p].value)}return r},_parseQueryString:function(r){var t={},q,p,s,o;q=r.match(k);if(q){p=q[1].split("&");for(o=0;o<p.length;o++){s=p[o].split("=");t=this._parseParamPair(t,h(s[0]),h(s[1]))}}return t},_parseParamPair:function(q,o,p){if(q[o]){if(l(q[o])){q[o].push(p)}else{q[o]=[q[o],p]}}else{q[o]=p}return q},_listen:function(o,p){return this.$element().bind([o,this.eventNamespace()].join("."),p)},_unlisten:function(o,p){return this.$element().unbind([o,this.eventNamespace()].join("."),p)}});n.RenderContext=function(o){this.event_context=o;this.callbacks=[];this.previous_content=null;this.content=null;this.next_engine=false;this.waiting=false};g.extend(n.RenderContext.prototype,{then:function(q){if(!c(q)){if(typeof q==="string"&&q in this.event_context){var p=this.event_context[q];q=function(r){return p.apply(this.event_context,[r])}}else{return this}}var o=this;if(this.waiting){this.callbacks.push(q)}else{this.wait();i.setTimeout(function(){var r=q.apply(o,[o.content,o.previous_content]);if(r!==false){o.next(r)}},13)}return this},wait:function(){this.waiting=true},next:function(o){this.waiting=false;if(typeof o!=="undefined"){this.previous_content=this.content;this.content=o}if(this.callbacks.length>0){this.then(this.callbacks.shift())}},load:function(o,p,r){var q=this;return this.then(function(){var s,t,v,u;if(c(p)){r=p;p={}}else{p=g.extend({},p)}if(r){this.then(r)}if(typeof o==="string"){v=(o.match(/\.json$/)||p.json);s=((v&&p.cache===true)||p.cache!==false);q.next_engine=q.event_context.engineFor(o);delete p.cache;delete p.json;if(p.engine){q.next_engine=p.engine;delete p.engine}if(s&&(t=this.event_context.app.templateCache(o))){return t}this.wait();g.ajax(g.extend({url:o,data:{},dataType:v?"json":null,type:"get",success:function(w){if(s){q.event_context.app.templateCache(o,w)}q.next(w)}},p));return false}else{if(o.nodeType){return o.innerHTML}if(o.selector){q.next_engine=o.attr("data-engine");if(p.clone===false){return o.remove()[0].innerHTML.toString()}else{return o[0].innerHTML.toString()}}}})},render:function(o,p,q){if(c(o)&&!p){return this.then(o)}else{if(!p&&this.content){p=this.content}return this.load(o).interpolate(p,o).then(q)}},partial:function(o,p){return this.render(o,p).swap()},send:function(){var q=this,p=b(arguments),o=p.shift();if(l(p[0])){p=p[0]}return this.then(function(r){p.push(function(s){q.next(s)});q.wait();o.apply(o,p);return false})},collect:function(s,r,o){var q=this;var p=function(){if(c(s)){r=s;s=this.content}var t=[],u=false;g.each(s,function(v,x){var w=r.apply(q,[v,x]);if(w.jquery&&w.length==1){w=w[0];u=true}t.push(w);return w});return u?t:t.join("")};return o?p():this.then(p)},renderEach:function(o,p,q,r){if(l(p)){r=q;q=p;p=null}return this.load(o).then(function(t){var s=this;if(!q){q=l(this.previous_content)?this.previous_content:[]}if(r){g.each(q,function(u,w){var x={},v=this.next_engine||o;p?(x[p]=w):(x=w);r(w,s.event_context.interpolate(t,x,v))})}else{return this.collect(q,function(u,w){var x={},v=this.next_engine||o;p?(x[p]=w):(x=w);return this.event_context.interpolate(t,x,v)},true)}})},interpolate:function(r,q,o){var p=this;return this.then(function(t,s){if(!r&&s){r=s}if(this.next_engine){q=this.next_engine;this.next_engine=false}var u=p.event_context.interpolate(t,r,q);return o?s+u:u})},swap:function(){return this.then(function(o){this.event_context.swap(o)}).trigger("changed",{})},appendTo:function(o){return this.then(function(p){g(o).append(p)}).trigger("changed",{})},prependTo:function(o){return this.then(function(p){g(o).prepend(p)}).trigger("changed",{})},replace:function(o){return this.then(function(p){g(o).html(p)}).trigger("changed",{})},trigger:function(o,p){return this.then(function(q){if(typeof p=="undefined"){p={content:q}}this.event_context.trigger(o,p)})}});n.EventContext=function(s,r,p,q,o){this.app=s;this.verb=r;this.path=p;this.params=new n.Object(q);this.target=o};n.EventContext.prototype=g.extend({},n.Object.prototype,{$element:function(){return this.app.$element()},engineFor:function(q){var p=this,o;if(c(q)){return q}q=q.toString();if((o=q.match(/\.([^\.]+)$/))){q=o[1]}if(q&&c(p[q])){return p[q]}if(p.app.template_engine){return this.engineFor(p.app.template_engine)}return function(r,s){return r}},interpolate:function(p,q,o){return this.engineFor(o).apply(this,[p,q])},render:function(o,p,q){return new n.RenderContext(this).render(o,p,q)},renderEach:function(o,p,q,r){return new n.RenderContext(this).renderEach(o,p,q,r)},load:function(o,p,q){return new n.RenderContext(this).load(o,p,q)},partial:function(o,p){return new n.RenderContext(this).partial(o,p)},send:function(){var o=new n.RenderContext(this);return o.send.apply(o,arguments)},redirect:function(){var q,p=b(arguments),o=this.app.getLocation();if(p.length>1){p.unshift("/");q=this.join.apply(this,p)}else{q=p[0]}this.trigger("redirect",{to:q});this.app.last_location=[this.verb,this.path];this.app.setLocation(q);if(o==q){this.app.trigger("location-changed")}},trigger:function(o,p){if(typeof p=="undefined"){p={}}if(!p.context){p.context=this}return this.app.trigger(o,p)},eventNamespace:function(){return this.app.eventNamespace()},swap:function(o){return this.app.swap(o)},notFound:function(){return this.app.notFound(this.verb,this.path)},json:function(o){return g.parseJSON(o)},toString:function(){return"Sammy.EventContext: "+[this.verb,this.path,this.params].join(" ")}});g.sammy=i.Sammy=n})(jQuery,window);
(function(){var n=this,A=n._,r=typeof StopIteration!=="undefined"?StopIteration:"__break__",j=Array.prototype,l=Object.prototype,o=j.slice,B=j.unshift,C=l.toString,p=l.hasOwnProperty,s=j.forEach,t=j.map,u=j.reduce,v=j.reduceRight,w=j.filter,x=j.every,y=j.some,m=j.indexOf,z=j.lastIndexOf;l=Array.isArray;var D=Object.keys,b=function(a){return new k(a)};if(typeof exports!=="undefined")exports._=b;n._=b;b.VERSION="1.0.4";var i=b.forEach=function(a,c,d){try{if(s&&a.forEach===s)a.forEach(c,d);else if(b.isNumber(a.length))for(var e=
0,f=a.length;e<f;e++)c.call(d,a[e],e,a);else for(e in a)p.call(a,e)&&c.call(d,a[e],e,a)}catch(g){if(g!=r)throw g;}return a};b.map=function(a,c,d){if(t&&a.map===t)return a.map(c,d);var e=[];i(a,function(f,g,h){e.push(c.call(d,f,g,h))});return e};b.reduce=function(a,c,d,e){if(u&&a.reduce===u)return a.reduce(b.bind(d,e),c);i(a,function(f,g,h){c=d.call(e,c,f,g,h)});return c};b.reduceRight=function(a,c,d,e){if(v&&a.reduceRight===v)return a.reduceRight(b.bind(d,e),c);a=b.clone(b.toArray(a)).reverse();return b.reduce(a,
c,d,e)};b.detect=function(a,c,d){var e;i(a,function(f,g,h){if(c.call(d,f,g,h)){e=f;b.breakLoop()}});return e};b.filter=function(a,c,d){if(w&&a.filter===w)return a.filter(c,d);var e=[];i(a,function(f,g,h){c.call(d,f,g,h)&&e.push(f)});return e};b.reject=function(a,c,d){var e=[];i(a,function(f,g,h){!c.call(d,f,g,h)&&e.push(f)});return e};b.every=function(a,c,d){c=c||b.identity;if(x&&a.every===x)return a.every(c,d);var e=true;i(a,function(f,g,h){(e=e&&c.call(d,f,g,h))||b.breakLoop()});return e};b.some=
function(a,c,d){c=c||b.identity;if(y&&a.some===y)return a.some(c,d);var e=false;i(a,function(f,g,h){if(e=c.call(d,f,g,h))b.breakLoop()});return e};b.include=function(a,c){if(m&&a.indexOf===m)return a.indexOf(c)!=-1;var d=false;i(a,function(e){if(d=e===c)b.breakLoop()});return d};b.invoke=function(a,c){var d=b.rest(arguments,2);return b.map(a,function(e){return(c?e[c]:e).apply(e,d)})};b.pluck=function(a,c){return b.map(a,function(d){return d[c]})};b.max=function(a,c,d){if(!c&&b.isArray(a))return Math.max.apply(Math,
a);var e={computed:-Infinity};i(a,function(f,g,h){g=c?c.call(d,f,g,h):f;g>=e.computed&&(e={value:f,computed:g})});return e.value};b.min=function(a,c,d){if(!c&&b.isArray(a))return Math.min.apply(Math,a);var e={computed:Infinity};i(a,function(f,g,h){g=c?c.call(d,f,g,h):f;g<e.computed&&(e={value:f,computed:g})});return e.value};b.sortBy=function(a,c,d){return b.pluck(b.map(a,function(e,f,g){return{value:e,criteria:c.call(d,e,f,g)}}).sort(function(e,f){var g=e.criteria,h=f.criteria;return g<h?-1:g>h?
1:0}),"value")};b.sortedIndex=function(a,c,d){d=d||b.identity;for(var e=0,f=a.length;e<f;){var g=e+f>>1;d(a[g])<d(c)?(e=g+1):(f=g)}return e};b.toArray=function(a){if(!a)return[];if(a.toArray)return a.toArray();if(b.isArray(a))return a;if(b.isArguments(a))return o.call(a);return b.values(a)};b.size=function(a){return b.toArray(a).length};b.first=function(a,c,d){return c&&!d?o.call(a,0,c):a[0]};b.rest=function(a,c,d){return o.call(a,b.isUndefined(c)||d?1:c)};b.last=function(a){return a[a.length-1]};
b.compact=function(a){return b.filter(a,function(c){return!!c})};b.flatten=function(a){return b.reduce(a,[],function(c,d){if(b.isArray(d))return c.concat(b.flatten(d));c.push(d);return c})};b.without=function(a){var c=b.rest(arguments);return b.filter(a,function(d){return!b.include(c,d)})};b.uniq=function(a,c){return b.reduce(a,[],function(d,e,f){if(0==f||(c===true?b.last(d)!=e:!b.include(d,e)))d.push(e);return d})};b.intersect=function(a){var c=b.rest(arguments);return b.filter(b.uniq(a),function(d){return b.every(c,
function(e){return b.indexOf(e,d)>=0})})};b.zip=function(){for(var a=b.toArray(arguments),c=b.max(b.pluck(a,"length")),d=new Array(c),e=0;e<c;e++)d[e]=b.pluck(a,String(e));return d};b.indexOf=function(a,c){if(m&&a.indexOf===m)return a.indexOf(c);for(var d=0,e=a.length;d<e;d++)if(a[d]===c)return d;return-1};b.lastIndexOf=function(a,c){if(z&&a.lastIndexOf===z)return a.lastIndexOf(c);for(var d=a.length;d--;)if(a[d]===c)return d;return-1};b.range=function(a,c,d){var e=b.toArray(arguments),f=e.length<=
1;a=f?0:e[0];c=f?e[0]:e[1];d=e[2]||1;e=Math.ceil((c-a)/d);if(e<=0)return[];e=new Array(e);f=a;for(var g=0;;f+=d){if((d>0?f-c:c-f)>=0)return e;e[g++]=f}};b.bind=function(a,c){var d=b.rest(arguments,2);return function(){return a.apply(c||{},d.concat(b.toArray(arguments)))}};b.bindAll=function(a){var c=b.rest(arguments);if(c.length==0)c=b.functions(a);i(c,function(d){a[d]=b.bind(a[d],a)});return a};b.memoize=function(a,c){var d={};c=c||b.identity;return function(){var e=c.apply(this,arguments);return e in
d?d[e]:(d[e]=a.apply(this,arguments))}};b.delay=function(a,c){var d=b.rest(arguments,2);return setTimeout(function(){return a.apply(a,d)},c)};b.defer=function(a){return b.delay.apply(b,[a,1].concat(b.rest(arguments)))};b.wrap=function(a,c){return function(){var d=[a].concat(b.toArray(arguments));return c.apply(c,d)}};b.compose=function(){var a=b.toArray(arguments);return function(){for(var c=b.toArray(arguments),d=a.length-1;d>=0;d--)c=[a[d].apply(this,c)];return c[0]}};b.keys=D||function(a){if(b.isArray(a))return b.range(0,
a.length);var c=[];for(var d in a)p.call(a,d)&&c.push(d);return c};b.values=function(a){return b.map(a,b.identity)};b.functions=function(a){return b.filter(b.keys(a),function(c){return b.isFunction(a[c])}).sort()};b.extend=function(a){i(b.rest(arguments),function(c){for(var d in c)a[d]=c[d]});return a};b.clone=function(a){if(b.isArray(a))return a.slice(0);return b.extend({},a)};b.tap=function(a,c){c(a);return a};b.isEqual=function(a,c){if(a===c)return true;var d=typeof a;if(d!=typeof c)return false;
if(a==c)return true;if(!a&&c||a&&!c)return false;if(a.isEqual)return a.isEqual(c);if(b.isDate(a)&&b.isDate(c))return a.getTime()===c.getTime();if(b.isNaN(a)&&b.isNaN(c))return false;if(b.isRegExp(a)&&b.isRegExp(c))return a.source===c.source&&a.global===c.global&&a.ignoreCase===c.ignoreCase&&a.multiline===c.multiline;if(d!=="object")return false;if(a.length&&a.length!==c.length)return false;d=b.keys(a);var e=b.keys(c);if(d.length!=e.length)return false;for(var f in a)if(!(f in c)||!b.isEqual(a[f],
c[f]))return false;return true};b.isEmpty=function(a){if(b.isArray(a)||b.isString(a))return a.length===0;for(var c in a)if(p.call(a,c))return false;return true};b.isElement=function(a){return!!(a&&a.nodeType==1)};b.isArray=l||function(a){return!!(a&&a.concat&&a.unshift&&!a.callee)};b.isArguments=function(a){return a&&a.callee};b.isFunction=function(a){return!!(a&&a.constructor&&a.call&&a.apply)};b.isString=function(a){return!!(a===""||a&&a.charCodeAt&&a.substr)};b.isNumber=function(a){return a===
+a||C.call(a)==="[object Number]"};b.isBoolean=function(a){return a===true||a===false};b.isDate=function(a){return!!(a&&a.getTimezoneOffset&&a.setUTCFullYear)};b.isRegExp=function(a){return!!(a&&a.test&&a.exec&&(a.ignoreCase||a.ignoreCase===false))};b.isNaN=function(a){return b.isNumber(a)&&isNaN(a)};b.isNull=function(a){return a===null};b.isUndefined=function(a){return typeof a=="undefined"};b.noConflict=function(){n._=A;return this};b.identity=function(a){return a};b.times=function(a,c,d){for(var e=
0;e<a;e++)c.call(d,e)};b.breakLoop=function(){throw r;};b.mixin=function(a){i(b.functions(a),function(c){E(c,b[c]=a[c])})};var F=0;b.uniqueId=function(a){var c=F++;return a?a+c:c};b.templateSettings={start:"<%",end:"%>",interpolate:/<%=(.+?)%>/g};b.template=function(a,c){var d=b.templateSettings,e=new RegExp("'(?=[^"+d.end.substr(0,1)+"]*"+d.end.replace(/([.*+?^${}()|[\]\/\\])/g,"\\$1")+")","g");d=new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+a.replace(/[\r\t\n]/g,
" ").replace(e,"\t").split("'").join("\\'").split("\t").join("'").replace(d.interpolate,"',$1,'").split(d.start).join("');").split(d.end).join("p.push('")+"');}return p.join('');");return c?d(c):d};b.each=b.forEach;b.foldl=b.inject=b.reduce;b.foldr=b.reduceRight;b.select=b.filter;b.all=b.every;b.any=b.some;b.head=b.first;b.tail=b.rest;b.methods=b.functions;var k=function(a){this._wrapped=a},q=function(a,c){return c?b(a).chain():a},E=function(a,c){k.prototype[a]=function(){var d=b.toArray(arguments);
B.call(d,this._wrapped);return q(c.apply(b,d),this._chain)}};b.mixin(b);i(["pop","push","reverse","shift","sort","splice","unshift"],function(a){var c=j[a];k.prototype[a]=function(){c.apply(this._wrapped,arguments);return q(this._wrapped,this._chain)}});i(["concat","join","slice"],function(a){var c=j[a];k.prototype[a]=function(){return q(c.apply(this._wrapped,arguments),this._chain)}});k.prototype.chain=function(){this._chain=true;return this};k.prototype.value=function(){return this._wrapped}})();
/*  js-model JavaScript library, version 0.9.3.custom
 *  (c) 2010 Ben Pickles
 *
 *  Released under MIT license.
 */
var Model=function(a,d,b){d=d||{};b=b||{};var c=function(g){this.attributes=g||{};this.changes={};this.errors=new Model.Errors(this);this.uid=[a,Model.UID.generate()].join("-");jQuery.isFunction(this.initialize)&&this.initialize()},f=d.persistence,e=d.validates;delete d.persistence;delete d.validates;jQuery.extend(c,Model.Callbacks,Model.ClassMethods,d,{_name:a,collection:[],chain:function(g){return jQuery.extend({},this,{collection:g})}});if(f)c.persistence=f(c);if(e)c.validator=Model.Validator(e);
jQuery.extend(c.prototype,Model.Callbacks,Model.InstanceMethods,Model.Validations,b);return c};
Model.Callbacks={bind:function(a,d){this.callbacks=this.callbacks||{};this.callbacks[a]=this.callbacks[a]||[];this.callbacks[a].push(d);return this},trigger:function(a,d){this.callbacks=this.callbacks||{};var b=this.callbacks[a];if(b)for(var c=0;c<b.length;c++)b[c].apply(this,d||[]);return this},unbind:function(a,d){this.callbacks=this.callbacks||{};if(d)for(var b=this.callbacks[a]||[],c=0;c<b.length;c++)b[c]===d&&this.callbacks[a].splice(c,1);else delete this.callbacks[a];return this}};
Model.ClassMethods={add:function(){for(var a=[],d=this.uids(),b=0;b<arguments.length;b++){var c=arguments[b];if(jQuery.inArray(c,this.collection)===-1&&!(c.id()&&this.find(c.id()))&&jQuery.inArray(c.uid,d)===-1){this.collection.push(c);a.push(c)}}a.length>0&&this.trigger("add",a);return this},all:function(){return this.collection},any:function(){return this.count()>0},count:function(){return this.collection.length},detect:function(a){for(var d=this.all(),b,c=0,f=d.length;c<f;c++){b=d[c];if(a.call(b,
c))return b}},each:function(a){for(var d=this.all(),b=0,c=d.length;b<c;b++)a.call(d[b],b);return this},find:function(a){return this.detect(function(){return this.id()==a})},first:function(){return this.all()[0]},load:function(a){if(this.persistence){var d=this;this.persistence.read(function(b){for(var c=0,f=b.length;c<f;c++)d.add(b[c]);a&&a.call(d,b)})}return this},last:function(){var a=this.all();return a[a.length-1]},pluck:function(a){for(var d=this.all(),b=[],c=0,f=d.length;c<f;c++)b.push(d[c].attr(a));
return b},remove:function(a){for(var d,b=0,c=this.collection.length;b<c;b++)if(this.collection[b]===a){d=b;break}if(d!=undefined){this.collection.splice(d,1);this.trigger("remove",[a]);return true}else return false},reverse:function(){return this.chain(this.all().reverse())},select:function(a){for(var d=this.all(),b=[],c,f=0,e=d.length;f<e;f++){c=d[f];a.call(c,f)&&b.push(c)}return this.chain(b)},sort:function(a){return this.chain(this.all().slice().sort(a))},sortBy:function(a){var d=jQuery.isFunction(a);
return this.sort(function(b,c){var f=d?a.call(b):b.attr(a),e=d?a.call(c):c.attr(a);return f<e?-1:f>e?1:0})},uids:function(){for(var a=this.all(),d=[],b=0,c=a.length;b<c;b++)d.push(a[b].uid);return d}};Model.Errors=function(a){this.errors={};this.model=a};
Model.Errors.prototype={add:function(a,d){this.errors[a]||(this.errors[a]=[]);this.errors[a].push(d);return this},all:function(){return this.errors},clear:function(){this.errors={};return this},each:function(a){for(var d in this.errors)for(var b=0;b<this.errors[d].length;b++)a.call(this,d,this.errors[d][b]);return this},on:function(a){return this.errors[a]||[]},size:function(){var a=0;this.each(function(){a++});return a}};
Model.InstanceMethods={attr:function(a,d){if(arguments.length===0)return jQuery.extend({},this.attributes,this.changes);else if(arguments.length===2){if(this.attributes[a]===d)delete this.changes[a];else this.changes[a]=d;return this}else if(typeof a==="object"){for(var b in a)this.attr(b,a[b]);return this}else return a in this.changes?this.changes[a]:this.attributes[a]},callPersistMethod:function(a,d){var b=this,c=function(f){if(f){b.merge(b.changes).reset();if(a==="create")b.constructor.add(b);
else a==="destroy"&&b.constructor.remove(b);b.trigger(a)}var e;if(d)e=d.apply(b,arguments);return e};this.constructor.persistence?this.constructor.persistence[a](this,c):c.call(this,true)},destroy:function(a){this.callPersistMethod("destroy",a);return this},id:function(){return this.attributes.id},merge:function(a){jQuery.extend(this.attributes,a);return this},newRecord:function(){return this.id()===undefined},reset:function(){this.errors.clear();this.changes={};return this},save:function(a){if(this.valid())this.callPersistMethod(this.newRecord()?
"create":"update",a);else a&&a(false);return this},valid:function(){this.errors.clear();this.validate();this.constructor.validator&&this.constructor.validator.run.call(this);return this.errors.size()===0},validate:function(){return this}};
Model.localStorage=function(){if(!window.localStorage)return function(){return{create:function(a,d){d(true)},destroy:function(a,d){d(true)},read:function(a){a([])},update:function(a,d){d(true)}}};return function(a){var d=[a._name,"collection"].join("-"),b=function(){var f=localStorage[d];return f?JSON.parse(f):[]},c=function(f){var e=f.uid;f=JSON.stringify(f.attr());localStorage.setItem(e,f);f=b();if(jQuery.inArray(e,f)===-1){f.push(e);localStorage.setItem(d,JSON.stringify(f))}};return{create:function(f,
e){c(f);e(true)},destroy:function(f,e){localStorage.removeItem(f.uid);var g=f.uid,h=b();g=jQuery.inArray(g,h);if(g>-1){h.splice(g,1);localStorage.setItem(d,JSON.stringify(h))}e(true)},read:function(f){if(!f)return false;for(var e=b(),g=[],h,j,i=0,k=e.length;i<k;i++){j=e[i];h=JSON.parse(localStorage[j]);h=new a(h);h.uid=j;g.push(h)}f(g)},update:function(f,e){c(f);e(true)}}}};Model.Log=function(){window.console&&window.console.log.apply(window.console,arguments)};
Model.REST=function(a,d){var b=/:([\w\d]+)/g,c=function(){for(var e=[],g;(g=b.exec(a))!==null;)e.push(g[1]);return e}(),f=jQuery.extend({path:function(e){var g=a;$.each(c,function(h,j){g=g.replace(":"+j,e.attributes[j])});return g},create:function(e,g){return this.xhr("POST",this.create_path(e),e,g)},create_path:function(e){return this.path(e)},destroy:function(e,g){return this.xhr("DELETE",this.destroy_path(e),e,g)},destroy_path:function(e){return this.update_path(e)},params:function(e){var g;if(e){var h=
e.attr();delete h.id;g={};g[e.constructor._name.toLowerCase()]=h}else g=null;if(jQuery.ajaxSettings.data)g=jQuery.extend({},jQuery.ajaxSettings.data,g);return JSON.stringify(g)},read:function(e){var g=this.klass;return this.xhr("GET",this.read_path(),null,function(h,j,i){i=jQuery.makeArray(i);h=[];j=0;for(var k=i.length;j<k;j++)h.push(new g(i[j]));e(h)})},read_path:function(){return a},update:function(e,g){return this.xhr("PUT",this.update_path(e),e,g)},update_path:function(e){return[this.path(e),
e.id()].join("/")},xhr:function(e,g,h,j){var i=this,k=e=="GET"?undefined:this.params(h);return jQuery.ajax({type:e,url:g,contentType:"application/json",dataType:"json",data:k,dataFilter:function(l){return/\S/.test(l)?l:undefined},complete:function(l,m){i.xhrComplete(l,m,h,j)}})},xhrComplete:function(e,g,h,j){var i=Model.REST["handle"+e.status];i&&i.call(this,e,g,h);g=g==="success";i=Model.REST.parseResponseData(e);g&&h&&i&&h.attr(i);j&&j.call(h,g,e,i)}},d);return function(e){f.klass=e;return f}};
Model.RestPersistence=Model.REST;Model.REST.handle422=function(a,d,b){if(a=Model.REST.parseResponseData(a)){b.errors.clear();for(var c in a)for(d=0;d<a[c].length;d++)b.errors.add(c,a[c][d])}};Model.REST.parseResponseData=function(a){try{return/\S/.test(a.responseText)?jQuery.parseJSON(a.responseText):undefined}catch(d){Model.Log(d)}};Model.UID={counter:0,generate:function(){return[(new Date).valueOf(),this.counter++].join("-")},reset:function(){this.counter=0;return this}};
Model.Validator=function(a){a=a;var d={presenceOf:function(b,c){if(c!==undefined&&c.length==0||c===undefined)this.errors.add(b,"should not be blank")},numericalityOf:function(b,c,f){var e=this,g=function(){e.errors.add(b,"should be numeric")};if(f.allowNumericStrings)!isNaN(parseFloat(c))&&isFinite(c)||g();else if(typeof c!="number"||isNaN(c))g()},lengthOf:function(b,c,f){if(c.length<f.min||c.length>f.max)this.errors.add(b,"is too short or too long")},uniquenessOf:function(b,c){var f=this;this.constructor.select(function(){return this!==
f}).select(function(){return this.attr(b)==c}).any()&&this.errors.add(b,"should be unique")}};return{run:function(){for(rule in a)if($.isArray(a[rule]))for(var b=rule,c=a[rule],f=0;f<c.length;f++)d[b].call(this,c[f],this.attr(c[f]),{});else{b=rule;c=a[rule];for(attributeName in c)d[b].call(this,attributeName,this.attr(attributeName),c[attributeName])}}}};Model.VERSION="0.9.3.custom";

/*!
 * jQuery UI 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 */
(function(c){c.ui=c.ui||{};if(!c.ui.version){c.extend(c.ui,{version:"1.8.2",plugin:{add:function(a,b,d){a=c.ui[a].prototype;for(var e in d){a.plugins[e]=a.plugins[e]||[];a.plugins[e].push([b,d[e]])}},call:function(a,b,d){if((b=a.plugins[b])&&a.element[0].parentNode)for(var e=0;e<b.length;e++)a.options[b[e][0]]&&b[e][1].apply(a.element,d)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(a,b){if(c(a).css("overflow")==
"hidden")return false;b=b&&b=="left"?"scrollLeft":"scrollTop";var d=false;if(a[b]>0)return true;a[b]=1;d=a[b]>0;a[b]=0;return d},isOverAxis:function(a,b,d){return a>b&&a<b+d},isOver:function(a,b,d,e,f,g){return c.ui.isOverAxis(a,d,f)&&c.ui.isOverAxis(b,e,g)},keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,
NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});c.fn.extend({_focus:c.fn.focus,focus:function(a,b){return typeof a==="number"?this.each(function(){var d=this;setTimeout(function(){c(d).focus();b&&b.call(d)},a)}):this._focus.apply(this,arguments)},enableSelection:function(){return this.attr("unselectable","off").css("MozUserSelect","")},disableSelection:function(){return this.attr("unselectable","on").css("MozUserSelect",
"none")},scrollParent:function(){var a;a=c.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(c.curCSS(this,"position",1))&&/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",
1))}).eq(0);return/fixed/.test(this.css("position"))||!a.length?c(document):a},zIndex:function(a){if(a!==undefined)return this.css("zIndex",a);if(this.length){a=c(this[0]);for(var b;a.length&&a[0]!==document;){b=a.css("position");if(b=="absolute"||b=="relative"||b=="fixed"){b=parseInt(a.css("zIndex"));if(!isNaN(b)&&b!=0)return b}a=a.parent()}}return 0}});c.extend(c.expr[":"],{data:function(a,b,d){return!!c.data(a,d[3])},focusable:function(a){var b=a.nodeName.toLowerCase(),d=c.attr(a,"tabindex");return(/input|select|textarea|button|object/.test(b)?
!a.disabled:"a"==b||"area"==b?a.href||!isNaN(d):!isNaN(d))&&!c(a)["area"==b?"parents":"closest"](":hidden").length},tabbable:function(a){var b=c.attr(a,"tabindex");return(isNaN(b)||b>=0)&&c(a).is(":focusable")}})}})(jQuery);
;/*
 * jQuery UI Position 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Position
 */
(function(c){c.ui=c.ui||{};var m=/left|center|right/,n=/top|center|bottom/,p=c.fn.position,q=c.fn.offset;c.fn.position=function(a){if(!a||!a.of)return p.apply(this,arguments);a=c.extend({},a);var b=c(a.of),d=(a.collision||"flip").split(" "),e=a.offset?a.offset.split(" "):[0,0],g,h,i;if(a.of.nodeType===9){g=b.width();h=b.height();i={top:0,left:0}}else if(a.of.scrollTo&&a.of.document){g=b.width();h=b.height();i={top:b.scrollTop(),left:b.scrollLeft()}}else if(a.of.preventDefault){a.at="left top";g=h=
0;i={top:a.of.pageY,left:a.of.pageX}}else{g=b.outerWidth();h=b.outerHeight();i=b.offset()}c.each(["my","at"],function(){var f=(a[this]||"").split(" ");if(f.length===1)f=m.test(f[0])?f.concat(["center"]):n.test(f[0])?["center"].concat(f):["center","center"];f[0]=m.test(f[0])?f[0]:"center";f[1]=n.test(f[1])?f[1]:"center";a[this]=f});if(d.length===1)d[1]=d[0];e[0]=parseInt(e[0],10)||0;if(e.length===1)e[1]=e[0];e[1]=parseInt(e[1],10)||0;if(a.at[0]==="right")i.left+=g;else if(a.at[0]==="center")i.left+=
g/2;if(a.at[1]==="bottom")i.top+=h;else if(a.at[1]==="center")i.top+=h/2;i.left+=e[0];i.top+=e[1];return this.each(function(){var f=c(this),k=f.outerWidth(),l=f.outerHeight(),j=c.extend({},i);if(a.my[0]==="right")j.left-=k;else if(a.my[0]==="center")j.left-=k/2;if(a.my[1]==="bottom")j.top-=l;else if(a.my[1]==="center")j.top-=l/2;j.left=parseInt(j.left);j.top=parseInt(j.top);c.each(["left","top"],function(o,r){c.ui.position[d[o]]&&c.ui.position[d[o]][r](j,{targetWidth:g,targetHeight:h,elemWidth:k,
elemHeight:l,offset:e,my:a.my,at:a.at})});c.fn.bgiframe&&f.bgiframe();f.offset(c.extend(j,{using:a.using}))})};c.ui.position={fit:{left:function(a,b){var d=c(window);b=a.left+b.elemWidth-d.width()-d.scrollLeft();a.left=b>0?a.left-b:Math.max(0,a.left)},top:function(a,b){var d=c(window);b=a.top+b.elemHeight-d.height()-d.scrollTop();a.top=b>0?a.top-b:Math.max(0,a.top)}},flip:{left:function(a,b){if(b.at[0]!=="center"){var d=c(window);d=a.left+b.elemWidth-d.width()-d.scrollLeft();var e=b.my[0]==="left"?
-b.elemWidth:b.my[0]==="right"?b.elemWidth:0,g=-2*b.offset[0];a.left+=a.left<0?e+b.targetWidth+g:d>0?e-b.targetWidth+g:0}},top:function(a,b){if(b.at[1]!=="center"){var d=c(window);d=a.top+b.elemHeight-d.height()-d.scrollTop();var e=b.my[1]==="top"?-b.elemHeight:b.my[1]==="bottom"?b.elemHeight:0,g=b.at[1]==="top"?b.targetHeight:-b.targetHeight,h=-2*b.offset[1];a.top+=a.top<0?e+b.targetHeight+h:d>0?e+g+h:0}}}};if(!c.offset.setOffset){c.offset.setOffset=function(a,b){if(/static/.test(c.curCSS(a,"position")))a.style.position=
"relative";var d=c(a),e=d.offset(),g=parseInt(c.curCSS(a,"top",true),10)||0,h=parseInt(c.curCSS(a,"left",true),10)||0;e={top:b.top-e.top+g,left:b.left-e.left+h};"using"in b?b.using.call(a,e):d.css(e)};c.fn.offset=function(a){var b=this[0];if(!b||!b.ownerDocument)return null;if(a)return this.each(function(){c.offset.setOffset(this,a)});return q.call(this)}}})(jQuery);
;/*
 * jQuery UI Effects 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/
 */
jQuery.effects||function(f){function k(c){var a;if(c&&c.constructor==Array&&c.length==3)return c;if(a=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(c))return[parseInt(a[1],10),parseInt(a[2],10),parseInt(a[3],10)];if(a=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(c))return[parseFloat(a[1])*2.55,parseFloat(a[2])*2.55,parseFloat(a[3])*2.55];if(a=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(c))return[parseInt(a[1],
16),parseInt(a[2],16),parseInt(a[3],16)];if(a=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(c))return[parseInt(a[1]+a[1],16),parseInt(a[2]+a[2],16),parseInt(a[3]+a[3],16)];if(/rgba\(0, 0, 0, 0\)/.exec(c))return l.transparent;return l[f.trim(c).toLowerCase()]}function q(c,a){var b;do{b=f.curCSS(c,a);if(b!=""&&b!="transparent"||f.nodeName(c,"body"))break;a="backgroundColor"}while(c=c.parentNode);return k(b)}function m(){var c=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,
a={},b,d;if(c&&c.length&&c[0]&&c[c[0]])for(var e=c.length;e--;){b=c[e];if(typeof c[b]=="string"){d=b.replace(/\-(\w)/g,function(g,h){return h.toUpperCase()});a[d]=c[b]}}else for(b in c)if(typeof c[b]==="string")a[b]=c[b];return a}function n(c){var a,b;for(a in c){b=c[a];if(b==null||f.isFunction(b)||a in r||/scrollbar/.test(a)||!/color/i.test(a)&&isNaN(parseFloat(b)))delete c[a]}return c}function s(c,a){var b={_:0},d;for(d in a)if(c[d]!=a[d])b[d]=a[d];return b}function j(c,a,b,d){if(typeof c=="object"){d=
a;b=null;a=c;c=a.effect}if(f.isFunction(a)){d=a;b=null;a={}}if(f.isFunction(b)){d=b;b=null}if(typeof a=="number"||f.fx.speeds[a]){d=b;b=a;a={}}a=a||{};b=b||a.duration;b=f.fx.off?0:typeof b=="number"?b:f.fx.speeds[b]||f.fx.speeds._default;d=d||a.complete;return[c,a,b,d]}f.effects={};f.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(c,a){f.fx.step[a]=function(b){if(!b.colorInit){b.start=q(b.elem,a);b.end=k(b.end);b.colorInit=
true}b.elem.style[a]="rgb("+Math.max(Math.min(parseInt(b.pos*(b.end[0]-b.start[0])+b.start[0],10),255),0)+","+Math.max(Math.min(parseInt(b.pos*(b.end[1]-b.start[1])+b.start[1],10),255),0)+","+Math.max(Math.min(parseInt(b.pos*(b.end[2]-b.start[2])+b.start[2],10),255),0)+")"}});var l={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,
183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,
165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]},o=["add","remove","toggle"],r={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};f.effects.animateClass=function(c,a,b,d){if(f.isFunction(b)){d=b;b=null}return this.each(function(){var e=f(this),g=e.attr("style")||" ",h=n(m.call(this)),p,t=e.attr("className");f.each(o,function(u,
i){c[i]&&e[i+"Class"](c[i])});p=n(m.call(this));e.attr("className",t);e.animate(s(h,p),a,b,function(){f.each(o,function(u,i){c[i]&&e[i+"Class"](c[i])});if(typeof e.attr("style")=="object"){e.attr("style").cssText="";e.attr("style").cssText=g}else e.attr("style",g);d&&d.apply(this,arguments)})})};f.fn.extend({_addClass:f.fn.addClass,addClass:function(c,a,b,d){return a?f.effects.animateClass.apply(this,[{add:c},a,b,d]):this._addClass(c)},_removeClass:f.fn.removeClass,removeClass:function(c,a,b,d){return a?
f.effects.animateClass.apply(this,[{remove:c},a,b,d]):this._removeClass(c)},_toggleClass:f.fn.toggleClass,toggleClass:function(c,a,b,d,e){return typeof a=="boolean"||a===undefined?b?f.effects.animateClass.apply(this,[a?{add:c}:{remove:c},b,d,e]):this._toggleClass(c,a):f.effects.animateClass.apply(this,[{toggle:c},a,b,d])},switchClass:function(c,a,b,d,e){return f.effects.animateClass.apply(this,[{add:a,remove:c},b,d,e])}});f.extend(f.effects,{version:"1.8.2",save:function(c,a){for(var b=0;b<a.length;b++)a[b]!==
null&&c.data("ec.storage."+a[b],c[0].style[a[b]])},restore:function(c,a){for(var b=0;b<a.length;b++)a[b]!==null&&c.css(a[b],c.data("ec.storage."+a[b]))},setMode:function(c,a){if(a=="toggle")a=c.is(":hidden")?"show":"hide";return a},getBaseline:function(c,a){var b;switch(c[0]){case "top":b=0;break;case "middle":b=0.5;break;case "bottom":b=1;break;default:b=c[0]/a.height}switch(c[1]){case "left":c=0;break;case "center":c=0.5;break;case "right":c=1;break;default:c=c[1]/a.width}return{x:c,y:b}},createWrapper:function(c){if(c.parent().is(".ui-effects-wrapper"))return c.parent();
var a={width:c.outerWidth(true),height:c.outerHeight(true),"float":c.css("float")},b=f("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0});c.wrap(b);b=c.parent();if(c.css("position")=="static"){b.css({position:"relative"});c.css({position:"relative"})}else{f.extend(a,{position:c.css("position"),zIndex:c.css("z-index")});f.each(["top","left","bottom","right"],function(d,e){a[e]=c.css(e);if(isNaN(parseInt(a[e],10)))a[e]="auto"});
c.css({position:"relative",top:0,left:0})}return b.css(a).show()},removeWrapper:function(c){if(c.parent().is(".ui-effects-wrapper"))return c.parent().replaceWith(c);return c},setTransition:function(c,a,b,d){d=d||{};f.each(a,function(e,g){unit=c.cssUnit(g);if(unit[0]>0)d[g]=unit[0]*b+unit[1]});return d}});f.fn.extend({effect:function(c){var a=j.apply(this,arguments);a={options:a[1],duration:a[2],callback:a[3]};var b=f.effects[c];return b&&!f.fx.off?b.call(this,a):this},_show:f.fn.show,show:function(c){if(!c||
typeof c=="number"||f.fx.speeds[c])return this._show.apply(this,arguments);else{var a=j.apply(this,arguments);a[1].mode="show";return this.effect.apply(this,a)}},_hide:f.fn.hide,hide:function(c){if(!c||typeof c=="number"||f.fx.speeds[c])return this._hide.apply(this,arguments);else{var a=j.apply(this,arguments);a[1].mode="hide";return this.effect.apply(this,a)}},__toggle:f.fn.toggle,toggle:function(c){if(!c||typeof c=="number"||f.fx.speeds[c]||typeof c=="boolean"||f.isFunction(c))return this.__toggle.apply(this,
arguments);else{var a=j.apply(this,arguments);a[1].mode="toggle";return this.effect.apply(this,a)}},cssUnit:function(c){var a=this.css(c),b=[];f.each(["em","px","%","pt"],function(d,e){if(a.indexOf(e)>0)b=[parseFloat(a),e]});return b}});f.easing.jswing=f.easing.swing;f.extend(f.easing,{def:"easeOutQuad",swing:function(c,a,b,d,e){return f.easing[f.easing.def](c,a,b,d,e)},easeInQuad:function(c,a,b,d,e){return d*(a/=e)*a+b},easeOutQuad:function(c,a,b,d,e){return-d*(a/=e)*(a-2)+b},easeInOutQuad:function(c,
a,b,d,e){if((a/=e/2)<1)return d/2*a*a+b;return-d/2*(--a*(a-2)-1)+b},easeInCubic:function(c,a,b,d,e){return d*(a/=e)*a*a+b},easeOutCubic:function(c,a,b,d,e){return d*((a=a/e-1)*a*a+1)+b},easeInOutCubic:function(c,a,b,d,e){if((a/=e/2)<1)return d/2*a*a*a+b;return d/2*((a-=2)*a*a+2)+b},easeInQuart:function(c,a,b,d,e){return d*(a/=e)*a*a*a+b},easeOutQuart:function(c,a,b,d,e){return-d*((a=a/e-1)*a*a*a-1)+b},easeInOutQuart:function(c,a,b,d,e){if((a/=e/2)<1)return d/2*a*a*a*a+b;return-d/2*((a-=2)*a*a*a-2)+
b},easeInQuint:function(c,a,b,d,e){return d*(a/=e)*a*a*a*a+b},easeOutQuint:function(c,a,b,d,e){return d*((a=a/e-1)*a*a*a*a+1)+b},easeInOutQuint:function(c,a,b,d,e){if((a/=e/2)<1)return d/2*a*a*a*a*a+b;return d/2*((a-=2)*a*a*a*a+2)+b},easeInSine:function(c,a,b,d,e){return-d*Math.cos(a/e*(Math.PI/2))+d+b},easeOutSine:function(c,a,b,d,e){return d*Math.sin(a/e*(Math.PI/2))+b},easeInOutSine:function(c,a,b,d,e){return-d/2*(Math.cos(Math.PI*a/e)-1)+b},easeInExpo:function(c,a,b,d,e){return a==0?b:d*Math.pow(2,
10*(a/e-1))+b},easeOutExpo:function(c,a,b,d,e){return a==e?b+d:d*(-Math.pow(2,-10*a/e)+1)+b},easeInOutExpo:function(c,a,b,d,e){if(a==0)return b;if(a==e)return b+d;if((a/=e/2)<1)return d/2*Math.pow(2,10*(a-1))+b;return d/2*(-Math.pow(2,-10*--a)+2)+b},easeInCirc:function(c,a,b,d,e){return-d*(Math.sqrt(1-(a/=e)*a)-1)+b},easeOutCirc:function(c,a,b,d,e){return d*Math.sqrt(1-(a=a/e-1)*a)+b},easeInOutCirc:function(c,a,b,d,e){if((a/=e/2)<1)return-d/2*(Math.sqrt(1-a*a)-1)+b;return d/2*(Math.sqrt(1-(a-=2)*
a)+1)+b},easeInElastic:function(c,a,b,d,e){c=1.70158;var g=0,h=d;if(a==0)return b;if((a/=e)==1)return b+d;g||(g=e*0.3);if(h<Math.abs(d)){h=d;c=g/4}else c=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(a-=1))*Math.sin((a*e-c)*2*Math.PI/g))+b},easeOutElastic:function(c,a,b,d,e){c=1.70158;var g=0,h=d;if(a==0)return b;if((a/=e)==1)return b+d;g||(g=e*0.3);if(h<Math.abs(d)){h=d;c=g/4}else c=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*a)*Math.sin((a*e-c)*2*Math.PI/g)+d+b},easeInOutElastic:function(c,
a,b,d,e){c=1.70158;var g=0,h=d;if(a==0)return b;if((a/=e/2)==2)return b+d;g||(g=e*0.3*1.5);if(h<Math.abs(d)){h=d;c=g/4}else c=g/(2*Math.PI)*Math.asin(d/h);if(a<1)return-0.5*h*Math.pow(2,10*(a-=1))*Math.sin((a*e-c)*2*Math.PI/g)+b;return h*Math.pow(2,-10*(a-=1))*Math.sin((a*e-c)*2*Math.PI/g)*0.5+d+b},easeInBack:function(c,a,b,d,e,g){if(g==undefined)g=1.70158;return d*(a/=e)*a*((g+1)*a-g)+b},easeOutBack:function(c,a,b,d,e,g){if(g==undefined)g=1.70158;return d*((a=a/e-1)*a*((g+1)*a+g)+1)+b},easeInOutBack:function(c,
a,b,d,e,g){if(g==undefined)g=1.70158;if((a/=e/2)<1)return d/2*a*a*(((g*=1.525)+1)*a-g)+b;return d/2*((a-=2)*a*(((g*=1.525)+1)*a+g)+2)+b},easeInBounce:function(c,a,b,d,e){return d-f.easing.easeOutBounce(c,e-a,0,d,e)+b},easeOutBounce:function(c,a,b,d,e){return(a/=e)<1/2.75?d*7.5625*a*a+b:a<2/2.75?d*(7.5625*(a-=1.5/2.75)*a+0.75)+b:a<2.5/2.75?d*(7.5625*(a-=2.25/2.75)*a+0.9375)+b:d*(7.5625*(a-=2.625/2.75)*a+0.984375)+b},easeInOutBounce:function(c,a,b,d,e){if(a<e/2)return f.easing.easeInBounce(c,a*2,0,
d,e)*0.5+b;return f.easing.easeOutBounce(c,a*2-e,0,d,e)*0.5+d*0.5+b}})}(jQuery);
;/*
 * jQuery UI Effects Blind 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Blind
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(b){b.effects.blind=function(c){return this.queue(function(){var a=b(this),g=["position","top","left"],f=b.effects.setMode(a,c.options.mode||"hide"),d=c.options.direction||"vertical";b.effects.save(a,g);a.show();var e=b.effects.createWrapper(a).css({overflow:"hidden"}),h=d=="vertical"?"height":"width";d=d=="vertical"?e.height():e.width();f=="show"&&e.css(h,0);var i={};i[h]=f=="show"?d:0;e.animate(i,c.duration,c.options.easing,function(){f=="hide"&&a.hide();b.effects.restore(a,g);b.effects.removeWrapper(a);
c.callback&&c.callback.apply(a[0],arguments);a.dequeue()})})}})(jQuery);
;/*
 * jQuery UI Effects Bounce 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Bounce
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(e){e.effects.bounce=function(b){return this.queue(function(){var a=e(this),l=["position","top","left"],h=e.effects.setMode(a,b.options.mode||"effect"),d=b.options.direction||"up",c=b.options.distance||20,m=b.options.times||5,i=b.duration||250;/show|hide/.test(h)&&l.push("opacity");e.effects.save(a,l);a.show();e.effects.createWrapper(a);var f=d=="up"||d=="down"?"top":"left";d=d=="up"||d=="left"?"pos":"neg";c=b.options.distance||(f=="top"?a.outerHeight({margin:true})/3:a.outerWidth({margin:true})/
3);if(h=="show")a.css("opacity",0).css(f,d=="pos"?-c:c);if(h=="hide")c/=m*2;h!="hide"&&m--;if(h=="show"){var g={opacity:1};g[f]=(d=="pos"?"+=":"-=")+c;a.animate(g,i/2,b.options.easing);c/=2;m--}for(g=0;g<m;g++){var j={},k={};j[f]=(d=="pos"?"-=":"+=")+c;k[f]=(d=="pos"?"+=":"-=")+c;a.animate(j,i/2,b.options.easing).animate(k,i/2,b.options.easing);c=h=="hide"?c*2:c/2}if(h=="hide"){g={opacity:0};g[f]=(d=="pos"?"-=":"+=")+c;a.animate(g,i/2,b.options.easing,function(){a.hide();e.effects.restore(a,l);e.effects.removeWrapper(a);
b.callback&&b.callback.apply(this,arguments)})}else{j={};k={};j[f]=(d=="pos"?"-=":"+=")+c;k[f]=(d=="pos"?"+=":"-=")+c;a.animate(j,i/2,b.options.easing).animate(k,i/2,b.options.easing,function(){e.effects.restore(a,l);e.effects.removeWrapper(a);b.callback&&b.callback.apply(this,arguments)})}a.queue("fx",function(){a.dequeue()});a.dequeue()})}})(jQuery);
;/*
 * jQuery UI Effects Clip 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Clip
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(b){b.effects.clip=function(e){return this.queue(function(){var a=b(this),i=["position","top","left","height","width"],f=b.effects.setMode(a,e.options.mode||"hide"),c=e.options.direction||"vertical";b.effects.save(a,i);a.show();var d=b.effects.createWrapper(a).css({overflow:"hidden"});d=a[0].tagName=="IMG"?d:a;var g={size:c=="vertical"?"height":"width",position:c=="vertical"?"top":"left"};c=c=="vertical"?d.height():d.width();if(f=="show"){d.css(g.size,0);d.css(g.position,c/2)}var h={};h[g.size]=
f=="show"?c:0;h[g.position]=f=="show"?0:c/2;d.animate(h,{queue:false,duration:e.duration,easing:e.options.easing,complete:function(){f=="hide"&&a.hide();b.effects.restore(a,i);b.effects.removeWrapper(a);e.callback&&e.callback.apply(a[0],arguments);a.dequeue()}})})}})(jQuery);
;/*
 * jQuery UI Effects Drop 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Drop
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(c){c.effects.drop=function(d){return this.queue(function(){var a=c(this),h=["position","top","left","opacity"],e=c.effects.setMode(a,d.options.mode||"hide"),b=d.options.direction||"left";c.effects.save(a,h);a.show();c.effects.createWrapper(a);var f=b=="up"||b=="down"?"top":"left";b=b=="up"||b=="left"?"pos":"neg";var g=d.options.distance||(f=="top"?a.outerHeight({margin:true})/2:a.outerWidth({margin:true})/2);if(e=="show")a.css("opacity",0).css(f,b=="pos"?-g:g);var i={opacity:e=="show"?1:
0};i[f]=(e=="show"?b=="pos"?"+=":"-=":b=="pos"?"-=":"+=")+g;a.animate(i,{queue:false,duration:d.duration,easing:d.options.easing,complete:function(){e=="hide"&&a.hide();c.effects.restore(a,h);c.effects.removeWrapper(a);d.callback&&d.callback.apply(this,arguments);a.dequeue()}})})}})(jQuery);
;/*
 * jQuery UI Effects Explode 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Explode
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(j){j.effects.explode=function(a){return this.queue(function(){var c=a.options.pieces?Math.round(Math.sqrt(a.options.pieces)):3,d=a.options.pieces?Math.round(Math.sqrt(a.options.pieces)):3;a.options.mode=a.options.mode=="toggle"?j(this).is(":visible")?"hide":"show":a.options.mode;var b=j(this).show().css("visibility","hidden"),g=b.offset();g.top-=parseInt(b.css("marginTop"),10)||0;g.left-=parseInt(b.css("marginLeft"),10)||0;for(var h=b.outerWidth(true),i=b.outerHeight(true),e=0;e<c;e++)for(var f=
0;f<d;f++)b.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-f*(h/d),top:-e*(i/c)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:h/d,height:i/c,left:g.left+f*(h/d)+(a.options.mode=="show"?(f-Math.floor(d/2))*(h/d):0),top:g.top+e*(i/c)+(a.options.mode=="show"?(e-Math.floor(c/2))*(i/c):0),opacity:a.options.mode=="show"?0:1}).animate({left:g.left+f*(h/d)+(a.options.mode=="show"?0:(f-Math.floor(d/2))*(h/d)),top:g.top+
e*(i/c)+(a.options.mode=="show"?0:(e-Math.floor(c/2))*(i/c)),opacity:a.options.mode=="show"?1:0},a.duration||500);setTimeout(function(){a.options.mode=="show"?b.css({visibility:"visible"}):b.css({visibility:"visible"}).hide();a.callback&&a.callback.apply(b[0]);b.dequeue();j("div.ui-effects-explode").remove()},a.duration||500)})}})(jQuery);
;/*
 * jQuery UI Effects Fold 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Fold
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(c){c.effects.fold=function(a){return this.queue(function(){var b=c(this),j=["position","top","left"],d=c.effects.setMode(b,a.options.mode||"hide"),g=a.options.size||15,h=!!a.options.horizFirst,k=a.duration?a.duration/2:c.fx.speeds._default/2;c.effects.save(b,j);b.show();var e=c.effects.createWrapper(b).css({overflow:"hidden"}),f=d=="show"!=h,l=f?["width","height"]:["height","width"];f=f?[e.width(),e.height()]:[e.height(),e.width()];var i=/([0-9]+)%/.exec(g);if(i)g=parseInt(i[1],10)/100*
f[d=="hide"?0:1];if(d=="show")e.css(h?{height:0,width:g}:{height:g,width:0});h={};i={};h[l[0]]=d=="show"?f[0]:g;i[l[1]]=d=="show"?f[1]:0;e.animate(h,k,a.options.easing).animate(i,k,a.options.easing,function(){d=="hide"&&b.hide();c.effects.restore(b,j);c.effects.removeWrapper(b);a.callback&&a.callback.apply(b[0],arguments);b.dequeue()})})}})(jQuery);
;/*
 * jQuery UI Effects Highlight 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Highlight
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(b){b.effects.highlight=function(c){return this.queue(function(){var a=b(this),e=["backgroundImage","backgroundColor","opacity"],d=b.effects.setMode(a,c.options.mode||"show"),f={backgroundColor:a.css("backgroundColor")};if(d=="hide")f.opacity=0;b.effects.save(a,e);a.show().css({backgroundImage:"none",backgroundColor:c.options.color||"#ffff99"}).animate(f,{queue:false,duration:c.duration,easing:c.options.easing,complete:function(){d=="hide"&&a.hide();b.effects.restore(a,e);d=="show"&&!b.support.opacity&&
this.style.removeAttribute("filter");c.callback&&c.callback.apply(this,arguments);a.dequeue()}})})}})(jQuery);
;/*
 * jQuery UI Effects Pulsate 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Pulsate
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(d){d.effects.pulsate=function(a){return this.queue(function(){var b=d(this),c=d.effects.setMode(b,a.options.mode||"show");times=(a.options.times||5)*2-1;duration=a.duration?a.duration/2:d.fx.speeds._default/2;isVisible=b.is(":visible");animateTo=0;if(!isVisible){b.css("opacity",0).show();animateTo=1}if(c=="hide"&&isVisible||c=="show"&&!isVisible)times--;for(c=0;c<times;c++){b.animate({opacity:animateTo},duration,a.options.easing);animateTo=(animateTo+1)%2}b.animate({opacity:animateTo},duration,
a.options.easing,function(){animateTo==0&&b.hide();a.callback&&a.callback.apply(this,arguments)});b.queue("fx",function(){b.dequeue()}).dequeue()})}})(jQuery);
;/*
 * jQuery UI Effects Scale 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Scale
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(c){c.effects.puff=function(b){return this.queue(function(){var a=c(this),e=c.effects.setMode(a,b.options.mode||"hide"),g=parseInt(b.options.percent,10)||150,h=g/100,i={height:a.height(),width:a.width()};c.extend(b.options,{fade:true,mode:e,percent:e=="hide"?g:100,from:e=="hide"?i:{height:i.height*h,width:i.width*h}});a.effect("scale",b.options,b.duration,b.callback);a.dequeue()})};c.effects.scale=function(b){return this.queue(function(){var a=c(this),e=c.extend(true,{},b.options),g=c.effects.setMode(a,
b.options.mode||"effect"),h=parseInt(b.options.percent,10)||(parseInt(b.options.percent,10)==0?0:g=="hide"?0:100),i=b.options.direction||"both",f=b.options.origin;if(g!="effect"){e.origin=f||["middle","center"];e.restore=true}f={height:a.height(),width:a.width()};a.from=b.options.from||(g=="show"?{height:0,width:0}:f);h={y:i!="horizontal"?h/100:1,x:i!="vertical"?h/100:1};a.to={height:f.height*h.y,width:f.width*h.x};if(b.options.fade){if(g=="show"){a.from.opacity=0;a.to.opacity=1}if(g=="hide"){a.from.opacity=
1;a.to.opacity=0}}e.from=a.from;e.to=a.to;e.mode=g;a.effect("size",e,b.duration,b.callback);a.dequeue()})};c.effects.size=function(b){return this.queue(function(){var a=c(this),e=["position","top","left","width","height","overflow","opacity"],g=["position","top","left","overflow","opacity"],h=["width","height","overflow"],i=["fontSize"],f=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],k=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],p=c.effects.setMode(a,
b.options.mode||"effect"),n=b.options.restore||false,m=b.options.scale||"both",l=b.options.origin,j={height:a.height(),width:a.width()};a.from=b.options.from||j;a.to=b.options.to||j;if(l){l=c.effects.getBaseline(l,j);a.from.top=(j.height-a.from.height)*l.y;a.from.left=(j.width-a.from.width)*l.x;a.to.top=(j.height-a.to.height)*l.y;a.to.left=(j.width-a.to.width)*l.x}var d={from:{y:a.from.height/j.height,x:a.from.width/j.width},to:{y:a.to.height/j.height,x:a.to.width/j.width}};if(m=="box"||m=="both"){if(d.from.y!=
d.to.y){e=e.concat(f);a.from=c.effects.setTransition(a,f,d.from.y,a.from);a.to=c.effects.setTransition(a,f,d.to.y,a.to)}if(d.from.x!=d.to.x){e=e.concat(k);a.from=c.effects.setTransition(a,k,d.from.x,a.from);a.to=c.effects.setTransition(a,k,d.to.x,a.to)}}if(m=="content"||m=="both")if(d.from.y!=d.to.y){e=e.concat(i);a.from=c.effects.setTransition(a,i,d.from.y,a.from);a.to=c.effects.setTransition(a,i,d.to.y,a.to)}c.effects.save(a,n?e:g);a.show();c.effects.createWrapper(a);a.css("overflow","hidden").css(a.from);
if(m=="content"||m=="both"){f=f.concat(["marginTop","marginBottom"]).concat(i);k=k.concat(["marginLeft","marginRight"]);h=e.concat(f).concat(k);a.find("*[width]").each(function(){child=c(this);n&&c.effects.save(child,h);var o={height:child.height(),width:child.width()};child.from={height:o.height*d.from.y,width:o.width*d.from.x};child.to={height:o.height*d.to.y,width:o.width*d.to.x};if(d.from.y!=d.to.y){child.from=c.effects.setTransition(child,f,d.from.y,child.from);child.to=c.effects.setTransition(child,
f,d.to.y,child.to)}if(d.from.x!=d.to.x){child.from=c.effects.setTransition(child,k,d.from.x,child.from);child.to=c.effects.setTransition(child,k,d.to.x,child.to)}child.css(child.from);child.animate(child.to,b.duration,b.options.easing,function(){n&&c.effects.restore(child,h)})})}a.animate(a.to,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){a.to.opacity===0&&a.css("opacity",a.from.opacity);p=="hide"&&a.hide();c.effects.restore(a,n?e:g);c.effects.removeWrapper(a);b.callback&&
b.callback.apply(this,arguments);a.dequeue()}})})}})(jQuery);
;/*
 * jQuery UI Effects Shake 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Shake
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(d){d.effects.shake=function(a){return this.queue(function(){var b=d(this),j=["position","top","left"];d.effects.setMode(b,a.options.mode||"effect");var c=a.options.direction||"left",e=a.options.distance||20,l=a.options.times||3,f=a.duration||a.options.duration||140;d.effects.save(b,j);b.show();d.effects.createWrapper(b);var g=c=="up"||c=="down"?"top":"left",h=c=="up"||c=="left"?"pos":"neg";c={};var i={},k={};c[g]=(h=="pos"?"-=":"+=")+e;i[g]=(h=="pos"?"+=":"-=")+e*2;k[g]=(h=="pos"?"-=":"+=")+
e*2;b.animate(c,f,a.options.easing);for(e=1;e<l;e++)b.animate(i,f,a.options.easing).animate(k,f,a.options.easing);b.animate(i,f,a.options.easing).animate(c,f/2,a.options.easing,function(){d.effects.restore(b,j);d.effects.removeWrapper(b);a.callback&&a.callback.apply(this,arguments)});b.queue("fx",function(){b.dequeue()});b.dequeue()})}})(jQuery);
;/*
 * jQuery UI Effects Slide 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Slide
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(c){c.effects.slide=function(d){return this.queue(function(){var a=c(this),h=["position","top","left"],e=c.effects.setMode(a,d.options.mode||"show"),b=d.options.direction||"left";c.effects.save(a,h);a.show();c.effects.createWrapper(a).css({overflow:"hidden"});var f=b=="up"||b=="down"?"top":"left";b=b=="up"||b=="left"?"pos":"neg";var g=d.options.distance||(f=="top"?a.outerHeight({margin:true}):a.outerWidth({margin:true}));if(e=="show")a.css(f,b=="pos"?-g:g);var i={};i[f]=(e=="show"?b=="pos"?
"+=":"-=":b=="pos"?"-=":"+=")+g;a.animate(i,{queue:false,duration:d.duration,easing:d.options.easing,complete:function(){e=="hide"&&a.hide();c.effects.restore(a,h);c.effects.removeWrapper(a);d.callback&&d.callback.apply(this,arguments);a.dequeue()}})})}})(jQuery);
;/*
 * jQuery UI Effects Transfer 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Transfer
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(e){e.effects.transfer=function(a){return this.queue(function(){var b=e(this),c=e(a.options.to),d=c.offset();c={top:d.top,left:d.left,height:c.innerHeight(),width:c.innerWidth()};d=b.offset();var f=e('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(a.options.className).css({top:d.top,left:d.left,height:b.innerHeight(),width:b.innerWidth(),position:"absolute"}).animate(c,a.duration,a.options.easing,function(){f.remove();a.callback&&a.callback.apply(b[0],arguments);
b.dequeue()})})}})(jQuery);
;
/*  Jam JavaScript Widget library, version 0.2.1
 *  (c) 2010 Oliver Nightingale
 *
 *  Released under MIT license.
 */

Jam = {
  version: '0.2.1',
  newObjectFrom: function (oldObject) {
    function F() {};
    F.prototype = oldObject;
    return new F();
  }
}

Jam.Base = function (name, options) {
  var base = {};
  var containerSelector = options.containerSelector || 'body';
  var eventHandler = options.eventHandler || $(document);
  var errorPrefix = 'Jam.Base';
  var name = name;
  var templateSelector = options.templateSelector;
  var template = $(templateSelector);
  var widget = options.widget;
  var eventNamespace = function () {
    return name + ':' + widget;
  };

  var populate = function () {

  };

  base.bind = function (eventName, callback) {
    eventHandler.bind(eventName + '.' + eventNamespace(), callback);
    return this;
  };

  base.htmlClass = function (className) {
    return name + ' ' + widget + '-' + className;
  };

  base.container = function () {
    return $(containerSelector);
  };

  base.generateHtml = function () {
    populate.call(this);
    
    addBehaviour.call(this);
    return this.html;
  };

  base.html = template.clone();

  base.insertHtml = function () {
    this.container().html(this.html);
  };

  base.options = function () {
    return options;
  };

  base.render = function () {
    this.generateHtml();
    this.insertHtml();
  };

  base.remove = function () {
    this.html.remove();
    eventHandler.unbind('.' + eventNamespace());
  };

  base.resetHtml = function () {
    this.html = template.clone();
  };

  base.trigger = function (eventName, data) {
    eventHandler.trigger(eventName + '.' + eventNamespace(), data);
  };

  return base;
};
Jam.CollectionView = function (name, options) {
  var collectionView = Jam.newObjectFrom(Jam.Base(name, options));
  var collection = options.collection || []

  collectionView.collectionIsEmpty = function () {
    return collection.length === 0
  }

  collectionView.collection = function () {
    return collection;
  }

  collectionView.emptyCollection = function () {
    collection = [];
    this.trigger('collectionEmptied')
  };

  collectionView.setCollection = function (newCollection) {
    collection = newCollection;
    this.trigger('collectionUpdated', collection);
    return collection;
  };

  collectionView.updateCollection = function (newCollection) {
    collection = newCollection
    this.trigger('collectionUpdated', collection);
    this.resetHtml()
    this.render()
    return collection;
  };

  return collectionView;
}
Jam.GridView = function (name, options) {
  var defaults = {
    paginationSpeed: 800,
    paginationEasing: 'swing'
  }
  var options = $.extend(defaults, options, {'widget': 'grid-view'})
  var gridView = Jam.newObjectFrom(Jam.CollectionView(name, options))
  var currentPage = 1
  var perPage = parseInt(options.perPage) || 1
  var self = this
  var pageTemplate = $('<ul class="grid-view-page clearfix"></ul>')
  var pageControlsTemplate = $('<div class="grid-view-page-controls clearfix"><div class="page-link backward"></div><div class="page-link forward"></div></div>')
  var girdItemWidth = parseInt(gridView.options().pageWidth) / gridView.options().gridWidth + 'px'
  var gridItemWrap = $('<li class="grid-view-item"></li>').css({
    'float': 'left',
    'width': girdItemWidth
  })

  var addStyles = function () {
    this.container().css({
      'width': options.pageWidth
    })
    this.html
      .find('.grid-page-holder')
        .css({
          'min-width': '10000px',
          'position': 'absolute'
        })
        .end()
      .find('.grid-view-port')
        .css({
          'overflow': 'hidden',
          'position': 'relative',
          'width': options.pageWidth,
          'height': options.pageHeight
        })
        .end()
      .find('.grid-view-page')
        .css({
          'padding': '0px',
          'float': 'left',
          'width': options.pageWidth,
          'height': options.pageHeight
        })
  }

  var displayCurrentPage = function () {
    if (currentPage > pagesRequired()) { currentPage = pagesRequired() };
    this.html.find('.grid-page-holder').css({'left': pagePosition(currentPage)});
  };

  var drawBlankState = function () {
    if (options.blankStateHtml) {
      this.html.find('.grid-page-holder')
        .append(pageTemplate.clone().append(options.blankStateHtml));
    };
  };

  var drawPage = function (pageNum) {
    var startIndex = (pageNum - 1) * options.perPage;
    var endIndex = pageNum * options.perPage;
    var pageHtml = pageTemplate.clone();

    pageHtml.attr('id', 'grid-view-page-' + pageNum || 0);
    $.each(this.collection().slice(startIndex, endIndex), function () {
      pageHtml.append(gridItemWrap.clone().append(options.gridItemHtml(this).css({
        'margin-left': 'auto',
        'margin-right': 'auto'
      })));
    });

    this.html.find('.grid-page-holder').append(pageHtml);
  }

  var drawPaginationControls = function () {
    var self = this

    if (pagesRequired() > 1) {
      var controlsHtml = pageControlsTemplate.clone()
      for (var i=1; i <= pagesRequired(); i++) {
        var pageLink = $('<div class="page-link"></div>')
          .text(i)
          .addClass(i == currentPage ? 'current' : '')
          .addClass('page-link-' + i)
        controlsHtml.find('.forward').before(pageLink)
      };

      if(this.addMorePage) {
        var $more = $('<div class="page-more">...</div>')
        controlsHtml.find('.forward').before($more)
      }

      var $pageControl = this.html.find('.grid-view-page-controls')
      if ($pageControl.length > 0) {
        $pageControl.replaceWith(controlsHtml)
      } else {
        this.html.append(controlsHtml)
      };
    }
  }

  var addPaginationBehaviour = function () {
    var self = this
    var page
    var controlsHtml = this.html.find('.grid-view-page-controls')
    controlsHtml.unbind('click')
    controlsHtml.bind('click', function (event) {
      var target = $(event.target).closest('.page-link')
      if ($(this) !== target) {
        if (target.hasClass('backward')) {
          if (self.canPageBackward()) {
            page = previousPageNum()
            self.trigger('paginate', previousPageNum())
          };
        } else if (target.hasClass('forward')) {
          if (self.canPageForward()) {
            page = nextPageNum()
            self.trigger('paginate', nextPageNum())
          };
        } else if (target.hasClass('page-link')) {
          page = parseInt(target.text())
          self.trigger('paginate', parseInt(target.text()))
        };
        self.showPage(page)
        controlsHtml
          .find('.page-link')
            .removeClass('current')
          .end()
          .find('.page-link-' + page)
            .addClass('current')
      };
      return false;
    })
  }

  var moreCollectionItemsRequired = function (pageNum) {
    return pageNum >= (pagesRequired() - 1);
  };

  var nextPageNum = function () {
    return parseInt(currentPage) + 1;
  };

  var pagesRequired = function () {
    return Math.ceil(gridView.collection().length / perPage);
  };

  var pagePosition = function (pageNum) {
    var position = -1 * ((pageNum - 1) * parseInt(options.pageWidth)) + 'px';
    return position
  };

  var previousPageNum = function () {
    return parseInt(currentPage) - 1;
  };

  gridView.resetPaginationHtml = function () {
    drawPaginationControls.call(this);
    addPaginationBehaviour.call(this);
  };

  gridView.canPageBackward = function () {
    return currentPage > 1;
  };

  gridView.canPageForward = function () {
    return currentPage !== pagesRequired();
  };

  gridView.currentPage = function () {
    return currentPage
  }

  gridView.generateHtml = function () {
    var self = this;
    if (this.collectionIsEmpty()) {
      drawBlankState.call(this);
    } else {
      for (var i=1; i <= pagesRequired(); i++) {
        drawPage.call(this, i);
      };
      drawPaginationControls.call(this);
      addPaginationBehaviour.call(this);
      displayCurrentPage.call(this);
    };

    addStyles.call(this);
    return this.html.addClass(this.htmlClass());
  }

  gridView.showPage = function (pageNum) {
    var self = this
    var pageNum = parseInt(pageNum)
    if (pageNum <= pagesRequired() && pageNum > 0) {
      currentPage = pageNum;
      this.trigger('pageAnimationStart', pageNum);
      this.html.find('.grid-page-holder').animate({
        left: pagePosition(pageNum)
      }, options.paginationSpeed, options.paginationEasing, function () {
        self.trigger('pageAnimationEnd', pageNum);
      });
      if (moreCollectionItemsRequired(pageNum)) {
        self.trigger('collectionItemsNeeded');
      };
    };
  };

  return gridView;
}
Jam.Helper = (function ($) {
  var h = {};
  var bytesInAMegabyte = 1048576

  h.bytesToMegabytes = function (bytes) {
    return (Math.round((bytes / bytesInAMegabyte) * 100) / 100) + "MB"
  },

  h.millisecondsToHrsMinSec = function (milliseconds) {
    var duration_seconds = milliseconds / 1000
    var h = Math.floor(duration_seconds / 3600);
    var m = Math.floor(duration_seconds % 3600 / 60);
    var s = Math.floor(duration_seconds % 3600 % 60);
    return ((h > 0 ? h + ":" : "") + (m > 0 ? (h > 0 && m < 10 ? "0" : "") + m + ":" : "0:") + (s < 10 ? "0" : "") + s);
  },

  h.numberToCurrency = function (number, options) {
    var settings = $.extend({}, { currency: 'Â£' }, options || {})
    return settings.currency + new Number(number).toFixed(2)
  },

  h.pageCentreX = function (elementWidth) {
    var pageWidth = $('body').width()
    return (pageWidth / 2) - (elementWidth / 2)
  },

  h.pageCentreY = function (elementHeight) {
    var pageHeight = $('body').height()
    return (pageHeight / 2) - (elementHeight / 2)
  },

  h.timeAgoInWords = function(time){
    var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
      diff = (((new Date()).getTime() - date.getTime()) / 1000),
      day_diff = Math.floor(diff / 86400);

    if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
      return;

    return day_diff == 0 && (
        diff < 60 && "just now" ||
        diff < 120 && "1 minute ago" ||
        diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
        diff < 7200 && "1 hour ago" ||
        diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
      day_diff == 1 && "yesterday" ||
      day_diff < 7 && day_diff + " days ago" ||
      day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
  },

  h.truncateText = function (string, len) {
    var i = 0;
    var len = len || 100;
    var string = string || "";

    if (string.length <= len) {
      return string;
    } else if (string[len] !== ' ') {
      while (string[len + i] !== ' ') {
        i++;
      };
      return string.slice(0, len + i) + 'â€¦';
    } else {
      return string.slice(0, len) + 'â€¦';
    };
  },

  h.viewPortTop = function (offset) {
    return $('body').scrollTop() + offset
  }

  return h;
})(jQuery)
BFX.videoRoutes = function (appNamespace) {

  this.get('#/', function () {
    h.clearDisplay()
  })

  this.get('#/videos/new', function () {
    var self = this
    var form = new VideoFormView({api_host: ApiHost, api_port: ApiPort})
    BFX.mask.show()
    form.draw()
    form.initUploader({
      success: function (event) {
        window.location.hash = '#/'
      }
    })
  });

  this.get('#/videos/:id', function () {
    BFX.mask.show();
    var video = Video.find(this.params['id'])

    if(video.fullyEncoded()) {
      var gridItem= $('#grid-item-'+ video.attr('id'))
      var imageWrap = gridItem.find('.image-wrap')
      var template = imageWrap.clone().hide()

      template
        .find('img')
          .css({
            'border': 'none',
            'padding': '0px',
            'width': '432px',
            'height': '288px',
          }).end()
        .find('.duration')
          .remove().end()
        .css({
          'position': 'absolute',
          'top': imageWrap.offset().top + 'px',
          'left':imageWrap.offset().left + 'px',
          'z-index': '1000'
        }).addClass('video-preview')
    }

    var videoDisplayView = new VideoDisplayView({
      preview: template,
      video: video,
    })
    
    videoDisplayView.draw()
  });

  this.post('#/videos/:id/delete', function () {
    var self = this
    BFX.dialog.show({
      width: 250,
      height: 130,
      template: '#templates .delete-video-dialog-template', 
      target: $(".video-display-background.displaying .buttons a.delete"),
      position: 'top',
      mask: false,
      yes: function() {
        $('#grid-item-' + self.params['id'] + ', #queue-item-' + self.params['id']).fadeOut()
        var video = Video.find(self.params['id'])
        video.destroy()
        self.redirect('#/')
        BFX.dialog.hide()
      },
      no: function() {},
      submit: false
    });
  });

  this.post('#/encodings/:id/cancel', function () {
    var encoding = Encoding.find(this.params['id'])
    encoding.cancel()
  });
}

var Video = Model("video", {
  persistence: Model.RestPersistence("/clouds/:cloud_id/videos"),

  all: function() {
    return _.sortBy(this.collection, function(model, i) {
      return model.attr('created_at');
    }).reverse();
  },

  encoding: function () {
    return _.sortBy(this.processing().notFailed().all(), function(model, i) {
      return model.percentageEncoded();
    }).reverse();
  },

  initializeCollection: function (jsons) {
    var self = this;
    $.each(jsons, function (i, video) {
      self.loadVideoAndEncodings(video);
    });
  },

  notFailed: function () {
    return this.chain(_.select(this.collection, function (video) {
      return video.encodings().failed().count() === 0;
    }))
  },

  processing: function () {
    return this.chain(_.select(this.collection, function (video) {
      return video.fullyEncoded() === false;
    }))
  },

  load: function (id, cb) {
    var self = this;
    $.ajax({
      url: '/clouds/' + CloudID + '/videos/' + id,
      dataType: 'json',
      success: function (data) {
        if (data && !self.find(data.video_id)) {
          self.loadVideoAndEncodings(data);
          self.trigger('collectionUpdated');
          if (cb) cb();
        }
      }
    })
  },

  loadVideoAndEncodings: function (json) {
    var encodings_json = json.encodings;
    delete json.encodings;
    $.each(encodings_json, function () {
      Encoding.add(new Encoding(this));
    });
    Video.add(new Video($.extend(json, {'bucket_id': Bucket})));
  },
  
  loadReadyVideos: function () {
    var self = this
    function hideSpinner () {
      $('.spinner').fadeOut()
    }

    this.VideoReadyPage++    
    if (this.hasVideosToLoad) {
      $.ajax({
        url: '/clouds/' + CloudID + '/videos',
        dataType: 'json',
        data: { 'page': this.VideoReadyPage, 'status': 'success' },
        success: function (data) {
          if (data.length > 0) {
            $.each(data, function () { self.loadVideoAndEncodings(this) })
            self.trigger('collectionUpdated')
            if(data.length < 32) {
              self.hasVideosToLoad = false
              self.trigger('collectionFull')
            }
          } else {
            self.hasVideosToLoad = false
            self.trigger('collectionFull')
          };
        },
        complete: hideSpinner 
      })
    } else {
      hideSpinner()
    };
  },

  loadProcessingVideos: function () {
    var self = this

    this.VideoProcessingPage++
    if (this.hasProcessingVideosToLoad) {
      $.ajax({
        url: '/clouds/' + CloudID + '/videos',
        dataType: 'json',
        data: { 'page': this.VideoProcessingPage, 'status': 'processing' },
        success: function (data) {
          if (data.length > 0) {
            $.each(data, function () { self.loadVideoAndEncodings(this) })
            if(data.length < 16) {
              self.hasVideosToLoad = false
              self.trigger('collectionProcessingFull')
            }
            self.trigger('collectionUpdated')
          } else {
            self.hasProcessingVideosToLoad = false
            self.trigger('collectionProcessingFull')
          };
        }
      })
    }
  },
  
  hasVideosToLoad: true,
  hasProcessingVideosToLoad: true,
  
  ready: function () {
    return this.chain(_.select(this.collection, function (video) {
      return video.fullyEncoded() === true
    }))
  },

  VideoReadyPage: 1,
  VideoProcessingPage: 1

}, {

  createdAt: function () {
    return new Date (this.attr('created_at'))
  },

  encoding: function (format) {
    return this.encodings().select(function () {
      return this.attr('extname') == '.' + format
    }).first()
  },

  encodings: function () {
    var id = this.id()
    return Encoding.select(function () {
      return this.attr('video_id') == id
    })
  },

  encodingFailed: function () {
    return this.encodings().failed().count() > 0
  },

  fullyEncoded: function () {
    return this.encodings().complete().count() === this.encodings().count()
  },

  hasEncodings: function () {
    return this.encodings().all().length > 0
  },

  loadEncodings: function (encodings) {
    $.each(encodings, function () {
      var encoding = Encoding.find(this.id)
      if (encoding) {
        encoding.attr(this)
      } else {
        Encoding.add(new Encoding(this))
      };
    })
  },

  mimeType: function (format) {
    return 'video/' + format
  },

  name: function () {
    return (this.attr('original_filename') || 'undefined').replace(/\.\w+$/, '')
  },

  percentageEncoded: function () {
    var total = this.encodings().count() * 100
    var progressMap = _.map(this.encodings().all(), function (e) { return e.attr('encoding_progress')})
    var currentProgress = _.reduce(progressMap, 0, function (memo, num) { return memo + num})
    return (currentProgress / total) * 100
  },

  previewStillUrl: function () {
    return this.attr('screenshots')[0]
  },

  processing: function () {
    return this.attr('status') == 'processing'
  },

  stillUrl: function (stillNumber) {
    var encodings = this.encodings().all();
    var bestEncoding = encodings[0];
    for (var i=1; i<encodings.length; i++) {
      if (encodings[i].attr("extname") == ".jpg") {
        bestEncoding = encodings[i]
      }
    }
    if (bestEncoding) {
      return bestEncoding.attr('screenshots')[stillNumber-1]
    };
  },

  url: function (format) {
    var encoding = this.encoding(format)
    if (encoding) {
      return encoding.attr('url')
    } else {
      return ''
    };
  },
  
  hasStartedEncoding: function () {
    return this.encodings().select(function () {
      return this.attr('started_encoding_at') != null
    }).count() > 0
  }
  
})

var Encoding = Model("encoding",  {
  // class methods
  processing: function () {
    return this.chain(_.select(this.collection, function (encoding) {
      return encoding.attr('status') === 'processing'
    }))
  },

  failed: function () {
    return this.chain(_.select(this.collection, function (encoding) {
      return encoding.attr('status') === 'fail'
    }))
  },

  complete: function () {
    return this.chain(_.select(this.collection, function (encoding) {
      return encoding.attr('status') === 'success' || encoding.attr('status') === 'fail'
    }))
  }
}, {
  // instance methods
  format: function () {
    return this.attr('extname').replace('.', '')
  },

  logoUrl: function () {
    var image_name
    switch(this.attr('extname')){
      case '.ogv':
        image_name = 'ogg'
        break
      case '.mp4':
        image_name = 'h264'
        break
      case '.webm':
        image_name = 'webm'
        break
      case '.ts':
        image_name = 'iphone_and_ipad'
      case '.m3u8':
        image_name = 'iphone_and_ipad'
        break
    }
    return '/images/' + image_name + '.png'
  },

  mimeType: function () {
    // naive implementation, an encoding could be an audio file
    if (this.attr('extname') == '.ogv') {
      return 'video/ogg'
    } else {
      return 'video/' + this.attr('extname').replace('.', '')
    };
  },

  name: function () {
    var profile = this.profile()
    if(profile) {
      return profile.attr('name') || profile.attr('title')
    }else{
      return this.attr('extname').replace('.', '') + '_' + this.attr('width') + 'x' + this.attr('height');
    }
  },

  profile: function(){
    return Profile.find(this.attr('profile_id'))
  },
  
  ready: function () {
    return parseInt(this.attr('encoding_progress')) == 100
  },

  processing: function () {
    return this.attr('status') === 'processing'
  },

  video: function () {
    return Video.find(this.attr('video_id'))
  },

  url: function () {
    return this.attr('url')
  },
  
  cancel: function() {
    $.ajax({
      type: 'POST',
      url: "/clouds/" + CloudID + "/encodings/" + this.attr('id') + '/cancel'
    });
  }
})
var Cloud = Model("cloud",  {
      validates: {
        presenceOf: ['name', 'user_aws_key', 'user_aws_secret', 's3_videos_bucket']
      },

      load: function (callback) {
        var self = this
        function hideSpinner () {
          $('.spinner').fadeOut()
        }

        self.CloudPage++
        if (this.hasCloudsToLoad) {
          $.ajax({
            url: '/clouds',
            dataType: 'json',
            data: { 'page': this.CloudPage },
            success: function (data) {
              if (data.length > 0) {
                Cloud.loadClouds(data)
                self.trigger('collectionUpdated')
                if(data.length < 18) {
                  self.trigger('collectionFull')
                  self.hasVideosToLoad = false
                }
              } else {
                self.hasCloudsToLoad = false
                self.trigger('collectionFull')
              };
            },
            complete: function(){
              hideSpinner() 
              if(callback)
                callback()
            }
          })
        } else {
          hideSpinner()
        };
      },
      hasCloudsToLoad: true,
      lastTimestamp: null,
      CloudPage: 0,
      
      loadClouds: function (json) {
        $.each(json, function () {
          Cloud.add(new Cloud(this));
        });
      }
  },{
    validCredentials: false,
    validateCredentials: function(callback){
      var self = this;
      $.ajax({
        type: 'GET',
        dataType: 'json',
        url: "/validate_bucket",
        data: { 
          aws_key: this.attr('user_aws_key'),
          aws_secret: this.attr('user_aws_secret'),
          bucket_name: this.attr('s3_videos_bucket'),
        },
        success: function(data) {
          if(data.status == 'missing'){
            self.validCredentials = true
            if(callback)
              callback(data.status, 'This bucket will be created for you.')
          }
          else if(data.status == 'exists'){
            self.validCredentials = true
            if(callback)
              callback(data.status, 'Great! We found your existing bucket.')
          }else{
            self.validCredentials = false
            if(callback)
              callback(data.status, data.message)
          }
        },
        error: function() {
          self.validCredentials = false
          callback('error', 'Internal Error occured')
        }
      });
    },
    canCreate: function(){
      var modelIsValid = this.valid()
      if(!this.validCredentials){
        this.errors.add("s3_videos_bucket", "credentials invalid")
      }
      return modelIsValid && this.validCredentials
    },
    hasRequiredFields: function() {
      return this.attr('user_aws_key') && this.attr('user_aws_secret') && this.attr('s3_videos_bucket')
    }
  }
)
var Profile = Model("profile",  {
    persistence: Model.RestPersistence("/clouds/:cloud_id/profiles"),

    validates: {
      presenceOf: ['name'],
      uniquenessOf: ['name']
    },
  
    all: function() {
      return _.sortBy(this.collection, function(model, i) {
        return model.attr('created_at')
      }).reverse();
    },
    
    havingPreset: function () {
      return _.select(this.collection, function (profile) {
        return profile.attr('preset_name') != null
      })
    },
  
    notHavingPreset: function () {
      return _.select(this.collection, function (profile) {
        return profile.attr('preset_name') == null
      })
    }
  },

//  Instance methods
  {
    isCustom: function(){
      return this.attr('preset_name') == null
    },
    format: function() {
      var preset = null;
      if(this.attr('preset_name') && (preset = Preset.findByName(this.attr('preset_name'))) )
        return preset.attr('format')
      else
        return this.attr('extname')
    },
    
    title: function() {
      if(this.attr('preset_name'))
        return this.attr('title')
      else
        return "Custom - " + this.attr('extname').slice(1)
    },
    
    logoUrl: function () {
      var image_name
      switch(this.attr('extname')){
        case '.ogv':
          image_name = 'ogg'
          break
        case '.mp4':
          image_name = 'h264'
          break
        case '.webm':
          image_name = 'webm'
          break
        case '.ts':
          image_name = 'iphone_and_ipad'
        case '.m3u8':
          image_name = 'iphone_and_ipad'
          break
      }
      return '/images/' + image_name + '.png'
    },

    supportsSize: function() {
      return (this.attr("preset_name") != "iphone_and_ipad");
    },

    supportsCustomAspect: function() {
      return (this.attr("preset_name") != "iphone_and_ipad");
    },

    supportsCustomBitrate: function() {
      return (this.attr("preset_name") != "iphone_and_ipad");
    },

    resolution: function() {
      var w = this.attr("width"), h = this.attr("height")
      if (w && h) return w + ' x ' + h;
      if (w) return w + ' x ?'
      if (h) return '? x ' + h;
      return 'original'
    }
  }
)

VMS = {
  loadProfiles: function (json) {
    $.each(json, function () {
      Profile.add(new Profile(this));
    });
  }
};

$(document).ready(function () {

  Video.initializeCollection(new_videos_json)
  VMS.loadProfiles(profilesJson)

  VMS.app.run('#/')

  Video.bind('collectionUpdated', function (video) {
    VMS.videoGridView.updateCollection(Video.ready().all())
    VMS.encodingQueue.updateCollection(Video.encoding())
  })

  Video.bind('remove', function () {
    VMS.videoGridView.updateCollection(Video.ready().all())
    VMS.encodingQueue.updateCollection(Video.encoding())
  })

  // New to reload more ready video/encodings
  VMS.videoGridView.bind('collectionItemsNeeded', function () {
    $('.spinner').fadeIn()
    Video.loadReadyVideos()
  })

  // New to reload more processing video/encodings
  VMS.encodingQueue.bind('collectionItemsNeeded', function () {
    Video.loadProcessingVideos()
  })

  $('#video-grid-holder').append($("<img class='spinner' src='/images/ajax-loader-4.gif' />"))

  $(document).bind('maskClicked maskEscPress', function (event) {
    if (!isUploading()) {
      event.stopPropagation();
      window.location = '#/';
    }
  });
})

function isUploading() {
  return $('.upload-form-holder.displaying').length > 0
}
VMS.app = $.sammy(function() {

  this.raise_errors = true
  this.element_selector = 'body';

  // apply the common video routes
  BFX.videoRoutes.call(this, VMS)

  this.bind('run', function () {
    VMS.videoGridView = VideoGridView(Video.ready().all())
    VMS.videoGridView.render()
    VMS.encodingQueue = EncodingQueue(Video.encoding())
    VMS.encodingQueue.render()
    BFX.mask.hide()
  })

  this.get('#/', function () {
    h.clearDisplay();
  })

  this.get('#/video-grid/page/:page_number', function () {
    VMS.videoGridView.showPage(this.params['page_number'])
  })

  this.get('#/encoding-queue/page/:page_number', function () {
    VMS.encodingQueue.showPage(this.params['page_number'])
  })
});
VideoDisplayView = function (options) {
  this.preview = options.preview
  this.video = options.video
  this.format = 'mp4'
  this.template = $('#templates .video-display-background')
  this.html = this.template.clone()
}

VideoDisplayView.prototype = {
  addVideoPlayer: function () {
    var self = this
    this.videoPlayer = new BFXPlayer ({
      selector: '.video-display-background.displaying #video-player',
      swf: '/swfs/flowplayer-3.2.2.swf',
      videos: _.map(this.video.encodings().all(), function (encoding) {
        return { src: encoding.url(), type: encoding.mimeType() }
      })
    })

    this.videoPlayer.$holder.bind('ready.video', function () {
      self.preview.fadeOut()
    })

    this.videoPlayer.draw()
  },
  
  draw: function () {    
    this.populate()
    this.addEventHandlers()
    this.drawEncodings()
    
    var modal = $('<div>', {'class': 'modal-box-wrapper'}).append(this.html);
    modal.addClass('displaying')
    $('body').append(modal)
    this.drawBackground()

    if(this.video.fullyEncoded()){
      this.html.find('.preview-holder').remove()
      this.addVideoPlayer()
      this.showPreview()
    }else{
      this.html
        .find('.preview-holder img')
          .attr('src', this.video.previewStillUrl())
          .error(h.smallImageMissing)
        .end()
    }
    
  },

  drawBackground: function () {
    var self = this
    this.html
      .addClass('displaying')
      .css({
        'top': h.viewPortTop(80),
        'z-index': h.maxZIndex(),
      })

      .animate({
        'opacity': 1
      }, 200)
  },

  drawEncodings: function () {
    var self = this
    if (!this.video.processing()) {
      $.each(this.video.encodings().all(), function () {
        self.html.find('.encodings').append(new EncodingDisplayView(this).draw())
      })
    } else {
      this.drawEncodingProgress()
    };
  },

  populate: function () {
    var self = this;
    this.html
      .find('.video-id')
        .text(this.video.attr('id'))
      .end()
      .find('.title')
        .text(this.video.name())
      .end()
      .find('.duration')
        .text(h.millisecondsToHrsMinSec(this.video.attr('duration')))
      .end()
      .find('.created-at')
        .text(this.video.createdAt().toDateString())
      .end()
      .find('.size')
        .text(h.bytesToMegabytes(this.video.attr('file_size')))
      .end()
      .find('#temp-video-player')
        .attr('id', 'video-player');
      
      var btnDelete = this.html.find('.buttons .delete')

      if(this.video.fullyEncoded()) {
        btnDelete
         .click(function () {
            self.html.find('form.delete').submit();
            return false;
          })

        this.html.find('form.delete')
          .attr('method', 'post')
          .attr('action', '#/videos/' + this.video.id() + '/delete')
        .end()
      }else {
        btnDelete.hide()
      }
  },

  showPreview: function () {
    $('body').append(this.preview.show())
    
    this.preview
      .addClass('displaying')
      .show()
      .css({
        'top': h.viewPortTop(120) - 14,
        'left': h.pageCentreX(500) + 10,
      })
      .find('img').css({
        'width': '480px',
        'height': '320px'
      })
  },
  
  addEventHandlers: function() {
    var self=this
    this.video.bind('created',function(){
       self.populate()
    })
  }
}
EncodingDisplayView = function (encoding) {
  this.encoding = encoding
  var template = $('#templates .encoding-display')
  this.html = template.clone()
}

EncodingDisplayView.prototype = {
  draw: function () {
    this.populate()
    this.updateProgress()
    this.addEventHandlers()
    return $('<li></li>').append(this.html)
  },

  populate: function () {
    var self = this
    this.html
      .find('img')
        .attr('src', this.encoding.logoUrl())
      .end()
      .find('.name')
        .text(h.truncate(this.encoding.name(), 10) || '')
      .end()
      .find('.size')
        .text(h.bytesToMegabytes(this.encoding.attr('file_size') || 0))
      .end()
      .find('.width')
        .text(this.encoding.attr('width') || 'N/A')
      .end()
      .find('.height')
        .text(this.encoding.attr('height') || 'N/A')
      .end()
    
    if(this.encoding.processing()){
      this.html.find('form.cancel')
        .attr('method', 'post')
        .attr('action', '#/encodings/' + this.encoding.id() + '/cancel')
      .end()
      
      $('.encoding-progress').show()
      this.html.find('a.download').hide()
      this.html.find('a.cancel')
         .click(function () {
            $(this).text('cancelling...');
            self.html.find('form.cancel').submit();
            return false;
          })
        .show()
      
    }
    else{
      this.html.find('.encoding-progress').hide()
      this.html.find('a.cancel').hide()
      if(this.encoding.attr('status') == 'success') {
        this.html.find('a.download')
          .attr('href', this.encoding.url())
          .attr('target', '_blank')
          .show()     
      }else{
        this.html.find('a.download').replaceWith($('<div>',{
          'class': 'red right'
        }).text(this.encoding.attr('error_class') || 'Fail')).show()
      }
    }
  },
  
  addEventHandlers: function() {
     var self=this;

     this.encoding
       .bind('change', function () { 
          self.updateProgress()
       })
       .bind('completed', function () {
         self.encoding.attr('encoding_progress', 100)
         self.updateProgress()
         self.populate()
       })
   },
   
   updateProgress: function(){
     this.html
       .find('.progress-inside')
         .animate({width: this.encoding.attr('encoding_progress') + '%'}, 200)
       .end()
   }
}
VideoFormView = function (options) {
  var template = $('#templates .upload-form-holder')
  this.html = template.clone()
  this.holder = $('#video-uploader-container')
  this.api_host = options.api_host
  this.api_port = options.api_port
  this.queueItemHtml = $('#templates .encoding-queue-item').clone()
}

VideoFormView.prototype = {

  abortUpload: function () {
    if (this.widget) {
      this.widget.abort();
    };
  },

  // because the uplaoder only takes id strings and not selectors
  // this makes sure we are trying to attach it to the correct form
  // and not the hidden template.
  adjustFormIds: function () {
    var self = this
    $.each(['temp-upload-button', 'temp-upload-progress', 'temp-upload-filename', 'temp-returned-video-id'], function () {
      var id = '#' + this
      var new_id = this.replace('temp-', '')
      self.html.find(id).attr('id', new_id)
    })
  },

  animatedClose: function (video, queueItem, callback) {
    var self = this
    var largeQueueItem = new EncodingQueueItem(video).draw()
    largeQueueItem
      .addClass('big')
      .css({
        left: h.pageCentreX(420) + 'px',
        top: '150px'
      })
      .attr('id', 'big-queue-item-' + video.id())

    this.holder.append(largeQueueItem)

    this.html.remove()

    largeQueueItem.css('margin', '0px')
    largeQueueItem.animate({
      'top': queueItem.offset().top + 'px',
      'left': queueItem.offset().left + 'px'
    }, 500);
    largeQueueItem.find('img, .progress-bar').animate({
      'width': '100px'
    }, 500, function () {
      largeQueueItem.hide();
      callback();
    });
  },

  close: function () {
    this.holder.slideUp()
    this.html.remove()
  },

  closeWithoutConfirm: function () {
    this.html.remove()
    window.location.hash = '#/'
  },

  // once the upload has started the user should be prompted if the want to close
  // the upload window
  confirmOnClose: function () {
    var self = this;
    this.html.find('a.cancel').one('click', function () {
      if (confirm('Are you sure you want to cancel uploading this video?')) {
        self.abortUpload();
      };
      return false;
    });
  },

  displayVideoDetails: function (file_size) {
    this.html
      .find('.button-section')
        .slideUp()
      .end()
      .find('.bfx-upload-progress')
        .show()
      .end()
      .find('.percentage-complete')
        .removeClass('hidden')
      .end()
      .find('.uploader-help')
        .addClass('hidden')
      .end()
      .find('.size span')
        .text(h.bytesToMegabytes(file_size))
      .end()
      .find('.details')
        .removeClass('hidden')
          .find('h3')
            .text($(':file').val().replace("C:\\fakepath\\", ''))
  },

  displayVideoProgress: function (file_size, bytes_loaded) {
    var percentComplete = Math.round((bytes_loaded / file_size) * 100);
    this.html
      .find('#upload-progress .progress-inside')
        .css({width: percentComplete + '%'})
      .end()
      .find('.percentage-complete')
        .removeClass('hidden')
        .find('span')
          .text(percentComplete);
  },

  draw: function () {
    this.holder.show()
    this.adjustFormIds()

    if(!this.bucketProvided()){
        this.html
            .find('.uploader-help')
            .text('Go first to "Settings" to grant BlogBlimp the access to your Amazon S3 Bucket')
    }
    
    this.html
      .addClass('displaying')
      .css({
        top: "150px",
        'z-index': h.maxZIndex() + 1
        })
        
      .find('.bfx-upload-progress')
        .hide()
      
    var modal = $('<div>', {'class': 'modal-box-wrapper'}).append(this.html);
    modal.addClass('displaying')

    $('body').append(modal)
  },

  getAuthParams: function () {
    // URGH using global variables to return the current
    // auth params and then replacing it with a new one
    // from the server for the next request
    $.ajax({
      url: '/clouds/' + CloudID + '/signed_params',
      success: function (data) {
        Auth = data
      }
    })
    return Auth
  },

  bucketProvided: function(){
      if(Bucket == null || Bucket == undefined || Bucket == "")
          return false;
      else
          return true;
  },
  // this needs to be called once the VideoForm has been drawn
  // so that the flash uploader is added correctly.
  initUploader: function (options) {

    if(!this.bucketProvided()){
        return false
    }
    
    var self = this;
    var once = true;
    this.widget = new BFXUploader.SmartWidget();
    
    $("#returned-video-id").BFXUploader(this.getAuthParams(), {
      upload_strategy: new BFXUploader.UploadOnSelect(),
      api_host: self.api_host,
      api_port: self.api_port,
      widget: self.widget,
      file_size_limit: AccountFileSizeLimit,
      allowed_extensions: ['3g2', '3gp', 'asf', 'asx', 'avi', 'bdm', 'bsf', 'cpi', 'divx', 'dmsm', 'dream', 'dvdmedia', 'dvr-ms', 'f4v', 'fbr', 'flv', 'hdmov', 'm2p', 'm4v', 'mkv', 'mod', 'moi', 'mov', 'mp4', 'mpeg', 'mpg', 'mts', 'mxf', 'ogm', 'psh', 'rm', 'rmvb', 'scm', 'smil', 'srt', 'stx', 'tix', 'trp', 'ts', 'vob', 'vro', 'wmv', 'wtv', 'xvid', 'yuv', 'ogg', 'ogv', 'mp3', 'm4a', 'oga'],
      onloadstart: function (event) {
        self.confirmOnClose()  
      },
      onerror: function (event) {
        self.closeWithoutConfirm()
        BFX.flashMessage.displayError("There was a problem uploading your video.")
      },
      onsuccess: options.success,
      onprogress: function (event) {
        if (once) {self.displayVideoDetails(event.total); once = false; };
        self.displayVideoProgress(event.total, event.loaded)
      }
      
      
    })
  }
}

VideoGridView = function (collection) {
  var videoGridView = Jam.newObjectFrom(Jam.GridView('video-grid', {
    perPage: 16,
    gridWidth: 4,
    templateSelector: '#templates .grid-container',
    containerSelector: '#video-grid-holder',
    pageWidth: '800px',
    pageHeight: '880px',
    collection: collection,
    hashPagination: true,
    paginationSpeed: 800,
    paginationEasing: 'easeOutExpo',
    blankStateHtml: $("<h2 class='blank-state'>You don't have any videos yet.  Use the <a href='#/videos/new'>uploader</a> to get started with BFX.</h2>"),
    gridItemHtml: function (item) {
      return new VideoGridItemView(item).draw()
  }}))
  videoGridView.addMorePage = true;

  Video.bind('collectionFull', function () {
    videoGridView.addMorePage = false
    videoGridView.resetPaginationHtml()
    videoGridView.centerHtml()
  })

  function drawQueueLength () {
    if (TotalVideoCollectionSize > 0) {
      this.html.find('.count').text('(' + TotalVideoCollectionSize + ')')
    };
  }
  
  videoGridView.render = function () {
    this.generateHtml()
    
    this.html.find('header')
      .find('h3')
        .html('Videos <span class="count"></span>')
        .after('<h4>Failed videos and encodings will not be displayed. Use the api</h4>')
      .end()

    drawQueueLength.call(this)
    this.insertHtml()
    this.centerHtml()
  }

  videoGridView.centerHtml = function () {
    var $pageControl = this.html.find('.grid-view-page-controls')
    var pageWidth = this.html.width()
    var elementWidth = $pageControl.width()
    var left = (pageWidth / 2) - (elementWidth / 2)
    $pageControl.css('left', left)
  }
  
  videoGridView.clearDisplay = function () {
    $('.displaying').animate({
      opacity: 0
    }, 250, function () {
      $(this).remove()
    })
  }

  videoGridView.displayVideo = function (video_id) {
    this.clearDisplay()
    $('#grid-item-' + video_id).trigger('display-video')
  }

  return videoGridView
}
VideoGridItemView = function (video) {
  var template = $('#templates .video-grid-item')
  this.video = video
  this.html = template.clone()
}

VideoGridItemView.prototype = {
  draw: function (customization) {
    var customization = customization || $.noop;
    this.populate();
    customization.call(this)
    this.screenshotRotator();
    this.displayMissingImage();
    return this.html
  },

  displayMissingImage: function () {
    this.html.find('img').error(h.imageMissing)
  },

  populate: function () {
    var self = this
    this.html.attr('id', 'grid-item-' + this.video.id())
    this.html.find('h3 a')
      .text(this.video.name())

    this.html.find('h3 a')
      .attr('href', '#/videos/' + this.video.id())
    
    this.html.find('.overlay .inner').html($('<a>',
      {'class': 'overlay-button'}))
    
    this.html.bind('display-video', function () {
      self.display()
    })
    
    this.html.find('.overlay').click(function(){
      window.location= '#/videos/' + self.video.id()
      return false;
    })
    
    this.html.find('img')
      .attr('src', this.video.stillUrl(1) || '/images/unavailable_screenshot.png')
    this.html.find('.duration').text(h.millisecondsToHrsMinSec(this.video.attr('duration')))
    this.html.find('.created-at').text('uploaded: ' + h.timeAgoInWords(this.video.attr('created_at')))
    this.html.find('.size').text('size: ' + h.bytesToMegabytes(this.video.attr('file_size')))
    this.html.find('.encodings').text('encodings: ' + this.video.encodings().count())
  },

  display: function () {
    var template = this.html.find('.image-wrap').clone()

    template
      .find('img')
        .css({
          'border': 'none',
          'padding': '0px'
        }).end()
      .find('.duration')
        .remove().end()
      .css({
        'position': 'absolute',
        'z-index': '10'
      })

    var videoDisplayView = new VideoDisplayView({
      preview: template,
      video: this.video,
      size: {
        'width': this.html.find('.image-wrap').width() + 'px',
        'height': this.html.find('.image-wrap').height() + 'px'
      },
      position: {
        'top': this.html.find('.image-wrap').offset().top + 'px',
        'left': this.html.find('.image-wrap').offset().left + 'px'
      }
    })
    videoDisplayView.draw()
  },

  screenshotRotator: function () {
    var self = this
    if (this.video.hasEncodings()) {
      var src = this.html.find('img').attr('src')
      this.html.find('.overlay .inner')
        .mousemove(function (e) {
          var stillNumber = Math.ceil((e.offsetX || e.layerX) / 29) || 1;
          if (stillNumber !== currentStillNumber) {
            var currentStillNumber = stillNumber;
            self.html.find('img').attr('src', self.video.stillUrl(stillNumber));
          };
        }).mouseout(function () {
          self.html.find('img').attr('src', self.video.stillUrl(1));
        });
    };
  }
}
EncodingQueue = function (collection) {
  var encodingQueue = Jam.newObjectFrom(Jam.GridView('encoding-queue', {
    perPage: 6,
    gridWidth: 6,
    templateSelector: '#templates .encoding-queue-container',
    containerSelector: '#encoding-queue-holder',
    collection: collection,
    pageWidth: '800px',
    pageHeight: '130px',
    paginationSpeed: 800,
    hashPagination: true,
    paginationEasing: 'easeOutExpo',
    blankStateHtml: $("<h3 class='blank-state'>While your videos are encoding they will appear here.</h3>"),
    gridItemHtml: function (item) {
      return new EncodingQueueItem(item).draw()
    }
  }))

  function drawQueueLength () {
    if (TotalEncodingQueueSize > 0) {
      this.html.find('.count').text('(' + TotalEncodingQueueSize + ')')
    };
  }

  function enableViewPortToggle () {
    var self = this
    this.html.find('.show-hide').click(function () {
      if (self.isCollapsed()) {
        self.expand()
      } else {
        self.collapse()
      };
    })
  }

  function hidePagination () {
    if (this.pagesRequired == 1) {
      this.html.find('.grid-view-page-controls').hide()
    };
  }

  function drawHeader () {
    this.html.find('header')
      .addClass('expanded')
      .find('h3')
        .html(
      "<a class='show-hide'><img src='/images/down_arrow.png'/></a>Encoding Queue <span class='count'></span>"
        )
      .end()
  }

  encodingQueue.isCollapsed = function () {
    return !this.isExpanded()
  }

  encodingQueue.isExpanded = function () {
    return this.html.find('.grid-view-port:visible').length !== 0
  }

  encodingQueue.collapse = function (animate) {
    var animate = typeof animate == 'undefined' ? true : animate
    var self = this
    if (this.isExpanded()) {
      this.html
        .find('.grid-view-port')
          .slideUp(animate ? 400 : 0, function () {
            self.html.find('.grid-header').toggleClass('expanded')
          })
        .end()
        .find('.grid-view-page-controls')
          .toggleClass('invisible')
        .end()
        .find('.show-hide img')
          .attr('src', '/images/right_arrow.png')
    };
  }

  encodingQueue.expand = function (animate) {
    var animate = typeof animate == 'undefined' ? true : animate
    var self = this
    if (this.isCollapsed()) {
      this.html
        .find('.grid-view-port')
          .slideDown(animate ? 400 : 0, function () {
            self.html.find('.grid-view-page-controls').toggleClass('invisible')
          })
        .end()
        .find('header')
          .toggleClass('expanded')
        .end()
        .find('.show-hide img')
          .attr('src', '/images/down_arrow.png')
    };
  }

  encodingQueue.addMorePage = true;
  Video.bind('collectionProcessingFull', function () {
    encodingQueue.addMorePage = false
    encodingQueue.resetPaginationHtml()
    encodingQueue.centerHtml()
  })
  
  encodingQueue.render = function (animate) {
    var self = this
    this.generateHtml()
    drawHeader.call(this)
    drawQueueLength.call(this)
    enableViewPortToggle.call(this)
    hidePagination.call(this)
    this.insertHtml()
    if (this.collection().length === 0) {
      this.collapse(false)
    };

    this.centerHtml()
  }

  encodingQueue.centerHtml = function () {
    var $pageControl = this.html.find('.grid-view-page-controls')
    var pageWidth = this.html.width()
    var elementWidth = $pageControl.width()
    var left = (pageWidth / 2) - (elementWidth / 2)
    $pageControl.css('left', left)
  }

  return encodingQueue
}

EncodingQueueItem = function (video) {
  this.video = video
  var template = $('#templates .encoding-queue-item')
  this.html = template.clone()
}

EncodingQueueItem.prototype = {

  draw: function () {
    this.populate()
    this.addEventHandlers()
    this.drawEncodingProgress()
    return this.html
  },

  drawEncodingProgress: function () {
    var self = this
    this.html.find('.inner').css({width: this.video.percentageEncoded() + '%'})
    
    if(!this.video.hasStartedEncoding())
      this.html.find('.progress-bar').hide()
  },

  populate: function () {
    this.html
      .attr('id', 'queue-item-' + this.video.id())
      .find('h5')
        .text(this.video.name())
      .end()
      .find('img.preview')
        .attr('src', this.video.previewStillUrl())
        .error(h.smallImageMissing)
      .end()
      .find('a.details').attr('href', '#/videos/' + this.video.id())
      .end()
    if (this.video.encodingFailed()) {
      this.html.addClass('fail')
    };
  },
  
  addEventHandlers: function() {
    var self=this;

    this.video
      .bind('created', function () {
        self.html
        .find('img.preview')
          .attr('src', this.previewStillUrl())
          .error(h.smallImageMissing)
        .end()
          
        self.drawEncodingProgress()
      })
      .bind('change', function () {
        self.html
          .find('.progress-bar')
            .show()
          .end()
          .find('.inner')
            .animate({width: self.video.percentageEncoded() + '%'}, 200)
          .end()
      })
      .bind('encoded', function () {
        self.html
          .find('.progress-bar')
            .show()
          .end()
          .find('.inner')
            .animate({width: '100%'}, 200, function(){
              Video.trigger('collectionUpdated')
              })
          .end()
      })
  }
  
}
VideoPlayerView = function (video) {
  this.video = video
  var template = $('#templates .video-playerbox')
  this.html = template.clone()
  this.width = this.getResolution()[0] || 480
  this.height = this.getResolution()[1] || 320
}

VideoPlayerView.prototype = {
  addVideoPlayer: function () {
    var self = this
    this.videoPlayer = new BFXPlayer ({
     selector: '.video-playerbox.displaying #video-player',
     size: {
       width: this.width,
       height: this.height
     },
     videos: _.map(this.video.encodings().all(), function (encoding) {
       return { src: encoding.url(), type: encoding.mimeType() }
     })
    })

    this.videoPlayer.draw()
    this.html.find("video").player().play();
  },
  
  draw: function(){
    var modal = $('<div>', {'class': 'modal-box-wrapper'}).append(this.html);
    modal.addClass('displaying');
    this.html.addClass('displaying');
    //     
    $('body').prepend(modal)
    this.html.css({
      'top': h.viewPortTop(80),
      'z-index': h.maxZIndex() + 1,
      'width': this.width + 'px',
      'height': this.height + 'px',
      '-webkit-transition': 'all 0.4s',
      '-webkit-transform': 'scale(1) !important',
      'opacity': '1 !important',
      '-webkit-box-shadow': 'rgba(0, 0, 0, 0.796875) 0px 2px 20px',
      'box-shadow': 'rgba(0, 0, 0, 0.796875) 0px 2px 20px'
    })
    this.addVideoPlayer()
  },
  
  getResolution: function(){
    es = this.video.encodings().all().sort(function(a,b){
      return a.attr('height') - b.attr('height')
    })
    return [es[0].attr('width'), es[0].attr('height')]
  }
}


$(document).ready(function() {

  server = new Pusher(pusherKey)
  var channel = server.subscribe("private-"+ CloudID)

  channel.bind('encoding-progress', function (event_data) {
    var encoding = Encoding.find(event_data.encoding.id)
    if (encoding) {
      var video = encoding.video()

      // we had it done, but got a retry
      var needVideoUpdate = video.fullyEncoded()

      encoding.attr(event_data.encoding)
      // status is not passed in the event datas
      encoding.attr("status", "processing")
      encoding.trigger('change')

      if (needVideoUpdate) {
        Video.trigger('collectionUpdated')
      }

      video.trigger('change')
    } else {
      Video.load(event_data.encoding.video_id)
    };
  })

  channel.bind('encoding-complete', function (event_data) {

    var encoding = Encoding.find(event_data.encoding.id)
    if (encoding) {
      encoding.attr(event_data.encoding)
      if(encoding.attr('status') == 'success'){
        $(document).trigger('encoding-completed', encoding)
      }
      encoding.trigger('completed')
    };
  })
  
  channel.bind('video-encoded', function (event_data) {
    if(typeof TotalEncodingQueueSize != "undefined")
      TotalEncodingQueueSize -= 1 

    var video = Video.find(event_data.video.id)
    if (video) {
      video.attr(event_data.video)
      video.trigger('encoded')
    };
  })
  
  channel.bind('video-deleted', function (event_data) {
    if(typeof TotalVideoCollectionSize != "undefined")
      TotalVideoCollectionSize -= 1
    
    var video = Video.find(event_data.video_id)
    if (video) {
      Video.remove(video)
    };
  })
  
  channel.bind('video-new', function (event_data) {
    if(typeof TotalEncodingQueueSize != "undefined")
      TotalEncodingQueueSize += 1
    
    var video_data = $.extend(event_data.video, {'cloud_id': CloudID})
    var encodings_data = video_data.encodings
    delete video_data.encodings
        
    var video = new Video(video_data)
    video.loadEncodings(encodings_data)
    
    Video.add(video)
    Video.trigger('collectionUpdated')
  })

  channel.bind('video-created', function (event_data) {
    if(typeof TotalVideoCollectionSize != "undefined")
      TotalVideoCollectionSize += 1

    var video = Video.find(event_data.video.id)
    if(video) {
      video.attr(event_data.video)
      video.trigger('created')
    }
  })
  
});

/*  bfx-player JavaScript library, version 0.1.1
 *  (c) 2010 Oliver Nightingale
 *
 *  Released under MIT license.
 */
/*!
 * jQuery UI 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 */
(function(c){c.ui=c.ui||{};if(!c.ui.version){c.extend(c.ui,{version:"1.8.2",plugin:{add:function(a,b,d){a=c.ui[a].prototype;for(var i in d){a.plugins[i]=a.plugins[i]||[];a.plugins[i].push([b,d[i]])}},call:function(a,b,d){if((b=a.plugins[b])&&a.element[0].parentNode)for(var i=0;i<b.length;i++)a.options[b[i][0]]&&b[i][1].apply(a.element,d)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(a,b){if(c(a).css("overflow")==
"hidden")return false;b=b&&b=="left"?"scrollLeft":"scrollTop";var d=false;if(a[b]>0)return true;a[b]=1;d=a[b]>0;a[b]=0;return d},isOverAxis:function(a,b,d){return a>b&&a<b+d},isOver:function(a,b,d,i,l,q){return c.ui.isOverAxis(a,d,l)&&c.ui.isOverAxis(b,i,q)},keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,
NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});c.fn.extend({_focus:c.fn.focus,focus:function(a,b){return typeof a==="number"?this.each(function(){var d=this;setTimeout(function(){c(d).focus();b&&b.call(d)},a)}):this._focus.apply(this,arguments)},enableSelection:function(){return this.attr("unselectable","off").css("MozUserSelect","")},disableSelection:function(){return this.attr("unselectable","on").css("MozUserSelect",
"none")},scrollParent:function(){var a;a=c.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(c.curCSS(this,"position",1))&&/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",
1))}).eq(0);return/fixed/.test(this.css("position"))||!a.length?c(document):a},zIndex:function(a){if(a!==undefined)return this.css("zIndex",a);if(this.length){a=c(this[0]);for(var b;a.length&&a[0]!==document;){b=a.css("position");if(b=="absolute"||b=="relative"||b=="fixed"){b=parseInt(a.css("zIndex"));if(!isNaN(b)&&b!=0)return b}a=a.parent()}}return 0}});c.extend(c.expr[":"],{data:function(a,b,d){return!!c.data(a,d[3])},focusable:function(a){var b=a.nodeName.toLowerCase(),d=c.attr(a,"tabindex");return(/input|select|textarea|button|object/.test(b)?
!a.disabled:"a"==b||"area"==b?a.href||!isNaN(d):!isNaN(d))&&!c(a)["area"==b?"parents":"closest"](":hidden").length},tabbable:function(a){var b=c.attr(a,"tabindex");return(isNaN(b)||b>=0)&&c(a).is(":focusable")}})}})(jQuery);
(function(c){var a=c.fn.remove;c.fn.remove=function(b,d){return this.each(function(){if(!d)if(!b||c.filter(b,[this]).length)c("*",this).add(this).each(function(){c(this).triggerHandler("remove")});return a.call(c(this),b,d)})};c.widget=function(b,d,i){var l=b.split(".")[0],q;b=b.split(".")[1];q=l+"-"+b;if(!i){i=d;d=c.Widget}c.expr[":"][q]=function(v){return!!c.data(v,b)};c[l]=c[l]||{};c[l][b]=function(v,u){arguments.length&&this._createWidget(v,u)};d=new d;d.options=c.extend({},d.options);c[l][b].prototype=
c.extend(true,d,{namespace:l,widgetName:b,widgetEventPrefix:c[l][b].prototype.widgetEventPrefix||b,widgetBaseClass:q},i);c.widget.bridge(b,c[l][b])};c.widget.bridge=function(b,d){c.fn[b]=function(i){var l=typeof i==="string",q=Array.prototype.slice.call(arguments,1),v=this;i=!l&&q.length?c.extend.apply(null,[true,i].concat(q)):i;if(l&&i.substring(0,1)==="_")return v;l?this.each(function(){var u=c.data(this,b),z=u&&c.isFunction(u[i])?u[i].apply(u,q):u;if(z!==u&&z!==undefined){v=z;return false}}):this.each(function(){var u=
c.data(this,b);if(u){i&&u.option(i);u._init()}else c.data(this,b,new d(i,this))});return v}};c.Widget=function(b,d){arguments.length&&this._createWidget(b,d)};c.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(b,d){this.element=c(d).data(this.widgetName,this);this.options=c.extend(true,{},this.options,c.metadata&&c.metadata.get(d)[this.widgetName],b);var i=this;this.element.bind("remove."+this.widgetName,function(){i.destroy()});this._create();
this._init()},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")},widget:function(){return this.element},option:function(b,d){var i=b,l=this;if(arguments.length===0)return c.extend({},l.options);if(typeof b==="string"){if(d===undefined)return this.options[b];i={};i[b]=d}c.each(i,function(q,
v){l._setOption(q,v)});return l},_setOption:function(b,d){this.options[b]=d;if(b==="disabled")this.widget()[d?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",d);return this},enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_trigger:function(b,d,i){var l=this.options[b];d=c.Event(d);d.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase();i=i||{};if(d.originalEvent){b=
c.event.props.length;for(var q;b;){q=c.event.props[--b];d[q]=d.originalEvent[q]}}this.element.trigger(d,i);return!(c.isFunction(l)&&l.call(this.element[0],d,i)===false||d.isDefaultPrevented())}}})(jQuery);
(function(c){c.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var a=this;this.element.bind("mousedown."+this.widgetName,function(b){return a._mouseDown(b)}).bind("click."+this.widgetName,function(b){if(a._preventClickEvent){a._preventClickEvent=false;b.stopImmediatePropagation();return false}});this.started=false},_mouseDestroy:function(){this.element.unbind("."+this.widgetName)},_mouseDown:function(a){a.originalEvent=a.originalEvent||{};if(!a.originalEvent.mouseHandled){this._mouseStarted&&
this._mouseUp(a);this._mouseDownEvent=a;var b=this,d=a.which==1,i=typeof this.options.cancel=="string"?c(a.target).parents().add(a.target).filter(this.options.cancel).length:false;if(!d||i||!this._mouseCapture(a))return true;this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet)this._mouseDelayTimer=setTimeout(function(){b.mouseDelayMet=true},this.options.delay);if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a)){this._mouseStarted=this._mouseStart(a)!==false;if(!this._mouseStarted){a.preventDefault();
return true}}this._mouseMoveDelegate=function(l){return b._mouseMove(l)};this._mouseUpDelegate=function(l){return b._mouseUp(l)};c(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);c.browser.safari||a.preventDefault();return a.originalEvent.mouseHandled=true}},_mouseMove:function(a){if(c.browser.msie&&!a.button)return this._mouseUp(a);if(this._mouseStarted){this._mouseDrag(a);return a.preventDefault()}if(this._mouseDistanceMet(a)&&
this._mouseDelayMet(a))(this._mouseStarted=this._mouseStart(this._mouseDownEvent,a)!==false)?this._mouseDrag(a):this._mouseUp(a);return!this._mouseStarted},_mouseUp:function(a){c(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=false;this._preventClickEvent=a.target==this._mouseDownEvent.target;this._mouseStop(a)}return false},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-
a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return true}})})(jQuery);
(function(c){c.widget("ui.slider",c.ui.mouse,{widgetEventPrefix:"slide",options:{animate:false,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null},_create:function(){var a=this,b=this.options;this._mouseSliding=this._keySliding=false;this._animateOff=true;this._handleIndex=null;this._detectOrientation();this._mouseInit();this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all");b.disabled&&this.element.addClass("ui-slider-disabled ui-disabled");
this.range=c([]);if(b.range){if(b.range===true){this.range=c("<div></div>");if(!b.values)b.values=[this._valueMin(),this._valueMin()];if(b.values.length&&b.values.length!==2)b.values=[b.values[0],b.values[0]]}else this.range=c("<div></div>");this.range.appendTo(this.element).addClass("ui-slider-range");if(b.range==="min"||b.range==="max")this.range.addClass("ui-slider-range-"+b.range);this.range.addClass("ui-widget-header")}c(".ui-slider-handle",this.element).length===0&&c("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle");
if(b.values&&b.values.length)for(;c(".ui-slider-handle",this.element).length<b.values.length;)c("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle");this.handles=c(".ui-slider-handle",this.element).addClass("ui-state-default ui-corner-all");this.handle=this.handles.eq(0);this.handles.add(this.range).filter("a").click(function(d){d.preventDefault()}).hover(function(){b.disabled||c(this).addClass("ui-state-hover")},function(){c(this).removeClass("ui-state-hover")}).focus(function(){if(b.disabled)c(this).blur();
else{c(".ui-slider .ui-state-focus").removeClass("ui-state-focus");c(this).addClass("ui-state-focus")}}).blur(function(){c(this).removeClass("ui-state-focus")});this.handles.each(function(d){c(this).data("index.ui-slider-handle",d)});this.handles.keydown(function(d){var i=true,l=c(this).data("index.ui-slider-handle"),q,v,u;if(!a.options.disabled){switch(d.keyCode){case c.ui.keyCode.HOME:case c.ui.keyCode.END:case c.ui.keyCode.PAGE_UP:case c.ui.keyCode.PAGE_DOWN:case c.ui.keyCode.UP:case c.ui.keyCode.RIGHT:case c.ui.keyCode.DOWN:case c.ui.keyCode.LEFT:i=
false;if(!a._keySliding){a._keySliding=true;c(this).addClass("ui-state-active");q=a._start(d,l);if(q===false)return}break}u=a.options.step;q=a.options.values&&a.options.values.length?(v=a.values(l)):(v=a.value());switch(d.keyCode){case c.ui.keyCode.HOME:v=a._valueMin();break;case c.ui.keyCode.END:v=a._valueMax();break;case c.ui.keyCode.PAGE_UP:v=a._trimAlignValue(q+(a._valueMax()-a._valueMin())/5);break;case c.ui.keyCode.PAGE_DOWN:v=a._trimAlignValue(q-(a._valueMax()-a._valueMin())/5);break;case c.ui.keyCode.UP:case c.ui.keyCode.RIGHT:if(q===
a._valueMax())return;v=a._trimAlignValue(q+u);break;case c.ui.keyCode.DOWN:case c.ui.keyCode.LEFT:if(q===a._valueMin())return;v=a._trimAlignValue(q-u);break}a._slide(d,l,v);return i}}).keyup(function(d){var i=c(this).data("index.ui-slider-handle");if(a._keySliding){a._keySliding=false;a._stop(d,i);a._change(d,i);c(this).removeClass("ui-state-active")}});this._refreshValue();this._animateOff=false},destroy:function(){this.handles.remove();this.range.remove();this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
this._mouseDestroy();return this},_mouseCapture:function(a){var b=this.options,d,i,l,q,v,u;if(b.disabled)return false;this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};this.elementOffset=this.element.offset();d={x:a.pageX,y:a.pageY};i=this._normValueFromMouse(d);l=this._valueMax()-this._valueMin()+1;v=this;this.handles.each(function(z){var g=Math.abs(i-v.values(z));if(l>g){l=g;q=c(this);u=z}});if(b.range===true&&this.values(1)===b.min){u+=1;q=c(this.handles[u])}if(this._start(a,
u)===false)return false;this._mouseSliding=true;v._handleIndex=u;q.addClass("ui-state-active").focus();b=q.offset();this._clickOffset=!c(a.target).parents().andSelf().is(".ui-slider-handle")?{left:0,top:0}:{left:a.pageX-b.left-q.width()/2,top:a.pageY-b.top-q.height()/2-(parseInt(q.css("borderTopWidth"),10)||0)-(parseInt(q.css("borderBottomWidth"),10)||0)+(parseInt(q.css("marginTop"),10)||0)};i=this._normValueFromMouse(d);this._slide(a,u,i);return this._animateOff=true},_mouseStart:function(){return true},
_mouseDrag:function(a){var b=this._normValueFromMouse({x:a.pageX,y:a.pageY});this._slide(a,this._handleIndex,b);return false},_mouseStop:function(a){this.handles.removeClass("ui-state-active");this._mouseSliding=false;this._stop(a,this._handleIndex);this._change(a,this._handleIndex);this._clickOffset=this._handleIndex=null;return this._animateOff=false},_detectOrientation:function(){this.orientation=this.options.orientation==="vertical"?"vertical":"horizontal"},_normValueFromMouse:function(a){var b;
if(this.orientation==="horizontal"){b=this.elementSize.width;a=a.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)}else{b=this.elementSize.height;a=a.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)}b=a/b;if(b>1)b=1;if(b<0)b=0;if(this.orientation==="vertical")b=1-b;a=this._valueMax()-this._valueMin();return this._trimAlignValue(this._valueMin()+b*a)},_start:function(a,b){var d={handle:this.handles[b],value:this.value()};if(this.options.values&&this.options.values.length){d.value=
this.values(b);d.values=this.values()}return this._trigger("start",a,d)},_slide:function(a,b,d){var i;if(this.options.values&&this.options.values.length){i=this.values(b?0:1);if(this.options.values.length===2&&this.options.range===true&&(b===0&&d>i||b===1&&d<i))d=i;if(d!==this.values(b)){i=this.values();i[b]=d;a=this._trigger("slide",a,{handle:this.handles[b],value:d,values:i});this.values(b?0:1);a!==false&&this.values(b,d,true)}}else if(d!==this.value()){a=this._trigger("slide",a,{handle:this.handles[b],
value:d});a!==false&&this.value(d)}},_stop:function(a,b){var d={handle:this.handles[b],value:this.value()};if(this.options.values&&this.options.values.length){d.value=this.values(b);d.values=this.values()}this._trigger("stop",a,d)},_change:function(a,b){if(!this._keySliding&&!this._mouseSliding){var d={handle:this.handles[b],value:this.value()};if(this.options.values&&this.options.values.length){d.value=this.values(b);d.values=this.values()}this._trigger("change",a,d)}},value:function(a){if(arguments.length){this.options.value=
this._trimAlignValue(a);this._refreshValue();this._change(null,0)}return this._value()},values:function(a,b){var d,i,l;if(arguments.length>1){this.options.values[a]=this._trimAlignValue(b);this._refreshValue();this._change(null,a)}if(arguments.length)if(c.isArray(arguments[0])){d=this.options.values;i=arguments[0];for(l=0;l<d.length;l+=1){d[l]=this._trimAlignValue(i[l]);this._change(null,l)}this._refreshValue()}else return this.options.values&&this.options.values.length?this._values(a):this.value();
else return this._values()},_setOption:function(a,b){var d,i=0;if(c.isArray(this.options.values))i=this.options.values.length;c.Widget.prototype._setOption.apply(this,arguments);switch(a){case "disabled":if(b){this.handles.filter(".ui-state-focus").blur();this.handles.removeClass("ui-state-hover");this.handles.attr("disabled","disabled");this.element.addClass("ui-disabled")}else{this.handles.removeAttr("disabled");this.element.removeClass("ui-disabled")}break;case "orientation":this._detectOrientation();
this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);this._refreshValue();break;case "value":this._animateOff=true;this._refreshValue();this._change(null,0);this._animateOff=false;break;case "values":this._animateOff=true;this._refreshValue();for(d=0;d<i;d+=1)this._change(null,d);this._animateOff=false;break}},_value:function(){return this._trimAlignValue(this.options.value)},_values:function(a){var b,d;if(arguments.length){b=this.options.values[a];
return this._trimAlignValue(b)}else{b=this.options.values.slice();for(d=0;d<b.length;d+=1)b[d]=this._trimAlignValue(b[d]);return b}},_trimAlignValue:function(a){if(a<this._valueMin())return this._valueMin();if(a>this._valueMax())return this._valueMax();var b=this.options.step>0?this.options.step:1,d=a%b;a-=d;if(Math.abs(d)*2>=b)a+=d>0?b:-b;return parseFloat(a.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var a=this.options.range,
b=this.options,d=this,i=!this._animateOff?b.animate:false,l,q={},v,u,z,g;if(this.options.values&&this.options.values.length)this.handles.each(function(o){l=(d.values(o)-d._valueMin())/(d._valueMax()-d._valueMin())*100;q[d.orientation==="horizontal"?"left":"bottom"]=l+"%";c(this).stop(1,1)[i?"animate":"css"](q,b.animate);if(d.options.range===true)if(d.orientation==="horizontal"){if(o===0)d.range.stop(1,1)[i?"animate":"css"]({left:l+"%"},b.animate);if(o===1)d.range[i?"animate":"css"]({width:l-v+"%"},
{queue:false,duration:b.animate})}else{if(o===0)d.range.stop(1,1)[i?"animate":"css"]({bottom:l+"%"},b.animate);if(o===1)d.range[i?"animate":"css"]({height:l-v+"%"},{queue:false,duration:b.animate})}v=l});else{u=this.value();z=this._valueMin();g=this._valueMax();l=g!==z?(u-z)/(g-z)*100:0;q[d.orientation==="horizontal"?"left":"bottom"]=l+"%";this.handle.stop(1,1)[i?"animate":"css"](q,b.animate);if(a==="min"&&this.orientation==="horizontal")this.range.stop(1,1)[i?"animate":"css"]({width:l+"%"},b.animate);
if(a==="max"&&this.orientation==="horizontal")this.range[i?"animate":"css"]({width:100-l+"%"},{queue:false,duration:b.animate});if(a==="min"&&this.orientation==="vertical")this.range.stop(1,1)[i?"animate":"css"]({height:l+"%"},b.animate);if(a==="max"&&this.orientation==="vertical")this.range[i?"animate":"css"]({height:100-l+"%"},{queue:false,duration:b.animate})}}});c.extend(c.ui.slider,{version:"1.8.2"})})(jQuery);
(function(){function c(e){if(!e||typeof e!="object")return e;var j=new e.constructor;for(var h in e)if(e.hasOwnProperty(h))j[h]=c(e[h]);return j}function a(e,j){if(e){var h,r=0,f=e.length;if(f===undefined)for(h in e){if(j.call(e[h],h,e[h])===false)break}else for(h=e[0];r<f&&j.call(h,r,h)!==false;h=e[++r]);return e}}function b(e,j,h){if(typeof j!="object")return e;e&&j&&a(j,function(r,f){if(!h||typeof f!="function")e[r]=f});return e}function d(e){var j=e.indexOf(".");if(j!=-1){var h=e.slice(0,j)||
"*",r=e.slice(j+1,e.length),f=[];a(document.getElementsByTagName(h),function(){this.className&&this.className.indexOf(r)!=-1&&f.push(this)});return f}}function i(e){e=e||window.event;if(e.preventDefault){e.stopPropagation();e.preventDefault()}else{e.returnValue=false;e.cancelBubble=true}return false}function l(e,j,h){e[j]=e[j]||[];e[j].push(h)}function q(){return"_"+(""+Math.random()).slice(2,10)}function v(e,j,h){function r(){function k(n){!f.isLoaded()&&f._fireEvent("onBeforeClick")!==false&&f.load();
return i(n)}if($f(e)){$f(e).getParent().innerHTML="";D=$f(e).getIndex();o[D]=f}else{o.push(f);D=o.length-1}J=parseInt(e.style.height,10)||e.clientHeight;E=e.id||"fp"+q();H=j.id||E+"_api";j.id=H;h.playerId=E;if(typeof h=="string")h={clip:{url:h}};if(typeof h.clip=="string")h.clip={url:h.clip};h.clip=h.clip||{};if(e.getAttribute("href",2)&&!h.clip.url)h.clip.url=e.getAttribute("href",2);p=new z(h.clip,-1,f);h.playlist=h.playlist||[h.clip];var s=0;a(h.playlist,function(){var n=this;if(typeof n=="object"&&
n.length)n={url:""+n};a(h.clip,function(x,B){if(B!==undefined&&n[x]===undefined&&typeof B!="function")n[x]=B});h.playlist[s]=n;n=new z(n,s,f);t.push(n);s++});a(h,function(n,x){if(typeof x=="function"){p[n]?p[n](x):l(A,n,x);delete h[n]}});a(h.plugins,function(n,x){if(x)y[n]=new g(n,x,f)});if(!h.plugins||h.plugins.controls===undefined)y.controls=new g("controls",null,f);y.canvas=new g("canvas",null,f);m=e.innerHTML;if(m.replace(/\s/g,"")!=="")if(e.addEventListener)e.addEventListener("click",k,false);
else e.attachEvent&&e.attachEvent("onclick",k);else{e.addEventListener&&e.addEventListener("click",i,false);f.load()}}var f=this,w=null,C=false,m,p,t=[],y={},A={},E,H,D,K,L,J;b(f,{id:function(){return E},isLoaded:function(){return w!==null&&w.fp_play!=undefined&&!C},getParent:function(){return e},hide:function(k){if(k)e.style.height="0px";if(f.isLoaded())w.style.height="0px";return f},show:function(){e.style.height=J+"px";if(f.isLoaded())w.style.height=L+"px";return f},isHidden:function(){return f.isLoaded()&&
parseInt(w.style.height,10)===0},load:function(k){if(!f.isLoaded()&&f._fireEvent("onBeforeLoad")!==false){var s=0;a(o,function(){this.unload(function(){if(++s==o.length){if((m=e.innerHTML)&&!flashembed.isSupported(j.version))e.innerHTML="";flashembed(e,j,{config:h});if(k){k.cached=true;l(A,"onLoad",k)}}})})}return f},unload:function(k){if(this.isFullscreen()&&/WebKit/i.test(navigator.userAgent)){k&&k(false);return f}if(m.replace(/\s/g,"")!==""){if(f._fireEvent("onBeforeUnload")===false){k&&k(false);
return f}C=true;try{if(w){w.fp_close();f._fireEvent("onUnload")}}catch(s){}setTimeout(function(){w=null;e.innerHTML=m;C=false;k&&k(true)},50)}else k&&k(false);return f},getClip:function(k){if(k===undefined)k=K;return t[k]},getCommonClip:function(){return p},getPlaylist:function(){return t},getPlugin:function(k){var s=y[k];if(!s&&f.isLoaded()){var n=f._api().fp_getPlugin(k);if(n){s=new g(k,n,f);y[k]=s}}return s},getScreen:function(){return f.getPlugin("screen")},getControls:function(){return f.getPlugin("controls")._fireEvent("onUpdate")},
getLogo:function(){try{return f.getPlugin("logo")._fireEvent("onUpdate")}catch(k){}},getPlay:function(){return f.getPlugin("play")._fireEvent("onUpdate")},getConfig:function(k){return k?c(h):h},getFlashParams:function(){return j},loadPlugin:function(k,s,n,x){if(typeof n=="function"){x=n;n={}}var B=x?q():"_";f._api().fp_loadPlugin(k,s,n,B);s={};s[B]=x;x=new g(k,null,f,s);return y[k]=x},getState:function(){return f.isLoaded()?w.fp_getState():-1},play:function(k,s){var n=function(){k!==undefined?f._api().fp_play(k,
s):f._api().fp_play()};if(f.isLoaded())n();else C?setTimeout(function(){f.play(k,s)},50):f.load(function(){n()});return f},getVersion:function(){if(f.isLoaded()){var k=w.fp_getVersion();k.push("flowplayer.js 3.2.0");return k}return"flowplayer.js 3.2.0"},_api:function(){if(!f.isLoaded())throw"Flowplayer "+f.id()+" not loaded when calling an API method";return w},setClip:function(k){f.setPlaylist([k]);return f},getIndex:function(){return D}});a("Click*,Load*,Unload*,Keypress*,Volume*,Mute*,Unmute*,PlaylistReplace,ClipAdd,Fullscreen*,FullscreenExit,Error,MouseOver,MouseOut".split(","),
function(){var k="on"+this;if(k.indexOf("*")!=-1){k=k.slice(0,k.length-1);var s="onBefore"+k.slice(2);f[s]=function(n){l(A,s,n);return f}}f[k]=function(n){l(A,k,n);return f}});a("pause,resume,mute,unmute,stop,toggle,seek,getStatus,getVolume,setVolume,getTime,isPaused,isPlaying,startBuffering,stopBuffering,isFullscreen,toggleFullscreen,reset,close,setPlaylist,addClip,playFeed,setKeyboardShortcutsEnabled,isKeyboardShortcutsEnabled".split(","),function(){var k=this;f[k]=function(s,n){if(!f.isLoaded())return f;
var x=null;x=s!==undefined&&n!==undefined?w["fp_"+k](s,n):s===undefined?w["fp_"+k]():w["fp_"+k](s);return x==="undefined"||x===undefined?f:x}});f._fireEvent=function(k){if(typeof k=="string")k=[k];var s=k[0],n=k[1],x=k[2],B=k[3],F=0;h.debug&&console.log("$f.fireEvent",[].slice.call(k));if(!f.isLoaded()&&s=="onLoad"&&n=="player"){w=w||document.getElementById(H);L=w.clientHeight;a(t,function(){this._fireEvent("onLoad")});a(y,function(N,I){I._fireEvent("onUpdate")});p._fireEvent("onLoad")}if(!(s=="onLoad"&&
n!="player")){if(s=="onError")if(typeof n=="string"||typeof n=="number"&&typeof x=="number"){n=x;x=B}if(s=="onContextMenu")a(h.contextMenu[n],function(N,I){I.call(f)});else if(s=="onPluginEvent"||s=="onBeforePluginEvent"){if(B=y[n.name||n]){B._fireEvent("onUpdate",n);return B._fireEvent(x,k.slice(3))}}else{if(s=="onPlaylistReplace"){t=[];var O=0;a(n,function(){t.push(new z(this,O++,f))})}if(s=="onClipAdd"){if(n.isInStream)return;n=new z(n,x,f);t.splice(x,0,n);for(F=x+1;F<t.length;F++)t[F].index++}var G=
true;if(typeof n=="number"&&n<t.length){K=n;if(k=t[n])G=k._fireEvent(s,x,B);if(!k||G!==false)G=p._fireEvent(s,x,B,k)}a(A[s],function(){G=this.call(f,n,x);this.cached&&A[s].splice(F,1);if(G===false)return false;F++});return G}}};if(typeof e=="string"){var M=document.getElementById(e);if(M){e=M;r()}else throw"Flowplayer cannot access element: "+e;}else r()}function u(e){this.length=e.length;this.each=function(j){a(e,j)};this.size=function(){return e.length}}var z=function(e,j,h){var r=this,f={},w={};
r.index=j;if(typeof e=="string")e={url:e};b(this,e,true);a("Begin*,Start,Pause*,Resume*,Seek*,Stop*,Finish*,LastSecond,Update,BufferFull,BufferEmpty,BufferStop".split(","),function(){var m="on"+this;if(m.indexOf("*")!=-1){m=m.slice(0,m.length-1);var p="onBefore"+m.slice(2);r[p]=function(t){l(w,p,t);return r}}r[m]=function(t){l(w,m,t);return r};if(j==-1){if(r[p])h[p]=r[p];if(r[m])h[m]=r[m]}});b(this,{onCuepoint:function(m,p){if(arguments.length==1){f.embedded=[null,m];return r}if(typeof m=="number")m=
[m];var t=q();f[t]=[m,p];h.isLoaded()&&h._api().fp_addCuepoints(m,j,t);return r},update:function(m){b(r,m);h.isLoaded()&&h._api().fp_updateClip(m,j);var p=h.getConfig();b(j==-1?p.clip:p.playlist[j],m,true)},_fireEvent:function(m,p,t,y){if(m=="onLoad"){a(f,function(H,D){D[0]&&h._api().fp_addCuepoints(D[0],j,H)});return false}y=y||r;if(m=="onCuepoint"){var A=f[p];if(A)return A[1].call(h,y,t)}if(p&&"onBeforeBegin,onMetaData,onStart,onUpdate,onResume".indexOf(m)!=-1){b(y,p);if(p.metaData)if(y.duration)y.fullDuration=
p.metaData.duration;else y.duration=p.metaData.duration}var E=true;a(w[m],function(){E=this.call(h,y,p,t)});return E}});if(e.onCuepoint){var C=e.onCuepoint;r.onCuepoint.apply(r,typeof C=="function"?[C]:C);delete e.onCuepoint}a(e,function(m,p){if(typeof p=="function"){l(w,m,p);delete e[m]}});if(j==-1)h.onCuepoint=this.onCuepoint},g=function(e,j,h,r){var f=this,w={},C=false;r&&b(w,r);a(j,function(m,p){if(typeof p=="function"){w[m]=p;delete j[m]}});b(this,{animate:function(m,p,t){if(!m)return f;if(typeof p==
"function"){t=p;p=500}if(typeof m=="string"){var y=m;m={};m[y]=p;p=500}if(t){var A=q();w[A]=t}if(p===undefined)p=500;j=h._api().fp_animate(e,m,p,A);return f},css:function(m,p){if(p!==undefined){var t={};t[m]=p;m=t}j=h._api().fp_css(e,m);b(f,j);return f},show:function(){this.display="block";h._api().fp_showPlugin(e);return f},hide:function(){this.display="none";h._api().fp_hidePlugin(e);return f},toggle:function(){this.display=h._api().fp_togglePlugin(e);return f},fadeTo:function(m,p,t){if(typeof p==
"function"){t=p;p=500}if(t){var y=q();w[y]=t}this.display=h._api().fp_fadeTo(e,m,p,y);this.opacity=m;return f},fadeIn:function(m,p){return f.fadeTo(1,m,p)},fadeOut:function(m,p){return f.fadeTo(0,m,p)},getName:function(){return e},getPlayer:function(){return h},_fireEvent:function(m,p){if(m=="onUpdate"){var t=h._api().fp_getPlugin(e);if(!t)return;b(f,t);delete f.methods;if(!C){a(t.methods,function(){var y=""+this;f[y]=function(){var A=[].slice.call(arguments);A=h._api().fp_invoke(e,y,A);return A===
"undefined"||A===undefined?f:A}});C=true}}if(t=w[m]){t=t.apply(f,p);m.slice(0,1)=="_"&&delete w[m];return t}return f}})},o=[];window.flowplayer=window.$f=function(){var e=null,j=arguments[0];if(!arguments.length){a(o,function(){if(this.isLoaded()){e=this;return false}});return e||o[0]}if(arguments.length==1)if(typeof j=="number")return o[j];else{if(j=="*")return new u(o);a(o,function(){if(this.id()==j.id||this.id()==j||this.getParent()==j){e=this;return false}});return e}if(arguments.length>1){var h=
arguments[1],r=arguments.length==3?arguments[2]:{};if(typeof h=="string")h={src:h};h=b({bgcolor:"#000000",version:[9,0],expressInstall:"http://static.flowplayer.org/swf/expressinstall.swf",cachebusting:true},h);if(typeof j=="string")if(j.indexOf(".")!=-1){var f=[];a(d(j),function(){f.push(new v(this,c(h),c(r)))});return new u(f)}else{var w=document.getElementById(j);return new v(w!==null?w:j,h,r)}else if(j)return new v(j,h,r)}return null};b(window.$f,{fireEvent:function(){var e=[].slice.call(arguments),
j=$f(e[0]);return j?j._fireEvent(e.slice(1)):null},addPlugin:function(e,j){v.prototype[e]=j;return $f},each:a,extend:b});if(typeof jQuery=="function")jQuery.fn.flowplayer=function(e,j){if(!arguments.length||typeof arguments[0]=="number"){var h=[];this.each(function(){var r=$f(this);r&&h.push(r)});return arguments.length?h[arguments[0]]:new u(h)}return this.each(function(){$f(this,c(e),j?c(j):{})})}})();
(function(){function c(g,o){if(o)for(key in o)if(o.hasOwnProperty(key))g[key]=o[key];return g}function a(g,o){var e=[];for(var j in g)if(g.hasOwnProperty(j))e[j]=o(g[j]);return e}function b(g,o,e){if(u.isSupported(o.version))g.innerHTML=u.getHTML(o,e);else if(o.expressInstall&&u.isSupported([6,65]))g.innerHTML=u.getHTML(c(o,{src:o.expressInstall}),{MMredirectURL:location.href,MMplayerType:"PlugIn",MMdoctitle:document.title});else{if(!g.innerHTML.replace(/\s/g,"")){g.innerHTML="<h2>Flash version "+
o.version+" or greater is required</h2><h3>"+(z[0]>0?"Your version is "+z:"You have no flash plugin installed")+"</h3>"+(g.tagName=="A"?"<p>Click here to download latest version</p>":"<p>Download latest version from <a href='"+i+"'>here</a></p>");if(g.tagName=="A")g.onclick=function(){location.href=i}}if(o.onFail){var j=o.onFail.call(this);if(typeof j=="string")g.innerHTML=j}}if(d)window[o.id]=document.getElementById(o.id);c(this,{getRoot:function(){return g},getOptions:function(){return o},getConf:function(){return e},
getApi:function(){return g.firstChild}})}var d=document.all,i="http://www.adobe.com/go/getflashplayer",l=typeof jQuery=="function",q=/(\d+)[^\d]+(\d+)[^\d]*(\d*)/,v={width:"100%",height:"100%",id:"_"+(""+Math.random()).slice(9),allowfullscreen:true,allowscriptaccess:"always",quality:"high",version:[3,0],onFail:null,expressInstall:null,w3c:false,cachebusting:false};window.attachEvent&&window.attachEvent("onbeforeunload",function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){}});
window.flashembed=function(g,o,e){if(typeof g=="string")g=document.getElementById(g.replace("#",""));if(g){if(typeof o=="string")o={src:o};return new b(g,c(c({},v),o),e)}};var u=c(window.flashembed,{conf:v,getVersion:function(){var g;try{g=navigator.plugins["Shockwave Flash"].description.slice(16)}catch(o){try{var e=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");g=e&&e.GetVariable("$version")}catch(j){}}return(g=q.exec(g))?[g[1],g[3]]:[0,0]},asString:function(g){if(g===null||g===undefined)return null;
var o=typeof g;if(o=="object"&&g.push)o="array";switch(o){case "string":g=g.replace(new RegExp('(["\\\\])',"g"),"\\$1");g=g.replace(/^\s?(\d+\.?\d+)%/,"$1pct");return'"'+g+'"';case "array":return"["+a(g,function(j){return u.asString(j)}).join(",")+"]";case "function":return'"function()"';case "object":o=[];for(var e in g)g.hasOwnProperty(e)&&o.push('"'+e+'":'+u.asString(g[e]));return"{"+o.join(",")+"}"}return String(g).replace(/\s/g," ").replace(/\'/g,'"')},getHTML:function(g,o){g=c({},g);var e='<object width="'+
g.width+'" height="'+g.height+'" id="'+g.id+'" name="'+g.id+'"';if(g.cachebusting)g.src+=(g.src.indexOf("?")!=-1?"&":"?")+Math.random();e+=g.w3c||!d?' data="'+g.src+'" type="application/x-shockwave-flash"':' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"';e+=">";if(g.w3c||d)e+='<param name="movie" value="'+g.src+'" />';g.width=g.height=g.id=g.w3c=g.src=null;g.onFail=g.version=g.expressInstall=null;for(var j in g)if(g[j])e+='<param name="'+j+'" value="'+g[j]+'" />';j="";if(o){for(var h in o)if(o[h]){var r=
o[h];j+=h+"="+(/function|object/.test(typeof r)?u.asString(r):r)+"&"}j=j.slice(0,-1);e+='<param name="flashvars" value=\''+j+"' />"}e+="</object>";return e},isSupported:function(g){return z[0]>g[0]||z[0]==g[0]&&z[1]>=g[1]}}),z=u.getVersion();if(l){jQuery.tools=jQuery.tools||{version:"3.2.0"};jQuery.tools.flashembed={conf:v};jQuery.fn.flashembed=function(g,o){return this.each(function(){$(this).data("flashembed",flashembed(this,g,o))})}}})();
var BFXPlayer=function(c){var a={preload:true,autoplay:false,controls:"default",loop:false,size:{width:"480px",height:"320px"},events:{error:function(){throw"VideoPlayer Error: error playing video";}}};this.options=c;this.settings=$.extend(true,{},a,c);if(!this.settings.selector)throw"VideoPlayer Error: you must supply a tag selector";this.$holder=$(this.settings.selector);this.$holder.css({position:"relative",width:this.settings.size.width,height:this.settings.size.height});$.extend(BFXPlayer.prototype,
BFXPlayer.Controls,BFXPlayer.HTML5,BFXPlayer.Flash,BFXPlayer.Methods)};
BFXPlayer.Controls={drawControls:function(){var c=this,a=$('<div id="controls"></div>');this.controls=a;a.addClass("controls").append(this.drawPlayControl()).append(this.drawSeekControl()).append(this.drawVolumeControl()).mouseover(function(){$(this).css({opacity:1})}).css({left:parseInt(c.settings.size.width)/2-190+"px"});this.$holder.bind("ready.video",function(b,d){c.hasNativeInputRangeSupport()?c.controls.find(".seek input").attr("max",d):c.controls.find(".seek").slider("option",{max:d})}).bind("resumed.video",
function(){$(".pause").removeClass("pause").addClass("play")}).bind("paused.video",function(){$(".play").removeClass("play").addClass("pause")}).bind("ended.video",function(){$(".pause").removeClass("pause").addClass("play")}).append(a).hover(function(){setTimeout(function(){a.animate({opacity:1},200)},200)},function(){setTimeout(function(){a.animate({opacity:0},200)},200)})},drawVolumeControl:function(){return this.hasNativeInputRangeSupport()?this.drawRangeVolumeControl():this.drawSliderVolumeControl()},
drawRangeVolumeControl:function(){var c=this,a=$('<div class="volume"><input type="range"></input></div>');a.find("input").attr("min",0).attr("max",1).attr("step",0.01).change(function(){c.$holder.trigger("volumeChange.controls",$(this).val())});return a},drawSliderVolumeControl:function(){var c=this,a=$('<div class="volume"></div>');a.slider({value:this.video.currentTime,min:0,max:1,step:0.01,value:1,slide:function(b,d){c.$holder.trigger("volumeChange.controls",d.value)}});return a},drawFullScreenControl:function(){var c=
this,a=$('<div class="full-screen"></div>');a.toggle(function(){c.elem.webkitEnterFullscreen()},function(){c.elem.webkitExitFullscreen()});return a},drawSeekControl:function(){return this.hasNativeInputRangeSupport()?this.drawRangeSeekControl():this.drawSliderSeekControl()},drawSliderSeekControl:function(){var c=this,a=$('<div class="seek"></div>');a.slider({value:0,min:0,step:0.1,slide:function(b,d){c.$holder.trigger("seekChange.controls",d.value)}});this.$holder.bind("timeUpdate.video",function(b,
d){a.slider("value",d)});return a},drawRangeSeekControl:function(){var c=this,a=$('<div class="seek"><input type="range"></input></div>');a.find("input").attr("min",0).attr("step",0.1).change(function(){c.$holder.trigger("seekChange.controls",$(this).val())}).val(0);this.$holder.bind("timeUpdate.video",function(b,d){a.find("input").val(d)});return a},drawPlayControl:function(){var c=this,a=$('<div class="play"></div>');a.click(function(){c.$holder.trigger($(this).attr("class")+".controls");$(this).toggleClass("play").toggleClass("pause")});
return a},hasNativeInputRangeSupport:function(){var c=document.createElement("input");c.setAttribute("type","range");return c.type!=="text"}};
BFXPlayer.HTML5={drawHTML5:function(){var c=this;this.$video=$('<video class="video-player"></video>');this.video=this.$video[0];this.$holder.append(this.video);(function(){c.$video.bind("loadeddata",function(){c.$holder.trigger("ready.video",c.video.duration)}).bind("timeupdate",function(){c.$holder.trigger("timeUpdate.video",c.video.currentTime)}).bind("ended",function(){c.$holder.trigger("ended.video")})})();c.settings.preload&&c.$video.attr("preload",true);c.settings.autoplay&&c.$video.attr("autoplay",
true);c.settings.size&&c.$video.height(c.settings.size.height).width(c.settings.size.width);c.settings.loop&&c.$video.attr("loop",true);(function(){$.each(c.settings.videos,function(){var a=$("<source></source>");a.attr("src",this.src).attr("type",this.type);c.$video.append(a)})})();(function(){$.each(c.settings.events,function(a,b){c.$video.bind(a,b)})})();(function(){c.$holder.bind("play.controls",function(){c.video.play()}).bind("pause.controls",function(){c.video.pause()}).bind("seekChange.controls",
function(a,b){c.video.currentTime=b}).bind("volumeChange.controls",function(a,b){c.video.volume=b})})()}};
BFXPlayer.Flash={drawFlash:function(){var c=this;c.$holder.append('<div id="flash-player"></div>');(function(){var a,b;$.each(c.settings.videos,function(){if(/.mp4/.test(this.src))a=this.src});$("#flash-player").flowplayer(c.settings.swf,{clip:{url:a,autoPlay:c.settings.autoplay,autoBuffering:true,onMetaData:function(d){c.$holder.trigger("ready.video",d.duration)},onPause:function(){clearInterval(b)},onResume:function(){b=setInterval(function(){c.$holder.trigger("timeUpdate.video",c.video.getTime())},
500)}},plugins:{controls:{backgroundColor:"#000",backgroundGradient:"none",all:false,scrubber:true,height:35,sliderColor:"#333333",progressColor:"#ca000a",bufferColor:"#666666",autoHide:true,play:true,volume:true,mute:false,stop:false,playlist:false,width:380,bottom:20,borderRadius:10,bufferColor:"#000000",progressColor:"#000000",volumeColor:"#000000",volumeSliderColor:"#000000",scrubberHeightRatio:0.4,scrubberBarHeightRatio:1,volumeSliderHeightRatio:0.4,volumeBarHeightRatio:1}},play:{opacity:0},
onClick:function(){return false}}).css({width:c.settings.size.width,height:c.settings.size.height});c.video=$("#flash-player").flowplayer(0)})();(function(){c.$holder.bind("play.controls",function(){c.video.play()});c.$holder.bind("pause.controls",function(){c.video.pause()});c.$holder.bind("seekChange.controls",function(a,b){c.video.seek(b)});c.$holder.bind("volumeChange.controls",function(a,b){c.video.setVolume(b*10)})})()}};
BFXPlayer.Methods={supportsHTML5:function(){return this.settings.forceFlash?false:!!document.createElement("video").canPlayType},draw:function(){$(this.settings.selector).addClass("bfx-player");if(this.supportsHTML5()){this.drawHTML5();this.drawControls()}else this.drawFlash()}};
