'use strict';

var gulp = require('gulp')  
  , del = require('del')
  , concat = require('gulp-concat')
  , cleanCss = require('gulp-clean-css')
  , rev = require('gulp-rev')
  , inject = require('gulp-inject')
  , replace = require('gulp-replace')
  , rename = require('gulp-rename');



gulp.task('clean', function(){
  return del(['./css/*.min.css']);
})

gulp.task('styles', ['clean'], function(){
  return gulp.src(['./css/*.css', '!./css/*.min.css'])
       .pipe(concat('app.min.css'))
       .pipe(cleanCss())
       .pipe(rev())
       .pipe(gulp.dest('./css'))
});

gulp.task('inject-css', ['styles'], function(){
   var target = gulp.src('./template/gulp.ejs')
     , source = gulp.src(['./css/*.min.css'], { read:false })

   return target.pipe(inject(source))
                .pipe(gulp.dest('./template'))
});

gulp.task('template', ['inject-css'], function(){
  return gulp.src('./template/gulp.ejs')
             .pipe(replace('<!-- inject:css -->',''))
             .pipe(replace('<!-- endinject  -->', '')) 
             .pipe(rename('index.ejs'))
             .pipe(gulp.dest('./template'))
})



gulp.task('default', ['template']);
