var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

//Make CSS
gulp.task('styles', function() {
    gulp.src('scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'));
});

//Clean Folder
gulp.task('clean-dist', function () {
    gulp.src('dist/css', {read: false})
        .pipe(clean());
});

//Minify CSS
gulp.task('minify-css',function() {
    return gulp.src('./css/**/*.css')
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/css/'));
});

//just dist run task
gulp.task('dist',['styles', 'clean-dist', 'minify-css' ], function(e){} )

//Watch task
gulp.task('default',function() {
    gulp.watch('scss/**/*.scss',['styles', 'clean-dist', 'minify-css' ]);
});

