"use strict";

const fs = require("fs");
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const pug = require("gulp-pug");
const autoprefixer = require("gulp-autoprefixer");

let directories = [
	"src",
	"dist",
	"src/img",
	"src/pug",
	"src/js",
	"src/sass",
	"dist",
	"dist/img",
	"dist/html",
	"dist/js",
	"dist/css"
];

for (let directory of directories) {
	if (!fs.existsSync(directory)){
		fs.mkdirSync(directory);
	};
};

gulp.task("css", function() {
	return gulp.src('./src/sass/**/*.sass')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({}))
		.pipe(gulp.dest('./dist/css'))
});

gulp.task("html", function() {
	return gulp.src("./src/pug/**/*.pug")
		.pipe(pug({}))
		.pipe(gulp.dest("./dist/html/"))
});

gulp.task("javascript", function() {
	return gulp.src("./src/js/**/*.js")
		.pipe(gulp.dest("./dist/js/"))
});

gulp.task("image", function() {
	return gulp.src("./src/img/**/*")
		.pipe(gulp.dest("./dist/img"))
});

gulp.task("watch", function() {
	gulp.watch("./src/sass/**/*.sass", gulp.series("css"));
	gulp.watch("./src/pug/**/*.pug", gulp.series("html"));
	gulp.watch("./src/js/**/*.js", gulp.series("javascript"));
	gulp.watch("./src/img/**/*", gulp.series("image"));
});
