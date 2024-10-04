const gulp = require("gulp");
const fileInclude = require("gulp-file-include");
const cleanCSS = require("gulp-clean-css");
const browserSync = require("browser-sync").create();

gulp.task("compile", function () {
  return gulp
    .src(["src/index.html"])
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest("dist"));
});

gulp.task("css", function () {
  return gulp
    .src("src/styles/*.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("dist/css"));
});

gulp.task("copy", function () {
  return gulp.src("dist/**/*").pipe(gulp.dest("docs"));
});

gulp.task("dev", gulp.series("compile", "css"));
gulp.task("release", gulp.series("compile", "css", "copy"));

gulp.task("serve", function () {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
  gulp.watch("dist/*.html").on("change", browserSync.reload);
});
