var gulp = require('gulp'),
    log = require('gulp-util').log,
    path = require('path');
    sass = require('gulp-sass'),
    connect = require('gulp-connect');

var config = {
  watch: './src/**/*.*',
  server: {
    port: '8000',
    path: './dist'
  },
  html: {
    src: './src/index.html',
    destination: 'dist/'
  },
  css: {
    src: './src/styles/style.scss',
    destination: 'dist/css'
  },
  img: {
    src: './src/img/**',
    destination: 'dist/img'
  },
  js: {
    src: './src/js/**',
    destination: 'dist/js'
  }
};

var sassOpts = {
  outputStyle: 'nested',
  precision: 8,
  errLogToConsole: true
}

gulp.task("connect",function(){
  connect.server({
    port:config.server.port,
    livereload:true,
    root:config.server.path});
});

gulp.task('html', function () {
  gulp.src(config.html.src)
    .pipe(gulp.dest(config.html.destination))
    .pipe(connect.reload());
});

gulp.task('sass', function () {
  gulp.src(config.css.src)
    .pipe(sass(sassOpts))
    .pipe(gulp.dest(config.css.destination))
    .pipe(connect.reload());
});

gulp.task('images', function() {
  gulp.src(config.img.src)
    .pipe(gulp.dest(config.img.destination))
});

gulp.task('scripts', function () {
  gulp.src(config.js.src)
    .pipe(gulp.dest(config.js.destination))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  log('Watching file');
  gulp.watch(config.watch, ['build']);
});

gulp.task('build', ['html','sass','images','scripts']);
gulp.task('default',['build','connect','watch']);
