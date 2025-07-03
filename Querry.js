useplp_bookstore
db.books.insertMany([
    {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    published_year: 1960,
    price: 12.99,
    in_stock: true,
    pages: 336,
    publisher: 'J. B. Lippincott & Co.'
  },
    {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    published_year: 1949,
    price: 10.99,
    in_stock: true,
    pages: 328,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    published_year: 1925,
    price: 9.99,
    in_stock: true,
    pages: 180,
    publisher: 'Charles Scribner\'s Sons'
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    genre: 'Dystopian',
    published_year: 1932,
    price: 11.50,
    in_stock: false,
    pages: 311,
    publisher: 'Chatto & Windus'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: 'George Allen & Unwin'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    published_year: 1951,
    price: 8.99,
    in_stock: true,
    pages: 224,
    publisher: 'Little, Brown and Company'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: 'T. Egerton, Whitehall'
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1178,
    publisher: 'Allen & Unwin'
  },
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    genre: 'Political Satire',
    published_year: 1945,
    price: 8.50,
    in_stock: false,
    pages: 112,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: 'HarperOne'
  },
  {
    title: 'Moby Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    published_year: 1851,
    price: 12.50,
    in_stock: false,
    pages: 635,
    publisher: 'Harper & Brothers'
  },
  {
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    genre: 'Gothic Fiction',
    published_year: 1847,
    price: 9.99,
    in_stock: true,
    pages: 342,
    publisher: 'Thomas Cautley Newby'
  }
]);

// CRUD OPERATIONS
//updating the price of a book
db.books.updateOne(
  { title: "Wuthering Heights" },
  { $set: { price: 17.00 } }
)
// UPDATE MANY 
// updating data 
db.books.updateMany({},{
  $set:{
    contacts:{storeEmail:"username@gmail.com",storeAdress:"00100",cellPhone:"0733456789"},
    location:{country:"kenya", city:"nairobi", street:"0568"}
  }
});
// find books published before 1924
db.books.find({ published_year: { $gt: 1924 } });
//deleting a book
db.books.deleteOne({ title: "The Lord of the Rings" });
// finding all books 
db.books.find()
// 1. Find books that are both in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 1924 }
});
// filtering
db.books.find(
  { genre: "Fiction" },
  { title: 1, author: 1, price: 1, _id: 0 }
);
 //Implement sorting to display books by price (both ascending and descending)
db.books.find().sort({ price: 1 });
db.books.find().sort({ price: -1 });
//find books by a specific author
db.books.find(
  {author:"Jane Austen"},
);
//find books by grnre:fiction and sort them in descending order
db.books.find(
  {genre:"Fiction"}
).sort({ genre:-1});
// Write a query to find books that are both in stock and published after 2010
db.books.find(
  { in_stock: true,
    published_year: { $gt: 2010 }
  }
);
//Use projection to return only the title, author, and price fields in your queries
db.books.find(
  { genre: "Fiction" },
  { title: 1, author: 1, price: 1, _id: 0 }
);
//Implement sorting to display books by price (both ascending and descending)
db.books.find().sort({price:-1});
db.books.find().sort({price:1});
//Use the `limit` and `skip` methods to implement pagination (5 books per page)
db.books.find().limit(5);
//Page 2: Next 5 books (skip the first 5, then take the next 5)
db.books.find().skip(5).limit(5);
//Task 4: Aggregation Pipeline
//Create an aggregation pipeline to calculate the average price of books by genre
db.books.aggregate([
  { $group: { 
      _id: "$genre", 
      averagePrice: { $avg: "$price" }, 
      count: { $sum: 1 } 
    }
  },
  {
    $sort: { averagePrice: -1 } // Stage 2 Sort the results by averagePrice in descending order
  }
]);
//Create an aggregation pipeline to find the author with the most books in the collection
db.books.aggregate([
  {
    $group: { // Stage 1: Group by author
      _id: "$author", // Group by the 'author' field
      totalBooks: { $sum: 1 } // Accumulator: Count the number of books for each author
    }
  },
  {
    $sort: { totalBooks: -1 } // Stage 2: Sort by totalBooks in descending order
  },
  {
    $limit: 1 // Stage 3: Limit the output to only the top (first) author
  }
]);
// Implement a pipeline that groups books by publication decade and counts them
db.books.aggregate([
  {
    $group: { // Stage 1: Group documents
      _id: { // Grouping key: calculate the decade
        $subtract: [ // Subtract from the year
          "$published_year", // The published_year
          { $mod: ["$published_year", 10] } // The remainder when divided by 10 (e.g., 2019 % 10 = 9)
        ]
      }, // This effectively truncates the year to its decade start (e.g., 2019 becomes 2010)
      count: { $sum: 1 } // Accumulator: Count books in each decade
    }
  },
  {
    $sort: { _id: 1 } // Stage 2 Sort by decade ascending
  }
]);
//Task 5: Indexing
//Create an index on the `title` field for faster searches
db.books.createIndex({ title: 1 });
//Create a compound index on `author` and `published_year`
db.books.createIndex({ author: 1, published_year: -1 });
// to confirm indexes
db.books.getIndexes()
//Use the `explain()` method to demonstrate the performance improvement with your indexes
db.books.find({ title: "The Alchemist" }).explain("executionStats");

// Find by author and sort by published_year
db.books.find({ author: "George Orwell" }).sort({ published_year: -1 }).explain("executionStats");
//Find by author 
db.books.find({ author: "Madeline Miller" }).explain("executionStats");
// Find by published_year ONLY (likely won't use compound index efficiently, will be COLLSCAN if no other index)
db.books.find({ published_year: 1925 }).explain("executionStats");
