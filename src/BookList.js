import React, {Component} from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class BookList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onBookStatusUpdate: PropTypes.func.isRequired
  }

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  handleChange = (e) => {
    //e.preventDefault()
    const values = [e.target.id, e.target.value]
    //const bookId = e.target.id
    //const shelf = e.target.value

    this.props.onBookStatusUpdate(values)
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
      <div>
      {showingBooks.length !== booksDisplay.length && (
          <div className="search-books-results-text">
            <span>Now Showing {showingBooks.length} of {booksDisplay.length} total</span>
          </div>
      )}
        <ol className="books-grid">
        {showingBooks.map(book => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select id={book.id} onChange={this.handleChange}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors}</div>
            </div>
          </li>
        ))}
        </ol>
      </div>
    )
  }
}


export default BookList
