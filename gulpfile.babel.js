import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import jshint from 'gulp-jshint';

gulp.task('lint', () => {
  gulp.src('./app/**/*.js')
    .pipe(jshint());
});

gulp.task('nodemon', () => {
  nodemon({
    script: 'index.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  });
});

gulp.task('serve', ['lint', 'nodemon']);
