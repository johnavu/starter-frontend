'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');        // Compress js
var uglifycss = require('gulp-uglifycss');  // Compress css

 /*************************************************************/
gulp.task('sass', function () {
  return gulp.src('./asset/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./asset/sass/**/*.scss', ['sass']);
});
/*************************************************************/

var vendorJs = [
        './bower/jquery/dist/jquery.js',
        './bower/bootstrap/dist/js/bootstrap.js'
    ];
gulp.task('vendorJs', function() {
  return gulp.src(vendorJs)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('vendor.js'))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest('./public/js/'));
});

var vendorCss = [
        './bower/bootstrap/dist/css/bootstrap.css'
    ];
gulp.task('vendorCss', function() {
  return gulp.src(vendorCss)
    .pipe(sourcemaps.init())
    .pipe(uglifycss())
    .pipe(concat('vendor.css'))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest('./public/css/'));
});

var vendorAsset = [
      './bower/bootstrap/dist/fonts/*'
    ];

gulp.task('vendorAsset', function(){
  return gulp.src(vendorAsset)
  .pipe(gulp.dest('./public/fonts/'));
});

gulp.task('build', ['vendorJs', 'vendorCss', 'vendorAsset'], function(){});

/*************************************************************/