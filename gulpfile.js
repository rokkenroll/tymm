var gulp = require("gulp");
var sass = require("gulp-sass");
var cleanCSS = require("gulp-clean-css");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var util = require("gulp-util");
var path = require("path");
var templateCache = require("gulp-angular-templatecache");
var replace = require('gulp-replace');

var paths = {
	scss: "scss/*",
	css:  "assets/",
	sjs: "src/**/*.js",
	js: "assets/",
	shtml: "src/**/*.html",
	html: "assets/",
	sindex: "src/index.html",
	index: "."
};

gulp.task("default", ["watch", "sass", "js", "html", "index"]);

gulp.task("sass", function() {
	gulp.src(paths.scss)
		.pipe(sass({ includePaths: ["scss"] }))
		.on("error", sass.logError)
		.pipe(gulp.dest(paths.css))
		.on("error", util.log)
		.pipe(cleanCSS({ relativeTo: "scss" }))
		.on("error", util.log)
		.pipe(rename({ extname: ".min.css" }))
		.on("error", util.log)
		.pipe(gulp.dest(paths.css)
		.on("error", util.log));
});

gulp.task("js", function() {
	gulp.src(paths.sjs)
		.pipe(concat('bundle.js'))
		.on("error", util.log)
		.pipe(gulp.dest(paths.js))
		.on("error", util.log)
		.pipe(rename({ extname: ".min.js" }))
		.on("error", util.log)
		.pipe(uglify({mangle: false}))
		.on("error", util.log)
		.pipe(gulp.dest(paths.js)
		.on("error", util.log));
});

gulp.task("html", function() {
    gulp.src(paths.shtml)
		.pipe(templateCache({ root: 'src', standalone: true }))
		.on("error", util.log)
		.pipe(gulp.dest(paths.html))
		.on("error", util.log);
});

gulp.task("index", function() {
    gulp.src([paths.sindex])
		.pipe(replace('{{cachebash}}', 'cb=' + (new Date().getTime())))
		.on("error", util.log)
		.pipe(gulp.dest(paths.index))
		.on("error", util.log);
});

gulp.task("watch", function() {
	gulp.watch(paths.scss, ["sass"]);
	gulp.watch(paths.sjs, ["js"]);
	gulp.watch(paths.shtml, ["html"]);
	gulp.watch(paths.sindex, ["index"]);
	gulp.watch("app.js", ["js"]);
});
