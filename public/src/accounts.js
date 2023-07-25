function findAccountById(accounts, id) {
  let found = accounts.find((user) => {
    return id === user.id
  } )
  return found
}
function sortAccountsByLastName(accounts) {
  let sorted = accounts.sort((a, b) => {
    const lastNameA = a.name.last.toUpperCase();
    const lastNameB = b.name.last.toUpperCase();

    if (lastNameA < lastNameB) {
      return -1;
    } else if (lastNameA > lastNameB) {
      return 1;
    } else {
      return 0;
    }
  });
  return sorted
}

function getTotalNumberOfBorrows(account, books) {
  let borrows = 0
  books.forEach((book) =>{
    if (book.borrows.some((borrow) => borrow.id === account.id)){
      borrows++
    }
  })
  return borrows
}

function getBooksPossessedByAccount(account, books, authors) {
  let checkedOut = books
    .filter((book) =>
      book.borrows.some((borrow) => borrow.id === account.id && !borrow.returned)
    )
    .map((book) => {
      const author = authors.find((author) => author.id === book.authorId);
      return { ...book, author };
    });

  return checkedOut;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
