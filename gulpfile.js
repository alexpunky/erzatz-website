/**
 * Created by alex on 18/04/2015.
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var concat = require('gulp-concat');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var del = require('del');

gulp.task('default', function() {

});

gulp.task('clean', function (cb) {
    del([
        'build'
        // we don't want to clean this file though so we negate the pattern
        //'!dist/mobile/deploy.json'
    ], cb);
});


gulp.task('copy', function() {
    return gulp.src('src/assets/**/*').pipe(gulp.dest('build/assets'));
});

gulp.task('styles', function() {
    gulp.src('src/assets/css/*.scss').pipe(sass()).pipe(gulp.dest('src/assets/css'));
});

gulp.task('scripts', function() {
    gulp.src('src/**/*.js')
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('.'))
        .pipe(uglify())
        .pipe(gulp.dest('.'))
});

gulp.task('usemin', function () {
    return gulp.src('src/index.html')
        .pipe(usemin({
            css: [minifyCss(), 'concat'],
            html: [minifyHtml({empty: true})],
            js: [uglify(), rev()]
        }))
        .pipe(gulp.dest('build/'));
});

gulp.task('usemin_pathfinder', function () {
    return gulp.src('src/pathfinder.html')
        .pipe(usemin({
            css: [minifyCss(), 'concat'],
            html: [minifyHtml({empty: true})],
            js: [uglify(), rev()]
        }))
        .pipe(gulp.dest('build/'));
});



/*gulp.task('automate', function() {
   gulp.watch('*.scss', ['styles']);
});*/

gulp.task('default', ['styles', 'usemin', 'copy']);
gulp.task('pathfinder', ['styles', 'usemin_pathfinder', 'copy']);