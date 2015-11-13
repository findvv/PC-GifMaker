var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    LessPluginCleanCSS = require('less-plugin-clean-css'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    connect = require('gulp-connect'),
    port = process.env.port || 5000,
    browserify = require('gulp-browserify'),
    uglyfly = require('gulp-uglyfly'),
    cleancss = new LessPluginCleanCSS({
      advanced: true
    }),
    autoprefix = new LessPluginAutoPrefix({
      browsers: ["ie >= 8", "ie_mob >= 10", "ff >= 26", "chrome >= 30", "safari >= 6", "opera >= 23", "ios >= 5", "android >= 2.3", "bb >= 10"]
    });


//  less-->>css
gulp.task('less', function() {
  gulp.src('./app/less/*.less')
    .pipe(less({
      plugins: [autoprefix, cleancss],
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('./public/css'));
});


//  web-->>http://localhost:5000
gulp.task('connect',function(){
  connect.server({
    // root:'./',
    port: port,
    livereload: true,
  })
})


//  livereload-->>html,css,js
gulp.task('js',function(){
  gulp.src('./app/js/main.js')
})
gulp.task('html',function(){
  gulp.src('./index.html')
  .pipe( connect.reload() )
});
gulp.task('css',function(){
  gulp.src('./public/css/*.css')
  .pipe( connect.reload() )
});


//  browserify and compress
gulp.task('browserify',function(){
  gulp.src('./app/js/main.js')
  .pipe(browserify({
    transform: 'reactify',
  }))
  .pipe(uglyfly())
  .pipe(gulp.dest('./public/js/'))
  .pipe( connect.reload() )
});

gulp.task('browserifyCompress',function(){
  gulp.src('./app/js/main.js')
  .pipe(browserify({
    transform: 'reactify',
  }))
  .pipe(uglyfly())
  .pipe(gulp.dest('./public/js/'));
});

//  js-->>compress

gulp.task('watch', function() {
  gulp.watch('./app/less/*.less', ['less']);
  gulp.watch('./app/js/*.js',['js']);
  gulp.watch('./index.html',['html']);
  gulp.watch('./public/css/*.css',['css']);
  gulp.watch('./app/js/**/*.js',['browserify']);
});

gulp.task('default', ['less','browserifyCompress']);
gulp.task('serve',['less','browserify','connect','watch']);

