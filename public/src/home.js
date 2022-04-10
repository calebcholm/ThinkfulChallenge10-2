const getTotalBooksCount = (books) => {
  return books.length;
};

const getTotalAccountsCount = (accounts) => {
  return accounts.length;
};

const getBooksBorrowedCount = (books) => {
  let total = 0;
  books.forEach((book) => {
    let returned = book.borrows[0].returned;
    if (!returned) {
      total++;
    }
  });
  return total;
};

const getMostCommonGenres = (books) => {
  //create array and push genres to it
  let genres = [];
  books.map((book) => {
    genres.push(book.genre);
  });
  //sort
  genres.sort();
  //create new object and loop over and count genres
  let counted = {};
  for (let i = 0; i < genres.length; i++) {
    counted[genres[i]] = (counted[genres[i]] || 0) + 1;
  };
  //create new array to push object to
  let topGenresCounted = [];
  //loop through keys and values and add 'name' and 'count'
  for (let [key, value] of Object.entries(counted)) {
    topGenresCounted.push({
      'name': key,
      'count': value
    });
  };
  //sort by count
  topGenresCounted.sort((genreA, genreB) => genreB.count - genreA.count);
  //return only top 5
  return topGenresCounted.slice(0, 5);
};

const getMostPopularBooks = (books) => {
  //create array to store objects
  let borrow = [];
  //map and push objects with name and count keys
  books.map((book) => {
    borrow.push({ "name": book.title, "count": book.borrows.length });
  });
  //sort by count
  borrow.sort((bookA, bookB) => bookB.count - bookA.count);
  //return array of top 5 objects
  return borrow.slice(0, 5);
};

const getMostPopularAuthors = (books, authors) => {
  //destructure author object to get first and last name

  //create array to store objects
  let totalAuthorCount = [];
  //for each author, create author name and count keys
  authors.forEach((author) => {
    let authorCount = {
      name: `${author.name.first} ${author.name.last}`,
      count: 0,
    };
    //for each book matching the author id, increase author count by adding book.borrows.length
    books.forEach((book) => {
      if (book.authorId === author.id) {
        authorCount.count += book.borrows.length;
      }
    });
    //push author name and count to author array
    totalAuthorCount.push(authorCount);
  });
  //sort and slice to top 5
  console.log(totalAuthorCount)
  return totalAuthorCount.sort((nameA, nameB) => nameB.count - nameA.count).slice(0, 5);
};

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
