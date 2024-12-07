const { nanoid } = require('nanoid');
const books = require('./books');

const addingBook = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    const bookId = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = {
        bookId,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished,
        insertedAt,
        updatedAt,
    };

    books.push(newBook);

    const isSuccess = books.filter((book) => book.bookId === bookId).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId,
            },
        });
        response.code(201);
        return response;
    }
};




const allBooks = (request, h) => {
    const booksSummary = books.map(({bookId, name, publisher}) => ({
        id: bookId,
        name,
        publisher,
    }))

    return {
        status: 'success',
        data: {
            books: booksSummary,
        },
    };
};

const showingSpecifiedBooks = (request, h) => {
    const { bookId } = request.params;
    const book = books.filter((b) => b.bookId === bookId)[0];

    if (book !== undefined) {
        return {
            status: 'success',
            data: {
                book: {
                    ...book,
                    id: book.bookId
                }
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editBook = (request, h) => {
    const { bookId } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const updatedAt = new Date().toISOString();
    const createdAt = updatedAt;
    const finished = pageCount === readPage;

    const bookIndex = books.findIndex((b) => b.bookId === bookId);

    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        }).code(400);
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    if (bookIndex !== -1) {
        books[bookIndex] = {
            ...books[bookIndex],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            createdAt,
            updatedAt,
            finished,
        };

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};


const deletingBooks = (request, h) => {
    const { bookId } = request.params;

    const bookIndex = books.findIndex((book) => book.bookId === bookId);

    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = { addingBook, allBooks, showingSpecifiedBooks, editBook, deletingBooks };
