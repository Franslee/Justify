module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/**\n * <%= pkg.name %> <%= pkg.version %> \n * <%= pkg.author %> \n * https://github.com/Franslee/Justify \n * <%= grunt.template.today("yyyy-mm-dd") %> \n */\n'
      },
      build: {
        src: 'src/justify.js',
        dest: 'dist/justify.min.js'
      }
    },
    autoprefixer: {
        options: {
          browsers: ['last 4 versions', '> 5%' ,'android 2.3','ios 6']
        },
        single_file: {
          options: {
            // Target-specific options go here.
          },
          src: 'src/justify.css',
          dest: 'dist/justify.css'
        }
      },
    clean: ['dist/*'],
    copy: {
      main: {
        expand: true,
        cwd: 'src/',
        src: '**',
        dest: 'dist/',
      }
    },
    jshint: {
      all: ['dist/**/*.js']
    }
  });

  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');


  // 默认被执行的任务列表。
  grunt.registerTask('cl', ['clean']);
  grunt.registerTask('cp', ['copy']);
  grunt.registerTask('ug', ['uglify']);
  grunt.registerTask('at', ['autoprefixer']);
  grunt.registerTask('default', ['clean','copy','uglify','autoprefixer']);

};