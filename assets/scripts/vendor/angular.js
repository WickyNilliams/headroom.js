(function(window,document,undefined){'use strict';var lowercase=function(string){return isString(string)?string.toLowerCase():string;};var uppercase=function(string){return isString(string)?string.toUpperCase():string;};var manualLowercase=function(s){return isString(s)?s.replace(/[A-Z]/g,function(ch){return String.fromCharCode(ch.charCodeAt(0)|32);}):s;};var manualUppercase=function(s){return isString(s)?s.replace(/[a-z]/g,function(ch){return String.fromCharCode(ch.charCodeAt(0)&~32);}):s;};if('i'!=='I'.toLowerCase()){lowercase=manualLowercase;uppercase=manualUppercase;}
var
msie=int((/msie (\d+)/.exec(lowercase(navigator.userAgent))||[])[1]),jqLite,jQuery,slice=[].slice,push=[].push,toString=Object.prototype.toString,angular=window.angular||(window.angular={}),angularModule,nodeName_,uid=['0','0','0'];function isArrayLike(obj){if(!obj||(typeof obj.length!=='number'))return false;if(typeof obj.hasOwnProperty!='function'&&typeof obj.constructor!='function'){return true;}else{return obj instanceof JQLite||(jQuery&&obj instanceof jQuery)||toString.call(obj)!=='[object Object]'||typeof obj.callee==='function';}}
function forEach(obj,iterator,context){var key;if(obj){if(isFunction(obj)){for(key in obj){if(key!='prototype'&& key!='length'&&key!='name'&&obj.hasOwnProperty(key)){iterator.call(context,obj[key],key);}}}else if(obj.forEach&&obj.forEach!==forEach){obj.forEach(iterator,context);}else if(isArrayLike(obj)){for(key=0;key<obj.length;key++)
iterator.call(context,obj[key],key);}else{for(key in obj){if(obj.hasOwnProperty(key)){iterator.call(context,obj[key],key);}}}}
return obj;}
function sortedKeys(obj){var keys=[];for(var key in obj){if(obj.hasOwnProperty(key)){keys.push(key);}}
return keys.sort();}
function forEachSorted(obj,iterator,context){var keys=sortedKeys(obj);for(var i=0;i<keys.length;i++){iterator.call(context,obj[keys[i]],keys[i]);}
return keys;}
function reverseParams(iteratorFn){return function(value,key){iteratorFn(key,value)};}
function nextUid(){var index=uid.length;var digit;while(index){index--;digit=uid[index].charCodeAt(0);if(digit==57){uid[index]='A';return uid.join('');}
if(digit==90){uid[index]='0';}else{uid[index]=String.fromCharCode(digit+1);return uid.join('');}}
uid.unshift('0');return uid.join('');}
/**/
function setHashKey(obj,h){if(h){obj.$$hashKey=h;}
else{delete obj.$$hashKey;}}
function extend(dst){var h=dst.$$hashKey;forEach(arguments,function(obj){if(obj!==dst){forEach(obj,function(value,key){dst[key]=value;});}});setHashKey(dst,h);return dst;}
function int(str){return parseInt(str,10);}
function inherit(parent,extra){return extend(new(extend(function(){},{prototype:parent}))(),extra);}
function noop(){}
noop.$inject=[];function identity($){return $;}
identity.$inject=[];function valueFn(value){return function(){return value;};}
function isUndefined(value){return typeof value=='undefined';}
function isDefined(value){return typeof value!='undefined';}
function isObject(value){return value!=null&&typeof value=='object';}
/**/
function isString(value){return typeof value=='string';}
function isNumber(value){return typeof value=='number';}
function isDate(value){return toString.apply(value)=='[object Date]';}
function isArray(value){return toString.apply(value)=='[object Array]';}
function isFunction(value){return typeof value=='function';}
function isWindow(obj){return obj&&obj.document&&obj.location&&obj.alert&&obj.setInterval;}
function isScope(obj){return obj&&obj.$evalAsync&&obj.$watch;}
function isFile(obj){return toString.apply(obj)==='[object File]';}
function isBoolean(value){return typeof value=='boolean';}
function trim(value){return isString(value)?value.replace(/^\s*/,'').replace(/\s*$/,''):value;}
/**/
function isElement(node){return node&&(node.nodeName||(node.bind&&node.find));}
function makeMap(str){var obj={},items=str.split(","),i;for(i=0;i<items.length;i++)
obj[items[i]]=true;return obj;}
if(msie<9){nodeName_=function(element){element=element.nodeName?element:element[0];return(element.scopeName&&element.scopeName!='HTML')?uppercase(element.scopeName+':'+element.nodeName):element.nodeName;};}else{nodeName_=function(element){return element.nodeName?element.nodeName:element[0].nodeName;};}
function map(obj,iterator,context){var results=[];forEach(obj,function(value,index,list){results.push(iterator.call(context,value,index,list));});return results;}
function size(obj,ownPropsOnly){var size=0,key;if(isArray(obj)||isString(obj)){return obj.length;}else if(isObject(obj)){for(key in obj)
if(!ownPropsOnly||obj.hasOwnProperty(key))
size++;}
return size;}
function includes(array,obj){return indexOf(array,obj)!=-1;}
function indexOf(array,obj){if(array.indexOf)return array.indexOf(obj);for(var i=0;i<array.length;i++){if(obj===array[i])return i;}
return-1;}
function arrayRemove(array,value){var index=indexOf(array,value);if(index>=0)
array.splice(index,1);return value;}
function isLeafNode(node){if(node){switch(node.nodeName){case "OPTION":case "PRE":case "TITLE":return true;}}
return false;}
/**/
function copy(source,destination){if(isWindow(source)||isScope(source))throw Error("Can't copy Window or Scope");if(!destination){destination=source;if(source){if(isArray(source)){destination=copy(source,[]);}else if(isDate(source)){destination=new Date(source.getTime());}else if(isObject(source)){destination=copy(source,{});}}}else{if(source===destination)throw Error("Can't copy equivalent objects or arrays");if(isArray(source)){destination.length=0;for(var i=0;i<source.length;i++){destination.push(copy(source[i]));}}else{var h=destination.$$hashKey;forEach(destination,function(value,key){delete destination[key];});for(var key in source){destination[key]=copy(source[key]);}
setHashKey(destination,h);}}
return destination;}
function shallowCopy(src,dst){dst=dst||{};for(var key in src){if(src.hasOwnProperty(key)&&key.substr(0,2)!=='$$'){dst[key]=src[key];}}
return dst;}
/**/
function equals(o1,o2){if(o1===o2)return true;if(o1===null||o2===null)return false;if(o1!==o1&&o2!==o2)return true;var t1=typeof o1,t2=typeof o2,length,key,keySet;if(t1==t2){if(t1=='object'){if(isArray(o1)){if((length=o1.length)==o2.length){for(key=0;key<length;key++){if(!equals(o1[key],o2[key]))return false;}
return true;}}else if(isDate(o1)){return isDate(o2)&&o1.getTime()==o2.getTime();}else{if(isScope(o1)||isScope(o2)||isWindow(o1)||isWindow(o2))return false;keySet={};for(key in o1){if(key.charAt(0)==='$'||isFunction(o1[key]))continue;if(!equals(o1[key],o2[key]))return false;keySet[key]=true;}
for(key in o2){if(!keySet[key]&&key.charAt(0)!=='$'&&o2[key]!==undefined&&!isFunction(o2[key]))return false;}
return true;}}}
return false;}
function concat(array1,array2,index){return array1.concat(slice.call(array2,index));}
function sliceArgs(args,startIndex){return slice.call(args,startIndex||0);}
/**/
function bind(self,fn){var curryArgs=arguments.length>2?sliceArgs(arguments,2):[];if(isFunction(fn)&&!(fn instanceof RegExp)){return curryArgs.length?function(){return arguments.length?fn.apply(self,curryArgs.concat(slice.call(arguments,0))):fn.apply(self,curryArgs);}:function(){return arguments.length?fn.apply(self,arguments):fn.call(self);};}else{return fn;}}
function toJsonReplacer(key,value){var val=value;if(/^\$+/.test(key)){val=undefined;}else if(isWindow(value)){val='$WINDOW';}else if(value&&document===value){val='$DOCUMENT';}else if(isScope(value)){val='$SCOPE';}
return val;}
function toJson(obj,pretty){return JSON.stringify(obj,toJsonReplacer,pretty?'  ':null);}
/**/
function fromJson(json){return isString(json)?JSON.parse(json):json;}
function toBoolean(value){if(value&&value.length!==0){var v=lowercase(""+value);value=!(v=='f'||v=='0'||v=='false'||v=='no'||v=='n'||v=='[]');}else{value=false;}
return value;}
function startingTag(element){element=jqLite(element).clone();try{element.html('');}catch(e){}
var TEXT_NODE=3;var elemHtml=jqLite('<div>').append(element).html();try{return element[0].nodeType===TEXT_NODE?lowercase(elemHtml):elemHtml.
match(/^(<[^>]+>)/)[1].
replace(/^<([\w\-]+)/,function(match,nodeName){return '<'+lowercase(nodeName);});}catch(e){return lowercase(elemHtml);}}
function parseKeyValue(keyValue){var obj={},key_value,key;forEach((keyValue||"").split('&'),function(keyValue){if(keyValue){key_value=keyValue.split('=');key=decodeURIComponent(key_value[0]);obj[key]=isDefined(key_value[1])?decodeURIComponent(key_value[1]):true;}});return obj;}
function toKeyValue(obj){var parts=[];forEach(obj,function(value,key){parts.push(encodeUriQuery(key,true)+(value===true?'':'='+encodeUriQuery(value,true)));});return parts.length?parts.join('&'):'';}
function encodeUriSegment(val){return encodeUriQuery(val,true).
replace(/%26/gi,'&').
replace(/%3D/gi,'=').
replace(/%2B/gi,'+');}
/**/
function encodeUriQuery(val,pctEncodeSpaces){return encodeURIComponent(val).
replace(/%40/gi,'@').
replace(/%3A/gi,':').
replace(/%24/g,'$').
replace(/%2C/gi,',').
replace(/%20/g,(pctEncodeSpaces?'%20':'+'));}
function angularInit(element,bootstrap){var elements=[element],appElement,module,names=['ng:app','ng-app','x-ng-app','data-ng-app'],NG_APP_CLASS_REGEXP=/\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;function append(element){element&&elements.push(element);}
forEach(names,function(name){names[name]=true;append(document.getElementById(name));name=name.replace(':','\\:');if(element.querySelectorAll){forEach(element.querySelectorAll('.'+name),append);forEach(element.querySelectorAll('.'+name+'\\:'),append);forEach(element.querySelectorAll('['+name+']'),append);}
});forEach(elements,function(element){if(!appElement){var className=' '+element.className+' ';var match=NG_APP_CLASS_REGEXP.exec(className);if(match){appElement=element;module=(match[2]||'').replace(/\s+/g,',');}else{forEach(element.attributes,function(attr){if(!appElement&&names[attr.name]){appElement=element;module=attr.value;}});}}});if(appElement){bootstrap(appElement,module?[module]:[]);}}
function bootstrap(element,modules){var resumeBootstrapInternal=function(){element=jqLite(element);modules=modules||[];modules.unshift(['$provide',function($provide){$provide.value('$rootElement',element);}]);modules.unshift('ng');var injector=createInjector(modules);injector.invoke(['$rootScope','$rootElement','$compile','$injector',function(scope,element,compile,injector){scope.$apply(function(){element.data('$injector',injector);compile(element)(scope);});}]);return injector;};var NG_DEFER_BOOTSTRAP=/^NG_DEFER_BOOTSTRAP!/;if(window&&!NG_DEFER_BOOTSTRAP.test(window.name)){return resumeBootstrapInternal();}
window.name=window.name.replace(NG_DEFER_BOOTSTRAP,'');angular.resumeBootstrap=function(extraModules){forEach(extraModules,function(module){modules.push(module);});resumeBootstrapInternal();};}
var SNAKE_CASE_REGEXP=/[A-Z]/g;function snake_case(name,separator){separator=separator||'_';return name.replace(SNAKE_CASE_REGEXP,function(letter,pos){return(pos?separator:'')+letter.toLowerCase();});}
function bindJQuery(){jQuery=window.jQuery;if(jQuery){jqLite=jQuery;extend(jQuery.fn,{scope:JQLitePrototype.scope,controller:JQLitePrototype.controller,injector:JQLitePrototype.injector,inheritedData:JQLitePrototype.inheritedData});JQLitePatchJQueryRemove('remove',true);JQLitePatchJQueryRemove('empty');JQLitePatchJQueryRemove('html');}else{jqLite=JQLite;}
angular.element=jqLite;}
function assertArg(arg,name,reason){if(!arg){throw new Error("Argument '"+(name||'?')+"' is "+ (reason||"required"));}
return arg;}
function assertArgFn(arg,name,acceptArrayAnnotation){if(acceptArrayAnnotation&&isArray(arg)){arg=arg[arg.length-1];}
assertArg(isFunction(arg),name,'not a function, got '+(arg&&typeof arg=='object'?arg.constructor.name||'Object':typeof arg));return arg;}
function setupModuleLoader(window){function ensure(obj,name,factory){return obj[name]||(obj[name]=factory());}
return ensure(ensure(window,'angular',Object),'module',function(){var modules={};/**/
return function module(name,requires,configFn){if(requires&&modules.hasOwnProperty(name)){modules[name]=null;}
return ensure(modules,name,function(){if(!requires){throw Error('No module: '+name);}
var invokeQueue=[];var runBlocks=[];var config=invokeLater('$injector','invoke');var moduleInstance={_invokeQueue:invokeQueue,_runBlocks:runBlocks,requires:requires,name:name,/**/
provider:invokeLater('$provide','provider'),factory:invokeLater('$provide','factory'),service:invokeLater('$provide','service'),value:invokeLater('$provide','value'),/**/
constant:invokeLater('$provide','constant','unshift'),filter:invokeLater('$filterProvider','register'),controller:invokeLater('$controllerProvider','register'),directive:invokeLater('$compileProvider','directive'),/**/
config:config,run:function(block){runBlocks.push(block);return this;}};if(configFn){config(configFn);}
return moduleInstance;/**/
function invokeLater(provider,method,insertMethod){return function(){invokeQueue[insertMethod||'push']([provider,method,arguments]);return moduleInstance;}}});};});}
var version={full:'1.0.7',major:1,minor:0,dot:7,codeName:'monochromatic-rainbow'};function publishExternalAPI(angular){extend(angular,{'bootstrap':bootstrap,'copy':copy,'extend':extend,'equals':equals,'element':jqLite,'forEach':forEach,'injector':createInjector,'noop':noop,'bind':bind,'toJson':toJson,'fromJson':fromJson,'identity':identity,'isUndefined':isUndefined,'isDefined':isDefined,'isString':isString,'isFunction':isFunction,'isObject':isObject,'isNumber':isNumber,'isElement':isElement,'isArray':isArray,'version':version,'isDate':isDate,'lowercase':lowercase,'uppercase':uppercase,'callbacks':{counter:0}});angularModule=setupModuleLoader(window);try{angularModule('ngLocale');}catch(e){angularModule('ngLocale',[]).provider('$locale',$LocaleProvider);}
angularModule('ng',['ngLocale'],['$provide',function ngModule($provide){$provide.provider('$compile',$CompileProvider).
directive({a:htmlAnchorDirective,input:inputDirective,textarea:inputDirective,form:formDirective,script:scriptDirective,select:selectDirective,style:styleDirective,option:optionDirective,ngBind:ngBindDirective,ngBindHtmlUnsafe:ngBindHtmlUnsafeDirective,ngBindTemplate:ngBindTemplateDirective,ngClass:ngClassDirective,ngClassEven:ngClassEvenDirective,ngClassOdd:ngClassOddDirective,ngCsp:ngCspDirective,ngCloak:ngCloakDirective,ngController:ngControllerDirective,ngForm:ngFormDirective,ngHide:ngHideDirective,ngInclude:ngIncludeDirective,ngInit:ngInitDirective,ngNonBindable:ngNonBindableDirective,ngPluralize:ngPluralizeDirective,ngRepeat:ngRepeatDirective,ngShow:ngShowDirective,ngSubmit:ngSubmitDirective,ngStyle:ngStyleDirective,ngSwitch:ngSwitchDirective,ngSwitchWhen:ngSwitchWhenDirective,ngSwitchDefault:ngSwitchDefaultDirective,ngOptions:ngOptionsDirective,ngView:ngViewDirective,ngTransclude:ngTranscludeDirective,ngModel:ngModelDirective,ngList:ngListDirective,ngChange:ngChangeDirective,required:requiredDirective,ngRequired:requiredDirective,ngValue:ngValueDirective}).
directive(ngAttributeAliasDirectives).
directive(ngEventDirectives);$provide.provider({$anchorScroll:$AnchorScrollProvider,$browser:$BrowserProvider,$cacheFactory:$CacheFactoryProvider,$controller:$ControllerProvider,$document:$DocumentProvider,$exceptionHandler:$ExceptionHandlerProvider,$filter:$FilterProvider,$interpolate:$InterpolateProvider,$http:$HttpProvider,$httpBackend:$HttpBackendProvider,$location:$LocationProvider,$log:$LogProvider,$parse:$ParseProvider,$route:$RouteProvider,$routeParams:$RouteParamsProvider,$rootScope:$RootScopeProvider,$q:$QProvider,$sniffer:$SnifferProvider,$templateCache:$TemplateCacheProvider,$timeout:$TimeoutProvider,$window:$WindowProvider});}]);}
/**/
var jqCache=JQLite.cache={},jqName=JQLite.expando='ng-'+new Date().getTime(),jqId=1,addEventListenerFn=(window.document.addEventListener?function(element,type,fn){element.addEventListener(type,fn,false);}:function(element,type,fn){element.attachEvent('on'+type,fn);}),removeEventListenerFn=(window.document.removeEventListener?function(element,type,fn){element.removeEventListener(type,fn,false);}:function(element,type,fn){element.detachEvent('on'+type,fn);});function jqNextId(){return++jqId;}
var SPECIAL_CHARS_REGEXP=/([\:\-\_]+(.))/g;var MOZ_HACK_REGEXP=/^moz([A-Z])/;/**/
function camelCase(name){return name.
replace(SPECIAL_CHARS_REGEXP,function(_,separator,letter,offset){return offset?letter.toUpperCase():letter;}).
replace(MOZ_HACK_REGEXP,'Moz$1');}
function JQLitePatchJQueryRemove(name,dispatchThis){var originalJqFn=jQuery.fn[name];originalJqFn=originalJqFn.$original||originalJqFn;removePatch.$original=originalJqFn;jQuery.fn[name]=removePatch;function removePatch(){var list=[this],fireEvent=dispatchThis,set,setIndex,setLength,element,childIndex,childLength,children,fns,events;while(list.length){set=list.shift();for(setIndex=0,setLength=set.length;setIndex<setLength;setIndex++){element=jqLite(set[setIndex]);if(fireEvent){element.triggerHandler('$destroy');}else{fireEvent=!fireEvent;}
for(childIndex=0,childLength=(children=element.children()).length;childIndex<childLength;childIndex++){list.push(jQuery(children[childIndex]));}}}
return originalJqFn.apply(this,arguments);}}
function JQLite(element){if(element instanceof JQLite){return element;}
if(!(this instanceof JQLite)){if(isString(element)&&element.charAt(0)!='<'){throw Error('selectors not implemented');}
return new JQLite(element);}
if(isString(element)){var div=document.createElement('div');div.innerHTML='<div>&#160;</div>' +element;div.removeChild(div.firstChild);JQLiteAddNodes(this,div.childNodes);this.remove();}else{JQLiteAddNodes(this,element);}}
function JQLiteClone(element){return element.cloneNode(true);}
function JQLiteDealoc(element){JQLiteRemoveData(element);for(var i=0,children=element.childNodes||[];i<children.length;i++){JQLiteDealoc(children[i]);}}
function JQLiteUnbind(element,type,fn){var events=JQLiteExpandoStore(element,'events'),handle=JQLiteExpandoStore(element,'handle');if(!handle)return;if(isUndefined(type)){forEach(events,function(eventHandler,type){removeEventListenerFn(element,type,eventHandler);delete events[type];});}else{if(isUndefined(fn)){removeEventListenerFn(element,type,events[type]);delete events[type];}else{arrayRemove(events[type],fn);}}}
function JQLiteRemoveData(element){var expandoId=element[jqName],expandoStore=jqCache[expandoId];if(expandoStore){if(expandoStore.handle){expandoStore.events.$destroy&&expandoStore.handle({},'$destroy');JQLiteUnbind(element);}
delete jqCache[expandoId];element[jqName]=undefined;}}
function JQLiteExpandoStore(element,key,value){var expandoId=element[jqName],expandoStore=jqCache[expandoId||-1];if(isDefined(value)){if(!expandoStore){element[jqName]=expandoId=jqNextId();expandoStore=jqCache[expandoId]={};}
expandoStore[key]=value;}else{return expandoStore&&expandoStore[key];}}
function JQLiteData(element,key,value){var data=JQLiteExpandoStore(element,'data'),isSetter=isDefined(value),keyDefined=!isSetter&&isDefined(key),isSimpleGetter=keyDefined&&!isObject(key);if(!data&&!isSimpleGetter){JQLiteExpandoStore(element,'data',data={});}
if(isSetter){data[key]=value;}else{if(keyDefined){if(isSimpleGetter){return data&&data[key];}else{extend(data,key);}}else{return data;}}}
function JQLiteHasClass(element,selector){return((" "+element.className+" ").replace(/[\n\t]/g," ").
indexOf(" "+selector+" ")>-1);}
function JQLiteRemoveClass(element,cssClasses){if(cssClasses){forEach(cssClasses.split(' '),function(cssClass){element.className=trim((" "+element.className+" ")
.replace(/[\n\t]/g," ")
.replace(" "+trim(cssClass)+" "," "));});}}
function JQLiteAddClass(element,cssClasses){if(cssClasses){forEach(cssClasses.split(' '),function(cssClass){if(!JQLiteHasClass(element,cssClass)){element.className=trim(element.className+' '+trim(cssClass));}});}}
function JQLiteAddNodes(root,elements){if(elements){elements=(!elements.nodeName&&isDefined(elements.length)&&!isWindow(elements))?elements:[elements];for(var i=0;i<elements.length;i++){root.push(elements[i]);}}}
function JQLiteController(element,name){return JQLiteInheritedData(element,'$'+(name||'ngController')+'Controller');}
function JQLiteInheritedData(element,name,value){element=jqLite(element);if(element[0].nodeType==9){element=element.find('html');}
while(element.length){if(value=element.data(name))return value;element=element.parent();}}
var JQLitePrototype=JQLite.prototype={ready:function(fn){var fired=false;function trigger(){if(fired)return;fired=true;fn();}
this.bind('DOMContentLoaded',trigger);JQLite(window).bind('load',trigger);},toString:function(){var value=[];forEach(this,function(e){value.push(''+e);});return '['+value.join(', ')+']';},eq:function(index){return(index>=0)?jqLite(this[index]):jqLite(this[this.length+index]);},length:0,push:push,sort:[].sort,splice:[].splice};//
var BOOLEAN_ATTR={};forEach('multiple,selected,checked,disabled,readOnly,required'.split(','),function(value){BOOLEAN_ATTR[lowercase(value)]=value;});var BOOLEAN_ELEMENTS={};forEach('input,select,option,textarea,button,form'.split(','),function(value){BOOLEAN_ELEMENTS[uppercase(value)]=true;});function getBooleanAttrName(element,name){var booleanAttr=BOOLEAN_ATTR[name.toLowerCase()];return booleanAttr&&BOOLEAN_ELEMENTS[element.nodeName]&&booleanAttr;}
forEach({data:JQLiteData,inheritedData:JQLiteInheritedData,scope:function(element){return JQLiteInheritedData(element,'$scope');},controller:JQLiteController,injector:function(element){return JQLiteInheritedData(element,'$injector');},removeAttr:function(element,name){element.removeAttribute(name);},hasClass:JQLiteHasClass,css:function(element,name,value){name=camelCase(name);if(isDefined(value)){element.style[name]=value;}else{var val;if(msie<=8){val=element.currentStyle&&element.currentStyle[name];if(val==='')val='auto';}
val=val||element.style[name];if(msie<=8){val=(val==='')?undefined:val;}
return val;}},attr:function(element,name,value){var lowercasedName=lowercase(name);if(BOOLEAN_ATTR[lowercasedName]){if(isDefined(value)){if(!!value){element[name]=true;element.setAttribute(name,lowercasedName);}else{element[name]=false;element.removeAttribute(lowercasedName);}}else{return(element[name]||
(element.attributes.getNamedItem(name)||noop).specified)?lowercasedName:undefined;}}else if(isDefined(value)){element.setAttribute(name,value);}else if(element.getAttribute){var ret=element.getAttribute(name,2);return ret===null?undefined:ret;}},prop:function(element,name,value){if(isDefined(value)){element[name]=value;}else{return element[name];}},text:extend((msie<9)?function(element,value){if(element.nodeType==1){if(isUndefined(value))
return element.innerText;element.innerText=value;}else{if(isUndefined(value))
return element.nodeValue;element.nodeValue=value;}}:function(element,value){if(isUndefined(value)){return element.textContent;}
element.textContent=value;},{$dv:''}),val:function(element,value){if(isUndefined(value)){return element.value;}
element.value=value;},html:function(element,value){if(isUndefined(value)){return element.innerHTML;}
for(var i=0,childNodes=element.childNodes;i<childNodes.length;i++){JQLiteDealoc(childNodes[i]);}
element.innerHTML=value;}},function(fn,name){JQLite.prototype[name]=function(arg1,arg2){var i,key;if(((fn.length==2&&(fn!==JQLiteHasClass&& fn!==JQLiteController))?arg1:arg2)===undefined){if(isObject(arg1)){for(i=0;i<this.length;i++){if(fn===JQLiteData){fn(this[i],arg1);}else{for(key in arg1){fn(this[i],key,arg1[key]);}}}
return this;}else{if(this.length)
return fn(this[0],arg1,arg2);}}else{for(i=0;i<this.length;i++){fn(this[i],arg1,arg2);}
return this;}
return fn.$dv;};});function createEventHandler(element,events){var eventHandler=function(event,type){if(!event.preventDefault){event.preventDefault=function(){event.returnValue=false;};}
if(!event.stopPropagation){event.stopPropagation=function(){event.cancelBubble=true;};}
if(!event.target){event.target=event.srcElement||document;}
if(isUndefined(event.defaultPrevented)){var prevent=event.preventDefault;event.preventDefault=function(){event.defaultPrevented=true;prevent.call(event);};event.defaultPrevented=false;}
event.isDefaultPrevented=function(){return event.defaultPrevented;};forEach(events[type||event.type],function(fn){fn.call(element,event);});if(msie<=8){event.preventDefault=null;event.stopPropagation=null;event.isDefaultPrevented=null;}else{delete event.preventDefault;delete event.stopPropagation;delete event.isDefaultPrevented;}};eventHandler.elem=element;return eventHandler;}//
forEach({removeData:JQLiteRemoveData,dealoc:JQLiteDealoc,bind:function bindFn(element,type,fn){var events=JQLiteExpandoStore(element,'events'),handle=JQLiteExpandoStore(element,'handle');if(!events)JQLiteExpandoStore(element,'events',events={});if(!handle)JQLiteExpandoStore(element,'handle',handle=createEventHandler(element,events));forEach(type.split(' '),function(type){var eventFns=events[type];if(!eventFns){if(type=='mouseenter'||type=='mouseleave'){var contains=document.body.contains||document.body.compareDocumentPosition?function(a,b){var adown=a.nodeType===9?a.documentElement:a,bup=b&&b.parentNode;return a===bup||!!(bup&&bup.nodeType===1&&(adown.contains?adown.contains(bup):a.compareDocumentPosition&&a.compareDocumentPosition(bup)&16));}:function(a,b){if(b){while((b=b.parentNode)){if(b===a){return true;}}}
return false;};events[type]=[];var eventmap={mouseleave:"mouseout",mouseenter:"mouseover"}
bindFn(element,eventmap[type],function(event){var ret,target=this,related=event.relatedTarget;if( !related||(related!==target&&!contains(target,related))){handle(event,type);}});}else{addEventListenerFn(element,type,handle);events[type]=[];}
eventFns=events[type]}
eventFns.push(fn);});},unbind:JQLiteUnbind,replaceWith:function(element,replaceNode){var index,parent=element.parentNode;JQLiteDealoc(element);forEach(new JQLite(replaceNode),function(node){if(index){parent.insertBefore(node,index.nextSibling);}else{parent.replaceChild(node,element);}
index=node;});},children:function(element){var children=[];forEach(element.childNodes,function(element){if(element.nodeType===1)
children.push(element);});return children;},contents:function(element){return element.childNodes||[];},append:function(element,node){forEach(new JQLite(node),function(child){if(element.nodeType===1)
element.appendChild(child);});},prepend:function(element,node){if(element.nodeType===1){var index=element.firstChild;forEach(new JQLite(node),function(child){if(index){element.insertBefore(child,index);}else{element.appendChild(child);index=child;}});}},wrap:function(element,wrapNode){wrapNode=jqLite(wrapNode)[0];var parent=element.parentNode;if(parent){parent.replaceChild(wrapNode,element);}
wrapNode.appendChild(element);},remove:function(element){JQLiteDealoc(element);var parent=element.parentNode;if(parent)parent.removeChild(element);},after:function(element,newElement){var index=element,parent=element.parentNode;forEach(new JQLite(newElement),function(node){parent.insertBefore(node,index.nextSibling); index=node;});},addClass:JQLiteAddClass,removeClass:JQLiteRemoveClass,toggleClass:function(element,selector,condition){if(isUndefined(condition)){condition=!JQLiteHasClass(element,selector);}(condition?JQLiteAddClass:JQLiteRemoveClass)(element,selector);},parent:function(element){var parent=element.parentNode;return parent&&parent.nodeType!==11?parent:null;},next:function(element){if(element.nextElementSibling){return element.nextElementSibling;}
var elm=element.nextSibling;while(elm!=null&&elm.nodeType!==1){elm=elm.nextSibling;}
return elm;},find:function(element,selector){return element.getElementsByTagName(selector);},clone:JQLiteClone,triggerHandler:function(element,eventName){var eventFns=(JQLiteExpandoStore(element,'events')||{})[eventName];forEach(eventFns,function(fn){fn.call(element,null);});}},function(fn,name){JQLite.prototype[name]=function(arg1,arg2){var value;for(var i=0;i<this.length;i++){if(value==undefined){value=fn(this[i],arg1,arg2);if(value!==undefined){value=jqLite(value);}}else{JQLiteAddNodes(value,fn(this[i],arg1,arg2));}}
return value==undefined?this:value;};});/**/
function hashKey(obj){var objType=typeof obj,key;if(objType=='object'&&obj!==null){if(typeof(key=obj.$$hashKey)=='function'){key=obj.$$hashKey();}else if(key===undefined){key=obj.$$hashKey=nextUid();}}else{key=obj;}
return objType+':'+key;}
function HashMap(array){forEach(array,this.put,this);}
HashMap.prototype={put:function(key,value){this[hashKey(key)]=value;},get:function(key){return this[hashKey(key)];},remove:function(key){var value=this[key=hashKey(key)];delete this[key];return value;}};function HashQueueMap(){}
HashQueueMap.prototype={push:function(key,value){var array=this[key=hashKey(key)];if(!array){this[key]=[value];}else{array.push(value);}},shift:function(key){var array=this[key=hashKey(key)];if(array){if(array.length==1){delete this[key];return array[0];}else{return array.shift();}}},peek:function(key){var array=this[hashKey(key)];if(array){return array[0];}}};var FN_ARGS=/^function\s*[^\(]*\(\s*([^\)]*)\)/m;var FN_ARG_SPLIT=/,/;var FN_ARG=/^\s*(_?)(\S+?)\1\s*$/;var STRIP_COMMENTS=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;function annotate(fn){var $inject,fnText,argDecl,last;if(typeof fn=='function'){if(!($inject=fn.$inject)){$inject=[];fnText=fn.toString().replace(STRIP_COMMENTS,'');argDecl=fnText.match(FN_ARGS);forEach(argDecl[1].split(FN_ARG_SPLIT),function(arg){arg.replace(FN_ARG,function(all,underscore,name){$inject.push(name);});});fn.$inject=$inject;}}else if(isArray(fn)){last=fn.length-1;assertArgFn(fn[last],'fn');$inject=fn.slice(0,last);}else{assertArgFn(fn,'fn',true);}
return $inject;}
/**/
/**/
/**/
/**/
function createInjector(modulesToLoad){var INSTANTIATING={},providerSuffix='Provider',path=[],loadedModules=new HashMap(),providerCache={$provide:{provider:supportObject(provider),factory:supportObject(factory),service:supportObject(service),value:supportObject(value),constant:supportObject(constant),decorator:decorator}},providerInjector=createInternalInjector(providerCache,function(){throw Error("Unknown provider: "+path.join(' <- '));}),instanceCache={},instanceInjector=(instanceCache.$injector=createInternalInjector(instanceCache,function(servicename){var provider=providerInjector.get(servicename+providerSuffix);return instanceInjector.invoke(provider.$get,provider);}));forEach(loadModules(modulesToLoad),function(fn){instanceInjector.invoke(fn||noop);});return instanceInjector;function supportObject(delegate){return function(key,value){if(isObject(key)){forEach(key,reverseParams(delegate));}else{return delegate(key,value);}}}
function provider(name,provider_){if(isFunction(provider_)||isArray(provider_)){provider_=providerInjector.instantiate(provider_);}
if(!provider_.$get){throw Error('Provider '+name+' must define $get factory method.');}
return providerCache[name+providerSuffix]=provider_;}
function factory(name,factoryFn){return provider(name,{$get:factoryFn});}
function service(name,constructor){return factory(name,['$injector',function($injector){return $injector.instantiate(constructor);}]);}
function value(name,value){return factory(name,valueFn(value));}
function constant(name,value){providerCache[name]=value;instanceCache[name]=value;}
function decorator(serviceName,decorFn){var origProvider=providerInjector.get(serviceName+providerSuffix),orig$get=origProvider.$get;origProvider.$get=function(){var origInstance=instanceInjector.invoke(orig$get,origProvider);return instanceInjector.invoke(decorFn,null,{$delegate:origInstance});};}
function loadModules(modulesToLoad){var runBlocks=[];forEach(modulesToLoad,function(module){if(loadedModules.get(module))return;loadedModules.put(module,true);if(isString(module)){var moduleFn=angularModule(module); runBlocks=runBlocks.concat(loadModules(moduleFn.requires)).concat(moduleFn._runBlocks);try{for(var invokeQueue=moduleFn._invokeQueue,i=0,ii=invokeQueue.length;i<ii;i++){var invokeArgs=invokeQueue[i],provider=invokeArgs[0]=='$injector'?providerInjector:providerInjector.get(invokeArgs[0]);provider[invokeArgs[1]].apply(provider,invokeArgs[2]);}}catch(e){if(e.message)e.message+=' from '+module;throw e;}}else if(isFunction(module)){try{runBlocks.push(providerInjector.invoke(module));}catch(e){if(e.message)e.message+=' from '+module;throw e;}}else if(isArray(module)){try{runBlocks.push(providerInjector.invoke(module));}catch(e){ if(e.message)e.message+=' from '+String(module[module.length-1]);throw e;}}else{assertArgFn(module,'module');}});return runBlocks;}
function createInternalInjector(cache,factory){function getService(serviceName){if(typeof serviceName!=='string'){throw Error('Service name expected');}
if(cache.hasOwnProperty(serviceName)){if(cache[serviceName]===INSTANTIATING){throw Error('Circular dependency: '+path.join(' <- '));}
return cache[serviceName];}else{try{path.unshift(serviceName);cache[serviceName]=INSTANTIATING;return cache[serviceName]=factory(serviceName);}finally{path.shift();}}}
function invoke(fn,self,locals){var args=[],$inject=annotate(fn),length,i,key;for(i=0,length=$inject.length;i<length;i++){key=$inject[i];args.push(locals&&locals.hasOwnProperty(key)?locals[key]:getService(key));}
if(!fn.$inject){fn=fn[length];}
switch(self?-1:args.length){case 0:return fn();case 1:return fn(args[0]);case 2:return fn(args[0],args[1]);case 3:return fn(args[0],args[1],args[2]);case 4:return fn(args[0],args[1],args[2],args[3]);case 5:return fn(args[0],args[1],args[2],args[3],args[4]);case 6:return fn(args[0],args[1],args[2],args[3],args[4],args[5]);case 7:return fn(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);case 8:return fn(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);case 9:return fn(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7],args[8]);case 10:return fn(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7],args[8],args[9]);default:return fn.apply(self,args);}}
function instantiate(Type,locals){var Constructor=function(){},instance,returnedValue;Constructor.prototype=(isArray(Type)?Type[Type.length-1]:Type).prototype;instance=new Constructor();returnedValue=invoke(Type,instance,locals);return isObject(returnedValue)?returnedValue:instance;}
return{invoke:invoke,instantiate:instantiate,get:getService,annotate:annotate};}}
function $AnchorScrollProvider(){var autoScrollingEnabled=true;this.disableAutoScrolling=function(){autoScrollingEnabled=false;};this.$get=['$window','$location','$rootScope',function($window,$location,$rootScope){var document=$window.document;//
function getFirstAnchor(list){var result=null;forEach(list,function(element){if(!result&&lowercase(element.nodeName)==='a')result=element;});return result;}
function scroll(){var hash=$location.hash(),elm;if(!hash)$window.scrollTo(0,0);else if((elm=document.getElementById(hash)))elm.scrollIntoView();else if((elm=getFirstAnchor(document.getElementsByName(hash))))elm.scrollIntoView();else if(hash==='top')$window.scrollTo(0,0);}
if(autoScrollingEnabled){$rootScope.$watch(function autoScrollWatch(){return $location.hash();},function autoScrollWatchAction(){$rootScope.$evalAsync(scroll);});}
return scroll;}];}
function Browser(window,document,$log,$sniffer){var self=this,rawDocument=document[0],location=window.location,history=window.history,setTimeout=window.setTimeout,clearTimeout=window.clearTimeout,pendingDeferIds={};self.isMock=false;var outstandingRequestCount=0;var outstandingRequestCallbacks=[];self.$$completeOutstandingRequest=completeOutstandingRequest;self.$$incOutstandingRequestCount=function(){outstandingRequestCount++;};function completeOutstandingRequest(fn){try{fn.apply(null,sliceArgs(arguments,1));}finally{outstandingRequestCount--;if(outstandingRequestCount===0){while(outstandingRequestCallbacks.length){try{outstandingRequestCallbacks.pop()();}catch(e){$log.error(e);}}}}}
self.notifyWhenNoOutstandingRequests=function(callback){forEach(pollFns,function(pollFn){pollFn();});if(outstandingRequestCount===0){callback();}else{outstandingRequestCallbacks.push(callback);}};var pollFns=[],pollTimeout;self.addPollFn=function(fn){if(isUndefined(pollTimeout))startPoller(100,setTimeout);pollFns.push(fn);return fn;};function startPoller(interval,setTimeout){(function check(){forEach(pollFns,function(pollFn){pollFn();});pollTimeout=setTimeout(check,interval);})();}
var lastBrowserUrl=location.href,baseElement=document.find('base');self.url=function(url,replace){if(url){if(lastBrowserUrl==url)return;lastBrowserUrl=url;if($sniffer.history){if(replace)history.replaceState(null,'',url);else{history.pushState(null,'',url);baseElement.attr('href',baseElement.attr('href'));}}else{if(replace)location.replace(url);else location.href=url;}
return self;}else{return location.href.replace(/%27/g,"'");}};var urlChangeListeners=[],urlChangeInit=false;function fireUrlChange(){if(lastBrowserUrl==self.url())return;lastBrowserUrl=self.url();forEach(urlChangeListeners,function(listener){listener(self.url());});}
/***/
self.onUrlChange=function(callback){if(!urlChangeInit){if($sniffer.history)jqLite(window).bind('popstate',fireUrlChange);if($sniffer.hashchange)jqLite(window).bind('hashchange',fireUrlChange);else self.addPollFn(fireUrlChange);urlChangeInit=true;}
urlChangeListeners.push(callback);return callback;};self.baseHref=function(){var href=baseElement.attr('href');return href?href.replace(/^https?\:\/\/[^\/]*/,''):'';};//
var lastCookies={};var lastCookieString='';var cookiePath=self.baseHref();/**/
self.cookies=function(name,value){var cookieLength,cookieArray,cookie,i,index;if(name){if(value===undefined){rawDocument.cookie=escape(name)+"=;path="+cookiePath+";expires=Thu, 01 Jan 1970 00:00:00 GMT";}else{if(isString(value)){cookieLength=(rawDocument.cookie=escape(name)+'='+escape(value)+';path='+cookiePath).length+1;if(cookieLength>4096){$log.warn("Cookie '"+name+"' possibly not set or overflowed because it was too large ("+
cookieLength+" > 4096 bytes)!");}}}}else{if(rawDocument.cookie!==lastCookieString){lastCookieString=rawDocument.cookie;cookieArray=lastCookieString.split("; ");lastCookies={};for(i=0;i<cookieArray.length;i++){cookie=cookieArray[i];index=cookie.indexOf('=');if(index>0){var name=unescape(cookie.substring(0,index));if(lastCookies[name]===undefined){lastCookies[name]=unescape(cookie.substring(index+1));}}}}
return lastCookies;}};/**/
self.defer=function(fn,delay){var timeoutId;outstandingRequestCount++;timeoutId=setTimeout(function(){delete pendingDeferIds[timeoutId];completeOutstandingRequest(fn);},delay||0);pendingDeferIds[timeoutId]=true;return timeoutId;};self.defer.cancel=function(deferId){if(pendingDeferIds[deferId]){delete pendingDeferIds[deferId];clearTimeout(deferId);completeOutstandingRequest(noop);return true;}
return false;};}
function $BrowserProvider(){this.$get=['$window','$log','$sniffer','$document',function($window,$log,$sniffer,$document){return new Browser($window,$document,$log,$sniffer);}];}
/**/
function $CacheFactoryProvider(){this.$get=function(){var caches={};function cacheFactory(cacheId,options){if(cacheId in caches){throw Error('cacheId '+cacheId+' taken');}
var size=0,stats=extend({},options,{id:cacheId}),data={},capacity=(options&&options.capacity)||Number.MAX_VALUE,lruHash={},freshEnd=null,staleEnd=null;return caches[cacheId]={put:function(key,value){var lruEntry=lruHash[key]||(lruHash[key]={key:key});refresh(lruEntry);if(isUndefined(value))return;if(!(key in data))size++;data[key]=value;if(size>capacity){this.remove(staleEnd.key);}},get:function(key){var lruEntry=lruHash[key];if(!lruEntry)return;refresh(lruEntry);return data[key];},remove:function(key){var lruEntry=lruHash[key];if(!lruEntry)return;if(lruEntry==freshEnd)freshEnd=lruEntry.p;if(lruEntry==staleEnd)staleEnd=lruEntry.n;link(lruEntry.n,lruEntry.p);delete lruHash[key];delete data[key];size--;},removeAll:function(){data={};size=0;lruHash={};freshEnd=staleEnd=null;},destroy:function(){data=null;stats=null;lruHash=null;delete caches[cacheId];},info:function(){return extend({},stats,{size:size});}};function refresh(entry){if(entry!=freshEnd){if(!staleEnd){staleEnd=entry;}else if(staleEnd==entry){staleEnd=entry.n;}
link(entry.n,entry.p);link(entry,freshEnd);freshEnd=entry;freshEnd.n=null;}}
function link(nextEntry,prevEntry){if(nextEntry!=prevEntry){if(nextEntry)nextEntry.p=prevEntry;if(prevEntry)prevEntry.n=nextEntry;}}}
cacheFactory.info=function(){var info={};forEach(caches,function(cache,cacheId){info[cacheId]=cache.info();});return info;};cacheFactory.get=function(cacheId){return caches[cacheId];};return cacheFactory;};}
function $TemplateCacheProvider(){this.$get=['$cacheFactory',function($cacheFactory){return $cacheFactory('templates');}];}
var NON_ASSIGNABLE_MODEL_EXPRESSION='Non-assignable model expression: ';/**/
$CompileProvider.$inject=['$provide'];function $CompileProvider($provide){var hasDirectives={},Suffix='Directive',COMMENT_DIRECTIVE_REGEXP=/^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/,CLASS_DIRECTIVE_REGEXP=/(([\d\w\-_]+)(?:\:([^;]+))?;?)/,MULTI_ROOT_TEMPLATE_ERROR='Template must have exactly one root element. was: ',urlSanitizationWhitelist=/^\s*(https?|ftp|mailto|file):/;/**/
this.directive=function registerDirective(name,directiveFactory){if(isString(name)){assertArg(directiveFactory,'directive');if(!hasDirectives.hasOwnProperty(name)){hasDirectives[name]=[];$provide.factory(name+Suffix,['$injector','$exceptionHandler',function($injector,$exceptionHandler){var directives=[];forEach(hasDirectives[name],function(directiveFactory){try{var directive=$injector.invoke(directiveFactory);if(isFunction(directive)){directive={compile:valueFn(directive)};}else if(!directive.compile&&directive.link){directive.compile=valueFn(directive.link);}
directive.priority=directive.priority||0;directive.name=directive.name||name;directive.require=directive.require||(directive.controller&&directive.name);directive.restrict=directive.restrict||'A';directives.push(directive);}catch(e){$exceptionHandler(e);}});return directives;}]);}
hasDirectives[name].push(directiveFactory);}else{forEach(name,reverseParams(registerDirective));}
return this;};/**/
this.urlSanitizationWhitelist=function(regexp){if(isDefined(regexp)){urlSanitizationWhitelist=regexp;return this;}
return urlSanitizationWhitelist;};this.$get=['$injector','$interpolate','$exceptionHandler','$http','$templateCache','$parse','$controller','$rootScope','$document',function($injector,$interpolate,$exceptionHandler,$http,$templateCache,$parse,$controller,$rootScope,$document){var Attributes=function(element,attr){this.$$element=element;this.$attr=attr||{};};Attributes.prototype={$normalize:directiveNormalize,$set:function(key,value,writeAttr,attrName){var booleanKey=getBooleanAttrName(this.$$element[0],key),$$observers=this.$$observers,normalizedVal;
if(booleanKey){this.$$element.prop(key,value);attrName=booleanKey;}
this[key]=value;if(attrName){this.$attr[key]=attrName;}else{attrName=this.$attr[key];if(!attrName){this.$attr[key]=attrName=snake_case(key,'-');}}
if(nodeName_(this.$$element[0])==='A'&&key==='href'){urlSanitizationNode.setAttribute('href',value);normalizedVal=urlSanitizationNode.href;if(!normalizedVal.match(urlSanitizationWhitelist)){this[key]=value='unsafe:'+normalizedVal;}}
if(writeAttr!==false){if(value===null||value===undefined){this.$$element.removeAttr(attrName);}else{this.$$element.attr(attrName,value);}}
$$observers&&forEach($$observers[key],function(fn){try{fn(value);}catch(e){$exceptionHandler(e);}});},$observe:function(key,fn){var attrs=this,$$observers=(attrs.$$observers||(attrs.$$observers={})),listeners=($$observers[key]||($$observers[key]=[]));listeners.push(fn);$rootScope.$evalAsync(function(){if(!listeners.$$inter){//
fn(attrs[key]);}});return fn;}};var urlSanitizationNode=$document[0].createElement('a'),startSymbol=$interpolate.startSymbol(),endSymbol=$interpolate.endSymbol(),denormalizeTemplate=(startSymbol=='{{'||endSymbol=='}}')?identity:function denormalizeTemplate(template){return template.replace(/\{\{/g,startSymbol).replace(/}}/g,endSymbol);};return compile;function compile($compileNodes,transcludeFn,maxPriority){if(!($compileNodes instanceof jqLite)){$compileNodes=jqLite($compileNodes);}//
forEach($compileNodes,function(node,index){if(node.nodeType==3&&node.nodeValue.match(/\S+/)){$compileNodes[index]=jqLite(node).wrap('<span></span>').parent()[0];}});var compositeLinkFn=compileNodes($compileNodes,transcludeFn,$compileNodes,maxPriority);return function publicLinkFn(scope,cloneConnectFn){assertArg(scope,'scope');var $linkNode=cloneConnectFn?JQLitePrototype.clone.call($compileNodes):$compileNodes;for(var i=0,ii=$linkNode.length;i<ii;i++){var node=$linkNode[i];if(node.nodeType==1||node.nodeType==9){$linkNode.eq(i).data('$scope',scope);}}
safeAddClass($linkNode,'ng-scope');if(cloneConnectFn)cloneConnectFn($linkNode,scope);if(compositeLinkFn)compositeLinkFn(scope,$linkNode,$linkNode);return $linkNode;};}
function wrongMode(localName,mode){throw Error("Unsupported '"+mode+"' for '"+localName+"'.");}
function safeAddClass($element,className){try{$element.addClass(className);}catch(e){}}
/**/
function compileNodes(nodeList,transcludeFn,$rootElement,maxPriority){var linkFns=[],nodeLinkFn,childLinkFn,directives,attrs,linkFnFound;for(var i=0;i<nodeList.length;i++){attrs=new Attributes();directives=collectDirectives(nodeList[i],[],attrs,maxPriority);nodeLinkFn=(directives.length)?applyDirectivesToNode(directives,nodeList[i],attrs,transcludeFn,$rootElement):null;childLinkFn=(nodeLinkFn&&nodeLinkFn.terminal||!nodeList[i].childNodes||!nodeList[i].childNodes.length)?null:compileNodes(nodeList[i].childNodes,nodeLinkFn?nodeLinkFn.transclude:transcludeFn);linkFns.push(nodeLinkFn);linkFns.push(childLinkFn);linkFnFound=(linkFnFound||nodeLinkFn||childLinkFn);}
return linkFnFound?compositeLinkFn:null;function compositeLinkFn(scope,nodeList,$rootElement,boundTranscludeFn){var nodeLinkFn,childLinkFn,node,childScope,childTranscludeFn,i,ii,n;var stableNodeList=[];for(i=0,ii=nodeList.length;i<ii;i++){stableNodeList.push(nodeList[i]);}
for(i=0,n=0,ii=linkFns.length;i<ii;n++){node=stableNodeList[n];nodeLinkFn=linkFns[i++];childLinkFn=linkFns[i++];if(nodeLinkFn){if(nodeLinkFn.scope){childScope=scope.$new(isObject(nodeLinkFn.scope));jqLite(node).data('$scope',childScope);}else{childScope=scope;}
childTranscludeFn=nodeLinkFn.transclude;if(childTranscludeFn||(!boundTranscludeFn&&transcludeFn)){nodeLinkFn(childLinkFn,childScope,node,$rootElement,(function(transcludeFn){return function(cloneFn){var transcludeScope=scope.$new();transcludeScope.$$transcluded=true;return transcludeFn(transcludeScope,cloneFn).
bind('$destroy',bind(transcludeScope,transcludeScope.$destroy));};})(childTranscludeFn||transcludeFn));}else{nodeLinkFn(childLinkFn,childScope,node,undefined,boundTranscludeFn);}}else if(childLinkFn){childLinkFn(scope,node.childNodes,undefined,boundTranscludeFn);}}}}
/**/
function collectDirectives(node,directives,attrs,maxPriority){var nodeType=node.nodeType,attrsMap=attrs.$attr,match,className;switch(nodeType){case 1:addDirective(directives,directiveNormalize(nodeName_(node).toLowerCase()),'E',maxPriority);for(var attr,name,nName,value,nAttrs=node.attributes,j=0,jj=nAttrs&&nAttrs.length;j<jj;j++){attr=nAttrs[j];if(attr.specified){name=attr.name;nName=directiveNormalize(name.toLowerCase());attrsMap[nName]=name;attrs[nName]=value=trim((msie&&name=='href')?decodeURIComponent(node.getAttribute(name,2)):attr.value);if(getBooleanAttrName(node,nName)){attrs[nName]=true;}
addAttrInterpolateDirective(node,directives,value,nName);addDirective(directives,nName,'A',maxPriority);}}
className=node.className;if(isString(className)&&className!==''){while(match=CLASS_DIRECTIVE_REGEXP.exec(className)){nName=directiveNormalize(match[2]);if(addDirective(directives,nName,'C',maxPriority)){attrs[nName]=trim(match[3]);}
className=className.substr(match.index+match[0].length);}}
break;case 3:addTextInterpolateDirective(directives,node.nodeValue);break;case 8:try{match=COMMENT_DIRECTIVE_REGEXP.exec(node.nodeValue);if(match){nName=directiveNormalize(match[1]);if(addDirective(directives,nName,'M',maxPriority)){attrs[nName]=trim(match[2]);}}}catch(e){}
break;}
directives.sort(byPriority);return directives;}
/**/
function applyDirectivesToNode(directives,compileNode,templateAttrs,transcludeFn,jqCollection){var terminalPriority=-Number.MAX_VALUE,preLinkFns=[],postLinkFns=[],newScopeDirective=null,newIsolateScopeDirective=null,templateDirective=null,$compileNode=templateAttrs.$$element=jqLite(compileNode),directive,directiveName,$template,transcludeDirective,childTranscludeFn=transcludeFn,controllerDirectives,linkFn,directiveValue;for(var i=0,ii=directives.length;i<ii;i++){directive=directives[i];$template=undefined;if(terminalPriority>directive.priority){break;}
if(directiveValue=directive.scope){assertNoDuplicate('isolated scope',newIsolateScopeDirective,directive,$compileNode);if(isObject(directiveValue)){safeAddClass($compileNode,'ng-isolate-scope');newIsolateScopeDirective=directive;}
safeAddClass($compileNode,'ng-scope');newScopeDirective=newScopeDirective||directive;}
directiveName=directive.name;if(directiveValue=directive.controller){controllerDirectives=controllerDirectives||{};assertNoDuplicate("'"+directiveName+"' controller",controllerDirectives[directiveName],directive,$compileNode);controllerDirectives[directiveName]=directive;}
if(directiveValue=directive.transclude){assertNoDuplicate('transclusion',transcludeDirective,directive,$compileNode);transcludeDirective=directive;terminalPriority=directive.priority;if(directiveValue=='element'){$template=jqLite(compileNode);$compileNode=templateAttrs.$$element=jqLite(document.createComment(' '+directiveName+': '+templateAttrs[directiveName]+' '));compileNode=$compileNode[0];replaceWith(jqCollection,jqLite($template[0]),compileNode);childTranscludeFn=compile($template,transcludeFn,terminalPriority);}else{$template=jqLite(JQLiteClone(compileNode)).contents();$compileNode.html('');childTranscludeFn=compile($template,transcludeFn);}}
if((directiveValue=directive.template)){assertNoDuplicate('template',templateDirective,directive,$compileNode);templateDirective=directive;directiveValue=denormalizeTemplate(directiveValue);if(directive.replace){$template=jqLite('<div>'+
trim(directiveValue)+
'</div>').contents();compileNode=$template[0];if($template.length!=1||compileNode.nodeType!==1){throw new Error(MULTI_ROOT_TEMPLATE_ERROR+directiveValue);}
replaceWith(jqCollection,$compileNode,compileNode);var newTemplateAttrs={$attr:{}};//
directives=directives.concat(collectDirectives(compileNode,directives.splice(i+1,directives.length-(i+1)),newTemplateAttrs));mergeTemplateAttributes(templateAttrs,newTemplateAttrs);ii=directives.length;}else{$compileNode.html(directiveValue);}}
if(directive.templateUrl){assertNoDuplicate('template',templateDirective,directive,$compileNode);templateDirective=directive;nodeLinkFn=compileTemplateUrl(directives.splice(i,directives.length-i),nodeLinkFn,$compileNode,templateAttrs,jqCollection,directive.replace,childTranscludeFn);ii=directives.length;}else if(directive.compile){try{linkFn=directive.compile($compileNode,templateAttrs,childTranscludeFn);if(isFunction(linkFn)){addLinkFns(null,linkFn);}else if(linkFn){addLinkFns(linkFn.pre,linkFn.post);}}catch(e){$exceptionHandler(e,startingTag($compileNode));}}
if(directive.terminal){nodeLinkFn.terminal=true;terminalPriority=Math.max(terminalPriority,directive.priority);}}
nodeLinkFn.scope=newScopeDirective&&newScopeDirective.scope;nodeLinkFn.transclude=transcludeDirective&&childTranscludeFn;return nodeLinkFn;function addLinkFns(pre,post){if(pre){pre.require=directive.require;preLinkFns.push(pre);}
if(post){post.require=directive.require;postLinkFns.push(post);}}
function getControllers(require,$element){var value,retrievalMethod='data',optional=false;if(isString(require)){while((value=require.charAt(0))=='^'||value=='?'){require=require.substr(1);if(value=='^'){retrievalMethod='inheritedData';}
optional=optional||value=='?';}
value=$element[retrievalMethod]('$'+require+'Controller');if(!value&&!optional){throw Error("No controller: "+require);}
return value;}else if(isArray(require)){value=[];forEach(require,function(require){value.push(getControllers(require,$element));});}
return value;}
function nodeLinkFn(childLinkFn,scope,linkNode,$rootElement,boundTranscludeFn){var attrs,$element,i,ii,linkFn,controller;if(compileNode===linkNode){attrs=templateAttrs;}else{attrs=shallowCopy(templateAttrs,new Attributes(jqLite(linkNode),templateAttrs.$attr));}
$element=attrs.$$element;if(newIsolateScopeDirective){var LOCAL_REGEXP=/^\s*([@=&])\s*(\w*)\s*$/;var parentScope=scope.$parent||scope;forEach(newIsolateScopeDirective.scope,function(definiton,scopeName){var match=definiton.match(LOCAL_REGEXP)||[],attrName=match[2]||scopeName,mode=match[1],lastValue,parentGet,parentSet;scope.$$isolateBindings[scopeName]=mode+attrName;switch(mode){case '@':{attrs.$observe(attrName,function(value){scope[scopeName]=value;});attrs.$$observers[attrName].$$scope=parentScope;break;}
case '=':{parentGet=$parse(attrs[attrName]);parentSet=parentGet.assign||function(){lastValue=scope[scopeName]=parentGet(parentScope);throw Error(NON_ASSIGNABLE_MODEL_EXPRESSION+attrs[attrName]+
' (directive: '+newIsolateScopeDirective.name+')');};lastValue=scope[scopeName]=parentGet(parentScope);scope.$watch(function parentValueWatch(){var parentValue=parentGet(parentScope);if(parentValue!==scope[scopeName]){if(parentValue!==lastValue){lastValue=scope[scopeName]=parentValue;}else{parentSet(parentScope,parentValue=lastValue=scope[scopeName]);}}
return parentValue;});break;}
case '&':{parentGet=$parse(attrs[attrName]);scope[scopeName]=function(locals){return parentGet(parentScope,locals);};break;}
default:{throw Error('Invalid isolate scope definition for directive '+
newIsolateScopeDirective.name+': '+definiton);}}});}
if(controllerDirectives){forEach(controllerDirectives,function(directive){var locals={$scope:scope,$element:$element,$attrs:attrs,$transclude:boundTranscludeFn};controller=directive.controller;if(controller=='@'){controller=attrs[directive.name];}
$element.data('$'+directive.name+'Controller',$controller(controller,locals));});}
for(i=0,ii=preLinkFns.length;i<ii;i++){try{linkFn=preLinkFns[i];linkFn(scope,$element,attrs,linkFn.require&&getControllers(linkFn.require,$element));}catch(e){$exceptionHandler(e,startingTag($element));}}
childLinkFn&&childLinkFn(scope,linkNode.childNodes,undefined,boundTranscludeFn);for(i=0,ii=postLinkFns.length;i<ii;i++){try{linkFn=postLinkFns[i];linkFn(scope,$element,attrs,linkFn.require&&getControllers(linkFn.require,$element));}catch(e){$exceptionHandler(e,startingTag($element));}}}}
function addDirective(tDirectives,name,location,maxPriority){var match=false;if(hasDirectives.hasOwnProperty(name)){for(var directive,directives=$injector.get(name+Suffix),i=0,ii=directives.length;i<ii;i++){try{directive=directives[i];if((maxPriority===undefined||maxPriority>directive.priority)&&directive.restrict.indexOf(location)!=-1){tDirectives.push(directive);match=true;}}catch(e){$exceptionHandler(e);}}}
return match;}
function mergeTemplateAttributes(dst,src){var srcAttr=src.$attr,dstAttr=dst.$attr,$element=dst.$$element;forEach(dst,function(value,key){if(key.charAt(0)!='$'){if(src[key]){value+=(key==='style'?';':' ')+src[key];}
dst.$set(key,value,true,srcAttr[key]);}});forEach(src,function(value,key){if(key=='class'){safeAddClass($element,value);dst['class']=(dst['class']?dst['class']+' ':'')+value;}else if(key=='style'){$element.attr('style',$element.attr('style')+';'+value);}else if(key.charAt(0)!='$'&&!dst.hasOwnProperty(key)){dst[key]=value;dstAttr[key]=srcAttr[key];}});}
function compileTemplateUrl(directives,beforeTemplateNodeLinkFn,$compileNode,tAttrs,$rootElement,replace,childTranscludeFn){var linkQueue=[],afterTemplateNodeLinkFn,afterTemplateChildLinkFn,beforeTemplateCompileNode=$compileNode[0],origAsyncDirective=directives.shift(),derivedSyncDirective=extend({},origAsyncDirective,{controller:null,templateUrl:null,transclude:null,scope:null});$compileNode.html('');$http.get(origAsyncDirective.templateUrl,{cache:$templateCache}).
success(function(content){var compileNode,tempTemplateAttrs,$template;content=denormalizeTemplate(content);if(replace){$template=jqLite('<div>'+trim(content)+'</div>').contents();compileNode=$template[0];if($template.length!=1||compileNode.nodeType!==1){throw new Error(MULTI_ROOT_TEMPLATE_ERROR+content);}
tempTemplateAttrs={$attr:{}};replaceWith($rootElement,$compileNode,compileNode);collectDirectives(compileNode,directives,tempTemplateAttrs);mergeTemplateAttributes(tAttrs,tempTemplateAttrs);}else{compileNode=beforeTemplateCompileNode;$compileNode.html(content);}
directives.unshift(derivedSyncDirective);afterTemplateNodeLinkFn=applyDirectivesToNode(directives,compileNode,tAttrs,childTranscludeFn);afterTemplateChildLinkFn=compileNodes($compileNode[0].childNodes,childTranscludeFn);while(linkQueue.length){var controller=linkQueue.pop(),linkRootElement=linkQueue.pop(),beforeTemplateLinkNode=linkQueue.pop(),scope=linkQueue.pop(),linkNode=compileNode;if(beforeTemplateLinkNode!==beforeTemplateCompileNode){linkNode=JQLiteClone(compileNode);replaceWith(linkRootElement,jqLite(beforeTemplateLinkNode),linkNode);}
afterTemplateNodeLinkFn(function(){beforeTemplateNodeLinkFn(afterTemplateChildLinkFn,scope,linkNode,$rootElement,controller);},scope,linkNode,$rootElement,controller);}
linkQueue=null;}).
error(function(response,code,headers,config){throw Error('Failed to load template: '+config.url);});return function delayedNodeLinkFn(ignoreChildLinkFn,scope,node,rootElement,controller){if(linkQueue){linkQueue.push(scope);linkQueue.push(node);linkQueue.push(rootElement);linkQueue.push(controller);}else{afterTemplateNodeLinkFn(function(){beforeTemplateNodeLinkFn(afterTemplateChildLinkFn,scope,node,rootElement,controller);},scope,node,rootElement,controller);}};}
function byPriority(a,b){return b.priority-a.priority;}
function assertNoDuplicate(what,previousDirective,directive,element){if(previousDirective){throw Error('Multiple directives ['+previousDirective.name+', '+
directive.name+'] asking for '+what+' on: '+startingTag(element));}}
function addTextInterpolateDirective(directives,text){var interpolateFn=$interpolate(text,true);if(interpolateFn){directives.push({priority:0,compile:valueFn(function textInterpolateLinkFn(scope,node){var parent=node.parent(),bindings=parent.data('$binding')||[];bindings.push(interpolateFn);safeAddClass(parent.data('$binding',bindings),'ng-binding');scope.$watch(interpolateFn,function interpolateFnWatchAction(value){node[0].nodeValue=value;});})});}}
function addAttrInterpolateDirective(node,directives,value,name){var interpolateFn=$interpolate(value,true);if(!interpolateFn)return;directives.push({priority:100,compile:valueFn(function attrInterpolateLinkFn(scope,element,attr){var $$observers=(attr.$$observers||(attr.$$observers={}));if(name==='class'){interpolateFn=$interpolate(attr[name],true);}
attr[name]=undefined;($$observers[name]||($$observers[name]=[])).$$inter=true;(attr.$$observers&&attr.$$observers[name].$$scope||scope).
$watch(interpolateFn,function interpolateFnWatchAction(value){attr.$set(name,value);});})});}
function replaceWith($rootElement,$element,newNode){var oldNode=$element[0],parent=oldNode.parentNode,i,ii;if($rootElement){for(i=0,ii=$rootElement.length;i<ii;i++){if($rootElement[i]==oldNode){$rootElement[i]=newNode;break;}}}
if(parent){parent.replaceChild(newNode,oldNode);}
newNode[jqLite.expando]=oldNode[jqLite.expando];$element[0]=newNode;}}];}
var PREFIX_REGEXP=/^(x[\:\-_]|data[\:\-_])/i;function directiveNormalize(name){return camelCase(name.replace(PREFIX_REGEXP,''));}
/**/
function nodesetLinkingFn(scope,nodeList,rootElement,boundTranscludeFn){}
function directiveLinkingFn(nodesetLinkingFn,scope,node,rootElement,boundTranscludeFn){}
function $ControllerProvider(){var controllers={};this.register=function(name,constructor){if(isObject(name)){extend(controllers,name)}else{controllers[name]=constructor;}};this.$get=['$injector','$window',function($injector,$window){return function(constructor,locals){if(isString(constructor)){var name=constructor;constructor=controllers.hasOwnProperty(name)?controllers[name]:getter(locals.$scope,name,true)||getter($window,name,true);assertArgFn(constructor,name,true);}
return $injector.instantiate(constructor,locals);};}];}
function $DocumentProvider(){this.$get=['$window',function(window){return jqLite(window.document);}];}
/**/
function $ExceptionHandlerProvider(){this.$get=['$log',function($log){return function(exception,cause){$log.error.apply($log,arguments);};}];}
function $InterpolateProvider(){var startSymbol='{{';var endSymbol='}}';this.startSymbol=function(value){if(value){startSymbol=value;return this;}else{return startSymbol;}};this.endSymbol=function(value){if(value){endSymbol=value;return this;}else{return endSymbol;}};this.$get=['$parse',function($parse){var startSymbolLength=startSymbol.length,endSymbolLength=endSymbol.length;
/**/
function $interpolate(text,mustHaveExpression){var startIndex,endIndex,index=0,parts=[],length=text.length,hasInterpolation=false,fn,exp,concat=[];while(index<length){if(((startIndex=text.indexOf(startSymbol,index))!=-1)&&((endIndex=text.indexOf(endSymbol,startIndex+startSymbolLength))!=-1)){(index!=startIndex)&&parts.push(text.substring(index,startIndex));parts.push(fn=$parse(exp=text.substring(startIndex+startSymbolLength,endIndex)));fn.exp=exp;index=endIndex+endSymbolLength;hasInterpolation=true;}else{//
(index!=length)&&parts.push(text.substring(index));index=length;}}
if(!(length=parts.length)){parts.push('');length=1;}
if(!mustHaveExpression||hasInterpolation){concat.length=length;fn=function(context){for(var i=0,ii=length,part;i<ii;i++){if(typeof(part=parts[i])=='function'){part=part(context);if(part==null||part==undefined){part='';}else if(typeof part!='string'){part=toJson(part);}}
concat[i]=part;}
return concat.join('');};fn.exp=text;fn.parts=parts;return fn;}}
$interpolate.startSymbol=function(){return startSymbol;}
$interpolate.endSymbol=function(){return endSymbol;}
return $interpolate;}];}
var URL_MATCH=/^([^:]+):\/\/(\w+:{0,1}\w*@)?(\{?[\w\.-]*\}?)(:([0-9]+))?(\/[^\?#]*)?(\?([^#]*))?(#(.*))?$/,PATH_MATCH=/^([^\?#]*)?(\?([^#]*))?(#(.*))?$/,HASH_MATCH=PATH_MATCH,DEFAULT_PORTS={'http':80,'https':443,'ftp':21};function encodePath(path){var segments=path.split('/'),i=segments.length;while(i--){segments[i]=encodeUriSegment(segments[i]);}
return segments.join('/');}
function stripHash(url){return url.split('#')[0];}
function matchUrl(url,obj){var match=URL_MATCH.exec(url);match={protocol:match[1],host:match[3],port:int(match[5])||DEFAULT_PORTS[match[1]]||null,path:match[6]||'/',search:match[8],hash:match[10]};if(obj){obj.$$protocol=match.protocol;obj.$$host=match.host;obj.$$port=match.port;}
return match;}
function composeProtocolHostPort(protocol,host,port){return protocol+'://'+host+(port==DEFAULT_PORTS[protocol]?'':':'+port);}
function pathPrefixFromBase(basePath){return basePath.substr(0,basePath.lastIndexOf('/'));}
function convertToHtml5Url(url,basePath,hashPrefix){var match=matchUrl(url);if(decodeURIComponent(match.path)!=basePath||isUndefined(match.hash)||match.hash.indexOf(hashPrefix)!==0){return url;}else{return composeProtocolHostPort(match.protocol,match.host,match.port)+
pathPrefixFromBase(basePath)+match.hash.substr(hashPrefix.length);}}
function convertToHashbangUrl(url,basePath,hashPrefix){var match=matchUrl(url);//
if(decodeURIComponent(match.path)==basePath&&!isUndefined(match.hash)&&match.hash.indexOf(hashPrefix)===0){return url;}else{var search=match.search&&'?'+match.search||'',hash=match.hash&&'#'+match.hash||'',pathPrefix=pathPrefixFromBase(basePath),path=match.path.substr(pathPrefix.length);if(match.path.indexOf(pathPrefix)!==0){throw Error('Invalid url "'+url+'", missing path prefix "'+pathPrefix+'" !');}
return composeProtocolHostPort(match.protocol,match.host,match.port)+basePath+
'#'+hashPrefix+path+search+hash;}}
function LocationUrl(url,pathPrefix,appBaseUrl){pathPrefix=pathPrefix||'';this.$$parse=function(newAbsoluteUrl){var match=matchUrl(newAbsoluteUrl,this);if(match.path.indexOf(pathPrefix)!==0){throw Error('Invalid url "'+newAbsoluteUrl+'", missing path prefix "'+pathPrefix+'" !');}
this.$$path=decodeURIComponent(match.path.substr(pathPrefix.length));this.$$search=parseKeyValue(match.search);this.$$hash=match.hash&&decodeURIComponent(match.hash)||'';this.$$compose();};this.$$compose=function(){var search=toKeyValue(this.$$search),hash=this.$$hash?'#'+encodeUriSegment(this.$$hash):'';this.$$url=encodePath(this.$$path)+(search?'?'+search:'')+hash;this.$$absUrl=composeProtocolHostPort(this.$$protocol,this.$$host,this.$$port)+
pathPrefix+this.$$url;};this.$$rewriteAppUrl=function(absoluteLinkUrl){if(absoluteLinkUrl.indexOf(appBaseUrl)==0){return absoluteLinkUrl;}}
this.$$parse(url);}
function LocationHashbangUrl(url,hashPrefix,appBaseUrl){var basePath;this.$$parse=function(url){var match=matchUrl(url,this);if(match.hash&&match.hash.indexOf(hashPrefix)!==0){throw Error('Invalid url "'+url+'", missing hash prefix "'+hashPrefix+'" !');}
basePath=match.path+(match.search?'?'+match.search:'');match=HASH_MATCH.exec((match.hash||'').substr(hashPrefix.length));if(match[1]){this.$$path=(match[1].charAt(0)=='/'?'':'/')+decodeURIComponent(match[1]);}else{this.$$path='';}
this.$$search=parseKeyValue(match[3]);this.$$hash=match[5]&&decodeURIComponent(match[5])||'';this.$$compose();};this.$$compose=function(){var search=toKeyValue(this.$$search),hash=this.$$hash?'#'+encodeUriSegment(this.$$hash):'';this.$$url=encodePath(this.$$path)+(search?'?'+search:'')+hash;this.$$absUrl=composeProtocolHostPort(this.$$protocol,this.$$host,this.$$port)+
basePath+(this.$$url?'#'+hashPrefix+this.$$url:'');};this.$$rewriteAppUrl=function(absoluteLinkUrl){if(absoluteLinkUrl.indexOf(appBaseUrl)==0){return absoluteLinkUrl;}}
this.$$parse(url);}
LocationUrl.prototype={/**/
$$replace:false,absUrl:locationGetter('$$absUrl'),url:function(url,replace){if(isUndefined(url))
return this.$$url;var match=PATH_MATCH.exec(url);if(match[1])this.path(decodeURIComponent(match[1]));if(match[2]||match[1])this.search(match[3]||'');this.hash(match[5]||'',replace);return this;},protocol:locationGetter('$$protocol'),host:locationGetter('$$host'),port:locationGetter('$$port'),/**/
path:locationGetterSetter('$$path',function(path){return path.charAt(0)=='/'?path:'/'+path;}),/**/
search:function(search,paramValue){if(isUndefined(search))
return this.$$search;if(isDefined(paramValue)){if(paramValue===null){delete this.$$search[search];}else{this.$$search[search]=paramValue;}}else{this.$$search=isString(search)?parseKeyValue(search):search;}
this.$$compose();return this;},hash:locationGetterSetter('$$hash',identity),replace:function(){this.$$replace=true;return this;}};LocationHashbangUrl.prototype=inherit(LocationUrl.prototype);function LocationHashbangInHtml5Url(url,hashPrefix,appBaseUrl,baseExtra){LocationHashbangUrl.apply(this,arguments);this.$$rewriteAppUrl=function(absoluteLinkUrl){if(absoluteLinkUrl.indexOf(appBaseUrl)==0){return appBaseUrl+baseExtra+'#'+hashPrefix+absoluteLinkUrl.substr(appBaseUrl.length);}}}
LocationHashbangInHtml5Url.prototype=inherit(LocationHashbangUrl.prototype);function locationGetter(property){return function(){return this[property];};}
function locationGetterSetter(property,preprocess){return function(value){if(isUndefined(value))
 return this[property];this[property]=preprocess(value);this.$$compose();return this;};}
function $LocationProvider(){var hashPrefix='',html5Mode=false;this.hashPrefix=function(prefix){if(isDefined(prefix)){hashPrefix=prefix;return this;}else{return hashPrefix;}};/**/
this.html5Mode=function(mode){if(isDefined(mode)){html5Mode=mode;return this;}else{return html5Mode;}};this.$get=['$rootScope','$browser','$sniffer','$rootElement',function($rootScope,$browser,$sniffer,$rootElement){var $location,basePath,pathPrefix,initUrl=$browser.url(),initUrlParts=matchUrl(initUrl),appBaseUrl;if(html5Mode){basePath=$browser.baseHref()||'/';pathPrefix=pathPrefixFromBase(basePath);appBaseUrl=composeProtocolHostPort(initUrlParts.protocol,initUrlParts.host,initUrlParts.port)+
pathPrefix+'/';if($sniffer.history){$location=new LocationUrl(convertToHtml5Url(initUrl,basePath,hashPrefix),pathPrefix,appBaseUrl);}else{$location=new LocationHashbangInHtml5Url(convertToHashbangUrl(initUrl,basePath,hashPrefix),hashPrefix,appBaseUrl,basePath.substr(pathPrefix.length+1));}}else{appBaseUrl=composeProtocolHostPort(initUrlParts.protocol,initUrlParts.host,initUrlParts.port)+(initUrlParts.path||'')+(initUrlParts.search?('?'+initUrlParts.search):'')+
'#'+hashPrefix+'/';$location=new LocationHashbangUrl(initUrl,hashPrefix,appBaseUrl);}
$rootElement.bind('click',function(event){if(event.ctrlKey||event.metaKey||event.which==2)return;var elm=jqLite(event.target);while(lowercase(elm[0].nodeName)!=='a'){//
if(elm[0]===$rootElement[0]||!(elm=elm.parent())[0])return;}
var absHref=elm.prop('href'),rewrittenUrl=$location.$$rewriteAppUrl(absHref);if(absHref&&!elm.attr('target')&&rewrittenUrl){$location.$$parse(rewrittenUrl);$rootScope.$apply();event.preventDefault();window.angular['ff-684208-preventDefault']=true;}});if($location.absUrl()!=initUrl){$browser.url($location.absUrl(),true);}
$browser.onUrlChange(function(newUrl){if($location.absUrl()!=newUrl){if($rootScope.$broadcast('$locationChangeStart',newUrl,$location.absUrl()).defaultPrevented){$browser.url($location.absUrl());return;}
$rootScope.$evalAsync(function(){var oldUrl=$location.absUrl();$location.$$parse(newUrl);afterLocationChange(oldUrl);});if(!$rootScope.$$phase)$rootScope.$digest();}});var changeCounter=0;$rootScope.$watch(function $locationWatch(){var oldUrl=$browser.url();var currentReplace=$location.$$replace;if(!changeCounter||oldUrl!=$location.absUrl()){changeCounter++;$rootScope.$evalAsync(function(){if($rootScope.$broadcast('$locationChangeStart',$location.absUrl(),oldUrl).
defaultPrevented){$location.$$parse(oldUrl);}else{$browser.url($location.absUrl(),currentReplace);afterLocationChange(oldUrl);}});}
$location.$$replace=false;return changeCounter;});return $location;function afterLocationChange(oldUrl){$rootScope.$broadcast('$locationChangeSuccess',$location.absUrl(),oldUrl);}}];}
/**/
function $LogProvider(){this.$get=['$window',function($window){return{log:consoleLog('log'),warn:consoleLog('warn'),info:consoleLog('info'),error:consoleLog('error')};function formatError(arg){if(arg instanceof Error){if(arg.stack){arg=(arg.message&&arg.stack.indexOf(arg.message)===-1)?'Error: '+arg.message+'\n'+arg.stack:arg.stack;}else if(arg.sourceURL){arg=arg.message+'\n'+arg.sourceURL+':'+arg.line;}}
return arg;}
function consoleLog(type){var console=$window.console||{},logFn=console[type]||console.log||noop;if(logFn.apply){return function(){var args=[];forEach(arguments,function(arg){args.push(formatError(arg));});return logFn.apply(console,args);};}
return function(arg1,arg2){logFn(arg1,arg2);}}}];}
var OPERATORS={'null':function(){return null;},'true':function(){return true;},'false':function(){return false;},undefined:noop,'+':function(self,locals,a,b){a=a(self,locals);b=b(self,locals);if(isDefined(a)){if(isDefined(b)){return a+b;}
return a;}
return isDefined(b)?b:undefined;},'-':function(self,locals,a,b){a=a(self,locals);b=b(self,locals);return(isDefined(a)?a:0)-(isDefined(b)?b:0);},'*':function(self,locals,a,b){return a(self,locals)*b(self,locals);},'/':function(self,locals,a,b){return a(self,locals)/b(self,locals);},'%':function(self,locals,a,b){return a(self,locals)%b(self,locals);},'^':function(self,locals,a,b){return a(self,locals)^b(self,locals);},'=':noop,'==':function(self,locals,a,b){return a(self,locals)==b(self,locals);},'!=':function(self,locals,a,b){return a(self,locals)!=b(self,locals);},'<':function(self,locals,a,b){return a(self,locals)<b(self,locals);},'>':function(self,locals,a,b){return a(self,locals)>b(self,locals);},'<=':function(self,locals,a,b){return a(self,locals)<=b(self,locals);},'>=':function(self,locals,a,b){return a(self,locals)>=b(self,locals);},'&&':function(self,locals,a,b){return a(self,locals)&&b(self,locals);},'||':function(self,locals,a,b){return a(self,locals)||b(self,locals);},'&':function(self,locals,a,b){return a(self,locals)&b(self,locals);},'|':function(self,locals,a,b){return b(self,locals)(self,locals,a(self,locals));},'!':function(self,locals,a){return!a(self,locals);}};var ESCAPE={"n":"\n","f":"\f","r":"\r","t":"\t","v":"\v","'":"'",'"':'"'};function lex(text,csp){var tokens=[],token,index=0,json=[],ch,lastCh=':';while(index<text.length){ch=text.charAt(index);if(is('"\'')){readString(ch);}else if(isNumber(ch)||is('.')&&isNumber(peek())){readNumber();}else if(isIdent(ch)){readIdent();if(was('{,')&&json[0]=='{'&&(token=tokens[tokens.length-1])){token.json=token.text.indexOf('.')==-1;}}else if(is('(){}[].,;:')){tokens.push({index:index,text:ch,json:(was(':[,')&&is('{['))||is('}]:,')});if(is('{['))json.unshift(ch);if(is('}]'))json.shift();index++;}else if(isWhitespace(ch)){index++;continue;}else{var ch2=ch+peek(),fn=OPERATORS[ch],fn2=OPERATORS[ch2];if(fn2){tokens.push({index:index,text:ch2,fn:fn2});index+=2;}else if(fn){tokens.push({index:index,text:ch,fn:fn,json:was('[,:')&&is('+-')});index+=1;}else{throwError("Unexpected next character ",index,index+1);}}
lastCh=ch;}
return tokens;function is(chars){return chars.indexOf(ch)!=-1;}
function was(chars){return chars.indexOf(lastCh)!=-1;}
function peek(){return index+1<text.length?text.charAt(index+1):false;}
function isNumber(ch){return '0'<=ch&&ch<='9';}
function isWhitespace(ch){return ch==' '||ch=='\r'||ch=='\t'||ch=='\n'||ch=='\v'||ch=='\u00A0';}
function isIdent(ch){return 'a'<=ch&&ch<='z'||'A'<=ch&&ch<='Z'||'_'==ch||ch=='$';}
function isExpOperator(ch){return ch=='-'||ch=='+'||isNumber(ch);}
function throwError(error,start,end){end=end||index;throw Error("Lexer Error: "+error+" at column"+(isDefined(start)?"s "+start+"-"+index+" ["+text.substring(start,end)+"]":" "+end)+
" in expression ["+text+"].");}
function readNumber(){var number="";var start=index;while(index<text.length){var ch=lowercase(text.charAt(index));if(ch=='.'||isNumber(ch)){number+=ch;}else{var peekCh=peek();if(ch=='e'&&isExpOperator(peekCh)){number+=ch;}else if(isExpOperator(ch)&&peekCh&&isNumber(peekCh)&&number.charAt(number.length-1)=='e'){number+=ch;}else if(isExpOperator(ch)&&(!peekCh||!isNumber(peekCh))&&number.charAt(number.length-1)=='e'){throwError('Invalid exponent');}else{break;}}
index++;}
number=1*number;tokens.push({index:start,text:number,json:true,fn:function(){return number;}});}
function readIdent(){ var ident="",start=index,lastDot,peekIndex,methodName,ch;while(index<text.length){ch=text.charAt(index);if(ch=='.'||isIdent(ch)||isNumber(ch)){if(ch=='.')lastDot=index;ident+=ch;}else{break;}
index++;}
if(lastDot){peekIndex=index;while(peekIndex<text.length){ch=text.charAt(peekIndex);if(ch=='('){methodName=ident.substr(lastDot-start+1);ident=ident.substr(0,lastDot-start);index=peekIndex;break;}
if(isWhitespace(ch)){peekIndex++;}else{break;}}}
var token={index:start,text:ident};if(OPERATORS.hasOwnProperty(ident)){token.fn=token.json=OPERATORS[ident];}else{var getter=getterFn(ident,csp);token.fn=extend(function(self,locals){return(getter(self,locals));},{assign:function(self,value){return setter(self,ident,value);}});}
tokens.push(token);if(methodName){tokens.push({index:lastDot,text:'.',json:false});tokens.push({index:lastDot+1,text:methodName,json:false});}}
function readString(quote){var start=index;index++;var string="";var rawString=quote;var escape=false;while(index<text.length){var ch=text.charAt(index);rawString+=ch;if(escape){if(ch=='u'){var hex=text.substring(index+1,index+5);if(!hex.match(/[\da-f]{4}/i))
throwError("Invalid unicode escape [\\u"+hex+"]");index+=4;string+=String.fromCharCode(parseInt(hex,16));}else{ var rep=ESCAPE[ch];if(rep){string+=rep;}else{string+=ch;}}
escape=false;}else if(ch=='\\'){escape=true;}else if(ch==quote){index++;tokens.push({index:start,text:rawString,string:string,json:true,fn:function(){return string;}});return;}else{string+=ch;}
index++;}
throwError("Unterminated quote",start);}}
function parser(text,json,$filter,csp){var ZERO=valueFn(0),value,tokens=lex(text,csp),assignment=_assignment,functionCall=_functionCall,fieldAccess=_fieldAccess,objectIndex=_objectIndex,filterChain=_filterChain;if(json){assignment=logicalOR;functionCall=fieldAccess=objectIndex=filterChain=function(){throwError("is not valid json",{text:text,index:0});};value=primary();}else{value=statements();}
if(tokens.length!==0){throwError("is an unexpected token",tokens[0]);}
return value;function throwError(msg,token){throw Error("Syntax Error: Token '"+token.text+
"' "+msg+" at column "+(token.index+1)+" of the expression ["+
text+"] starting at ["+text.substring(token.index)+"].");}
function peekToken(){if(tokens.length===0)
throw Error("Unexpected end of expression: "+text);return tokens[0];}
function peek(e1,e2,e3,e4){if(tokens.length>0){var token=tokens[0];var t=token.text;if(t==e1||t==e2||t==e3||t==e4||(!e1&&!e2&&!e3&&!e4)){return token;}}
return false;}
function expect(e1,e2,e3,e4){var token=peek(e1,e2,e3,e4);if(token){if(json&&!token.json){throwError("is not valid json",token);}
tokens.shift();return token;}
return false;}
function consume(e1){if(!expect(e1)){throwError("is unexpected, expecting ["+e1+"]",peek());}}
function unaryFn(fn,right){return function(self,locals){return fn(self,locals,right);};}
function binaryFn(left,fn,right){return function(self,locals){return fn(self,locals,left,right);};}
function statements(){var statements=[];while(true){if(tokens.length>0&&!peek('}',')',';',']'))
statements.push(filterChain());if(!expect(';')){
return statements.length==1?statements[0]:function(self,locals){var value;for(var i=0;i<statements.length;i++){var statement=statements[i];if(statement)
value=statement(self,locals);}
return value;};}}}
function _filterChain(){var left=expression();var token;while(true){if((token=expect('|'))){left=binaryFn(left,token.fn,filter());}else{return left;}}}
function filter(){var token=expect();var fn=$filter(token.text);var argsFn=[];while(true){if((token=expect(':'))){argsFn.push(expression());}else{var fnInvoke=function(self,locals,input){var args=[input];for(var i=0;i<argsFn.length;i++){args.push(argsFn[i](self,locals));}
return fn.apply(self,args);};return function(){return fnInvoke;};}}}
function expression(){return assignment();}
function _assignment(){var left=logicalOR();var right;var token;if((token=expect('='))){if(!left.assign){throwError("implies assignment but ["+
text.substring(0,token.index)+"] can not be assigned to",token);}
right=logicalOR();return function(scope,locals){return left.assign(scope,right(scope,locals),locals);};}else{return left;}}
function logicalOR(){var left=logicalAND();var token;while(true){if((token=expect('||'))){left=binaryFn(left,token.fn,logicalAND());}else{return left;}}}
function logicalAND(){var left=equality();var token;if((token =expect('&&'))){left=binaryFn(left,token.fn,logicalAND());}
return left;}
function equality(){var left=relational();var token;if((token=expect('==','!='))){left=binaryFn(left,token.fn,equality());}
return left;}
function relational(){var left=additive();var token;if((token=expect('<','>','<=','>='))){left=binaryFn(left,token.fn,relational());}
return left;}
function additive(){var left=multiplicative();var token;while((token=expect('+','-'))){left=binaryFn(left,token.fn,multiplicative());}
return left;}
function multiplicative(){var left=unary();var token;while((token=expect('*','/','%'))){left=binaryFn(left,token.fn,unary());}
return left;}
function unary(){var token;if(expect('+')){return primary();}else if((token=expect('-'))){return binaryFn(ZERO,token.fn,unary());}else if((token=expect('!'))){return unaryFn(token.fn,unary());}else{return primary();}}
function primary(){var primary;if(expect('(')){primary=filterChain();consume(')');}else if(expect('[')){primary=arrayDeclaration();}else if(expect('{')){primary=object();}else{var token=expect();primary=token.fn;if(!primary){throwError("not a primary expression",token);}}
var next,context;while((next=expect('(','[','.'))){if(next.text==='('){primary=functionCall(primary,context);context=null;}else if(next.text==='['){context=primary;primary=objectIndex(primary);}else if(next.text==='.'){context=primary;primary=fieldAccess(primary);}else{throwError("IMPOSSIBLE");}}
return primary;}
function _fieldAccess(object){var field=expect().text;var getter=getterFn(field,csp);return extend(function(scope,locals,self){return getter(self||object(scope,locals),locals);},{assign:function(scope,value,locals){return setter(object(scope,locals),field,value);}});}
function _objectIndex(obj){var indexFn=expression();consume(']');return extend(function(self,locals){var o=obj(self,locals),i=indexFn(self,locals),v,p;if(!o)return undefined;v=o[i];if(v&&v.then){p=v;if(!('$$v' in v)){p.$$v=undefined;p.then(function(val){p.$$v=val;});}
v=v.$$v;}
return v;},{assign:function(self,value,locals){return obj(self,locals)[indexFn(self,locals)]=value;}});}
function _functionCall(fn,contextGetter){var argsFn=[];if(peekToken().text!=')'){do{argsFn.push(expression());}while(expect(','));}
consume(')');return function(scope,locals){var args=[],context=contextGetter?contextGetter(scope,locals):scope;for(var i=0;i<argsFn.length;i++){args.push(argsFn[i](scope,locals));}
var fnPtr=fn(scope,locals,context)||noop;return fnPtr.apply?fnPtr.apply(context,args):fnPtr(args[0],args[1],args[2],args[3],args[4]);};}
function arrayDeclaration(){var elementFns=[];if(peekToken().text!=']'){do{elementFns.push(expression());}while(expect(','));}
consume(']');return function(self,locals){var array=[];for(var i=0;i<elementFns.length;i++){array.push(elementFns[i](self,locals));}
return array;};}
function object(){var keyValues=[];if(peekToken().text!='}'){do{var token=expect(),key=token.string||token.text;consume(":");var value=expression();keyValues.push({key:key,value:value});}while(expect(','));}
consume('}');return function(self,locals){var object={};for(var i=0;i<keyValues.length;i++){var keyValue=keyValues[i];object[keyValue.key]=keyValue.value(self,locals);}
return object;};}}
function setter(obj,path,setValue){var element=path.split('.');for(var i=0;element.length>1;i++){var key=element.shift();var propertyObj=obj[key];
if(!propertyObj){propertyObj={};obj[key]=propertyObj;}
obj=propertyObj;}
obj[element.shift()]=setValue;return setValue;}
function getter(obj,path,bindFnToScope){if(!path)return obj;var keys=path.split('.');var key;var lastInstance=obj;var len=keys.length;for(var i=0;i<len;i++){key=keys[i];if(obj){obj=(lastInstance=obj)[key];}}
if(!bindFnToScope&&isFunction(obj)){return bind(lastInstance,obj);}
return obj;}
var getterFnCache={};function cspSafeGetterFn(key0,key1,key2,key3,key4){return function(scope,locals){var pathVal=(locals&&locals.hasOwnProperty(key0))?locals:scope,promise;if(pathVal===null||pathVal===undefined)return pathVal;pathVal=pathVal[key0];if(pathVal&&pathVal.then){if(!("$$v" in pathVal)){promise=pathVal;promise.$$v=undefined;promise.then(function(val){promise.$$v=val;});}
pathVal=pathVal.$$v;}
if(!key1||pathVal===null||pathVal===undefined)return pathVal;pathVal=pathVal[key1];if(pathVal&&pathVal.then){if(!("$$v" in pathVal)){promise=pathVal;promise.$$v=undefined;promise.then(function(val){promise.$$v=val;});}
pathVal=pathVal.$$v;}
if(!key2||pathVal===null||pathVal===undefined)return pathVal;pathVal=pathVal[key2];if(pathVal&&pathVal.then){if(!("$$v" in pathVal)){promise=pathVal;promise.$$v=undefined;promise.then(function(val){promise.$$v=val;});}
pathVal=pathVal.$$v;}
if(!key3||pathVal===null||pathVal===undefined)return pathVal;pathVal=pathVal[key3];if(pathVal&&pathVal.then){if(!("$$v" in pathVal)){promise=pathVal;promise.$$v=undefined;promise.then(function(val){promise.$$v=val;});}
pathVal=pathVal.$$v;}
if(!key4||pathVal===null||pathVal===undefined)return pathVal;pathVal=pathVal[key4];if(pathVal&&pathVal.then){if(!("$$v" in pathVal)){promise=pathVal;promise.$$v=undefined;promise.then(function(val){promise.$$v=val;});}
pathVal=pathVal.$$v;}
return pathVal;};}
function getterFn(path,csp){if(getterFnCache.hasOwnProperty(path)){return getterFnCache[path];}
var pathKeys=path.split('.'),pathKeysLength=pathKeys.length,fn;if(csp){fn=(pathKeysLength<6)?cspSafeGetterFn(pathKeys[0],pathKeys[1],pathKeys[2],pathKeys[3],pathKeys[4]):function(scope,locals){var i=0,val;do{val=cspSafeGetterFn(pathKeys[i++],pathKeys[i++],pathKeys[i++],pathKeys[i++],pathKeys[i++])(scope,locals);locals=undefined;scope=val;}while(i<pathKeysLength);return val;}}else{var code='var l, fn, p;\n';forEach(pathKeys,function(key,index){code+='if(s === null || s === undefined) return s;\n'+
'l=s;\n'+
's='+(index?'s':'((k&&k.hasOwnProperty("'+key+'"))?k:s)')+'["'+key+'"]'+';\n'+
'if (s && s.then) {\n'+
' if (!("$$v" in s)) {\n'+
' p=s;\n'+
' p.$$v = undefined;\n'+
' p.then(function(v) {p.$$v=v;});\n'+
'}\n'+
' s=s.$$v\n'+
'}\n';});code+='return s;';fn=Function('s','k',code);fn.toString=function(){return code;};}
return getterFnCache[path]=fn;}
function $ParseProvider(){var cache={};this.$get=['$filter','$sniffer',function($filter,$sniffer){return function(exp){switch(typeof exp){case 'string':return cache.hasOwnProperty(exp)?cache[exp]:cache[exp]=parser(exp,false,$filter,$sniffer.csp);case 'function':return exp;default:return noop;}};}];}
/**/
function $QProvider(){this.$get=['$rootScope','$exceptionHandler',function($rootScope,$exceptionHandler){return qFactory(function(callback){$rootScope.$evalAsync(callback);},$exceptionHandler);}];}
function qFactory(nextTick,exceptionHandler){var defer=function(){var pending=[],value,deferred;deferred={resolve:function(val){if(pending){var callbacks=pending;pending=undefined;value=ref(val);if(callbacks.length){ nextTick(function(){var callback;for(var i=0,ii=callbacks.length;i<ii;i++){callback=callbacks[i];value.then(callback[0],callback[1]);}});}}},reject:function(reason){deferred.resolve(reject(reason));},promise:{then:function(callback,errback){var result=defer();var wrappedCallback=function(value){try{result.resolve((callback||defaultCallback)(value));}catch(e){exceptionHandler(e);result.reject(e);}};var wrappedErrback=function(reason){try{result.resolve((errback||defaultErrback)(reason));}catch(e){exceptionHandler(e);result.reject(e);}};if(pending){pending.push([wrappedCallback,wrappedErrback]);}else{value.then(wrappedCallback,wrappedErrback);}
return result.promise;}}};return deferred;};var ref=function(value){if(value&&value.then)return value;return{then:function(callback){var result=defer();nextTick(function(){result.resolve(callback(value));});return result.promise;}};};/**/
var reject=function(reason){return{then:function(callback,errback){var result=defer();nextTick(function(){result.resolve((errback||defaultErrback)(reason));});return result.promise;}};};var when=function(value,callback,errback){var result=defer(),done;var wrappedCallback=function(value){try{return(callback||defaultCallback)(value);}catch(e){exceptionHandler(e);return reject(e);}};var wrappedErrback=function(reason){try{return(errback||defaultErrback)(reason);}catch(e){exceptionHandler(e);return reject(e);}};nextTick(function(){ref(value).then(function(value){if(done)return;done=true;result.resolve(ref(value).then(wrappedCallback,wrappedErrback));},function(reason){if(done)return;done=true;result.resolve(wrappedErrback(reason));});});return result.promise;};function defaultCallback(value){return value;}
function defaultErrback(reason){return reject(reason);}
/**/
function all(promises){var deferred=defer(),counter=promises.length,results=[];if(counter){forEach(promises,function(promise,index){ref(promise).then(function(value){if(index in results)return;results[index]=value;if(!(--counter))deferred.resolve(results);},function(reason){if(index in results)return;deferred.reject(reason);});});}else{deferred.resolve(results);}
return deferred.promise;}
return{defer:defer,reject:reject,when:when,all:all};}
function $RouteProvider(){var routes={};/**/
this.when=function(path,route){routes[path]=extend({reloadOnSearch:true},route);if(path){var redirectPath=(path[path.length-1]=='/')?path.substr(0,path.length-1):path+'/';routes[redirectPath]={redirectTo:path};}
return this;};this.otherwise=function(params){this.when(null,params);return this;};this.$get=['$rootScope','$location','$routeParams','$q','$injector','$http','$templateCache',function($rootScope,$location,$routeParams,$q,$injector,$http,$templateCache){/**/
/**/
var forceReload=false,$route={routes:routes,reload:function(){forceReload=true;$rootScope.$evalAsync(updateRoute);}};$rootScope.$on('$locationChangeSuccess',updateRoute);return $route;function switchRouteMatcher(on,when){//
when='^'+when.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")+'$';var regex='',params=[],dst={};var re=/:(\w+)/g,paramMatch,lastMatchedIndex=0;while((paramMatch=re.exec(when))!==null){regex+=when.slice(lastMatchedIndex,paramMatch.index);regex+='([^\\/]*)';params.push(paramMatch[1]);lastMatchedIndex=re.lastIndex;}
regex+=when.substr(lastMatchedIndex);var match=on.match(new RegExp(regex));if(match){forEach(params,function(name,index){dst[name]=match[index+1];});}
return match?dst:null;}
function updateRoute(){var next=parseRoute(),last=$route.current;if(next&&last&&next.$$route===last.$$route&&equals(next.pathParams,last.pathParams)&&!next.reloadOnSearch&&!forceReload){last.params=next.params;copy(last.params,$routeParams);$rootScope.$broadcast('$routeUpdate',last);}else if(next||last){forceReload=false;$rootScope.$broadcast('$routeChangeStart',next,last);$route.current=next;if(next){if(next.redirectTo){if(isString(next.redirectTo)){$location.path(interpolate(next.redirectTo,next.params)).search(next.params)
.replace();}else{$location.url(next.redirectTo(next.pathParams,$location.path(),$location.search()))
.replace();}}}
$q.when(next).
then(function(){if(next){var keys=[],values=[],template;forEach(next.resolve||{},function(value,key){keys.push(key);values.push(isString(value)?$injector.get(value):$injector.invoke(value));});if(isDefined(template=next.template)){}else if(isDefined(template=next.templateUrl)){template=$http.get(template,{cache:$templateCache}).
then(function(response){return response.data;});}
if(isDefined(template)){keys.push('$template');values.push(template);}
return $q.all(values).then(function(values){var locals={};forEach(values,function(value,index){locals[keys[index]]=value;});return locals;});}}).
then(function(locals){if(next==$route.current){if(next){next.locals=locals;copy(next.params,$routeParams);}
$rootScope.$broadcast('$routeChangeSuccess',next,last);}},function(error){if(next==$route.current){$rootScope.$broadcast('$routeChangeError',next,last,error);}});}}
function parseRoute(){var params,match;forEach(routes,function(route,path){if(!match&&(params=switchRouteMatcher($location.path(),path))){match=inherit(route,{params:extend({},$location.search(),params),pathParams:params});match.$$route=route;}});return match||routes[null]&&inherit(routes[null],{params:{},pathParams:{}});}
function interpolate(string,params){var result=[];forEach((string||'').split(':'),function(segment,i){if(i==0){result.push(segment);}else{var segmentMatch=segment.match(/(\w+)(.*)/);var key=segmentMatch[1];result.push(params[key]);result.push(segmentMatch[2]||'');delete params[key];}});return result.join('');}}];}
/**/
function $RouteParamsProvider(){this.$get=valueFn({});}
/**/
function $RootScopeProvider(){var TTL=10;this.digestTtl=function(value){if(arguments.length){TTL=value;}
return TTL;};this.$get=['$injector','$exceptionHandler','$parse',function($injector,$exceptionHandler,$parse){/**/
function Scope(){this.$id=nextUid();this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this['this']=this.$root=this;this.$$destroyed=false;this.$$asyncQueue=[];this.$$listeners={};this.$$isolateBindings={};}
Scope.prototype={/**/
$new:function(isolate){var Child,child;if(isFunction(isolate)){throw Error('API-CHANGE: Use $controller to instantiate controllers.');}
if(isolate){child=new Scope(); child.$root=this.$root;}else{Child=function(){};Child.prototype=this;child=new Child();child.$id=nextUid();}
child['this']=child;child.$$listeners={};child.$parent=this;child.$$asyncQueue=[];child.$$watchers=child.$$nextSibling=child.$$childHead=child.$$childTail=null;child.$$prevSibling=this.$$childTail;if(this.$$childHead){this.$$childTail.$$nextSibling=child;this.$$childTail=child;}else{this.$$childHead=this.$$childTail=child;}
return child;},/**/
$watch:function(watchExp,listener,objectEquality){var scope=this,get=compileToFn(watchExp,'watch'),array=scope.$$watchers,watcher={fn:listener,last:initWatchVal,get:get,exp:watchExp,eq:!!objectEquality};if(!isFunction(listener)){var listenFn=compileToFn(listener||noop,'listener');watcher.fn=function(newVal,oldVal,scope){listenFn(scope);};}
if(!array){array=scope.$$watchers=[];}
array.unshift(watcher);return function(){arrayRemove(array,watcher);};},/**/
$digest:function(){var watch,value,last,watchers,asyncQueue,length,dirty,ttl=TTL,next,current,target=this,watchLog=[],logIdx,logMsg;beginPhase('$digest');do{dirty=false;current=target;do{asyncQueue=current.$$asyncQueue;while(asyncQueue.length){try{current.$eval(asyncQueue.shift());}catch(e){$exceptionHandler(e);}}
if((watchers=current.$$watchers)){length=watchers.length;while(length--){try{watch=watchers[length];if((value=watch.get(current))!==(last=watch.last)&&!(watch.eq?equals(value,last):(typeof value=='number'&&typeof last=='number'&&isNaN(value)&&isNaN(last)))){dirty=true;watch.last=watch.eq?copy(value):value;watch.fn(value,((last===initWatchVal)?value:last),current);if(ttl<5){logIdx=4-ttl;if(!watchLog[logIdx])watchLog[logIdx]=[];logMsg=(isFunction(watch.exp))?'fn: '+(watch.exp.name||watch.exp.toString()):watch.exp;logMsg+='; newVal: '+toJson(value)+'; oldVal: '+toJson(last);watchLog[logIdx].push(logMsg);}}}catch(e){$exceptionHandler(e);}}}
if(!(next=(current.$$childHead||(current!==target&&current.$$nextSibling)))){while(current!==target&&!(next=current.$$nextSibling)){current=current.$parent;}}}while((current=next));if(dirty&&!(ttl--)){clearPhase();throw Error(TTL+' $digest() iterations reached. Aborting!\n'+
'Watchers fired in the last 5 iterations: '+toJson(watchLog));}}while(dirty||asyncQueue.length);clearPhase();},/**/
$destroy:function(){if($rootScope==this||this.$$destroyed)return;var parent=this.$parent;this.$broadcast('$destroy');this.$$destroyed=true;if(parent.$$childHead==this)parent.$$childHead=this.$$nextSibling;if(parent.$$childTail==this)parent.$$childTail=this.$$prevSibling;if(this.$$prevSibling)this.$$prevSibling.$$nextSibling=this.$$nextSibling;if(this.$$nextSibling)this.$$nextSibling.$$prevSibling=this.$$prevSibling;this.$parent =this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;},$eval:function(expr,locals){return $parse(expr)(this,locals);},/**/
$evalAsync:function(expr){this.$$asyncQueue.push(expr);},/**/
$apply:function(expr){try{beginPhase('$apply');return this.$eval(expr);}catch(e){$exceptionHandler(e);}finally{clearPhase();try{$rootScope.$digest();}catch(e){$exceptionHandler(e);throw e;}}},$on:function(name,listener){var namedListeners=this.$$listeners[name];if(!namedListeners){ this.$$listeners[name]=namedListeners=[];}
namedListeners.push(listener);return function(){namedListeners[indexOf(namedListeners,listener)]=null;};},/**/
$emit:function(name,args){var empty=[],namedListeners,scope=this,stopPropagation=false,event={name:name,targetScope:scope,stopPropagation:function(){stopPropagation=true;},preventDefault:function(){event.defaultPrevented=true;},defaultPrevented:false},listenerArgs=concat([event],arguments,1),i,length;do{namedListeners=scope.$$listeners[name]||empty;event.currentScope=scope;for(i=0,length=namedListeners.length;i<length;i++){if(!namedListeners[i]){namedListeners.splice(i,1);i--;length--;continue;}
try{namedListeners[i].apply(null,listenerArgs);if(stopPropagation)return event;}catch(e){$exceptionHandler(e);}}
scope=scope.$parent;}while(scope);return event;},/**/
$broadcast:function(name,args){var target=this,current=target,next=target,event={name:name,targetScope:target,preventDefault:function(){event.defaultPrevented=true;},defaultPrevented:false},listenerArgs=concat([event],arguments,1),listeners,i,length;do{current=next;event.currentScope=current;listeners=current.$$listeners[name]||[];for(i=0,length=listeners.length;i<length;i++){if(!listeners[i]){listeners.splice(i,1);i--;length--;continue;}
try{listeners[i].apply(null,listenerArgs);}catch(e){$exceptionHandler(e);}}//
if(!(next=(current.$$childHead||(current!==target&&current.$$nextSibling)))){while(current!==target&&!(next=current.$$nextSibling)){current=current.$parent;}}}while((current=next));return event;}};var $rootScope=new Scope();return $rootScope;function beginPhase(phase){if($rootScope.$$phase){throw Error($rootScope.$$phase+' already in progress');}
$rootScope.$$phase=phase;}
function clearPhase(){$rootScope.$$phase=null;}
function compileToFn(exp,name){var fn=$parse(exp);assertArgFn(fn,name);return fn;}
function initWatchVal(){}}];}
function $SnifferProvider(){this.$get=['$window',function($window){var eventSupport={},android=int((/android (\d+)/.exec(lowercase($window.navigator.userAgent))||[])[1]);return{history:!!($window.history&&$window.history.pushState&&!(android<4)),hashchange:'onhashchange' in $window&&(!$window.document.documentMode||$window.document.documentMode>7),hasEvent:function(event){if(event=='input'&&msie==9)return false;if(isUndefined(eventSupport[event])){var divElm=$window.document.createElement('div');eventSupport[event]='on'+event in divElm;}
return eventSupport[event];},csp:false};}];}
/**/
function $WindowProvider(){this.$get=valueFn(window);}
function parseHeaders(headers){var parsed={},key,val,i;if(!headers)return parsed;forEach(headers.split('\n'),function(line){i=line.indexOf(':');key=lowercase(trim(line.substr(0,i)));val=trim(line.substr(i+1));if(key){if(parsed[key]){parsed[key]+=', '+val;}else{parsed[key]=val;}}});return parsed;}
function headersGetter(headers){var headersObj=isObject(headers)?headers:undefined;return function(name){if(!headersObj)headersObj=parseHeaders(headers);if(name){return headersObj[lowercase(name)]||null;}
return headersObj;};}
function transformData(data,headers,fns){if(isFunction(fns))
return fns(data,headers);forEach(fns,function(fn){data=fn(data,headers);});return data;}
function isSuccess(status){return 200<=status&&status<300;}
function $HttpProvider(){var JSON_START=/^\s*(\[|\{[^\{])/,JSON_END=/[\}\]]\s*$/,PROTECTION_PREFIX=/^\)\]\}',?\n/;var $config=this.defaults={transformResponse:[function(data){if(isString(data)){data=data.replace(PROTECTION_PREFIX,'');if(JSON_START.test(data)&&JSON_END.test(data))
data=fromJson(data,true);}
return data;}],transformRequest:[function(d){return isObject(d)&&!isFile(d)?toJson(d):d;}],headers:{common:{'Accept':'application/json, text/plain, */*','X-Requested-With':'XMLHttpRequest'},post:{'Content-Type':'application/json;charset=utf-8'},put:{'Content-Type':'application/json;charset=utf-8'}}};var providerResponseInterceptors=this.responseInterceptors=[];this.$get=['$httpBackend','$browser','$cacheFactory','$rootScope','$q','$injector',function($httpBackend,$browser,$cacheFactory,$rootScope,$q,$injector){var defaultCache=$cacheFactory('$http'),responseInterceptors=[];forEach(providerResponseInterceptors,function(interceptor){responseInterceptors.push(isString(interceptor)?$injector.get(interceptor):$injector.invoke(interceptor));});/**/
function $http(config){config.method=uppercase(config.method);var reqTransformFn=config.transformRequest||$config.transformRequest,respTransformFn=config.transformResponse||$config.transformResponse,defHeaders=$config.headers,reqHeaders=extend({'X-XSRF-TOKEN':$browser.cookies()['XSRF-TOKEN']},defHeaders.common,defHeaders[lowercase(config.method)],config.headers),reqData=transformData(config.data,headersGetter(reqHeaders),reqTransformFn),promise;if(isUndefined(config.data)){delete reqHeaders['Content-Type'];}
promise=sendReq(config,reqData,reqHeaders);promise=promise.then(transformResponse,transformResponse);forEach(responseInterceptors,function(interceptor){promise=interceptor(promise);});promise.success=function(fn){promise.then(function(response){fn(response.data,response.status,response.headers,config);});return promise;};promise.error=function(fn){promise.then(null,function(response){fn(response.data,response.status,response.headers,config);});return promise;};return promise;function transformResponse(response){//
var resp=extend({},response,{data:transformData(response.data,response.headers,respTransformFn)});return(isSuccess(response.status))?resp:$q.reject(resp);}}
$http.pendingRequests=[];/**/
createShortMethods('get','delete','head','jsonp');createShortMethodsWithData('post','put');/**/
$http.defaults=$config;return $http;function createShortMethods(names){forEach(arguments,function(name){$http[name]=function(url,config){return $http(extend(config||{},{method:name,url:url}));};});}
function createShortMethodsWithData(name){forEach(arguments,function(name){$http[name]=function(url,data,config){return $http(extend(config||{},{method:name,url:url,data:data}));};});}
function sendReq(config,reqData,reqHeaders){var deferred=$q.defer(),promise=deferred.promise,cache,cachedResp,url=buildUrl(config.url,config.params);$http.pendingRequests.push(config);promise.then(removePendingReq,removePendingReq);if(config.cache&&config.method=='GET'){cache=isObject(config.cache)?config.cache:defaultCache;}
if(cache){cachedResp=cache.get(url);if(cachedResp){if(cachedResp.then){cachedResp.then(removePendingReq,removePendingReq);return cachedResp;}else{if(isArray(cachedResp)){resolvePromise(cachedResp[1],cachedResp[0],copy(cachedResp[2]));}else{resolvePromise(cachedResp,200,{});}}}else{//
cache.put(url,promise);}}
if(!cachedResp){$httpBackend(config.method,url,reqData,done,reqHeaders,config.timeout,config.withCredentials);}
return promise;function done(status,response,headersString){if(cache){if(isSuccess(status)){cache.put(url,[status,response,parseHeaders(headersString)]);}else{cache.remove(url);}}
resolvePromise(response,status,headersString);$rootScope.$apply();}
function resolvePromise(response,status,headers){status=Math.max(status,0);(isSuccess(status)?deferred.resolve:deferred.reject)({data:response,status:status,headers:headersGetter(headers),config:config});}
function removePendingReq(){var idx=indexOf($http.pendingRequests,config);if(idx!==-1)$http.pendingRequests.splice(idx,1);}}
function buildUrl(url,params){ if(!params)return url;var parts=[];forEachSorted(params,function(value,key){if(value==null||value==undefined)return;if(isObject(value)){value=toJson(value);}
parts.push(encodeURIComponent(key)+'='+encodeURIComponent(value));});return url+((url.indexOf('?')==-1)?'?':'&')+parts.join('&');}}];}
var XHR=window.XMLHttpRequest||function(){try{return new ActiveXObject("Msxml2.XMLHTTP.6.0");}catch(e1){}
try{return new ActiveXObject("Msxml2.XMLHTTP.3.0");}catch(e2){}
try{return new ActiveXObject("Msxml2.XMLHTTP");}catch(e3){}
throw new Error("This browser does not support XMLHttpRequest.");};function $HttpBackendProvider(){this.$get=['$browser','$window','$document',function($browser,$window,$document){return createHttpBackend($browser,XHR,$browser.defer,$window.angular.callbacks,$document[0],$window.location.protocol.replace(':',''));}];}
function createHttpBackend($browser,XHR,$browserDefer,callbacks,rawDocument,locationProtocol){return function(method,url,post,callback,headers,timeout,withCredentials){$browser.$$incOutstandingRequestCount();url=url||$browser.url();if(lowercase(method)=='jsonp'){var callbackId='_'+(callbacks.counter++).toString(36);callbacks[callbackId]=function(data){callbacks[callbackId].data=data;};jsonpReq(url.replace('JSON_CALLBACK','angular.callbacks.'+callbackId),function(){if(callbacks[callbackId].data){completeRequest(callback,200,callbacks[callbackId].data);}else{completeRequest(callback,-2);}
delete callbacks[callbackId];});}else{var xhr=new XHR();xhr.open(method,url,true);forEach(headers,function(value,key){if(value)xhr.setRequestHeader(key,value);});var status;xhr.onreadystatechange=function(){if(xhr.readyState==4){var responseHeaders=xhr.getAllResponseHeaders();var value,simpleHeaders=["Cache-Control","Content-Language","Content-Type","Expires","Last-Modified","Pragma"];if(!responseHeaders){responseHeaders="";forEach(simpleHeaders,function(header){var value=xhr.getResponseHeader(header);if(value){responseHeaders+=header+": "+value+"\n";}});}
completeRequest(callback,status||xhr.status,xhr.responseText,responseHeaders);}
};if(withCredentials){xhr.withCredentials=true;}
xhr.send(post||'');if(timeout>0){$browserDefer(function(){status=-1;xhr.abort();},timeout);}}
function completeRequest(callback,status,response,headersString){var protocol=(url.match(URL_MATCH)||['',locationProtocol])[1];status=(protocol=='file')?(response?200:404):status;status=status==1223?204:status;callback(status,response,headersString);$browser.$$completeOutstandingRequest(noop);}};function jsonpReq(url,done){var script=rawDocument.createElement('script'),doneWrapper=function(){rawDocument.body.removeChild(script);if(done)done();};script.type='text/javascript';script.src=url;if(msie){script.onreadystatechange=function(){if(/loaded|complete/.test(script.readyState))doneWrapper();};}else{script.onload=script.onerror=doneWrapper;}
rawDocument.body.appendChild(script);}}
function $LocaleProvider(){this.$get=function(){return{id:'en-us',NUMBER_FORMATS:{DECIMAL_SEP:'.',GROUP_SEP:',',PATTERNS:[{//
minInt:1,minFrac:0,maxFrac:3,posPre:'',posSuf:'',negPre:'-',negSuf:'',gSize:3,lgSize:3},{minInt:1,minFrac:2,maxFrac:2,posPre:'\u00A4',posSuf:'',negPre:'(\u00A4',negSuf:')',gSize:3,lgSize:3}],CURRENCY_SYM:'$'},DATETIME_FORMATS:{MONTH:'January,February,March,April,May,June,July,August,September,October,November,December'
.split(','),SHORTMONTH:'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(','),DAY:'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(','),SHORTDAY:'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(','),AMPMS:['AM','PM'], medium:'MMM d, y h:mm:ss a',short:'M/d/yy h:mm a',fullDate:'EEEE, MMMM d, y',longDate:'MMMM d, y',mediumDate:'MMM d, y',shortDate:'M/d/yy',mediumTime:'h:mm:ss a',shortTime:'h:mm a'},pluralCat:function(num){if(num===1){return 'one';}
return 'other';}};};}
function $TimeoutProvider(){this.$get=['$rootScope','$browser','$q','$exceptionHandler',function($rootScope,$browser,$q,$exceptionHandler){var deferreds={};function timeout(fn,delay,invokeApply){var deferred=$q.defer(),promise=deferred.promise,skipApply=(isDefined(invokeApply)&&!invokeApply),timeoutId,cleanup;timeoutId=$browser.defer(function(){try{deferred.resolve(fn());}catch(e){deferred.reject(e);$exceptionHandler(e);}
if(!skipApply)$rootScope.$apply();},delay);cleanup=function(){delete deferreds[promise.$$timeoutId];};promise.$$timeoutId=timeoutId;deferreds[timeoutId]=deferred;promise.then(cleanup,cleanup);return promise;}
timeout.cancel=function(promise){if(promise&&promise.$$timeoutId in deferreds){deferreds[promise.$$timeoutId].reject('canceled');return $browser.defer.cancel(promise.$$timeoutId);}
return false;};return timeout;}];}
/**/
$FilterProvider.$inject=['$provide'];function $FilterProvider($provide){var suffix='Filter';function register(name,factory){return $provide.factory(name+suffix,factory);}
this.register=register;this.$get=['$injector',function($injector){return function(name){return $injector.get(name+suffix);}}];register('currency',currencyFilter);register('date',dateFilter);register('filter',filterFilter);register('json',jsonFilter);register('limitTo',limitToFilter);register('lowercase',lowercaseFilter);register('number',numberFilter);register('orderBy',orderByFilter);register('uppercase',uppercaseFilter);}
/**/
function filterFilter(){return function(array,expression){if(!isArray(array))return array;var predicates=[];predicates.check= function(value){for(var j=0;j<predicates.length;j++){if(!predicates[j](value)){return false;}}
return true;};var search=function(obj,text){if(text.charAt(0)==='!'){return!search(obj,text.substr(1));}
switch(typeof obj){case "boolean":case "number":case "string":return(''+obj).toLowerCase().indexOf(text)>-1;case "object":for(var objKey in obj){if(objKey.charAt(0)!=='$'&&search(obj[objKey],text)){return true;}}
return false;case "array":for(var i=0;i<obj.length;i++){if(search(obj[i],text)){return true;}}
return false;default:return false;}};switch(typeof expression){case "boolean":case "number":case "string":expression={$:expression};case "object":for(var key in expression){if(key=='$'){(function(){var text=(''+expression[key]).toLowerCase();if(!text)return;predicates.push(function(value){return search(value,text);});})();}else{(function(){var path=key;var text=(''+expression[key]).toLowerCase();if(!text)return;predicates.push(function(value){return search(getter(value,path),text);});})();}}
break;case 'function':predicates.push(expression);break;default:return array;}
var filtered=[];for(var j=0;j<array.length;j++){var value=array[j];if(predicates.check(value)){filtered.push(value);}}
return filtered;}}
currencyFilter.$inject=['$locale'];function currencyFilter($locale){var formats=$locale.NUMBER_FORMATS;return function(amount,currencySymbol){if(isUndefined(currencySymbol))currencySymbol=formats.CURRENCY_SYM;return formatNumber(amount,formats.PATTERNS[1],formats.GROUP_SEP,formats.DECIMAL_SEP,2).
replace(/\u00A4/g,currencySymbol);};}
/**/
numberFilter.$inject=['$locale'];function numberFilter($locale){var formats=$locale.NUMBER_FORMATS;return function(number,fractionSize){return formatNumber(number,formats.PATTERNS[0],formats.GROUP_SEP,formats.DECIMAL_SEP,fractionSize);};}
var DECIMAL_SEP='.';function formatNumber(number,pattern,groupSep,decimalSep,fractionSize){if(isNaN(number)||!isFinite(number))return '';var isNegative=number<0;number=Math.abs(number);var numStr=number+'',formatedText='',parts=[];var hasExponent=false;if(numStr.indexOf('e')!==-1){var match=numStr.match(/([\d\.]+)e(-?)(\d+)/);if(match&&match[2]=='-'&&match[3]>fractionSize+1){numStr='0';}else{formatedText=numStr;hasExponent=true;}}
if(!hasExponent){var fractionLen=(numStr.split(DECIMAL_SEP)[1]||'').length;//
if(isUndefined(fractionSize)){fractionSize=Math.min(Math.max(pattern.minFrac,fractionLen),pattern.maxFrac);}
var pow=Math.pow(10,fractionSize);number=Math.round(number*pow)/pow;var fraction=(''+number).split(DECIMAL_SEP);var whole=fraction[0];fraction=fraction[1]||'';var pos=0,lgroup=pattern.lgSize,group=pattern.gSize;if(whole.length>=(lgroup+group)){pos=whole.length-lgroup;for(var i=0;i<pos;i++){if((pos-i)%group===0&&i!==0){formatedText+=groupSep;}
formatedText+=whole.charAt(i);}}
for(i=pos;i<whole.length;i++){if((whole.length-i)%lgroup===0&&i!==0){formatedText+=groupSep;}
formatedText+=whole.charAt(i);}
while(fraction.length<fractionSize){ fraction+='0';}
if(fractionSize&&fractionSize!=="0")formatedText+=decimalSep+fraction.substr(0,fractionSize);}
parts.push(isNegative?pattern.negPre:pattern.posPre);parts.push(formatedText);parts.push(isNegative?pattern.negSuf:pattern.posSuf);return parts.join('');}
function padNumber(num,digits,trim){var neg='';if(num<0){neg='-';num=-num;}
num=''+num;while(num.length<digits)num='0'+num;if(trim)
num=num.substr(num.length-digits);return neg+num;}
function dateGetter(name,size,offset,trim){offset=offset||0;return function(date){var value=date['get'+name]();if(offset>0||value>-offset)
value+=offset;if(value===0&&offset==-12)value=12;return padNumber(value,size,trim);};}
function dateStrGetter(name,shortForm){return function(date,formats){var value=date['get'+name]();var get=uppercase(shortForm?('SHORT'+name):name);return formats[get][value];};}
function timeZoneGetter(date){var zone=-1*date.getTimezoneOffset();var paddedZone=(zone>=0)?"+":"";paddedZone+=padNumber(Math[zone>0?'floor':'ceil'](zone/60),2)+
padNumber(Math.abs(zone%60),2);return paddedZone;}
function ampmGetter(date,formats){return date.getHours()<12?formats.AMPMS[0]:formats.AMPMS[1];}
var DATE_FORMATS={yyyy:dateGetter('FullYear',4),yy:dateGetter('FullYear',2,0,true),y:dateGetter('FullYear',1),MMMM:dateStrGetter('Month'),MMM:dateStrGetter('Month',true),MM:dateGetter('Month',2,1),M:dateGetter('Month',1,1),dd:dateGetter('Date',2),d:dateGetter('Date',1),HH:dateGetter('Hours',2),H:dateGetter('Hours',1),hh:dateGetter('Hours',2,-12),h:dateGetter('Hours',1,-12),mm:dateGetter('Minutes',2),m:dateGetter('Minutes',1),ss:dateGetter('Seconds',2), s:dateGetter('Seconds',1),EEEE:dateStrGetter('Day'),EEE:dateStrGetter('Day',true),a:ampmGetter,Z:timeZoneGetter};var DATE_FORMATS_SPLIT=/((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,NUMBER_STRING=/^\d+$/;/**/
dateFilter.$inject=['$locale'];function dateFilter($locale){var R_ISO8601_STR=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;function jsonStringToDate(string){var match;if(match=string.match(R_ISO8601_STR)){var date=new Date(0),tzHour=0,tzMin=0;if(match[9]){tzHour=int(match[9]+match[10]);tzMin=int(match[9]+match[11]);}
date.setUTCFullYear(int(match[1]),int(match[2])-1,int(match[3]));date.setUTCHours(int(match[4]||0)-tzHour,int(match[5]||0)-tzMin,int(match[6]||0),int(match[7]||0));return date;}
return string;}
return function(date,format){var text='',parts=[],fn,match;format=format||'mediumDate';format=$locale.DATETIME_FORMATS[format]||format;if(isString(date)){if(NUMBER_STRING.test(date)){date=int(date);}else{date=jsonStringToDate(date);}}
if(isNumber(date)){date=new Date(date);}
if(!isDate(date)){return date;}
while(format){match=DATE_FORMATS_SPLIT.exec(format);if(match){parts=concat(parts,match,1);format=parts.pop();}else{parts.push(format);format=null;}}
forEach(parts,function(value){fn=DATE_FORMATS[value];text+=fn?fn(date,$locale.DATETIME_FORMATS):value.replace(/(^'|'$)/g,'').replace(/''/g,"'");});return text;};}
function jsonFilter(){return function(object){return toJson(object,true);};}
var lowercaseFilter=valueFn(lowercase);var uppercaseFilter=valueFn(uppercase);/**/
function limitToFilter(){return function(array,limit){if(!(array instanceof Array))return array;limit=int(limit);var out=[],i,n;if(!array||!(array instanceof Array))
return out;if(limit>array.length)
limit=array.length;else if(limit<-array.length)
limit=-array.length;if(limit>0){i=0;n=limit;}else{i=array.length+limit;n=array.length;}
for(;i<n;i++){out.push(array[i]);}
return out;}}
/**/
orderByFilter.$inject=['$parse'];function orderByFilter($parse){return function(array,sortPredicate,reverseOrder){if(!isArray(array))return array;if(!sortPredicate)return array;sortPredicate=isArray(sortPredicate)?sortPredicate:[sortPredicate];sortPredicate=map(sortPredicate,function(predicate){var descending=false,get=predicate||identity;if(isString(predicate)){if((predicate.charAt(0)=='+'||predicate.charAt(0)=='-')){descending =predicate.charAt(0)=='-';predicate=predicate.substring(1);}
get=$parse(predicate);}
return reverseComparator(function(a,b){return compare(get(a),get(b));},descending);});var arrayCopy=[];for(var i=0;i<array.length;i++){arrayCopy.push(array[i]);}
return arrayCopy.sort(reverseComparator(comparator,reverseOrder));function comparator(o1,o2){for(var i=0;i<sortPredicate.length;i++){var comp=sortPredicate[i](o1,o2);if(comp!==0)return comp;}
return 0;}
function reverseComparator(comp,descending){return toBoolean(descending)?function(a,b){return comp(b,a);}:comp;}
function compare(v1,v2){var t1=typeof v1;var t2=typeof v2;if(t1==t2){if(t1=="string")v1=v1.toLowerCase();if(t1=="string")v2=v2.toLowerCase();if(v1===v2)return 0;return v1<v2?-1:1;}else{return t1<t2?-1:1;}}}}
function ngDirective(directive){if(isFunction(directive)){directive={link:directive}}
directive.restrict=directive.restrict||'AC';return valueFn(directive);}
var htmlAnchorDirective=valueFn({restrict:'E',compile:function(element,attr){if(msie<=8){if(!attr.href&&!attr.name){attr.$set('href','');}
element.append(document.createComment('IE fix'));}
return function(scope,element){element.bind('click',function(event){if(!element.attr('href')){event.preventDefault();}});}}});/**/
/**/
/**/
/**/
var ngAttributeAliasDirectives={};forEach(BOOLEAN_ATTR,function(propName,attrName){var normalized=directiveNormalize('ng-'+attrName);ngAttributeAliasDirectives[normalized]=function(){return{priority:100,compile:function(){return function(scope,element,attr){scope.$watch(attr[normalized],function ngBooleanAttrWatchAction(value){attr.$set(attrName,!!value);});};}};};});forEach(['src','href'],function(attrName){var normalized=directiveNormalize('ng-'+attrName); ngAttributeAliasDirectives[normalized]=function(){return{priority:99,link:function(scope,element,attr){attr.$observe(normalized,function(value){if(!value)
return;attr.$set(attrName,value);if(msie)element.prop(attrName,attr[attrName]);});}};};});var nullFormCtrl={$addControl:noop,$removeControl:noop,$setValidity:noop,$setDirty:noop};FormController.$inject=['$element','$attrs','$scope'];function FormController(element,attrs){var form=this,parentForm=element.parent().controller('form')||nullFormCtrl,invalidCount=0,errors=form.$error={};form.$name=attrs.name;form.$dirty=false;form.$pristine=true;form.$valid=true;form.$invalid=false;parentForm.$addControl(form);element.addClass(PRISTINE_CLASS);toggleValidCss(true);function toggleValidCss(isValid,validationErrorKey){validationErrorKey=validationErrorKey?'-'+snake_case(validationErrorKey,'-'):'';element.
removeClass((isValid?INVALID_CLASS:VALID_CLASS)+validationErrorKey).
addClass((isValid?VALID_CLASS:INVALID_CLASS)+validationErrorKey);}
form.$addControl=function(control){if(control.$name&&!form.hasOwnProperty(control.$name)){form[control.$name]=control;}};form.$removeControl=function(control){if(control.$name&&form[control.$name]===control){delete form[control.$name];}
forEach(errors,function(queue,validationToken){form.$setValidity(validationToken,true,control);});};form.$setValidity=function(validationToken,isValid,control){var queue=errors[validationToken];if(isValid){if(queue){arrayRemove(queue,control);if(!queue.length){invalidCount--;if(!invalidCount){toggleValidCss(isValid);form.$valid=true;form.$invalid=false;}
errors[validationToken]=false;toggleValidCss(true,validationToken);parentForm.$setValidity(validationToken,true,form);}}}else{if(!invalidCount){toggleValidCss(isValid);}
if(queue){if(includes(queue,control))return;}else{errors[validationToken]=queue=[];invalidCount++;toggleValidCss(false,validationToken);parentForm.$setValidity(validationToken,false,form);}
queue.push(control);form.$valid=false;form.$invalid=true;}};form.$setDirty=function(){element.removeClass(PRISTINE_CLASS).addClass(DIRTY_CLASS);form.$dirty=true;form.$pristine=false;parentForm.$setDirty();};}
/**/
/**/
var formDirectiveFactory=function(isNgForm){return['$timeout',function($timeout){var formDirective={name:'form',restrict:'E',controller:FormController,compile:function(){return{pre:function(scope,formElement,attr,controller){if(!attr.action){var preventDefaultListener=function(event){event.preventDefault?event.preventDefault():event.returnValue=false;};addEventListenerFn(formElement[0],'submit',preventDefaultListener);//
formElement.bind('$destroy',function(){$timeout(function(){removeEventListenerFn(formElement[0],'submit',preventDefaultListener);},0,false);});}
var parentFormCtrl=formElement.parent().controller('form'),alias=attr.name||attr.ngForm;if(alias){scope[alias]=controller;}
if(parentFormCtrl){formElement.bind('$destroy',function(){parentFormCtrl.$removeControl(controller);if(alias){scope[alias]=undefined;}
extend(controller,nullFormCtrl);});}}};}};return isNgForm?extend(copy(formDirective),{restrict:'EAC'}):formDirective;}];};var formDirective=formDirectiveFactory();var ngFormDirective=formDirectiveFactory(true);var URL_REGEXP=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;var EMAIL_REGEXP=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;var NUMBER_REGEXP=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;var inputType={/**/
'text':textInputType,/**/
'number':numberInputType,/**/
'url':urlInputType,/**/
'email':emailInputType,/**/
'radio':radioInputType,/**/
'checkbox':checkboxInputType,'hidden':noop,'button':noop,'submit':noop,'reset':noop};function isEmpty(value){return isUndefined(value)||value===''||value===null||value!==value;}
function textInputType(scope,element,attr,ctrl,$sniffer,$browser){var listener=function(){var value=trim(element.val());if(ctrl.$viewValue!==value){scope.$apply(function(){ctrl.$setViewValue(value);});}};if($sniffer.hasEvent('input')){element.bind('input',listener);}else{var timeout;var deferListener=function(){if(!timeout){timeout=$browser.defer(function(){listener();timeout=null;});}};element.bind('keydown',function(event){var key=event.keyCode;if(key===91||(15<key&&key<19)||(37<=key&&key<=40))return;deferListener();});element.bind('change',listener);if($sniffer.hasEvent('paste')){element.bind('paste cut',deferListener);}}
ctrl.$render=function(){element.val(isEmpty(ctrl.$viewValue)?'':ctrl.$viewValue);};var pattern=attr.ngPattern,patternValidator;var validate=function(regexp,value){if(isEmpty(value)||regexp.test(value)){ctrl.$setValidity('pattern',true);return value;}else{ctrl.$setValidity('pattern',false);return undefined;}};if(pattern){if(pattern.match(/^\/(.*)\/$/)){pattern=new RegExp(pattern.substr(1,pattern.length-2));patternValidator=function(value){return validate(pattern,value)};}else{patternValidator=function(value){var patternObj=scope.$eval(pattern);if(!patternObj||!patternObj.test){throw new Error('Expected '+pattern+' to be a RegExp but was '+patternObj);}
return validate(patternObj,value);};}
ctrl.$formatters.push(patternValidator);ctrl.$parsers.push(patternValidator);}
if(attr.ngMinlength){ var minlength=int(attr.ngMinlength);var minLengthValidator=function(value){if(!isEmpty(value)&&value.length<minlength){ctrl.$setValidity('minlength',false);return undefined;}else{ctrl.$setValidity('minlength',true);return value;}};ctrl.$parsers.push(minLengthValidator);ctrl.$formatters.push(minLengthValidator);}
if(attr.ngMaxlength){var maxlength=int(attr.ngMaxlength);var maxLengthValidator=function(value){if(!isEmpty(value)&&value.length>maxlength){ctrl.$setValidity('maxlength',false);return undefined;}else{ctrl.$setValidity('maxlength',true);return value;}};ctrl.$parsers.push(maxLengthValidator);ctrl.$formatters.push(maxLengthValidator);}}
function numberInputType(scope,element,attr,ctrl,$sniffer,$browser){textInputType(scope,element,attr,ctrl,$sniffer,$browser);ctrl.$parsers.push(function(value){var empty=isEmpty(value);if(empty||NUMBER_REGEXP.test(value)){ctrl.$setValidity('number',true);return value===''?null:(empty?value:parseFloat(value));}else{ctrl.$setValidity('number',false);return undefined;}});ctrl.$formatters.push(function(value){return isEmpty(value)?'':''+value;});if(attr.min){var min=parseFloat(attr.min);var minValidator=function(value){if(!isEmpty(value)&&value<min){ctrl.$setValidity('min',false);return undefined;}else{ctrl.$setValidity('min',true);return value;}};ctrl.$parsers.push(minValidator);ctrl.$formatters.push(minValidator);}
if(attr.max){var max=parseFloat(attr.max);var maxValidator=function(value){if(!isEmpty(value)&&value>max){ctrl.$setValidity('max',false);return undefined;}else{ ctrl.$setValidity('max',true);return value;}};ctrl.$parsers.push(maxValidator);ctrl.$formatters.push(maxValidator);}
ctrl.$formatters.push(function(value){if(isEmpty(value)||isNumber(value)){ctrl.$setValidity('number',true);return value;}else{ctrl.$setValidity('number',false);return undefined;}});}
function urlInputType(scope,element,attr,ctrl,$sniffer,$browser){textInputType(scope,element,attr,ctrl,$sniffer,$browser);var urlValidator=function(value){if(isEmpty(value)||URL_REGEXP.test(value)){ctrl.$setValidity('url',true);return value;}else{ctrl.$setValidity('url',false);return undefined;}};ctrl.$formatters.push(urlValidator);ctrl.$parsers.push(urlValidator);}
function emailInputType(scope,element,attr,ctrl,$sniffer,$browser){textInputType(scope,element,attr,ctrl,$sniffer,$browser);var emailValidator=function(value){if(isEmpty(value)||EMAIL_REGEXP.test(value)){ctrl.$setValidity('email',true);return value;}else{ctrl.$setValidity('email',false);return undefined;}};ctrl.$formatters.push(emailValidator);ctrl.$parsers.push(emailValidator);}
function radioInputType(scope,element,attr,ctrl){if(isUndefined(attr.name)){element.attr('name',nextUid());}
element.bind('click',function(){if(element[0].checked){scope.$apply(function(){ctrl.$setViewValue(attr.value);});}});ctrl.$render=function(){var value=attr.value;element[0].checked=(value==ctrl.$viewValue);};attr.$observe('value',ctrl.$render);}
function checkboxInputType(scope,element,attr,ctrl){var trueValue=attr.ngTrueValue,falseValue=attr.ngFalseValue;if(!isString(trueValue))trueValue=true;if(!isString(falseValue))falseValue=false;element.bind('click',function(){scope.$apply(function(){ctrl.$setViewValue(element[0].checked);});});ctrl.$render=function(){element[0].checked=ctrl.$viewValue;};ctrl.$formatters.push(function(value){return value===trueValue;});ctrl.$parsers.push(function(value){return value?trueValue:falseValue;});}
/**/
/**/
var inputDirective=['$browser','$sniffer',function($browser,$sniffer){return{restrict:'E',require:'?ngModel',link:function(scope,element,attr,ctrl){if(ctrl){(inputType[lowercase(attr.type)]||inputType.text)(scope,element,attr,ctrl,$sniffer,$browser);}}};}];var VALID_CLASS='ng-valid',INVALID_CLASS='ng-invalid',PRISTINE_CLASS='ng-pristine',DIRTY_CLASS='ng-dirty';/**/
var NgModelController=['$scope','$exceptionHandler','$attrs','$element','$parse',function($scope,$exceptionHandler,$attr,$element,$parse){this.$viewValue=Number.NaN;this.$modelValue=Number.NaN;this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$pristine=true;this.$dirty=false;this.$valid=true;this.$invalid=false;this.$name=$attr.name;var ngModelGet=$parse($attr.ngModel),ngModelSet=ngModelGet.assign;if(!ngModelSet){throw Error(NON_ASSIGNABLE_MODEL_EXPRESSION+$attr.ngModel+
' ('+startingTag($element)+')');}
/**/
this.$render=noop;var parentForm=$element.inheritedData('$formController')||nullFormCtrl,invalidCount=0,$error=this.$error={};$element.addClass(PRISTINE_CLASS);toggleValidCss(true);function toggleValidCss(isValid,validationErrorKey){validationErrorKey=validationErrorKey?'-'+snake_case(validationErrorKey,'-'):'';$element.
removeClass((isValid?INVALID_CLASS:VALID_CLASS)+validationErrorKey).
addClass((isValid?VALID_CLASS:INVALID_CLASS)+validationErrorKey);}
this.$setValidity=function(validationErrorKey,isValid){if($error[validationErrorKey]===!isValid)return;if(isValid){if($error[validationErrorKey])invalidCount--;if(!invalidCount){toggleValidCss(true);this.$valid=true;this.$invalid=false;}}else{toggleValidCss(false);this.$invalid=true;this.$valid=false;invalidCount++;}
$error[validationErrorKey]=!isValid;toggleValidCss(isValid,validationErrorKey);parentForm.$setValidity(validationErrorKey,isValid,this);};
this.$setViewValue=function(value){this.$viewValue=value;if(this.$pristine){this.$dirty=true;this.$pristine=false;$element.removeClass(PRISTINE_CLASS).addClass(DIRTY_CLASS);parentForm.$setDirty();}
forEach(this.$parsers,function(fn){value=fn(value);});if(this.$modelValue!==value){this.$modelValue=value;ngModelSet($scope,value);forEach(this.$viewChangeListeners,function(listener){try{listener();}catch(e){$exceptionHandler(e);}})}};var ctrl=this;$scope.$watch(function ngModelWatch(){var value=ngModelGet($scope);if(ctrl.$modelValue!==value){var formatters=ctrl.$formatters,idx=formatters.length;ctrl.$modelValue=value;while(idx--){value=formatters[idx](value);}
if(ctrl.$viewValue!==value){ctrl.$viewValue=value;ctrl.$render();}}});}];/**/
var ngModelDirective=function(){return{require:['ngModel','^?form'],controller:NgModelController,link:function(scope,element,attr,ctrls){var modelCtrl=ctrls[0],formCtrl=ctrls[1]||nullFormCtrl;formCtrl.$addControl(modelCtrl);element.bind('$destroy',function(){formCtrl.$removeControl(modelCtrl);});}};};/**/
var ngChangeDirective=valueFn({require:'ngModel',link:function(scope,element,attr,ctrl){ctrl.$viewChangeListeners.push(function(){scope.$eval(attr.ngChange);});}});var requiredDirective=function(){return{require:'?ngModel',link:function(scope,elm,attr,ctrl){if(!ctrl)return;attr.required=true;var validator=function(value){if(attr.required&&(isEmpty(value)||value===false)){ctrl.$setValidity('required',false);return;}else{ctrl.$setValidity('required',true);return value;}};ctrl.$formatters.push(validator);ctrl.$parsers.unshift(validator);attr.$observe('required',function(){validator(ctrl.$viewValue);});}};};/**/
var ngListDirective=function(){return{require:'ngModel',link:function(scope,element,attr,ctrl){var match=/\/(.*)\//.exec(attr.ngList),separator=match&&new RegExp(match[1])||attr.ngList||',';var parse=function(viewValue){var list=[];if(viewValue){forEach(viewValue.split(separator),function(value){if(value)list.push(trim(value));});}
return list;};ctrl.$parsers.push(parse);ctrl.$formatters.push(function(value){if(isArray(value)){return value.join(', ');}
return undefined;});}};};var CONSTANT_VALUE_REGEXP=/^(true|false|\d+)$/;var ngValueDirective=function(){return{priority:100,compile:function(tpl,tplAttr){if(CONSTANT_VALUE_REGEXP.test(tplAttr.ngValue)){return function(scope,elm,attr){attr.$set('value',scope.$eval(attr.ngValue));};}else{return function(scope,elm,attr){scope.$watch(attr.ngValue,function valueWatchAction(value){attr.$set('value',value,false);});};}}};};/**/
var ngBindDirective=ngDirective(function(scope,element,attr){element.addClass('ng-binding').data('$binding',attr.ngBind);scope.$watch(attr.ngBind,function ngBindWatchAction(value){element.text(value==undefined?'':value);});});/**/
var ngBindTemplateDirective=['$interpolate',function($interpolate){return function(scope,element,attr){var interpolateFn=$interpolate(element.attr(attr.$attr.ngBindTemplate));element.addClass('ng-binding').data('$binding',interpolateFn);attr.$observe('ngBindTemplate',function(value){element.text(value);});}}];var ngBindHtmlUnsafeDirective=[function(){return function(scope,element,attr){element.addClass('ng-binding').data('$binding',attr.ngBindHtmlUnsafe);scope.$watch(attr.ngBindHtmlUnsafe,function ngBindHtmlUnsafeWatchAction(value){element.html(value||'');});};}];function classDirective(name,selector){name='ngClass'+name;return ngDirective(function(scope,element,attr){var oldVal=undefined;scope.$watch(attr[name],ngClassWatchAction,true);attr.$observe('class',function(value){var ngClass=scope.$eval(attr[name]);ngClassWatchAction(ngClass,ngClass);});if(name!=='ngClass'){scope.$watch('$index',function($index,old$index){var mod=$index&1;if(mod!==old$index&1){if(mod===selector){addClass(scope.$eval(attr[name]));}else{removeClass(scope.$eval(attr[name]));}}});}
function ngClassWatchAction(newVal){if(selector===true||scope.$index%2===selector){if(oldVal&&!equals(newVal,oldVal)){removeClass(oldVal);}
addClass(newVal);}
oldVal=copy(newVal);}
function removeClass(classVal){if(isObject(classVal)&&!isArray(classVal)){classVal=map(classVal,function(v,k){if(v)return k});}
element.removeClass(isArray(classVal)?classVal.join(' '):classVal);}
function addClass(classVal){if(isObject(classVal)&&!isArray(classVal)){classVal=map(classVal,function(v,k){if(v)return k});}
if(classVal){element.addClass(isArray(classVal)?classVal.join(' '):classVal);}}});}
/**/
var ngClassDirective=classDirective('',true);var ngClassOddDirective=classDirective('Odd',0);/**/
var ngClassEvenDirective=classDirective('Even',1);/**/
var ngCloakDirective=ngDirective({compile:function(element,attr){attr.$set('ngCloak',undefined);element.removeClass('ng-cloak');}});/**/
var ngControllerDirective=[function(){return{scope:true,controller:'@'};}];var ngCspDirective=['$sniffer',function($sniffer){return{priority:1000,compile:function(){$sniffer.csp=true;}};}];/**/
var ngEventDirectives={};forEach('click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave'.split(' '),function(name){var directiveName=directiveNormalize('ng-'+name);ngEventDirectives[directiveName]=['$parse',function($parse){return function(scope,element,attr){var fn=$parse(attr[directiveName]);element.bind(lowercase(name),function(event){scope.$apply(function(){fn(scope,{$event:event});});});};}];});/**/
/**/
var ngSubmitDirective=ngDirective(function(scope,element,attrs){element.bind('submit',function(){scope.$apply(attrs.ngSubmit);});});/**/
/**/
var ngIncludeDirective=['$http','$templateCache','$anchorScroll','$compile',function($http,$templateCache,$anchorScroll,$compile){return{restrict:'ECA',terminal:true,compile:function(element,attr){var srcExp=attr.ngInclude||attr.src,onloadExp=attr.onload||'',autoScrollExp=attr.autoscroll;return function(scope,element){var changeCounter=0,childScope;var clearContent=function(){if(childScope){childScope.$destroy();childScope=null;}
element.html('');};scope.$watch(srcExp,function ngIncludeWatchAction(src){var thisChangeId=++changeCounter;if(src){$http.get(src,{cache:$templateCache}).success(function(response){if(thisChangeId!==changeCounter)return;if(childScope)childScope.$destroy();childScope=scope.$new();element.html(response);$compile(element.contents())(childScope);if(isDefined(autoScrollExp)&&(!autoScrollExp||scope.$eval(autoScrollExp))){$anchorScroll();}
childScope.$emit('$includeContentLoaded');scope.$eval(onloadExp);}).error(function(){if(thisChangeId===changeCounter)clearContent();});}else clearContent();});};}};}];/**/
var ngInitDirective=ngDirective({compile:function(){return{pre:function(scope,element,attrs){scope.$eval(attrs.ngInit);}}}});/**/
var ngNonBindableDirective=ngDirective({terminal:true,priority:1000});/*-->*/
var ngPluralizeDirective=['$locale','$interpolate',function($locale,$interpolate){var BRACE=/{}/g;return{restrict:'EA',link:function(scope,element,attr){var numberExp=attr.count,whenExp=element.attr(attr.$attr.when),offset=attr.offset||0,whens=scope.$eval(whenExp),whensExpFns={},startSymbol=$interpolate.startSymbol(),endSymbol=$interpolate.endSymbol();forEach(whens,function(expression,key){whensExpFns[key]=$interpolate(expression.replace(BRACE,startSymbol+numberExp+'-'+
offset+endSymbol));});scope.$watch(function ngPluralizeWatch(){var value=parseFloat(scope.$eval(numberExp));if(!isNaN(value)){if(!(value in whens))value=$locale.pluralCat(value-offset);return whensExpFns[value](scope,element,true);}else{return '';}},function ngPluralizeWatchAction(newVal){element.text(newVal);});}};}];/**/
var ngRepeatDirective=ngDirective({transclude:'element',priority:1000,terminal:true,compile:function(element,attr,linker){return function(scope,iterStartElement,attr){var expression=attr.ngRepeat;var match=expression.match(/^\s*(.+)\s+in\s+(.*)\s*$/),lhs,rhs,valueIdent,keyIdent;if(!match){throw Error("Expected ngRepeat in form of '_item_ in _collection_' but got '"+
expression+"'.");}
lhs=match[1];rhs=match[2];match=lhs.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);if(!match){throw Error("'item' in 'item in collection' should be identifier or (key, value) but got '"+
lhs+"'.");}
valueIdent=match[3]||match[1];keyIdent=match[2];var lastOrder=new HashQueueMap();scope.$watch(function ngRepeatWatch(scope){var index,length,collection=scope.$eval(rhs),cursor=iterStartElement,nextOrder=new HashQueueMap(),arrayBound,childScope,key,value,array,last;if(!isArray(collection)){array=[];for(key in collection){if(collection.hasOwnProperty(key)&&key.charAt(0)!='$'){array.push(key);}}
array.sort();}else{array=collection||[];}
arrayBound=array.length-1;for(index=0,length=array.length;index<length;index++){key=(collection===array)?index:array[index];value=collection[key];last=lastOrder.shift(value);if(last){childScope=last.scope;nextOrder.push(value,last);if(index===last.index){cursor=last.element;}else{last.index=index;cursor.after(last.element);cursor=last.element;}}else{childScope=scope.$new();}
childScope[valueIdent]=value;if(keyIdent)childScope[keyIdent]=key;childScope.$index=index;childScope.$first=(index===0);childScope.$last=(index===arrayBound);childScope.$middle=!(childScope.$first||childScope.$last);if(!last){linker(childScope,function(clone){cursor.after(clone);last={scope:childScope,element:(cursor=clone),index:index};nextOrder.push(value,last);});}}
for(key in lastOrder){if(lastOrder.hasOwnProperty(key)){array=lastOrder[key];while(array.length){value=array.pop();value.element.remove();value.scope.$destroy();}}}
lastOrder=nextOrder;});};}});var ngShowDirective=ngDirective(function(scope,element,attr){scope.$watch(attr.ngShow,function ngShowWatchAction(value){element.css('display',toBoolean(value)?'':'none');});});/**/
//
var ngHideDirective=ngDirective(function(scope,element,attr){scope.$watch(attr.ngHide,function ngHideWatchAction(value){element.css('display',toBoolean(value)?'none':'');});});var ngStyleDirective=ngDirective(function(scope,element,attr){scope.$watch(attr.ngStyle,function ngStyleWatchAction(newStyles,oldStyles){if(oldStyles&&(newStyles!==oldStyles)){forEach(oldStyles,function(val,style){element.css(style,'');});}
if(newStyles)element.css(newStyles);},true);});/**/
var NG_SWITCH='ng-switch';var ngSwitchDirective=valueFn({restrict:'EA',require:'ngSwitch',controller:['$scope',function ngSwitchController(){this.cases={};}],link:function(scope,element,attr,ctrl){var watchExpr =attr.ngSwitch||attr.on,selectedTransclude,selectedElement,selectedScope;scope.$watch(watchExpr,function ngSwitchWatchAction(value){if(selectedElement){selectedScope.$destroy();selectedElement.remove();selectedElement=selectedScope=null;}
if((selectedTransclude=ctrl.cases['!'+value]||ctrl.cases['?'])){scope.$eval(attr.change);selectedScope=scope.$new();selectedTransclude(selectedScope,function(caseElement){selectedElement=caseElement;element.append(caseElement);});}});}});var ngSwitchWhenDirective=ngDirective({transclude:'element',priority:500,require:'^ngSwitch',compile:function(element,attrs,transclude){return function(scope,element,attr,ctrl){ctrl.cases['!'+attrs.ngSwitchWhen]=transclude;};}});var ngSwitchDefaultDirective=ngDirective({transclude:'element',priority:500,require:'^ngSwitch',compile:function(element,attrs,transclude){return function(scope,element,attr,ctrl){ctrl.cases['?']=transclude;};}});/**/
var ngTranscludeDirective=ngDirective({controller:['$transclude','$element',function($transclude,$element){$transclude(function(clone){$element.append(clone);});}]});/**/
var ngViewDirective=['$http','$templateCache','$route','$anchorScroll','$compile','$controller',function($http,$templateCache,$route,$anchorScroll,$compile,$controller){return{restrict:'ECA',terminal:true,link:function(scope,element,attr){var lastScope,onloadExp=attr.onload||'';scope.$on('$routeChangeSuccess',update);update();function destroyLastScope(){if(lastScope){lastScope.$destroy();lastScope=null;}}
function clearContent(){element.html('');destroyLastScope();}
function update(){var locals=$route.current&&$route.current.locals, template=locals&&locals.$template;if(template){element.html(template);destroyLastScope();var link=$compile(element.contents()),current=$route.current,controller;lastScope=current.scope=scope.$new();if(current.controller){locals.$scope=lastScope;controller=$controller(current.controller,locals);element.children().data('$ngControllerController',controller);}
link(lastScope);lastScope.$emit('$viewContentLoaded');lastScope.$eval(onloadExp);$anchorScroll();}else{clearContent();}}}};}];var scriptDirective=['$templateCache',function($templateCache){return{restrict:'E',terminal:true,compile:function(element,attr){if(attr.type=='text/ng-template'){var templateUrl=attr.id,//
text=element[0].text;$templateCache.put(templateUrl,text);}}};}];/**/
var ngOptionsDirective=valueFn({terminal:true});var selectDirective=['$compile','$parse',function($compile,$parse){var NG_OPTIONS_REGEXP=/^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w\d]*)|(?:\(\s*([\$\w][\$\w\d]*)\s*,\s*([\$\w][\$\w\d]*)\s*\)))\s+in\s+(.*)$/,nullModelCtrl={$setViewValue:noop};return{restrict:'E',require:['select','?ngModel'],controller:['$element','$scope','$attrs',function($element,$scope,$attrs){var self=this,optionsMap={},ngModelCtrl=nullModelCtrl,nullOption,unknownOption;self.databound=$attrs.ngModel;self.init=function(ngModelCtrl_,nullOption_,unknownOption_){ngModelCtrl=ngModelCtrl_;nullOption=nullOption_;unknownOption=unknownOption_;}
self.addOption=function(value){optionsMap[value]=true;if(ngModelCtrl.$viewValue==value){$element.val(value);if(unknownOption.parent())unknownOption.remove();}};self.removeOption=function(value){if(this.hasOption(value)){delete optionsMap[value];if(ngModelCtrl.$viewValue==value){this.renderUnknownOption(value);}}};self.renderUnknownOption=function(val){var unknownVal='? '+hashKey(val)+' ?';unknownOption.val(unknownVal);$element.prepend(unknownOption);$element.val(unknownVal);unknownOption.prop('selected',true);}
self.hasOption=function(value){return optionsMap.hasOwnProperty(value);}
$scope.$on('$destroy',function(){self.renderUnknownOption=noop;});}],link:function(scope,element,attr,ctrls){if(!ctrls[1])return;var selectCtrl=ctrls[0],ngModelCtrl=ctrls[1],multiple=attr.multiple,optionsExp=attr.ngOptions,nullOption=false,emptyOption,optionTemplate=jqLite(document.createElement('option')),optGroupTemplate=jqLite(document.createElement('optgroup')),unknownOption=optionTemplate.clone();for(var i=0,children=element.children(),ii=children.length;i<ii;i++){if(children[i].value==''){emptyOption=nullOption=children.eq(i);break;}}
selectCtrl.init(ngModelCtrl,nullOption,unknownOption);if(multiple&&(attr.required||attr.ngRequired)){var requiredValidator=function(value){ngModelCtrl.$setValidity('required',!attr.required||(value&&value.length));return value;};ngModelCtrl.$parsers.push(requiredValidator);ngModelCtrl.$formatters.unshift(requiredValidator);attr.$observe('required',function(){requiredValidator(ngModelCtrl.$viewValue);});}
if(optionsExp)Options(scope,element,ngModelCtrl);else if(multiple)Multiple(scope,element,ngModelCtrl);else Single(scope,element,ngModelCtrl,selectCtrl);function Single(scope,selectElement,ngModelCtrl,selectCtrl){ngModelCtrl.$render=function(){var viewValue=ngModelCtrl.$viewValue;if(selectCtrl.hasOption(viewValue)){if(unknownOption.parent())unknownOption.remove();selectElement.val(viewValue);if(viewValue==='')emptyOption.prop('selected',true);}else{if(isUndefined(viewValue)&&emptyOption){selectElement.val('');}else{selectCtrl.renderUnknownOption(viewValue);}}};selectElement.bind('change',function(){scope.$apply(function(){if(unknownOption.parent())unknownOption.remove();ngModelCtrl.$setViewValue(selectElement.val());});});}
function Multiple(scope,selectElement,ctrl){var lastView;ctrl.$render=function(){var items=new HashMap(ctrl.$viewValue);forEach(selectElement.find('option'),function(option){option.selected=isDefined(items.get(option.value));});};//
scope.$watch(function selectMultipleWatch(){if(!equals(lastView,ctrl.$viewValue)){lastView=copy(ctrl.$viewValue);ctrl.$render();}});selectElement.bind('change',function(){scope.$apply(function(){var array=[];forEach(selectElement.find('option'),function(option){if(option.selected){array.push(option.value);}});ctrl.$setViewValue(array);});});}
function Options(scope,selectElement,ctrl){var match;if(!(match=optionsExp.match(NG_OPTIONS_REGEXP))){throw Error("Expected ngOptions in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_'"+
" but got '"+optionsExp+"'.");}
var displayFn=$parse(match[2]||match[1]),valueName=match[4]||match[6],keyName=match[5],groupByFn=$parse(match[3]||''),valueFn=$parse(match[2]?match[1]:valueName),valuesFn=$parse(match[7]),optionGroupsCache=[[{element:selectElement,label:''}]];if(nullOption){$compile(nullOption)(scope);nullOption.removeClass('ng-scope');//
nullOption.remove();}
selectElement.html('');selectElement.bind('change',function(){scope.$apply(function(){var optionGroup,collection=valuesFn(scope)||[],locals={},key,value,optionElement,index,groupIndex,length,groupLength;if(multiple){value=[];for(groupIndex=0,groupLength=optionGroupsCache.length;groupIndex<groupLength;groupIndex++){optionGroup=optionGroupsCache[groupIndex];for(index=1,length=optionGroup.length;index<length;index++){if((optionElement=optionGroup[index].element)[0].selected){key=optionElement.val();if(keyName)locals[keyName]=key;locals[valueName]=collection[key];value.push(valueFn(scope,locals));}}}}else{key=selectElement.val();if(key=='?'){value=undefined;}else if(key==''){value=null;}else{locals[valueName]=collection[key];if(keyName)locals[keyName]=key;value=valueFn(scope,locals);}}
ctrl.$setViewValue(value);});});ctrl.$render=render;scope.$watch(render);function render(){var optionGroups={'':[]},optionGroupNames=[''],optionGroupName,optionGroup,option,existingParent,existingOptions,existingOption,modelValue=ctrl.$modelValue,values=valuesFn(scope)||[],keys=keyName?sortedKeys(values):values,groupLength,length,groupIndex,index,locals={},selected,selectedSet=false,lastElement,element,label;if(multiple){selectedSet=new HashMap(modelValue);}
for(index=0;length=keys.length,index<length;index++){locals[valueName]=values[keyName?locals[keyName]=keys[index]:index];optionGroupName=groupByFn(scope,locals)||'';if(!(optionGroup=optionGroups[optionGroupName])){optionGroup=optionGroups[optionGroupName]=[];optionGroupNames.push(optionGroupName);}
if(multiple){selected=selectedSet.remove(valueFn(scope,locals))!=undefined;}else{selected=modelValue===valueFn(scope,locals);selectedSet=selectedSet||selected;}
label=displayFn(scope,locals);label=label===undefined?'':label;optionGroup.push({id:keyName?keys[index]:index,label:label,selected:selected});}
if(!multiple){if(nullOption||modelValue===null){optionGroups[''].unshift({id:'',label:'',selected:!selectedSet});}else if(!selectedSet){optionGroups[''].unshift({id:'?',label:'',selected:true});}}
for(groupIndex=0,groupLength=optionGroupNames.length;groupIndex<groupLength;groupIndex++){optionGroupName=optionGroupNames[groupIndex];optionGroup=optionGroups[optionGroupName];if(optionGroupsCache.length<=groupIndex){existingParent={element:optGroupTemplate.clone().attr('label',optionGroupName),label:optionGroup.label};existingOptions=[existingParent];optionGroupsCache.push(existingOptions);selectElement.append(existingParent.element);}else{existingOptions=optionGroupsCache[groupIndex];existingParent=existingOptions[0];if(existingParent.label!=optionGroupName){existingParent.element.attr('label',existingParent.label=optionGroupName);}}
lastElement=null;for(index=0,length=optionGroup.length;index<length;index++){option=optionGroup[index];if((existingOption=existingOptions[index+1])){lastElement=existingOption.element;if(existingOption.label!==option.label){lastElement.text(existingOption.label=option.label);}
if(existingOption.id!==option.id){lastElement.val(existingOption.id=option.id);}
if(lastElement[0].selected!==option.selected){lastElement.prop('selected',(existingOption.selected=option.selected));}}else{if(option.id===''&&nullOption){element=nullOption;}else{(element=optionTemplate.clone())
.val(option.id)
.attr('selected',option.selected)
.text(option.label);}
existingOptions.push(existingOption={element:element,label:option.label,id:option.id,selected:option.selected});if(lastElement){lastElement.after(element);}else{existingParent.element.append(element);}
lastElement=element;}}
index++;while(existingOptions.length>index){existingOptions.pop().element.remove();}}
while(optionGroupsCache.length>groupIndex){optionGroupsCache.pop()[0].element.remove();}}}}}}];var optionDirective=['$interpolate',function($interpolate){var nullSelectCtrl={addOption:noop,removeOption:noop};return{restrict:'E',priority:100,compile:function(element,attr){if(isUndefined(attr.value)){var interpolateFn=$interpolate(element.text(),true);if(!interpolateFn){attr.$set('value',element.text());}}
return function(scope,element,attr){var selectCtrlName='$selectController',parent=element.parent(),selectCtrl=parent.data(selectCtrlName)||parent.parent().data(selectCtrlName);if(selectCtrl&&selectCtrl.databound){element.prop('selected',false);}else{selectCtrl=nullSelectCtrl;}
if(interpolateFn){scope.$watch(interpolateFn,function interpolateWatchAction(newVal,oldVal){attr.$set('value',newVal);if(newVal!==oldVal)selectCtrl.removeOption(oldVal);selectCtrl.addOption(newVal);});}else{selectCtrl.addOption(attr.value);}
element.bind('$destroy',function(){selectCtrl.removeOption(attr.value);});};}}}];var styleDirective=valueFn({restrict:'E',terminal:true});bindJQuery();publishExternalAPI(angular);jqLite(document).ready(function(){angularInit(document,bootstrap);});})(window,document);angular.element(document).find('head').append('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak{display:none;}ng\\:form{display:block;}</style>');