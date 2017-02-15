const gulp = require('gulp')
const shell = require('shelljs')

gulp.task('browserify', () => {
  shell.exec('npm run browserify')
})

gulp.task('uglifyjs', ['browserify'], () => {
  shell.exec('npm run uglifyjs')
})

gulp.task('server', ['uglifyjs'], () => {
  shell.exec('npm run server')
})

gulp.task('default', ['server'])
