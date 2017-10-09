import React, {Component} from 'react'
import PropTypes from 'prop-types'
import BookList from './BookList'


class Shelf extends Component {
  static propTypes =  {
    books: PropTypes.array.isRequired,
    onBookChange: PropTypes.func.isRequired,
    shelfName: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired
  }

  render(){
    return(
          <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.shelfName}</h2>
            <div className="bookshelf-books">
              <BookList books={this.props.books} shelf={this.props.shelf} onBookChange={this.props.onBookChange} />
            </div>
          </div>
    )
  }
}

export default Shelf
