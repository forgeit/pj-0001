var gulp = require('gulp');
var jshint = require('gulp-jshint');
var rev = require('gulp-rev');

var paths = require('./gulp.config.json');

gulp.task('criarRevisao', criarRevisao);

function criarRevisao() {
	gulp.src(paths.js)
		.pipe(rev())
		.pipe(gulp.dest(paths.build));
}