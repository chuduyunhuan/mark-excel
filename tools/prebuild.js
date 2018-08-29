// @ts-check

const os = require('os');
const fs = require('fs');
const Rx = require('rxjs');

const { template, includes } = require('lodash');



const config = {
  base: 'src/environments/base.ts',
}

const file = {
  read: Rx.Observable.bindNodeCallback(fs.readFile),
  write: Rx.Observable.bindNodeCallback(fs.writeFile),
};



Rx.Observable
  .defer(function () {
    // to not written in source code unless built on CI
    if (includes([ 'darwin', 'win32' ], os.platform())) {
      return Rx.Observable.empty();
    }

    // @ts-ignore
    return file.read(config.base, 'utf8');
  })
  .map(content => template(content, { variable: 'data' }))
  .map(tpl => {

    const {
      npm_package_gitHead: hash = 'ffffff',
      npm_package_version: version_npm = '0.0.0',
      PACKAGE_RELEASE_VERSION: version_built = '',
      PACKAGE_RELEASE_DATE: date = new Date().toISOString(),

    } = process.env;


    return tpl({
      hash: hash.slice(0, 6),
      date,
      version_built,
      version_npm,
    });
  })
  .switchMap(content => {
    // @ts-ignore
    return file.write(config.base, content);
  })
  .mapTo('pre-build ready')
  .subscribe(console.log, console.error)
;

