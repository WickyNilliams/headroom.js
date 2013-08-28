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
                    'dist/jQuery.headroom.js' : ['src/jQuery.headroom.js']
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
                    'dist/jQuery.headroom.min.js': 'dist/jQuery.headroom.js'
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
            },
            postbuild : {
              options : {
                jshintrc : '.jshintrc'
              },
              files :{
                src : ['<%= meta.output %>']
              }
            }
        },

         jasmine : {
            options : {
                specs : 'spec/*.js',
                vendor: 'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'
            },
            src : 'src/*.js'
        },

        watch: {
            files: [
              'src/*.js',
              'spec/*.js',
              'Gruntfile.js',
              'package.json'
            ],
            tasks: 'default'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-rigger');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', ['jshint:prebuild', 'jshint:tests', 'jasmine']);
    grunt.registerTask('default', ['test', 'rig', 'jshint:postbuild', 'uglify']);
};