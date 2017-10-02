import React, { Component } from 'react'


class BookStatus extends Component {

  handleChange = (e) => {
    e.preventDefault()

  }

  render(){
    return(
      <div className="book-shelf-changer">
        <select onChange={this.handleChange}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default BookStatus
