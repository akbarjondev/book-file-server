const express = require('express')
const multer = require('multer')
const sha1 = require('sha1')
const cors = require('cors')

const { fetch } = require('./resources/db/db')


const app = express()

const PORT = process.env.PORT || 4003

app.use(express.json())
app.use(cors())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'books')
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + '-' + file.originalname

    cb(null, fileName)
  }
})
 
const upload = multer({ storage: storage })

app.get('/', (req, res) => {
	res.send({
		status: 200
	})
})

app.post('/upload', upload.single('book'), async (req, res, next) => {
	
	try {

		const addBookRes = await fetch(`
			insert into 
				books (book_unique_id, book_path, book_size)
			values
				($1, $2, $3)
			returning
				book_unique_id,
				book_uploaded_at
		`, sha1(req?.file?.filename), req?.file?.path, (req?.file?.size / 1024 / 1024).toFixed(2))

		res.json({
			status: 200,
			message: 'book uploaded',
			data: addBookRes
		})

	} catch(e) {
		console.log(e)

		res.json({
			status: 500,
			message: e.message
		})
	}

})

app.post('/uploads', upload.array('books', 12), async (req, res, next) => {
	console.log(req.files)
})

app.get('/download', async (req, res) => {

	try {
		
	} catch(e) {
		console.log(e)
	}

})

app.listen(PORT, () => console.log(`ready at http://localhost:${PORT}`))
