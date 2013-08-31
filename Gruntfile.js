///*global module:false*/
module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    less : {
      main : {
        dest : 'assets/styles/main.css',
        src : 'assets/styles/main.less'
      },
      examples : {
        options :{
          yuicompress : true,
          report : 'gzip'
        },
        dest : 'assets/styles/examples/examples.css',
        src : [
          'assets/styles/examples/examples.less'
        ]
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
          //'assets/scripts/vendor/prism.js',
          'assets/scripts/vendor/headroom.js',
          'assets/scripts/examples/CodeGenerator.js',
          'assets/scripts/examples/HeadroomExample.js',
          'assets/scripts/examples/example.js'
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
        'assets/scripts/examples/*.js',
      ]
    },

    watch : {
      styles : {
        files : 'assets/styles/**/*.less',
        tasks : 'less'
      },
      scripts : {
        files : '<%= jshint.files %>',
        tasks : 'scripts'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('scripts', ['jshint', 'concat', 'uglify']);
  grunt.registerTask('default', ['less', 'scripts']);
};