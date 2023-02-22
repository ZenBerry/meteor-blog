module.exports = function(grunt) {
  grunt.initConfig({
    coffee: {
      options: {
        sourceMap: true
      },
      all: {
        files: grunt.file.expandMapping(['**/*.coffee'], '', {
          cwd: '.',
          rename: function(destBase, destPath) {
            return destBase + destPath.replace(/\.coffee$/, '.js');
          }
        })
      }
    },
    watch: {
      coffee: {
        files: ['**/*.coffee'],
        tasks: ['coffee:all']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['coffee', 'watch']);
};
