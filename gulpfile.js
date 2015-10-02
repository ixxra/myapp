var gulp = require('gulp');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var browserify = require('browserify');

gulp.task('babelify', function() {
  browserify({ entries: 'src/js/main.js', debug: true })
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('lint', function() {
  return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('less', function() {
  return gulp.src('src/scss/*.less')
    .pipe(less({
      paths: [
        '.',
        './node_modules/bootstrap-less'
      ]
    }))
    .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('scripts', function () {
  return gulp.src('js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  //gulp.watch('src/js/*.js', ['lint', 'scripts']);
  gulp.watch('src/scss/*.less', ['less']);
});

gulp.task('default', ['lint', 'less', 'scripts', 'watch']);

/*

var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');

gulp.task('babelify', function() {
  browserify({ entries: './client.js', debug: true })
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./public/js/'));
});

*/
