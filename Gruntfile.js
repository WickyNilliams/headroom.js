/*global module:false*/
module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        less : {
            all : {
                options :{
                    yuicompress : true,
                    report : 'gzip'
                },
                files : {
                    'assets/styles/main.css' : 'assets/styles/main.less'
                }
            }
        },

        watch : {
            files : 'assets/styles/headroom/*.less',
            tasks : 'less'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less']);
};