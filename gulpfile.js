var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var gulpif = require('gulp-if');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cache = require('gulp-cached');
var config = require('./gulpconfig.json');

gulp.task('connectDev', function() {
    return connect.server({
        root: 'src',
        port: 5000,
        livereload: true,
        middleware: function(connect) {
            return [connect().use('/bower_components', connect.static('bower_components'))];
        }
    });
});

gulp.task('connectDist', function() {
    return connect.server({
        root: 'public',
        port: 5001
    });
});

gulp.task('build:dist', function() {
    gulp.src(config.styles)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'IE 10', 'IE 11']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.css[0]));

    return gulp.src(config.html)
    .pipe(useref())
    .pipe(sourcemaps.init())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', cleanCSS()))
    .pipe(sourcemaps.write())    
    .pipe(gulp.dest('public'));
});

gulp.task('styles', function() {
    return gulp.src(config.styles)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'IE 10', 'IE 11']
    }))
    .pipe(sourcemaps.write())
    .pipe(cache('linting'))
    .pipe(gulp.dest(config.css[0]))
    .pipe(connect.reload());
});

gulp.task('components', function () {
    return gulp.src(config.components)
    .pipe(connect.reload());
});

gulp.task('html', function () {
    return gulp.src(config.html)
    .pipe(connect.reload());
});

gulp.task('sass:watch', function () {
    return gulp.watch(config.styles, ['styles']);
});

gulp.task('components:watch',function () {
    return gulp.watch(config.components, ['components']);
});

gulp.task('html:watch', function () {
    return gulp.watch(config.html, ['html']);
});

gulp.task('server', ['connectDev', 'html:watch', 'sass:watch', 'components:watch']);
gulp.task('default', ['connectDist']);
