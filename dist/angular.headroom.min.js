/*!
 * headroom.js v0.5.0 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

!function(a){a&&a.module("headroom",[]).directive("headroom",function(){return{restrict:"EA",scope:{tolerance:"=",offset:"=",classes:"="},link:function(b,c){var d={};a.forEach(Headroom.options,function(a,c){d[c]=b[c]||Headroom.options[c]});var e=new Headroom(c[0],d);e.init(),b.$on("destroy",function(){e.destroy()})}}})}(window.angular);