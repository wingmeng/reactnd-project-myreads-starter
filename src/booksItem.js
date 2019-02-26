import React, { Component } from 'react'

// 生成书籍列表项：ol.books-grid
class BooksItem extends Component {
  /**
   * 书籍所在书架变更事件
   * @param {object} book - 当前书籍对象
   * @param {string} value - 目标书架名称
   */
  onShelfChange(book, value) {
    value = value.trim();

    if (this.props.onDelSearchedBook) {
      this.props.onDelSearchedBook(book)
    }

    this.props.updateBookshelf(book, value)
  }

  /**
   * 获取当前 select 缺省值
   * @param {string} bookId - 书籍 id
   * @param {array} bookshelves - 书架数据
   */
  getChangerVal(bookId, bookshelves) {
    let value = 'move';

    for (let shelf of bookshelves) {
      if (shelf.books.filter(book => book.id === bookId).length) {
        value = shelf.tag;
        break
      }
    }

    return value
  }

  render() {
    return (
      <ol className="books-grid">
        {this.props.books.map(book => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={
                  {
                    width: 128,
                    height: 193,
                    backgroundImage:
                      `url("${book.imageLinks && book.imageLinks.smallThumbnail}"),
                      url("./favicon.ico")`  // 缺省图片，当封面图加载后会被覆盖掉
                  }
                }></div>
                <div className="book-shelf-changer">
                  <select
                    // 初始化赋值
                    value={book.shelf || this.getChangerVal(book.id, this.props.shelves)}
                    onChange={(event) => this.onShelfChange(book, event.target.value)}
                  >
                    <option value="move" disabled>Move to...</option>

                    {/* 生成书架列表项 */}
                    {this.props.shelves.map((shelf, idx) => (
                      <option key={idx} value={shelf.tag}>{shelf.name}</option>
                    ))}

                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">
                {book.authors ? book.authors.join(', ') : ''}
              </div>
            </div>
          </li>
        ))}
      </ol>
    )
  }
}

export default BooksItem
