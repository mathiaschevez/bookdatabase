import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return await addBook(req, res)
  } else if (req.method === 'GET') {
    return await readBooks(req, res)
  } else if (req.method === 'DELETE') {
    return await deleteBook(req, res)
  } if(req.method === 'PUT') {
    return await updateBook(req, res)
  }
  else {
    return res.status(405).json({ message: 'Method not allowed', success: false })
  }
}

async function readBooks(req, res) {
  try {
    const allBooks = await prisma.bookSuggestion.findMany()
    return res.status(200).json(allBooks, { success: true })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Error reading books', success: false })
  }
}

async function addBook(req, res) {
  const body = req.body

  try {
    const newEntry = await prisma.bookSuggestion.create({
      data: {
        bookTitle: body.bookTitle,
        bookAuthor: body.bookAuthor,
        bookGenre: body.bookGenre,
      }
    })
    return res.status(200).json(newEntry, { success: true })
  } catch (error) {
    console.error('Request error', error)
    res.status(500).json({ error: 'Error added book', success: false })
  }
}

async function updateBook(req, res) {
  const body = req.body

  try {
    const updatedEntry = await prisma.bookSuggestion.update({
      where: {
        id: body.id
      },
      data: {
        bookTitle: body.bookTitle,
        bookAuthor: body.bookAuthor,
        bookGenre: body.bookGenre,
      }
    })
    return res.status(200).json(updatedEntry, { success: true })
  } catch (error) {
    console.error('Failed to update book', error)
    res.status(500).json({ error: 'Error updating book', success: false })
  }
}

async function deleteBook(req, res) {
  const body = req.body

  try {
    const deletedEntry = await prisma.bookSuggestion.delete({
      where: {
        id: body.id
      }
    })

    console.log(deletedEntry)
    res.status(200).json(`${'Deleted Book: ' + deletedEntry.bookTitle + ' ' + deletedEntry.book}`, { success: true })
  } catch (error) {
    console.error('Failed to delete book', error)
    res.status(500).json({ error: 'Error deleting book', success: false })
  }
}