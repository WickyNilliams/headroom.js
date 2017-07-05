/*global module:false*/
module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner : '/*!\n' +
      ' * <%= pkg.name %> v<%= pkg.version %> - <%= pkg.description %>\n' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> - <%= pkg.homepage %>\n' +
      ' * License: <%= pkg.license %>\n' +
      ' */\n\n',
      outputDir: 'dist',
      output : '<%= meta.outputDir %>/<%= pkg.name %>',
      outputMin : '<%= meta.outputDir %>/<%= pkg.name.replace("js", "min.js") %>'
    },

    rig: {
      options : {
        banner : '<%= meta.banner %>'
      },
      dist: {
        files: {
          '<%= meta.output %>' : ['src/include/wrapper.js'],
          'dist/jQuery.headroom.js' : ['src/jQuery.headroom.js'],
          'dist/angular.headroom.js' : ['src/angular.headroom.js']
        }
      }
    },

    uglify: {
      options : {
        banner : '<%= meta.banner %>',
        report: 'gzip'
      },
      dist: {
        files : {
          '<%= meta.outputMin %>'  : '<%= meta.output %>',
          'dist/jQuery.headroom.min.js': 'dist/jQuery.headroom.js',
          'dist/angular.headroom.min.js': 'dist/angular.headroom.js'
        }
      }
    },

    jshint: {
      prebuild : {
        options : {
          jshintrc : '.jshintrc'
        },
        files : {
          src : [
            'Gruntfile.js',
            'src/*.js'
          ]
        }
      },
      tests : {
        options : grunt.util._.merge(
          grunt.file.readJSON('.jshintrc'),
          grunt.file.readJSON('spec/.jshintrc')),
        files : {
          src : ['spec/*.js']
        }
      }
    },

    karma : {
      options : {
        frameworks : ['jasmine'],
        browsers : ['PhantomJS', 'Chrome', 'Opera', 'Safari', 'Firefox'],
        files : [
          'spec/helpers/polyfill.js', // PhantomJS needs Function.prototype.bind polyfill
          'src/*.js',
          'spec/*.js'
        ]
      },
      unit : {
        options : {
          background: true,
          reporters : 'dots'
        },
      },
      continuous : {
        options : {
          singleRun : true,
          browsers : ['PhantomJS']
        }
      }
    },

    watch: {
      options : {
        atBegin : true
      },
      files: [
        'src/*.js',
        'spec/*.js'
      ],
      tasks: ['prehint', 'karma:unit:run']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-rigger');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('prehint', ['jshint:prebuild', 'jshint:tests']);
  grunt.registerTask('ci', ['prehint', 'karma:continuous']);
  grunt.registerTask('dist', ['rig', 'uglify']);
  grunt.registerTask('test', ['karma:continuous']);
  grunt.registerTask('default', ['karma:unit:start', 'watch']);
};
