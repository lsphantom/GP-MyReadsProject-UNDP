import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import BookList from './BookList'

class BookSearch extends Component {
  static propTypes = {
    onBookChange: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
  }

  state = {
    books: [],
    query: ''
  }
  componentDidMount() {
    this.setState({
      books: this.props.books
    })
  }

  updateQuery = (query) => {
    this.setState({ query: query})
  }

  render(){
    const { books } = this.props
    const { query } = this.state

    let showingBooks
    if (query) {
      const match = new RegExp(escapeRegExp(query.trim()), 'i')
      showingBooks = books.filter( (author) => match.test(author.authors) || match.test(author.title) )
    } else {
      showingBooks = books
    }

    showingBooks.sort(sortBy('name'))

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}

            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <BookList books={showingBooks} onBookChange={this.props.onBookChange} />
        </div>
      </div>
    )
  }
}


export default BookSearch
