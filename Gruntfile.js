/*global module:false*/
module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '// <%= pkg.name %> v<%= pkg.version %> - <%= pkg.description %>\n' +
            '// Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> - <%= pkg.homepage %>\n' +
            '// License: <%= pkg.license %>\n\n',
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
                    '<%= meta.output %>' : ['src/include/wrapper.js']
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
                    'dist/jQuery.headroom.min.js': 'src/jQuery.headroom.js'
                }
            }
        },

        jshint: {
            options: {
                jshintrc : '.jshintrc'
            },
            prebuild : [
                'Gruntfile.js',
                'src/*.js'
            ],
            postbuild : [
                '<%= meta.output %>'
            ]
        },

        watch: {
            files: ['<%= jshint.prebuild %>', 'package.json'],
            tasks: 'default'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-rigger');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', ['jshint:prebuild']);
    grunt.registerTask('default', ['test', 'rig', 'jshint:postbuild', 'uglify']);
};