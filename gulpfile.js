var gulp = require('gulp');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');

gulp.task('sass', function()
{
	return gulp.src('app/style/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('dist/style/'));
});

gulp.task('copyscript', function()
{
	return gulp.src('app/**/*.js')
		.pipe(gulp.dest('dist/'));
});

gulp.task('copy', function()
{
	return gulp.src('app/**/*.html')
		.pipe(gulp.dest('dist/'));
});

gulp.task('copyimg', function()
{
	return gulp.src('app/**/*.jpg')
		.pipe(gulp.dest('dist/'));
});

gulp.task('watch', function()
{
	gulp.watch('app/**/*', ['copy','sass', 'copyimg', 'copyscript']);
});

gulp.task('default', function(callback)
{
	runSequence(['sass', 'copy','copyimg', 'copyscript'], 'watch');
});