function findAuthorById(authors, id) {
  //Uses the find method to find the authors id that matches the input id
  return authors.find((author) => author.id === id)
}

function findBookById(books, id) {
  //Uses the find method to find the book id that matches the input id
  return books.find((book) => book.id === id, {});
}

function partitionBooksByBorrowedStatus(books) {
  let booksNotReturned = [];
  let booksReturned = [];
  for(let i = 0; i < books.length; i++){
    let borrowed = books[i].borrows
    borrowed[0].returned ? booksReturned.push(books[i]) : booksNotReturned.push(books[i]);  
  }
  let bookStatus = [booksNotReturned, booksReturned];
  return bookStatus;
}

function getBorrowersForBook(book, accounts) {
  const bookBorrows = book.borrows;
  let borrows = bookBorrows.map((borrow) => {
  const account = accounts.find((acct) => acct.id === borrow.id, {})
    account.returned = borrow.returned;
    return account;
  })
  
  borrows = borrows.slice(0, 10);
  return borrows;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
