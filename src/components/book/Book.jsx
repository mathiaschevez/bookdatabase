import React, { useState } from 'react'
import { BiTrashAlt } from 'react-icons/bi'
import { FiEdit2 } from 'react-icons/fi'

const Book = ({ bookId, bookTitle, bookAuthor, bookGenre, getBooks }) => {
  const [editModeActive, setEditModeActive] = useState()

  const [tempBookTitle, setTempBookTitle] = useState(bookTitle)
  const [tempBookAuthor, setTempBookAuthor] = useState(bookAuthor)
  const [tempBookGenre, setTempBookGenre] = useState(bookGenre)

  const deleteBook = async () => {
    const body = { id: bookId }

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

  const updateBook = async () => {
    const body = { 
      id: bookId,
      bookTitle: tempBookTitle,
      bookAuthor: tempBookAuthor,
      bookGenre: tempBookGenre
    }

    try {
      const res = await fetch('/api/books', {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })

      if(res.status !== 200) {
        console.log('Something failed')
        console.log(body, 'BODY SENT')
      } else {
        console.log('Book updated successfully')
        setEditModeActive(false)
        getBooks()
      }
    } catch (error) {
      console.error('Failed to update book', error)
    }

    
  }

  return (
    <div className='text-white bg-slate-500 p-6 rounded shadow-xl border border-white'>
      { editModeActive ? (
        <div>
          <div className='flex justify-between mb-6'>
            <input
              className='text-black p-2 rounded w-48' 
              value={tempBookTitle} 
              onChange={(e) => setTempBookTitle(e.target.value)}
            />
            <div className='flex flex-col gap-3'>
              <button 
                className='bg-slate-200 h-6 w-9 rounded text-black flex items-center justify-center hover:bg-slate-100'
                onClick={() => setEditModeActive(false)}  
              >
                <FiEdit2 />
              </button>
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            <input
              className='text-black p-2 rounded w-48' 
              value={tempBookAuthor} 
              onChange={(e) => setTempBookAuthor(e.target.value)}
            />
            <div className='flex justify-between'>
              <input
                className='text-black p-2 rounded w-48' 
                value={tempBookGenre} 
                onChange={(e) => setTempBookGenre(e.target.value)}
              />
              <button 
                className='bg-blue-600 rounded px-3 hover:bg-blue-700'
                onClick={() => updateBook()}
              >Submit</button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className='flex justify-between'>
            <h1 className='font-bold text-white text-lg mb-6'>{bookTitle}</h1>
            <div className='flex flex-col gap-3'>
              <button 
                className='bg-white h-6 w-9 rounded text-black flex items-center justify-center hover:bg-slate-100'
                onClick={() => setEditModeActive(true)}  
              >
                <FiEdit2 />
              </button>
              <button 
                className='bg-white h-6 w-9 rounded text-black flex items-center justify-center hover:bg-slate-100'
                onClick={() => deleteBook()}  
              >
                <BiTrashAlt />
              </button>
            </div>
          </div>
          <h1 className='font-bold'>{bookAuthor}</h1>
          <h1 className='font-bold'>{bookGenre}</h1>
        </div>
      )}
    </div>
  )
}

export default Book