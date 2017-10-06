import React, {Component} from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

import Book from './Book'

class BookList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onBookChange: PropTypes.func.isRequired
  }


  render(){
    const booksDisplay  = this.props.books
    const { query } = this.props

    let showingBooks

    if (query) {
      const match = new RegExp(escapeRegExp(query.trim()), 'i')
      showingBooks = booksDisplay.filter( (book) => match.test(book.authors) || match.test(book.title) )
    } else {
      showingBooks = booksDisplay
    }

    showingBooks.sort(sortBy('name'))

    return(
        <ol className="books-grid">
        {showingBooks.map((book, index) => (
          <Book book={book} shelf={book.shelf} key={index} onChange={(shelf) => {
              this.props.onBookChange(book, shelf)
            }} />
        ))}
        </ol>
    )
  }
}


export default BookList
