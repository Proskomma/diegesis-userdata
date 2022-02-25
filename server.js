const express = require('express')
const cors = require('cors')
const multer = require('multer')
const fse = require('fs-extra')
const path = require('path')

const upload = multer({limits: {fieldSize: 1000 * 1024 * 1024}})
const port = 8088

const app = express()
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/freeze', upload.single('frozen'), (req, res) => {
  fse.writeFileSync(path.join(__dirname, 'static', 'archive.pkzip'), req.body.frozen)
  res.send(`POST request received (${req.body.frozen.length} bytes)`)
})

app.listen(port, () => {
  console.log(`Diegesis userdata server listening on port ${port}`)
})
