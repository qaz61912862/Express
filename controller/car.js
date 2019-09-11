const { exec, escape }  = require('../db/mysql')

const getCar = (page) => {
  let sql = `
    select * from car
  `
  let count = 10
  let start
  if (page) {
    start = (page - 1) * count
  } else {
    start = 0
  }
  sql += `LIMIT ${start}, ${count}`
  return exec(sql)
}

module.exports = {
  getCar
}
