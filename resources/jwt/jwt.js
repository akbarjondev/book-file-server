const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
	verify: (token) => jwt.verify(token, process.env.secret_key)
}
