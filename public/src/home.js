function totalBooksCount(books) {
  return books.length;
}

function totalAccountsCount(accounts) {
  return accounts.length;
}

function booksBorrowedCount(books) {
  let booksBorrowed = books.reduce((acc, book) => {
    const {borrows} = book;
    borrows.forEach(borrow => {
      if(borrow.returned === false){
        acc++;
      }
    })
    return acc;
  }, 0)
  return booksBorrowed;
}

//helper function (for Common Genres)
function topFiveGenres(list, value){
  let result = list.sort((a, b) => b.count - a.count);
  result = list.slice(0, value);
  return result;
}

function getMostCommonGenres(books) {
  const listOfGenres =[];
  books.forEach((book) => {
    let commonGenres = listOfGenres.find((genre) => book.genre === genre.name)
    if(!commonGenres){
      listOfGenres.push({name: book.genre, count: 1});
    }
    else {
      commonGenres.count +=1;
    }
  })
  return topFiveGenres(listOfGenres, 5);
}

function getMostPopularBooks(books) {
  const popularBooks = [];
  let booksBorrowed = 0;
  for(let i = 0; i < books.length; i++){
    let borrowed = books[i].borrows;
    booksBorrowed = borrowed.length;
    let borrowing = {name: `${books[i].title}`, count: booksBorrowed}
    popularBooks.push(borrowing);
  }
  const result = popularBooks.sort((bookA, bookB) => bookB.count - bookA.count);
  return result.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const popularAuthors = [];
  for(let i = 0; i < books.length; i++){
    let book = books[i];
    for(let j = 0; j < authors.length; j++){
      let author = authors[j];
      if(author.id === book.authorId){
        popularAuthors.push({name: `${author.name.first} ${author.name.last}`, count: book.borrows.length})
      }
    }
  }

  let result = popularAuthors.sort((authorA, authorB) => authorB.count - authorA.count);
  return result.slice(0, 5);
  
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
