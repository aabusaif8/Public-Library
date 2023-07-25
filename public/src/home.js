function getTotalBooksCount(books) {
  let bookCount = 0
  books.forEach(book => {
    bookCount++
  });
  return bookCount
}

function getTotalAccountsCount(accounts) {
  let acctCount = 0
  accounts.forEach(acct =>{
    acctCount++
  })
  return acctCount
}

function getBooksBorrowedCount(books) {
  let checkedOut = 0;
  books.forEach((book) => {
    const mostRecentBorrow = book.borrows[0];
    if (mostRecentBorrow.returned === false) {
      checkedOut++;
    }
  });
  return checkedOut;
}


function getMostCommonGenres(books) {

  const genreCounts = books.reduce((acc, book) => {
    const genre = book.genre;
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {});
  const genres = Object.keys(genreCounts).map((name) => ({
    name,
    count: genreCounts[name],
  }));
  genres.sort((a, b) => b.count - a.count);
  return genres.slice(0, 5);
}


function getMostPopularBooks(books) {
  let tracker = {}
  books.forEach((book) => {
    const borrows = book.borrows.length
    tracker[book.title] = borrows
  })
  let ranker = Object.keys(tracker).map((title) =>({
    name :title,
    count :tracker[title]
  }))
  ranker.sort((a,b) => b.count-a.count)
  return ranker.slice(0, 5)
}

function getMostPopularAuthors(books, authors) {
  let authorTracker = {};

 
  books.forEach((book) => {
    const borrows = book.borrows.length;
    const authorId = book.authorId;
    authorTracker[authorId] = (authorTracker[authorId] || 0) + borrows;
  });

 
  const authorStats = Object.keys(authorTracker).map((authorId) => ({
    name: findAuthorName(authorId, authors),
    count: authorTracker[authorId],
  }));
  authorStats.sort((a, b) => b.count - a.count);
  return authorStats.slice(0, 5);
}


function findAuthorName(authorId, authors) {
  const author = authors.find((author) => author.id === Number(authorId));
  
  return `${author.name.first} ${author.name.last}`
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
