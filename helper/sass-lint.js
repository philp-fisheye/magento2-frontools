'use strict';
module.exports = function(gulp, plugins, config, name, file) { // eslint-disable-line func-names
  // Return function that is executed inside of .pipe()
  return () => {
    const theme          = config.themes[name],
          srcBase        = config.projectPath + 'var/view_preprocessed/frontools' + theme.dest.replace('pub/static', ''),
          sassLintConfig = require('../helper/config-loader')('sass-lint.yml', plugins, config);

    return gulp.src(file || srcBase + '/**/*.scss')
      .pipe(plugins.plumber({ errorHandler: plugins.notify.onError('Error: <%= error.message %>') }))
      .pipe(plugins.sassLint(sassLintConfig))
      .pipe(plugins.sassLint.format())
      .pipe(plugins.if(plugins.util.env.ci, plugins.sassLint.failOnError()))
      .pipe(plugins.logger({
        display   : 'name',
        beforeEach: 'Theme: ' + name + ' ' + 'File: ',
        afterEach : ' - SASS Lint finished.'
      }));
  }
};
