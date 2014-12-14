module.exports = function(grunt) {
var mozjpeg = require('imagemin-mozjpeg');

//grunt.loadNpmTasks('grunt-aws-s3');
grunt.loadNpmTasks('grunt-compass'); 
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-qunit');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-nunjucks');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-htmlmin');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-imagemin');


grunt.initConfig({
pkg: grunt.file.readJSON('package.json'),
// s3settings: grunt.file.readJSON('s3settings.json'),

// aws_s3: {
//   options: {
//     accessKeyId: '<%= s3settings.key %>', // Use the variables
//     secretAccessKey: '<%= s3settings.secret %>', // You can also use env variables
//     region: '<%= s3settings.region %>',
//     uploadConcurrency: 5, // 5 simultaneous uploads
//     downloadConcurrency: 5 // 5 simultaneous downloads
//   },
//   live: {
//     options: {
//       bucket: '<%= s3settings.bucket %>',
//       differential: false ,// Only uploads the files that have changed
//       debug: false,
// /**      params: {
//         ContentEncoding: 'gzip', // applies to all the files!
//         CacheControl: 'max-age=290304000, public',
//       }**/
//     },
//     files: [
//       {expand: true, cwd: 'src/', src: ['**'], dest: ''},
//     ]
//   },
//   download: {
//     options: {
//       bucket: '<%= s3settings.bucket %>',
//     },
//     files: [
//       {dest: '/', cwd: 'backup/', action: 'download'},
//     ]
//   }
// },
copy: {
  main: {
    files: [
      // includes files within path
      {expand: false, src: ['*.css'], dest: 'src/css/', filter: 'isFile'}
    ]
  }
},
// compass: {
//   dist: {
//     options: {
//       sassDir: 'src/sass',
//       cssDir: 'src/css'
//     }
//   }
// },
imagemin: {                          // Task
  dynamic: {                         // Another target
    files: [{
      expand: true,                  // Enable dynamic expansion
      cwd: 'src/img/',                   // Src matches are relative to this path
      src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
      dest: 'deploy/img/'                  // Destination path prefix
    }]
  }
},
concat: {
  options: {
    separator: ';'
  },
  dist: {
    src: ['src/js/scroll.js','src/js/map.js'],
    dest: 'deploy/js/script.js'
  }
},
cssmin: {
  combine: {
    files: {
      'src/css/style.css': ['deploy/css/style.css']
    }
  }
},
htmlmin: {                                     // Task
  dist: {                                      // Target
    options: {                                 // Target options
      removeComments: true,
      collapseWhitespace: true
    },
    files: {                                   // Dictionary of files
      'src/index.html': 'delpoy/index.html',     // 'destination': 'source'
      'src/services.html': 'deploy/services.html',     // 'destination': 'source'
      'src/contact.html': 'delpoy/contact.html',     // 'destination': 'source'
      'src/about.html': 'delpoy/contact.html',     // 'destination': 'source'
      'src/404.html': 'deploy/404.html',     // 'destination': 'source'
    }
  }
},
 uglify: {
    my_target: {
      files: {
        'src/js/script.js': ['deploy/js/script.js']
      }
    }
  },
jshint: {
  files: ['Gruntfile.js', 'src/**/*.js'],
  options: {
    // options here to override JSHint defaults
    globals: {
      jQuery: true,
      console: true,
      module: true,
      document: true
    }
  }
},
watch: {
  css: {
    files: '**/*.scss',
    tasks: ['compass']
  },
  jshint: {
    files: ['<%= jshint.files %>'],
    tasks: ['jshint']
  }
}

});

// grunt.registerTask('deploy', ['aws_s3:live']);
// grunt.registerTask('download', ['aws_s3:download']);
grunt.registerTask('default', ['concat', 'uglify','cssmin', 'htmlmin']);

};