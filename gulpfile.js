const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const spritesmith = require("gulp-spritesmith");

// server
gulp.task('server', function() {
    browserSync.init({
        server: {
            port: 9000,            
            baseDir: "build"
        }
    });

    gulp.watch('build/**/*').on('change', browserSync.reload);
});
 
// Pug compile
gulp.task('templates:compile', function buildHTML() {
  return gulp.src('source/template/index.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('build'))
});

// Style compile
gulp.task('style:compile', function () {
    return gulp.src('source/style/main.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('build/css'));
  });

// Sprite  
gulp.task('sprite', function (cb) {
    const spritrData = gulp.src('source/image/icons/*.png')
                .pipe(spritesmith({
                    imgName: 'sprite.png',                    
                    imgPath: '../img/sprite.png',
                    cssName:'sprite.scss'
                }));

    spritrData.img.pipe(gulp.dest('build/images/'));
    spritrData.css.pipe(gulp.dest('source/styles/global/'));
    cb();
            });

gulp.task('clean', function del(cb){
  return rimrif('build', cb);
});            

gulp.task('copy:fonts', function () {
  return gulp.src('./source/fonts/**/*.*')
  .pipe(gulp.dest('build/fonts'));
});

gulp.task('copy:images', function () {
  return gulp.src('./source/images/**/*.*')
  .pipe(gulp.dest('build/images'));
});