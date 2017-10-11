import React from 'react'
import sortBy from 'sort-by'
import Book from './Book'

function BookList (props) {
  let showingBooks = props.books
  showingBooks.sort(sortBy('name'))

  return (
    <ol className="books-grid">
    {showingBooks.map((book, index) => (
      <Book book={book} shelf={props.shelf} key={index} onChange={(shelf) => {
          props.onBookChange(book, shelf)
        }} />
    ))}
    </ol>
  )
}

export default BookList