const { addingBook, 
    allBooks, 
    showingSpecifiedBooks, 
    editBook, deletingBooks } = require('./handler');


const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addingBook,
    },
    {
        method: 'GET',
        path: '/books',
        handler: allBooks,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: showingSpecifiedBooks,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: editBook,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deletingBooks,
    }
];

module.exports = routes;