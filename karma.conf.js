// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

{
  let { CHROME_BIN: chrome_bin } = process.env;

  try {
    chrome_bin = require('puppeteer').executablePath();
  } catch (e) { }

  if (chrome_bin) {
    process.env.CHROME_BIN = chrome_bin;
  }
}


module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: [ 'jasmine', '@angular/cli' ],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-nyan-reporter'),
      require('karma-spec-reporter'),
      require('@angular/cli/plugins/karma'),
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: [ 'progress', 'kjhtml' ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_WARN,
    autoWatch: true,
    browsers: [ 'Chrome' ],
    singleRun: false,

    captureTimeout: 60 * 1000,
    browserDisconnectTolerance: 3,
    browserDisconnectTimeout: 15 * 1000,
    browserNoActivityTimeout: 15 * 10000,

    customLaunchers: {
      Chrome_Headless: {
        base: 'Chrome',
        flags: [
          '--headless',
          '--disable-gpu',
          '--remote-debugging-port=9222',
          '--no-sandbox',
          '--disable-setuid-sandbox',
        ],
      },
    },
  });
};
