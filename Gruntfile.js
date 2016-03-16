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
          compress : true,
          report : 'gzip'
        },
        src : '<%= less.dev.src %>',
        dest : '<%= less.dev.dest %>'
      }
    },

    concat : {
      dist : {
        src : [
          'assets/scripts/vendor/*.js',
          'assets/scripts/examples/CodeGenerator.js',
          'assets/scripts/examples/Playground.js'
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

    connect: {
      server: {
        options : {
          port : 8001,
          open : true,
          debug : true
        }
      }
    },

    watch : {
      options : {
        atBegin : true
      },
      styles : {
        files : 'assets/styles/**/*.less',
        tasks : ['less:dev']
      },
      scripts : {
        files : ['assets/scripts/**/*.js', '!<%= concat.dist.dest %>'],
        tasks : ['jshint', 'concat']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['connect', 'watch']);
  grunt.registerTask('dist', ['less:dist', 'jshint', 'concat', 'uglify']);
};