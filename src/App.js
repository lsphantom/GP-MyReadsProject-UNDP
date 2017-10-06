import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
import './App.css'
import BookList from './BookList'
import BookSearch from './BookSearch'




class BooksApp extends React.Component {
  state = {
    books: [],
    query: ''
  }

  componentDidMount() {
    this.goFetchBooks()
  }

  goFetchBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  updateBooks = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.goFetchBooks()
    })
  }

  //Search Fx
  /*
    NOTES: The search from BooksAPI is limited to a particular set of search terms.
    You can find these search terms here:
    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
    you don't find a specific author or title. Every search is limited by search terms.
  */
  updateQuery = (query) => {
    this.setState({ query: query })
  }
  clearQuery = (query) => {
    this.setState({ query: '' })
  }

  testAPI = () => {
    const testBook = this.state.books[0]
    console.log(testBook)
    BooksAPI.update(testBook, "wantToRead").then(() => {
      this.goFetchBooks()
    })
  }




  render() {
    const currentlyReadingList = this.state.books.filter((book) => (book.shelf === "currentlyReading"))
    const wantToReadList = this.state.books.filter((book) => (book.shelf === "wantToRead"))
    const readList = this.state.books.filter((book) => (book.shelf === "read"))

    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads Project</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                {/*<button onClick={this.testAPI}>Test API func</button>*/}
                  <h2 className="bookshelf-title">Currently Reading</h2>

                  <div className="bookshelf-books">
                  <BookList books={currentlyReadingList} onBookChange={this.updateBooks} />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                  <BookList books={wantToReadList} onBookChange={this.updateBooks} />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                  <BookList books={readList} onBookChange={this.updateBooks} />
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />



        <Route path="/search" render={() => (
          <div>
          <div className="search-books-bar">
            <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={event => this.updateQuery(event.target.value)}
              />

            </div>
          </div>
          <div className="search-books">
            <div className="search-books-results">
            <BookSearch books={this.state.books} query={this.state.query} onBookChange={this.updateBooks} />
            </div>
          </div>
          </div>
        )}/>


      </div>
    )
  }
}

export default BooksApp
