import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BooksItem from './booksItem'
import * as BooksAPI from './BooksAPI'

// 书籍搜索
class SearchBooks extends Component {
  state = {
    searchedBooks: [],  // 所有搜索到的书籍
    searching: false,
    total: null
  }

  onSearch(e, handle) {
    let input = e.target;
    let value = input.value.trim();

    // 每次搜索前清空结果数组，防止界面继续显示上一次的列表
    this.setState({ searchedBooks: [] });

    if (value === '') {
      this.setState({ total: null })
      return
    }

    // 节流处理
    if (!this.state.searching) {
      this.setState({ searching: true });

      setTimeout(() => {
        handle(value, (data) => {
          this.setState({ searching: false });  // 返回数据，重置搜索状态标记

          // 接口返回后再判断一次输入框内容
          // 场景：用户未等接口返回数据，就快速清空了输入框
          if (input.value.trim() === '') {
            this.setState({ total: null })
            return
          }

          this.setState({ searchedBooks: data })
          this.setState({ total: data.length })
        })
      }, 300)
    }
  }

  // 搜索书籍
  updateQuery(query, complete) {
    BooksAPI.search(query).then(books => {
      if (!Array.isArray(books)) {  // 边界情况（无结果）
        books = [];
      }

      complete(books)
    })
  }

  // 删除搜索结果中的特定书籍
  delSearchedBook(curBook) {
    this.setState((state) => ({
      searchedBooks: state.searchedBooks.filter(book => book.id !== curBook.id)
    }))
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/"><button className="close-search">Close</button></Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.onSearch(event, this.updateQuery)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {this.state.searching && (
            <p>searching...</p>
          )}

          {!this.state.searching && (
            <div>{
              this.state.total === 0
              ? 'no result'
              : this.state.total !== null
                && `searched ${this.state.total} items`
            }</div>
          )}

          <BooksItem
            books={this.state.searchedBooks}
            onDelSearchedBook={(bookId) => this.delSearchedBook(bookId)}
            {...this.props}
          />
        </div>
      </div>
    )
  }
}

export default SearchBooks
