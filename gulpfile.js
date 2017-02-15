const gulp = require('gulp')
const shell = require('shelljs')

gulp.task('lint', () => {
  shell.exec('npm run lint')
})

const what = 'todomvc'
gulp.task('browserify', ['lint'], () => {
  shell.exec(`npm run browserify:${what}`)
})
gulp.task('default', ['browserify'])
