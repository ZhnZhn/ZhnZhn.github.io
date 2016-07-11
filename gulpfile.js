'use strict';

var gulp = require('gulp')
  , concat = require('gulp-concat')
  , cleanCss = require('gulp-clean-css');

gulp.task('styles', function(){
  return gulp.src(['css/*.css', '!css/app.css'])
       .pipe(concat('app.css'))
       .pipe(cleanCss())
       .pipe(gulp.dest('./css'))
});

gulp.task('default', ['styles']);
