import React from 'react'
import { BiTrashAlt } from 'react-icons/bi'

const Book = ({ bookId, bookTitle, bookAuthor, bookGenre, getBooks }) => {

  const deleteBook = async () => {
    const body = {id: bookId}

    try {
      const res = await fetch('/api/books', {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })

      if (res.status !== 200) {
        console.log('something went wrong')
      } else {
        console.log('Book deleted successfully')
        getBooks()
      }
    } catch (error) {
      console.error('Failed to delete book', error)
    }
  }

  return (
    <div className='text-white bg-slate-500 p-6 rounded'>
      <div className='flex justify-between'>
        <h1 className='font-bold text-white text-lg mb-6'>{bookTitle}</h1>
        <button 
          className='bg-white h-6 w-9 rounded text-black flex items-center justify-center hover:bg-slate-100'
          onClick={() => deleteBook()}  
        >
          <BiTrashAlt />
        </button>
      </div>
      <h1 className='font-bold'>{bookAuthor}</h1>
      <h1 className='font-bold'>{bookGenre}</h1>
    </div>
  )
}

export default Book