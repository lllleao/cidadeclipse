const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const concat = require('gulp-concat')

function sassCompiler() {
    return gulp.src('./source/styles/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'))
}

function babelMin() {
    return gulp.src('./source/scripts/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(concat('index.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build/scripts'))
}

exports.default = gulp.parallel(sassCompiler, babelMin)

exports.watch = function() {
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.parallel(sassCompiler))
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false}, gulp.parallel(babelMin))
}
