export const base = {

  production: false,

  info: {
    hash: trim(`<%= data.hash %>`),
    date: trim(`<%= data.date %>`, '1970-01-01T00:00:00.000Z'),

    version: trim(
      `<%= data.version_built %>`,
      `<%= data.version_npm %>`,
      '0.0.0-000000',
    ),
  },

};





function trim (...list: string[]) {

  return list
    .filter(item => !!item)
    .filter(item => item.startsWith('<%') === false)
    .concat('{N/A}')
    .shift() || ''
  ;
}

