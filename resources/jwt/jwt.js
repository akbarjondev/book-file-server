const jwt = require('jsonwebtoken')

module.exports = {
	verify: (token) => jwt.verify(token, '_edo')
}
