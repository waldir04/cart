var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var gulpif = require('gulp-if');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cache = require('gulp-cached');

var src = {
    html: ['src/*.html'],
    styles: ['src/assets/styles/**/*.css'],
    css: ['src/assets/css'],
    components: ['src/components/**/*.js', 'src/components/**/*.html']
};

gulp.task('connect', function() {
    return connect.server({
        root: 'src',
        port: 5000,
        livereload: true
    });
});

gulp.task('build:dist', function() {
    var assets = useref.assets();

    gulp.src(src.styles)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'IE 8', 'IE 9', 'IE 10', 'IE 11']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(src.css));

    return gulp.src('*.html')
    .pipe(assets)
    .pipe(sourcemaps.init())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(sourcemaps.write())
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('public'));
});

gulp.task('styles', function() {
    return gulp.src(src.styles)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'IE 9', 'IE 10', 'IE 11']
    }))
    .pipe(sourcemaps.write())
    .pipe(cache('linting'))
    .pipe(gulp.dest(src.css))
    .pipe(connect.reload());
});

gulp.task('components', function () {
    return gulp.src(src.components)
    .pipe(connect.reload());
});

gulp.task('html', function () {
    return gulp.src(src.html)
    .pipe(connect.reload());
});

gulp.task('sass:watch', function () {
    return gulp.watch(src.styles, ['styles']);
});

gulp.task('components:watch',function () {
    return gulp.watch(src.components, ['components']);
});

gulp.task('html:watch', function () {
    return gulp.watch(src.html, ['html']);
});

gulp.task('server', ['connect', 'html:watch', 'sass:watch', 'components:watch']);
