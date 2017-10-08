import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
import './App.css'
import BookList from './BookList'
import BookSearch from './BookSearch'




class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: []
  }

  componentDidMount() {
    this.goFetchBooks()
  }

  goFetchBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  changeOneBook = (bookId) => {
    BooksAPI.get(bookId).then((updatedBook)=> {
     let newBookList = this.state.books.filter((uB) => (uB.id !== updatedBook.id)).concat(updatedBook)
     this.setState({
      books: newBookList
     })
    })
  }

  updateBooks = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.changeOneBook(book.id)
    })
  }

  searchAPI = (query) => {
    BooksAPI.search(query, 20).then((results) => {
      if(Array.isArray(results)){
        this.setState({searchResults: results.slice(0,15)})   
      } else {
        this.setState({searchResults: []})
      }   
    })
  }
  clearSearch = () => {
    this.setState({
      searchResults: []
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
                <div className="bookshelf">
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
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />



        <Route path="/search" render={() => (
            <BookSearch books={this.state.searchResults} BookSearch={this.searchAPI} onBookChange={this.updateBooks} clearSearch={this.clearSearch} />
        )}/>


      </div>
    )
  }
}

export default BooksApp
