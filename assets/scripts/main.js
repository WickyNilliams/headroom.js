
/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */

(function(){

// Private helper vars
var lang = /\blang(?:uage)?-(?!\*)(\w+)\b/i;

var _ = self.Prism = {
  util: {
    type: function (o) { 
      return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
    },
    
    // Deep clone a language definition (e.g. to extend it)
    clone: function (o) {
      var type = _.util.type(o);

      switch (type) {
        case 'Object':
          var clone = {};
          
          for (var key in o) {
            if (o.hasOwnProperty(key)) {
              clone[key] = _.util.clone(o[key]);
            }
          }
          
          return clone;
          
        case 'Array':
          return o.slice();
      }
      
      return o;
    }
  },
  
  languages: {
    extend: function (id, redef) {
      var lang = _.util.clone(_.languages[id]);
      
      for (var key in redef) {
        lang[key] = redef[key];
      }
      
      return lang;
    },
    
    // Insert a token before another token in a language literal
    insertBefore: function (inside, before, insert, root) {
      root = root || _.languages;
      var grammar = root[inside];
      var ret = {};
        
      for (var token in grammar) {
      
        if (grammar.hasOwnProperty(token)) {
          
          if (token == before) {
          
            for (var newToken in insert) {
            
              if (insert.hasOwnProperty(newToken)) {
                ret[newToken] = insert[newToken];
              }
            }
          }
          
          ret[token] = grammar[token];
        }
      }
      
      return root[inside] = ret;
    },
    
    // Traverse a language definition with Depth First Search
    DFS: function(o, callback) {
      for (var i in o) {
        callback.call(o, i, o[i]);
        
        if (_.util.type(o) === 'Object') {
          _.languages.DFS(o[i], callback);
        }
      }
    }
  },

  highlightAll: function(async, callback) {
    var elements = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code');

    for (var i=0, element; element = elements[i++];) {
      _.highlightElement(element, async === true, callback);
    }
  },
    
  highlightElement: function(element, async, callback) {
    // Find language
    var language, grammar, parent = element;
    
    while (parent && !lang.test(parent.className)) {
      parent = parent.parentNode;
    }
    
    if (parent) {
      language = (parent.className.match(lang) || [,''])[1];
      grammar = _.languages[language];
    }

    if (!grammar) {
      return;
    }
    
    // Set language on the element, if not present
    element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
    
    // Set language on the parent, for styling
    parent = element.parentNode;
    
    if (/pre/i.test(parent.nodeName)) {
      parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language; 
    }

    var code = element.textContent;
    
    if(!code) {
      return;
    }
    
    code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
    
    var env = {
      element: element,
      language: language,
      grammar: grammar,
      code: code
    };
    
    _.hooks.run('before-highlight', env);
    
    if (async && self.Worker) {
      var worker = new Worker(_.filename);  
      
      worker.onmessage = function(evt) {
        env.highlightedCode = Token.stringify(JSON.parse(evt.data), language);

        _.hooks.run('before-insert', env);

        env.element.innerHTML = env.highlightedCode;
        
        callback && callback.call(env.element);
        _.hooks.run('after-highlight', env);
      };
      
      worker.postMessage(JSON.stringify({
        language: env.language,
        code: env.code
      }));
    }
    else {
      env.highlightedCode = _.highlight(env.code, env.grammar, env.language)

      _.hooks.run('before-insert', env);

      env.element.innerHTML = env.highlightedCode;
      
      callback && callback.call(element);
      
      _.hooks.run('after-highlight', env);
    }
  },
  
  highlight: function (text, grammar, language) {
    return Token.stringify(_.tokenize(text, grammar), language);
  },
  
  tokenize: function(text, grammar, language) {
    var Token = _.Token;
    
    var strarr = [text];
    
    var rest = grammar.rest;
    
    if (rest) {
      for (var token in rest) {
        grammar[token] = rest[token];
      }
      
      delete grammar.rest;
    }
                
    tokenloop: for (var token in grammar) {
      if(!grammar.hasOwnProperty(token) || !grammar[token]) {
        continue;
      }
      
      var pattern = grammar[token], 
        inside = pattern.inside,
        lookbehind = !!pattern.lookbehind,
        lookbehindLength = 0;
      
      pattern = pattern.pattern || pattern;
      
      for (var i=0; i<strarr.length; i++) { // Don’t cache length as it changes during the loop
        
        var str = strarr[i];
        
        if (strarr.length > text.length) {
          // Something went terribly wrong, ABORT, ABORT!
          break tokenloop;
        }
        
        if (str instanceof Token) {
          continue;
        }
        
        pattern.lastIndex = 0;
        
        var match = pattern.exec(str);
        
        if (match) {
          if(lookbehind) {
            lookbehindLength = match[1].length;
          }

          var from = match.index - 1 + lookbehindLength,
              match = match[0].slice(lookbehindLength),
              len = match.length,
              to = from + len,
            before = str.slice(0, from + 1),
            after = str.slice(to + 1); 

          var args = [i, 1];
          
          if (before) {
            args.push(before);
          }
          
          var wrapped = new Token(token, inside? _.tokenize(match, inside) : match);
          
          args.push(wrapped);
          
          if (after) {
            args.push(after);
          }
          
          Array.prototype.splice.apply(strarr, args);
        }
      }
    }

    return strarr;
  },
  
  hooks: {
    all: {},
    
    add: function (name, callback) {
      var hooks = _.hooks.all;
      
      hooks[name] = hooks[name] || [];
      
      hooks[name].push(callback);
    },
    
    run: function (name, env) {
      var callbacks = _.hooks.all[name];
      
      if (!callbacks || !callbacks.length) {
        return;
      }
      
      for (var i=0, callback; callback = callbacks[i++];) {
        callback(env);
      }
    }
  }
};

var Token = _.Token = function(type, content) {
  this.type = type;
  this.content = content;
};

Token.stringify = function(o, language, parent) {
  if (typeof o == 'string') {
    return o;
  }

  if (Object.prototype.toString.call(o) == '[object Array]') {
    return o.map(function(element) {
      return Token.stringify(element, language, o);
    }).join('');
  }
  
  var env = {
    type: o.type,
    content: Token.stringify(o.content, language, parent),
    tag: 'span',
    classes: ['token', o.type],
    attributes: {},
    language: language,
    parent: parent
  };
  
  if (env.type == 'comment') {
    env.attributes['spellcheck'] = 'true';
  }
  
  _.hooks.run('wrap', env);
  
  var attributes = '';
  
  for (var name in env.attributes) {
    attributes += name + '="' + (env.attributes[name] || '') + '"';
  }
  
  return '<' + env.tag + ' class="' + env.classes.join(' ') + '" ' + attributes + '>' + env.content + '</' + env.tag + '>';
  
};

if (!self.document) {
  // In worker
  self.addEventListener('message', function(evt) {
    var message = JSON.parse(evt.data),
        lang = message.language,
        code = message.code;
    
    self.postMessage(JSON.stringify(_.tokenize(code, _.languages[lang])));
    self.close();
  }, false);
  
  return;
}

// Get current script and highlight
var script = document.getElementsByTagName('script');

script = script[script.length - 1];

if (script) {
  _.filename = script.src;
  
  if (document.addEventListener && !script.hasAttribute('data-manual')) {
    document.addEventListener('DOMContentLoaded', _.highlightAll);
  }
}

})();;
Prism.languages.markup = {
  'comment': /&lt;!--[\w\W]*?-->/g,
  'prolog': /&lt;\?.+?\?>/,
  'doctype': /&lt;!DOCTYPE.+?>/,
  'cdata': /&lt;!\[CDATA\[[\w\W]*?]]>/i,
  'tag': {
    pattern: /&lt;\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|\w+))?\s*)*\/?>/gi,
    inside: {
      'tag': {
        pattern: /^&lt;\/?[\w:-]+/i,
        inside: {
          'punctuation': /^&lt;\/?/,
          'namespace': /^[\w-]+?:/
        }
      },
      'attr-value': {
        pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,
        inside: {
          'punctuation': /=|>|"/g
        }
      },
      'punctuation': /\/?>/g,
      'attr-name': {
        pattern: /[\w:-]+/g,
        inside: {
          'namespace': /^[\w-]+?:/
        }
      }
      
    }
  },
  'entity': /&amp;#?[\da-z]{1,8};/gi
};

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function(env) {

  if (env.type === 'entity') {
    env.attributes['title'] = env.content.replace(/&amp;/, '&');
  }
});;
Prism.languages.css = {
  'comment': /\/\*[\w\W]*?\*\//g,
  'atrule': {
    pattern: /@[\w-]+?.*?(;|(?=\s*{))/gi,
    inside: {
      'punctuation': /[;:]/g
    }
  },
  'url': /url\((["']?).*?\1\)/gi,
  'selector': /[^\{\}\s][^\{\};]*(?=\s*\{)/g,
  'property': /(\b|\B)[\w-]+(?=\s*:)/ig,
  'string': /("|')(\\?.)*?\1/g,
  'important': /\B!important\b/gi,
  'ignore': /&(lt|gt|amp);/gi,
  'punctuation': /[\{\};:]/g
};

if (Prism.languages.markup) {
  Prism.languages.insertBefore('markup', 'tag', {
    'style': {
      pattern: /(&lt;|<)style[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/style(>|&gt;)/ig,
      inside: {
        'tag': {
          pattern: /(&lt;|<)style[\w\W]*?(>|&gt;)|(&lt;|<)\/style(>|&gt;)/ig,
          inside: Prism.languages.markup.tag.inside
        },
        rest: Prism.languages.css
      }
    }
  });
};
Prism.languages.clike = {
  'comment': {
    pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])\/\/.*?(\r?\n|$))/g,
    lookbehind: true
  },
  'string': /("|')(\\?.)*?\1/g,
  'class-name': {
    pattern: /((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/ig,
    lookbehind: true,
    inside: {
      punctuation: /(\.|\\)/
    }
  },
  'keyword': /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,
  'boolean': /\b(true|false)\b/g,
  'function': {
    pattern: /[a-z0-9_]+\(/ig,
    inside: {
      punctuation: /\(/
    }
  },
  'number': /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,
  'operator': /[-+]{1,2}|!|&lt;=?|>=?|={1,3}|(&amp;){1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,
  'ignore': /&(lt|gt|amp);/gi,
  'punctuation': /[{}[\];(),.:]/g
};
;
Prism.languages.javascript = Prism.languages.extend('clike', {
  'keyword': /\b(var|let|if|else|while|do|for|return|in|instanceof|function|new|with|typeof|try|throw|catch|finally|null|break|continue)\b/g,
  'number': /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g
});

Prism.languages.insertBefore('javascript', 'keyword', {
  'regex': {
    pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
    lookbehind: true
  }
});

if (Prism.languages.markup) {
  Prism.languages.insertBefore('markup', 'tag', {
    'script': {
      pattern: /(&lt;|<)script[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/script(>|&gt;)/ig,
      inside: {
        'tag': {
          pattern: /(&lt;|<)script[\w\W]*?(>|&gt;)|(&lt;|<)\/script(>|&gt;)/ig,
          inside: Prism.languages.markup.tag.inside
        },
        rest: Prism.languages.javascript
      }
    }
  });
}
;

/*!
 * headroom.js v0.3.11 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2013 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

(function(global) {

  'use strict';

  window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
  
  /**
   * Handles debouncing of events via requestAnimationFrame
   * @see http://www.html5rocks.com/en/tutorials/speed/animations/
   * @param {Function} callback The callback to handle whichever event
   */
  function Debouncer (callback) {
    this.callback = callback;
    this.ticking = false;
  }
  Debouncer.prototype = {
    constructor : Debouncer,
  
    /**
     * dispatches the event to the supplied callback
     * @private
     */
    update : function() {
      this.callback && this.callback();
      this.ticking = false;
    },
  
    /**
     * ensures events don't get stacked
     * @private
     */
    requestTick : function() {
      if(!this.ticking) {
        requestAnimationFrame(this.update.bind(this));
        this.ticking = true;
      }
    },
  
    /**
     * Attach this as the event listeners
     */
    handleEvent : function() {
      this.requestTick();
    }
  };
  /**
   * UI enhancement for fixed headers.
   * Hides header when scrolling down
   * Shows header when scrolling up
   * @constructor
   * @param {DOMElement} elem the header element
   * @param {Object} options options for the widget
   */
  function Headroom (elem, options) {
    options = options || Headroom.options;
  
    this.lastKnownScrollY = 0;
    this.elem             = elem;
    this.debouncer        = new Debouncer(this.update.bind(this));
    this.tolerance        = options.tolerance;
    this.classes          = options.classes;
    this.offset           = options.offset;
    this.initialised      = false;
  }
  Headroom.prototype = {
    constructor : Headroom,
  
    /**
     * Initialises the widget
     */
    init : function() {
      this.elem.classList.add(this.classes.initial);
  
      // defer event registration to handle browser 
      // potentially restoring previous scroll position
      setTimeout(this.attachEvent.bind(this), 100);
    },
  
    /**
     * Unattaches events and removes any classes that were added
     */
    destroy : function() {
      this.initialised = false;
      window.removeEventListener('scroll', this.debouncer, false);
      this.elem.classList.remove(this.classes.unpinned, this.classes.pinned, this.classes.initial);
    },
  
    /**
     * Attaches the scroll event
     * @private
     */
    attachEvent : function() {
      if(!this.initialised){
        this.initialised = true;
        window.addEventListener('scroll', this.debouncer, false);
      }
    },
    
    /**
     * Unpins the header if it's currently pinned
     */
    unpin : function() {
      this.elem.classList.add(this.classes.unpinned);
      this.elem.classList.remove(this.classes.pinned);
    },
  
    /**
     * Pins the header if it's currently unpinned
     */
    pin : function() {
      this.elem.classList.remove(this.classes.unpinned);
      this.elem.classList.add(this.classes.pinned);
    },
  
    /**
     * Gets the Y scroll position
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY
     * @return {Number} pixels the page has scrolled along the Y-axis
     */
    getScrollY : function() {
      return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    },
  
    /**
     * Handles updating the state of the widget
     */
    update : function() {
      var currentScrollY     = this.getScrollY(),
        toleranceExceeded    = Math.abs(currentScrollY-this.lastKnownScrollY) >= this.tolerance;
  
      if(currentScrollY < 0) { // Ignore bouncy scrolling in OSX
        return;
      }
  
      if(toleranceExceeded) {
        if(currentScrollY > this.lastKnownScrollY && currentScrollY >= this.offset) {
          this.unpin();
        }
        else if(currentScrollY < this.lastKnownScrollY) {
          this.pin();
        }
      }
  
      this.lastKnownScrollY = currentScrollY;
    }
  };
  /**
   * Default options
   * @type {Object}
   */
  Headroom.options = {
    tolerance : 0,
    offset: 0,
    classes : {
      pinned : 'headroom--pinned',
      unpinned : 'headroom--unpinned',
      initial : 'headroom'
    }
  };

  global.Headroom = Headroom;

}(this));
;(function() {

  function CodeGenerator (widgetCode, pluginCode, dataApiCode) {
    this.pluginCode  = pluginCode;
    this.widgetCode  = widgetCode;
    this.dataApiCode = dataApiCode;
  }
  CodeGenerator.prototype = {
    constructor : CodeGenerator,

    widget : function(options) {
      return 'var headroom = new Headroom(elem, ' + JSON.stringify(options, null, '  ') +');\nheadroom.init();\n\n'
      + '// to destroy\n'
      + 'headroom.destroy();';
    },

    plugin : function(options) {
      return '$("header").headroom(' + JSON.stringify(options, null, '  ') + ');\n\n'
      + '// to destroy\n'
      + '$("#header").headroom("destroy");';
    },

    dataApi : function(options) {
      return '&lt;header data-headroom '
        + 'data-tolerance="' + options.tolerance + '" '
        + 'data-offset="' + options.offset + '" '
        + 'data-classes=\'' + JSON.stringify(options.classes) + '\'&gt;&lt;/header&gt;\n\n'
        + '// to destroy, in your JS:\n'
        + '$("header").data("headroom").destroy();';
    },

    generate : function(options) {
      this.pluginCode.innerHTML = this.plugin(options);
      Prism.highlightElement(this.pluginCode, false);
      
      this.widgetCode.innerHTML = this.widget(options);
      Prism.highlightElement(this.widgetCode, false);

      this.dataApiCode.innerHTML = this.dataApi(options);
      Prism.highlightElement(this.dataApiCode, false);
    }
  };
  

  window.CodeGenerator = CodeGenerator;
  
}());
;(function() {

  function HeadroomExample (inputs, styles, codeGenerator) {
    this.inputs = inputs;
    this.codeGenerator = codeGenerator;
    this.styles  = styles;
  }
  HeadroomExample.prototype = {
    constructor : HeadroomExample,

    init : function() {
      if(!this.inputs) {
        return;
      }
      var options = this.getOptions(this.inputs);

      this.headroom = new Headroom(document.querySelector('header'), options);
      this.headroom.init();
      this.codeGenerator.generate(options);
      this.listen();
    },

    getOptions : function () {
      var styleOptions = this.inputs.querySelectorAll('[name=style]');
      var style;

      for (var i = styleOptions.length - 1; i >= 0; i--) {
        if(styleOptions[i].checked) {
          style = this.styles[styleOptions[i].value];
          break;
        }
      }

      return {
        tolerance : parseInt(this.inputs.querySelector('#tolerance').value,10),
        offset : parseInt(this.inputs.querySelector('#offset').value,10),
        classes : style,
      };
    },

    updateWidget : function () {
      var options = this.getOptions(this.inputs);
      var headroom = this.headroom;

      headroom.destroy();
      headroom.classes = options.classes;
      headroom.offset = options.offset;
      headroom.tolerance = options.tolerance;
      headroom.init();

      this.codeGenerator.generate(options);
    },

    listen : function() {
      for (var i = this.inputs.length - 1; i >= 0; i--) {
        this.inputs[i].addEventListener('change', this.updateWidget.bind(this), false);
      }
    }
  };

  window.HeadroomExample = HeadroomExample;
  
}());
;(function() {
  var styles = {
    swing : {
      initial : 'animated',
      pinned : 'swingInX',
      unpinned : 'swingOutX'
    },
    slide : {
      initial : 'animated',
      pinned : 'slideDown',
      unpinned : 'slideUp'
    },
    flip : {
      initial : 'animated',
      pinned : 'flipInX',
      unpinned : 'flipOutX'
    },
    bounce : {
      initial : 'animated',
      pinned : 'bounceInDown',
      unpinned : 'bounceOutUp'
    }
  };

  var inputs = document.querySelector('form');
  var codeGenerator = new CodeGenerator(
    document.querySelector('.widget-code'),
    document.querySelector('.plugin-code'),
    document.querySelector('.data-api-code'));

  var example = new HeadroomExample(inputs, styles, codeGenerator);
  example.init();

}());