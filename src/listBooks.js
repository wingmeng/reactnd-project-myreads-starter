import React, { Component } from 'react'
import BooksItem from './booksItem'

// 分类展示书籍列表
class ListBooks extends Component {
  render() {
    const { shelf } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.name}</h2>
        <div className="bookshelf-books">
          <BooksItem
            books={shelf.books}
            {...this.props}  // 将父组件的参数传递给更深层级的子组件
          />
        </div>
      </div>
    )
  }
}

export default ListBooks
