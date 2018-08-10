import React, {Component} from 'react'
import PropTypes from 'prop-types'



class Book extends Component {
static propTypes = {
  book: PropTypes.object.isRequired
}

changeShelf = (e) => {
  this.props.onChange(e.target.value)
}


render(){
  const {book} = this.props

  const shelfClass = this.props.shelf;

  return(
    <li key={book.id}>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: (
            book.imageLinks ? `url(${book.imageLinks.smallThumbnail})` : `url(http://via.placeholder.com/128x193?text=No%20Cover)`
          )}}></div>
          <div className={`book-shelf-changer ${shelfClass}`}>
            <select value={book.shelf} onChange={this.changeShelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors ? book.authors.map((author, index) => (
          <small key={index}>{author}<br/></small>
          )) : ''}</div>
      </div>
    </li>
  )
}

}

export default Book
