import React, {Component} from 'react'
import PropTypes from 'prop-types'
import BookList from './BookList'


class Shelf extends Component {
  static propTypes =  {
    books: PropTypes.array.isRequired,
    onBookChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
  }

  render(){
    return(
          <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.title}</h2>
            <div className="bookshelf-books">
              <BookList books={this.props.books} shelf={this.props.id} onBookChange={this.props.onBookChange} />
            </div>
          </div>
    )
  }
}

export default Shelf
