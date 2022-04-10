const findAccountById = (accounts, id) =>
  accounts.find((account) => account.id === id);

const sortAccountsByLastName = (accounts) =>
  accounts.sort((accountA, accountB) =>
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  );

const getTotalNumberOfBorrows = (account, books) => {
  let total = 0;
  books.forEach((book) =>
    book.borrows.forEach((borrow) => account.id === borrow.id && total++)
  );
  return total;
};

const getBooksPossessedByAccount = (account, books, authors) => {
  let found = [];
  books.forEach((book) => {
    if (
      book.borrows.find(
        (item) => item.id === account.id && item.returned === false
      )
    ) {
      found.push(book);
    }
  });
  found.forEach((book) => {
    let foundAuthor = authors.find((author) => author.id === book.authorId);
    book["author"] = foundAuthor;
  });
  return found;
};

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
