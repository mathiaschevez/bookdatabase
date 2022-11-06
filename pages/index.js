import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Home() {
  const [books, setBooks] = useState()

  //report fields
  const [bookTitle, setBookTitle] = useState('')
  const [bookAuthor, setBookAuthor] = useState('')
  const [bookGenre, setBookGenre] = useState('')

  useEffect(() => {
    if(!books) getBooks()
  })


  const getBooks = async () => {
    try {
      const res = await fetch('/api/books', {
        method: 'GET',
        headers: {"Content-Type": "application/json"},
      })

      if (res.status !== 200) {
        console.log('something went wrong')
      } else {
        console.log('Books retrieved successfully')
      }

      setBooks(await res.json())
    } catch (error) {
      console.log('Error retrieving books from db', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = { bookTitle, bookAuthor, bookGenre }
    try {
      const res = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (res.status !== 200) {
        console.log('something went wrong')
        //set an error banner here
      } else {
        resetForm()
        getBooks()

        console.log('Book submitted to db successfully')
      }
    } catch (error) {
      console.log('there was an error submitting', error)
    }
  }
  
  const resetForm = () => {
    setBookTitle('')
    setBookAuthor('')
    setBookGenre('')
  }

  return (
    <div className='bg-slate-700 h-full w-full p-9'>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Book store mock project with prisma next js and planet scale" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='w-full flex flex-col gap-6 lg:flex-row lg:gap-16'>
        <div className='flex justify-between gap-16'>
          <div className='flex flex-col flex-1 text-white gap-3'>
            <span className='text-lg'>Book Title</span>
            <input 
              value={bookTitle}
              className='bg-slate-200 rounded p-2 text-black' 
              placeholder='Title'
              onChange={(e) => setBookTitle(e.target.value)}
            />
          </div>
          <div className='flex flex-col flex-1 text-white gap-3'>
            <span className='text-lg'>Author Name</span>
            <input
              value={bookAuthor} 
              className='bg-slate-200 rounded p-2 text-black' 
              placeholder='Author'
              onChange={(e) => setBookAuthor(e.target.value)}
            />
          </div>
        </div>
        <div className='flex flex-col text-white gap-3'>
          <span className='text-lg'>Genre</span>
          <input 
            value={bookGenre}
            className='bg-slate-200 rounded p-2 text-black' 
            placeholder='Genre'
            onChange={(e) => setBookGenre(e.target.value)}
          />
        </div>
      </div>
      <button 
        className='bg-red-600 text-white rounded w-1/2 self-center py-3 mt-9 lg:w-1/4'
        onClick={(e) => handleSubmit(e)}
      >
        Submit
      </button>
      {books && 
        <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-9 p-3 mt-9'>
          {books.map(book => (
            <div className='text-white bg-slate-500 p-6 rounded' key={book.id}>
              <h1 className='font-bold text-white text-lg mb-6'>{book.bookTitle}</h1>
              <h1 className='font-bold'>{book.bookAuthor}</h1>
              <h1 className='font-bold'>{book.bookGenre}</h1>
            </div>
          ))}
        </div>
      }
    </div>
  )
}
