import gulp from 'gulp';
import sass from 'gulp-sass';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import sourcemaps from 'gulp-sourcemaps';
import terser from 'gulp-terser';
import rename from 'gulp-rename';
import { rollup } from 'rollup';
import * as sassCompiler from 'sass';

const compileSass = sass(sassCompiler);

function compileSassTask() {
    return gulp.src('./source/styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(compileSass({
            outputStyle: 'compressed'
        }).on('error', (error) => {
            console.error('Sass compilation error:', error.message)
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/styles'));
}

function bundle() {
    return rollup({
        input: 'source/main.js',
        plugins: [
            nodeResolve(),
            commonjs(),
            babel({
                babelHelpers: 'bundled',
                exclude: 'node_modules/**'
            })
        ]
    }).then(bundle => {
        return bundle.write({
            file: 'dist/scripts/bundle.js',
            format: 'iife',
            name: 'MyBundle',
            sourcemap: true
        }).then(() => {
            return new Promise((resolve, reject) => {
                gulp.src('dist/scripts/bundle.js')
                    .pipe(sourcemaps.init({ loadMaps: true }))
                    .pipe(terser())
                    .pipe(rename({ extname: '.min.js' }))
                    .pipe(sourcemaps.write('.'))
                    .pipe(gulp.dest('dist/scripts'))
                    .on('end', resolve)
                    .on('error', reject);
            });
        });
    });
}

const defaultTask = gulp.series(bundle, compileSassTask);
export default defaultTask;

export const watch = function() {
    gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, gulp.series(compileSassTask));
    gulp.watch('./source/**/*.js', { ignoreInitial: false }, gulp.series(bundle));
};
