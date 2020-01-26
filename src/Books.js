import React, { Component } from "react";
import PropTypes from 'prop-types'
const shelves= [
  {
    'shelfName': 'currentlyReading',
    'title': 'Currently Reading'
  },
  {
    'shelfName': 'wantToRead',
    'title': 'Want to read'
  },
  {
    'shelfName': 'read',
    'title': 'Read'
  }
];
class Books extends Component {
 
  // constructor(props) {
  //   super(props);
  //   this.userreadbooks =this.props.books;

  //   this.userreadbooks.map(book => {
     
  //   }); 
  // }

/* eslint-disable */
  render() {
    const { books, onupdate } = this.props
    
    return (
     
      <div>
      <div className="bookshelf">       
          
            {
              shelves.map((shelf) =>(

                shelf.shelfName === "read" ?
                <div className="bookshelf-books" key={shelf.shelfName}>

                <h2 className="bookshelf-title">{shelf.title}</h2>
                          <ol className="books-grid"> {
                               books.map( (book) => (
                                 book.shelf==="read" &&
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
                                  </li>))
                                  }
                          </ol>
                      </div>
                : shelf.shelfName === "currentlyReading" ?
                <div className="bookshelf-books">

                <h2 className="bookshelf-title">{shelf.title}</h2>
                          <ol className="books-grid"> {
                               books.map( (book) => (
                                 book.shelf==="currentlyReading" &&
                                  <li key={book.id}>
                                        <div className="book">
                                              <div className="book-top">
                                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                            <div className="book-shelf-changer">
                                              <select value={book.shelf ? book.shelf : 'none'} onChange={(e) => onupdate(book, e.target.value)}>
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
                                  </li>))
                                  }
                          </ol>
                      </div>:
                       <div className="bookshelf-books">

                       <h2 className="bookshelf-title">{shelf.title}</h2>
                                 <ol className="books-grid"> {
                                      books.map( (book) => (
                                        book.shelf==="wantToRead" &&
                                         <li key={book.id}>
                                               <div className="book">
                                                     <div className="book-top">
                                                 <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                                   <div className="book-shelf-changer">
                                                     <select value={book.shelf ? book.shelf : 'none'} onChange={(e) => onupdate(book, e.target.value)}>
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
                                         </li>))
                                         }
                                 </ol>
                             </div>
                  ))
              }
          
      
          
         
         
      </div>
    
  
    </div>

    
       
    );
  }
  
}
Books.propTypes = {
  books: PropTypes.array.isRequired,
  onupdate: PropTypes.func.isRequired,
}
export default Books;
