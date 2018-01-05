var gulp = require('gulp')
// var gutil = require('gulp-util')
// var jshint = require('gulp-jshint')
var browserify = require('gulp-browserify')
var concat = require('gulp-concat')
var clean = require('gulp-clean')
var flatten = require('gulp-flatten')

// Modules for webserver and livereload
var express = require('express')
var refresh = require('gulp-livereload')
var livereload = require('connect-livereload')
var livereloadport = 35729
var serverport = 5000

// Set up an express server (not starting it yet)
var server = express()
// Add live reload
server.use(livereload({port: livereloadport}))
// Use our 'dist' folder as rootfolder
server.use(express.static('./dist'))
// Because I like HTML5 pushstate .. this redirects everything back to our index.html
server.all('/*', function (req, res) {
  res.sendfile('index.html', { root: 'dist' })
})

// Build task
gulp.task('build', ['clean', 'assets', 'templates', 'browserify'], function () { })

// Clean task
gulp.task('clean', function () {
  gulp.src('./dist/**/*.*', { read: false }) // much faster
  .pipe(clean())
})

// // JSHint task
// gulp.task('lint', function () {
//   gulp.src('./app/scripts/*.js')
//   .pipe(jshint())
//   // You can look into pretty reporters as well, but that's another story
//   .pipe(jshint.reporter('default'))
// })

// Browserify task
gulp.task('browserify', function () {
  // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
  gulp.src(['src/scripts/main.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  // Bundle to a single file
  .pipe(concat('bundle.js'))
  // Output it to our dist folder
  .pipe(gulp.dest('dist/js/'))
})

// Templates task
gulp.task('templates', function () {
  // Get our index.html
  gulp.src('src/index.html')
  // And put it in the dist folder
  .pipe(gulp.dest('dist/'))

  // Any other template files
  gulp.src(['src/**/*.html', '!src/index.html'])
  .pipe(flatten())
  // Will be put in the dist/templates folder
  .pipe(gulp.dest('dist/templates/'))

  gulp.src('src/assets/**/*')
  .pipe(gulp.dest('dist/assets/'))
})

// Assets task
gulp.task('assets', function () {
  gulp.src('src/assets/**/*')
  .pipe(gulp.dest('dist/assets/'))
})

gulp.task('watch', function () {
  // Start webserver
  server.listen(serverport)
  // Start live reload
  refresh.listen(livereloadport)

  // Watch our scripts, and when they change run lint and browserify
  gulp.watch(['src/scripts/**/*.js', '!src/scripts/**/*.spec.js'], [
    'browserify'
  ])
  // Watch our sass files
  gulp.watch(['src/styles/**/*.scss'], [
    'styles'
  ])

  gulp.watch(['src/**/*.html'], [
    'templates'
  ])

  gulp.watch(['src/assets/**/*'], [
    'assets'
  ])

  gulp.watch('./dist/**').on('change', refresh.changed)
})

gulp.task('default', ['build', 'watch'])
