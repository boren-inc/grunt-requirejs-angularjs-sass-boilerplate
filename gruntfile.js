module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            templates: {
                files: ['./public/partials/**/*.html', './public/templates/**/*.html'],
                tasks: ['ngtemplates']
            },
            scripts: {
                files: ['./public/js/**/*.js'],
                tasks: ['requirejs']
            },
            styles: {
                files: ['./public/css/**/*.scss'],
                tasks: ['sass']
            }
        },
        ngtemplates: {
            app: {
                cwd: './public',
                src: ['partials/**/*.html', 'templates/**/*.html'],
                dest: './public/js/templates.js',
                options: {
                    bootstrap:  function(module, script) {
                        return 'define([\'angular\', \'app\'], function(angular, app) { app.run([\'$templateCache\', function($templateCache) {' + script + '}]); });';
                    }
                },
                htmlmin: {
                    collapseBooleanAttributes:      true,
                    collapseWhitespace:             true,
                    removeAttributeQuotes:          true,
                    removeComments:                 true,
                    removeEmptyAttributes:          true,
                    removeRedundantAttributes:      true,
                    removeScriptTypeAttributes:     true,
                    removeStyleLinkTypeAttributes:  true
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    mainConfigFile: "./public/js/main.js",
                    optimize: "uglify",
                    name: "main",
                    out: "./public/js/main.min.js",
                    preserveLicenseComments: false
                }
            }
        },
        sass: {
            options: {
                style: 'compressed'
            },
            prod: {
                src: './public/css/style.scss',
                dest: './public/css/style.min.css'
            }
        },
        imagemin: {
            prod: {
                options: {
                    optimizationLevel: 7,
                    cache: false
                },
                files: [{
                    expand: true,
                    src: ['./public/img/**/*.{png,jpg,gif}'],
                    dest: '.'
                }]
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-angular-templates');

    // Production mode tasks
    grunt.registerTask('prod', ['sass', 'ngtemplates', 'requirejs', 'imagemin']);

    // Dev mode tasks
    grunt.registerTask('default', ['sass', 'ngtemplates', 'requirejs']);

};