import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
import './App.css'
import Shelf from './Shelf'
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
    BooksAPI.get(bookId).then((updatedBook) => {
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
        this.findBookShelf(results)
        this.setState({searchResults: results})
      } else {
        this.setState({searchResults: []})
      }
    })
  }

  findBookShelf = (results) => {
    let allBooks = this.state.books
    for (let book of results) {
      book.shelf = "none"
    }

    for (let book of results) {
      for (let bu of allBooks) {
        if (bu.id === book.id) {
          book.shelf = bu.shelf
        }
      }
    }
    return results
  }
  
  clearSearch = () => {
    this.setState({
      searchResults: []
    })
  }


  render() {
    const shelves = [
    { id: 'currentlyReading',
      title: 'Currently Reading',
      books: this.state.books.filter((book) => (book.shelf === "currentlyReading"))
    },
    { id: 'wantToRead',
      title: 'Want to Read',
      books: this.state.books.filter((book) => (book.shelf === "wantToRead"))
    },
    { id: 'read',
      title: 'Read',
      books: this.state.books.filter((book) => (book.shelf === "read"))
    }
    ]

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads Project</h1>
              <p>by LSPhantom</p>
            </div>
            <div className="list-books-content">
            { shelves.map((shelf, index) => (
              <Shelf key={index} id={shelf.id} title={shelf.title} books={shelf.books} onBookChange={this.updateBooks} />
              ))}             
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
