import React from 'react'
import { Link } from 'react-router-dom'

import './App.css'

export default () => {
  render: {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>404 Error</h1>
          </div>
          <div className="bookshelf">
            <div className="bookshelf-books">
              <h2>Hmmm, that page does not exist…</h2>
              <p>
                <Link to="/">Back to home</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
