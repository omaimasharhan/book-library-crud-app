const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const Book = require('./models/Books')

const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB')

    app.listen(3000, function () {
      console.log('listening on 3000')
    })
  })
  .catch(err => console.log(err))

app.post('/books', async (req, res) => {
  try {
    const result = await Book.create(req.body)
    console.log(result)
    res.redirect('/')
  } catch (error) {
    console.error(error)
  }
})

app.get('/', async (req, res) => {
  try {
    const books = await Book.find()
    res.render('index.ejs', { books: books })
  } catch (error) {
    console.error(error)
  }
})

app.put('/books', async (req, res) => {
    try {
      await Book.findByIdAndUpdate(req.body.id, {
        title: req.body.title,
        author: req.body.author
      })
  
      res.json('Updated book')
    } catch (error) {
      console.error(error)
    }
  })

app.delete('/books', async (req, res) => {
    try {
      await Book.findByIdAndDelete(req.body.id)
      res.json('Deleted book')
    } catch (error) {
      console.error(error)
    }
  })