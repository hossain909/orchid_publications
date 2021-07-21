
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const { series } = require('gulp');
        
//Compile sass
function ss(){
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','asset/scss/**/*.scss'])
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest('asset/css'))
        .pipe(browserSync.stream())
};

// Move js files to src
function js(){
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/popper.min.js'])
        .pipe(gulp.dest('asset/js'))
        .pipe(browserSync.stream())

};


// Watch
function watch(){
    browserSync.init({
        server: {
            baseDir: './asset'
        }
    });
    gulp.watch('asset/scss/**/*.scss', ss);
    gulp.watch('asset/**/*.html').on('change', browserSync.reload);
    gulp.watch('asset/js/**/*.js', js).on('change', browserSync.reload);
};
// Move font awesome fonts folder to src
function fonts(){
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('asset/fonts'))
};

// Move font awesome css file
function fa(){
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest('asset/css'))
};

//default task
exports.default = series(ss, js, fonts, fa, watch);