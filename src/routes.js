const { addBook, readBooks, bookDetail, updateBook, deleteBook } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBook
  },

  {
    method: 'GET',
    path: '/books',
    handler: readBooks
  },

  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: bookDetail
  },

  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBook
  },

  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBook
  }
];

module.exports = routes;