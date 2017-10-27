// Gulp workflow from: https://www.sitepoint.com/simple-gulpy-workflow-sass/

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');

var input = './scss/**/*.scss';
var output = './dist/css';

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'compressed'
};

// Clean
gulp.task('clean', function() {
    return del('dist/**', {force:true})
        .then(paths => {
            console.log('Deleted files and folders:\n', paths.join('\n'))
        });
});

// Sass
gulp.task('sass', function() {
    return gulp
        .src(input)
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())
        .pipe(gulp.dest(output))
});

// Watch
gulp.task('watch', function() {
    return gulp 
        .watch(input, ['clean', 'sass'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        })
});

// Default
gulp.task('default', ['sass', 'watch']);