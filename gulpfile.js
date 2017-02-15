const gulp = require('gulp')
const shell = require('shelljs')

const what = 'shopping-cart'
gulp.task('browserify', () => {
  shell.exec(`npm run browserify:${what}`)
})
gulp.task('default', ['browserify'])
