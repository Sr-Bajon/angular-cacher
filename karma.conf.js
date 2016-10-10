// Karma configuration
// Generated on Mon Mar 21 2016 11:32:08 GMT+0100 (Hora estándar romance)

module.exports = function (config) {
  'use strict';

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      './node_modules/angular/angular.js',
      './node_modules/ngstorage/ngStorage.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './*.js'
    ],

    // list of files to exclude
    exclude: ['./index.js'],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {},

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['nyan'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,


    nyanReporter: {
      // suppress the error report at the end of the test run
      suppressErrorReport: false, // default is false

      // suppress the red background on errors in the error
      // report at the end of the test run
      suppressErrorHighlighting: false, // default is false

      // increase the number of rainbow lines displayed
      // enforced min = 4, enforced max = terminal height - 1
      numberOfRainbowLines: 4, // default is 4

      // only render the graphic after all tests have finished.
      // This is ideal for using this reporter in a continuous
      // integration environment.
      renderOnRunCompleteOnly: false // default is false
    }
  });
};
