///*global module:false*/
module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

    less : {
      dev : {
        src : 'assets/styles/main.less',
        dest : 'assets/styles/main.css'
      },
      dist : {
        options :{
          yuicompress : true,
          report : 'gzip'
        },
        src : '<%= less.dev.src %>',
        dest : '<%= less.dev.dest %>'
      }
    },

    concat : {
      dist : {
        src : [
          'assets/scripts/vendor/prism.js',
          'assets/scripts/vendor/headroom.js',
          'assets/scripts/examples/CodeGenerator.js',
          'assets/scripts/examples/HeadroomExample.js',
          'assets/scripts/examples/example.js'
        ],
        dest : 'assets/scripts/main.js'
      }
    },

    uglify : {
      options : {
        report: 'gzip'
      },
      dist : {
        src: '<%= concat.dist.dest %>',
        dest: '<%= concat.dist.dest %>'
      }
    },

    jshint : {
      options : {
        jshintrc : '.jshintrc'
      },
      files : [
        'Gruntfile.js',
        'assets/scripts/examples/*.js'
      ]
    },

    watch : {
      styles : {
        files : 'assets/styles/**/*.less',
        tasks : 'less:dev'
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