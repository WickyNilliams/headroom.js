/*global module:false*/
module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    less : {
      main : {
        dest : 'assets/styles/main.css',
        src : 'assets/styles/main.less'
      },
      dist : {
        options :{
          yuicompress : true,
          report : 'gzip'
        },
        dest : 'assets/styles/main.min.css',
        src : '<%= less.main.dest %>'
      }
    },

    concat : {
      options : {

      },
      dist : {
        dest : 'assets/scripts/main.js',
        src : [
          'assets/scripts/vendor/prism.js',
          'assets/scripts/vendor/zepto.min.js',
          'assets/scripts/vendor/headroom.js',
          'assets/scripts/vendor/jQuery.headroom.js'
        ]
      }
    },

    uglify : {
      options : {
        report: 'gzip'
      },
      dist : {
        dest: 'assets/scripts/main.min.js',
        src: '<%= concat.dist.dest %>'
      }
    },

    jshint : {
      options : {
        jshintrc : '.jshintrc'
      },
      files : [
        'Gruntfile.js',
        'assets/scripts/*.js',
        '!assets/scripts/main*.js'
      ]
    },

    watch : {
      styles : {
        files : 'assets/styles/**/*.less',
        tasks : 'less'
      },
      scripts : {
        files : '<%= jshint.files %>',
        tasks : ['jshint', 'concat']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['less', 'jshint', 'concat', 'uglify']);
};