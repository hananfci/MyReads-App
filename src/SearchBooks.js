import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
class SearchBooks extends Component {
  static propTypes = {
    onupdate: PropTypes.func.isRequired
  }
  state={
    resultbooks:[],
    query:''
  }

  
  updateQuery = (query) => {
    if(query.length > 0 ) {
      this.setState(() => ({
        resultbooks: [],
        query: query
    }))
      this.showingBooks(query)
    }
    else {
      this.clearQuery()
    }
  }
 
  clearQuery = () => {
    this.setState({
      query: '',
      resultbooks: []
    })
  }

   showingBooks(query) {
    if (query.length > 0)
      BooksAPI.search(query)
      .then(searchResults => {
        if(query === this.state.query)
          this.setState(currentState => ({ 
            resultbooks: this.updateExistingShelves(searchResults)
          }))
        }
      );
   } 
   updateExistingShelves(searchResults) {
    if(!searchResults.error) {
     const myBooks = this.props.books
     const addToState = searchResults.filter((result) => myBooks.find(b => {
       if(b.id === result.id) {
        result.shelf = b.shelf
         return result
       }
     }))
     myBooks.concat(addToState)
     return searchResults
    }
  }
  render() {
    const { query,resultbooks } = this.state
    const { onupdate } = this.props
  /*   const showingBooks = query === ''
    ? books
    : BooksAPI.search(query)
    .then((books) => {
      this.setState(() => ({
        books:books
      }))
    }) */
   
    
    return (
        <div className="search-books">
        <div className="search-books-bar">
        <Link to='/' className="close-search"> 
           close
           </Link> 
     
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
        
            <input
            className='search-Book'
            type='text'
            placeholder='Search Books'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          </div>
        </div>
        <div className="search-books-results">
          {
        resultbooks ?
            <ol className='books-grid'>
          
            {
          resultbooks.map((book) => (
                 <li key={book.id}>
                 <div className="book">
                       <div className="book-top">
                   <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                     <div className="book-shelf-changer">
                       <select value={book.shelf ? book.shelf : 'none'} onChange={(e) => onupdate(book, e.target.value)} >
                       <option value="move" disabled>Move to...</option>
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
       :
          <h4>No results for, "{query}"</h4>
                    
       }
        </div>
      </div>
    )
  }
}

SearchBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onupdate: PropTypes.func.isRequired,
}
export default SearchBooks