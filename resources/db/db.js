const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
	user: process.env.user,
	password: process.env.password,
	host: 'localhost',
	database: 'edo_books',
	port: 5432
})

const fetch = async (SQL, ...params) => {
	const client = await pool.connect()

	try {

		const data = await client.query(SQL, params)

		return data?.rows 

	} catch(e) {
		console.log(e)
	} finally {
		client.release()
	}

}

module.exports = {
	fetch,
}
