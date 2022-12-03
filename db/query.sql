-- Add your code below and execute file in MySQL Shell --
SELECT * FROM book_prices;
SELECT * FROM favorite_books;

SELECT 
    favorite_books.book_name,book_prices.price
FROM favorite_books
JOIN book_prices
ON favorite_books.book_price = book_prices.id;
