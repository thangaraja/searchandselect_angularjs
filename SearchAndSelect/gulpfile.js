// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var concat = require('gulp-concat');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('public/js'))
});

// Concatenate & Minify CSS
gulp.task('styles', function () {
    return gulp.src('css/*.css')
        .pipe(concat('all.css'))
        .pipe(gulp.dest('public/css'));
});

// Copy templates
gulp.task('templates', function () {
    return gulp.src('templates/*.html')
        .pipe(gulp.dest('public/templates'));
});

// Copy html
gulp.task('html', function () {
    return gulp.src('index.html')
        .pipe(gulp.dest('public'));
});

gulp.task('connect', function () {
    connect.server({
        root: 'public',
        port: 4000
    })
});

// Default Task
gulp.task('default', ['lint', 'scripts','styles','templates', 'html','connect']);