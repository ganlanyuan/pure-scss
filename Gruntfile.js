var path = require('path');

module.exports = function (grunt) {

// -- Config -------------------------------------------------------------------

grunt.initConfig({

    pkg  : grunt.file.readJSON('package.json'),
    bower: grunt.file.readJSON('bower.json'),

    // -- Clean Config ---------------------------------------------------------

    clean: {
        build    : ['build/'],
        build_res: ['build/*-r.css'],
        release  : ['release/<%= pkg.version %>/']
    },

    // -- CSSLint Config -------------------------------------------------------

    csslint: {
        options: {
            csslintrc: '.csslintrc'
        },

        base   : ['src/base/css/*.scss'],
        buttons: ['src/buttons/css/*.scss'],
        forms  : ['src/forms/css/*.scss'],
        grids  : ['src/grids/css/*.scss'],
        menus  : ['src/menus/css/*.scss'],
        tables : ['src/tables/css/*.scss']
    },

    sass: {
        responsive: {
            files: {
                'build/pure.css': 'src/pure.scss'
            },
            options: {
                outputStyle: 'nested'
            }

        },
        nonresponsive: {
            files: {
                'build/pure-nr.css': 'src/pure-nr.scss'
            },
            options: {
                outputStyle: 'nested'
            }

        },
        'responsive-min': {
            files: {
                'build/pure-min.css': 'src/pure.scss'
            },
            options: {
                outputStyle: 'compressed'
            }

        },
        'nonresponsive-min': {
            files: {
                'build/pure-nr-min.css': 'src/pure-nr.scss'
            },
            options: {
                outputStyle: 'compressed'
            }

        },
        test: {
            files: {
                'build/buttons.css': 'src/buttons/scss/buttons.scss',
                'build/forms.css': 'src/forms/scss/forms.scss',
                'build/grids.css': 'src/grids/scss/grids.scss',
                'build/menus.css': 'src/menus/scss/menus.scss',
                'build/tables.css': 'src/tables/scss/tables.scss'
            },
            options: {
                outputStyle: 'nested'
            }
        }
    },

    compress: {
        release: {
            options: {
                archive: 'release/<%= pkg.version %>/<%= pkg.name %>-<%= pkg.version %>.zip'
            },

            expand : true,
            flatten: true,
            dest : '<%= pkg.name %>/<%= pkg.version %>/',

            src: [
                '{bower.json,LICENSE.md,README.md,HISTORY.md}',
                'build/*.css'
            ]
        }
    },

    // -- License Config -------------------------------------------------------

    license: {
        normalize: {
            options: {
                banner: [
                    '/*!',
                    'normalize.css v<%= bower.devDependencies["normalize-css"] %> | MIT License | git.io/normalize',
                    'Copyright (c) Nicolas Gallagher and Jonathan Neal',
                    '*/\n'
                ].join('\n')
            },

            expand: true,
            cwd   : 'build/',
            src   : ['base*.css', '<%= pkg.name %>*.css']
        },

        yahoo: {
            options: {
                banner: [
                    '/*!',
                    'Pure v<%= pkg.version %>',
                    'Copyright 2013 Yahoo! Inc. All rights reserved.',
                    'SASS/SCSS version by Igor Rzegocki',
                    'Licensed under the BSD License.',
                    'https://github.com/ajgon/pure-scss/blob/master/LICENSE.md',
                    '*/\n'
                ].join('\n')
            },

            expand: true,
            src   : ['build/*.css']
        }
    }

});

// -- Main Tasks ---------------------------------------------------------------

// npm tasks.
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-csslint');
grunt.loadNpmTasks('grunt-contrib-compress');
grunt.loadNpmTasks('grunt-sass');

// Local tasks.
grunt.loadTasks('tasks/');

grunt.registerTask('default', ['import', 'test', 'build']);
grunt.registerTask('import', ['bower_install']);
grunt.registerTask('test', ['csslint']);
grunt.registerTask('sass-build', ['sass:responsive', 'sass:nonresponsive', 'sass:responsive-min', 'sass:nonresponsive-min']);
grunt.registerTask('build', ['clean:build', 'sass-build', 'license']);

grunt.registerTask('release', [
    'default',
    'clean:release',
    'compress:release'
]);

};
