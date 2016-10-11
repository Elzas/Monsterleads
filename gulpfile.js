var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    clean = require('gulp-clean'),
    imagemin = require('gulp-tinypng'),
    jsmin = require("gulp-uglify"),
    jade = require("gulp-jade");

///*Clean TASK*/
gulp.task('clean', function(){
    return gulp.src("./dist/css/*.css")
        .pipe(clean())
        .pipe(gulp.dest('./dist/css/'));
});

///*POST CSS TASK*/
gulp.task('sass-dev',['clean'], function () {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(sourcemaps.init())
        .pipe(sass().on("error",sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css/'));
});

//IMAGEMIN
gulp.task('image', function () {
    gulp.src('./src/images/**/*.{jpg,png}')
        .pipe(imagemin('7yD9n5WhOsyqSh0ufJ-EopmOfriY40q3'))
        .pipe(gulp.dest('./dist/images/'));
});

///*COPY FONTS*/
gulp.task('copy-fonts', function(){
    gulp.src('src/fonts/**/*.{ttf,woff,woff2,eot,svg}')
        .pipe(gulp.dest('dist/fonts/'));
});

///*JADE TASK*/
gulp.task('jade', function() {
    return gulp.src("./src/jade/**/*.jade")
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('./dist/html/'))
});

///*JS-MIN TASK*/
gulp.task("js-min", function() {
    return gulp.src("./src/js/*.js")
        .pipe(jsmin())
        .pipe(gulp.dest("./dist/js/"))
});

///*WATCH TASK*/
gulp.task("watch", function (){
    gulp.watch('./src/scss/**/**/*.scss',   ['sass-dev']);
    gulp.watch('./src/jade/**/*.jade',   ['jade']);
    gulp.watch('./src/js/**/*.js',       ['js-min']);
});



gulp.task("default", ['sass-dev', 'jade'], function(){});
gulp.task("default-jade", ['jade'], function(){});
gulp.task("default-sass", ['sass-dev'], function(){});
gulp.task("default-image",['image'], function(){});
gulp.task("default js-min",['js-min'], function(){});
