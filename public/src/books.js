function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  const checkedOut = books.filter((book) => !book.borrows[0].returned);
  const notCheckedOut = books.filter((book) => book.borrows[0].returned);
  return [checkedOut, notCheckedOut];
}


function getBorrowersForBook(book, accounts) {
  const borrowers = [];
  let count = 0;

  for (const borrow of book.borrows) {
    const account = accounts.find((acc) => acc.id === borrow.id);
    if (account) {
      borrowers.push({ ...account, returned: borrow.returned });
      count++;
    }
    if (count === 10) break; // Stop after the first 10 accounts
  }

  return borrowers;
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
