'use strict';

import path from 'path';
import gulp from 'gulp';
import { plugins, args, config, taskTarget, browserSync } from '../utils';

let dirs = config.directories;

// Watch task
gulp.task('watch', (done) => {
  if (!args.production) {<% if (cssOption === 'sass') { %>
    // Styles
    gulp.watch([
      path.join(dirs.source, dirs.styles, '**/*.{scss,sass}'),
      path.join(dirs.source, dirs.modules, '**/*.{scss,sass}')
    ], gulp.series('sass'));<% } else if (cssOption === 'postcss') { %>
    gulp.watch([
      path.join(dirs.source, dirs.styles, '**/*.css'),
      path.join(dirs.source, dirs.modules, '**/*.css'),
    ], gulp.series('postcss'));<% } %><% if (htmlOption === 'pug') { %>

    // Pug Templates
    gulp.watch([
      path.join(dirs.source, '**/*.pug'),
      path.join(dirs.source, dirs.data, '**/*.{json,yaml,yml}')
    ], gulp.series('pug'));<% } else if (htmlOption === 'nunjucks') { %>

    // Nunjucks Templates
    gulp.watch([
      path.join(dirs.source, '**/*.nunjucks'),
      path.join(dirs.source, dirs.data, '**/*.{json,yaml,yml}')
    ], gulp.series('nunjucks'));
    <% } %>

    // Copy
    gulp.watch([
      path.join(dirs.source, '**/*'),
      '!' + path.join(dirs.source, '{**/\_*,**/\_*/**}')<% if (htmlOption === 'nunjucks') { %>,
      '!' + path.join(dirs.source, '**/*.nunjucks')<% } else if (htmlOption === 'pug') { %>,
      '!' + path.join(dirs.source, '**/*.pug')<% } %>
    ], gulp.series('copy'));

    // Images
    gulp.watch([
      path.join(dirs.source, dirs.images, '**/*.{jpg,jpeg,gif,svg,png}')
    ], gulp.series('imagemin'));

    // All other files
    gulp.watch([
      path.join(dirs.temporary, '**/*'),
      '!' + path.join(dirs.temporary, '**/*.{css,map,html,js}')
    ]).on('change', browserSync.reload);
  }
  done();
});
