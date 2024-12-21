const books = require('./books');
const { nanoid } = require('nanoid');

const addBook = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  const id = nanoid(10);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const book = { id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt };

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    });
    response.code(400);
    return response;
  }

  books.push(book);
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      'bookId': id
    }
  });
  response.code(201);
  return response;
};

const readBooks = (request, h) => {
  if (books.length === 0) {
    const response = h.response({
      status: 'success',
      data: {
        books: []
      }
    });
    response.code(200);
    return response;
  }

  const bookNameQuery = request.query.name;
  if (bookNameQuery !== undefined) {
    const bookNameQueryLower = bookNameQuery.toLowerCase();
    const booksFiltered = [];
    books.forEach((book) => {
      const bookFiltered = {};
      if (book.name.toLowerCase().includes(bookNameQueryLower)) {
        bookFiltered.id = book.id;
        bookFiltered.name = book.name;
        bookFiltered.publisher = book.publisher;
        booksFiltered.push(bookFiltered);
      }
    });
    const response = h.response({
      status: 'success',
      data: {
        books: booksFiltered
      }
    });
    response.code(200);
    return response;
  }

  const bookReadingQuery = request.query.reading;
  if (bookReadingQuery !== undefined && bookReadingQuery === '0') {
    const booksFiltered = [];
    books.forEach((book) => {
      const bookFiltered = {};
      if (book.reading === false) {
        bookFiltered.id = book.id;
        bookFiltered.name = book.name;
        bookFiltered.publisher = book.publisher;
        booksFiltered.push(bookFiltered);
      }
    });
    const response = h.response({
      status: 'success',
      data: {
        books: booksFiltered
      }
    });
    response.code(200);
    return response;
  } else if (bookReadingQuery !== undefined && bookReadingQuery === '1') {
    const booksFiltered = [];
    books.forEach((book) => {
      const bookFiltered = {};
      if (book.reading === true) {
        bookFiltered.id = book.id;
        bookFiltered.name = book.name;
        bookFiltered.publisher = book.publisher;
        booksFiltered.push(bookFiltered);
      }
    });
    const response = h.response({
      status: 'success',
      data: {
        books: booksFiltered
      }
    });
    response.code(200);
    return response;
  }

  const bookFinishedQuery = request.query.finished;
  if (bookFinishedQuery !== undefined && bookFinishedQuery === '0') {
    const booksFiltered = [];
    books.forEach((book) => {
      const bookFiltered = {};
      if (book.finished === false) {
        bookFiltered.id = book.id;
        bookFiltered.name = book.name;
        bookFiltered.publisher = book.publisher;
        booksFiltered.push(bookFiltered);
      }
    });
    const response = h.response({
      status: 'success',
      data: {
        books: booksFiltered
      }
    });
    response.code(200);
    return response;
  } else if (bookFinishedQuery !== undefined && bookFinishedQuery === '1') {
    const booksFiltered = [];
    books.forEach((book) => {
      const bookFiltered = {};
      if (book.finished === true) {
        bookFiltered.id = book.id;
        bookFiltered.name = book.name;
        bookFiltered.publisher = book.publisher;
        booksFiltered.push(bookFiltered);
      }
    });
    const response = h.response({
      status: 'success',
      data: {
        books: booksFiltered
      }
    });
    response.code(200);
    return response;
  }

  const booksFiltered = [];
  books.forEach((book) => {
    const bookFiltered = {};
    bookFiltered.id = book.id;
    bookFiltered.name = book.name;
    bookFiltered.publisher = book.publisher;
    booksFiltered.push(bookFiltered);
  });
  const response = h.response({
    status: 'success',
    data: {
      books: booksFiltered
    }
  });
  response.code(200);
  return response;
};

const bookDetail = (request, h) => {
  const bookId = request.params.bookId;

  const bookIndex = books.findIndex((book) => {
    return book.id === bookId;
  });

  if (bookIndex === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan'
    });
    response.code(404);
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      book: { ...books[bookIndex] }
    }
  });
  response.code(200);
  return response;
};

const updateBook = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const bookId = request.params.bookId;

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    });
    response.code(400);
    return response;
  }

  const bookIndex = books.findIndex((book) => {
    return book.id === bookId;
  });
  if (bookIndex === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'
    });
    response.code(404);
    return response;
  }

  books[bookIndex].name = name;
  books[bookIndex].year = year;
  books[bookIndex].author = author;
  books[bookIndex].summary = summary;
  books[bookIndex].publisher = publisher;
  books[bookIndex].pageCount = pageCount;
  books[bookIndex].readPage = readPage;
  books[bookIndex].reading = reading;
  books[bookIndex].updateAt = new Date().toISOString;

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui'
  });
  response.code(200);
  return response;
};

const deleteBook = (request, h) => {
  const bookId = request.params.bookId;

  const bookIndex = books.findIndex((book) => {
    return book.id === bookId;
  });
  if (bookIndex === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan'
    });
    response.code(404);
    return response;
  }

  books.splice(bookIndex, 1);
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil dihapus'
  });
  response.code(200);
  return response;
};

module.exports = { addBook, readBooks, bookDetail, updateBook, deleteBook };