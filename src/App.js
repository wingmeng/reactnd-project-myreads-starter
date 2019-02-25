import React from 'react'
import { Route, Link } from 'react-router-dom'
import ListBooks from './listBooks'
import SearchBooks from './searchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    // 书架数组
    bookshelves: [
      {
        name: 'Currently Reading',  // 书架名称
        tag: 'currentlyReading',  // 书架标签（对应 API 中的 shelf 字段）
        books: []  // 当前书架的书籍
      }, {
        name: 'Want to Read',
        tag: 'wantToRead',
        books: []
      }, {
        name: 'Read',
        tag: 'read',
        books: []
      }
    ]
  }

  // 生命周期：组件装载完成，骨架 render 完毕
  componentDidMount() {
    // 返回当前书架列表页的所有书籍
    BooksAPI.getAll().then((books) => {
      this.setState(state => {
        return {
          // 将书籍按照所属书架归类（书籍数组归类到书架对应数组中）
          bookshelves: state.bookshelves.map(shelf => {
            shelf.books = books.filter(book => shelf.tag === book.shelf)
            return shelf
          })
        }
      })
    })
  }

  /**
   * 变更书籍所属书架
   * @descr 将书籍移动到目标书架。该由 booksItem 组件调用，this 作用域仍指向 BooksApp
   * @param {object} book - 当前书籍信息
   * @param {string} targetShelf - 目标书架名称
   */
  updateBookshelf(book, targetShelf) {
    BooksAPI.update(book, targetShelf).then(shelves => {
      this.setState(() => {
        return {
          bookshelves: this.state.bookshelves.map(shelf => {
            let bookIds = shelves[shelf.tag];

            if (shelf.tag === targetShelf && bookIds.includes(book.id)) {
              book.shelf = targetShelf;  // 变更书架名
              shelf.books.unshift(book)  // 将书籍添加到目标书架的 books 数组（逆序）
            } else {
              shelf.books = shelf.books.filter(bookInfo => (
                bookIds.includes(bookInfo.id)
              ))
            }

            return shelf
          })
        }
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              {/* 根据 bookshelves，生成对应数量的书架 */}
              {this.state.bookshelves.map((bookshelf, idx, arr) => (
                <ListBooks key={bookshelf.tag}
                  shelf={bookshelf}
                  shelves={arr}  // 用于生成书籍右下角的书架 select

                  // 传递父级函数给子组件调用
                  // 注：ES6 的箭头函数会传递当前组件的 this 执行上下文
                  updateBookshelf={(book, targetShelf) => (
                    this.updateBookshelf(book, targetShelf)
                  )}
                />
              ))}
            </div>
            <div className="open-search">
              <Link to="/search"><button>Add a book</button></Link>
            </div>
          </div>
        )}/>
        <Route path="/search" render={() => (
          <SearchBooks
            shelves={this.state.bookshelves}
            updateBookshelf={(book, targetShelf) => (
              this.updateBookshelf(book, targetShelf)
            )}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
