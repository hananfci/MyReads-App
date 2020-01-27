import React, { Component } from "react";
import Books from "./Books.js";
import SearchBooks from "./SearchBooks.js";
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
 import * as BooksAPI from './BooksAPI'
import './App.css'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
   
    showSearchPage: false
  }
  getallbooks = () =>{
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books:books
      }))
    })
  }
  
 updatebook = (book,newshelf) => {
  const bookshelf=this.state.books.find(currentbook => currentbook.id===book.id)
  if(bookshelf){
    bookshelf.shelf=newshelf;
  BooksAPI.update(book,newshelf)
      .then(() => {
               this.getallbooks();
      })}
      else{
        book.shelf=newshelf;
        BooksAPI.update(book,newshelf)
        .then(
          this.setstate = (currentstate => ({
           books:currentstate.books.concat(book)
          }))
        )

      }
  }
  
 
  componentDidMount() {
   this.getallbooks()
   }
  render() {
    return (
      <div className="app">
     
     
          <Route exact path='/SearchBooks' render={() => (
            <SearchBooks books={this.state.books} onupdate={this.updatebook}/>
            )} />

         
        <Route exact path='/' render={() => (
          <div>
          <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
        <Books books={this.state.books} onupdate={this.updatebook}  />
        </div>     
        
      </div>

          <div className="open-search">
          <Link to={{
            pathname: '/SearchBooks',
           }}>
           Add a book
           </Link> 
           </div>
            </div>
          )} />
     
     
 

      </div>
    )
  
  }
}

export default BooksApp
