const { exec, escape }  = require('../db/mysql')

const login = (username, password) => {
  username = escape(username)
  password = escape(password)

  const sql = `
    select username, realname from users where username=${username} and password=${password}
  `
  console.log(sql)
  return exec(sql).then((res) => {
    // console.log(res)
    return res[0]
  })
}

module.exports = {
  login
}
