/*
 * Created by: Anderson Araujo (CoderN)
 * For my Works 
 */
module.exports = function(grunt) {

  //Configurações
  grunt.initConfig({

    less: {
      development: {
        options: {
          paths: ["src/css"]
        },
        files: {
          "src/css/style.css": "src/less/main.less"
        }
      }
    }, // less 
    /**
     * jade configure
     */
    jade: {
      compile: {
        options: {
          pretty: true,
          data: {
            debug: false
          }
        },
        files: {
          //"path/to/dest.html": ["path/to/templates/*.jade", "another/path/tmpl.jade"]
          "template/html/index.html": ["src/jade/*.jade"]
        }
      }
    },

    pkg: grunt.file.readJSON("package.json"),
    // Banner definições
    meta: {
      banner: "/*\n" +
        " *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
        " *  <%= pkg.description %>\n" +
        " *  <%= pkg.homepage %>\n" +
        " *\n" +
        " *  Made by <%= pkg.author.name %>\n" +
        " *  Under <%= pkg.license %> License\n" +
        " */\n"
    }, // Banner
    /**
     * Concat 
     */
    concat: {
      options: {
        banner: "<%= meta.banner %>"
      },
      dist: {
        src: ["src/js/main.js"],
        dest: "dist/script.js"
      }
    }, //Concat

    /**
     * JS Hint 
     */
    jshint: {
      files: ["src/js/*"],
      options: {
        jshintrc: ".jshintrc"
      }
    },

    /**
     * Minify JavaScript files.
     */
    uglify: {
      my_target: {
        files: {
          'src/js/main.min.js': ['src/js/main.js']
        },
        options: {
          banner: "<%= meta.banner %>"
        }
      }
    }, //uglify

    /*
     * To compile CoffeeScript files.
     */
    coffee: {
      compile: {
        expand: true,
        //cwd: 'assets/coffee',
        //src: ['**/*.coffee'],
        //dest: 'assets/js',
        ext: '.js',
        options: {
          bare: true,
          preserve_dirs: true
        },
        files: {
          'src/js/main.js': 'src/coffee/script.coffee' // 1:1 compile 
            /*'path/to/another.js': ['path/to/sources/*.coffee', 'path/to/more/*.coffee'] // compile and concat into single file */
        }
      },

      /*
      compileBare: {
        options: {
          bare: true
        },
        files: {
          'path/to/result.js': 'path/to/source.coffee', // 1:1 compile
          'path/to/another.js': ['path/to/sources/*.coffee', 'path/to/more/*.coffee'] // compile and concat into single file
        }
      },
      compileJoined: {
        options: {
          join: true
        },
        files: {
          'path/to/result.js': 'path/to/source.coffee', // 1:1 compile, identical output to join = false
          'path/to/another.js': ['path/to/sources/*.coffee', 'path/to/more/*.coffee'] // concat then compile into single file
        }
      },

      compileWithMaps: {
        options: {
          sourceMap: true
        },
        files: {
          'path/to/result.js': 'path/to/source.coffee', // 1:1 compile
          'path/to/another.js': ['path/to/sources/*.coffee', 'path/to/more/*.coffee'] // concat then compile into single file
        }
      },

      compileWithMapsDir: {
        options: {
          sourceMap: true,
          sourceMapDir: 'path/to/maps/' // source map files will be created here
        },
        files: {
          'path/to/result.js': 'path/to/source.coffee'
        }
      },

      glob_to_multiple: {
        expand: true,
        flatten: true,
        cwd: 'path/to',
        src: ['*.coffee'],
        dest: 'path/to/dest/',
        ext: '.js'
      }
      */
    }, //CoffeeScript

    watch: {
      dist: {
        files: [
          //caminhos a serem observados
          'src/jade/*',
          'src/less/*',
          'src/coffee/*',
          'src/js/*'
        ],
        //tarefas para serem executadas quando houver uma alteração.
        //tasks: ['less', 'compile', 'uglify']
        tasks: ['jade', 'less', 'compile', 'uglify']
      }
    } //watch

  });

  //Plugins do grunt (tarefas que ele faz.) 
  grunt.loadNpmTasks('grunt-contrib-coffee'); //compila arquivos CoffeeScript
  grunt.loadNpmTasks('grunt-contrib-uglify'); //compila os arquivos JavaScript e minifica eles
  grunt.loadNpmTasks("grunt-contrib-jshint"); // exibe os erros de código JavaScript
  grunt.loadNpmTasks("grunt-contrib-concat"); // monta os banners sobre o desenvolvedor, concatena todo os arquivos JavaScript em um
  grunt.loadNpmTasks('grunt-contrib-less'); // Compilar Less para CSS
  grunt.loadNpmTasks('grunt-contrib-watch'); // observar alterações nos arquivos e executar uma determinada tarefa.
  grunt.loadNpmTasks('grunt-contrib-jade'); // compila jade para HTML

  //Tarefas por padrão que serão executadas quando chamar o grunt
  grunt.registerTask('default', ['less', 'compile', 'uglify'], function() {
    grunt.log.ok("Executando tarefas padrão.");
  });

  grunt.registerTask('w', ['watch']);
  grunt.registerTask('compile', ['coffee']);
  grunt.registerTask('ugli', ['uglify']);
  grunt.registerTask('conca', ['concat']);
  grunt.registerTask('hint', ['jshint']);
  grunt.registerTask('jd', ['jade']);
}