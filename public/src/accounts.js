const { partitionBooksByBorrowedStatus } = require("./books");

function findAccountById(accounts, id) { 
  //Searchs the accounts array and finds the first account that matches the input id
  return accounts.find((account) => account.id === id)
  }

function sortAccountsByLastName(accounts) {
  //Sorts the accounts arrya by last name
  return accounts.sort((authorA, authorB) => (authorA.name.last > authorB.name.last ? 1 : -1));
}

function numberOfBorrows(account, books) {
  //Uses reduce to accumulate the number of borrowed books
  let borrowedBooks = books.reduce((acc, book) => {
    const {borrows} = book
    borrows.forEach(borrow => {
      if(borrow.id === account.id){
        acc++;
      }
    })
    return acc;
  }, 0)
return borrowedBooks;
}

function getBooksPossessedByAccount(account, books, authors) { 
  const currentBookList = [];
  books.forEach((book) => {
    if(account.id === book.borrows[0].id && book.borrows[0].returned === false ) {
      currentBookList.push(book);
    }
  })
  currentBookList.forEach((currentBook) => {
    const authorList = authors.find((author) => currentBook.authorId === author.id);
    currentBook.author = authorList;
  })
  return currentBookList;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
