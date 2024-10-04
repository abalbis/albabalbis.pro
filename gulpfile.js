const gulp = require("gulp");
const fileInclude = require("gulp-file-include");

gulp.task("html", function () {
  return gulp
    .src("docs/*.html")
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest("docs/dist"));
});

gulp.task("default", gulp.series("html"));
