const express = require('express')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/books')
  },
  filename: function (req, file, cb) {
    const fileName = file.fieldname + '-' + Date.now()

    cb(null, fileName)
  }
})
 
const upload = multer({ storage: storage })

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())

app.post('/upload', upload.array('books', 12), (req, res, next) => {

})

app.listen(PORT, () => console.log(`ready at http://localhost:${PORT}`))
