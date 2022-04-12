const findAuthorById = (authors, id) =>
  authors.find((author) => author.id === id);

const findBookById = (books, id) => books.find((book) => book.id === id);

const partitionBooksByBorrowedStatus = (books) => {
  let notReturned = [];
  let returned = [];
  let total = [];
  books.filter((book) => {
    let bookReturned = book.borrows[0].returned;
    if (bookReturned) {
      notReturned.push(book);
    } else {
      returned.push(book);
    }
  });
  total.push(returned);
  total.push(notReturned);
  return total;
};

const getBorrowersForBook = (book, accounts) => {
  let total = [];
  accounts.forEach((account) => {
    if (book.borrows.find((item) => item.id === account.id)) {
      total.push(account);
    }
  });
  total.forEach((account) => {
    let isReturned = book.borrows.find((item) => item.id === account.id);
    account["returned"] = true;
  });
  return total;
};

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
